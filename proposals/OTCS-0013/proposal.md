# OTCS-0013 — What an amendment does to the clock

**Class:** `constitutional` · **Phase:** DRAFT · **Clock start:** 2026-09-19
**Clock:** 45–90 days (`GOVERNANCE.md` §3, changing the rules themselves) — **earliest ratification: clock start + 45 days**

## Provenance

This gap was found while opening the deliberation window for OTCS-0004 ([#49](https://github.com/open-trust-commons/otcs-registry/issues/49), 2026-09-12). That window promised a ruling on what an amendment does to the clock "before any amendment merges," because the first amendment to any proposal from outside the project was about to be filed against 0004.

It is not a coincidence that the gap surfaced then. Every earlier amendment in this repository was the founder amending the founder, before any window existed, and a rule for that case is not worth writing. The rule is needed the moment a second person can change a text that a clock is running on.

## The gap

Three sentences already exist, and they do not meet:

- `GOVERNANCE.md` §3: "**This is a floor, not a target.** The clock runs from first publication, and nothing can be approved before it elapses."
- `proposals/CALENDAR.md`, DELIBERATION → RATIFICATION: "A vote on one fixed version, no earlier than the calendar date. **Any real change during voting restarts the vote.**"
- `VERSION-EXIT-CRITERIA.md` §3: "Changing them afterwards requires a public model-revision proposal and **restarts the review clock**. This is the specific control against manufacturing readiness by moving the target."

The first says when the clock starts. The second says what a change does during the last phase. The third names the principle — a clock exists so that the thing being decided has been public for the whole floor — and applies it to release criteria. Nothing applies it to a proposal amended during DRAFT or DELIBERATION.

Under the text as written, a proposal can be published as a stub on day 0, rewritten on day 44, and decided on day 45 with the floor honored on paper and defeated in substance. Nobody has done this. The rule that prevents it should exist before anyone could.

## The rule

The following is added to `GOVERNANCE.md` as **§3.1 Amendments and the clock**.

> ### 3.1 Amendments and the clock
>
> **A pin.** Entering DELIBERATION records the version being deliberated as a `VERSION_PUBLISHED` event in the governance ledger, carrying a hash of `proposal.md` and `proposal.yaml` (excluding phase and clock bookkeeping). The window issue names the pin. Every ballot is cast against a pin (`VOTING.md` §5).
>
> **An amendment** is any merged change to the pinned text, in any phase from DRAFT on. It is judged as the cumulative difference from the current pin, not as the last pull request's diff.
>
> **Two classes**, declared by the amendment's author on the `VERSION_PUBLISHED` event that records it:
>
> | Class | Meaning | Effect on the clock |
> |---|---|---|
> | `NON_SUBSTANTIVE` | No change to any grant, requirement, field meaning, consent scope, `class`, or `affected_projects` | No decision earlier than 7 days after the merge. The clock does not restart |
> | `SUBSTANTIVE` | Anything else. When in doubt, this | A new pin. The clock restarts at the merge date; no decision earlier than the merge plus the minimum for the proposal's class. During RATIFICATION it also voids the ballots and returns the proposal to DELIBERATION |
>
> **Mixing.** A proposal carries the class of its heaviest change, and its class never decreases. An amendment that introduces a change of a higher class re-classes the whole proposal and restarts at that class's minimum. A lower-class amendment inside a higher-class proposal never shortens anything.
>
> **Contest.** Anyone may contest a classification on the window issue within 7 days of the merge, naming which part of the definition is met. A contest is an objection under §2: it is answered, or carried into the decision record as unresolved, and an unresolved contest is a ground for `HELD`. A contest can raise a class, never lower one. A contest does not by itself move the clock.
>
> **The window has a minimum of its own.** A proposal is not decided earlier than **28 days after its deliberation window opened**, or the class minimum after the window opened if that is shorter. The floor from first publication says how long the *text* has been public; the window minimum says how long the *place to object* has existed. A listing update still takes its three days; a rule change whose window opened late waits the four weeks. Windows are opened by the repository's workflow the day a proposal enters DELIBERATION, so from here on the two clocks coincide, and the minimum bites only where a window was opened late.
>
> **The date is computed.** The earliest legal decision is the latest of: the clock start plus the class minimum; the window opening plus the lesser of 28 days and the class minimum; and every `NON_SUBSTANTIVE` merge plus 7 days. It is derived from the ledger and the phase history by tooling. No person enters it.
>
> **Emergency** proposals admit no amendments. They expire (§8); a change is a new proposal.
>
> **After ratification.** Changing a ratified proposal's normative text is a new proposal of the heaviest class it touches, never a clarification filed alongside it.

## Why the full minimum, not a fraction

The floor is the least public exposure the text being decided must receive. A fractional restart re-opens the loophole at reduced size: stub on day 0, rewrite on day 44, half-restart, and the real text is public for 23 days before it can be decided. With one participant, nobody's prior 44 days carry over to a text they have not read; with many, the ones who read the old text are the ones most likely to miss what changed.

The cost of a restart falls on the author. That is the right incentive: publish the real text first. Adopting an external objection restarts the clock, and that is the price of adopting it. It is exactly the case in front of this proposal.

## Why two classes, not more

Editorial and clarifying amendments differ only in whether they get the 7-day tail, and editorial ones need it too — a "typo" that turns MUST into MAY is the classic abuse. A change of scope is not a third class; it is re-classification, which "heaviest change" already requires.

`NON_SUBSTANTIVE` is defined by process rather than content on purpose. Any content definition of "clarifying" leaks: changing an example is editorial, and examples define meaning in practice. So the class is what the author claims and nobody contests, with the obvious cases refused mechanically (§ *On decision*).

## What the record is

The ledger is the record. The window issue is notification. A pin is a ledger event; a re-pin after a `SUBSTANTIVE` amendment is another, and the window issue gets a dated comment and its opening post rewritten to the current pin so that it never describes a version nobody is deliberating. One issue per proposal, for the life of the proposal, so that every ballot's trajectory receipt can cite one place.

## Precedent, disclosed

Three amendments exist in this repository's history. All were made by the founder, before any window had been opened on the proposal, under no rule:

| Proposal | What happened | Clock |
|---|---|---|
| OTCS-0002 | v1 published 2026-07-26 20:31, v2 the same evening | untouched |
| OTCS-0005 | amended in DRAFT 2026-08-03 after an external architectural review | untouched |
| OTCS-0010 | amended in DRAFT 2026-08-10, the day it opened | untouched |

This proposal does not restart those clocks retroactively. It records that they ran under no rule, which is a weaker statement than "they complied," and it is the true one. Any of the three can be re-pinned under §3.1 by a `SUBSTANTIVE` amendment at any time, at the cost §3.1 names.

## What this proposal does not do

- It does not shorten any clock, waive any clock, or create a discretionary one.
- It does not change `proposal.yaml`'s shape. Amendment history lives in the ledger, where it is hash-chained, not in a file that can be edited.
- It does not decide any classification. It says who declares, who may contest, and what an unresolved contest does.
- It does not apply to OTCS-0004 by its own force. Until this ratifies, 0004 is governed by the founder's self-objection on #49, which binds 0004 to the strictest reading of this rule and to whichever of that reading and the ratified text is stricter at decision time.

## Alternatives considered

- **Keep the date.** Rejected: it makes §3 a formality for any proposal amended late.
- **A fractional restart** (half the floor, or a fixed 14 days). Rejected: see above.
- **Four amendment classes** (editorial / clarifying / substantive / scope-raising). Rejected: collapses to two once the tail applies to editorial changes and scope-raising is recognised as re-classification.
- **An `amendments[]` array in `proposal.yaml`.** Rejected: a second copy of what the ledger already records, in a file that is not hash-chained.
- **One window issue per version.** Rejected: fragments the deliberation and gives ballots several places to cite; the ledger already distinguishes versions.

## On decision — required changes

Whichever way this is decided:

1. **If ratified:** add §3.1 to `GOVERNANCE.md`; add one paragraph to `proposals/CALENDAR.md` pointing at it; the 28-day window minimum becomes part of the computed date for every proposal (it is applied from 2026-09-19 as the founder's self-binding, disclosed on the calendar, until then); add `amendment_class` (`NON_SUBSTANTIVE` | `SUBSTANTIVE`) and `supersedes_version` to `schemas/governance-event.schema.json` as required on any `VERSION_PUBLISHED` event that follows a prior pin; switch `npm run validate` from warning to failing on: a `VERSION_PUBLISHED` without those fields after a pin, a `NON_SUBSTANTIVE` declaration where `class`, `affected_projects`, or a normative line changed, a class decrease, a phase entry to RATIFICATION or OPERATION or a `decision.json` before the computed earliest date, and any amendment to an `emergency` proposal.
2. **If rejected:** the three sentences in *The gap* stand and the gap is recorded as open in `proposals/CALENDAR.md`, so that the next external amendment does not rediscover it.
3. **Either way:** the self-objection on #49 is answered on the record with this proposal's outcome.
