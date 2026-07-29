// Shared layout + badge helpers for the OTCS static site. Deterministic output.
export const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// depth = how many directories below dist/ the page lives (for relative links).
export function layout(title: string, body: string, depth = 0): string {
  const p = "../".repeat(depth);
  const nav = [
    ["index.html", "Home"], ["how-it-works.html", "How it works"], ["projects/index.html", "Projects"], ["matrix.html", "Capability matrix"],
    ["graph.html", "Graph"], ["interfaces/index.html", "Interfaces"], ["proposals/index.html", "Proposals"],
    ["governance/index.html", "Governance"], ["views/index.html", "Views"], ["about.html", "About"],
  ].map(([href, label]) => `<a href="${p}${href}">${label}</a>`).join(" · ");
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} — OTCS</title>
<link rel="stylesheet" href="${p}style.css">
</head>
<body>
<header><strong>Open Trust Commons</strong> <span class="muted">· OTCS</span><nav>${nav}</nav></header>
<main>
${body}
</main>
<footer>Open Trust Commons — OTCS v0.1 · Kinetic Trust Protocol © Chris Perkins (nmcitra) · Apache-2.0 / CC BY 4.0 · This registry does not grade its own homework: <a href="${p}about.html">conflicts &amp; self-score</a></footer>
</body>
</html>`;
}

const BADGE_CLASS: Record<string, string> = {
  SELF_ASSERTED: "b-grey", DOCUMENTED: "b-grey", REPRODUCIBLE: "b-blue",
  INDEPENDENTLY_TESTED: "b-green", FIELD_OBSERVED: "b-green",
  DISPUTED: "b-amber", RETRACTED: "b-red",
  registered: "b-green", observed: "b-amber", example: "b-watermark",
  CLAIMS_TO_IMPLEMENT: "b-grey", MANIFEST_VALIDATED: "b-blue",
  REFERENCE_IMPLEMENTATION: "b-green", CONFORMANCE_TESTED: "b-green",
};
export const badge = (label: string): string =>
  `<span class="badge ${BADGE_CLASS[label] ?? "b-grey"}">${esc(label)}</span>`;

// Maturity is ALWAYS a profile — rendering a single collapsed number is prohibited (NON-GOALS #2).
export const maturityProfile = (e: { specification?: number; implementation?: number; independent_validation?: number }): string =>
  `<table class="profile"><tr><th>specification</th><th>implementation</th><th>independent validation</th></tr>` +
  `<tr><td>M${e.specification ?? 0}</td><td>M${e.implementation ?? 0}</td><td>M${e.independent_validation ?? 0}</td></tr></table>`;

export const stampBox = (s: { algorithm_version: string; generated_at: string; inputs: { file: string }[] }): string =>
  `<p class="stamp">Computed interpretation, not fact — algorithm <code>${esc(s.algorithm_version)}</code> · generated ${esc(s.generated_at)} · ${s.inputs.length} input records (hashes in the JSON artifact)</p>`;
