// Proposal pages, constitutional document renders, and the ledger view.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";
import { ROOT, type Doc } from "./registry-load.js";
import { esc, badge } from "./html.js";
import { mdToHtml } from "./md.js";
import type { Page } from "./pages.js";

const DOCS: [string, string, string][] = [
  ["CHARTER.md", "charter", "Charter"],
  ["GOVERNANCE.md", "governance", "Governance"],
  ["VOTING.md", "voting", "Voting"],
  ["EVIDENCE-MODEL.md", "evidence-model", "Evidence model"],
  ["SECURITY.md", "security", "Security"],
  ["COMMUNICATIONS.md", "communications", "Communications"],
  ["CODE_OF_CONDUCT.md", "code-of-conduct", "Code of conduct"],
  ["NON-GOALS.md", "non-goals", "Non-goals"],
  ["docs/coordinate-system.md", "coordinate-system", "Coordinate system"],
];

export function governancePages(): Page[] {
  const out: Page[] = [];
  const links = DOCS.map(([, slug, title]) => `<li><a href="${slug}.html">${esc(title)}</a></li>`).join("\n");
  out.push({
    path: "governance/index.html", title: "Governance",
    body: `<h1>Governance</h1>
<p>The shared system changes only through the public proposal process, on consequence-scaled clocks, with process-validity determined separately from vote totals. These documents are the constitution; the <a href="ledger.html">governance ledger</a> is the append-only record of every formal event.</p>
<ul>${links}</ul>`,
  });
  /**
   * The static site renders only the documents in DOCS. A cross-document link
   * written for the repository root points at a .md file that does not exist
   * here, so every one of them has to be resolved or removed.
   *
   *   in DOCS      -> rewritten to that page's .html
   *   not in DOCS  -> unwrapped to plain text, keeping the words and dropping
   *                   the link. Inventing a URL for a page this site does not
   *                   build would be worse than not linking.
   */
  const PAGE_FOR = new Map(DOCS.map(([file, slug]) => [file, `${slug}.html`]));
  const resolveDocLinks = (md: string): string =>
    md.replace(/\[([^\]]+)\]\(([A-Za-z0-9._/-]+\.md)(#[^)]*)?\)/g, (whole, text, target, frag) => {
      const page = PAGE_FOR.get(target);
      return page ? `[${text}](${page}${frag ?? ""})` : text;
    });

  for (const [file, slug, title] of DOCS)
    out.push({ path: `governance/${slug}.html`, title, body: mdToHtml(resolveDocLinks(readFileSync(join(ROOT, file), "utf8"))) });

  const events = readFileSync(join(ROOT, "governance-log/events.jsonl"), "utf8")
    .trim().split("\n").filter(Boolean).map((l) => JSON.parse(l) as Doc);
  const rows = events.map((e) =>
    `<tr><td><code>${esc(String(e.event_id))}</code></td><td>${esc(String(e.event_type))}</td>` +
    `<td>${esc(String(e.proposal_id ?? ""))}</td><td>${esc(String(e.timestamp))}</td>` +
    `<td><code class="muted">${esc(String(e.content_hash).slice(0, 12))}…</code></td></tr>`).join("\n");
  out.push({
    path: "governance/ledger.html", title: "Governance ledger",
    body: `<h1>Governance ledger</h1>
<p>${events.length} events, hash-chained. This is tamper-evident sequence integrity, not immutable evidence: the chain proves the committed records form a consistent sequence — it cannot prove omitted events never existed, that timestamps are true, or that authors held authority (SECURITY §3). Verify locally: <code>npm run ledger:verify</code>.</p>
<table><tr><th>event</th><th>type</th><th>proposal</th><th>timestamp</th><th>hash</th></tr>
${rows}</table>`,
  });
  return out;
}

export function proposalPages(): Page[] {
  const out: Page[] = [];
  const propDir = join(ROOT, "proposals");
  const ids = readdirSync(propDir).filter((d) => existsSync(join(propDir, d, "proposal.yaml"))).sort();
  const items: string[] = [];
  for (const id of ids) {
    const y = parse(readFileSync(join(propDir, id, "proposal.yaml"), "utf8")) as Doc;
    const decided = existsSync(join(propDir, id, "decision.json"));
    items.push(`<tr><td><a href="${esc(id)}.html">${esc(id)}</a></td><td>${esc(String(y.title))}</td>` +
      `<td>${esc(String(y.class))}</td><td>${badge(String(y.phase))}</td>` +
      `<td>${decided ? "decided" : `<em>clock running — no decision before the ${esc(String(y.class))} minimum elapses</em>`}</td></tr>`);

    const md = existsSync(join(propDir, id, "proposal.md")) ? mdToHtml(readFileSync(join(propDir, id, "proposal.md"), "utf8")) : "";
    const history = ((y.phase_history ?? []) as Doc[]).map((h) => `<tr><td>${esc(String(h.phase))}</td><td>${esc(String(h.date))}</td></tr>`).join("");
    const objDir = join(propDir, id, "objections");
    const objections = existsSync(objDir)
      ? readdirSync(objDir).sort().map((f) => mdToHtml(readFileSync(join(objDir, f), "utf8"))).join("<hr>")
      : "<p class='muted'>none recorded</p>";
    const balDir = join(propDir, id, "ballots");
    const ballots = existsSync(balDir)
      ? readdirSync(balDir).sort().map((f) => {
          const b = parse(readFileSync(join(balDir, f), "utf8")) as Doc;
          return `<tr><td>${esc(String(b.ballot_type))}</td><td>${esc(String(b.voter ?? b.project))}</td>` +
            `<td>${badge(String(b.choice))}</td><td>${(b.conflicts_disclosed as string[]).length} disclosed</td></tr>`;
        }).join("\n")
      : "";
    let decision = "<p><em>No decision record exists — the clock binds the founder or it binds nobody.</em></p>";
    if (decided) {
      const d = JSON.parse(readFileSync(join(propDir, id, "decision.json"), "utf8"));
      decision = `<p>Outcome: ${badge(String(d.governance_outcome))} (${esc(String(d.outcome))}) · process validity: <strong>${esc(String(d.process_validity?.determination))}</strong></p>
<blockquote><p>${esc(String(d.process_validity?.grounds))}</p></blockquote>`;
    }
    out.push({
      path: `proposals/${id}.html`, title: id,
      body: `${md}
<h2>Phase history</h2><table><tr><th>phase</th><th>date</th></tr>${history}</table>
<h2>Objections</h2>${objections}
<h2>Ballots</h2>${ballots ? `<table><tr><th>ballot</th><th>voter / project</th><th>choice</th><th>conflicts</th></tr>${ballots}</table>` : "<p class='muted'>none cast</p>"}
<h2>Decision</h2>${decision}`,
    });
  }
  out.unshift({
    path: "proposals/index.html", title: "Proposals",
    body: `<h1>Proposals</h1>
<p>Every change to the shared system is a public proposal on a consequence-scaled clock (GOVERNANCE §3). A ballot result is not automatically a valid decision — every decision record carries a separate process-validity determination.</p>
<table><tr><th>id</th><th>title</th><th>class</th><th>phase</th><th>decision</th></tr>
${items.join("\n")}</table>`,
  });
  return out;
}
