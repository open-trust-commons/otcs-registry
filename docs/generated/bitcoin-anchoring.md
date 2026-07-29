!!! info "Generated page"
    Compiled from `BITCOIN-ANCHORING.md` by `npm run generate:docs`. Edit the source, not this file. The repository is the record; this page is a rendering of it.

# Proving when something was written

*Version 0.1 · Status: EXPERIMENTAL*

**This registry cannot honestly timestamp itself.** Anchoring borrows a witness that nobody here controls.

No cryptocurrency is held, solicited, endorsed or transacted at any point in what follows.

---

## Bitcoin does two unrelated jobs here

| Role | What it does | Where |
|---|---|---|
| **Calibration** | A permanent worked example testing whether the coordinate vocabulary describes the field or just advertises KTP | [CALIBRATION.md](calibration.md) |
| **Anchoring** | Supplies an external timestamp witness | **This document** |

They share a subject and nothing else. You can reject either without touching the other.

## 1. The problem

The governance log gives **tamper-evident sequence integrity** ([SECURITY.md](security.md) §3). It cannot prove *when* an entry was written.

- Git timestamps are set by whoever authored the commit
- GitHub's records are GitHub's
- A repository can be rewritten before anyone ever sees it

**Every timestamp in this system is asserted by a party with an interest in it.**

The evidence model already says an attester sharing the failure domain of what it attests is not independent ([EVIDENCE-MODEL.md](evidence-model.md) §3). Applied to this project, that rules out timestamping itself.

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

Anchoring uses [OpenTimestamps](https://opentimestamps.org). A hash is aggregated with many others into a tree, one root is committed to Bitcoin, and each participant gets a small `.ots` proof.

```bash
npm run anchor            # stamp the log and the current release manifest
npm run anchor:verify     # verify every .ots proof in the repository
```

- **No coin is spent by this project**
- **No wallet, no account, no ongoing cost**
- Proofs live in `governance-log/anchors/` and in each release's artifacts
- A proof verifies against the public chain with the reference OpenTimestamps client

> **Nobody needs this project's tooling to check this project's timestamps.** That is the entire point.

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

## 5. What anchoring does not prove

It proves that **a hash existed no later than a block time.** That is all.

It does **not** prove:

- That the content is true
- That the content was authorised
- That no other version existed earlier or at the same time
- That events left out of the log never happened
- **Who** created the content
- That the record is complete

Anchoring upgrades exactly one property — *this exact byte sequence existed by this time* — from self-asserted to externally witnessed. Every limit in [SECURITY.md](security.md) §3 still applies, unchanged.

> **Any page or release note describing anchoring has to state these limits.** A Bitcoin proof carries an aura of finality far beyond what it establishes, and trading on that aura would be the same authority inflation this project exists to refuse.

## 6. Why Bitcoin and not something else

Not ideology, and not an endorsement of any asset. Four requirements:

- **No dependence on any party this project could influence**
- A public, verifiable record
- Durability measured in decades
- No ongoing cost and no account relationship

OpenTimestamps on Bitcoin meets them. **So would any equally independent and durable public timestamp service**, and nothing in the design prevents adding one.

Nothing about anchoring is purchasable, and a timestamp confers no status on a record. **A timestamped false claim is a precisely dated false claim** ([SUSTAINABILITY.md](sustainability.md)).

## 7. When it fails

- Calendar servers unavailable → anchoring retries
- A release may ship marked `ANCHOR_PENDING`, with the proof attached when it completes
- **A missing anchor never blocks a security patch**
- If OpenTimestamps stops existing, **existing proofs still verify against the chain** — that independence is precisely what is being bought

---

**See also:** [CALIBRATION.md](calibration.md) — Bitcoin's other, unrelated role · [SECURITY.md](security.md) §3 — the limits this sits inside · [INCIDENT-RESPONSE.md](incident-response.md) — what happens when the anchors themselves fail
