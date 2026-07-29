# Interface domain: Decision

*Status: EXPERIMENTAL capability domain — NOT a normative specification (docs/interface-model.md §2). Adding required semantics here is a proposal, not an edit.*

**Purpose.** The evaluated outcome for a proposed action: ALLOW / SHAPE / DEAUTOMATE / VETO, with constraints and reasons.

**Wire format.** schemas/wire/decision.schema.json — SPECIFIED.

**Open questions.** Whether decision and enforcement can be modeled independently for systems where the decider IS the enforcement point.

**Formalization trigger.** An implementer whose gateway cannot emit the decision object without also executing it.
