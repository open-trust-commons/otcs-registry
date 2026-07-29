# Interface domain: Identity

*Status: EXPERIMENTAL capability domain — NOT a normative specification (docs/interface-model.md §2). Adding required semantics here is a proposal, not an edit.*

**Purpose.** Who or what is acting, with continuity over time (docs/coordinate-system.md §2.1). Providers answer identity queries; consumers attach identity assertions to actions.

**Wire format.** None specified in v0.1.

**Open questions.** Whether identity and authority providers are separable in real deployments; how trajectory-based identity is exchanged without shipping raw history.

**Formalization trigger.** Two independent projects declaring provides:identity with incompatible assertion shapes.
