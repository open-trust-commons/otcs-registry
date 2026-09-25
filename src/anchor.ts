// External timestamp anchoring — ANCHORING.md.
//
// A round writes a manifest listing artifact digests; submission is separate.
// The CLI refuses to overwrite a manifest. Subsequent journal appends therefore
// leave that manifest unchanged. Preservation of the manifest, proof and trust
// substrate is still required for later verification.
//
// A witness client is OPTIONAL. Without one a round still produces a complete,
// hash-committed manifest marked ANCHOR_PENDING — the digest is fixed now and
// can be stamped later. Nothing in the release path requires the client to be
// present (ANCHORING.md §7).
//
// CLI: tsx src/anchor.ts round [label] | stamp | verify | status
import { createHash } from "node:crypto";
import {
  readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync, lstatSync,
} from "node:fs";
import { join, dirname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { WITNESSES, type WitnessState } from "./witnesses.js";
import { replaceFile, withFileLock } from "./local-file-lock.js";

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
export type WitnessRecord = { state: WitnessState; proofs: string[]; note?: string; verification?: "client-verify-v1" };
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

/** Visit non-dot entries depth-first, sorting names within each directory. */
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

/** Encode a generated repository-relative path with forward slashes. */
const repoPath = (file: string): string => relative(ROOT, file).split(sep).join("/");

/** Hash depth-first, name-sorted "repo-relative-path sha256" lines with forward slashes. */
export function treeDigest(dir: string): { sha256: string; bytes: number } {
  const files = walk(dir);
  const lines = files.map((f) => `${repoPath(f)} ${sha256(readFileSync(f))}`);
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

/** Which registered clients pass their version/availability probe. */
export const availableWitnesses = () => WITNESSES.filter((w) => w.available());

/** Retained name: any witness at all. Absence is reported, never routed around. */
export const otsAvailable = (): boolean => availableWitnesses().length > 0;

/**
 * Read the index, migrating pre-multi-witness entries in memory.
 *
 * Rounds written before the witness registry existed recorded one status and
 * one proof_file, both implicitly OpenTimestamps. Those become a witnesses map
 * without changing manifest bytes. Legacy confirmations are reset until the
 * client-verification path confirms them. Reading does not rewrite the index.
 */
const readIndex = (): IndexEntry[] => {
  if (!existsSync(INDEX)) return [];
  const raw = JSON.parse(readFileSync(INDEX, "utf8")) as IndexEntry[];
  for (const e of raw) {
    if (!e.witnesses) {
      const state: WitnessState =
        e.status === "ANCHOR_CONFIRMED" ? "CONFIRMED" : e.status === "ANCHOR_SUBMITTED" ? "SUBMITTED" : "UNKNOWN";
      e.witnesses = e.proof_file
        ? { opentimestamps: { state, proofs: [e.proof_file], note: e.confirmed_note } }
        : {};
    }
    for (const rec of Object.values(e.witnesses)) {
      if (rec.state === "CONFIRMED" && rec.verification !== "client-verify-v1") {
        rec.state = "UNKNOWN";
        rec.note = "legacy confirmation requires client verification";
      }
    }
    e.status = aggregate(e.witnesses);
  }
  return raw;
};

const writeIndex = (entries: IndexEntry[]) => {
  mkdirSync(ANCHOR_DIR, { recursive: true });
  replaceFile(INDEX, JSON.stringify(entries, null, 2) + "\n");
};

/** Default anchor set — ANCHORING.md §2. */
export const DEFAULT_TARGETS = [
  "governance-log/events.jsonl",
  "registry",
  "roadmap/status.yaml",
  "SHA256SUMS.hash",
];

/** Build and write an anchor manifest. Does not stamp; that is a separate step. */
function createRound(label = "scheduled", paths = DEFAULT_TARGETS): { manifest: AnchorManifest; file: string } {
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
      "A verified witness proof can establish an upper time bound for each listed byte sequence; this manifest alone does not.",
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
  writeFileSync(file, body, { flag: "wx" });

  index.push({
    anchor_id,
    manifest_file: repoPath(file),
    manifest_sha256: sha256(body),
    created_at,
    status: "ANCHOR_PENDING",
    witnesses: {},
  });
  writeIndex(index);
  return { manifest, file };
}

/**
 * Submit every manifest to every registered witness that has not seen it.
 *
 * Each witness is tried separately; a handled submission failure does not
 * prevent the next available witness from being tried.
 */
function submitPending(): {
  stamped: string[]; skipped: string[]; reason?: string; perWitness: Record<string, number>;
} {
  const index = readIndex();
  const available = availableWitnesses();
  const needsSubmission = (record?: WitnessRecord): boolean =>
    !record || (record.state === "UNKNOWN" && record.proofs.length === 0);
  const outstanding = index.filter((e) => WITNESSES.some((w) => needsSubmission(e.witnesses[w.id])));

  if (!available.length) {
    return {
      stamped: [], skipped: outstanding.map((e) => e.anchor_id), perWitness: {},
      reason: `no witness client installed (${WITNESSES.map((w) => w.id).join(", ")}) — submission deferred`,
    };
  }

  const stamped = new Set<string>();
  const skipped = new Set<string>();
  const perWitness: Record<string, number> = {};

  for (const e of outstanding) {
    const f = join(ROOT, e.manifest_file);
    if (!manifestMatches(e)) {
      invalidate(e, "manifest identity unavailable; submission refused");
      skipped.add(e.anchor_id);
      continue;
    }
    for (const w of available) {
      if (!needsSubmission(e.witnesses[w.id])) continue; // keep existing successful submissions
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

function manifestMatches(e: IndexEntry): boolean {
  const f = resolve(ROOT, e.manifest_file);
  // Index entries may refer only to their own regular manifest, never a
  // different local file to be signed/submitted through a tampered path.
  if (!/^anchor-\d{4,}$/.test(e.anchor_id)
      || f !== resolve(ANCHOR_DIR, `${e.anchor_id}.json`)) return false;
  return existsSync(f) && lstatSync(f).isFile() && sha256(readFileSync(f)) === e.manifest_sha256;
}

function invalidate(e: IndexEntry, note: string): void {
  for (const rec of Object.values(e.witnesses)) {
    rec.state = "UNKNOWN"; rec.note = note; delete rec.verification;
  }
  e.status = aggregate(e.witnesses);
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
 *   2. submitted proofs are checked by their registered clients (may need a node/network)
 * Check 1 fails on a missing, misdirected or altered manifest. With the client
 * absent proves only index/manifest consistency; `ok` reports check 1 alone.
 */
function verifyAnchors(): VerifyResult {
  const index = readIndex();
  const problems: string[] = [];
  const notes: string[] = [];
  let checked = 0;
  const intact = new Set<IndexEntry>();

  for (const e of index) {
    const f = join(ROOT, e.manifest_file);
    const present = existsSync(f);
    const matches = manifestMatches(e);
    if (present) checked++;
    if (!matches) {
      problems.push(present ? `${e.anchor_id}: manifest ALTERED since it was committed` : `${e.anchor_id}: manifest missing (${e.manifest_file})`);
      invalidate(e, "manifest identity unavailable; proof not checked");
      continue;
    }
    intact.add(e);
  }

  const available = availableWitnesses();
  const missing = WITNESSES.filter((w) => !available.includes(w));
  if (missing.length) notes.push(`not checked by ${missing.map((w) => w.id).join(", ")} — client not installed`);

  for (const e of index) {
    const f = join(ROOT, e.manifest_file);
    if (!intact.has(e)) continue; // do not verify a different or missing manifest
    invalidate(e, "witness client not available or no longer registered");
    for (const w of available) {
      const rec = e.witnesses[w.id];
      if (!rec) continue; // never submitted to this witness
      try {
        const r = w.check(f, e.manifest_file);
        rec.state = r.state;
        rec.note = r.note;
        if (r.state === "CONFIRMED") rec.verification = "client-verify-v1";
      } catch {
        rec.state = "UNKNOWN"; rec.note = "witness verification failed";
      }
      if (rec.state !== "CONFIRMED") notes.push(`${e.anchor_id} · ${w.id}: ${rec.note ?? rec.state}`);
    }
    e.status = aggregate(e.witnesses);
  }
  writeIndex(index);

  const pending = index.filter((e) => e.status === "ANCHOR_PENDING").length;
  const confirmed = index.filter((e) => e.status === "ANCHOR_CONFIRMED").length;
  if (confirmed < index.length) {
    notes.push(`${confirmed}/${index.length} manifest(s) CONFIRMED — the rest are unconfirmed, which proves nothing yet`);
  }
  return { ok: problems.length === 0, checked, pending, problems, notes };
}

export const round = (...args: Parameters<typeof createRound>): ReturnType<typeof createRound> =>
  withFileLock(INDEX, () => createRound(...args));
export const stampPending = (): ReturnType<typeof submitPending> =>
  withFileLock(INDEX, submitPending);
export const verify = (): VerifyResult => withFileLock(INDEX, verifyAnchors);
/** Read recorded observations; use verify() to refresh proof/manifest checks. */
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
    console.log("\nRecorded observations; run anchor:verify to refresh. CONFIRMED requires a verified witness proof; SUBMITTED is a request.");
  } else {
    console.error("usage: anchor [round <label> | stamp | verify | status]");
    process.exit(2);
  }
}
