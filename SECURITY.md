# Security

*Version 0.1 · Status: EXPERIMENTAL*

**A registry of trust systems is itself worth attacking. Whoever corrupts the record corrupts every decision made from it.**

So the threats are named here, the defences are published, and the gaps are admitted. If you can build an attack these controls miss, that is the point — tell us (§5).

---

## 1. What we expect people to try

**Attacks on the record**

- Pretending to be a project's maintainer
- Submitting an entry that is misleading or malicious
- Faking history — backdated claims, invented citations
- Overstating compatibility or how well established something is
- Squatting on a project's name, or on a term
- Poisoning a shared definition
- Fake "independent" evaluations from an evaluator the project controls

**Attacks on the supply chain**

- Compromising a reference implementation
- Weaponising a dependency update
- Swapping an artifact between review and merge

**Attacks on governance**

- Fake accounts voting
- Splitting one project into several to simulate adoption
- Rings of projects validating each other
- Rings of projects citing each other
- Passing a trivial test and calling it compatibility
- Capturing an editor or maintainer role
- Using emergency powers as a shortcut

**Attacks by leaving**

- A departing maintainer holding records hostage
- Deleting unflattering history

## 2. What stops them

| Against | Control |
|---|---|
| Impersonation | Maintainer keys and named people listed in each entry. Changing them is a proposal, not an edit |
| Tampering | An append-only log where each entry is chained to the one before, plus content hashes on referenced files |
| Rewriting the past | Disputes and corrections are **new records**. History is never edited. `RETRACTED` is a state, not a deletion |
| Artifact substitution | Signed commits and tagged releases; entries reference files by hash, not only by address |
| Fake ownership | The canonical location and the maintainer key must agree. If they do not, the entry is flagged |
| Fake independence | Disclosed relationships — shared maintainers, funding, codebase. An affiliated evaluation **cannot** be `INDEPENDENTLY_TESTED` ([EVIDENCE-MODEL.md](EVIDENCE-MODEL.md) §3) |
| Fake accounts | One verified human per individual vote; project votes signed by a named representative ([VOTING.md](VOTING.md) §7) |
| Name squatting | First registration is recorded, not owned. Collisions go to the dispute process on dated evidence |
| Emergency abuse | Emergency actions are scoped, logged, and **expire in 7 days** unless approved normally ([GOVERNANCE.md](GOVERNANCE.md) §8) |
| Compromise | A `REVOKED` state. Revocation **adds a marked cut** to the record; it never rewrites it |

**GitHub is where we collaborate. It is not the trust model.**

The trust model is: signed identities, a chained log, evidence levels, disclosed relationships, and a dispute process. Any of those can be moved elsewhere.

## 3. What this does not defend against

The honest limits at version 0.1. **This section matters more than the one above it.**

### The log proves less than people assume

It provides **tamper-evident sequence integrity**. Never "immutable evidence."

It proves that committed records form a consistent sequence and that none was altered afterwards. On its own it **cannot** prove:

- That events left out never happened
- That the timestamps are true
- That whoever wrote an entry had the authority to
- That the history was not rewritten before it was ever published
- That what an entry says is factually correct

Each of those needs the surrounding controls — signed identities, outside timestamps, disclosure rules — and **some of them are still open.** A maintainer compromised between two commits is detectable afterwards, not preventable.

### Identity is weak

Version 0.1 identity is declared keys and named people. Adequate at this scale, **insufficient against a determined adversary running fake accounts.** Strengthening it is a designated version 0.2 proposal.

### Deep collusion survives

A structure built to look clean on every individual check can defeat checking things individually. Disclosed relationships raise the cost. **They do not close the hole.** Analysing groups rather than pairs is future work.

### Anything that never enters the record

We record what enters the record. Private coordination that never surfaces is out of scope. The mitigation is that such coordination carries **no formal weight** ([GOVERNANCE.md](GOVERNANCE.md) §14) — not that we can see it.

## 4. Who responds

| Stage | Who |
|---|---|
| **Now** ([CHARTER.md](CHARTER.md) §7 Stage 1) | The founder, bound by the emergency rules in §2 |
| **From Stage 2** | A designated group of at least two, with **no single organisation holding a majority** |

## 5. Reporting something

Found a vulnerability in the protocol, the formats, the tooling, or the governance mechanics? Use the private channel ([COMMUNICATIONS.md](COMMUNICATIONS.md) §6).

Reports are acknowledged in the log **after** remediation, with an appropriately redacted public record.

**An attack on the model is as valuable as an attack on the code.** If you have found a way to game these rules — a strategy the controls in §2 do not catch — that is a security report, and it goes to the same place.
