// Use-evidence recompute — the counts behind PREMORTEM.md §2 criterion 3,
// recomputed from the public instances file on every run, pointed at BOTH
// evaluation dates, and able to find the criterion MET without anyone's
// cooperation.
//
// WHY THIS EXISTS
// OTCS-0007 defined "uses the data to make a decision" as three lines counted
// apart; OTCS-0008 gave contested rulings a destination; OTCS-0009 moved the
// final evaluation to 2028-07-29 and turned the original date into an all-dark
// interim tripwire. All three assume mechanisms that did not exist: a public
// challengeable instances file, a contact log that predates any approach, and
// a recompute the founder cannot fail to notice, cannot delay noticing, and
// does not adjudicate. This file is those mechanisms' computing half.
//
// CONSERVATIVE BY CONSTRUCTION (OTCS-0008)
// Every ambiguity resolves against the project. An instance counts only when
// ruled QUALIFIED by a determination; UNRULED counts as not qualifying;
// CONTESTED is excluded until ruled. An instance from a contacted party is
// excluded unless its contact-log entry predates the party's artifact —
// checked mechanically here, whatever the ruling said. Entry use additionally
// requires the cited entry to be externally self-registered; while zero such
// registrations exist, entry use is structurally impossible and criteria 1+3
// contribute ONE toward the thresholds (OTCS-0009 §3), an annotation computed
// from the registry count, never judged.
//
// WHAT THIS IS NOT
// Not a score, not a verdict. Three counts reported side by side, never
// collapsed (NON-GOALS.md §2, §5). The 2-of-4 arithmetic and every
// qualification ruling belong to a qualified standing determination
// (OTCS-0008); this file only makes the reading possible — including the
// reading nobody wants, which is the point.
//
// ADVISORY. Exit is always 0. It reports and logs; it changes no record.
import { readFileSync, readdirSync, existsSync, appendFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const LOG = join(ROOT, "computed", "use-evidence-log.jsonl");

type Doc = Record<string, any>;

/** The two evaluation dates, pre-registered by OTCS-0009. Changing them is a proposal, not an edit. */
export const DATES = { interim: "2027-07-29", final: "2028-07-29" } as const;

/**
 * The founder's disclosed identities (MAINTAINERS.md §1). A registered record
 * whose every owner matches none of these is externally self-registered —
 * "an entry the founder neither authored nor maintains" (OTCS-0007 §1).
 */
const FOUNDER = [/chris\s*perkins/i, /nmcitra/i];

export function externalRegistrations(projects: Doc[]): string[] {
  return projects
    .filter((p) => p.project?.record_state === "registered")
    .filter((p) => {
      const owners: Doc[] = p.ownership?.owners ?? [];
      if (!owners.length) return false; // unattributable is not externally self-registered
      return owners.every((o) => !FOUNDER.some((rx) => rx.test(String(o.name ?? "") + " " + String(o.organization ?? ""))));
    })
    .map((p) => String(p.project.id))
    .sort();
}

export type Counted = {
  external_self_registrations: string[];
  coupled_pair: boolean; // criteria 1+3 contribute one while true (OTCS-0009 §3)
  lines: {
    entry_use: { qualifying: number; distinct_parties: number };
    vocabulary_use: { qualifying: number; distinct_parties: number };
    instrument_decisions: { qualifying: number; distinct_parties: number };
  };
  excluded: Array<{ instance_id: string; line: string; why: string }>;
};

/** Conservative counts over the instances file. Pure — the tests feed it directly. */
export function computeCounts(instances: Doc[], contacts: Doc[], externals: string[]): Counted {
  const contactDate = new Map<string, string>(contacts.map((c) => [String(c.contact_id), String(c.date)]));
  const excluded: Counted["excluded"] = [];
  const byLine: Record<string, Doc[]> = { entry_use: [], vocabulary_use: [], instrument_decision: [] };

  for (const inst of instances) {
    const id = String(inst.instance_id ?? "?");
    const line = String(inst.line ?? "?");
    const drop = (why: string) => excluded.push({ instance_id: id, line, why });

    const status = String(inst.ruling?.status ?? "UNRULED");
    if (status === "UNRULED") { drop("never ruled on — counts as not qualifying (OTCS-0008)"); continue; }
    if (status === "CONTESTED") { drop("contested — excluded until ruled QUALIFIED (OTCS-0008)"); continue; }
    if (status === "NOT_QUALIFIED") { drop("ruled NOT_QUALIFIED"); continue; }

    if (inst.contact_ref) {
      const cd = contactDate.get(String(inst.contact_ref));
      if (!cd) { drop(`contact_ref ${inst.contact_ref} not in the contact log — the approach was never logged`); continue; }
      if (!(cd < String(inst.artifact_date))) {
        drop(`contact ${inst.contact_ref} (${cd}) does not predate the party's artifact (${inst.artifact_date}) — OTCS-0007 §2`);
        continue;
      }
    }

    if (line === "entry_use") {
      const entry = String(inst.registry_entry ?? "");
      if (!externals.includes(entry)) {
        drop(`registry entry "${entry}" is not externally self-registered — founder entries are excluded as targets (OTCS-0007 §1)`);
        continue;
      }
    }
    (byLine[line] ?? (byLine[line] = [])).push(inst);
  }

  const count = (l: string) => ({
    qualifying: byLine[l].length,
    distinct_parties: new Set(byLine[l].map((i) => String(i.party))).size,
  });
  return {
    external_self_registrations: externals,
    coupled_pair: externals.length === 0,
    lines: {
      entry_use: count("entry_use"),
      vocabulary_use: count("vocabulary_use"),
      instrument_decisions: count("instrument_decision"),
    },
    excluded,
  };
}

/**
 * The all-dark interim tripwire (OTCS-0009 §2), pre-registered: on 2027-07-29,
 * zero external self-registrations AND zero on all three lines → the narrow
 * executes at the interim. Any single line non-zero → the clock continues.
 * The interim can narrow and can never pass.
 */
export function interimTripwire(c: Counted): { fires: boolean; reading: string } {
  const allDark =
    c.external_self_registrations.length === 0 &&
    c.lines.entry_use.qualifying === 0 &&
    c.lines.vocabulary_use.qualifying === 0 &&
    c.lines.instrument_decisions.qualifying === 0;
  return {
    fires: allDark,
    reading: allDark
      ? "ALL DARK — zero on every line and zero external self-registrations. On 2027-07-29 this reading executes the narrow (OTCS-0009 §2). It cannot pass anything."
      : "at least one line is non-zero — the clock continues to the final evaluation. The interim grants nothing.",
  };
}

/**
 * Criterion 3 against OTCS-0007's pre-registered matrix, on counts alone.
 * The two-party bar is RFC 6410's number; pairwise independence between the
 * counted parties is a ruling, so this reports the count-level reading and
 * names what remains the evaluator's.
 */
export function criterion3Reading(c: Counted): string {
  const e = c.lines.entry_use;
  if (e.qualifying >= 2 && e.distinct_parties >= 2)
    return `entry use at the bar on counts (${e.qualifying} instance(s), ${e.distinct_parties} part(ies)) — criterion 3 DEFEATED if a determination confirms pairwise independence (OTCS-0008)`;
  const v = c.lines.vocabulary_use;
  if (v.qualifying >= 2 && v.distinct_parties >= 2)
    return `entry use below bar, vocabulary use at the bar — criterion 3 MET: "instrument works, registry unused" (OTCS-0007 §3). Vocabulary use never defeats the criterion; it selects which narrow if the arithmetic lands there`;
  return "no line at the bar — criterion 3 MET (evidence absent). This finding needed nobody's cooperation, which is by design";
}

/** Criterion 2's scope: SPECIFIED wire formats, computed from the interface record (OTCS-0009 §4). */
export function specifiedWireFormats(read: (p: string) => string = (p) => readFileSync(join(ROOT, p), "utf8")): string[] {
  const out: string[] = [];
  for (const f of readdirSync(join(ROOT, "interfaces")).filter((f) => f.endsWith(".md")).sort()) {
    const m = read(`interfaces/${f}`).match(/schemas\/wire\/([a-z-]+)\.schema\.json\s*—\s*SPECIFIED/);
    if (m) out.push(m[1]);
  }
  return out;
}

// ---- run ---------------------------------------------------------------------
const invokedDirectly = process.argv[1]?.endsWith("use-evidence.ts");
if (invokedDirectly) run();

function run(): void {
  const loadList = (rel: string): Doc[] =>
    existsSync(join(ROOT, rel)) ? ((parse(readFileSync(join(ROOT, rel), "utf8")) as Doc[]) ?? []) : [];
  const instances = loadList("evidence/use-instances.yaml");
  const contacts = loadList("evidence/contact-log.yaml");

  const regDir = join(ROOT, "registry", "projects");
  const projects: Doc[] = readdirSync(regDir).sort()
    .map((id) => join(regDir, id, "otcs.yaml"))
    .filter((p) => existsSync(p))
    .map((p) => parse(readFileSync(p, "utf8")) as Doc);

  const externals = externalRegistrations(projects);
  const c = computeCounts(instances, contacts, externals);
  const wire = specifiedWireFormats();
  const today = process.env.OTCS_TODAY ?? new Date().toISOString().slice(0, 10);

  console.log(`use-evidence: ${instances.length} recorded instance(s), ${contacts.length} contact-log entr(ies), computed ${today}\n`);
  console.log(`external self-registrations: ${externals.length}${externals.length ? ` — ${externals.join(", ")}` : ""}`);
  console.log(`coupled pair (OTCS-0009 §3): criteria 1+3 ${c.coupled_pair ? "contribute ONE toward the thresholds — entry use is structurally impossible with zero external registrations" : "count separately — external entries exist"}\n`);
  for (const [name, l] of Object.entries(c.lines))
    console.log(`  ${name.padEnd(22)} ${l.qualifying} qualifying instance(s) from ${l.distinct_parties} distinct part(ies)`);
  for (const x of c.excluded) console.log(`    · excluded ${x.instance_id} (${x.line}): ${x.why}`);

  const trip = interimTripwire(c);
  console.log(`\ninterim reading, ${DATES.interim} (all-dark tripwire, OTCS-0009 §2): ${trip.reading}`);
  console.log(`final reading, ${DATES.final} (OTCS-0007 matrix): ${criterion3Reading(c)}`);
  console.log(`criterion 2 scope at this run (SPECIFIED wire formats): ${wire.join(", ") || "none"} — evaluated at the final date only`);
  console.log(`criterion 4 keeps immediate force at all times; nothing here waits for it`);
  console.log(`\nadvisory — conservative counts; rulings and the 2-of-4 arithmetic belong to a qualified determination (OTCS-0008); nothing stored on any record`);

  mkdirSync(dirname(LOG), { recursive: true });
  appendFileSync(LOG, JSON.stringify({
    computed_at: today,
    dates: DATES,
    external_self_registrations: externals,
    coupled_pair: c.coupled_pair,
    lines: c.lines,
    excluded: c.excluded,
    interim_tripwire: trip,
    criterion3_reading: criterion3Reading(c),
    specified_wire_formats: wire,
  }) + "\n");
}
