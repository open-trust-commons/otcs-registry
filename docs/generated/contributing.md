!!! info "Generated page"
    Compiled from `CONTRIBUTING.md` by `npm run generate:docs`. Edit the source, not this file. The repository is the record; this page is a rendering of it.

# How to take part

*Version 0.1 · Status: EXPERIMENTAL*

Four things you can do here, in increasing order of consequence.

| I want to… | Where it goes | What it takes |
|---|---|---|
| **Ask a question, object, explore an idea** | Discussions | Nothing. Nothing there becomes canonical |
| **List my project** | A pull request adding `registry/projects/<id>/otcs.yaml` | Self-registration is the normal path — see [REGISTERING.md](registering.md) |
| **Assert a relationship with another project** | A pull request to `relationships.yaml` | Anything above `self_asserted` needs the other party's sign-off in the PR |
| **Change the shared system** | A proposal in `proposals/OTCS-NNNN/` | A clock scaled to how much it changes ([GOVERNANCE.md](governance.md) §3) |

---

## 1. Before you open a pull request

```bash
npm install
npm run validate     # schemas, semantic rules, id consistency, dangling edges
npm test             # ledger, generators, site
npm run coherence    # do the documents still agree with each other?
npm run build:site   # deterministic — same input, byte-identical output
```

**Continuous integration runs exactly these commands.** If they pass on your machine they pass there. Nothing that can block your merge is hidden from you.

## 2. Sign your commits off

```bash
git commit -s -m "your message"
```

That appends a `Signed-off-by:` line. What you are certifying is in [DCO.md](dco.md).

| | |
|---|---|
| Code and schemas | Apache-2.0 |
| Specification and documentation text | CC BY 4.0 |
| Material AI assistance | Disclosed — see [AI-USE.md](ai-use.md) |

**Sign-off is not the same as a cryptographic signature.** Verified signatures are required only for release tags, governance decisions, maintainer merges, interface adoptions and emergency actions.

## 3. What contributing does, and does not, do

**Does:** your contribution is recorded with your name, permanently. Rejected proposals stay visible as rejected — the record is never edited to remove them.

**Does not:**

- Transfer ownership of anything
- Make you a maintainer ([MAINTAINERS.md](maintainers.md) §4)
- Grant you governance authority

> Factual contribution, acceptance, canonical inclusion and authorship are **four separate things** ([GOVERNANCE.md](governance.md) §7). Collapsing them is how a project quietly acquires owners it never chose.

## 4. House rules that will come up in review

These are the ones reviewers cite most often. Each has a document behind it.

- **Absence is honest.** A missing coordinate means *does not address*. The validator never fills in a default — see [LAYERS.md](layers.md)
- **Claims carry their own evidence state**, never the project's — [EVIDENCE-MODEL.md](evidence-model.md) §2
- **Maturity is a profile, never one number** — [EVIDENCE-MODEL.md](evidence-model.md) §4b
- **`enforce` above zero needs a declared enforcement point.** Otherwise it is `decide`
- **Nothing may claim a compatibility rung it has not reached**

## 5. Conduct

Disagreement is the point of this registry. [CODE_OF_CONDUCT.md](code-of-conduct.md) governs how it is conducted, not whether it is allowed.

---

**See also:** [REGISTERING.md](registering.md) — the walk-through for listing a project · [PARTICIPATION.md](participation.md) — what being listed does and does not mean · [COMMUNICATIONS.md](communications.md) — which channel makes something count
