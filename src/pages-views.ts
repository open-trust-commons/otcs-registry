// Audience views — same registry data, different cuts — and the About/COI page.
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";
import { ROOT, type Doc } from "./registry-load.js";
import { esc, badge, maturityProfile } from "./html.js";
import type { Page } from "./pages.js";

const claimsFor = (id: string): Doc[] => {
  const p = join(ROOT, "registry/projects", id, "claims.yaml");
  return existsSync(p) ? (parse(readFileSync(p, "utf8")) as Doc[]) : [];
};
const link = (id: string) => `<a href="../projects/${esc(id)}.html">${esc(id)}</a>`;

export function viewPages(projects: Doc[]): Page[] {
  const registered = projects.filter((p) => p.project.record_state === "registered");

  const needsRows = registered.flatMap((p) => (p.needs ?? []).map((n: string) =>
    `<tr><td>${link(p.project.id)}</td><td>${esc(n)}</td></tr>`)).join("\n");
  const claimRows = registered.flatMap((p) => claimsFor(p.project.id).map((c) =>
    `<tr><td>${link(p.project.id)}</td><td>${esc(String(c.class))}</td><td>${esc(String(c.content))}</td><td>${badge(String(c.evidence_state))}</td><td>M${c.maturity}</td></tr>`)).join("\n");
  const zeroRows = registered.map((p) =>
    `<tr><td>${link(p.project.id)}</td><td>${maturityProfile(p.evidence ?? {})}</td></tr>`).join("\n");

  const index: Page = {
    path: "views/index.html", title: "Views",
    body: `<h1>Audience views</h1>
<p>One registry, five cuts. The data never changes between views — only the question being asked of it.</p>
<ul>
<li><a href="builders.html">Builders</a> — what interface should I implement?</li>
<li><a href="researchers.html">Researchers</a> — what has been tested, and by whom?</li>
<li><a href="enterprises.html">Enterprises</a> — what combination of projects composes?</li>
<li><a href="auditors.html">Auditors</a> — what evidence exists, and what can the record prove?</li>
<li><a href="funders.html">Funders</a> — where are the missing implementations?</li>
</ul>`,
  };
  const builders: Page = {
    path: "views/builders.html", title: "Builders",
    body: `<h1>Builders — what should I implement?</h1>
<p>Fully specified today: the <a href="../governance/coordinate-system.html">project manifest</a> and the three wire formats (signal, decision, receipt) in <code>schemas/wire/</code>. The ten <a href="../interfaces/index.html">capability domains</a> are provisional hypotheses — each names the trigger that would justify formalizing it, and your implementation is exactly the kind of external mapping expected to break the current boundaries (CHARTER §9). First implementations are permanently recorded; nobody acquires the interface (<a href="../interfaces/model.html">interface model</a>).</p>
<p>The strongest open target: an <strong>independent second implementation of the KTP falsifier suite</strong> — every registered record's validation column is waiting on one. See ${link("ktp")} and ${link("ktp-demo")}.</p>`,
  };
  const researchers: Page = {
    path: "views/researchers.html", title: "Researchers",
    body: `<h1>Researchers — what has been tested, by whom?</h1>
<p>Claim-by-claim, never project-by-project. Nothing in this registry currently occupies ${badge("INDEPENDENTLY_TESTED")} — the honest reading is that every claim below awaits an evaluator meeting the <a href="../governance/evidence-model.html">strict independence definition</a>.</p>
<table><tr><th>project</th><th>class</th><th>claim</th><th>evidence state</th><th>maturity</th></tr>
${claimRows}</table>`,
  };
  const enterprises: Page = {
    path: "views/enterprises.html", title: "Enterprises",
    body: `<h1>Enterprises — what composes?</h1>
<p>The registry maps function, not marketing: a working deployment composes a signal provider (environment), a decision system, an enforcement point, and evidence infrastructure. The <a href="../matrix.html">capability matrix</a> shows who claims which role, on the ladder — note that ${badge("CONFORMANCE_TESTED")} is currently unreachable, so "composes on paper" is the strongest available claim. The <a href="../graph.html">complementarity view</a> ranks pairs that could actually compose (provides→consumes), not pairs that sound alike. Fictional ${badge("example")} records demonstrate the shape; do not procure them.</p>`,
  };
  const auditors: Page = {
    path: "views/auditors.html", title: "Auditors",
    body: `<h1>Auditors — what can the record prove?</h1>
<p>Start at the <a href="../governance/ledger.html">governance ledger</a> (hash-chained; tamper-evident sequence integrity, with its limits stated). Every computed artifact carries algorithm version, input hashes, weights, and timestamp. Claims carry evidence states per the <a href="../governance/evidence-model.html">evidence model</a>; disputes are new records, never edits. The founder's conflicts are declared on the <a href="../about.html">About page</a> and in the charter — including what this registry cannot yet prove about itself.</p>`,
  };
  const funders: Page = {
    path: "views/funders.html", title: "Funders",
    body: `<h1>Funders — where are the gaps?</h1>
<p>Independent validation is the empty column across the whole registry:</p>
<table><tr><th>project</th><th>maturity profile</th></tr>
${zeroRows}</table>
<h2>Declared needs</h2>
<table><tr><th>project</th><th>needs</th></tr>
${needsRows}</table>`,
  };
  const about: Page = {
    path: "about.html", title: "About",
    body: `<h1>About the Open Trust Commons</h1>
<p>The Open Trust Commons — formally OTCS, the Open Trust Coordination System — is an open protocol and public registry for locating trust-related projects within a shared action-governance coordinate system; preserving their provenance, maturity, evidence and relationships; and enabling voluntary composition, testing and collaboration without requiring centralized ownership or manufactured consensus.</p>
<h2>Conflicts of interest — declared</h2>
<p>This system is founder-led during incubation (Stage 1), and the founder's interests overlap its subject matter. <strong>Chris Perkins (nmcitra)</strong> is simultaneously the author of KTP (the coordinate system OTCS adopts), the initial maintainer of OTCS, and the maintainer of the registered projects <code>ktp</code>, <code>ktp-demo</code>, and <code>abt</code>. Mitigations, succession stages, and the nomination process are in the <a href="governance/charter.html">charter</a> (§6–§7). The standing rule: the registry does not grade its own homework, and neither does its founder.</p>
<h2>OTCS scored on its own scale</h2>
<p>By its own maturity model, OTCS is currently:</p>
${maturityProfile({ specification: 2, implementation: 2, independent_validation: 0 })}
<p class="muted">Specified and running (schemas, validator, ledger, generators, this site) — with no independent evaluation. That zero is displayed on purpose.</p>
<h2>Record states</h2>
<p>${badge("registered")} project-controlled and maintainer-verified · ${badge("observed")} created from public evidence, not project-controlled, never presented as participation · ${badge("example")} fictional demonstration. A project may decline to appear here at all (charter §10).</p>`,
  };
  return [index, builders, researchers, enterprises, auditors, funders, about];
}
