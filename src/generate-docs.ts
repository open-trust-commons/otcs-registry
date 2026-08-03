// TypeScript is the data compiler; MkDocs is only the renderer (ADR-002).
//
// This emits every page under docs/generated/ from two sources: the
// constitutional Markdown at the repository root, and the live registry. The
// renderer never reads YAML, never computes a count, and never decides what a
// record means. If MkDocs is replaced, everything here survives unchanged.
//
// DETERMINISM IS A REQUIREMENT, NOT A NICETY. Two runs on the same inputs must
// produce byte-identical output, because the Pages mirror and the Vercel deploy
// are built separately and their divergence is a published integrity check
// (HOSTING-AND-MIRRORS.md). Nothing here may read the wall clock.
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, rmSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";
import { loadRegistry, type Doc } from "./registry-load.js";
import { computeStatus } from "./roadmap-status.js";
import { readLedger } from "./ledger.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "docs", "generated");

const slug = (f: string) => f.replace(/\.md$/, "").toLowerCase().replace(/_/g, "-") + ".md";
const sha = (s: string) => createHash("sha256").update(s).digest("hex").slice(0, 12);

/** Root documents that are NOT published as pages, and why. */
const NOT_PUBLISHED: Record<string, string> = {
  "README.md": "the site's own index page says this, in the site's voice",
  "PROGRESS.md": "working notes, not a governing document",
  "CLAUDE.md": "how this repo is worked on, not what it governs",
};

/** Grouping for the document index. Order is deliberate: what governs, then what constrains. */
const GROUPS: Array<{ title: string; note: string; files: string[] }> = [
  { title: "Start here", note: "The questions people actually ask, plainest first. Every answer points at the document that governs it.",
    files: ["FAQ.md"] },
  { title: "Constitution", note: "What OTCS is, who decides, and how a decision becomes binding.",
    files: ["CHARTER.md", "GOVERNANCE.md", "VOTING.md", "MAINTAINERS.md", "PARTICIPATION.md", "COMMUNICATIONS.md", "MINORITY-REPORTS.md"] },
  { title: "What the record means", note: "The rules that decide what a record does and does not assert.",
    files: ["LAYERS.md", "EVIDENCE-MODEL.md", "REGISTRY-POLICY.md", "OWNER-VERIFICATION.md", "OWNER-RESPONSE-POLICY.md", "PROJECT-LIFECYCLE.md", "IDENTIFIERS.md", "QUALIFYING-PROJECTS.md", "COMMONS-STAGES.md"] },
  { title: "Analysis", note: "OTCS may analyse projects. These are the constraints on doing so.",
    files: ["ANALYSIS-MODEL.md", "ANALYST-DISCLOSURE.md", "AI-REVIEW-PROTOCOL.md", "ALGORITHM-REGISTRY.md", "CALIBRATION.md"] },
  { title: "Refusals", note: "What OTCS will not do. These bind harder than the rest.",
    files: ["NON-GOALS.md", "BADGE-AND-CLAIMS-POLICY.md", "ACCEPTABLE-USE.md", "SAFETY.md", "AI-USE.md", "TRADEMARKS.md", "PRIVACY.md"] },
  { title: "Releases and versions", note: "How a version comes to exist and what it promises.",
    files: ["ROADMAP.md", "VERSIONING.md", "RELEASE-PROCESS.md", "RELEASE-GOVERNANCE.md", "VERSION-EXIT-CRITERIA.md", "DEPRECATION.md", "MIGRATIONS.md", "CHANGELOG.md", "ROADMAP-CHANGES.md"] },
  { title: "Integrity and operations", note: "Keeping the record verifiable by parties who do not trust us.",
    files: ["RUNBOOK.md", "SECURITY.md", "ANCHORING.md", "INCIDENT-RESPONSE.md", "HOSTING-AND-MIRRORS.md", "SYNC-POLICY.md", "FEDERATION.md", "ACCESSIBILITY.md", "SUSTAINABILITY.md", "PREMORTEM.md"] },
  { title: "Contributing", note: "How to take part.",
    files: ["REGISTERING.md", "CONTRIBUTING.md", "CODE_OF_CONDUCT.md", "DCO.md", "IPR-POLICY.md"] },
];

/**
 * Every root document is either grouped in the index or explicitly skipped.
 *
 * There is no third state. Four documents — LAYERS, REGISTERING, ROADMAP and
 * RUNBOOK — were generated as pages while missing from the index, so they
 * existed but could not be found by anyone browsing. Two of them are the
 * front doors. Silence is the wrong default here: adding a document should
 * force a decision about where a reader finds it.
 */
{
  const grouped = new Set(GROUPS.flatMap((g) => g.files));
  const stray = readdirSync(ROOT)
    .filter((f) => f.endsWith(".md"))
    .filter((f) => !grouped.has(f) && !(f in NOT_PUBLISHED));
  if (stray.length) {
    console.error(
      `generate:docs — ${stray.length} root document(s) in no index group and not skipped:\n` +
        stray.map((f) => `  ${f}`).join("\n") +
        `\nAdd each to a GROUPS entry, or to NOT_PUBLISHED with a reason.`,
    );
    process.exit(1);
  }
}

function banner(source: string): string {
  return `!!! info "Generated page"\n    Compiled from \`${source}\` by \`npm run generate:docs\`. Edit the source, not this file. ` +
    `The repository is the record; this page is a rendering of it.\n\n`;
}

/**
 * Rewrite links between root documents so they resolve after slugging.
 *
 * At the repository root a document links to a sibling as `CHARTER.md`. In
 * docs/generated/ that file is `charter.md`, so the same link 404s — and
 * MkDocs runs strict, which turns a 404 into a failed build. Every link whose
 * target is a real root document is rewritten to its slug; anything else
 * (external URLs, paths into schemas/ or registry/) is left alone.
 */
function rewriteLinks(body: string, rootDocs: Set<string>): string {
  return body.replace(/\]\(([A-Za-z0-9._-]+\.md)(#[^)]*)?\)/g, (whole, target, frag) =>
    rootDocs.has(target) ? `](${slug(target)}${frag ?? ""})` : whole,
  );
}

/** MkDocs admonitions need four-space indentation; nothing else is rewritten. */
function copyDoc(file: string, rootDocs: Set<string>): { slug: string; title: string; body: string } {
  const raw = rewriteLinks(readFileSync(join(ROOT, file), "utf8"), rootDocs);
  const title = (raw.match(/^#\s+(.+)$/m)?.[1] ?? file.replace(/\.md$/, "")).trim();
  return { slug: slug(file), title, body: banner(file) + raw };
}

function projectsPages(projects: Doc[]) {
  const pages: Array<{ path: string; body: string }> = [];
  const byState = (s: string) => projects.filter((p) => p.project.record_state === s);

  const row = (p: Doc) =>
    `| [${p.project.name}](${p.project.id}.md) | \`${p.project.record_state}\` | ${p.project.status ?? "—"} | ` +
    `${(p.project.project_type ?? []).join(", ") || "—"} | ${p.ownership?.verification?.status ?? "unverified"} |`;

  const head = "| Project | Record state | Status | Type | Owner verification |\n|---|---|---|---|---|";

  pages.push({
    path: "projects/index.md",
    body:
`${banner("registry/projects/*/project.yaml")}# Projects

A record here means a project **described itself** in a shared vocabulary, or that OTCS
transcribed public evidence about it. It is not a rating, an endorsement, or a claim that
the project works. Record state is the first thing to read.

| Record state | What it means |
|---|---|
| \`registered\` | the owner submitted it and confirmed the record |
| \`observed\` | built from public evidence, not project-controlled, **never** presented as participation |
| \`example\` | fixtures that exercise the schema; **excluded from every count** |

## Registered (${byState("registered").length})

${head}
${byState("registered").map(row).join("\n") || "| _none_ | | | | |"}

## Observed (${byState("observed").length})

${byState("observed").length
  ? `${head}\n${byState("observed").map(row).join("\n")}`
  : "No observed records. The capability exists in the schema and is deliberately not exercised until the moderation and right-of-response processes are mature."}

## Examples (${byState("example").length}) — not real projects

${byState("example").map((p) => `- \`${p.project.id}\` — ${p.project.name}`).join("\n") || "_none_"}
`});

  for (const p of projects) {
    const pr = p.project;
    const iface = p.interfaces ?? {};
    pages.push({
      path: `projects/${pr.id}.md`,
      body:
`${banner(`registry/projects/${pr.id}/project.yaml`)}# ${pr.name}

!!! warning "Record state: \`${pr.record_state}\`"
    ${pr.record_state === "example"
      ? "This is a **schema fixture**, not a real project. It is excluded from every count on this site."
      : pr.record_state === "observed"
      ? "Built from public evidence. The project **did not** submit this and is **not** a participant."
      : "The owner submitted this record. OTCS has not verified that the software does what the record says."}

| Field | Value |
|---|---|
| Identifier | \`${pr.id}\` |
| Status | ${pr.status ?? "—"} |
| Type | ${(pr.project_type ?? []).join(", ") || "—"} |
| Lifecycle | ${pr.lifecycle ?? "—"} |
| Canonical artifact | ${pr.canonical_url ? `<${pr.canonical_url}>` : pr.canonical_artifact ? `\`${pr.canonical_artifact}\`` : "**none published**"} |
| Licence | ${p.licensing?.license ?? "—"} |
| Owner verification | \`${p.ownership?.verification?.status ?? "unverified"}\` |
| First public | ${pr.first_public_date ?? "—"} |

## In its own words

${p.declaration?.problem ?? "_No declaration recorded._"}
${p.declaration?.non_claims?.length ? `\n**What it does not claim:** ${p.declaration.non_claims.join(" · ")}\n` : ""}
${p.declaration?.known_limitations ? `\n**Known limitations, as stated by the project:** ${p.declaration.known_limitations}\n` : ""}
## Coordinates — the registry's projection, not the project's identity

The section above is the project's voice. What follows is where OTCS locates it in the
shared vocabulary — a projection the owner may dispute without losing anything
(the \`mapping\` block records exactly that).

${["actor", "authority", "action", "environment", "function", "time"].map((c) => {
  const v = p.coordinates?.[c];
  const list = Array.isArray(v) ? v : v ? Object.keys(v) : [];
  return `- **${c}** — ${list.length ? list.map((x: string) => `\`${x}\``).join(", ") : "_not addressed_"}`;
}).join("\n")}

An empty coordinate means the project **does not address** it. It is not a gap, a deficiency,
or a lower score — several successful systems address exactly one coordinate deliberately.

## Interfaces

- **Provides:** ${(iface.provides ?? []).map((d: string) => `\`${d}\``).join(", ") || "_none declared_"}
- **Consumes:** ${(iface.consumes ?? []).map((d: string) => `\`${d}\``).join(", ") || "_none declared_"}

Declared, not tested. No conformance suite exists yet, so no claim on this page rests on one.
`});
  }
  return pages;
}

function dataPages() {
  const { projects, edges } = loadRegistry();
  const status = computeStatus();
  const events = readLedger();
  const pages: Array<{ path: string; body: string }> = [...projectsPages(projects)];

  // --- capability matrix
  pages.push({
    path: "matrix.md",
    body:
`${banner("registry/ + src/generate.ts")}# Capability matrix

Every cell is a **ladder rung**, never a checkmark. A checkmark would say "this works";
a rung says exactly how far the evidence goes.

| Rung | What it establishes |
|---|---|
| \`CLAIMS_TO_IMPLEMENT\` | the project asserts it |
| \`MANIFEST_VALIDATED\` | the record passes schema and semantic validation |
| \`REFERENCE_IMPLEMENTATION\` | a named implementation exists |
| \`CONFORMANCE_TESTED\` | it passed a published suite |

**The top two rungs are unpopulated.** No proposal has recorded a reference implementation and
no conformance suite exists. Saying so is the point of publishing the ladder at all.

| Project | Provides | Consumes |
|---|---|---|
${projects.map((p) => `| ${p.project.name} | ${(p.interfaces?.provides ?? []).map((d: string) => `\`${d}\` MANIFEST_VALIDATED`).join("<br>") || "—"} | ${(p.interfaces?.consumes ?? []).map((d: string) => `\`${d}\``).join(", ") || "—"} |`).join("\n")}
`});

  // --- relationship graph
  pages.push({
    path: "graph.md",
    body:
`${banner("registry/edges/ + src/generate.ts")}# Relationship graph

Relationships are **declared**, and a declaration by one side is not agreement by the other.
Each edge carries its own status; nothing is inferred from co-occurrence.

${edges.length ? `| Source | Relationship | Target | Status |\n|---|---|---|---|\n${edges.map((e: Doc) => `| \`${e.source_project}\` | ${e.relationship_type} | \`${e.target_project}\` | ${e.status} |`).join("\n")}` : "No relationships are declared. An empty graph is the honest state of a registry this young — edges here would have to be invented to exist."}

## What this graph is not

It is not a dependency graph, not a compatibility guarantee, and not a map of who works with whom.
Two projects appearing near each other means someone declared an edge and said what kind.
`});

  // --- interfaces
  const iModel = existsSync(join(ROOT, "docs/interface-model.md"))
    ? readFileSync(join(ROOT, "docs/interface-model.md"), "utf8") : "# The interface model\n\n_Not yet written._";
  pages.push({ path: "interfaces/model.md", body: banner("docs/interface-model.md") + iModel });

  const domains = ["identity", "authority", "context", "environment", "policy", "decision", "receipt", "repair", "observer", "provenance"];
  pages.push({
    path: "interfaces/index.md",
    body:
`${banner("registry/ + interfaces/")}# Interfaces

Ten interface domains. A project declares which it **provides** and which it **consumes**.
Nothing is tested; a declaration is a statement of intent in a shared vocabulary.

| Domain | Provided by | Consumed by |
|---|---|---|
${domains.map((d) => {
  const prov = projects.filter((p) => (p.interfaces?.provides ?? []).includes(d)).map((p) => p.project.id);
  const cons = projects.filter((p) => (p.interfaces?.consumes ?? []).includes(d)).map((p) => p.project.id);
  return `| \`${d}\` | ${prov.map((x) => `\`${x}\``).join(", ") || "—"} | ${cons.map((x) => `\`${x}\``).join(", ") || "—"} |`;
}).join("\n")}
`});

  // --- proposals
  const propDir = join(ROOT, "proposals");
  const props = existsSync(propDir)
    ? readdirSync(propDir).filter((f) => f.endsWith(".yaml") || f.endsWith(".md")).sort()
    : [];
  pages.push({
    path: "proposals/index.md",
    body:
`${banner("proposals/")}# Proposals

A proposal is how the protocol changes. Discussion explores; a proposal formalizes;
a pull request changes the record; a release establishes a version.

${props.length ? props.map((f) => `- \`${f}\``).join("\n") : "_No proposals are open._"}

Every proposal carries a minimum comment period that cannot be shortened by agreement,
and a decision that closes it must record the objections it did not satisfy.
`});

  // --- ledger
  const counts = events.reduce((a: Record<string, number>, e) => {
    const k = String(e.event_type); a[k] = (a[k] ?? 0) + 1; return a;
  }, {});
  pages.push({
    path: "ledger.md",
    body:
`${banner("governance-log/events.jsonl")}# Governance ledger

${events.length} events, hash-chained. Run \`npm run ledger:verify\` against a clone; you do not
have to take this page's word for it.

## What the chain proves

That the committed records form a consistent sequence, and that no committed record was altered
after the fact.

## What it does not prove

That events **omitted** from the ledger never happened · that the timestamps are true ·
that the authors held the authority they exercised · that the record is complete.
External timestamp anchoring addresses exactly the second of these, and only for anchored rounds.

| Event type | Count |
|---|---|
${Object.entries(counts).sort().map(([k, v]) => `| \`${k}\` | ${v} |`).join("\n")}

| Event | Type | Timestamp |
|---|---|---|
${events.map((e) => `| \`${e.event_id}\` | ${e.event_type} | ${e.timestamp} |`).join("\n")}
`});

  // --- roadmap: the document plus the measurement
  const roadmapDoc = rewriteLinks(
    readFileSync(join(ROOT, "ROADMAP.md"), "utf8"),
    new Set(readdirSync(ROOT).filter((f) => f.endsWith(".md"))),
  );
  const g = (status.gates as Record<string, Doc>)["1.0.0"];
  pages.push({
    path: "roadmap.md",
    body:
`${banner("ROADMAP.md + roadmap/status.yaml")}# Roadmap

!!! note "Measured ${status.measured_at}, not asserted"
    Commons stage **${status.commons_stage.id} — ${status.commons_stage.name}**.
    **${status.qualifying_active_projects}** qualifying active project(s) of ${status.registry_records_total} records ·
    **${status.independent_stewards}** independent steward(s) · ${status.project_classes.length} project class(es).
    Computed from the live registry by \`npm run roadmap:status\` against the rules in
    \`QUALIFYING-PROJECTS.md\`. Records that fail are listed below with the reason.

### Records that do not qualify

${status.non_qualifying.length
  ? `| Record | Why not |\n|---|---|\n${status.non_qualifying.map((n: Doc) => `| \`${n.id}\` | ${n.reasons.join(" · ")}|`).join("\n")}`
  : "_All records qualify._"}

${g ? `### Road to v1.0.0\n\nQualifying active projects **${g.qualifying_active_projects}** · independent stewards **${g.independent_stewards}** · project classes **${g.project_classes}**.\n` : ""}
---

${roadmapDoc.replace(/^#\s+.*$/m, "").trim()}
`});

  return pages;
}

export function generateDocs(): { written: string[]; digest: string } {
  rmSync(OUT, { recursive: true, force: true });
  mkdirSync(OUT, { recursive: true });

  const rootDocs = readdirSync(ROOT).filter((f) => f.endsWith(".md") && !NOT_PUBLISHED[f]).sort();
  const written: string[] = [];
  const parts: string[] = [];

  const write = (rel: string, body: string) => {
    const p = join(OUT, rel);
    mkdirSync(dirname(p), { recursive: true });
    writeFileSync(p, body.endsWith("\n") ? body : body + "\n");
    written.push(`generated/${rel}`);
    parts.push(`${rel}\n${body}`);
  };

  // ROADMAP.md is emitted by dataPages with the live measurement attached.
  const rootSet = new Set(rootDocs);
  for (const f of rootDocs.filter((f) => f !== "ROADMAP.md")) {
    const d = copyDoc(f, rootSet);
    write(d.slug, d.body);
  }
  for (const p of dataPages()) write(p.path, p.body);

  // The document index — one nav entry that reaches every constitutional document.
  const grouped = new Set(GROUPS.flatMap((g) => g.files));
  const ungrouped = rootDocs.filter((f) => !grouped.has(f) && f !== "ROADMAP.md");
  write("documents.md",
`${banner("the repository root")}# All documents

Everything that governs OTCS, in full. Nothing here is a summary; the summaries are elsewhere
and they are not the record.

${GROUPS.map((g) =>
`## ${g.title}\n\n${g.note}\n\n${g.files.filter((f) => existsSync(join(ROOT, f)))
  .map((f) => `- [${(readFileSync(join(ROOT, f), "utf8").match(/^#\s+(.+)$/m)?.[1] ?? f).trim()}](${slug(f)})`).join("\n")}`).join("\n\n")}

${ungrouped.length ? `## Also published\n\n${ungrouped.map((f) => `- [${(readFileSync(join(ROOT, f), "utf8").match(/^#\s+(.+)$/m)?.[1] ?? f).trim()}](${slug(f)})`).join("\n")}` : ""}

## Not published here, and why

${Object.entries(NOT_PUBLISHED).map(([f, why]) => `- \`${f}\` — ${why}`).join("\n")}
`);

  // Separator is \x1f (unit separator), not \0. Both are impossible in the
  // joined content, so both stop two different file sets hashing alike — but a
  // NUL byte makes git and grep classify this file as BINARY. Diffs render as
  // "Binary files differ" and grep silently declines to search it. A source
  // file nobody can review is worse than a slightly unconventional separator.
  return { written: written.sort(), digest: sha(parts.sort().join("\n\x1f\n")) };
}

// ---- CLI -------------------------------------------------------------------
if (process.argv[1]?.endsWith("generate-docs.ts")) {
  const r = generateDocs();
  console.log(`docs: ${r.written.length} pages → docs/generated/`);
  console.log(`content digest: ${r.digest}`);
}
