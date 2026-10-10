# OTCS-0019 — Requirement profiles: an on-ramp for an organization's own use cases and requirements

**Class:** `model_revision` · **Phase:** DRAFT · **Clock start:** 2026-10-10
**Clock:** 45–90 days (`GOVERNANCE.md` §3, changing the shared vocabulary) — **earliest decision: see `proposals/CALENDAR.md`, and no earlier than OTCS-0017** (this proposal uses its fields)

## The gap

Organizations already write down what they need: use cases, requirements, acceptance criteria. A security operations team has them. So does a public institution buying a service, or a company setting rules for its own agents. They are written in each organization's own words and kept in its own documents.

OTCS-0017 gives the commons a shared way to describe kinds of work and what must be able to refuse them. Nothing yet connects an organization's own requirements to that description. An organization that wants to ask "does this offer do the work my requirement needs, within the limits my requirement sets?" has no place to start.

## What this proposal adds

### 1. A requirement profile

A **requirement profile** is an organization's own use cases and requirements, with each requirement mapped to the work types it needs and the limits it sets on that work.

**A requirement is a duty, not a feature. Mapping a requirement to a work type is never permission to act.**

### 2. The shape

```yaml
requirement_profile:
  owner:                          # the organization, by its own name or a pseudonym it chooses
  version:                        # the profile's own version
  work_types_version:             # the version of Work Types it maps against (OTCS-0017 §6)
  use_cases:
    - id:                         # the organization's own identifier
      title:
      intent:                     # what must be true
      acceptance:                 # how the organization will judge the use case met
      requirements: []            # requirement identifiers
  requirements:
    - id:                         # the organization's own identifier
      type: functional | non_functional
      statement:
      acceptance:                 # how the organization will judge it met
      needs:                      # what the requirement demands of the work
        - work_type:              # an otcs-work identifier
          max_consequence_ceiling:      # the most the work may do for this requirement
          refusal_points:               # what must be able to refuse it, and how strongly
            - can_refuse:
              min_constructability:
          min_evidence_efficacy:
          max_unobserved_interval:      # optional: the longest the work may run unchecked for this requirement (OTCS-0010 §2)
          effect_verifier: []           # Actor values the organization requires; always includes human
```

- **Identifiers belong to the organization.** They are namespaced to the profile's owner. Two organizations' `UC-001` are different things and are never merged.
- **`needs` is written in OTCS-0017's fields, and adds to the work type.** The work type's own requirements always apply. A need can ask for a lower ceiling, more refusal points, a higher rung, stronger evidence or a shorter interval. It cannot ask for less, and what it leaves out falls back to the work type.
- **A requirement may need no work type.** Some requirements are about people, contracts or documents. They stay in the profile with an empty `needs`, and that is a complete entry.
- **One requirement can need several work types,** and one work type can serve several requirements.

### 3. Reading a profile against an offer

An organization can set an offer's instance declarations (OTCS-0017 §7) against its profile. For each need, the reading is:

| Reading | Meaning |
|---|---|
| `stated` | The offer declares the work type, and every limit the need sets |
| `not stated` | The offer is silent on the work type, or on one of the limits |
| `contradicted` | The offer declares something that breaks a limit: a higher ceiling, a weaker rung, a longer interval, or a failure posture that gives no assurance |

There are only these three readings. A need with most of its limits stated is `not stated`; a partial grade would become a score (`NON-GOALS.md` #2).

Two rules combine readings:

- **Across sources about the same need,** `contradicted` outranks `stated`, and `stated` outranks `not stated`. One source that breaks a limit outweighs any number that meet it.
- **Across the needs of one requirement,** the requirement reads as its weakest need. It is `stated` only when every need is `stated`.

An offer's instance declarations establish `offered` and nothing more (OTCS-0017 §7), so a reading of `stated` says what was declared, not what is deployed or authorized.

**The reading is the organization's own analysis.** OTCS does not produce it, store it, score it or compare offers by it.

### 4. Who holds a profile

- **The organization holds its profile.** Publishing it is optional, and a private profile is complete.
- An organization that publishes a profile does so at a location it controls, and, if it has a registry record, may point to it from there.
- The registry does not store organizations' profiles in this proposal. A registry index of published profiles, if one is wanted, is a separate proposal.
- **No requirement text leaves an organization unless it chooses to publish it.** The shape is shared; the content is the organization's.
- **A reading names the profile version and the Work Types version it used,** so it can be checked again after either changes.

### 5. A worked example

`example/requirement-profile.yaml`, beside this file, is a profile for a fictional security operations team: seven use cases and twelve requirements in generic terms, mapped to the parked draft work types (`proposals/OTCS-0017/drafts/`). Two of the twelve requirements need no work type, which shows that rule in use. The example maps against the draft work types as parked, and is updated when they are proposed. It illustrates the shape. It is not part of the pinned text, and it describes no real organization.

## What this proposal does not do

- It does not certify, rank, score or compare offers or organizations (`NON-GOALS.md` #1, #2, #4, #5, #15).
- It does not make any work allowed. A mapping is never permission to act.
- It does not hold organizations' profiles, contracts or requirement text (#6).
- It changes no meaning of any field it reuses from OTCS-0017.

## Dependencies and sequencing

- **OTCS-0017.** Profiles are written in its fields and point at its work types. This proposal is decided no earlier than OTCS-0017.
- **OTCS-0017 §7's instance declarations** are what a profile is read against. Their manifest field is a separate proposal; until it exists, a reading uses whatever an offer publishes in OTCS-0017's terms.

## Impact on existing records

None. No manifest or record changes.

## Alternatives considered

- **Map requirements to products.** Rejected: a product name is not a kind of work (OTCS-0017), and a product-keyed profile becomes a buyer's ranking.
- **Store profiles in the registry.** Rejected for now: requirements are often confidential, and the registry describes projects, not organizations' internal duties. An index of published profiles can be proposed later.
- **A shared catalog of standard requirements.** Rejected: requirements are each organization's own. A shared catalog would turn one organization's wording into everyone's obligation.
- **A partial reading grade.** Rejected: a grade becomes a score (`NON-GOALS.md` #2).
- **Let a profile ask for less than a work type requires.** Rejected: a work type's requirements are the floor. A profile can only add to them.

## Strongest objection (written by the author)

**Organizations will not publish their requirements, so the on-ramp will carry no traffic.** Requirements are commercially sensitive, and an organization gains little by exposing them.

**Answer.** Publishing is not the point; using the shape is. An organization can keep its profile private and still read offers against it, which is the value. The shape lets that private work use the same words every offer uses. A published profile is a bonus, and an organization that publishes one tells offers exactly what it will check. A private reading is real use, but it is not evidence the commons is used; only a published profile, or a published reading, counts under OTCS-0007.

## On decision — required cleanup

1. **If ratified:**
   - create `schemas/requirement-profile.schema.json` from §2;
   - create `REQUIREMENT-PROFILES.md` from §§1–4;
   - add a coherence check that `REQUIREMENT-PROFILES.md` matches §§1–4 of the ratified text;
   - move the worked example to `examples/requirement-profiles/` and validate it in CI.
2. **If rejected:** nothing to remove.

## Provenance

Designed by the founder. The use-case and requirement shape is generalized from a requirements-to-capability traceability practice used in operating models for security operations, with every organization-specific term removed.
