# OTCS-0007 — What "uses the data to make a decision" means: three lines, counted apart

*Class: `constitutional` · Clock: 45–90 days · Earliest decision: 2026-09-17*

## Provenance

PREMORTEM.md §2 fails this project if there is *"no evidence that anyone uses the data to make a decision"*, evaluated 2027-07-29. The phrase is defined nowhere — it appears once in canonical text, restated in FAQ.md §27.

This proposal defines it now, while the outcome is unknown. Amending a test in advance is legitimate; reinterpreting it in July 2027 is not, and the date is the entire defence. The grounds were prepared, the decisions made, and the draft adversarially pressure-tested on the public record in issue #6.

## The defect being repaired

Four problems, all created by the missing definition:

1. **The narrowing trap.** §2 names *"the coordinate vocabulary as a published instrument, with no registry at all"* as the response to **failure** — and the vocabulary is the instrument the project has chosen. A definition counting vocabulary use as "using the data" makes the prescribed failure response satisfy the survival test: "we narrowed" and "we survived" become the same observable, and the founder writes the label.
2. **The silent coupling.** A definition requiring registry entries makes criterion 3 downstream of criterion 1 — no external registrations means no external entries means no entry-dependent decisions. One failure delivers two of four, an automatic narrow: the 2-of-4 threshold silently becomes 1-of-1.
3. **The named-party problem.** The corpus records at least four external parties who engaged the material; most are unnamed by their own choice. A named-party requirement retroactively discards most of the evidence that already exists.
4. **The circularity.** Every external decision on record is a decision *about participating in OTCS*. Whether a decision about joining can evidence usefulness for anything but itself was unresolved.

## What this proposal adds

### 1. Three separately-reported lines

Criterion 3 is evaluated against three lines, counted and reported apart. EVIDENCE-MODEL.md §4b already makes this move for a different pair — *"never use one to grade the other"* — and the vocabulary coordinate and the registry record are the same kind of pair.

| Line | Definition | Force |
|---|---|---|
| **Entry use** | A party makes a decision that turns on the content of a registry entry of an **externally self-registered project** — an entry the founder neither authored nor maintains — such that the decision would differ had the entry read differently | **Can defeat criterion 3** |
| **Vocabulary use** | A party outside the project publishes an artifact of their own — a spec, a README, a boundary statement, a versioned entry — in which OTCS coordinates or the evidence model bound what their project is or is not | **Never defeats criterion 3.** Grades which failure story is true (§3 below) |
| **Instrument decisions** | A party decides whether or how to participate in OTCS itself — withheld, conditioned, declined, joined | **Recorded, zero force.** A candidate evaluating the terms of entry is using the rules, not the data; if refusal counted as success, no outcome could fail |

Entry use excludes the founder's own records deliberately: reading `ktp`'s entry is reading the founder, and the founder can author entries designed to be depended on. The exclusion also makes the coupling in §4 literal rather than assumed.

None of these lines is ever collapsed into a score or a rank (NON-GOALS.md §2, §5). They are counts of qualifying instances, reported side by side.

### 2. Qualifying evidence — imported from issue #14's resolution

The **substance must be public; the identity need not be.**

An instance qualifies on any line only if it is:

- the party's own published artifact, on their own infrastructure, dated, naming OTCS; **or**
- the party's own words on a dated public record — a handle is fine, a name is not required.

Entry-use instances additionally require **the party's dated statement published before the decision's outcome was known, or a diff in their artifact traceable to the entry** — "would have differed" is otherwise unfalsifiable.

An instance never qualifies if it is:

- the founder's paraphrase or summary of private correspondence, however substantive;
- from a party contacted about evidence, unless the contact-log entry (below) predates the party's artifact;
- from a party disqualified under EVIDENCE-MODEL.md §3 independence — applied **pairwise**: the parties counted toward the two-party bar must be independent of the project *and of each other*, or RFC 6410's number imports without the property that made it worth importing. Stated plainly, because the discipline of this document is stating costs: a party with an advisory or collaborative relationship to this project fails §3 for these purposes, and that includes the parties closest to the project today.

**The founder is never the source and never the judge.** The founder may point at evidence; a complete contact log — every party contacted about evidence of use, dates and outcomes, identity redacted — is committed to the public record, and each entry must predate any artifact it could have produced, so selection is auditable. The instances themselves live in a public, challengeable file; the counts are computed from it and published, on the same pull-model pattern as the participation recompute (issue #14 §3), so the criterion can be found **met** — a finding of no qualifying evidence — without the founder's cooperation. Qualification rulings on contested instances belong to the evaluator; who that is remains issue #7's subject and is not decided here.

**Stated cost, so it is not discovered later:** the external accounts that exist today do not qualify as they stand. They live in this project's decision records as the founder's account of unnamed parties, and remain there as history — but every evidence line starts at zero, including the zero-force one. An account would have to be published by the party themselves — under a handle if they prefer — to appear on any line.

### 3. The pre-registered outcome matrix

The threshold is imported, not invented: **two qualifying instances from two parties independent of the project and of each other** (RFC 6410 §2.2's number — *"at least two independent interoperating implementations"*). A bar already written down cannot be quietly lowered later for a particular person.

| Observable on 2027-07-29 | Criterion 3 | Pre-registered reading |
|---|---|---|
| Entry use: ≥ 2 instances from ≥ 2 independent parties | **Defeated** | The registry's data is being used to decide things |
| Entry use below bar · vocabulary use at the same bar | **Met** | **"Instrument works, registry unused"** — feeds §2's unchanged 2-of-4 / 3-of-4 arithmetic; *if* that arithmetic lands on narrow, the vocabulary evidence selects **which** narrow: the coordinate vocabulary as the published instrument, per §2's own prescription |
| Entry use below bar · vocabulary use below bar | **Met** | Plain failure of the criterion — feeds the same unchanged arithmetic, with nothing selecting the narrow's shape |

The matrix never overrides the arithmetic: three criteria met is a stop whatever the vocabulary line shows. What it fixes today is the *label* — vocabulary use has no pass-force by construction, so a narrowing can never again be reported as a survival.

Instrument decisions are reported alongside whatever row obtains, and change nothing in it.

**The coupling, made explicit instead of silent:** this definition does not free criterion 3 from criterion 1 — it makes the dependency literal. With no external registrations there are no externally self-registered entries, entry use is impossible, and criterion 3 is met alongside criterion 1: two of four, an automatic narrow. What the matrix changes is that this arrives *visibly and pre-labelled*, not as a reinterpretation. Whether the criteria's structure or clock should change in light of the coupling is issue #16's question, deliberately left to it.

## What this proposal does not do

- **Choose the evaluator.** Issue #7. This proposal only requires that the counts be computable from a public instances file and that a finding of *no qualifying evidence* — the criterion met — needs nobody's permission.
- **Recalibrate the clock or the 2-of-4 structure.** Issue #16, which this definition unblocks and sharpens.
- **Grade anyone.** No individual is told, here or anywhere, whether their artifact or decision "counts" — the recompute makes the counts readable without anyone being told their standing (issue #17's rule).
- **Score anything.** Three lines, kept apart, never a headline number (NON-GOALS.md §2, §5).

## Impact on existing documents

- PREMORTEM.md §2: criterion 3 gains a pointer to this definition; the criterion's wording is otherwise unchanged.
- FAQ.md §27: restates the criterion with the pointer.
- No schema change. No registry change. No effect on any project's record.

**Review date.** This proposal's review date is set to 2027-08-01 — *after* the evaluation it governs — rather than the sibling convention of created + 6 months. Deliberate: a definition of the test coming up for revision while the recompute is publishing running counts would be amendment under partial outcome knowledge, the exact thing this proposal exists to prevent.

## Alternatives considered

- **Entries-only (strict).** Rejected: converts the 2-of-4 threshold into 1-of-1 silently, on a ~318-day effective clock (OTCS-0004's ratification is held until 2026-09-14, and REGISTERING.md recommends against registering before it).
- **Vocabulary counts toward survival (permissive).** Rejected: makes the prescribed failure response satisfy the survival test — the narrowing trap in full.
- **Founder-collected attestations.** Rejected: selection precedes attestation; a quoted party is not independent evidence if the quoter chose the quotes.
- **Named parties required.** Rejected: retroactively discards most of the existing parties, and issue #14 already rejected this shape for standing.
- **One instance suffices ("anyone", literal).** Rejected: a single instance is manufacturable; the imported two-party bar is the cheapest evidence the first instance was not arranged.
- **Founder-authored entries as valid entry-use targets.** Rejected after adversarial review: two friendly parties depending on the founder's self-description would defeat the criterion without any external record existing — a manufactured pass built entirely inside the project.
