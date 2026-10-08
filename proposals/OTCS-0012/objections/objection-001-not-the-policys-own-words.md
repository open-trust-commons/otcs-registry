# Objection 001 — the policy is registered in words that are not its own

**Raised:** 2026-10-08, self-raised by the founder, on this proposal's deliberation window ([#59](https://github.com/open-trust-commons/otcs-registry/issues/59#issuecomment-6070264128)).

**Objection:**

> This proposal registers a policy in words that are not the policy's own.
>
> The record `otcs-ai-use` declares `decision_outputs: [ALLOW, SHAPE, VETO]`. The schema admits only `ALLOW · SHAPE · DEAUTOMATE · VETO`, which are one framework's outcomes. `AI-USE.md` does not decide in those terms. It permits uses, attaches conditions, and forbids some uses outright. Mapping that onto three of KTP's four words is a translation, and the record does not say it is one.
>
> A reader of the first policy record in this registry could take those three words as the policy's own. That is the kind of description this registry exists to refuse.

**Answer (2026-10-08).** On the record at [#59](https://github.com/open-trust-commons/otcs-registry/issues/59#issuecomment-6070266458). The objection is correct about the defect, and it is not a reason to reject the record:

- The proposal already names the finding and queues it as a candidate model revision: open `decision_outputs` to a project's own vocabulary with a `maps_to`, the way `custom_action` already works for verbs.
- Rejecting the record would hide the defect. Registering it keeps the defect visible in a real record until the schema is fixed.
- Until then, the record's `decision_outputs` are read as a mapping into the schema's words, not as the policy's own terms.

**Status:** answered; the finding is accepted. Carried on the record until a model revision addresses `decision_outputs`.
