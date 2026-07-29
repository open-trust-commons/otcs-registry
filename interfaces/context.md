# Interface domain: Context

*Status: EXPERIMENTAL capability domain — NOT a normative specification (docs/interface-model.md §2). Adding required semantics here is a proposal, not an edit.*

**Purpose.** The action-local situation: parameters, target, session, intended trajectory. Distinct-by-hypothesis from environment (world-state).

**Wire format.** Carried inside action references; no standalone format in v0.1.

**Open questions.** Whether context and environment are separable in practice — flagged as a likely casualty of external mapping (docs/interface-model.md §2).

**Formalization trigger.** A registrant whose signals cannot be classified as either context or environment without arbitrariness.
