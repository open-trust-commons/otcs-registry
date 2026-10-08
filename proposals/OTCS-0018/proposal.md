# OTCS-0018 — A ballot qualifies against the strongest objection, even when no one objected

**Class:** `constitutional` · **Phase:** DRAFT · **Clock start:** 2026-10-08
**Clock:** 45–90 days (`GOVERNANCE.md` §3, changing the rules themselves) — **earliest decision: see `proposals/CALENDAR.md`**

## The defect

`VOTING.md` §3 lists seven conditions for a ballot to count, "all seven, or the ballot does not qualify." One of them:

> Reviewed at least one serious objection

The trajectory receipt enforces it: `objections_reviewed` must hold at least one item (`schemas/trajectory-receipt.schema.json`).

**When no one objects, no ballot can qualify.** A proposal with a quiet window cannot be decided, however clear it is. The rule meant to make every voter face the case against a proposal instead blocks every proposal no one argued with.

This is not hypothetical. OTCS-0012's window ran 18 days with no comment. Its decision could be recorded only after the founder raised and answered an objection against his own proposal (#59, 2026-10-08), as OTCS-0001 and OTCS-0003 had done. The windows of OTCS-0005, OTCS-0013, OTCS-0014 and OTCS-0015 have no comments either.

A self-raised objection has worked as a habit. It is not in the rule, so it is not required, and nothing says what it must contain.

## What the rule is for

The condition exists so that **no qualified ballot is cast without facing the case against the proposal.** `VOTING.md` §6 already names the place that case lives: every proposal keeps a packet that includes its **strongest objection**, and the catch-up path is "read the proposal → review the strongest objection → …". The condition in §3 points at objections *raised*, when the purpose is served by the *strongest objection*, whoever wrote it.

## What this proposal changes

### 1. The condition in `VOTING.md` §3

Replace:

> - Reviewed at least one serious objection

with:

> - Reviewed the strongest objection in the proposal's packet (§6)

### 2. Every proposal states its strongest objection

Added to `VOTING.md` §6, after the packet list:

> **The packet always has a strongest objection.** Before a proposal's deliberation window opens, its record states the strongest objection to it. Where no one has raised one, the author writes it, and it is marked as written by the author. Anyone may raise a stronger objection at any time, and the strongest one raised replaces it in the packet. An author-written objection is answered on the record like any other.

The record is the proposal's deliberation record (`proposals/<id>/deliberation/record.md`) or, where a proposal has none, a section of `proposal.md` titled *Strongest objection*.

### 3. What a receipt lists

`objections_reviewed` in a trajectory receipt lists the strongest objection reviewed, by its record or its identifier, plus any other objections the voter reviewed. The schema is unchanged: it still requires at least one item, and the packet always supplies one.

## What this proposal does not do

- It does not lower the bar. A voter still faces the case against the proposal before the ballot counts.
- It does not change who may object, or when (see OTCS-0015). It changes what a voter must have reviewed.
- It does not allow "no objection was raised" to stand in for review.
- It does not apply to decisions recorded before it is ratified. Until then, quiet proposals keep needing a self-raised objection.

## Strongest objection (written by the author)

**Letting the author write the strongest objection invites a straw man.** An author who wants a proposal to pass will write the weakest objection they can, and the safeguard becomes a formality.

**Answer.** Three things limit that. The objection is marked as the author's, so every reader can see that no one else has argued yet. Anyone can raise a stronger one, and it replaces the author's in the packet. And under the rule as written today, the same author already decides what self-objection, if any, to raise, with no requirement to raise one at all. This proposal makes the objection required and visible, and lets anyone replace it.

## Impact on existing records

None. No record, ballot or decision already recorded changes.

On ratification, open proposals that have no strongest objection on record need one before their windows close. Proposals already decided are unaffected.

## Alternatives considered

- **Allow a ballot to qualify when no objection was raised.** Rejected: a quiet window would then admit ballots that faced no case against the proposal, which removes the safeguard.
- **Keep the rule and rely on self-raised objections.** Rejected: the practice works only as long as someone remembers it, and nothing says what it must contain.
- **Drop the condition.** Rejected: the condition is the only one of the seven that asks a voter to engage with the case against a proposal.

## On decision — required cleanup

1. **If ratified:**
   - apply §1 and §2 to `VOTING.md`;
   - add a validator warning when a proposal enters DELIBERATION with no strongest objection on record;
   - add a *Strongest objection* section to the proposal template, if one exists by then.
2. **If rejected:** nothing to remove. Quiet proposals keep needing a self-raised objection.

## Provenance

Found while recording the OTCS-0012 decision on 2026-10-08: the receipt validator rejected the founder's ballot because no objection existed to review.
