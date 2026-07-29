// Matrix, graph (computed interpretations, stamped) + interface domain pages.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { ROOT } from "./registry-load.js";
import { esc, badge, stampBox } from "./html.js";
import { mdToHtml } from "./md.js";
import type { Page } from "./pages.js";

const computed = (name: string) => JSON.parse(readFileSync(join(ROOT, "computed", name), "utf8"));
const DOMAINS = ["identity", "authority", "context", "environment", "policy",
  "decision", "receipt", "repair", "observer", "provenance"];

export function matrixPage(): Page {
  const m = computed("matrix.json");
  const head = DOMAINS.map((d) => `<th><a href="interfaces/${d}.html">${d}</a></th>`).join("");
  const rows = m.rows.map((r: any) => {
    const cls = r.record_state === "example" ? " class='example-row'" : "";
    const cells = DOMAINS.map((d) => {
      if (r.provides[d]) return `<td>${badge(r.provides[d])}</td>`;
      if (r.consumes.includes(d)) return `<td><span class="muted">consumes</span></td>`;
      return "<td></td>";
    }).join("");
    return `<tr${cls}><td><a href="projects/${esc(r.id)}.html">${esc(r.id)}</a> ${badge(r.record_state)}</td>${cells}</tr>`;
  }).join("\n");
  const body = `<h1>Capability matrix</h1>
<p>Cells carry a rung on the compatibility ladder, never a bare checkmark: ${m.ladder.map((l: string) => badge(l)).join(" → ")}.
The rungs ${m.unpopulated_rungs.map((l: string) => badge(l)).join(" and ")} are defined but currently unpopulated — no proposal has recorded a reference implementation, and no conformance suite exists yet. Saying so is the point.</p>
${stampBox(m.stamp)}
<table><tr><th>project</th>${head}</tr>
${rows}</table>`;
  return { path: "matrix.html", title: "Capability matrix", body };
}

export function graphPage(): Page {
  const g = computed("graph.json");
  const c = computed("complementarity.json");
  const nodes = g.nodes.map((n: any) =>
    `<li><a href="projects/${esc(n.id)}.html">${esc(n.id)}</a> — ${esc(n.name)} ${badge(n.record_state)}</li>`).join("\n");
  const edges = g.edges.map((e: any) =>
    `<tr><td>${esc(e.source)}</td><td>${esc(e.type)}</td><td>${esc(e.target)}</td><td>${badge(e.status)}</td></tr>`).join("\n");
  const pairs = c.pairs.slice(0, 8).map((p: any) =>
    `<tr><td>${esc(p.pair[0])} ↔ ${esc(p.pair[1])}</td><td>${p.bands.map((b: string) => badge(b)).join(" ")}</td></tr>`).join("\n");
  const body = `<h1>Relationship graph</h1>
<p>${g.summary.registered} registered · ${g.summary.observed} observed · ${g.summary.example} example <span class="muted">(excluded from real counts)</span></p>
${stampBox(g.stamp)}
<h2>Records</h2><ul>${nodes}</ul>
<h2>Declared relationships</h2>
<table><tr><th>source</th><th>relationship</th><th>target</th><th>status</th></tr>
${edges}</table>
<h2>Complementarity (computed interpretation)</h2>
<p>Categorical only. Numerical complementarity scores are <strong>deliberately not published</strong>: a figure like "84% complementary" reads as an objective evaluation while resting on incomplete self-description, subjective weights, unstable semantics, and unknown legal compatibility. These bands describe a relationship's shape; they do not rank, score, or recommend. The analysis looks for pairs that could compose, not pairs that sound alike.</p>
${stampBox(c.stamp)}
<table><tr><th>pair</th><th>relationship bands</th></tr>
${pairs}</table>`;
  return { path: "graph.html", title: "Relationship graph", body };
}

export function interfacePages(): Page[] {
  const out: Page[] = [];
  const items = readdirSync(join(ROOT, "interfaces")).filter((f) => f.endsWith(".md")).sort();
  const links = items.map((f) => {
    const name = f.replace(".md", "");
    return `<li><a href="${name}.html">${esc(name)}</a> ${badge("EXPERIMENTAL")}</li>`;
  }).join("\n");
  out.push({
    path: "interfaces/index.html", title: "Interfaces",
    body: `<h1>Interface capability domains</h1>
<p>Ten named capability domains — <strong>provisional hypotheses, not a completed partition of the field</strong> (CHARTER §9). Only the project manifest and the signal / decision / receipt wire formats are fully specified in v0.1; each domain below names its own open questions and the trigger that would justify formalizing it. See the <a href="model.html">interface model</a> for the compatibility ladder and the specification-vs-implementation distinction.</p>
<ul>${links}</ul>`,
  });
  out.push({
    path: "interfaces/model.html", title: "Interface model",
    body: mdToHtml(readFileSync(join(ROOT, "docs/interface-model.md"), "utf8")),
  });
  for (const f of items) {
    const name = f.replace(".md", "");
    out.push({
      path: `interfaces/${name}.html`, title: `Interface: ${name}`,
      body: mdToHtml(readFileSync(join(ROOT, "interfaces", f), "utf8")),
    });
  }
  return out;
}
