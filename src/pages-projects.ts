// Project pages + registry index.
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

const list = (xs?: string[]) => (xs?.length ? xs.map(esc).join(", ") : "<span class='muted'>—</span>");
const wtable = (obj?: Record<string, number>) =>
  obj && Object.keys(obj).length
    ? "<table class='profile'><tr>" + Object.keys(obj).map((k) => `<th>${esc(k)}</th>`).join("") + "</tr><tr>" +
      Object.values(obj).map((v) => `<td>${v}</td>`).join("") + "</tr></table>"
    : "<span class='muted'>—</span>";

export function projectsIndex(projects: Doc[]): Page {
  const rows = projects.map((p) => {
    const pr = p.project;
    const cls = pr.record_state === "example" ? " class='example-row'" : "";
    return `<tr${cls}><td><a href="${esc(pr.id)}.html">${esc(pr.id)}</a></td><td>${esc(pr.name)}</td>` +
      `<td>${badge(pr.record_state)}</td><td>${esc(pr.status)}</td><td>${maturityProfile(p.evidence ?? {})}</td></tr>`;
  }).join("\n");
  const body = `<h1>Projects</h1>
<p>Registration means only that a project has made a public, attributable claim about itself. Maturity is always a profile — specification, implementation, and independent validation are scored separately and never collapsed.</p>
<table><tr><th>id</th><th>name</th><th>record state</th><th>status</th><th>maturity profile</th></tr>
${rows}</table>`;
  return { path: "projects/index.html", title: "Projects", body };
}

export function projectPage(p: Doc, edges: Doc[]): Page {
  const pr = p.project, d = p.declaration ?? {}, c = p.coordinates ?? {};
  const id = String(pr.id);
  const myEdges = edges.filter((e) => e.source_project === id || e.target_project === id);
  const exampleBanner = pr.record_state === "example"
    ? `<p class="example-banner">EXAMPLE — fictional demonstration record; implements nothing; excluded from real counts</p>` : "";
  const edgeRows = myEdges.map((e) =>
    `<tr><td>${esc(e.source_project)}</td><td>${esc(e.relationship_type)}</td><td>${esc(e.target_project)}</td>` +
    `<td>${badge(e.status)}</td><td class="muted">${esc(e.asserted_by)}</td></tr>`).join("\n");
  const claimRows = claimsFor(id).map((cl) =>
    `<tr><td>${esc(cl.class)}</td><td>${esc(cl.content)}</td><td>${badge(cl.evidence_state)}</td><td>M${cl.maturity}</td></tr>`).join("\n");
  const body = `${exampleBanner}
<h1>${esc(pr.name)} ${badge(pr.record_state)}</h1>
<p class="muted">${esc(id)} · ${esc(pr.status)} · first public ${esc(pr.first_public_date)} · ${esc(pr.license)}${pr.canonical_url ? ` · <a href="${esc(pr.canonical_url)}">canonical</a>` : ""}</p>
<h2>Declaration</h2>
<p>${esc(String(d.problem ?? ""))}</p>
<table>
<tr><th>governed object</th><td>${list(d.governed_object)}</td></tr>
<tr><th>decision outputs</th><td>${list(d.decision_outputs)}</td></tr>
<tr><th>enforcement points</th><td>${list(d.enforcement_points)}</td></tr>
<tr><th>evidence outputs</th><td>${list(d.evidence_outputs)}</td></tr>
<tr><th>known limitations</th><td>${esc(String(d.known_limitations ?? ""))}</td></tr>
</table>
<h2>Maturity profile</h2>
${maturityProfile(p.evidence ?? {})}
<h2>Coordinates</h2>
<table>
<tr><th>actor</th><td>${wtable(c.actor)}</td></tr>
<tr><th>authority</th><td>${list(c.authority)}</td></tr>
<tr><th>verbs</th><td>${list(c.verbs)}</td></tr>
<tr><th>environment</th><td>${list(c.environment)}</td></tr>
<tr><th>functions</th><td>${wtable(c.functions)}</td></tr>
<tr><th>time</th><td>${list(c.time)}</td></tr>
</table>
<h2>Interfaces</h2>
<p>provides: ${list(p.interfaces?.provides)} · consumes: ${list(p.interfaces?.consumes)}</p>
<h2>Relationships</h2>
${myEdges.length ? `<table><tr><th>source</th><th>type</th><th>target</th><th>status</th><th>asserted by</th></tr>\n${edgeRows}</table>` : "<p class='muted'>none recorded</p>"}
<h2>Claims</h2>
${claimRows ? `<table><tr><th>class</th><th>claim</th><th>evidence state</th><th>maturity</th></tr>\n${claimRows}</table>` : "<p class='muted'>none recorded</p>"}
<h2>Coordination</h2>
<p>offers: ${list(p.offers)}<br>needs: ${list(p.needs)}</p>`;
  return { path: `projects/${id}.html`, title: pr.name, body };
}
