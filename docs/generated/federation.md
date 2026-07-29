!!! info "Generated page"
    Compiled from `FEDERATION.md` by `npm run generate:docs`. Edit the source, not this file. The repository is the record; this page is a rendering of it.

# Not being trapped in one place

*Version 0.1 · Status: EXPERIMENTAL · Designed now, implemented later, so the schema never quietly assumes there is only one registry*

---

## 1. The commitment

> **This registry must never be trapped inside one GitHub organisation, one host, or one instance.**

- Every record is exportable
- Every identifier is stable and does not name an instance
- **Nothing in the schema may assume only one registry exists**

## 2. What a second instance has to be able to do

- Mirror records from another instance
- Import records
- Keep **local annotations that stay local**
- Share stable identifiers across instances
- **Hold conflicting observations without either instance overwriting the other**
- Preserve provenance across the boundary, including which instance asserted what

## 3. What that already forces today

| Decision | Why it was made this way |
|---|---|
| Identifiers are URNs, not URLs ([IDENTIFIERS.md](identifiers.md)) | An identifier survives a change of host |
| Records are plain YAML with JSON Schema contracts | Readable without any of this project's tooling |
| The log is JSONL with a documented canonicalisation rule | Verifiable by anyone, with anything |
| **Nothing requires an interface to read** | A copy of the repository is a working copy of the registry |

## 4. When two instances disagree

When two instances hold different observations of the same subject, **both persist, each attributed to the instance that asserted it.**

> **No merge algorithm silently picks a winner.** That would be exactly the authority compression the evidence model refuses everywhere else ([EVIDENCE-MODEL.md](evidence-model.md) §1).

A reader sees the divergence and where each side came from.

*This model is designed and not implemented. No version is attached to it.*

## 5. When to split the repository

At roughly **1,000 records** a single repository becomes operationally uncomfortable. The split would lift the specification into `otcs-spec` and the site into `otcs-site`, **leaving the records where they already are.**

> **Do not split before operational pressure justifies it.** Splitting early buys permission complexity, release complexity and cross-version complexity, and delivers no meaningful decentralisation in return.

---

**See also:** [IDENTIFIERS.md](identifiers.md) — why identifiers are host-independent · [HOSTING-AND-MIRRORS.md](hosting-and-mirrors.md) — the same idea at the level of one instance · [SYNC-POLICY.md](sync-policy.md) — synchronisation inside a single instance
