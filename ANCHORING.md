# Proving when something was written

*Version 0.1 · Status: EXPERIMENTAL*

**This registry cannot honestly timestamp itself.** Anchoring borrows witnesses that nobody here controls.

No cryptocurrency is held, solicited, endorsed or transacted at any point in what follows.

---

## The requirement is not Bitcoin

It is a party this project **cannot influence**, keeping a public record, durable for decades, at no ongoing cost.

Bitcoin satisfies that. So do other things, and **two are registered** — because a single witness is a single point of dependence, which is precisely the shape of problem this registry exists to make visible.

| Witness | What holds the record | Confirms | Fails when |
|---|---|---|---|
| **`opentimestamps`** | Bitcoin — proof-of-work, no operator | Hours. Batched into a block | Calendar servers disappear before a block commits |
| **`rekor`** | A sigstore transparency log — operated, append-only Merkle tree | Immediately, on inclusion | Its operator stops running the log |

**They fail differently on purpose.** If Bitcoin's calendars vanish, Rekor is unaffected. If sigstore's operator stops, Bitcoin is unaffected. Neither shares a failure domain with the other, or with this project.

> **That independence is the property being bought — not the technology.** Bitcoin is one instance of the requirement, and this document is named after the requirement.

Bitcoin has a second, unrelated job here as a calibration case ([CALIBRATION.md](CALIBRATION.md)). The two share a subject and nothing else; you can reject either without touching the other.

## 1. The problem

The governance log gives **tamper-evident sequence integrity** ([SECURITY.md](SECURITY.md) §3). It cannot prove *when* an entry was written.

- Git timestamps are set by whoever authored the commit
- GitHub's records are GitHub's
- A repository can be rewritten before anyone ever sees it

**Every timestamp in this system is asserted by a party with an interest in it.**

The evidence model already says an attester sharing the failure domain of what it attests is not independent ([EVIDENCE-MODEL.md](EVIDENCE-MODEL.md) §3). Applied to this project, that rules out timestamping itself.

A hash committed into the Bitcoin blockchain gets a time **no participant here controls** — not the founder, not GitHub, not any future registry operator.

## 2. What gets anchored

| Artifact | When | What it establishes |
|---|---|---|
| The governance log | Every release, and monthly | The sequence existed then — not merely that it is internally consistent |
| The release manifest | Every release | The set of artifacts was fixed at a provable moment |
| The registry snapshot | Every release | A project's record on a given date becomes independently datable |
| Published analyses | On publication | An analysis cannot be quietly backdated |
| Provenance-relevant records | On request | For disputes, the strongest date evidence available |

## 3. How it works

A round writes **one immutable manifest** listing the hash of every anchored artifact, then submits that manifest to every registered witness.

**The manifest is submitted, not the artifacts.** The ledger grows, so a proof bound to the ledger's bytes would be void by the next event. A manifest never changes after it is written, so its proof stays verifiable forever.

```bash
npm run anchor            # new round, then submit to every available witness
npm run anchor:stamp      # submit outstanding manifests
npm run anchor:verify     # re-check every witness; promotes SUBMITTED to CONFIRMED
npm run anchor:status     # per-witness state for every round
```

| | |
|---|---|
| **OpenTimestamps** | The hash joins a tree; one root is committed to Bitcoin; a small `.ots` proof verifies against the chain |
| **Rekor** | The manifest is **signed with the key in [MAINTAINERS.md](MAINTAINERS.md) §1**, and the signature is recorded in a public append-only log — so the entry says *who* submitted *what digest*, and when the log saw it |

- **No coin is spent by this project. No wallet, no account, no ongoing cost**
- Proofs live in `governance-log/anchors/` and in each release's artifacts
- **A witness client missing is reported, never routed around**

> **Nobody needs this project's tooling to check this project's timestamps.** Both proof formats verify with their own reference clients. That is the entire point.

## 4. Three states, and only one of them is a timestamp

```text
ANCHOR_PENDING     the digest is fixed. Nothing has been submitted anywhere
ANCHOR_SUBMITTED   calendar servers hold the hash. NO Bitcoin block commits it yet
ANCHOR_CONFIRMED   a Bitcoin block commits it. This is the only state that
                   proves the bytes existed by a given time
```

```bash
npm run anchor:status      # which state each manifest is in
npm run anchor:verify      # re-check; promotes SUBMITTED to CONFIRMED once a block lands
```

> **`ANCHOR_SUBMITTED` must never be described as anchored, timestamped, or proven.**

Submission means a calendar server accepted a hash and intends to include it in a future block. That intention is not evidence. Confirmation typically takes hours, because OpenTimestamps batches many hashes into one commitment — and until the block exists, **the only thing that has happened is that this project asked for a timestamp.**

The distinction is easy to blur and expensive to blur, which is why the tooling reports three states rather than "anchored / not anchored".

## 5. What is automated, and what deliberately is not

A daily workflow does the part that needs no identity:

- Upgrades pending OpenTimestamps proofs — **this is the step that turns a calendar promise into a Bitcoin block attestation**, hours after submission
- Re-verifies and promotes `ANCHOR_SUBMITTED` to `ANCHOR_CONFIRMED`
- Commits newly confirmed proofs

**Rekor submission is not automated, and will not be.** It signs the manifest with the maintainer's release key. Putting that key in continuous integration would let CI sign as the maintainer — and a witness whose value is recording *who submitted this* is worth nothing if the answer is *"a workflow anyone with push access can trigger."*

> **The witness that records an identity requires the holder of that identity.** The witness that records only a time does not, so that one is automated.

That asymmetry is deliberate. It is also why the two witnesses are worth having together: one can run unattended, and the other cannot be run by anyone else.

## 6. What anchoring does not prove

It proves that **a hash existed no later than a block time.** That is all.

It does **not** prove:

- That the content is true
- That the content was authorised
- That no other version existed earlier or at the same time
- That events left out of the log never happened
- **Who** created the content
- That the record is complete

Anchoring upgrades exactly one property — *this exact byte sequence existed by this time* — from self-asserted to externally witnessed. Every limit in [SECURITY.md](SECURITY.md) §3 still applies, unchanged.

> **Any page or release note describing anchoring has to state these limits.** A Bitcoin proof carries an aura of finality far beyond what it establishes, and trading on that aura would be the same authority inflation this project exists to refuse.

## 7. What a witness has to satisfy

Not ideology, and not an endorsement of any asset or vendor. Four requirements:

- **No dependence on any party this project could influence**
- A public, verifiable record
- Durability measured in decades
- No ongoing cost and no account relationship

Both registered witnesses meet all four. **Anything else that does is welcome**, and adding one means implementing the `Witness` interface in `src/witnesses.ts` — an `available`, a `submit`, and a `check`. Nothing else in the anchoring layer knows what a witness is made of.

**A new witness must fail differently from the existing ones.** Two witnesses that go down together are one witness with extra steps, so a third proof-of-work chain adds far less than something with an unrelated operator and an unrelated technology.

Nothing about anchoring is purchasable, and a timestamp confers no status on a record. **A timestamped false claim is a precisely dated false claim** ([SUSTAINABILITY.md](SUSTAINABILITY.md)).

## 8. When it fails

- Calendar servers unavailable → anchoring retries
- A release may ship marked `ANCHOR_PENDING`, with the proof attached when it completes
- **A missing anchor never blocks a security patch**
- If OpenTimestamps stops existing, **existing proofs still verify against the chain** — that independence is precisely what is being bought

---

**See also:** [CALIBRATION.md](CALIBRATION.md) — Bitcoin's other, unrelated role · [SECURITY.md](SECURITY.md) §3 — the limits this sits inside · [INCIDENT-RESPONSE.md](INCIDENT-RESPONSE.md) — what happens when the anchors themselves fail
