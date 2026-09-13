// The deliberation clock, computed — never typed.
//
// GOVERNANCE.md §3 gives every proposal class a minimum discussion floor that
// runs from first publication. proposals/CALENDAR.md tabulates the resulting
// dates by hand. This module derives them from proposal.yaml and the governance
// ledger so the two can be compared, and so that no person ever enters an
// "earliest decision" date: a date someone chose is the founder-led pattern
// CHARTER.md §7 exists to end.
//
// Amendment semantics (OTCS-0012, proposed): a VERSION_PUBLISHED event that
// carries `amendment_class: SUBSTANTIVE` restarts the clock at its date;
// `NON_SUBSTANTIVE` adds a 7-day contest tail. Events without an
// amendment_class — every pin recorded before 0012 — do not move the clock.
// That is deliberate: the pre-rule amendments to 0002, 0005 and 0010 are
// disclosed in 0012 as having run under no rule, not retroactively restarted.
//
// Until OTCS-0012 ratifies, everything here is informational. `npm run
// validate` reports disagreements as warnings; nothing fails on them.
//
// CLI: tsx src/clock.ts table | tsx src/clock.ts hash <proposal-id>
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";
import { readLedger, LEDGER, type LedgerEvent } from "./ledger.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
export const PROPOSALS = join(ROOT, "proposals");

/** GOVERNANCE.md §3 — the minimum of each class's range, in days. */
export const MINIMUM_DAYS: Record<string, number> = {
  typo_metadata: 1,
  registry_update: 3,
  interface_clarification: 7,
  new_interface: 21,
  breaking_change: 30,
  model_revision: 45,
  constitutional: 45,
  emergency: 0,
};
/** GOVERNANCE.md §8 — an emergency action expires unless approved normally. */
export const EMERGENCY_EXPIRY_DAYS = 7;
/** OTCS-0012 §3.1 — the contest window after a NON_SUBSTANTIVE amendment. */
export const CONTEST_DAYS = 7;

export type AmendmentClass = "NON_SUBSTANTIVE" | "SUBSTANTIVE";

type Doc = Record<string, unknown>;

// ---- dates: YYYY-MM-DD strings, UTC, no library -----------------------------
export const addDays = (ymd: string, days: number): string => {
  const d = new Date(`${ymd}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};
const dateOf = (ts: unknown): string => String(ts).slice(0, 10);
const later = (a: string, b: string): string => (a >= b ? a : b);

// ---- the pin -----------------------------------------------------------------
/**
 * What a VERSION_PUBLISHED event hashes: proposal.md, then proposal.yaml with
 * the phase and clock bookkeeping removed. Those fields change *because* of
 * the pin (phase → DELIBERATION, clock_start on a restart), so including them
 * would make every re-pin change the hash it is trying to pin.
 */
export const BOOKKEEPING = ["phase", "phase_history", "clock_start"] as const;

export function artifactHash(dir: string): string {
  const md = readFileSync(join(dir, "proposal.md"), "utf8");
  const y = parse(readFileSync(join(dir, "proposal.yaml"), "utf8")) as Doc;
  for (const k of BOOKKEEPING) delete y[k];
  const canonicalYaml = JSON.stringify(
    Object.keys(y).sort().reduce((acc, k) => ((acc[k] = y[k]), acc), {} as Doc),
  );
  return createHash("sha256").update(md).update("\n---\n").update(canonicalYaml).digest("hex");
}

// ---- the clock -----------------------------------------------------------------
export type Clock = {
  proposal_id: string;
  class: string;
  /** clock_start as the ledger implies it (yaml's value unless a SUBSTANTIVE pin is later). */
  clock_start: string;
  /** yaml's own clock_start, for comparison. */
  declared_clock_start: string;
  /** Earliest legal decision, or for emergency: the expiry. */
  earliest: string;
  /** Why the date is what it is, one line per contributing clock. */
  basis: string[];
  /** Pins seen, oldest first. */
  pins: { date: string; version?: string; hash?: string; amendment_class?: AmendmentClass }[];
  decided: boolean;
};

export function computeClock(id: string, opts: { events?: LedgerEvent[]; root?: string } = {}): Clock | undefined {
  const root = opts.root ?? PROPOSALS;
  const dir = join(root, id);
  const yamlPath = join(dir, "proposal.yaml");
  if (!existsSync(yamlPath)) return undefined;
  const y = parse(readFileSync(yamlPath, "utf8")) as Doc;
  const events = opts.events ?? readLedger(LEDGER);
  const cls = String(y.class);
  const min = MINIMUM_DAYS[cls];
  if (min === undefined) throw new Error(`clock: ${id} has unknown class ${cls}`);

  const declared = String(y.clock_start);
  const pins = events
    .filter((e) => e.proposal_id === id && e.event_type === "VERSION_PUBLISHED")
    .map((e) => ({
      date: dateOf(e.timestamp),
      version: e.artifact_version as string | undefined,
      hash: e.artifact_hash as string | undefined,
      amendment_class: e.amendment_class as AmendmentClass | undefined,
    }))
    .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));

  const basis: string[] = [];
  let clockStart = declared;
  basis.push(`clock_start ${declared} (proposal.yaml, first publication)`);
  for (const p of pins) {
    if (p.amendment_class === "SUBSTANTIVE" && p.date > clockStart) {
      clockStart = p.date;
      basis.push(`restart ${p.date}: SUBSTANTIVE amendment${p.version ? ` (${p.version})` : ""}`);
    }
  }

  let earliest: string;
  if (cls === "emergency") {
    earliest = addDays(clockStart, EMERGENCY_EXPIRY_DAYS);
    basis.push(`emergency: expires ${earliest} unless approved normally (§8)`);
  } else {
    earliest = addDays(clockStart, min);
    basis.push(`+${min} days (${cls} minimum) → ${earliest}`);
    for (const p of pins) {
      if (p.amendment_class === "NON_SUBSTANTIVE") {
        const tail = addDays(p.date, CONTEST_DAYS);
        if (tail > earliest) basis.push(`contest tail: NON_SUBSTANTIVE ${p.date} + ${CONTEST_DAYS} → ${tail}`);
        earliest = later(earliest, tail);
      }
    }
  }

  return {
    proposal_id: id,
    class: cls,
    clock_start: clockStart,
    declared_clock_start: declared,
    earliest,
    basis,
    pins,
    decided: existsSync(join(dir, "decision.json")),
  };
}

export function clockTable(opts: { events?: LedgerEvent[]; root?: string } = {}): Clock[] {
  const root = opts.root ?? PROPOSALS;
  return readdirSync(root)
    .filter((n) => /^OTCS-\d{4}$/.test(n))
    .sort()
    .map((id) => computeClock(id, opts))
    .filter((c): c is Clock => c !== undefined);
}

/**
 * Refusals that OTCS-0012 §3.1 makes mechanical. Returned as findings so the
 * caller decides whether they warn (before ratification) or fail (after).
 */
export type ClockFinding = { proposal_id: string; msg: string };

export function clockFindings(opts: { events?: LedgerEvent[]; root?: string } = {}): ClockFinding[] {
  const out: ClockFinding[] = [];
  const events = opts.events ?? readLedger(LEDGER);
  for (const c of clockTable({ ...opts, events })) {
    if (c.clock_start !== c.declared_clock_start)
      out.push({ proposal_id: c.proposal_id, msg: `proposal.yaml clock_start ${c.declared_clock_start} disagrees with the ledger-derived ${c.clock_start}` });
    // A pin that follows another pin must say what kind of amendment it is,
    // and must not be the same text pinned twice.
    let prev: (typeof c.pins)[number] | undefined;
    for (const p of c.pins) {
      if (prev && p.hash && prev.hash && p.hash === prev.hash)
        out.push({ proposal_id: c.proposal_id, msg: `VERSION_PUBLISHED ${p.version ?? p.date} re-pins the same artifact hash as ${prev.version ?? prev.date}` });
      if (prev && p.hash && !p.amendment_class)
        out.push({ proposal_id: c.proposal_id, msg: `VERSION_PUBLISHED ${p.version ?? p.date} follows a pin without an amendment_class (OTCS-0012 §3.1)` });
      prev = p;
    }
    if (c.class === "emergency" && c.pins.some((p) => p.amendment_class))
      out.push({ proposal_id: c.proposal_id, msg: `emergency proposals admit no amendments (OTCS-0012 §3.1); a change is a new proposal` });
    // A decision before the computed date — the check RUNBOOK.md states in
    // prose ("you cannot shorten a clock by merging"), made mechanical.
    // RATIFICATION is the voting phase and may open before the date; what may
    // not precede it is the decision itself (decision.json) or OPERATION.
    // OTCS-0000 waived its clock as a pre-existence bootstrap and says so in
    // decision.json's structured `limitations_disclosed`; a waiver disclosed
    // there is honored, one asserted anywhere else is not.
    if (c.class === "emergency") continue;
    const dir = join(opts.root ?? PROPOSALS, c.proposal_id);
    const y = parse(readFileSync(join(dir, "proposal.yaml"), "utf8")) as Doc;
    let waived = false;
    const decisionPath = join(dir, "decision.json");
    if (existsSync(decisionPath)) {
      const d = JSON.parse(readFileSync(decisionPath, "utf8")) as Doc;
      const limits = ((d.process_validity as Doc | undefined)?.limitations_disclosed ?? []) as string[];
      waived = limits.some((s) => /clock waived/i.test(s));
      if (!waived && String(d.recorded) < c.earliest)
        out.push({ proposal_id: c.proposal_id, msg: `decision recorded ${d.recorded}, before the computed earliest decision ${c.earliest}` });
    }
    for (const h of (y.phase_history ?? []) as Doc[]) {
      if (String(h.phase) === "OPERATION" && String(h.date) < c.earliest && !waived)
        out.push({ proposal_id: c.proposal_id, msg: `phase OPERATION entered ${h.date}, before the computed earliest decision ${c.earliest}` });
    }
  }
  return out;
}

// ---- CLI ---------------------------------------------------------------------
const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  const [cmd, arg] = process.argv.slice(2);
  if (cmd === "table") {
    for (const c of clockTable())
      console.log(`${c.proposal_id}  ${c.class.padEnd(24)} clock_start ${c.clock_start}  earliest ${c.earliest}${c.decided ? "  (decided)" : ""}`);
    const f = clockFindings();
    for (const x of f) console.log(`  ⚠ ${x.proposal_id}: ${x.msg}`);
  } else if (cmd === "hash" && arg) {
    console.log(artifactHash(join(PROPOSALS, arg)));
  } else {
    console.log("usage: tsx src/clock.ts table | tsx src/clock.ts hash <OTCS-nnnn>");
  }
}
