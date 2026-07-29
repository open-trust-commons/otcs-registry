# OTCS-0002 — Contributed-object lifecycle, artifact typing, synthesis-map legend, claim evidence classes

*Version 2 (2026-07-26): motivating case verified at document level — the receiving version's primary artifact was examined, confirming the contributed formalism was canonical-in-that-version with locked terminology and a QA attribution gate, while remaining diagnostic-only (no runtime dependency). v2 adds per-version canonical status, de-coupling verification fields, and Revision 5 (evidence anchoring).*

*Class: `model_revision` (GOVERNANCE.md §11) — this changes the relationship vocabulary and adds normative vocabularies, so it alters how every project is described. Clock: 45–90 days from 2026-07-26; earliest decision 2026-09-09. Per CHARTER.md §9, this is exactly the kind of revision the v0.1 model expected: an external mapping broke the current boundaries.*

## Motivation — a field observation

In July 2026 a public provenance dispute unfolded between two interoperating agentic-governance frameworks. The documented lifecycle: one framework's author publicly identified the other's work as a **candidate module**; incorporated a formalism as an explicitly **attributed component**; later described the relationship in **categorical terms** ("no primitives imported") that his own earlier posts contradicted; the contributor published a chronology; the parties negotiated a **prospective removal** of the named objects while agreeing historical artifacts stay unchanged.

The verdict that matters for OTCS: **neither party lied at any single step, and the conflict was still structural** — they never shared a state model for what happened to a contributed object. The same object was simultaneously describable as external, interface-scoped, canonical, non-integrated, load-bearing, removable, and historically preserved. Every description was locally defensible.

OTCS v0.1's relationship vocabulary (`BUILDS_ON`, `CONCEPTUALLY_OVERLAPS`, …) cannot represent this. Five revisions follow, each addressing a failure the case (and its surrounding discourse) exhibited.

## Revision 1 — contributed-object lifecycle

A new record type: the **contributed object** — a specific formalism, mechanism, or artifact that moves from one project into another. Relationship edges name *that projects relate*; contributed-object records name *what moved, when, and what state it is in now*.

Lifecycle (sequential):

```text
OBSERVED → PROPOSED → CANDIDATE_MODULE → ATTRIBUTED_INTERFACE
→ INCORPORATED → ACTIVE → REMOVAL_REQUESTED → SUPERSEDED | DECOUPLED → ARCHIVED
```

`DISPUTED` is **orthogonal** — a flag any state can carry, never a deletion.

Record fields (extends the relationship schema):

```yaml
contributed_object:        # what moved (named formalism / mechanism / artifact)
scope:                     # interface-scoped | component | architectural
source_artifact:           # + source_version
receiving_artifact:        # + receiving_version
effective_from:            # when it entered
effective_to:              # when it left (if it did)
canonical_in_version: []   # versions in which the object was canonical (per-version, not global —
                           #  "canonical in v0.2.2" and "absent from current canon" are both true)
whole_architecture_derivation: false   # explicit denial-of-scope field, so neither party
runtime_control_dependency:            #  can flatten the record into a slogan later
                           # none | diagnostic_only | load_bearing | disputed
attribution_required:      # terms under which it entered
withdrawal_terms:          # what removal requires, agreed at entry
historical_record_policy:  # what happens to old documents (default: preserved, annotated)
mutual_confirmation:       # both parties signed off on this record's content
disputes: []               # dispute records, never edits
replacement_artifact:      # what re-implements the capability after DECOUPLED
decoupling_verified:       # has the replacement been OBSERVED in later artifacts (not just promised)
active_cleanup_verified:   # have later active documents been checked for retained objects
addendum_status:           # promised | published(date, hash) | not_located
```

The three-way distinction the case's parties had to discover through public conflict, made explicit before integration begins:

> **Historical artifact remains attributed ≠ object remains in active canon ≠ future implementation depends on it.**

## Revision 2 — artifact typing

Registry records and any comparison view MUST type artifacts before comparing them:

```text
LAW · TREATY · STANDARD · MANAGEMENT_SYSTEM · RISK_FRAMEWORK · GUIDANCE
· PRINCIPLE · ACADEMIC_MODEL · PRODUCT · DOCTRINE · IMPLEMENTATION
```

Motivation: the field's circulating "framework landscapes" place binding regulation, treaties, certifiable management standards, voluntary guidance, and academic models in one artifact class. An untyped list produces false comparability — and false coverage claims when artifacts with conflicting definitions are "stacked."

## Revision 3 — synthesis-map relationship legend

Any synthesis, map, or architecture graphic entering the registry (or produced from it) MUST carry per-relationship states:

```text
AUTHOR_CONFIRMED · MUTUALLY_CONFIRMED · SELF_ASSERTED
· MAPPER_INFERENCE · SEMANTIC_OVERLAP · DISPUTED · UNKNOWN
```

Motivation: a diagram's layout silently asserts relationships (A above B, C inside D, these authors agree) that no source authorized. Media provenance credentials authenticate the file, not the intellectual relationships drawn inside it. Visual proximity must not become accidental authorship. This extends EVIDENCE-MODEL.md's three-strata separation to visual artifacts.

## Revision 4 — claim evidence classes

Claims about system behavior carry a **claim kind**, because the field routinely slides between them:

```text
OBSERVABILITY_CLAIM      (we can see it)
CONTROL_EFFECT_CLAIM     (our control changed observable behavior)
AUTHORIZATION_CLAIM      (the action was within authority)
SAFETY_CLAIM             (the action was safe)
IMPACT_SEVERITY_CLAIM    (realized harm was of magnitude X)
RISK_CLAIM               (likelihood × exposure × control strength, forward-looking)
VALIDATION_CLAIM         (an independent party confirmed one of the above)
```

Motivation: observed in the field within one month — telemetry shifts presented as governance ("a token shift is not proof of safety"), impact-severity tables read as risk models ("a severity scale is not a risk calculation"), and product insertions positioned as validation. Each slide is a category error the schema can refuse.

## Revision 5 — evidence anchoring

Any record that cites an external artifact as evidence MUST anchor it immutably:

```yaml
artifact_hash:             # content hash of the artifact itself
manifest:                  # versioned manifest listing all artifacts in the evidence set
manifest_hash:             # hash of the manifest, so the SET is tamper-evident, not just members
archive_url:               # immutable archive (e.g. web archive snapshot, DOI) — never only a live URL
superseded_versions: []    # preserved, never deleted
```

Motivation: in the motivating case, the party who published an "evidence viewer" — with content hashes and a correction-review standard, done in evident good faith — later repurposed the live URL for a different project. The advertised evidence anchor now serves unrelated content. **A mutable web application cannot anchor evidence**, regardless of intent: hashes published *inside* a mutable page authenticate nothing once the page changes. This aligns the registry's citation practice with its own ledger discipline (SECURITY.md §2: artifacts referenced by hash, not only by URL) and extends it to evidence *sets*.

## Impact analysis

- `relationship.schema.json`: gains optional contributed-object fields (Revision 1) — **non-breaking**, existing records remain valid.
- `project-manifest.schema.json` / claims: gains optional `artifact_type` and `claim_kind` enums (Revisions 2, 4) — **non-breaking**.
- Synthesis-map legend (Revision 3): normative for registry-produced artifacts; advisory for external ones.
- No existing record changes meaning; migration is additive. Compatibility mapping: none required (no term is renamed or removed).

## Trial requirement

Before RATIFICATION, at least one worked example: a contributed-object record for a real or realistic case exercising every lifecycle state through `DECOUPLED`, including a dispute flag and a `historical_record_policy` resolution.
