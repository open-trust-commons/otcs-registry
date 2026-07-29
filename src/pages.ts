// Page builders for the OTCS site. Each returns { path, title, body }.
// P0: home. Later phases append builders here.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { loadRegistry, ROOT } from "./registry-load.js";
import { projectsIndex, projectPage } from "./pages-projects.js";
import { matrixPage, graphPage, interfacePages } from "./pages-computed.js";
import { governancePages, proposalPages } from "./pages-governance.js";
import { viewPages } from "./pages-views.js";
import { howItWorksPage } from "./pages-how.js";

export type Page = { path: string; title: string; body: string };

const computed = (name: string) => JSON.parse(readFileSync(join(ROOT, "computed", name), "utf8"));

function home(): Page {
  const graph = computed("graph.json");
  const s = graph.summary;
  const body = `
<h1>Open Trust Commons</h1>
<p class="muted">Formally <strong>OTCS</strong>, the Open Trust Coordination System. The Commons is what it is; the Coordination System is how it works.</p>
<blockquote><p><strong>An open protocol and public registry for locating trust-related projects within a shared action-governance coordinate system; preserving their provenance, maturity, evidence and relationships; and enabling voluntary composition, testing and collaboration without requiring centralized ownership or manufactured consensus.</strong></p></blockquote>
<p><em>List the work. Locate the function. Preserve the lineage. Test the claim. Connect the pieces.</em></p>
<p>OTCS is a governed commons, not a directory. Specifications, implementation claims, validation results, provenance records, and compatibility statements each carry explicit authority, evidence, scope, version, and appeal paths. The system itself is governed by the principles it documents, so that no maintainer, vendor, reviewer, or coalition can exercise more control than the shared environment can legitimately sustain.</p>

<h2>The constitutional boundary</h2>
<table>
<tr><th>Domain</th><th>Controls</th></tr>
<tr><td><strong>KTP</strong> — the Kinetic Trust Protocol</td><td>the invariant <code>A(t) ≤ E(t)</code>; the coordinate system; the action model; core semantics; the standard decision outcomes (ALLOW / SHAPE / DEAUTOMATE / VETO)</td></tr>
<tr><td><strong>OTCS</strong> — this registry</td><td>registration; manifests; relationship records; proposals; implementation and compatibility status; evidence states</td></tr>
<tr><td><strong>Registered projects</strong></td><td>their own ownership, products, roadmaps, canonical repositories, and which interfaces they implement</td></tr>
</table>
<p>Projects do not become KTP. They expose interfaces the coordinate system understands.</p>

<h2>The registry today</h2>
<p><strong>${s.registered}</strong> registered · <strong>${s.observed}</strong> observed · <strong>${s.example}</strong> example records <span class="muted">(fictional demonstrations, excluded from real counts)</span></p>
<p>Registration means only that a project has made a public, attributable claim about itself. It does not imply endorsement, validation, interoperability, originality, or conformance. See <a href="governance/non-goals.html">what OTCS refuses to become</a>.</p>

<h2>Start here</h2>
<ul>
<li><a href="how-it-works.html">How it works</a> — the process in five diagrams</li>
<li><a href="projects/index.html">Projects</a> — the records, with per-claim evidence states and maturity profiles</li>
<li><a href="matrix.html">Capability matrix</a> — who claims what, on the compatibility ladder (never a bare checkmark)</li>
<li><a href="proposals/index.html">Proposals</a> — the shared system changes only through this process, clocks included</li>
<li><a href="governance/index.html">Governance</a> — charter, evidence model, voting, security, non-goals</li>
</ul>`;
  return { path: "index.html", title: "Home", body };
}

export function pages(): Page[] {
  const { projects, edges } = loadRegistry();
  return [
    home(),
    howItWorksPage(),
    projectsIndex(projects),
    ...projects.map((p) => projectPage(p, edges)),
    matrixPage(),
    graphPage(),
    ...interfacePages(),
    ...governancePages(),
    ...proposalPages(),
    ...viewPages(projects),
  ];
}
