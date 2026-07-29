// Coherence check — does the corpus still agree with itself, and with the code?
//
// `npm run validate` proves each record matches its schema. Nothing proved that
// the documents agree with each other, and every failure class below is one
// that actually shipped in this repository before this file existed:
//
//   LINKS      a link added at the repository root that 404s once the docs are
//              slugged into docs/generated, or rendered by the static site
//   SECTIONS   a §N reference pointing at a section that does not exist — or
//              worse, at a real section that says something else. GOVERNANCE §87
//              was a line number. COMMUNICATIONS §F was a plane letter.
//   VOCABULARY a document naming an identifier the schema does not have, or the
//              schema carrying a value no document explains
//   COUNTS     "twenty things", "the seven coordinates" — prose that was true
//              when written and silently became false
//
// Exit non-zero on any finding, so it can gate a commit.
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p: string) => readFileSync(join(ROOT, p), "utf8");

type Finding = { kind: string; where: string; what: string };
const findings: Finding[] = [];
const flag = (kind: string, where: string, what: string) => findings.push({ kind, where, what });

const rootDocs = readdirSync(ROOT).filter((f) => f.endsWith(".md"));
const slug = (f: string) => f.replace(/\.md$/, "").toLowerCase().replace(/_/g, "-") + ".md";

/** Section headings a document actually has: "## 4b. Title" -> 4b */
function sectionsOf(doc: string): Map<string, string> {
  const out = new Map<string, string>();
  if (!existsSync(join(ROOT, doc))) return out;
  for (const m of read(doc).matchAll(/^#{2,3}\s*(\d+[a-z]?)\.\s+(.+)$/gm)) out.set(m[1], m[2].trim());
  return out;
}

/* ── 1. links resolve at the repository root ────────────────────────────── */
for (const doc of rootDocs) {
  for (const m of read(doc).matchAll(/\]\(([A-Za-z0-9._/-]+\.md)(#[^)]*)?\)/g)) {
    if (!existsSync(join(ROOT, m[1]))) flag("LINK", doc, `${m[1]} does not exist`);
  }
}

/* ── 2. and still resolve after slugging into docs/generated ────────────── */
const gen = join(ROOT, "docs", "generated");
if (existsSync(gen)) {
  for (const f of readdirSync(gen).filter((f) => f.endsWith(".md"))) {
    for (const m of readFileSync(join(gen, f), "utf8").matchAll(/\]\(([A-Za-z0-9._-]+\.md)(#[^)]*)?\)/g)) {
      if (!existsSync(join(gen, m[1]))) flag("LINK", `docs/generated/${f}`, `${m[1]} missing after slugging`);
    }
  }
}

/* ── 3. every §N reference points at a section that exists ──────────────── */
for (const doc of rootDocs) {
  // [A-Z0-9]+ not [0-9]+: a §F citation must be caught, not skipped. Sections
  // here are numbered; a letter is someone citing a plane label or an appendix
  // marker as though it were a section, which resolves to nothing.
  for (const m of read(doc).matchAll(/\[?([A-Z][A-Z0-9_-]+\.md)\]?(?:\([^)]*\))?\s*§\s*([0-9A-Za-z]+)/g)) {
    const [, target, sec] = m;
    if (!rootDocs.includes(target)) continue;
    const secs = sectionsOf(target);
    if (secs.size === 0) continue; // target has no numbered sections at all
    if (!secs.has(sec)) flag("SECTION", doc, `${target} §${sec} does not exist`);
  }
}

/* ── 4. documents and schemas name the same identifiers ─────────────────── */
const enumAt = (file: string, path: string[]): string[] => {
  let n: any = JSON.parse(read(file));
  for (const k of path) n = n?.properties?.[k] ?? n?.[k];
  return n?.enum ?? n?.items?.enum ?? [];
};

const VOCAB: { label: string; values: string[]; doc: string }[] = [
  {
    label: "evidence states",
    values: enumAt("schemas/claim.schema.json", ["evidence_state"]),
    doc: "EVIDENCE-MODEL.md",
  },
  {
    label: "relationship statuses",
    values: enumAt("schemas/relationship.schema.json", ["status"]),
    doc: "EVIDENCE-MODEL.md",
  },
  {
    label: "relationship types",
    values: enumAt("schemas/relationship.schema.json", ["relationship_type"]),
    doc: "EVIDENCE-MODEL.md",
  },
  {
    label: "participation modes",
    values: enumAt("schemas/project-manifest.schema.json", ["record", "participation_mode"]),
    doc: "PARTICIPATION.md",
  },
  {
    label: "owner verification methods",
    values: enumAt("schemas/project-manifest.schema.json", ["ownership", "verification", "status"]),
    doc: "REGISTRY-POLICY.md",
  },
];
for (const { label, values, doc } of VOCAB) {
  if (!values.length || !existsSync(join(ROOT, doc))) continue;
  const text = read(doc);
  const missing = values.filter((v) => !text.includes(v));
  if (missing.length) flag("VOCAB", doc, `${label}: schema has ${missing.join(", ")}, document does not mention`);
}

/* ── 4b. no document quotes a coordinate value the schema has retired ────── */
{
  const coords = JSON.parse(read("schemas/project-manifest.schema.json"))
    .properties.coordinates.properties as Record<string, any>;
  const live = new Set<string>();
  for (const v of Object.values(coords)) {
    for (const x of v?.items?.enum ?? []) live.add(x);
    for (const x of Object.keys(v?.properties ?? {})) live.add(x);
    for (const x of v?.propertyNames?.enum ?? []) live.add(x);
  }
  // Values renamed away by the collision fix. A document still using one is
  // describing a vocabulary that no longer exists — CALIBRATION.md carried
  // `commit` as a Time value after Time's value became `commit_point`.
  const RETIRED: [string, string, string][] = [
    ["commit", "commit_point", "Time"],
    ["repair", "repair_window", "Time"],
  ];
  for (const doc of rootDocs) {
    for (const m of read(doc).matchAll(/\*\*Time\*\*[^\n|]*\|([^\n|]*)\|/g)) {
      const cell = m[1];
      for (const [old, now] of RETIRED) {
        if (!live.has(now)) continue;
        if (new RegExp("`" + old + "`").test(cell))
          flag("VOCAB", doc, `Time row uses retired value \`${old}\` — now \`${now}\``);
      }
    }
  }
}

/* ── 4c. no shipping document cites an incubation tag ───────────────────── */
{
  // The public arc is 0.1 -> 0.9 -> 1.0 and v0.1.0 is the first public
  // release. Every v0.0.x tag exists only in the private staging repo, so a
  // shipping document citing one sends a reader looking for a release that
  // was never published. CHANGELOG.md is exempt below its incubation banner,
  // because recording those tags is the whole job of that section.
  const BANNER = "# Incubation — internal tags, never published";
  for (const doc of rootDocs) {
    let text = read(doc);
    if (doc === "CHANGELOG.md") {
      const cut = text.indexOf(BANNER);
      if (cut === -1) {
        flag("VERSION", doc, `incubation banner missing — cannot tell which tags are exempt`);
        continue;
      }
      text = text.slice(0, cut);
    }
    for (const m of text.matchAll(/v?0\.0\.\d+/g))
      flag("VERSION", doc, `cites incubation tag ${m[0]} — nothing below v0.1.0 was published`);
  }
}

/* ── 4d. no shipping document links a file that is not in the repository ── */
{
  // The LINK check above resolves against the working tree, which includes
  // files git does not track. Those exist here and nowhere else, so a link to
  // one passes locally and 404s the moment the repository is cloned or the
  // site deploys.
  //
  // Deriving this from `git ls-files` rather than a hand-kept exclusion list
  // is deliberate. A list of withheld paths is itself a disclosure — it tells
  // a reader something was held back and invites the question. The repository
  // should hold that line by construction, not by announcing it.
  let tracked: Set<string>;
  try {
    tracked = new Set(
      execFileSync("git", ["ls-files"], { cwd: ROOT, encoding: "utf8" }).split("\n").filter(Boolean),
    );
  } catch {
    tracked = new Set(); // not a git checkout — nothing to assert
  }
  if (tracked.size) {
    for (const doc of rootDocs) {
      if (!tracked.has(doc)) continue; // an untracked doc ships nowhere
      for (const m of read(doc).matchAll(/\]\(([A-Za-z0-9._/-]+\.md)(#[^)]*)?\)/g))
        if (!tracked.has(m[1]))
          flag("UNTRACKED", doc, `links ${m[1]}, which git does not track — it will 404 once cloned`);
    }
  }
}

/* ── 5. counted claims still match what is being counted ────────────────── */
const WORDS: Record<string, number> = {
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8,
  nine: 9, ten: 10, eleven: 11, twelve: 12, fourteen: 14, twenty: 20,
};
const COUNTS: { where: string; phrase: RegExp; actual: () => number; of: string }[] = [
  {
    where: "NON-GOALS.md",
    phrase: /\b(twenty)\b[^.]{0,40}(refus|things|will not)/i,
    actual: () => (read("NON-GOALS.md").match(/^\*\*\d+\.\s/gm) ?? []).length,
    of: "numbered refusals",
  },
  {
    where: "README.md",
    phrase: /\b(twenty)\b[^.]{0,30}will not become/i,
    actual: () => (read("NON-GOALS.md").match(/^\*\*\d+\.\s/gm) ?? []).length,
    of: "refusals in NON-GOALS.md",
  },
];

// Digit-form inventory counts in ROADMAP's 0.1 table. These went stale the
// moment a schema was added, and nothing caught it — the WORDS table above
// only handles spelled-out numbers.
const DIGIT_COUNTS: { where: string; phrase: RegExp; actual: () => number; of: string }[] = [
  {
    where: "ROADMAP.md",
    phrase: /(\d+) files under `schemas\/`/,
    actual: () => readdirSync(join(ROOT, "schemas")).filter((f) => f.endsWith(".schema.json")).length,
    of: "schemas at the top level",
  },
  {
    where: "ROADMAP.md",
    phrase: /(\d+) under `schemas\/wire\/`/,
    actual: () => readdirSync(join(ROOT, "schemas", "wire")).filter((f) => f.endsWith(".schema.json")).length,
    of: "wire schemas",
  },
  {
    where: "ROADMAP.md",
    phrase: /(\d+) files under `interfaces\/`/,
    actual: () => readdirSync(join(ROOT, "interfaces")).filter((f) => f.endsWith(".md")).length,
    of: "interface documents",
  },
];
for (const c of COUNTS) {
  if (!existsSync(join(ROOT, c.where))) continue;
  const m = read(c.where).match(c.phrase);
  if (!m) continue;
  const claimed = WORDS[m[1].toLowerCase()];
  const real = c.actual();
  if (claimed !== real) flag("COUNT", c.where, `claims ${m[1]} ${c.of}, actual ${real}`);
}
for (const c of DIGIT_COUNTS) {
  if (!existsSync(join(ROOT, c.where))) continue;
  const m = read(c.where).match(c.phrase);
  if (!m) { flag("COUNT", c.where, `expected an inventory count for ${c.of}, found none`); continue; }
  const real = c.actual();
  if (Number(m[1]) !== real) flag("COUNT", c.where, `claims ${m[1]} ${c.of}, actual ${real}`);
}

/* ── 6. is every document reachable from somewhere? ─────────────────────── */
const linkedTo = new Set<string>();
for (const doc of rootDocs)
  for (const m of read(doc).matchAll(/\]\(([A-Za-z0-9._-]+\.md)\)/g)) linkedTo.add(m[1]);
const orphans = rootDocs.filter(
  (d) => !linkedTo.has(d) && !["README.md", "CHANGELOG.md", "PROGRESS.md"].includes(d),
);

/* ── report ─────────────────────────────────────────────────────────────── */
const byKind = (k: string) => findings.filter((f) => f.kind === k);
for (const kind of ["LINK", "SECTION", "VOCAB", "VERSION", "UNTRACKED", "COUNT"]) {
  const hits = byKind(kind);
  console.log(`${kind.padEnd(8)} ${hits.length === 0 ? "ok" : `${hits.length} finding(s)`}`);
  for (const h of hits) console.log(`         ${h.where}: ${h.what}`);
}
console.log(
  `ORPHAN   ${orphans.length} document(s) linked from nowhere` +
    (orphans.length ? `\n         ${orphans.join(", ")}` : ""),
);

const total = findings.length;
console.log(`\ncoherence: ${total === 0 ? "clean" : `${total} finding(s)`} · ${orphans.length} orphan(s) (advisory)`);
if (total > 0) process.exit(1);
