# Method: self-verification-attempt-v1

*Version 1 · [ANALYSIS-MODEL.md](../../ANALYSIS-MODEL.md) §10*

## What this method does

Applies the three-column baseline from [ANALYSIS-MODEL.md](../../ANALYSIS-MODEL.md) §3 — *what the owner says, what OTCS observes, resulting status* — to a project whose owner is also the analyst, and states the result honestly whether it succeeds or fails.

## Why it exists

Every other analysis method in this registry assumes the analyst is not the subject. That assumption is false for the founder's own projects, and pretending otherwise would make the analysis worthless rather than merely weak. This method exists so a founder-authored analysis has a named, disclosed shape instead of masquerading as an ordinary review.

## Steps

1. List the subject's own claims from its `claims.yaml`, verbatim
2. For each claim, state what artifact or action would be required to move it to `INDEPENDENTLY_TESTED`
3. State plainly whether that requirement is currently met
4. Where it is not met, state why — not as an excuse, as a fact about the current state of the world

## What a finding under this method may never claim

`INDEPENDENTLY_TESTED`, `MUTUALLY_CONFIRMED`, or any status implying a party other than the founder reached the conclusion. Every finding produced by this method carries `human_reviewed` at most, and every analysis using it discloses the conflict per [ANALYST-DISCLOSURE.md](../../ANALYST-DISCLOSURE.md) §3 — the founder's standing conflict — and §4's ninth defeater: the method itself was authored by the analyst's own project.

## What a finding under this method is for

Recording, in the registry's own machine-checkable shape, exactly which claims about the founder's own work remain unverified — so the gap is visible in the same place the claim is, rather than left to be noticed by someone else first.
