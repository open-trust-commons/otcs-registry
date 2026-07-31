// Compute Commons stage and gate progress from the LIVE registry.
// The dashboard reports a measurement, not a claim.
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { parse, stringify } from "yaml";
import { loadRegistry, ROOT, type Doc } from "./registry-load.js";

const TODAY = process.env.OTCS_TODAY ?? new Date().toISOString().slice(0, 10);
const monthsSince = (d?: string) =>
  !d ? Infinity : (Date.parse(TODAY) - Date.parse(d)) / (1000 * 60 * 60 * 24 * 30.44);

/** QUALIFYING-PROJECTS.md — all conditions must hold. */
export function qualifies(p: Doc, claims: Doc[]): { ok: boolean; failed: string[] } {
  const failed: string[] = [];
  const pr = p.project ?? {};
  if (pr.record_state !== "registered") failed.push(`record_state=${pr.record_state ?? "unset"}`);
  const v = p.ownership?.verification?.status;
  if (!v || v === "unverified" || v === "transcribed_by_otcs") failed.push("owner not verified");
  if (!pr.canonical_url && !pr.canonical_artifact) failed.push("no canonical public artifact");
  if (!claims.length) failed.push("no evidence record");
  const substantive = (p.declaration?.problem ?? "").length > 20;
  if (!substantive) failed.push("no substantive claim declared");
  const conf = p.freshness?.next_owner_confirmation ?? p.ownership?.verification?.verified_at;
  if (monthsSince(conf) > 12) failed.push("owner confirmation older than 12 months");
  if (p.withdrawal?.active_participation === false) failed.push("withdrawn");
  if (pr.lifecycle === "archived") failed.push("archived");
  if (p.identity_dispute_open) failed.push("unresolved identity dispute");
  return { ok: failed.length === 0, failed };
}

/** Stewards are counted by disclosed affiliation, not by account. */
export function stewards(qaps: Doc[]): string[] {
  const s = new Set<string>();
  for (const p of qaps) {
    const owners = p.ownership?.owners ?? [];
    if (!owners.length) { s.add(`unnamed:${p.project.id}`); continue; }
    for (const o of owners) s.add((o.organization || o.name || "unknown").trim().toLowerCase());
  }
  return [...s].sort();
}

function claimsFor(id: string): Doc[] {
  const p = join(ROOT, "registry/projects", id, "claims.yaml");
  return existsSync(p) ? (parse(readFileSync(p, "utf8")) as Doc[]) : [];
}

export function computeStatus() {
  const { projects } = loadRegistry();
  const stagesDoc = parse(readFileSync(join(ROOT, "roadmap/stages.yaml"), "utf8"));

  const evaluated = projects.map((p) => ({ p, ...qualifies(p, claimsFor(p.project.id)) }));
  const qaps = evaluated.filter((e) => e.ok).map((e) => e.p);
  const st = stewards(qaps);
  const classes = new Set(qaps.flatMap((p) => p.project.project_type ?? []));

  const stage = stagesDoc.stages.find((s: any) =>
    qaps.length >= s.qualifying_projects.min &&
    (s.qualifying_projects.max === undefined || qaps.length <= s.qualifying_projects.max)) ?? stagesDoc.stages[0];

  const gates: Record<string, unknown> = {};
  for (const v of ["1.0.0", "2.0.0", "3.0.0", "4.0.0"]) {
    const f = join(ROOT, "roadmap/releases", `${v}.yaml`);
    if (!existsSync(f)) continue;
    const r = parse(readFileSync(f, "utf8"));
    const eco = r.criteria?.ecosystem ?? {};
    gates[v] = {
      name: r.name,
      commons_stage_required: r.commons_stage_required,
      qualifying_active_projects: `${qaps.length} / ${eco.qualifying_active_projects?.minimum ?? "—"}`,
      independent_stewards: `${st.length} / ${eco.independent_stewards?.minimum ?? "—"}`,
      project_classes: `${classes.size} / ${eco.project_classes?.minimum ?? "—"}`,
      sustained_days_required: eco.qualifying_active_projects?.sustained_days ?? null,
    };
  }

  /**
   * Non-count criteria, per release, tallied by block.
   *
   * VERSION-EXIT-CRITERIA §6: "the counts make the trajectory visible; the
   * non-count criteria make it honest." Reporting only the counts made this
   * tool the dishonest half of its own rule — a reader saw 1/10 projects and
   * nothing about whether the constitutional claim had ever been tested.
   */
  const nonCount: Record<string, Record<string, { met: number; total: number; unmet: string[] }>> = {};
  for (const f of readdirSync(join(ROOT, "roadmap/releases")).filter((f) => f.endsWith(".yaml"))) {
    const r = parse(readFileSync(join(ROOT, "roadmap/releases", f), "utf8")) as Doc;
    const per: Record<string, { met: number; total: number; unmet: string[] }> = {};
    for (const [block, items] of Object.entries((r.criteria ?? {}) as Record<string, Doc>)) {
      if (block === "ecosystem") continue; // counted above, not here
      const entries = Object.entries(items ?? {});
      per[block] = {
        met: entries.filter(([, v]) => (v as Doc)?.state === "met").length,
        total: entries.length,
        unmet: entries.filter(([, v]) => (v as Doc)?.state !== "met").map(([k]) => k),
      };
    }
    nonCount[r.version as string] = per;
  }

  return {
    measured_at: TODAY,
    non_count_criteria: nonCount,
    note: "Computed from the live registry against QUALIFYING-PROJECTS.md. A measurement, not a claim.",
    commons_stage: { id: stage.id, name: stage.name },
    qualifying_active_projects: qaps.length,
    independent_stewards: st.length,
    steward_list: st,
    project_classes: [...classes].sort(),
    registry_records_total: projects.length,
    non_qualifying: evaluated.filter((e) => !e.ok)
      .map((e) => ({ id: e.p.project.id, reasons: e.failed })),
    gates,
  };
}

if (process.argv[1]?.endsWith("roadmap-status.ts")) {
  const s = computeStatus();
  /**
   * `measured_at` is inherited when nothing else changed.
   *
   * Writing today's date on every run made the file differ after a command
   * that discovered nothing — noise in every diff, and permanent drift
   * between two checkouts of the same commit. Worse, it trains a reader to
   * ignore a changed status file, which is the one file that should never be
   * ignored.
   *
   * So the date now means "when this measurement last CHANGED", not "when
   * the command last ran". If the registry has not moved, the measurement is
   * still true and its date is still the date it became true.
   */
  const out = join(ROOT, "roadmap/status.yaml");
  if (existsSync(out)) {
    const prev = parse(readFileSync(out, "utf8")) as Record<string, unknown>;
    const same = stringify({ ...prev, measured_at: null }) === stringify({ ...s, measured_at: null });
    if (same && typeof prev.measured_at === "string") s.measured_at = prev.measured_at;
  }
  writeFileSync(out, stringify(s));
  console.log(`Commons stage: ${s.commons_stage.id} — ${s.commons_stage.name}`);
  console.log(`  qualifying active projects: ${s.qualifying_active_projects} (of ${s.registry_records_total} records)`);
  console.log(`  independent stewards: ${s.independent_stewards}`);
  console.log(`  project classes: ${s.project_classes.length}`);
  console.log(`\nnon-qualifying records:`);
  for (const n of s.non_qualifying) console.log(`  ${n.id}: ${n.reasons.join(" · ")}`);
  console.log(`\nroad to v1.0.0: ${(s.gates as any)["1.0.0"]?.qualifying_active_projects} projects · ` +
              `${(s.gates as any)["1.0.0"]?.independent_stewards} stewards`);
  const nc = (s as any).non_count_criteria?.["1.0.0"] ?? {};
  const tot = Object.values(nc).reduce((a: any, b: any) => ({ met: a.met + b.met, total: a.total + b.total }), { met: 0, total: 0 }) as { met: number; total: number };
  console.log(`non-count criteria for v1.0.0: ${tot.met}/${tot.total} met`);
  for (const [block, v] of Object.entries(nc) as [string, any][]) {
    console.log(`  ${block.padEnd(20)} ${v.met}/${v.total}`);
  }
  const sov = nc.sovereignty;
  if (sov && sov.met === 0) {
    console.log(`\n  none of the ${sov.total} sovereignty criteria has been tested.`);
    console.log(`  they are what decide whether "no system must surrender its identity`);
    console.log(`  in order to coordinate" is true or is only written down.`);
  }
  console.log(`→ roadmap/status.yaml`);
}
