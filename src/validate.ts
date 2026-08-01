// OTCS validator — schemas, fixtures, registry records, and semantic rules.
// Usage: npm run validate   (exit 1 on any unexpected result)
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { parse } from "yaml";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ajv = new Ajv2020({ allErrors: true, strict: true, strictRequired: false, allowUnionTypes: true });
addFormats(ajv);

type Doc = Record<string, unknown>;
const load = (p: string): Doc => parse(readFileSync(p, "utf8")) as Doc;

// ---- semantic rules (coordinate-system.md §3) ------------------------------
type Finding = { level: "error" | "warning"; msg: string };
const semantic: Record<string, (d: Doc) => Finding[]> = {
  claim: (d) => {
    const out: Finding[] = [];
    const m = d.maturity as number;
    const st = d.evidence_state as string;
    if (m >= 4 && !["INDEPENDENTLY_TESTED", "FIELD_OBSERVED"].includes(st))
      out.push({ level: "error", msg: `maturity ${m} requires INDEPENDENTLY_TESTED or FIELD_OBSERVED (got ${st})` });
    return out;
  },
  "project-manifest": (d) => {
    const out: Finding[] = [];
    const coords = d.coordinates as Doc | undefined;
    const decl = d.declaration as Doc | undefined;
    const fns = (coords?.functions ?? {}) as Record<string, number>;
    if ((fns.enforce ?? 0) > 0 && !(decl?.enforcement_points as unknown[] | undefined)?.length)
      out.push({ level: "warning", msg: "functions.enforce > 0 without declaration.enforcement_points" });
    const env = (coords?.environment ?? []) as string[];
    const time = (coords?.time ?? []) as string[];
    if ((env.includes("cumulative_trajectory") || time.includes("across_trajectory")) &&
        !/trajector/i.test(String(decl?.problem ?? "") + String(decl?.threat_or_failure_model ?? "")))
      out.push({ level: "warning", msg: "trajectory coordinates claimed but no trajectory mechanism described in declaration" });
    return out;
  },
};

// ---- collect schemas -------------------------------------------------------
const schemaFiles: string[] = [];
for (const dir of ["schemas", "schemas/wire"]) {
  for (const f of readdirSync(join(ROOT, dir))) {
    if (f.endsWith(".schema.json")) schemaFiles.push(join(ROOT, dir, f));
  }
}
const validators = new Map<string, ReturnType<typeof ajv.compile>>();
for (const file of schemaFiles) {
  const schema = JSON.parse(readFileSync(file, "utf8"));
  validators.set(basename(file).replace(".schema.json", ""), ajv.compile(schema));
}

// ---- run fixtures ----------------------------------------------------------
let pass = 0, fail = 0;
const problems: string[] = [];
const check = (name: string, doc: Doc, expectValid: boolean, label: string) => {
  const v = validators.get(name);
  if (!v) { problems.push(`${label}: no schema named ${name}`); fail++; return; }
  const schemaOk = v(doc) as boolean;
  const findings = (semantic[name]?.(doc) ?? []);
  const semanticOk = !findings.some((f) => f.level === "error");
  const ok = schemaOk && semanticOk;
  for (const f of findings.filter((f) => f.level === "warning" && expectValid))
    console.log(`  ⚠ ${label}: ${f.msg}`);
  if (ok === expectValid) { pass++; return; }
  fail++;
  const why = !schemaOk ? ajv.errorsText(v.errors, { separator: "; " })
    : findings.filter((f) => f.level === "error").map((f) => f.msg).join("; ") || "unexpectedly valid";
  problems.push(`${label}: expected ${expectValid ? "VALID" : "INVALID"} — ${why}`);
};

const exDir = join(ROOT, "schemas/examples");
for (const name of readdirSync(exDir)) {
  const dir = join(exDir, name);
  if (!statSync(dir).isDirectory()) continue;
  for (const f of readdirSync(dir).sort()) {
    const doc = load(join(dir, f));
    check(name, doc, f.startsWith("valid"), `examples/${name}/${f}`);
  }
}

// ---- validate real records where present ----------------------------------
const recordCounts: Record<string, number> = { registered: 0, observed: 0, example: 0 };
const registryIds: string[] = [];
const regDir = join(ROOT, "registry/projects");
if (existsSync(regDir)) {
  for (const id of readdirSync(regDir)) {
    const base = join(regDir, id);
    if (!statSync(base).isDirectory()) continue;
    const manifest = join(base, "otcs.yaml");
    if (existsSync(manifest)) {
      const doc = load(manifest);
      check("project-manifest", doc, true, `registry/${id}/otcs.yaml`);
      const proj = doc.project as Doc | undefined;
      const state = String(proj?.record_state ?? "?");
      if (state in recordCounts) recordCounts[state]++;
      if (proj?.id && proj.id !== id)
        { fail++; problems.push(`registry/${id}: directory name != project.id (${proj.id})`); }
      registryIds.push(id);
    }
    for (const [file, schema] of [["relationships.yaml", "relationship"], ["claims.yaml", "claim"]] as const) {
      const p = join(base, file);
      if (!existsSync(p)) continue;
      const items = parse(readFileSync(p, "utf8")) as Doc[];
      items.forEach((item, i) => check(schema, item, true, `registry/${id}/${file}[${i}]`));
    }
  }
}
// relationship endpoints must reference known registry ids (dangling-edge check)
for (const id of registryIds) {
  const p = join(regDir, id, "relationships.yaml");
  if (!existsSync(p)) continue;
  (parse(readFileSync(p, "utf8")) as Doc[]).forEach((edge, i) => {
    for (const end of ["source_project", "target_project"] as const) {
      const ref = String(edge[end] ?? "");
      if (ref && !registryIds.includes(ref))
        { fail++; problems.push(`registry/${id}/relationships.yaml[${i}]: ${end} "${ref}" is not a registered record`); }
    }
  });
}
const propDir = join(ROOT, "proposals");
if (existsSync(propDir)) {
  for (const id of readdirSync(propDir)) {
    const p = join(propDir, id, "proposal.yaml");
    if (existsSync(p)) check("proposal", load(p), true, `proposals/${id}/proposal.yaml`);
    for (const [sub, schema] of [["ballots", "ballot"], ["receipts", "trajectory-receipt"]] as const) {
      const dir = join(propDir, id, sub);
      if (!existsSync(dir)) continue;
      for (const f of readdirSync(dir)) {
        if (f.endsWith(".yaml")) check(schema, load(join(dir, f)), true, `proposals/${id}/${sub}/${f}`);
      }
    }
  }
}
// Domain profiles. The crosswalk is the evidence behind a profile's findings;
// unvalidated, a profile is prose claiming to be a test.
const profDir = join(ROOT, "profiles");
if (existsSync(profDir)) {
  for (const id of readdirSync(profDir)) {
    const p = join(profDir, id, "crosswalk.yaml");
    if (!existsSync(p)) continue;
    check("domain-profile", load(p), true, `profiles/${id}/crosswalk.yaml`);
  }
}

// Release decision records. RELEASE-GOVERNANCE.md §6 says a release whose
// decision cannot be reconstructed from its record did not follow the process —
// so the record is checked like everything else rather than trusted as prose.
const relDir = join(ROOT, "docs", "releases");
if (existsSync(relDir)) {
  for (const f of readdirSync(relDir).filter((f) => f.endsWith("-decision.json"))) {
    check("release-decision", JSON.parse(readFileSync(join(relDir, f), "utf8")) as Doc, true, `docs/releases/${f}`);
  }
}

// Analysis records. ANALYSIS-MODEL.md says nothing is accepted because it was
// generated; it is accepted through the same validated, versioned path as
// everything else in the registry — including analysis of the founder's own
// projects, which gets no exemption from this check.
function walkAnalysis(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walkAnalysis(p));
    else if (name.endsWith(".json")) out.push(p);
  }
  return out;
}
for (const dir of ["projects", "pairs"]) for (const f of walkAnalysis(join(ROOT, "analysis", dir))) {
  check("analysis", JSON.parse(readFileSync(f, "utf8")), true, `analysis/${dir}/.../${f.split("/").pop()}`);
}

const ledgerFile = join(ROOT, "governance-log", "events.jsonl");
if (existsSync(ledgerFile)) {
  readFileSync(ledgerFile, "utf8").trim().split("\n").filter(Boolean).forEach((line, i) =>
    check("governance-event", JSON.parse(line) as Doc, true, `governance-log/events.jsonl[${i}]`));
}

// ---- report ----------------------------------------------------------------
console.log(`\nvalidate: ${pass} passed, ${fail} failed (${validators.size} schemas)`);
if (registryIds.length)
  console.log(`registry: ${recordCounts.registered} registered · ${recordCounts.observed} observed · ${recordCounts.example} example (excluded from real counts)`);
for (const p of problems) console.error(`  ✗ ${p}`);
process.exit(fail === 0 ? 0 : 1);
