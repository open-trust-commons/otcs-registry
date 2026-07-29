!!! info "Generated page"
    Compiled from `IPR-POLICY.md` by `npm run generate:docs`. Edit the source, not this file. The repository is the record; this page is a rendering of it.

# Patents

*Version 0.1 · Status: EXPERIMENTAL*

Apache-2.0 and CC BY 4.0 handle **copyright**. Neither is a patent policy, and a commons that builds shared interfaces needs one.

---

## 1. The trap this closes

```text
a contributor proposes an interface
   → others implement it
      → the interface becomes important
         → the contributor asserts patent rights
```

**An interface commons that does not ask about patents before adoption hands that sequence a loaded weapon.**

## 2. Every interface proposal discloses

1. **Known relevant patents and applications** — issued, pending or provisional, held by the submitter or known to them
2. **Employer or assignee rights** — who else may hold rights in the material
3. **Licensing restrictions** on the contributed material
4. **A royalty-free implementation commitment** for the accepted interface — **or an explicit statement that none is offered**, published with the proposal
5. **Authority to contribute** — confirmation the submitter is entitled to contribute it

> **"I am not aware of any" is a perfectly good answer. Silence is not.** A proposal without a disclosure section is incomplete and cannot advance past DRAFT ([GOVERNANCE.md](governance.md) §7).

## 3. The gating rule

> **No interface becomes `STABLE` until its known patent position is disclosed.**

`EXPERIMENTAL` and `ACTIVE` interfaces may carry an undisclosed or unresolved position — **provided the gap is visible on the interface's own page.** Implementers are entitled to know what they are building on.

## 4. A claim discovered later

It does **not** retroactively invalidate implementations, and this project makes no infringement determinations ([NON-GOALS.md](non-goals.md)).

What happens instead:

- The claim is recorded against the interface
- The interface's status is reviewed
- A model-revision proposal may narrow, replace or deprecate it
- Implementers are notified through the announcement channel ([COMMUNICATIONS.md](communications.md) §4)

Withdrawal follows the deprecation path ([DEPRECATION.md](deprecation.md) §2) — **never a silent removal.**

## 5. What this project does not do

- Verify that a patent is valid
- Perform freedom-to-operate analysis
- Determine infringement
- Provide legal advice
- Maintain a patent registry

**It records disclosures and makes their absence visible.** Implementers remain responsible for their own analysis.

---

**See also:** [GOVERNANCE.md](governance.md) §7 — where disclosure gates the proposal · [DEPRECATION.md](deprecation.md) — retiring an interface that becomes encumbered · [TRADEMARKS.md](trademarks.md) — names and marks, a separate question
