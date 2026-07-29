!!! info "Generated page"
    Compiled from `PREMORTEM.md` by `npm run generate:docs`. Edit the source, not this file. The repository is the record; this page is a rendering of it.

# How this fails, and when to stop

*Version 0.1 · Status: EXPERIMENTAL · Written at the start, while it is still cheap to be honest*

**Narrowing or stopping under these conditions is responsible governance. It is not failure.**

---

## 1. The ways this could go wrong

| Failure | What it looks like | What is meant to prevent it |
|---|---|---|
| **Nobody maintains manifests** | Records go stale; the registry describes a field that has moved on, invisibly | Freshness is a visible field; project-hosted manifests make currency the project's own concern ([SYNC-POLICY.md](sync-policy.md) §2) |
| **The coordinates fail on real projects** | Nothing can be located in them without arbitrariness — the failure [CHARTER.md](charter.md) §9 explicitly anticipates | Model-revision proposals exist for exactly this. **The first outside registrants are expected to break boundaries** |
| **It becomes a vanity directory** | Listings accumulate, nothing is evidenced, registration becomes a badge | Evidence states, the unreachable conformance rung, honest zeros. **If those are ever softened, this failure has already happened** |
| **Provenance becomes a weapon** | It turns into a venue for reputational war rather than a record | Disputes are records, not verdicts; [ACCEPTABLE-USE.md](acceptable-use.md) §1 names weaponised provenance claims |
| **Maintainers become judges** | People treat classifications as rulings | [NON-GOALS.md](non-goals.md); refusal to arbitrate derivation; appeals that escalate rather than terminate |
| **Scores cause disputes** | — | Numerical project comparison is deferred entirely. Categorical only ([ALGORITHM-REGISTRY.md](algorithm-registry.md) §5) |
| **Commercial capture** | One vendor class dominates governance or funding | [SUSTAINABILITY.md](sustainability.md); separate project and individual ballots; disclosed affiliations |
| **Security burden exceeds capacity** | One maintainer cannot run a credible security process for a target this attractive | Narrow scope, no runtime surface, static artifacts, private reporting. **If this fails, narrowing scope is the correct response** |
| **No independent implementations appear** | The interfaces are unbuildable or uninteresting | **This is the strongest signal that the model is wrong rather than early** |
| **It becomes another source of jargon** | — | The outcome most fatal to its purpose, and **the hardest to notice from inside** |

## 2. Kill and pivot criteria

Evaluated **12 months after the first public release**, in the open:

```text
fewer than 3 external self-registrations
no independently maintained implementation of any interface
no evidence that anyone uses the data to make a decision
unmanageable legal or moderation burden
```

| Met | Then |
|---|---|
| **Any two** | **Narrow.** Cut scope to the smallest thing that works — most likely the coordinate vocabulary as a published instrument, with no registry at all |
| **Three or more** | **Stop.** Archive the record with a written account of what was learned, keep the artifacts permanently available, and say plainly that it did not work |

> **Stopping cleanly, with the record preserved and the reasoning public, is a better outcome for the field than a registry that persists as an empty authority.**

---

**See also:** [CHARTER.md](charter.md) §12 — the same question asked constitutionally · [NON-GOALS.md](non-goals.md) — the refusals that keep several of these from arriving · [ROADMAP.md](roadmap.md) — what would have to go right instead
