# Interface domain: Provenance

*Status: EXPERIMENTAL capability domain — NOT a normative specification (docs/interface-model.md §2). Adding required semantics here is a proposal, not an edit.*

**Purpose.** Lineage of artifacts, claims, and contributions: who made what, from what, when — the record-keeping that survives decomposition.

**Wire format.** governance-event + claim schemas cover OTCS's own provenance; no cross-project format in v0.1.

**Open questions.** Whether observer belongs inside provenance; alignment with existing primitives (PROV-O, git history, signed commits) rather than inventing new ones.

**Formalization trigger.** A registrant supplying machine-readable provenance for a non-OTCS artifact class.
