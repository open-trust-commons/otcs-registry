// Participation — each actor's public trail of governance acts, recomputed
// from scratch on every run and never stored on any record.
//
// WHY THIS EXISTS
// CHARTER.md §7 opens maintainer nominations after sustained substantive
// participation in the governance, and issue #14 defined "sustained": the
// VOTING.md §2 trail of acts, demonstrated publicly across more than one
// proposal, over 90 days — and COMPUTED rather than noticed. Without this
// file, the destination in the wayfinder map depends on a trigger nothing
// watches for, and the founder is the party who decides whether it fired.
//
// THE RULE THAT DECIDES EVERY EDGE CASE
// Public substance only. An act counts when its substance is readable by
// anyone and attributable to the actor: a tracked artifact in this
// repository (a ballot file, an objection file, a proposal), or the actor's
// own words on the public issue tracker under their own account. A ledger
// event whose only substance is the recorder's `note` is the RECORDER'S
// account of what someone did — however substantive, it is not the actor's
// own public act, and it scores zero (COMMUNICATIONS.md §7; issue #14's
// stated consequence: the strongest engagement to date does not qualify as
// it stands, because it arrived privately).
//
// WHAT THIS IS NOT
// Not a leaderboard. NON-GOALS.md §2 forbids collapsing anything into a
// headline number and §5 forbids ranking. The output is one trail per actor
// against the published bar, ordered alphabetically — never by volume, and
// no number in it aggregates across actors. Identity may be a handle
// (VOTING.md §7 at version 0.1; issue #14). Raw message count earns nothing
// (VOTING.md §8): the GitHub side counts distinct proposals touched, not
// comment volume.
//
// ADVISORY. Exit is always 0. It reports and logs; it appoints nobody and
// changes no record. The bar it reports against is #14's published one;
// applying the result is a human governance act.
import { readFileSync, readdirSync, existsSync, appendFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { readLedger, type LedgerEvent } from "./ledger.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const LOG = join(ROOT, "computed", "participation-log.jsonl");

/** Today, overridable via OTCS_TODAY so a run is reproducible from a clone.
 *  Read per call, not at module load — imports hoist above assignments, and a
 *  load-time constant would silently ignore a test's OTCS_TODAY (see standing.ts). */
const today = (): Date => new Date(process.env.OTCS_TODAY ?? new Date().toISOString().slice(0, 10));
const daysBetween = (a: string, b: Date): number => Math.round((+b - +new Date(a)) / 86_400_000);

/** One public act in an actor's trail. */
export type Act = {
  actor: string;
  date: string;           // YYYY-MM-DD
  act: string;            // the VOTING.md §2 act, or the ledger's own name where §2 has none
  source: "ledger" | "github";
  touches: string[];      // proposal ids / governing documents the act engages
  qualifies: boolean;     // public substance, attributable to the actor
  why: string;            // stated either way — every exclusion shows its reason
};

/** The published bar, from issue #14's resolution. Change requires a proposal, not an edit here. */
export const BAR = {
  min_distinct_touched: 2, // "across more than one proposal"
  min_days: 90,            // "over 90 days"
} as const;

/**
 * Declared identity links only. The founder's ledger id and GitHub login are
 * the same disclosed person (MAINTAINERS.md §1); nothing else is ever merged.
 * Inferring that two identities are one person is a judgment, not a
 * computation, and does not belong in this file.
 */
export const ALIASES: Record<string, string> = { nmcitra: "chris-perkins-nmcitra" };
const canon = (id: string): string => ALIASES[id] ?? id;

/**
 * Ledger event types → the act they record, and where its public substance
 * must exist. `artifact: null` means the event's only substance is the
 * recorder's note — see the header rule; such events never qualify.
 * Operator/bookkeeping events are not participation and map to nothing.
 */
const LEDGER_ACTS: Record<string, { act: string; artifact: ((pid: string) => string) | null } | null> = {
  PROPOSAL_CREATED:  { act: "joined (opened the proposal)",  artifact: (p) => `proposals/${p}/proposal.md` },
  VERSION_PUBLISHED: { act: "published a version",           artifact: (p) => `proposals/${p}/proposal.md` },
  OBJECTION_RAISED:  { act: "raised an objection",           artifact: (p) => `proposals/${p}/objections` },
  OBJECTION_ANSWERED:{ act: "answered a counterargument",    artifact: (p) => `proposals/${p}/objections` },
  CONFLICT_DISCLOSED:{ act: "declared conflicts",            artifact: (p) => `proposals/${p}` },
  BALLOT_CAST:       { act: "cast a final ballot",           artifact: (p) => `proposals/${p}/ballots` },
  TEST_RESULT_ADDED: { act: "tested an implementation",      artifact: null },
  COMMENT_SUBMITTED: { act: "comment recorded in the ledger",artifact: null },
  DECISION_RECORDED: null, // operator act — recording others' outcome, not participating
  RECORD_UPDATED:    null, // operator act
  EVIDENCE_ANCHORED: null, // operator act
};

/** Classify one ledger event. Returns null for non-participation events. */
export function classifyLedgerEvent(
  e: LedgerEvent,
  artifactExists: (rel: string) => boolean = (rel) => existsSync(join(ROOT, rel)),
): Act | null {
  const mapping = LEDGER_ACTS[String(e.event_type)];
  if (mapping === null || mapping === undefined) return null;
  const actor = canon(String(e.actor_id ?? "unknown"));
  const date = String(e.timestamp ?? "").slice(0, 10);
  const pid = e.proposal_id ? String(e.proposal_id) : null;

  if (!mapping.artifact || !pid) {
    return {
      actor, date, act: mapping.act, source: "ledger", touches: pid ? [pid] : [],
      qualifies: false,
      why: "no public artifact of the actor's own — the event's substance is the recorder's account (COMMUNICATIONS.md §7)",
    };
  }
  const rel = mapping.artifact(pid);
  const present = artifactExists(rel);
  return {
    actor, date, act: mapping.act, source: "ledger", touches: [pid],
    qualifies: present,
    why: present ? `public artifact: ${rel}` : `artifact missing: ${rel} — nothing for a stranger to read`,
  };
}

/** Proposal ids and governing documents a piece of public text engages. */
export function touchesOf(body: string): string[] {
  const out = new Set<string>();
  for (const m of body.matchAll(/\bOTCS-\d{4}\b/g)) out.add(m[0]);
  for (const m of body.matchAll(/\b([A-Z][A-Z0-9_-]{2,})\.md\b/g)) out.add(m[1] + ".md");
  return [...out].sort();
}

/** A public GitHub issue or comment, already fetched. */
export type PublicItem = { author: string; created_at: string; body: string };

/**
 * Classify one public GitHub item. The machine does not decide WHICH §2 act a
 * comment constitutes — that is reading comprehension, not computation. What
 * it can verify is the part the rule turns on: the substance is public, dated,
 * and attributable to the handle that wrote it.
 */
export function classifyPublicItem(item: PublicItem): Act {
  const bot = /\[bot\]$|^github-actions/.test(item.author);
  const touches = touchesOf(item.body ?? "");
  return {
    actor: canon(item.author),
    date: String(item.created_at).slice(0, 10),
    act: "wrote on the public record (issue tracker)",
    source: "github",
    touches,
    qualifies: !bot && touches.length > 0,
    why: bot
      ? "automation, not a participant"
      : touches.length ? `engages ${touches.join(", ")}` : "engages no proposal or governing document — recorded, counts toward nothing",
  };
}

export type Row = {
  actor: string;
  qualifying_acts: number;
  acts: string[];               // distinct act kinds, qualifying only
  distinct_touched: string[];   // proposals/documents across qualifying acts
  first_qualifying_act: string | null;
  days_since_first: number | null;
  bar: "MET" | "NOT MET";
  gaps: string[];               // what is missing, stated so nobody has to ask the founder
  excluded_acts: number;        // acts recorded but not qualifying — visible, never silently dropped
};

/** Fold acts into one row per actor. Alphabetical — never ranked (NON-GOALS.md §5). */
export function table(acts: Act[], at: Date = today()): Row[] {
  const byActor = new Map<string, Act[]>();
  for (const a of acts) {
    if (!byActor.has(a.actor)) byActor.set(a.actor, []);
    byActor.get(a.actor)!.push(a);
  }
  const rows: Row[] = [];
  for (const [actor, list] of byActor) {
    const q = list.filter((a) => a.qualifies).sort((a, b) => a.date.localeCompare(b.date));
    const touched = [...new Set(q.flatMap((a) => a.touches))].sort();
    const first = q[0]?.date ?? null;
    const days = first ? daysBetween(first, at) : null;
    const gaps: string[] = [];
    if (q.length === 0) gaps.push("no qualifying public act");
    if (touched.length < BAR.min_distinct_touched)
      gaps.push(`${touched.length} distinct proposal(s)/document(s) touched, bar is ${BAR.min_distinct_touched}`);
    if (days === null || days < BAR.min_days)
      gaps.push(days === null ? "90-day clock never started" : `${days}d since first qualifying act, bar is ${BAR.min_days}d`);
    rows.push({
      actor,
      qualifying_acts: q.length,
      acts: [...new Set(q.map((a) => a.act))].sort(),
      distinct_touched: touched,
      first_qualifying_act: first,
      days_since_first: days,
      bar: gaps.length === 0 ? "MET" : "NOT MET",
      gaps,
      excluded_acts: list.length - q.length,
    });
  }
  return rows.sort((a, b) => a.actor.localeCompare(b.actor));
}

// ---- GitHub fetch ------------------------------------------------------------
// The public issue tracker is Plane B (COMMUNICATIONS.md §2) — where an outside
// participant's substance actually lands today. Fetched read-only over the
// public API; a token is used only for rate limits when the environment has one.
const REPO = process.env.OTCS_REPO ?? "open-trust-commons/otcs-registry";

async function fetchPublicItems(): Promise<PublicItem[] | null> {
  const headers: Record<string, string> = { accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const get = async (path: string): Promise<any[]> => {
    const out: any[] = [];
    for (let page = 1; page <= 10; page++) {
      const res = await fetch(`https://api.github.com/repos/${REPO}/${path}?state=all&per_page=100&page=${page}`, { headers });
      if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`);
      const batch = (await res.json()) as any[];
      out.push(...batch);
      if (batch.length < 100) break;
    }
    return out;
  };
  try {
    const [issues, comments] = await Promise.all([get("issues"), get("issues/comments")]);
    return [...issues, ...comments].map((x) => ({
      author: String(x.user?.login ?? "unknown"),
      created_at: String(x.created_at ?? ""),
      body: String(x.body ?? ""),
    }));
  } catch (err) {
    console.error(`participation: public comments unavailable (${(err as Error).message}) — ledger only this run`);
    return null;
  }
}

// ---- run ---------------------------------------------------------------------
const invokedDirectly = process.argv[1]?.endsWith("participation.ts");
if (invokedDirectly) run();

async function run(): Promise<void> {
  const events = readLedger();
  const ledgerActs = events.map((e) => classifyLedgerEvent(e)).filter((a): a is Act => a !== null);
  const items = await fetchPublicItems();
  const acts = [...ledgerActs, ...(items ?? []).map(classifyPublicItem)];
  const rows = table(acts);

  for (const r of rows) {
    console.log(`${r.actor}`);
    console.log(`  qualifying acts: ${r.qualifying_acts} (${r.acts.join(" · ") || "none"})`);
    console.log(`  distinct proposals/documents: ${r.distinct_touched.length}${r.distinct_touched.length ? ` — ${r.distinct_touched.join(", ")}` : ""}`);
    console.log(`  first qualifying act: ${r.first_qualifying_act ?? "—"} (${r.days_since_first ?? "—"}d ago)`);
    console.log(`  bar (${BAR.min_distinct_touched}+ proposals over ${BAR.min_days}d, public substance): ${r.bar}`);
    for (const g of r.gaps) console.log(`    · missing: ${g}`);
    if (r.excluded_acts) console.log(`    · ${r.excluded_acts} recorded act(s) did not qualify — reasons in the log`);
  }
  console.log(`\nparticipation: ${rows.length} actor(s) recomputed as of ${today().toISOString().slice(0, 10)}` +
    ` — sources: ledger ${events.length} event(s), issue tracker ${items ? items.length + " item(s)" : "UNAVAILABLE"}`);
  console.log("advisory — one trail per actor against the published bar; alphabetical, never ranked; nothing stored on any record");

  mkdirSync(dirname(LOG), { recursive: true });
  appendFileSync(LOG, JSON.stringify({
    computed_at: today().toISOString().slice(0, 10),
    sources: { ledger_events: events.length, github_items: items?.length ?? null },
    actors: rows,
    excluded: acts.filter((a) => !a.qualifies),
  }) + "\n");
}
