// Overlap O(i,j) and complementarity Γ(i,j) — computed interpretations.
// Γ = D × I × L × Q: functional difference-without-contradiction × interface/edge
// compatibility × license compatibility × evidence quality. High word-overlap
// alone must NOT produce high Γ (two same-shaped frameworks score low).
import type { Doc } from "./registry-load.js";

export const WEIGHTS = { actor: 1, authority: 1, verbs: 1, environment: 2, functions: 2, time: 1 };
export const ALGORITHM_VERSION = "complementarity-0.2.0-categorical";

// v0.0.6 DEFERRAL: numerical Γ/O are NOT published. A number like "84% complementary"
// reads as an objective evaluation while resting on incomplete self-description,
// subjective weights, unstable semantics, and unknown legal compatibility. Categorical
// bands only until the coordinate model is stable and sensitivity analysis exists.
export function band(g: {gamma:number; D:number; I:number; Q:number}, overlap: number): string[] {
  const out: string[] = [];
  if (overlap >= 0.55) out.push("HIGH_FUNCTIONAL_OVERLAP");
  if (g.D >= 0.5) out.push("DIFFERENT_CONTROL_FUNCTIONS");
  if (g.D >= 0.4 && g.I >= 1) out.push("POSSIBLE_COMPLEMENT");
  if (g.I >= 1) out.push("INTERFACE_RELATIONSHIP_DECLARED");
  if (g.Q <= 0.2) out.push("NO_IMPLEMENTATION_EVIDENCE");
  out.push("LEGAL_COMPATIBILITY_UNKNOWN");
  return out;
}
const OPEN_LICENSES = new Set(["Apache-2.0", "MIT", "CC BY 4.0", "BSD-3-Clause"]);

const jaccard = (a: string[] = [], b: string[] = []): number => {
  const A = new Set(a), B = new Set(b);
  if (A.size === 0 && B.size === 0) return 1;
  const inter = [...A].filter((x) => B.has(x)).length;
  return inter / (A.size + B.size - inter);
};

const cosine = (a: Record<string, number> = {}, b: Record<string, number> = {}): number => {
  const keys = [...new Set([...Object.keys(a), ...Object.keys(b)])];
  if (keys.length === 0) return 1;
  let dot = 0, na = 0, nb = 0;
  for (const k of keys) { const x = a[k] ?? 0, y = b[k] ?? 0; dot += x * y; na += x * x; nb += y * y; }
  return na === 0 || nb === 0 ? 0 : dot / (Math.sqrt(na) * Math.sqrt(nb));
};

export function overlap(a: Doc, b: Doc): number {
  const ca = a.coordinates ?? {}, cb = b.coordinates ?? {};
  const parts: [number, number][] = [
    [cosine(ca.actor, cb.actor), WEIGHTS.actor],
    [jaccard(ca.authority, cb.authority), WEIGHTS.authority],
    [jaccard(ca.verbs, cb.verbs), WEIGHTS.verbs],
    [jaccard(ca.environment, cb.environment), WEIGHTS.environment],
    [cosine(ca.functions, cb.functions), WEIGHTS.functions],
    [jaccard(ca.time, cb.time), WEIGHTS.time],
  ];
  const wsum = parts.reduce((s, [, w]) => s + w, 0);
  return parts.reduce((s, [v, w]) => s + v * w, 0) / wsum;
}

export function gamma(a: Doc, b: Doc, edges: Doc[]): { gamma: number; D: number; I: number; L: number; Q: number } {
  // D — functional difference without contradiction: distinct functions complement.
  const D = 1 - cosine(a.coordinates?.functions, b.coordinates?.functions);
  // I — interface compatibility: provides↔consumes match or a declared edge.
  const pa = a.interfaces?.provides ?? [], caM = a.interfaces?.consumes ?? [];
  const pb = b.interfaces?.provides ?? [], cbM = b.interfaces?.consumes ?? [];
  const ifaceMatch = pa.some((x: string) => cbM.includes(x)) || pb.some((x: string) => caM.includes(x));
  const ids = [a.project.id, b.project.id];
  const edgeMatch = edges.some((e) => ids.includes(e.source_project) && ids.includes(e.target_project));
  const I = ifaceMatch || edgeMatch ? 1 : 0.25;
  // L — license compatibility: both known-open = 1; any unknown = 0.5.
  const L = OPEN_LICENSES.has(a.project.license) && OPEN_LICENSES.has(b.project.license) ? 1 : 0.5;
  // Q — evidence quality: mean declared maturity, normalized.
  const q = (m: Doc) => ((m.evidence?.specification ?? 0) + (m.evidence?.implementation ?? 0) + (m.evidence?.independent_validation ?? 0)) / 15;
  const Q = (q(a) + q(b)) / 2;
  return { gamma: D * I * L * Q, D, I, L, Q };
}

export function pairs(projects: Doc[], edges: Doc[]) {
  const out = [];
  for (let i = 0; i < projects.length; i++) {
    for (let j = i + 1; j < projects.length; j++) {
      const a = projects[i], b = projects[j];
      const g = gamma(a, b, edges);
      const o = overlap(a, b);
      out.push({
        pair: [a.project.id, b.project.id],
        record_states: [a.project.record_state, b.project.record_state],
        bands: band(g, o),
        // numerics retained for internal sensitivity work; NOT rendered, NOT authoritative
        _experimental: { overlap: Number(o.toFixed(4)),
          ...Object.fromEntries(Object.entries(g).map(([k, v]) => [k, Number((v as number).toFixed(4))])) },
      });
    }
  }
  return out.sort((x, y) => (y._experimental.gamma - x._experimental.gamma) || String(x.pair).localeCompare(String(y.pair)));
}
