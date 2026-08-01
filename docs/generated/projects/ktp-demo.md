!!! info "Generated page"
    Compiled from `registry/projects/ktp-demo/project.yaml` by `npm run generate:docs`. Edit the source, not this file. The repository is the record; this page is a rendering of it.

# KTP Environmental Demo

!!! warning "Record state: `registered`"
    The owner submitted this record. OTCS has not verified that the software does what the record says.

| Field | Value |
|---|---|
| Identifier | `ktp-demo` |
| Status | prototype |
| Type | — |
| Lifecycle | — |
| Canonical artifact | **none published** |
| Licence | — |
| Owner verification | `repository_control_confirmed` |
| First public | 2026-07-24 |

## In its own words

Runnable behavior demonstration of the KTP loop: identical actor, credential, action, and policy across four environments, with verdicts moved only by the environment and by accumulated trajectory cost (the sleeper scenario).



**Known limitations, as stated by the project:** Behavior demo, not production enforcement: tamper-evident rather than tamper-proof; hand-set estimator weights published for attack; DEAUTOMATE not implemented in this demo; single-agent only; not yet published.


## Coordinates — the registry's projection, not the project's identity

The section above is the project's voice. What follows is where OTCS locates it in the
shared vocabulary — a projection the owner may dispute without losing anything
(the `mapping` block records exactly that).

- **actor** — `ai_agent`, `service`
- **authority** — `capability`, `situational_approval`
- **action** — _not addressed_
- **environment** — `system_health`, `data_quality`, `identity_confidence`, `dependency_health`, `threat_pressure`, `uncertainty`, `cumulative_trajectory`
- **function** — _not addressed_
- **time** — `initiation`, `during_action`, `across_trajectory`

An empty coordinate means the project **does not address** it. It is not a gap, a deficiency,
or a lower score — several successful systems address exactly one coordinate deliberately.

## Interfaces

- **Provides:** `environment`, `decision`, `receipt`
- **Consumes:** _none declared_

Declared, not tested. No conformance suite exists yet, so no claim on this page rests on one.
