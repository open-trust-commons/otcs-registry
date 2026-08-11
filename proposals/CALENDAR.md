# The proposal calendar

*Status: EXPERIMENTAL · Maintained by hand; verify any date against the proposal's own `proposal.yaml` before acting on it. Where they disagree, the proposal file wins.*

Nobody owns advancing the proposals unless a page says who and when. This page makes the pipeline visible: every proposal, its phase, the next transition, the work that transition requires, and the earliest date the rules allow a decision. The clocks are floors from `GOVERNANCE.md` §3 — nothing here can be decided earlier than its date, and a date arriving compels nothing.

## The calendar

| Proposal | Class | Phase | Next transition | Earliest legal decision |
|---|---|---|---|---|
| OTCS-0000 — constitutional documents | constitutional | OPERATION | REVIEW at its review date | 2027-01-25 (review) |
| OTCS-0001 — v0.1 registry seed records | registry_update | **OPERATION** | Decision recorded 2026-08-05 (late, disclosed): RATIFIED / ALLOW | review 2026-10-25 |
| OTCS-0002 — lifecycle, typing, legend, evidence classes | model_revision | DRAFT | DELIBERATION → RATIFICATION | 2026-09-09 |
| OTCS-0003 — three-layer split of the coordinate vector | model_revision | DRAFT | DELIBERATION → RATIFICATION | 2026-09-10 |
| OTCS-0004 — entry licensing | model_revision | DRAFT | DELIBERATION → RATIFICATION | 2026-09-14 |
| OTCS-0005 — sealed claims | model_revision | DRAFT | DELIBERATION → RATIFICATION | 2026-09-14 |
| OTCS-0006 — project families | model_revision | DRAFT | DELIBERATION → RATIFICATION | 2026-09-14 |
| OTCS-0007 — "uses the data to make a decision" | constitutional | DRAFT | DELIBERATION → RATIFICATION | 2026-09-17 |
| OTCS-0008 — who evaluates the kill criteria | constitutional | DRAFT | DELIBERATION → RATIFICATION | 2026-09-17 |
| OTCS-0009 — when the kill criteria are read | constitutional | DRAFT | DELIBERATION → RATIFICATION | 2026-09-18 |
| OTCS-0010 — temporal validity + constructability ladder | model_revision | DRAFT | Deliberation window open; sequenced after OTCS-0003 | earliest 2026-09-24 |
| OTCS-0011 — evidence efficacy | model_revision | DRAFT | Deliberation window open; independent of 0010 | earliest 2026-09-25 |

Dates are computed as `clock_start` + the floor of the proposal's `GOVERNANCE.md` §3 class: 45 days for constitutional and vocabulary-touching model revisions, 3–7 days for a registry listing update. The clock is a floor, not a target; a proposal may sit in deliberation as long as the deliberation needs.

## What each transition requires

**DRAFT → DELIBERATION.** The concrete change is already published (that is what DRAFT means here). Entering deliberation means opening a dated window on the public record: where objections land (the issue tracker of this repository), when the window opened, and the version being deliberated. Serious objections must be answered or carried into the record as unresolved (`GOVERNANCE.md` §2).

**DELIBERATION → RATIFICATION.** A vote on one fixed version, no earlier than the calendar date. Any real change during voting restarts the vote. Ballots are signed files per `VOTING.md` §9, each with a trajectory receipt; `schemas/ballot.schema.json` governs the shape.

**RATIFICATION → OPERATION.** A decision record (`decision.json` in the proposal directory, shaped like `proposals/OTCS-0000/decision.json`) carrying the vote result **and the separate process-validity determination** — `VALID` or `HELD`, with grounds. Winning the vote is not the same as being decided (`GOVERNANCE.md` §2). The ledger records the events; the phase history is appended.

**Per-proposal notes.**

- **OTCS-0001** decision recorded 2026-08-05 after ballot verification — four days past its window, disclosed in the record itself rather than backdated. The pipeline currently has no overdue decisions.
- **OTCS-0003** revises the coordinate vector through the OTCS process while `CHARTER.md` §2 places the vocabulary in KTP's custody. That ownership seam should be named inside 0003's deliberation record rather than discovered after ratification.
- **OTCS-0007, 0008 and 0009** reform the same test (`PREMORTEM.md` §2) and reference each other while amendable. OTCS-0009 carries in-DRAFT date amendments to 0007 and 0008 so the three ratify as one dated set. Deciding them piecemeal would leave the test half-reformed; the calendar treats 2026-09-17/18 as one window.

## Deliberation with one participant

`GOVERNANCE.md` §2 requires objections answered or carried as unresolved. With zero external participants, that requirement does not go away — it just has an honest shape and a dishonest one. The honest shape, used here until there is anyone else:

1. **The window is real and dated.** The deliberation record states when it opened, where comments could have landed (a public issue on this repository — anyone may file one, a handle is fine), and when it closed.
2. **Silence is recorded as silence.** "No external comments were received" is the entry. It is never written up as agreement, consensus, or review. Nobody agreed; nobody was there.
3. **Self-objections are still objections.** Where the founder raises an objection against his own proposal (as in `proposals/OTCS-0001/objections/`), it is answered on the record like any other — but it is recorded as the founder's, and it does not make the deliberation less empty.
4. **The emptiness is disclosed in the decision.** The decision record's process-validity block names the limitation — founder-only participant set — exactly as `proposals/OTCS-0000/decision.json` does, rather than laundering it. Any external participant may reopen a decision made this way through the normal proposal process.
5. **Nothing private counts.** Substantive reactions that arrived in correspondence are not deliberation and are not summarized into it (`COMMUNICATIONS.md` §7). If the author of one wants it to count, it enters under their own name, on the record.

A one-person deliberation run this way produces a weak record that says so. That is the intended output. The alternative — a weak record dressed as a strong one — is the failure mode this project exists to refuse.
