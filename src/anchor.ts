// Bitcoin anchoring via OpenTimestamps — BITCOIN-ANCHORING.md Part II.
//
// An anchor round writes ONE immutable manifest listing the sha256 of each
// anchored artifact, then stamps that manifest. Stamping the manifest rather
// than the artifacts themselves matters: the ledger grows, so a proof bound to
// the ledger's bytes would be invalidated by the next event. The manifest never
// changes after it is written, so its proof stays verifiable forever.
//
// The `ots` client is OPTIONAL. Without it a round still produces a complete,
// hash-committed manifest marked ANCHOR_PENDING — the digest is fixed now and
// can be stamped later. Nothing in the release path requires the client to be
// present (BITCOIN-ANCHORING.md, "Failure and recovery").
//
// CLI: tsx src/anchor.ts round [label] | stamp | verify | status
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import {
  readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync,
} from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

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
export type IndexEntry = {
  anchor_id: string;
  manifest_file: string;
  manifest_sha256: string;
  created_at: string;
  status: "ANCHOR_PENDING" | "ANCHOR_SUBMITTED" | "ANCHOR_CONFIRMED";
  proof_file?: string;
  confirmed_note?: string;
};

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

/** Is the reference OpenTimestamps client available? */
export function otsAvailable(): boolean {
  try {
    execFileSync("ots", ["--version"], { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

const readIndex = (): IndexEntry[] =>
  existsSync(INDEX) ? (JSON.parse(readFileSync(INDEX, "utf8")) as IndexEntry[]) : [];

const writeIndex = (entries: IndexEntry[]) => {
  mkdirSync(ANCHOR_DIR, { recursive: true });
  writeFileSync(INDEX, JSON.stringify(entries, null, 2) + "\n");
};

/** Default anchor set — BITCOIN-ANCHORING.md "What is anchored". */
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

/** Stamp every pending manifest, if the client is installed. */
export function stampPending(): { stamped: string[]; skipped: string[]; reason?: string } {
  const index = readIndex();
  const pending = index.filter((e) => e.status === "ANCHOR_PENDING");
  if (!otsAvailable()) {
    return {
      stamped: [],
      skipped: pending.map((e) => e.anchor_id),
      reason: "ots client not installed — manifests remain ANCHOR_PENDING and can be stamped later",
    };
  }
  const stamped: string[] = [];
  const skipped: string[] = [];
  for (const e of pending) {
    const f = join(ROOT, e.manifest_file);
    try {
      execFileSync("ots", ["stamp", f], { stdio: "pipe" });
      e.proof_file = `${e.manifest_file}.ots`;
      e.status = "ANCHOR_SUBMITTED";
      stamped.push(e.anchor_id);
    } catch {
      skipped.push(e.anchor_id);
    }
  }
  writeIndex(index);
  return { stamped, skipped };
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

  const withProofs = index.filter((e) => e.proof_file);
  if (!otsAvailable()) {
    if (withProofs.length) notes.push(`${withProofs.length} proof(s) NOT verified — ots client not installed`);
  } else {
    for (const e of withProofs) {
      const p = join(ROOT, e.proof_file!);
      if (!existsSync(p)) { problems.push(`${e.anchor_id}: proof file missing`); continue; }
      try {
        const out = execFileSync("ots", ["verify", p], { stdio: "pipe" }).toString();
        if (/Success|attests/i.test(out)) { e.status = "ANCHOR_CONFIRMED"; e.confirmed_note = out.trim().split("\n").pop(); }
        else notes.push(`${e.anchor_id}: proof not yet confirmed in a block`);
      } catch {
        notes.push(`${e.anchor_id}: verification incomplete (pending block confirmation or no network)`);
      }
    }
    writeIndex(index);
  }

  const pending = index.filter((e) => e.status === "ANCHOR_PENDING").length;
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
    if (s.stamped.length) console.log(`stamped: ${s.stamped.join(", ")}`);
    if (s.reason) console.log(`ANCHOR_PENDING — ${s.reason}`);
  } else if (cmd === "stamp") {
    const s = stampPending();
    console.log(s.reason ?? `stamped: ${s.stamped.join(", ") || "nothing pending"}`);
  } else if (cmd === "verify") {
    const r = verify();
    console.log(`anchors: ${r.checked} manifest(s) checked, ${r.pending} pending — ${r.ok ? "records INTACT" : "records ALTERED"}`);
    r.problems.forEach((p) => console.error(`  ✗ ${p}`));
    r.notes.forEach((n) => console.log(`  · ${n}`));
    if (!r.ok) process.exit(1);
  } else if (cmd === "status") {
    const idx = status();
    if (!idx.length) console.log("no anchor rounds yet");
    for (const e of idx) console.log(`${e.anchor_id}  ${e.status.padEnd(17)}  ${e.created_at}  ${e.manifest_file}`);
    console.log(`\nots client: ${otsAvailable() ? "available" : "NOT INSTALLED (rounds still valid, stamping deferred)"}`);
  } else {
    console.error("usage: anchor [round <label> | stamp | verify | status]");
    process.exit(2);
  }
}
