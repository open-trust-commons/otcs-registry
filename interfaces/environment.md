# Interface domain: Environment

*Status: EXPERIMENTAL capability domain — NOT a normative specification (docs/interface-model.md §2). Adding required semantics here is a proposal, not an edit.*

**Purpose.** What the world can currently support: the fourteen environmental dimensions (docs/coordinate-system.md §1.4). The primary coordinate.

**Wire format.** schemas/wire/signal.schema.json — SPECIFIED.

**Open questions.** Aggregation semantics (how multiple signals compose into one supportable-capacity estimate) are implementation-defined; whether a minimal composition contract is needed.

**Formalization trigger.** Two signal providers whose outputs a single consumer cannot combine without bilateral negotiation.
