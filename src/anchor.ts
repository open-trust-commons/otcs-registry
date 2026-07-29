// External timestamp anchoring — ANCHORING.md.
//
// An anchor round writes ONE immutable manifest listing the sha256 of each
// anchored artifact, then stamps that manifest. Stamping the manifest rather
// than the artifacts themselves matters: the ledger grows, so a proof bound to
// the ledger's bytes would be invalidated by the next event. The manifest never
// changes after it is written, so its proof stays verifiable forever.
//
// A witness client is OPTIONAL. Without one a round still produces a complete,
// hash-committed manifest marked ANCHOR_PENDING — the digest is fixed now and
// can be stamped later. Nothing in the release path requires the client to be
// present (ANCHORING.md §7).
//
// CLI: tsx src/anchor.ts round [label] | stamp | verify | status
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import {
  readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync,
} from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { WITNESSES, type WitnessState } from "./witnesses.js";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
export const ANCHOR_DIR = join(ROOT, "governance-log", "anchors");
const INDEX = join(ANCHOR_DIR, "index.json");

const NOW = () => process.env.OTCS_ANCHOR_TIME ?? new Date().toISOString();
const sha256 = (b: Buffer | string) => createHash("sha256").update(b).digest("hex");

export type AnchorTarget = { path: string; sha256: string; bytes: number };
export type AnchorManifest = {
  anchor_id: string;
  created_at: string;
  label: string;
  targets: AnchorTarget[];
  proves: string;
  does_not_prove: string[];
};
export type WitnessRecord = { state: WitnessState; proofs: string[]; note?: string };
export type IndexEntry = {
  anchor_id: string;
  manifest_file: string;
  manifest_sha256: string;
  created_at: string;
  /**
   * Aggregate, DERIVED from `witnesses` by aggregate() — never set by hand.
   * CONFIRMED requires at least one witness to have confirmed. One witness
   * confirming is enough to prove the bytes existed; it is not enough to
   * claim the record is independent of that witness, which is why the
   * per-witness map is what gets reported.
   */
  status: "ANCHOR_PENDING" | "ANCHOR_SUBMITTED" | "ANCHOR_CONFIRMED";
  witnesses: Record<string, WitnessRecord>;
  /** Pre-multi-witness entries carried these two. Kept so old rounds still read. */
  proof_file?: string;
  confirmed_note?: string;
};

/** The aggregate is the strongest state any single witness reached. */
export function aggregate(w: Record<string, WitnessRecord>): IndexEntry["status"] {
  const states = Object.values(w).map((x) => x.state);
  if (states.includes("CONFIRMED")) return "ANCHOR_CONFIRMED";
  if (states.includes("SUBMITTED")) return "ANCHOR_SUBMITTED";
  return "ANCHOR_PENDING";
}

/** Recursively list files under a directory, sorted, excluding dotfiles. */
function walk(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const name of readdirSync(dir).sort()) {
    if (name.startsWith(".")) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

/** A directory's digest is the hash of its sorted "relpath sha256" lines. */
export function treeDigest(dir: string): { sha256: string; bytes: number } {
  const files = walk(dir);
  const lines = files.map((f) => `${relative(ROOT, f)} ${sha256(readFileSync(f))}`);
  const body = lines.join("\n");
  return { sha256: sha256(body), bytes: Buffer.byteLength(body) };
}

function target(p: string): AnchorTarget | null {
  const abs = join(ROOT, p);
  if (!existsSync(abs)) return null;
  if (statSync(abs).isDirectory()) {
    const d = treeDigest(abs);
    return { path: `${p}/ (tree digest)`, sha256: d.sha256, bytes: d.bytes };
  }
  const buf = readFileSync(abs);
  return { path: p, sha256: sha256(buf), bytes: buf.length };
}

/** Which registered witnesses have a working client right now. */
export const availableWitnesses = () => WITNESSES.filter((w) => w.available());

/** Retained name: any witness at all. Absence is reported, never routed around. */
export const otsAvailable = (): boolean => availableWitnesses().length > 0;

/**
 * Read the index, migrating pre-multi-witness entries in memory.
 *
 * Rounds written before the witness registry existed recorded one status and
 * one proof_file, both implicitly OpenTimestamps. Those become a witnesses map
 * with the same meaning rather than being rewritten on disk — the manifests are
 * hashed in the index and editing them would break the very check that proves
 * they were not edited.
 */
const readIndex = (): IndexEntry[] => {
  if (!existsSync(INDEX)) return [];
  const raw = JSON.parse(readFileSync(INDEX, "utf8")) as IndexEntry[];
  for (const e of raw) {
    if (e.witnesses) continue;
    const state: WitnessState =
      e.status === "ANCHOR_CONFIRMED" ? "CONFIRMED" : e.status === "ANCHOR_SUBMITTED" ? "SUBMITTED" : "UNKNOWN";
    e.witnesses = e.proof_file
      ? { opentimestamps: { state, proofs: [e.proof_file], note: e.confirmed_note } }
      : {};
  }
  return raw;
};

const writeIndex = (entries: IndexEntry[]) => {
  mkdirSync(ANCHOR_DIR, { recursive: true });
  writeFileSync(INDEX, JSON.stringify(entries, null, 2) + "\n");
};

/** Default anchor set — ANCHORING.md §2. */
export const DEFAULT_TARGETS = [
  "governance-log/events.jsonl",
  "registry",
  "roadmap/status.yaml",
  "SHA256SUMS.hash",
];

/** Build and write an anchor manifest. Does not stamp; that is a separate step. */
export function round(label = "scheduled", paths = DEFAULT_TARGETS): { manifest: AnchorManifest; file: string } {
  const targets = paths.map(target).filter((t): t is AnchorTarget => t !== null);
  if (!targets.length) throw new Error("anchor round has no existing targets");

  const created_at = NOW();
  const index = readIndex();
  const anchor_id = `anchor-${String(index.length + 1).padStart(4, "0")}`;

  const manifest: AnchorManifest = {
    anchor_id,
    created_at,
    label,
    targets,
    proves:
      "Each listed byte sequence existed no later than the Bitcoin block time of the attached proof.",
    does_not_prove: [
      "that the content is true",
      "that the content was authorized",
      "that no other version existed earlier or concurrently",
      "that events omitted from the ledger never happened",
      "who created the content",
      "that the record is complete",
    ],
  };

  const body = JSON.stringify(manifest, null, 2) + "\n";
  const file = join(ANCHOR_DIR, `${anchor_id}.json`);
  mkdirSync(ANCHOR_DIR, { recursive: true });
  writeFileSync(file, body);

  index.push({
    anchor_id,
    manifest_file: relative(ROOT, file),
    manifest_sha256: sha256(body),
    created_at,
    status: "ANCHOR_PENDING",
  });
  writeIndex(index);
  return { manifest, file };
}

/**
 * Submit every manifest to every registered witness that has not seen it.
 *
 * Each witness is tried independently and a failure in one never stops
 * another — the point of holding two is that they do not share a fate.
 */
export function stampPending(): {
  stamped: string[]; skipped: string[]; reason?: string; perWitness: Record<string, number>;
} {
  const index = readIndex();
  const available = availableWitnesses();
  const outstanding = index.filter((e) => Object.keys(e.witnesses).length < WITNESSES.length);

  if (!available.length) {
    return {
      stamped: [], skipped: outstanding.map((e) => e.anchor_id), perWitness: {},
      reason: `no witness client installed (${WITNESSES.map((w) => w.id).join(", ")}) — manifests stay ANCHOR_PENDING and can be submitted later`,
    };
  }

  const stamped = new Set<string>();
  const skipped = new Set<string>();
  const perWitness: Record<string, number> = {};

  for (const e of outstanding) {
    const f = join(ROOT, e.manifest_file);
    for (const w of available) {
      if (e.witnesses[w.id]) continue; // already submitted to this one
      try {
        const r = w.submit(f, e.manifest_file);
        if (!r) { skipped.add(e.anchor_id); continue; }
        e.witnesses[w.id] = { state: "SUBMITTED", proofs: r.proofs };
        perWitness[w.id] = (perWitness[w.id] ?? 0) + 1;
        stamped.add(e.anchor_id);
      } catch (err) {
        // Recorded, not swallowed: a witness that refused is information.
        e.witnesses[w.id] = { state: "UNKNOWN", proofs: [], note: `submission failed: ${(err as Error).message.split("\n")[0]}` };
        skipped.add(e.anchor_id);
      }
    }
    e.status = aggregate(e.witnesses);
    if (e.witnesses.opentimestamps?.proofs[0]) e.proof_file = e.witnesses.opentimestamps.proofs[0];
  }

  writeIndex(index);
  return { stamped: [...stamped], skipped: [...skipped], perWitness };
}

export type VerifyResult = {
  ok: boolean;
  checked: number;
  pending: number;
  problems: string[];
  notes: string[];
};

/**
 * Two independent checks:
 *   1. every manifest still hashes to what the index recorded (works offline, always)
 *   2. every .ots proof verifies against the chain (needs the client + network)
 * Check 1 failing means the record was altered. Check 1 passing with the client
 * absent is a real, reportable result — not a pass.
 */
export function verify(): VerifyResult {
  const index = readIndex();
  const problems: string[] = [];
  const notes: string[] = [];
  let checked = 0;

  for (const e of index) {
    const f = join(ROOT, e.manifest_file);
    if (!existsSync(f)) {
      problems.push(`${e.anchor_id}: manifest missing (${e.manifest_file})`);
      continue;
    }
    if (sha256(readFileSync(f)) !== e.manifest_sha256) {
      problems.push(`${e.anchor_id}: manifest ALTERED since it was committed`);
    }
    checked++;
  }

  const available = availableWitnesses();
  const missing = WITNESSES.filter((w) => !w.available());
  if (missing.length) notes.push(`not checked by ${missing.map((w) => w.id).join(", ")} — client not installed`);

  for (const e of index) {
    const f = join(ROOT, e.manifest_file);
    if (!existsSync(f)) continue; // already reported above
    for (const w of available) {
      const rec = e.witnesses[w.id];
      if (!rec) continue; // never submitted to this witness
      const r = w.check(f, e.manifest_file);
      rec.state = r.state;
      rec.note = r.note;
      if (r.state !== "CONFIRMED") notes.push(`${e.anchor_id} · ${w.id}: ${r.note ?? r.state}`);
    }
    e.status = aggregate(e.witnesses);
  }
  writeIndex(index);

  const pending = index.filter((e) => e.status === "ANCHOR_PENDING").length;
  const confirmed = index.filter((e) => e.status === "ANCHOR_CONFIRMED").length;
  if (confirmed < index.length) {
    notes.push(`${confirmed}/${index.length} manifest(s) CONFIRMED — the rest are submitted, which proves nothing yet`);
  }
  return { ok: problems.length === 0, checked, pending, problems, notes };
}

export const status = () => readIndex();

// ---- CLI -------------------------------------------------------------------
if (process.argv[1]?.endsWith("anchor.ts")) {
  const [cmd, label] = process.argv.slice(2);

  if (cmd === "round" || cmd === undefined) {
    const { manifest, file } = round(label ?? "scheduled");
    console.log(`${manifest.anchor_id} — ${manifest.targets.length} targets → ${relative(ROOT, file)}`);
    for (const t of manifest.targets) console.log(`  ${t.sha256.slice(0, 16)}…  ${t.path}`);
    const s = stampPending();
    if (s.stamped.length) console.log(`submitted: ${s.stamped.join(", ")}`);
    for (const [id, n] of Object.entries(s.perWitness)) console.log(`  → ${id}: ${n}`);
    if (s.reason) console.log(`ANCHOR_PENDING — ${s.reason}`);
  } else if (cmd === "stamp") {
    const s = stampPending();
    if (s.reason) console.log(s.reason);
    else {
      console.log(`submitted: ${s.stamped.join(", ") || "nothing outstanding"}`);
      for (const [id, n] of Object.entries(s.perWitness)) console.log(`  → ${id}: ${n}`);
      if (s.skipped.length) console.log(`  refused/failed: ${s.skipped.join(", ")}`);
    }
  } else if (cmd === "verify") {
    const r = verify();
    console.log(`anchors: ${r.checked} manifest(s) checked, ${r.pending} pending — ${r.ok ? "records INTACT" : "records ALTERED"}`);
    r.problems.forEach((p) => console.error(`  ✗ ${p}`));
    r.notes.forEach((n) => console.log(`  · ${n}`));
    if (!r.ok) process.exit(1);
  } else if (cmd === "status") {
    const idx = status();
    if (!idx.length) console.log("no anchor rounds yet");
    for (const e of idx) {
      console.log(`${e.anchor_id}  ${e.status.padEnd(17)}  ${e.created_at}`);
      for (const w of WITNESSES) {
        const r = e.witnesses[w.id];
        console.log(`    ${w.id.padEnd(15)} ${(r?.state ?? "not submitted").padEnd(14)} ${r?.note ?? ""}`);
      }
    }
    const avail = availableWitnesses().map((w) => w.id);
    console.log(`\nwitnesses registered: ${WITNESSES.map((w) => `${w.id} (${w.substrate})`).join(" · ")}`);
    console.log(`clients available:    ${avail.length ? avail.join(", ") : "NONE — rounds still valid, submission deferred"}`);
    console.log("\nONLY ANCHOR_CONFIRMED proves when bytes existed. SUBMITTED is a request.");
  } else {
    console.error("usage: anchor [round <label> | stamp | verify | status]");
    process.exit(2);
  }
}
