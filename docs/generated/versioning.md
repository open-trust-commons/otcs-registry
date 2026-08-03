!!! info "Generated page"
    Compiled from `VERSIONING.md` by `npm run generate:docs`. Edit the source, not this file. The repository is the record; this page is a rendering of it.

# What the version numbers mean

*Version 0.1 · Status: EXPERIMENTAL*

Ordinary Semantic Versioning. **Before `v1.0.0` the contract is explicitly unstable, and that instability is deliberate** — the version 0.1 model is a set of provisional hypotheses, stated as such in [CHARTER.md](charter.md) §9.

---

## 1. Before `v1.0.0`

**The public arc is `0.1` → `0.9` → `1.0`. `v0.1.0` is the first public release** ([ROADMAP.md](roadmap.md)).

Anything numbered below `v0.1.0` is incubation history from the private staging repository. It was never published, so **nothing below `v0.1.0` can have broken anyone's records** — which is why [MIGRATIONS.md](migrations.md) has no entry affecting a published record.

| Bump | What it means | Example |
|---|---|---|
| **Patch** `0.2.1` | Corrections that change no meaning and invalidate no existing data | Fixing validator messages |
| **Minor** `0.3.0` | New features or schema changes. **May break things**, always with a migration note | Adding the object-level contribution lifecycle |
| **Major** | Reserved. Nothing uses it until after `v1.0.0` | — |

## 2. Four things carry versions, independently

```text
release version          this repository's tag
manifest schema          otcs_version, in every project record
interface specification  per interface, once they stabilise
project record           each registrant's own versioning of their entry
```

Through `v0.x` the repository release coordinates all four.

**After `v1.0.0` they come apart.** A stable interface must not be forced to re-release because an unrelated part of the repository changed.

## 3. What is promised about compatibility

| | |
|---|---|
| **Before `v1.0.0`** | **Nothing is guaranteed.** Every breaking change ships with an entry in [MIGRATIONS.md](migrations.md) |
| **From `v1.0.0`** | The manifest, the relationship model, the evidence model and the proposal lifecycle are **stable within a major version** |

Breaking any of those after `v1.0.0` needs a major bump **and** a deprecation period ([DEPRECATION.md](deprecation.md), [GOVERNANCE.md](governance.md) §9).

## 4. A record keeps the meaning it was written under

Everything above versions the *artifact*. This versions the *meaning*, which is a separate promise and the one a registrant is actually relying on.

> **A record means what its coordinates meant under the `otcs_version` it declares. A later version of the vocabulary never reaches back and reinterprets it.**

Carrying `otcs_version` on every manifest is what makes this checkable, but the field alone does not settle it — a reader has to know that the field *governs*, not merely labels.

**The three rules that follow from it:**

| | |
|---|---|
| **Migration creates, never rewrites** | When a coordinate changes meaning, migration produces a new record or an explicit mapping between the old sense and the new one. It does not edit the prior record's semantic basis. The old record stays readable under the old meaning |
| **Renders declare their basis** | Any view that displays records written under different versions says which version each was written under. Silently rendering a `v1` record through `v2` vocabulary is a misquotation, even when every field validates |
| **A changed meaning is a breaking change** | Renaming a coordinate value is obvious. *Keeping the name and changing what it denotes* is worse, because nothing fails. It takes the same major bump, the same deprecation period, and a [MIGRATIONS.md](migrations.md) entry stating both senses |

**This has already happened once.** `commit` → `commit_point` and `repair` → `repair_window` were genuine changes of meaning ([CHANGELOG.md](changelog.md), `v0.1.0`). They were harmless only because they landed before any record existed to be reinterpreted. That accident of timing is not a policy, and it does not repeat.

The seam was named in architectural review by Richard Lynes (Genesis AiX): version identity alone does not settle interpretation.

---

**See also:** [RELEASE-PROCESS.md](release-process.md) — how a version actually ships · [MIGRATIONS.md](migrations.md) — every breaking change, with steps · [VERSION-EXIT-CRITERIA.md](version-exit-criteria.md) — what has to be true before a major version
