# How decisions get made

*Version 0.1 · Status: EXPERIMENTAL · Built on the principle in [CHARTER.md](CHARTER.md) §4*

How decisions get made here, who can make them, and what stops a decision from counting.

Section numbers are fixed — other documents cite them — so they stay put even when the wording changes.

---

## 1. Roles

| Role | What it lets you do | How you get it |
|---|---|---|
| **Participant** | Speak, ask, object, submit evidence — **immediately** | Show up |
| **Proposal author** | Open and revise a proposal; permanently recorded as its author | Write one |
| **Proposal sponsor** | Carry a proposal through its stages and confirm each one | Earned by sustained engagement ([VOTING.md](VOTING.md) §4) |
| **Specification editor** | Edit the wording of one document between approved changes — **wording only, never meaning** | Appointed for that document by vote |
| **Implementation representative** | Cast a project's vote, with reasons, signed | Named in that project's own record |
| **Maintainer** | Merge approved changes. **Cannot skip a waiting period or a vote** | Depends on the stage ([CHARTER.md](CHARTER.md) §7) |
| **Security response** | Act immediately in an emergency (§8) | Named in [SECURITY.md](SECURITY.md) |

**Roles are jobs, not ranks.** A role decides what you may do. It never makes your vote count more than anyone else's — in version 0.1 every qualified vote counts exactly one.

## 2. How a proposal moves

```text
SEED → DISCOVERY → DRAFT → DELIBERATION → TRIAL → RATIFICATION → OPERATION → REVIEW → retired or renewed
```

| Stage | What happens |
|---|---|
| **SEED** | Anyone opens a proposal. No standing needed |
| **DISCOVERY** | The problem, what already exists, who it affects, the risks, the alternatives, what evidence is missing |
| **DRAFT** | A concrete change, published where anyone can read it |
| **DELIBERATION** | Objections and support. **Serious objections must be answered or carried into the record as unresolved** |
| **TRIAL** | Someone builds or simulates it. New connection points need **two independent implementations** first |
| **RATIFICATION** | A vote on one fixed version. Any real change during voting **restarts the vote** |
| **OPERATION** | It takes effect and is recorded |
| **REVIEW** | Every approved decision carries a date to be reviewed, renewed, or expire |

**Winning the vote is not the same as being decided.** Every decision carries a separate judgement on whether the process was sound — `VALID` or `HELD`, with reasons.

A proposal with 80% support is **HELD** if any of these were true:

- Projects it directly affects were absent
- A serious security objection was never resolved
- People were not properly notified
- The version being voted on changed mid-vote
- Nearly all participants came from one organisation

This is the principle in [CHARTER.md](CHARTER.md) §4 applied to the vote itself: a decision may only proceed while the conditions exist to make it properly.

## 3. How long things take

The bigger the change, the longer it must sit open.

| Kind of change | Minimum discussion |
|---|---|
| Typo or metadata fix | 24–72 hours |
| Updating a project's listing | 3–7 days |
| Clarifying something without changing it | 7–14 days |
| A new connection point | 21–30 days |
| Changing one that already exists | 30–45 days |
| Changing the rules themselves | 45–90 days |
| Changing the shared vocabulary | 45–90 days |
| Emergency security action | Immediate — **expires in 7 days** unless approved normally |

**This is a floor, not a target.** The clock runs from first publication, and nothing can be approved before it elapses.

## 4. Three votes, not one

| Vote | The question | Answers |
|---|---|---|
| **A — Readiness** | Is this well enough specified and evidenced to decide at all? | READY · NEEDS REVISION · INSUFFICIENT EVIDENCE |
| **B — Ratification** | Should this exact version become part of the shared system? | SUPPORT · SUPPORT WITH RESERVATION · OBJECT · ABSTAIN |
| **C — Will you build it?** | Will your project implement, test, or depend on this? | WILL IMPLEMENT · WILL TEST · MAY IMPLEMENT · WILL NOT IMPLEMENT · BREAKS WHAT WE HAVE · NOT APPLICABLE |

Vote A is not about whether you like it. INSUFFICIENT EVIDENCE sends it back to discussion.

**Vote C exists so that a hundred votes of support cannot approve something nobody intends to build.**

## 5. People and projects vote separately

Every proposal reports **two results**:

- **People** — qualified participants, one vote each
- **Projects** — signed by an authorised representative, with the project's reasons

One company with forty employees is forty voices and **one** project vote. Who works for whom is disclosed ([VOTING.md](VOTING.md) §7).

## 6. Protecting projects that already built on this

**A simple majority may not casually break something that already works.**

A breaking change requires all of:

- Notice
- A migration path
- A deprecation period
- Consultation with affected projects
- A compatibility analysis
- An explicit answer to every objection

A credible claim of severe breakage — Vote C, *BREAKS WHAT WE HAVE*, with evidence — forces **HOLD → TEST → REVISE**. It cannot simply be outvoted by people who bear none of the cost.

**Affected projects do not get an absolute veto. They get a guaranteed process.**

## 7. How specifications are made

**Patent positions must be disclosed.** A proposal for a new or changed connection point cannot move past DRAFT without its patent disclosure ([IPR-POLICY.md](IPR-POLICY.md)), and nothing becomes stable with an undisclosed patent position hanging over it.

**Building something first earns credit, not ownership.** The record keeps these apart:

- Who proposed it
- Who edits the text
- Who built it first
- Whose implementation is the reference
- Who else has built a conforming one
- Who built one independently

The first implementer is permanently recorded as such. The specification stays governed by this process. This is what stops: *build it first → own it in practice → shape it around one vendor.*

## 8. Emergencies

Security response may act immediately ([SECURITY.md](SECURITY.md)). Every emergency action must be:

- **Limited** to the incident
- **Recorded** in the log
- **Expiring** — 7 days, automatically, unless approved through the normal process
- **Explained** afterwards in public: who acted, what changed, why, for how long, on what evidence, and when it gets reviewed

## 9. Things decay, and the record has to show it

Every specification, connection point and listing carries a state:

```text
PROPOSED · EXPERIMENTAL · ACTIVE · STABLE · DEPRECATED · UNMAINTAINED · REVOKED · ARCHIVED · DISPUTED
```

**A registry that cannot show decline becomes a lie over time.** States are downgraded by the same process that raises them, with two exceptions: `REVOKED` (security, §8) and `UNMAINTAINED` (objective inactivity, applied automatically).

## 10. Disagreements

**A dispute is a new record. It is never an edit to history.**

It captures: what is at issue, who raised it, who is answering, evidence from both sides, and where it landed:

```text
VERIFIED · PARTIALLY VERIFIED · UNVERIFIED · CONTRADICTED · RELATIONSHIP DISPUTED · INSUFFICIENT EVIDENCE
```

This project rarely rules on who had an idea first. It preserves **specific, bounded facts** — a publication date, an exact phrase, a diagram, a repository history, a citation.

Appeals go to the next stage of governance ([CHARTER.md](CHARTER.md) §7).

## 11. Changing the shared vocabulary

Adding, removing or splitting parts of the vocabulary, changing what a term means, changing the evidence levels, or changing where one connection point ends and another begins — these change **how every listed project is described**, not just one.

They take the longest clock, plus four mandatory extras:

| Required | Why |
|---|---|
| **Migration notes** | How to move from old to new |
| **Impact analysis** | Which existing entries change meaning |
| **Compatibility mapping** | Old term → new term, explicitly |
| **A long deprecation period** | The old meaning keeps working while people move |

Per [CHARTER.md](CHARTER.md) §9, the version 0.1 vocabulary **expects** to be revised. Proposing a revision is the system working, not an attack on it.

## 12. Removing and refusing listings

| Action | What it means |
|---|---|
| `DECLINE` | A project refuses before any entry exists. Honoured, logged, no page created |
| `UNLIST` | A project withdraws its entry. The page goes; the history stays |
| `ARCHIVE` | Kept read-only; the project is inactive |
| `REVOKE_VERIFICATION` | Something previously verified fails re-examination. Both states remain visible |
| `DISPUTE_RECORD` | A maintainer contests an outside claim about their project (§10) |
| `TRANSFER_MAINTAINERSHIP` | Both parties sign off, or it goes to the dispute process |
| `REFUSE` | We may refuse or suspend a listing — see below |

Refusal is available **only** for: impersonation, bad-faith name collision, malicious content, or conduct violations. Each with stated grounds on the record, each appealable.

**Refusal is never available because we dislike a viewpoint, or because a project competes with a listed one.**

Settled: a project can always remove its own entry · history survives removal · two groups claiming one identity go to the dispute process with dated evidence · suspension preserves history.

## 13. Outside review before version 1.0

**Before anything is called stable, it gets reviewed by people who are not us.**

The group must not be made of KTP collaborators, and should include expertise in: open-source governance · security architecture · standards work · copyright and patent policy · data modelling · accessibility · privacy. Plus, specifically:

- **A project that disagrees with KTP**
- A commercial implementer
- A researcher
- A maintainer who has personally had credit for their work denied

**Reviews are published in full, including objections we could not resolve.**

Surviving informed disagreement is a stronger signal than enthusiastic adoption, and it is the only signal this project is allowed to claim.

## 14. No invisible governance

A claim, objection, agreement or decision carries **no weight at all** until it enters the public record ([COMMUNICATIONS.md](COMMUNICATIONS.md)).

Private coordination that later appears as *"the ecosystem agrees"* is the exact failure this project exists to prevent.
