# OTCS-0003 — deliberation record

**Window opened:** 2026-09-13 · **Where objections land:** the window issue on this repository (opened by the window workflow from this file's pin) · **Version deliberated:** the pin in the ledger's `VERSION_PUBLISHED` for this proposal, hash reproducible with `npx tsx src/clock.ts hash OTCS-0003` · **Participant set at opening:** founder only, disclosed, per `proposals/CALENDAR.md` *Deliberation with one participant*.

The floor for this class elapsed on 2026-09-10. The window did not exist until today. Under the one-participant protocol a window has to be real and dated, so no decision is recorded earlier than **seven days after this window opened — 2026-09-20 —** whatever the floor says. Seven is the smallest interval `GOVERNANCE.md` §3 recognises as enough for a change to be seen. *(Founder's self-binding; recorded here so it cannot be shortened later.)*

## The seam the calendar told us to name

`CHARTER.md` §2 places the vocabulary and the underlying model in KTP's custody. This proposal revises the vocabulary through OTCS's process. Both are true and the record has to say how.

**Ruling, confirmed by the founder 2026-09-19:** OTCS governs the *registry's use* of the vocabulary — where a term lives in the schema, what it is called in a record, which layers a record has. KTP's custody is over *meanings*. This proposal changes locations and names and adds a layer; **it changes no meaning** — every value list is untouched and the compatibility mapping is rename-or-relocate throughout. Layer 2 is new and is not KTP's; it is adopted from Tamed Autonomy and attributed. So the proposal sits inside OTCS's authority. Had it changed a meaning, `CHARTER.md` §2a would have required the custodian's participation on the record, and the founder holding both roles would not have satisfied that. Raised as [objection-001](../objections/objection-001-custody-seam.md).

## Trial — required before RATIFICATION, executed 2026-09-13

| Requirement | Result |
|---|---|
| All seven records migrated on a branch; `npm run validate`, `npm test`, golden-file reproduction green | **Done.** Eight records (the seven plus the lifecycle fixture) and the example fixture migrated by rename and relocation. Validate 122/122, tests 92/92. `computed/` regenerated: `complementarity.json`, `matrix.json`, `graph.json` changed **only** in input `sha256` stamps — no edge, rung, band, or score moved. That is the diff the proposal asked for |
| Bitcoin under the three layers | **Passes, and finds something.** Layer 1 unchanged; Layer 2 empty and complete; Layer 3 gains `coordinate` 1.0 — consensus, which the single vector could not state. Nothing weakened ([bitcoin.md](../../../calibration/bitcoin.md)) |
| One external architecture with heavy Layer 3 and thin Evidence | **Drafted** on NeMo Guardrails, chosen for being open source and documented ([nemo-guardrails.md](../../../calibration/nemo-guardrails.md)). 5 of 5 under the split. **Subject confirmed by the founder 2026-09-19.** Chosen because it is the most-documented open-source guardrail architecture whose whole design is Layer 3 work (rails around a model, nothing in Layer 1 or 2), so it tests the split where the split is most likely to fail, and anyone can re-run the calibration without a licence. A closed or proprietary subject would have proven less and been reproducible by fewer. The founder-selected limitation stays disclosed in the decision record. |
| Neutrality check re-run | **Passes.** Neither mapping looks deficient where the single vector did not |

Deprecation stage 1 is implemented and proven by fixture: a v0.1-shaped record validates with one warning per deprecated path (`schemas/examples/project-manifest/valid-2-deprecated-paths.yaml`). Stage 2 and 3 dates are set by the decision record.

## The four open questions, answered for the record *(the founder's answers, confirmed 2026-09-19)*

1. **Is "decision inputs versus system work" the right cut?** Yes, and the trial supplied the evidence the argument lacked: Bitcoin's consensus and NeMo's rails both had nowhere to go in the single vector *because* they are system work. No coordinate was found that belongs on neither side.
2. **Does `Coordinate` overlap `Action`?** The referents do not: `Action` is the governed verb, `Coordinate` is the governing project exchanging state with peers. The names collide only in English. Kept, with the definition in `docs/coordinate-system.md` §1.5 saying which is which.
3. **45 or 90 days?** Moot in the direction the question feared: the proposal has been public for 48 days and the launch it worried about happened on the old model on 2026-07-29. What remains is the seven-day window above.
4. **Optional tags for Layer 2?** No. The trial's own draft case shows why: a one-line intent was expressible as prose and would have become a category the moment it was a tag. The proposal's rule stands.

## What changes on decision

If ratified: `LAYERS.md` status moves from PROPOSED to ratified; MIGRATIONS entry dates are filled; deprecation stage dates are set from the decision date; `otcs_version` policy for migrated records is stated. If rejected: the migration branch is discarded, the calibration additions are kept as findings against the single vector, and `LAYERS.md` records the rejection.

## Discussion

*Comments and objections arrive on the window issue and are summarised here with links. Nothing private counts.*

- 2026-07-31 — first external exercise (ev-000026), recorded in the proposal's own discussion record.
- 2026-09-13 — window opened; trial executed; objection-001 raised and answered by the founder.
