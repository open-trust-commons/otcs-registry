# Objection 001 — one field cannot carry both the public's rights and the registry's operating permission

**Raised:** 2026-09-22, by Maksim Barziankou (MxBv, [`petronushowcore-mx`](https://github.com/petronushowcore-mx)), on this proposal's deliberation window ([#49](https://github.com/open-trust-commons/otcs-registry/issues/49#issuecomment-5783563935)). Filed under his own name. His position: support the direction; NEEDS REVISION on the fixed text.

**Objection**, in his words:

> My objection is narrow and architectural rather than a demand for legal certainty from an experimental commons. In the current text `entry_license` is asked to do two jobs at once:
>
> 1. state what rights the public receives in project-supplied entry content;
> 2. grant OTCS the operating permissions it needs to validate, store, publish, mirror, archive and derive registry views.
>
> Those are different rights surfaces. Under CC BY 4.0 or CC0 1.0 the public receives rights broader than the operating minimum the proposal describes. Under `all-rights-reserved` the registry needs a separate, narrow operating grant with a defined path through operator, host, mirrors, archives and any successor operator. One field cannot carry both relations without contradicting one of them, and as written the ratified text would leave the maintainers making new policy after the vote rather than before it.

**Answer (2026-09-25).** The finding is accepted. The full answer is on the record at [#49](https://github.com/open-trust-commons/otcs-registry/issues/49#issuecomment-5840854617). In summary:

- The four declarations proposed in [#67](https://github.com/open-trust-commons/otcs-registry/pull/67) are adopted as the direction for the final text: entry-content rights, registry operating permission, participation consent, and identification permission. Each is its own record; none is inferred from another.
- The operating permission is to be held by a named holder, Chris Perkins, as an individual. It is to be a lease: it ends at any change of operator and at the end of a term, unless renewed.
- Published material stays outside the lease. A lapse produces a caretaker state, never a deletion.

Three questions remain open on #49: whether the permission should also expire on a schedule when no successor is appointed; who confirms that a successor was validly appointed; and who acts as caretaker if a lease lapses.

**Status:** answered; the finding is accepted. Carried on the record until the amendment that adopts it is merged into `proposal.md`. That amendment is substantive under OTCS-0013 and restarts this proposal's clock from its merge.
