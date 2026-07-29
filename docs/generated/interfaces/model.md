!!! info "Generated page"
    Compiled from `docs/interface-model.md` by `npm run generate:docs`. Edit the source, not this file. The repository is the record; this page is a rendering of it.

# The OTCS Interface Model

*Version 0.1 · Status: EXPERIMENTAL · Per CHARTER.md §9, everything here is a provisional hypothesis to be tested by external mappings.*

## 1. Specifications vs implementations

Two record types, never conflated:

- **Specifications** define interfaces, semantics, invariants, and expected behavior. They are governed by the proposal process; nobody owns them.
- **Implementations** are concrete projects that satisfy one or more specifications. They are owned by their maintainers.

The roles the record distinguishes: *proposal author · specification editor · first implementation · reference implementation · conforming implementation · independent implementation.* First-come-first-served applies to **implementation priority only**: the first implementer is permanently recorded as such, and acquires no control over the interface (GOVERNANCE.md §7).

## 2. What is actually specified in v0.1

| Layer | Status |
|---|---|
| Project manifest (`schemas/project-manifest.schema.json`) | **Specified** — full schema + semantic rules |
| Signal wire format (`schemas/wire/signal.schema.json`) | **Specified** |
| Decision wire format (`schemas/wire/decision.schema.json`) | **Specified** |
| Receipt wire format (`schemas/wire/receipt.schema.json`) | **Specified** |
| The ten interface domains (`interfaces/`) | **Named capability domains only** — minimal metadata, no required semantics |

The ten interface files below the line are deliberately thin. They exist so manifests have a stable vocabulary for `interfaces.provides / consumes`, and so the record can accumulate evidence about which domains deserve formalization. **They must not become normative by accretion:** adding required semantics to any of them is a `new_interface` or `model_revision` proposal, not an edit. The first serious external registrants are expected to tell us which of these boundaries are wrong — Context and Environment may not be separable in practice; Observer may belong inside Provenance; Repair may need to split; Authority may need mandate, delegation, standing, and revocation separated. That feedback is the point.

## 3. The compatibility ladder

The word "compatible" is not used bare, anywhere. A project's relationship to an interface is exactly one rung:

```text
CLAIMS_TO_IMPLEMENT       the manifest says so (self-asserted)
MANIFEST_VALIDATED        the manifest passes schema + semantic validation
REFERENCE_IMPLEMENTATION  recorded by the proposal process as the reference for a specified interface
CONFORMANCE_TESTED        passes a published conformance suite (none exist in v0.1 — this rung is currently unreachable, and saying so is the honesty)
INDEPENDENTLY_VERIFIED    conformance confirmed by a party meeting the strict independence definition (EVIDENCE-MODEL.md §3)
```

One checkmark never stands for all of these. Capability-matrix renderings carry the rung, not a boolean.

## 4. Versioned compatibility declarations

Projects declare against versions (`OTCS 0.1`, `signal 0.1`), so interoperability is measurable and breakage is attributable. Interface lifecycle states follow GOVERNANCE.md §9 (`PROPOSED → EXPERIMENTAL → ACTIVE → STABLE → DEPRECATED …`); everything in v0.1 is EXPERIMENTAL.

## 5. The ten capability domains (v0.1 hypothesis set)

`identity · authority · context · environment · policy · decision · receipt · repair · observer · provenance` — one stub file each in `interfaces/`, format: purpose, wire format if any, open questions, formalization trigger.
