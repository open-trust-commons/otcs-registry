// /how-it-works — the process, drawn in deterministic HTML/CSS.
// No Mermaid runtime, no Graphviz, no JavaScript: same rule that governs the
// dependency graph. The Mermaid source is offered alongside each diagram for
// anyone who wants to render it elsewhere (docs/process.md is the source of truth).
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ROOT } from "./registry-load.js";
import { esc, badge } from "./html.js";
import type { Page } from "./pages.js";

const step = (title: string, sub = "") =>
  `<div class="fstep"><strong>${title}</strong>${sub ? `<span class="sub">${sub}</span>` : ""}</div>`;
const gate = (title: string, sub = "") =>
  `<div class="fstep fgate"><strong>${title}</strong>${sub ? `<span class="sub">${sub}</span>` : ""}</div>`;
const arrow = (label = "") => `<div class="farrow">↓${label ? ` <span class="sub">${label}</span>` : ""}</div>`;
const branch = (cols: string[]) => `<div class="fbranch">${cols.join("")}</div>`;
const flow = (...parts: string[]) => `<div class="flow">${parts.join("\n")}</div>`;

// Pull the matching fenced block out of docs/process.md so the source shown
// beneath each diagram cannot drift from the committed documentation.
const SOURCE = readFileSync(join(ROOT, "docs/process.md"), "utf8");
const blocks = [...SOURCE.matchAll(/```mermaid\n([\s\S]*?)```/g)].map((m) => m[1].trimEnd());
const source = (i: number) =>
  `<details><summary>Mermaid source for this diagram</summary><pre><code>${esc(blocks[i] ?? "")}</code></pre></details>`;

export function howItWorksPage(): Page {
  const d1 = flow(
    step("People and projects"),
    arrow(),
    step("Project registry", "otcs.yaml manifest — a public, attributable claim about itself"),
    arrow(),
    step("Coordinate map", "actor · authority · action · environment · function · time · maturity"),
    arrow(),
    step("Evidence ledger", "claim by claim, never project by project"),
    arrow(),
    step("Relationship graph", "typed edges, each carrying who asserted it and on what evidence"),
    arrow(),
    step("Coordination", "offers · needs · interfaces"),
    arrow(),
    step("Composition in the world", "signals → decisions → enforcement → receipts → repair"),
    `<div class="farrow">↑ <span class="sub">field evidence returns here — the only way maturity reaches the top of the scale</span></div>`,
  );

  const d2 = flow(
    step("A project exists"),
    arrow("who is writing the record?"),
    branch([
      step("The project itself", "the normal path"),
      step("An OTCS maintainer, from public evidence", `${badge("observed")} — never presented as participation`),
      step("Nobody — the project declines", "DECLINE is honored; no page is created"),
    ]),
    arrow(),
    step("Pull request adding registry/projects/&lt;id&gt;/"),
    arrow(),
    gate("npm run validate", "schema · semantic rules · id consistency · dangling edges"),
    arrow("fails → fix and resubmit, loop until clean"),
    step("Maintainer merges"),
    arrow(),
    step("Ledger event: PROJECT_REGISTERED"),
    arrow(),
    step(`Live record ${badge("registered")}`, "existence asserted — not endorsement, validation, interoperability, originality, or conformance"),
  );

  const chain = ["SELF_ASSERTED", "DOCUMENTED", "REPRODUCIBLE"].map(badge).join(' <span class="link">→</span> ');
  const d3 = `<div class="fchain">${chain} <span class="link">→</span> <span class="fstep fgate">independence test</span> <span class="link">→</span> ${badge("INDEPENDENTLY_TESTED")} <span class="link">→</span> ${badge("FIELD_OBSERVED")}</div>
<p class="muted">Fail the independence test and the claim settles at ${badge("DOCUMENTED")} rather than climbing. Any claim can move sideways to ${badge("DISPUTED")} when a dispute record opens, or to ${badge("RETRACTED")} when its claimant withdraws it — retraction removes the claim's force, never the record of it.</p>
<p><strong>The independence test.</strong> An evaluator is not independent merely for being a separate legal entity. Any one of these and the evaluation lands at ${badge("DOCUMENTED")}: shared founders · shared funders · advisory relationship · reciprocal review · employment · contractor status · code contribution · commercial dependency · substantial prior collaboration.</p>`;

  const d4 = flow(
    step("SEED", "anyone, no standing required"),
    arrow(),
    step("DISCOVERY", "prior art, affected projects, risks, missing evidence"),
    arrow(),
    step("DRAFT", "concrete change published — the clock starts here"),
    arrow(),
    step("DELIBERATION", "objections raised and answered, or carried as unresolved"),
    arrow(),
    step("TRIAL", "implementation or simulation; interfaces target two independent ones"),
    arrow(),
    gate("Has the class minimum elapsed?", "no → wait. The clock binds the founder or it binds nobody."),
    arrow(),
    branch([
      step("Ballot A · Readiness", "specified and evidenced enough to decide?"),
      step("Ballot B · Ratification", "should this exact version pass?"),
      step("Ballot C · Implementation", "will your project actually implement it?"),
    ]),
    arrow(),
    gate("Process validity: A_g ≤ E_g", "the vote count alone ratifies nothing"),
    arrow(),
    branch([
      step("ALLOW → ratify", "the environment supports the decision"),
      step("SHAPE → revise", "scope or evidence too broad — back to deliberation"),
      step("DEAUTOMATE → return to humans", "deliberation was bypassed or overwhelmed"),
      step("VETO → reject", "cannot be legitimately supported"),
    ]),
    arrow(),
    step("OPERATION", "change is active, ledger event recorded"),
    arrow(),
    step("REVIEW", "every decision carries a review, expiry, or reaffirmation date → RENEWED or DEPRECATED"),
  );

  const d5 = `<div class="fbranch">
${step("Declared", "manifests · relationships · claims · ballots · receipts — authoritative, human-written, PR-reviewed")}
${step("Generators", "relationship graph · capability matrix · overlap O and complementarity Γ — deterministic")}
${step("computed/", "every artifact stamped with algorithm version, input hashes, weights, timestamp — interpretation, never attribute")}
</div>
<p class="muted">Both lanes render to the site; computed pages are labeled as interpretation. Every declared change emits an event into the append-only, hash-chained governance ledger.</p>`;

  const body = `<h1>How OTCS works</h1>
<p>Five views of one process. Diagrams are drawn in plain HTML and CSS — no diagram runtime, no JavaScript, no external assets, the same rule that governs the <a href="graph.html">relationship graph</a>. The Mermaid source sits under each one if you want to render it elsewhere; <code>docs/process.md</code> in the repository is its source of truth.</p>

<h2>1 · The system, end to end</h2>
<p>A project describes itself, gets located in shared coordinates, accumulates evidence and relationships, and becomes findable by people who need what it does. Nothing is validated by the fact of being listed.</p>
${d1}
${source(0)}

<h2>2 · Getting into the registry</h2>
<p>Self-registration is the normal path. Two other doors exist, and both are visibly different from it — including the one where a project tells us not to create a page in its name (<a href="governance/charter.html">charter §10</a>).</p>
${d2}
${source(1)}

<h2>3 · How a claim earns its evidence state</h2>
<p>Every claim moves on its own. A single project routinely holds claims in three different states at once; that is the expected condition, not an anomaly. Full rules: <a href="governance/evidence-model.html">the evidence model</a>.</p>
${d3}
${source(2)}

<h2>4 · How the shared system changes</h2>
<p>Nothing changes by consensus, seniority, or volume. It changes by proposal, on a clock, through three separate questions — and then through a gate that asks whether the deliberation itself was real.</p>
${d4}
<p><strong>Clocks by consequence:</strong> typo 24–72h · registry update 3–7d · interface clarification 7–14d · new interface 21–30d · breaking change 30–45d · constitutional or model revision 45–90d · emergency immediate but auto-expiring in 7 days.</p>
<p><strong>Why the gate matters.</strong> A proposal with 80% support is held, not ratified, if directly affected projects were absent, a serious objection went unanswered, notification failed, the fixed version changed mid-vote, or the participant set was organizationally concentrated. See it running: <a href="proposals/index.html">the proposals</a>.</p>
${source(3)}

<h2>5 · Declared facts vs computed interpretations</h2>
<p>The separation that keeps a score from turning into a reputation.</p>
${d5}
<p>Overlap says two projects occupy similar positions. It says nothing about copying — derivation needs chronology, documented access, distinctive terminology, structural correspondence, citations, and transmission paths. High overlap with no transmission evidence is <strong>independent convergence</strong>, which strengthens both records rather than diminishing either.</p>
<p>And the <a href="governance/ledger.html">ledger's</a> honest limit, stated wherever it appears: this is tamper-evident sequence integrity, not immutable evidence. The chain proves the committed records form a consistent sequence. It cannot prove that omitted events never existed, that timestamps are true, that the author held authority, or that any event's content is factually correct.</p>
${source(4)}

<hr>
<blockquote><p>A system that cannot show its own weakness in the same format it demands of everyone else is not a registry. It is a brochure.</p></blockquote>
<p>Which is why <a href="projects/ktp.html">KTP</a> is registered as project #1 with a zero in its validation column, why <a href="about.html">OTCS scores itself</a> on its own scale, why the unreachable rung is named on the <a href="matrix.html">capability matrix</a>, and why the proposal adopting this registry is sitting unfinished with its clock still running.</p>`;

  return { path: "how-it-works.html", title: "How it works", body };
}
