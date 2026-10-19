# OTCS-0020 — Observation classes: how an observation came to exist, and when it may count

**Class:** `model_revision` · **Phase:** DRAFT · **Clock start:** 2026-10-14
**Clock:** 45–90 days (`GOVERNANCE.md` §3, changing the shared vocabulary) — **earliest decision: see `proposals/CALENDAR.md`, and no earlier than OTCS-0017** (this proposal adds to its fields)

## The gap

OTCS-0017 lets a work type say what must be able to refuse it. Many refusals rest on an observation: a service is degraded, a session is live, an area is unsafe, consent was given. Nothing in OTCS yet says how that observation came to exist. Without that, two failures look like ordinary data:

- **A count becomes a verdict.** A camera count, a badge count or an occupancy figure is read as "the area is safe". Only an authority can declare an area safe.
- **Empty becomes zero.** A feed that returns nothing is read as "nothing is wrong", when it may mean the feed is down, out of scope or never set up.

OTCS records what a claim about a project rests on (`EVIDENCE-MODEL.md` §3). It records what a record can cause (OTCS-0011). It does not record how a live observation came to exist, or what it needs before it may constrain consequential work.

## What this proposal adds

### 1. Five observation classes

Every observation that a refusal point reads belongs to exactly one class. The class says how the observation came to exist, not what it is about.

| Class | How it came to exist | Example |
|---|---|---|
| `direct` | One instrument sampled a quantity at one place | A path probe, a sensor, a camera frame |
| `counted` | Computed over a counted set inside a boundary | A service health figure, a count of open findings, an entity graph |
| `adjudicated` | An authority recorded it | A safety declaration, a consent record, a legal hold, a no-action ruling |
| `published` | A third party published it, and it was read | A weather service figure, an outside threat feed |
| `configured` | Set by an operator, in a calendar, a configuration or a table | A schedule, a maintenance window, a configuration flag |

### 2. The envelope each class needs

An observation counts only with its envelope. The envelope is what lets a reader judge whether the observation still says what it says.

```yaml
observation:
  observation_class: direct | counted | adjudicated | published | configured
  envelope:
    # direct
    instrument:
    location:
    modality:
    calibrated_at:
    # counted
    membership_rule:          # what is in the counted set
    rule_version:             # the version of that rule; a figure computed under another version is another observation
    boundary:                 # where the set ends
    accumulation_window:      # the period the count covers
    # adjudicated
    issuing_party:
    criteria_version:         # the rules the authority applied, and their version
    issued_at:
    # published
    publisher:
    series:
    vintage:                  # which release of the series
    publication_lag:          # the delay between the period covered and publication
    # configured
    as_of:
    validity_horizon:         # after this, the state is unknown
```

Only the fields for the observation's own class are set. The envelope reuses the wire signal's `source`, `freshness`, `valid_from` and `valid_until` where they say the same thing (`schemas/wire/signal.schema.json`). It adds no second field for any of them. This proposal defines the shape; it does not change the wire signal schema. Where an observation record travels on the wire is settled through `interfaces/observer.md`'s own formalization trigger, as OTCS-0011 did for receipts.

### 3. The rules

1. **No envelope, no constraint.** An observation without its class and envelope cannot permit or constrain consequential work. It may still be shown to a person as context.
2. **Unknown is not zero.** An empty counted set is unknown, not zero. A missing adjudicated record is unknown, not "no ruling". Any observation past its window or validity horizon is unknown.
3. **What unknown does is the work type's choice, not the observation's.** An unknown reading goes to the refusal point's `uncertainty_behavior` (OTCS-0010). This proposal adds no second rule for it.
4. **A computation does not change the class.** A figure computed from `direct` samples is `counted`, with its membership rule and that rule's version; it reads as computed, never as sampled, and two figures computed under different rule versions are two observations. No `direct` or `counted` observation becomes `adjudicated`, however many of them agree. A count is never a declaration.
5. **The deployment is never its own adjudicator.** The issuing party of an `adjudicated` observation is never the configurator or executor of the work that observation would permit or constrain (OTCS-0017 §4). When the issuing party shares the failure domain of the work, the observation is self-attested (`schemas/wire/signal.schema.json`) and is not `adjudicated`.
6. **Published is never restated as ours.** A `published` observation keeps its publisher, series and vintage everywhere it is used, including inside a computed figure. A deploying party that republishes it does not become its publisher.
7. **Observing is not controlling.** Work whose ceiling is `evidence_only` produces observations. It does not gain any ceiling above that by producing them.

### 4. Where the class is written

- **In an observation record:** `observation_class` and `envelope`, as in §2.
- **In a work type (OTCS-0017 §5):** each refusal point may state `reads`, the observations it relies on and the classes it accepts for each. This is a requirement. An instance declaration may state which classes its points accept as built; a deployment record states what each point reads in force (OTCS-0017 §7).

```yaml
refusal_point:
  can_refuse: [consequence]
  reads:
    - about: physical safety of an area
      accepts: [adjudicated]
    - about: area occupancy
      accepts: [direct, counted]
```

A refusal point that accepts only `adjudicated` for a question cannot be satisfied by a count, however recent.

- **In observation work types:** `observation_domain` (OTCS-0017) says what is observed. A new `observation_classes: []` says which classes the work produces. They answer different questions and are both set.

## How this relates to what OTCS already has

| Existing | What it answers | Relation |
|---|---|---|
| Evidence states (`EVIDENCE-MODEL.md` §3) | How well a claim about a project is supported | Different question. Observation classes are about live observations used in work, not claims in the registry. Never grade one with the other (§4b). |
| Adjudication (`ANALYSIS-MODEL.md`) | Who assigns this registry's statuses | The same principle at a different scale: a status exists because an accountable human process recorded it, and nothing upgrades into one by computation. |
| `self_attested` (`schemas/wire/signal.schema.json`) | Does the source share the subject's failure domain? | Reused by rule 5. |
| `freshness`, `valid_until` (same schema); `freshness_requirement` (OTCS-0010) | Is it still current? | Reused by the envelope. OTCS-0010 says how fresh the work needs it; the envelope says how fresh it is. |
| `evidence_efficacy` (OTCS-0011) | What can a record cause? | Different question. Efficacy is what the record can do; the class is how the observation came to exist. |
| `observation_domain` (OTCS-0017) | What is observed | Different question, set alongside. |

## What this proposal does not do

- It does not rank the classes. `adjudicated` is not stronger than `direct`; each answers a different question.
- It does not score observations or the parties that produce them (`NON-GOALS.md` #2).
- It does not decide what unknown does. That stays in OTCS-0010.
- It does not hold observations. The registry describes the shape; observations stay with whoever makes them.
- It does not change the wire signal schema or any interface. Placing the observation record on the wire is deferred (below).
- It changes no meaning of any field it reuses.

## Dependencies and sequencing

- **OTCS-0017.** `reads` and `observation_classes` are added to its fields. This proposal is decided no earlier than OTCS-0017.
- **OTCS-0010.** Rule 3 relies on `uncertainty_behavior`. If OTCS-0010 is rejected, rule 3 needs a replacement before this proposal is decided.

## Impact on existing records

None. No manifest, record or wire schema changes.

## Expressly deferred

- A physical or public-safety observation domain. The area-safety, occupancy and weather examples above fall outside OTCS-0017's three observation domains (security, network, application). Work that observes the physical world needs a domain of its own, with its standards named (OTCS-0017 §8). The classes in this proposal apply in any domain; the domain list stays OTCS-0017's.
- Placing `observation_class` and `envelope` on the wire. `interfaces/observer.md` is EXPERIMENTAL and says adding required semantics there is a proposal; its formalization trigger is evidence that observer-only projects need contract terms signal providers do not. Whether that trigger has fired is a ruling for that interface, not this proposal.

## Alternatives considered

- **A confidence number per observation.** Rejected: the wire signal already has `confidence`, and a number cannot say whether a figure is a count or a declaration. A count at 0.99 confidence is still a count.
- **Fold the classes into the evidence states.** Rejected: the evidence states grade registry claims about projects. Mixing the two would let a project's documentation grade a live observation.
- **Let enough `direct` observations add up to `adjudicated`.** Rejected: agreement among sensors is still a measurement, not a declaration by an authority. Rule 4.
- **Treat an empty set as zero once a feed has a record of reporting.** Rejected for now: a feed can stop reporting into an empty result. A `counted` observation that wants to report a true zero states its membership rule and window, and the reader judges the coverage.

## Strongest objection (written by the author)

**"Unknown is not zero" will make every quiet system look broken.** Most of the time an empty result really does mean nothing happened. If every empty set is unknown, refusal points will fire constantly, operators will learn to ignore them, and the rule will be switched off in practice.

**Answer.** The rule does not say an empty set is bad. It says an empty set is not evidence of nothing. What a refusal point does with unknown is the work type's choice (rule 3): it may narrow the work, hand the decision to a named person, or stop. It may never treat unknown as grounds to continue (`docs/coordinate-system.md` §2.5; OTCS-0010 §3). Unknown lowers; it never raises. A quiet system with a stated membership rule and window is not unknown; it is a counted set with nothing in it, and the reader can see that the count covered what it needed to. The rule only bites where the envelope is missing, and a missing envelope is the case where "nothing happened" has not been shown.

## On decision — required cleanup

1. **If ratified:**
   - create `OBSERVATION-CLASSES.md` from §§1–4;
   - publish an example observation record per class beside `OBSERVATION-CLASSES.md`, outside any wire schema;
   - add `reads` and `observation_classes` to the work-type schema created on OTCS-0017's ratification, `reads` at the work-type level as a requirement;
   - add a coherence check that `OBSERVATION-CLASSES.md` matches §§1–4 of the ratified text.
2. **If rejected:** nothing to remove.

## Amendments

**Amendment 1** (SUBSTANTIVE under OTCS-0013 §3.1; pinned as v1 at its merge, which restarts the clock). One change: a `counted` observation's envelope names the version of its membership rule, `rule_version`, and rule 4 says what that means: a computed figure reads as computed, never as sampled, and a change of rule is a different observation. A new field, so SUBSTANTIVE. Generalized from a second operating model of the author's, where a derived edge names its rule and rule version; the word *derived* is not adopted here, since this proposal already uses it for nothing and `configured` for the state that model called derived.

## Provenance

Designed by the founder. The five classes and their envelopes are generalized from an operating model for shared security, IT and public-safety operations, with every organization-specific term removed.
