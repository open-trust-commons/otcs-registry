// Standing — what a record's evidence state is worth TODAY, recomputed from
// scratch on every run and never stored anywhere.
//
// WHY THIS EXISTS
// An external architectural review (Richard Lynes, Genesis AiX) supplied a
// break test: take the strongest claim in the corpus, then let its evaluator
// form a relationship, withdraw its evidence source, supersede the artifact it
// cites, change a coordinate's meaning underneath it, and re-review nothing.
// Ask whether it still reads as current and independently tested.
//
// It did. Five degradations for five. The record had preserved history
// perfectly and governed standing not at all.
//
// WHY THERE IS NO PROPAGATION MACHINERY HERE
// Propagation — dependency declarations, change events, a reverse index that
// walks from a change out to everything affected — is a problem you only have
// if you STORE conclusions. A stored `INDEPENDENTLY_TESTED` is a cached verdict
// that some later fact can silently falsify, and then you must chase every
// dependent that holds a copy. Miss one link and it stays wrong forever.
//
// Nothing here is stored. Standing is recomputed from current facts every run,
// so there is no cache to invalidate and nothing to propagate to. Card networks
// have run this shape for decades: they do not maintain a list of customers
// whose risk changed, they rescore every transaction inline against current
// data. Pull, not push.
//
// THE ASYMMETRY THAT MATTERS
// This can only ever LOWER standing. It reads dates, versions, hashes and
// presence — all checkable. It cannot discover that an evaluator took a
// contract last month. So the clean result is UNREVIEWED, never UNCHANGED:
// "nothing here says otherwise" is not "someone checked."
//
//   The machine lowers standing. Only a person raises it, by appending a
//   record saying they looked.
//
// That is deautomation, and it is also what reconciles the two sources this
// design drew on: macaroon caveats attenuate monotonically and never restore,
// and Richard's rule is that nothing regains standing without an explicit
// governed re-evaluation. Automation restricts; restoration is a human act.
//
// WHAT THIS IS NOT
// Not a score. NON-GOALS §2 permits standing as a per-claim profile and forbids
// collapsing it into one number: "any future interface that renders a single
// headline score violates this document." So standing attaches to a single
// claim on a single axis and MUST NOT be rolled up into a project-level
// verdict. A green light next to a project is the headline score, wearing a hat.
//
// ADVISORY. Exit is always 0. It reports and logs; it changes no record and no
// count. Making it binding is a model change and belongs in a proposal with a
// clock, not in a founder's Sunday afternoon.
import { readFileSync, readdirSync, existsSync, appendFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const LOG = join(ROOT, "computed", "standing-log.jsonl");

/**
 * Today, overridable via OTCS_TODAY so a run is reproducible from a clone.
 *
 * Read per call, not once at module load. As a load-time constant the value was
 * fixed before a test file could set the variable (imports hoist above
 * assignments), so the suite silently ran against the wall clock and would have
 * started failing on its own a year later.
 */
const today = (): Date => new Date(process.env.OTCS_TODAY ?? new Date().toISOString().slice(0, 10));
const daysSince = (d?: string): number =>
  d ? Math.round((+today() - +new Date(d)) / 86_400_000) : Number.POSITIVE_INFINITY;

type Doc = Record<string, any>;
/** Weakest-first. A run reports the weakest state any check produced. */
const ORDER = ["UNREVIEWED", "POTENTIALLY_STALE", "STALE"] as const;
type State = (typeof ORDER)[number];
const weakest = (a: State, b: State): State => (ORDER.indexOf(b) > ORDER.indexOf(a) ? b : a);

/** States asserting that something outside the record supports the claim. */
const STRONG = new Set(["REPRODUCIBLE", "INDEPENDENTLY_TESTED", "FIELD_OBSERVED"]);

type Row = { project: string; index: number; declared: string; state: State; reasons: string[]; defects: string[] };

/**
 * TWO AXES, NEVER ONE.
 *
 * Richard Lynes drew the line and it is load-bearing: "later change removes
 * current standing; new evidence of an earlier defect challenges historical
 * validity. Those must remain separate."
 *
 * STANDING answers *is this still good* — the world moved underneath a record
 * that was correctly made. Age, a relationship formed since, a lapsed owner
 * confirmation, a withdrawn project. Decay. It is nobody's fault and it is
 * repaired by re-review.
 *
 * DEFECTS answer *was this ever good* — the record was wrong when written.
 * INDEPENDENTLY_TESTED with nothing to point at was never supported; it did not
 * become unsupported. That is not staleness, and re-review does not fix it. It
 * needs a correction or a dispute record against the historical claim.
 *
 * The first version returned one state and got these apart only by luck of
 * which rule happened to fire first.
 */

export function assess(claim: Doc, manifest: Doc): { state: State; reasons: string[]; defects: string[] } {
  const reasons: string[] = [];
  const defects: string[] = [];
  let state: State = "UNREVIEWED";
  /** The world moved. Repairable by re-review. */
  const drop = (s: State, why: string) => { state = weakest(state, s); reasons.push(why); };
  /** The record was wrong when written. Re-review does not repair it. */
  const defect = (why: string) => { defects.push(why); };

  const interval: number = manifest.freshness?.review_interval_days ?? 365;

  // --- age against the project's own declared review interval ---------------
  const age = daysSince(claim.date);
  if (age > interval * 2) drop("STALE", `${age}d old, more than twice the ${interval}d review interval`);
  else if (age > interval) drop("POTENTIALLY_STALE", `${age}d old, past the ${interval}d review interval`);

  // --- semantic containment (VERSIONING.md §4) ------------------------------
  // A record means what its coordinates meant under the version it declares.
  // A claim that cannot name its version cannot be read safely at all.
  if (!claim.otcs_version) defect("no otcs_version — the record never said which vocabulary governed it");
  else if (manifest.otcs_version && claim.otcs_version !== manifest.otcs_version)
    drop("POTENTIALLY_STALE", `otcs_version ${claim.otcs_version} differs from manifest ${manifest.otcs_version}`);

  // --- independence over time (EVIDENCE-MODEL.md §3) ------------------------
  const ind = claim.evaluator_independence;
  if (claim.evidence_state === "INDEPENDENTLY_TESTED") {
    if (!ind) defect("INDEPENDENTLY_TESTED with no independence record — never established, not decayed");
    else {
      if (ind.current_status === "RELATIONSHIP_FORMED_SINCE")
        drop("POTENTIALLY_STALE", `evaluator relationship formed since assessment: ${ind.relationship_note ?? "unstated"}`);
      if (ind.current_status === "UNREVIEWED")
        drop("POTENTIALLY_STALE", "independence never re-reviewed since assessment");
      const checked = daysSince(ind.current_status_as_of);
      if (checked > interval) drop("POTENTIALLY_STALE", `independence last determined ${checked}d ago`);
    }
  }

  // --- evidence still points at something -----------------------------------
  if (STRONG.has(claim.evidence_state)) {
    const ev: string[] = claim.evidence ?? [];
    if (!ev.length) defect(`${claim.evidence_state} with no evidence pointer — never supported, not unsupported`);
    if (!manifest.project?.canonical_url && !manifest.project?.canonical_artifact)
      drop("POTENTIALLY_STALE", `${claim.evidence_state} but the project declares no public canonical artifact`);
  }

  // --- declared dependencies (the fifth break) -------------------------------
  // A recompute can only see declared facts. Before `depends_on` existed, a
  // claim resting on an artifact superseded elsewhere read as current forever
  // — four of the break test's five degradations were caught, and this one was
  // not, because nothing in the corpus said the dependency existed. The
  // declaration gives the supersession somewhere to land; this reads it.
  for (const dep of (claim.depends_on ?? []) as Doc[]) {
    const id = dep.identifier ?? "unnamed dependency";
    if (dep.status === "SUPERSEDED")
      drop("STALE", `dependency ${id} superseded${dep.superseded_by ? ` by ${dep.superseded_by}` : ""} — claim not re-reviewed against the successor`);
    if (dep.status === "RETRACTED")
      drop("STALE", `dependency ${id} was retracted by its owner`);
    if (dep.status === "CURRENT" && daysSince(dep.status_as_of) > interval)
      drop("POTENTIALLY_STALE", `dependency ${id} last verified ${daysSince(dep.status_as_of)}d ago`);
    // UNREVIEWED or absent: the honest default. It neither lowers nor
    // launders — the claim's clean floor is already UNREVIEWED, and punishing
    // a declaration would teach records not to declare.
  }

  // --- the project underneath the claim -------------------------------------
  const rs = manifest.project?.record_state;
  if (rs && rs !== "registered") drop("STALE", `project record_state is ${rs}`);
  if (manifest.withdrawal?.active_participation === false) drop("STALE", "project has withdrawn from participation");
  const conf = manifest.freshness?.next_owner_confirmation ?? manifest.ownership?.verification?.verified_at;
  if (daysSince(conf) > 365) drop("STALE", "owner confirmation lapsed");

  return { state, reasons, defects };
}

// ---- run ---------------------------------------------------------------------
// Guarded so the assessment logic can be imported and tested. Without this the
// module would scan the registry and append to the log on every import.
const invokedDirectly = process.argv[1]?.endsWith("standing.ts");
if (invokedDirectly) run();

function run(): void {
const rows: Row[] = [];
const regDir = join(ROOT, "registry", "projects");
for (const id of readdirSync(regDir).sort()) {
  const cf = join(regDir, id, "claims.yaml");
  const mf = join(regDir, id, "otcs.yaml");
  if (!existsSync(cf) || !existsSync(mf)) continue;
  const manifest = parse(readFileSync(mf, "utf8")) as Doc;
  const claims = (parse(readFileSync(cf, "utf8")) as Doc[]) ?? [];
  claims.forEach((c, index) => {
    const { state, reasons, defects } = assess(c, manifest);
    rows.push({ project: id, index, declared: String(c.evidence_state), state, reasons, defects });
  });
}

const flagged = rows.filter((r) => r.state !== "UNREVIEWED");
for (const r of rows) {
  const head = `${r.project}[${r.index}]`.padEnd(16);
  console.log(`${head} ${r.declared.padEnd(21)} → ${r.state}`);
  for (const why of r.reasons) console.log(`${" ".repeat(16)}   · ${why}`);
  for (const why of r.defects) console.log(`${" ".repeat(16)}   ! DEFECT ${why}`);
}

const defective = rows.filter((r) => r.defects.length);
const counts = ORDER.map((s) => `${rows.filter((r) => r.state === s).length} ${s.toLowerCase()}`).join(" · ");
console.log(`\nstanding: ${rows.length} claim(s) recomputed as of ${today().toISOString().slice(0, 10)} — ${counts}`);
if (defective.length)
  console.log(`${defective.length} claim(s) carry a DEFECT — a record that was wrong when written. ` +
    `Re-review does not repair these; they need a correction or dispute record (GOVERNANCE.md §10).`);
console.log("advisory — nothing here is stored on a record or counted toward a gate");

// A pull model gives today's answer and no history. Logging each run is what
// makes "when did this go stale, and why" answerable later.
mkdirSync(dirname(LOG), { recursive: true });
appendFileSync(LOG, JSON.stringify({
  computed_at: today().toISOString().slice(0, 10),
  total: rows.length,
  flagged: flagged.length,
  defective: defective.length,
  rows: rows.map(({ project, index, declared, state, reasons, defects }) =>
    ({ project, index, declared, state, reasons, defects })),
}) + "\n");
}
