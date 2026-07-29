// Shared registry loader — declared records only; computed/ is written elsewhere.
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

export type Doc = Record<string, any>;
export type Registry = {
  projects: Doc[];                       // sorted by id
  edges: Doc[];                          // sorted by (source,target,type)
  inputs: { file: string; sha256: string }[];
};

export function loadRegistry(): Registry {
  const regDir = join(ROOT, "registry/projects");
  const projects: Doc[] = [];
  const edges: Doc[] = [];
  const inputs: { file: string; sha256: string }[] = [];
  const record = (rel: string, raw: string) =>
    inputs.push({ file: rel, sha256: createHash("sha256").update(raw).digest("hex") });

  for (const id of readdirSync(regDir).sort()) {
    const base = join(regDir, id);
    if (!statSync(base).isDirectory()) continue;
    const mPath = join(base, "otcs.yaml");
    if (existsSync(mPath)) {
      const raw = readFileSync(mPath, "utf8");
      record(`registry/projects/${id}/otcs.yaml`, raw);
      projects.push(parse(raw) as Doc);
    }
    const rPath = join(base, "relationships.yaml");
    if (existsSync(rPath)) {
      const raw = readFileSync(rPath, "utf8");
      record(`registry/projects/${id}/relationships.yaml`, raw);
      edges.push(...(parse(raw) as Doc[]));
    }
  }
  projects.sort((a, b) => String(a.project.id).localeCompare(String(b.project.id)));
  edges.sort((a, b) =>
    `${a.source_project}|${a.target_project}|${a.relationship_type}`.localeCompare(
      `${b.source_project}|${b.target_project}|${b.relationship_type}`));
  return { projects, edges, inputs };
}

export const stamp = (algorithm_version: string, weights: Doc, inputs: Registry["inputs"]) => ({
  algorithm_version,
  weights,
  inputs,
  generated_at: process.env.OTCS_BUILD_TIME ?? new Date().toISOString(),
  note: "Computed interpretation, not an authoritative project attribute (EVIDENCE-MODEL.md §6).",
});
