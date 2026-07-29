// OTCS governance ledger — append-only, hash-chained JSONL.
// Tamper-evident sequence integrity (SECURITY.md §3): the chain proves committed
// records form a consistent sequence; it does not prove omitted events never
// existed, timestamps are true, or authors held authority.
// CLI: tsx src/ledger.ts verify | tsx src/ledger.ts append <event.yaml>
import { createHash } from "node:crypto";
import { readFileSync, existsSync, appendFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
export const LEDGER = join(ROOT, "governance-log", "events.jsonl");

export type LedgerEvent = Record<string, unknown>;

const canonical = (obj: LedgerEvent): string =>
  JSON.stringify(Object.keys(obj).sort().reduce((acc, k) => ((acc[k] = obj[k]), acc), {} as LedgerEvent));

export const readLedger = (path = LEDGER): LedgerEvent[] =>
  existsSync(path)
    ? readFileSync(path, "utf8").trim().split("\n").filter(Boolean).map((l) => JSON.parse(l) as LedgerEvent)
    : [];

export function appendEvent(fields: LedgerEvent, path = LEDGER): LedgerEvent {
  const events = readLedger(path);
  const prev = events.length ? String(events[events.length - 1].content_hash) : "GENESIS";
  const body: LedgerEvent = {
    ...fields,
    event_id: `ev-${String(events.length + 1).padStart(6, "0")}`,
    prev_hash: prev,
  };
  const content_hash = createHash("sha256").update(canonical(body)).digest("hex");
  const full = { ...body, content_hash };
  mkdirSync(dirname(path), { recursive: true });
  appendFileSync(path, JSON.stringify(full) + "\n");
  return full;
}

export function verifyLedger(path = LEDGER): { ok: boolean; count: number; problems: string[] } {
  const events = readLedger(path);
  const problems: string[] = [];
  let prev = "GENESIS";
  for (const e of events) {
    const id = String(e.event_id ?? "?");
    if (e.prev_hash !== prev) problems.push(`${id}: prev_hash broken (chain edit or reorder)`);
    const { content_hash, ...body } = e;
    const expect = createHash("sha256").update(canonical(body as LedgerEvent)).digest("hex");
    if (content_hash !== expect) problems.push(`${id}: content_hash mismatch (record altered)`);
    prev = String(content_hash);
  }
  return { ok: problems.length === 0, count: events.length, problems };
}

// ---- CLI -------------------------------------------------------------------
const [cmd, arg] = process.argv.slice(2);
if (cmd === "verify") {
  const r = verifyLedger();
  console.log(`ledger: ${r.count} events, ${r.ok ? "chain INTACT" : "chain BROKEN"}`);
  r.problems.forEach((p) => console.error(`  ✗ ${p}`));
  process.exit(r.ok ? 0 : 1);
} else if (cmd === "append" && arg) {
  const full = appendEvent(parse(readFileSync(arg, "utf8")) as LedgerEvent);
  console.log(`appended ${full.event_id} (${full.event_type})`);
}
