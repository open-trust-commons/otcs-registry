# Interface domain: Authority

*Status: EXPERIMENTAL capability domain — NOT a normative specification (docs/interface-model.md §2). Adding required semantics here is a proposal, not an edit.*

**Purpose.** What makes a specific action legitimate now: credential, role, capability, mandate, delegation, consent (docs/coordinate-system.md §2.2).

**Wire format.** Referenced by decision.authority_reference; no standalone format in v0.1.

**Open questions.** Whether mandate, delegation, standing, and revocation need to be separated into distinct interfaces — early external feedback suggests they might.

**Formalization trigger.** The first project that provides mandate-freshness signals distinct from credential verification.
