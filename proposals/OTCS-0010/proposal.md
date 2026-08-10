# OTCS-0010 — Temporal validity: reassessment mode, invalidation logic, authority lifespan, and the constructability ladder

**Class:** `model_revision` · **Phase:** DRAFT · **Clock start:** 2026-08-10
**Clock:** 45–90 days (`GOVERNANCE.md` §3, changing the shared vocabulary) — **earliest ratification 2026-09-24**

## The gap

The vocabulary can say what a project governs and when in an action's life it
operates. It cannot say **how long a decision stays good, what ends it, or how
hard it is to violate.**

Three specific blindnesses:

1. **Authority has no lifespan.** `authority` is a list of types — a project
   claims it reasons about `mandate`, and nothing records whether that mandate
   expires, how fresh it must be, or what revokes it. A decision authorized at
   T₀ inherits its legitimacy forever, as far as the record is concerned.
2. **Revalidation has no mode.** `time` says a project operates
   `across_trajectory`, which is a phase, not a mechanism. Event-driven
   revalidation, fixed-interval polling, commit-bound checking and continuous
   observation are four different engineering commitments that the record
   currently flattens into one token.
3. **`enforce` is a binary with a very tall top rung.** Today: *"`enforce`
   claimed above 0 requires a declared enforcement point."* That test cannot
   separate a system that checks validity before a commit from one where the
   invalid transition does not exist in the reachable state space. Those are
   different claims and the second is far stronger.

## What this adds

### 1. `authority_validity` — authority with a lifespan

```yaml
authority_validity:
  established_at:            # when the grant was made
  valid_until:               # or null for indefinite, declared as such
  freshness_requirement:     # max age of the evidence supporting it
  revocation_source:         # who can end it, and where that is published
  continuation_conditions: []  # what must remain true for it to keep holding
```

Optional. A project that does not model authority expiry omits the block, and
its absence reads as *does not address*, per the standing rule in
`docs/coordinate-system.md` §1.

### 2. `reassessment` — how revalidation actually happens

```yaml
reassessment:
  mode: [event_driven | interval | commit_bound | continuous_observation]
  maximum_unobserved_interval:   # the longest a consequential action may run unchecked
```

`maximum_unobserved_interval` is the load-bearing field. It is the number that
makes "we revalidate" falsifiable, and it is the direct analogue of the
`enforce` test: a mode claimed without an interval is an aspiration.

### 3. `invalidation` — what ends a decision, including what a version check misses

```yaml
invalidation:
  discrete_triggers: []        # authority revoked, policy version changed, evidence expired
  gradual_drift_signals: []    # signals that the basis is degrading while still current
  reference_drift_method:      # how the project detects that an UNCHANGED record stopped corresponding to reality
  uncertainty_behavior:        # what happens when continuation cannot be established
```

`reference_drift_method` is the novel field and the reason this proposal exists.
Discrete triggers are the easy half — a version check finds them. The hard
half is the record that is technically current while the world it describes has
moved: the supplier still `approved` in the database while new conduct makes
that approval indefensible. **Detection cannot be internal, because internally
nothing changed.** A project claiming to handle drift must name the external
signal and who has standing to raise it, or declare the field null and be
honest that it detects state drift only.

`uncertainty_behavior` inherits the existing conservative-uncertainty rule
(§2.5): reduced observability may never argue for continuation.

### 4. `constructability` — the four rungs of an enforcement claim

```yaml
constructability: MONITORED | REASSESSED | COMMIT_GATED | NON_CONSTRUCTABLE
```

| Rung | Claim |
|---|---|
| `MONITORED` | The invalid state can form, and is detected after the fact |
| `REASSESSED` | Validity is rechecked periodically or on events |
| `COMMIT_GATED` | A gate checks validity before a transition commits |
| `NON_CONSTRUCTABLE` | No invalid transition exists in the reachable execution space |

**A project may not claim `NON_CONSTRUCTABLE` because it implements
`REASSESSED`.** Formally, reassessment requires the validity predicate to hold
at each consequential transition; non-constructability requires that predicate
*failing* to leave the transition unreachable or undefined — which additionally
demands atomic check-and-commit, no time-of-check/time-of-use gap, no bypass
path, and fail-closed behaviour.

**Evidence rules, so the top rung cannot be reached by assertion:**

- `COMMIT_GATED` and above require a declared enforcement point (the existing
  `enforce` test, unchanged).
- `NON_CONSTRUCTABLE` additionally requires a stated argument for
  unreachability and may not exceed `SELF_ASSERTED` evidence state without
  independent testing. It is the one claim in this vocabulary whose truth the
  claimant structurally cannot establish alone (`CL308`, and the same reasoning
  that put the founder outside his own evaluation in OTCS-0008).

Independent convergence on these four rungs: security separates detection from
prevention from type safety; safety engineering separates the alarm from the
interlock from inherently-safe design; programming languages separate the
runtime check from the type system from *make illegal states unrepresentable*.

## What this deliberately does NOT add

A proposed `continuation.current_status` block with the values
`CONTINUE · CONSTRAIN · HUMAN_REVIEW · STOP` was considered and **refused**.
It is a one-to-one rename of the existing `declaration.decision_outputs`
enum (`ALLOW · SHAPE · DEAUTOMATE · VETO`) — same four positions, different
tokens. Adopting it would create a second vocabulary for one concept, which is
precisely the defect the corpus already carries in triplicate for staleness
(`analysis.freshness.state`, `confirmation_status`, `source_status`) and should
not repeat. Anyone wanting continuation semantics uses `decision_outputs`.

Similarly refused: a per-decision "continuation lease" object. A registry
record describes a **project**, not a running authorization instance. Leases
belong to a runtime's wire format, not to a project manifest.

## Impact on existing records

Every field is optional and additive; no existing record becomes invalid.
`ktp`, `ktp-demo` and `abt` are listed as affected because they are the records
that would gain `constructability` values — and on present evidence none of
them reaches above `COMMIT_GATED`.

**Cost, stated:** this resets the `stable_schemas` bake period
(`roadmap/releases/1.0.0.yaml`). That is the correct price and is not
negotiable — a bake period that survives its own corrections measures nothing.

## Sequencing against OTCS-0003

`OTCS-0003` restructures the coordinate vector into three layers and is
ratifiable from 2026-09-10; this proposal is ratifiable from 2026-09-24, after
it. That order is deliberate and should be preserved: `constructability`
belongs with the control-function layer and `reassessment` with the situation
layer under 0003's split, so ratifying this first would place fields on a
structure about to change. If 0003 is rejected, this proposal stands unmodified
against the current single vector.

## Provenance

The gap was named in public writing by Eduardo Monteiro (ArquivoNulo Protocols)
on the temporal governance of persistent execution, and sharpened by the
public objection that increasing reassessment frequency does not make an
invalid state structurally impossible to form. Neither party has any
relationship to this project, has been contacted, or has endorsed anything
here. The vocabulary, the evidence rules, and the refusals are this project's.
