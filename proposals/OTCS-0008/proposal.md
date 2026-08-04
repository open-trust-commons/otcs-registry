# OTCS-0008 — Who evaluates the kill criteria: the standing determination

*Class: `constitutional` · Clock: 45–90 days · Earliest decision: 2026-09-17*

## Provenance

PREMORTEM.md §2 says the kill-criteria evaluation happens *"in the open"* and never says by whom. With no named party, the founder decides whether the founder succeeded — the self-grading this project exists to refuse, arriving at the one moment it is least defensible. The gap was worked as issue #7; the coverage list this proposal answers — who performs the evaluation, what standing they possess, what conflicts defeat independence, what evidence they must examine, what happens when evaluators disagree, the determination states and the challenge procedure — was supplied in architectural review, with the instruction that all of it be fixed **before the outcome becomes visible**. This proposal fixes it now, while the outcome is unknown. Amending a test in advance is legitimate; choosing an examiner at evaluation time, when the answer is already visible, is not.

## The defect being repaired

Three problems, all created by the missing party:

1. **Self-grading at the terminal moment.** Every other self-grading path has been closed — OTCS-0007 made the founder never source and never judge of the evidence. The final reading of the scoreboard was the remaining opening, and it is the largest.
2. **The appointment catch-22.** The founder cannot appoint his own examiner without reproducing the problem the role exists to solve — and today there is nobody else. Any design requiring an appointment, a panel, or a named individual fails on the day it is written.
3. **Silence defaulting to a pass.** With no evaluator named, an evaluation nobody performs is indistinguishable from an evaluation that was passed. An empty authority persists — the exact outcome §2 exists to stop.

## What this proposal adds

### 1. A determination, not an office

There is no evaluator seat, no appointment, and no accreditation (NON-GOALS.md §12). Instead: **any party who qualifies under §2 below may file a signed, public determination** — a reading of the computed evidence against OTCS-0007's pre-registered matrix. The founder never selects the examiner; the published rule does. Qualification is a disclosed fact carried on each determination, never a credential granted in advance, and this registry still accredits no evaluator.

This is also deliberate motion toward CHARTER.md §7 stage 2: filing a qualifying determination is a non-founder performing a governance act in public, on the record.

### 2. Qualification — imported, not invented

The bar is EVIDENCE-MODEL.md §3's independence test — shared founders, shared funders, advisory relationships, reciprocal review, employment, contractor status, contributed code, commercial dependency, substantial prior collaboration — **widened from evaluating a claim to evaluating this project**, the same scope-widening issue #14 applied to VOTING.md §2. A bar already written down cannot be quietly lowered later for a particular person.

- Independence is assessed **at the date of the determination** and disclosed on it, using the existing `evaluator_independence` structure: `independent_at_assessment`, `assessed_at`, `current_status`.
- Where the evaluator shares any §3 relationship with a party whose instance they would rule on, they are **recused from that instance** and the recusal is recorded (the CHARTER.md §12 recusal pattern). The remaining rulings stand.
- Identity may be a handle (#14). The substance must be public; the arguer need not be named.
- **No participation minimum.** The determination qualifies, not the person (§3 below). Requiring a prior participation trail would make the role a credential and empty the pool by construction.

**Stated cost, per this project's discipline:** applied honestly, §3 disqualifies the parties closest to the project today. That is the test working, recorded now rather than discovered in 2027.

### 3. What a determination must contain

A determination qualifies only if it **shows its work**:

- The inputs examined, cited: the public instances file, the contact log, the recompute outputs (#19), the public record behind criteria 1 and 2, and any criterion-4 declaration.
- A ruling on each contested instance — `QUALIFIED` or `NOT_QUALIFIED` — **with reasons**, against OTCS-0007's qualifying rules.
- The matrix reading, line by line, arriving at one overall state: `SURVIVED`, `NARROW`, or `STOP`.
- Objections raised against it on the public record are answered on the record — VOTING.md §2's governing rule, *"you have to stay in the process long enough to be exposed to correction,"* imported per-determination.

A drive-by filing that shows its work is admissible. A credentialed filing that does not is not.

### 4. Disagreement and challenge

Determinations are records, never verdicts. When qualified determinations conflict:

- The conflict becomes a **dispute record** (GOVERNANCE.md §10) — what is at issue, both sides, both preserved.
- **While the dispute is open, the reading least favorable to the project governs.** The founder gains nothing by soliciting a friendlier second opinion, and an adverse finding is never suspended by the act of challenging it.
- Any party may challenge a determination or an individual ruling through the same dispute process. Appeals go to the next stage of governance (CHARTER.md §7), as everywhere else.

Stated cost: a hostile, wrong determination also governs until its dispute resolves. That is the price of the property, paid knowingly.

### 5. The failure-to-appear rule

Silence must not default to a pass. At each evaluation date — the interim reading of 2027-07-29 and the final evaluation of 2028-07-29 (OTCS-0009):

| Situation | Outcome |
|---|---|
| Computed counts land on **narrow** or **stop**, no qualified determination filed | **The adverse outcome executes.** A finding against the project's interest needs no independence to be credible. Contested instances not ruled on count as `NOT_QUALIFIED` — every ambiguity resolves against the project |
| Computed counts land on **survived**, no qualified determination filed | **`HELD`** — it never passes by default (CHARTER.md §12). The hold runs a 90-day clock |
| The hold reaches 90 days with still no qualified determination | **The narrow executes** |

The rationale, stated so it cannot be reinterpreted: if, this long after first release, nobody independent will even attest the public scoreboard, that absence is itself the no-community finding — made checkable instead of arguable. Survival is deliberately hostage to at least one outsider existing, because that is what §2 was always measuring. At the interim date the computed outcomes are OTCS-0009's all-dark tripwire — narrow on total silence, continue otherwise — and this table applies to them unchanged; a continue extends nothing and needs no attestation, because it grants nothing.

### 6. The founder's role, bounded

The founder may point at evidence, must publish every filed determination verbatim and promptly, and may challenge a determination only through the public dispute process — which never suspends an adverse reading. The founder rules on nothing. A determination that the criteria are **met** — a finding of no qualifying evidence — requires nobody's permission and none of the founder's cooperation (OTCS-0007, #19).

## What this proposal does not do

- **Accredit anyone.** No seat, no roster, no credential (NON-GOALS.md §12). Qualification is a disclosed fact per determination.
- **Re-decide what counts as evidence.** OTCS-0007 owns the lines, the bar, and the matrix. This proposal only says who reads them.
- **Recalibrate the clock or the criteria's structure.** Issue #16, which this proposal unblocked — resolved as OTCS-0009, ratifying alongside this proposal: the final evaluation moves to 2028-07-29, the original date becomes an interim all-dark reading, and this proposal's machinery reads both.
- **Tell anyone their standing.** No individual is approached about the role or told they would qualify (#17). The rule is published; whoever arrives, arrives.

## Impact on existing documents

- PREMORTEM.md §2: gains a pointer to this proposal naming the determination process; the criteria's wording is unchanged.
- FAQ.md §27: restates with the pointer.
- No schema change to any project record. No registry change.

**Review date.** 2028-08-01 — after the final evaluation this proposal governs (2028-07-29, OTCS-0009), for OTCS-0007's stated reason: the rules of a test must not come up for revision while the test is being scored.

## Alternatives considered

- **A named individual.** Rejected: the pool is empty, the closest parties fail §3, and approaching anyone about the role collides with #17's rule against telling people their standing.
- **An appointed panel.** Rejected: the founder appointing his own examiners is the catch-22 restated, and no electorate yet exists to ratify a panel instead.
- **Mechanical-only — the recompute is the determination.** Rejected: #19 routes contested qualification rulings to a human judgment, and a fully mechanical reading abandons the one governance role an outsider can take up today.
- **Requiring the #14 participation trail.** Rejected: empties the pool for months, converts the role into a credential this registry grants, and sits awkwardly against §3's own "substantial prior collaboration" disqualifier.
- **Named identity required.** Rejected: #14 already rejected this shape on the record.
- **First-filed governs / majority governs.** Rejected: the first creates a race a friendly filer can win; the second counts heads in a self-selected pool — recruitment, not truth.
- **Conflicting determinations suspend each other.** Rejected: any adverse ruling could then be neutralized by filing a contrary one — the evaluator could no longer fail the project without cooperation.
