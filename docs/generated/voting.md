!!! info "Generated page"
    Compiled from `VOTING.md` by `npm run generate:docs`. Edit the source, not this file. The repository is the record; this page is a rendering of it.

# How voting works

*Version 0.1 · Status: EXPERIMENTAL · The principle is in [CHARTER.md](charter.md) §5; the process around it is [GOVERNANCE.md](governance.md) §§2–5*

**Everyone can speak from the moment they arrive. Voting requires having done the work.**

Section numbers are fixed — other documents cite them.

---

## 1. Three different things

| | What it is | How you get it |
|---|---|---|
| **Voice** | Speak, ask, object, submit evidence | Immediate, universal |
| **Standing** | Earned credibility **on one specific proposal** | The trajectory in §2 |
| **Authority** | A formal right to approve, merge, veto or enact | Only from the published governance structure |

**Money buys none of the three.** Neither do follower counts, likes, or message volume.

## 2. What earns standing

For any proposal, a participant builds up a record of things that actually happened:

```text
joined · reviewed a version · asked a question · provided evidence
raised an objection · answered a counterargument · tested an implementation
changed position · reaffirmed a position with reasons · cast a final ballot
```

Account age counts for nothing. What counts is that trail.

> **The essential rule: you have to stay in the process long enough to be exposed to correction.**

## 3. When a ballot counts

All seven, or the ballot does not qualify:

- Identity and affiliation disclosed (§7)
- Reviewed the proposal **at its current version**
- Took part across at least two phases
- Reviewed at least one serious objection
- Declared conflicts of interest, or stated there are none
- Waited out the cooling-off period for that class of proposal
- Submitted reasons alongside the ballot

**Every qualified ballot counts exactly 1.** Trajectory *qualifies* votes; it never multiplies them. A bounded weighting could be introduced later, capped at 1.25–1.5 and decaying with inactivity, and only by a constitutional-class proposal.

## 4. What standing gates instead

Rather than vote weight, standing determines who may:

- Sponsor a proposal
- Serve as a specification editor
- Certify that an objection has been answered
- Represent an implementation
- Sit on a temporary review panel
- Trigger reconsideration of a settled decision

**Standing decays with inactivity.** Contributions age out of these roles. The record of having made them is permanent.

## 5. Arriving early earns provenance, not sovereignty

| Early contributors get | Early contributors do not get |
|---|---|
| Permanent record as first proposer or first implementer | A bigger vote |
| Authorship records | Permanent control |
| Eligibility to sponsor or edit | Immunity from being outvoted |
| Visible historical standing | |

A latecomer reaches equal standing by doing the same substantive work. They cannot rewrite who arrived first, and **they are not permanently weaker for arriving later.**

## 6. The catch-up path

Every proposal keeps one packet: current version · version history · decision log · strongest case for · strongest objection · unresolved questions · implementation evidence · known failures · conflict disclosures · minority reports.

The route from arriving late to an equal vote:

```text
read the proposal → review the strongest objection → ask one question or make one critique
→ read the response → cooling-off period → cast an equal ballot
```

## 7. Identity and fake accounts

- **One verified human per individual ballot**
- **Affiliation disclosed on every ballot**
- Individual and project ballots are separate surfaces ([GOVERNANCE.md](governance.md) §5)

Shared employers, funding relationships, shared maintainers and common codebases are **disclosed fields, visible rather than prohibited.** The point is that concentration can be seen, not that it is banned.

Version 0.1 identity is maintainer keys listed in project records plus named humans on ballots. Stronger verification is an open proposal with no scheduled version — see [SECURITY.md](security.md) §3, which says plainly that this is not enough against a determined adversary.

## 8. What never earns standing

Raw message count · hours present · likes · follower count · attending meetings · repeating yourself · AI-generated paraphrase.

Standing comes only from bounded, checkable events:

- An accepted patch
- A verified test
- A serious objection
- A documented review
- An implementation
- A reproduced result
- A successful mediation
- Sustained maintenance
- **Correcting your own earlier claim** — explicitly rewarded

## 9. Ballots are records, not clicks

Each ballot is a signed file matching `schemas/ballot.schema.json`, committed to the proposal's `ballots/` directory and referenced from the log. There is no voting service in version 0.1.

Each voter also gets a **trajectory receipt** (`schemas/trajectory-receipt.schema.json`): when they joined, which versions they reviewed, what they contributed, which objections they read, what they disclosed, their initial and final position, whether it changed, when they qualified, the ballot, the signature.

**The receipt proves the public trail behind a vote. It never claims to show what anyone privately thought.**

## 10. AI assistance

AI **may** summarise discussions, spot duplicates, map arguments, translate, compare versions, and pull out unresolved questions — provided the output links to its sources, is labelled as generated, and can be corrected.

AI output **never** replaces the record, never counts as a ballot, and never establishes consensus from sentiment.

> Prohibited in every form: *"the AI says the community agrees."*

Consensus exists only as signed human and project ballots. See [AI-USE.md](ai-use.md).

---

**See also:** [GOVERNANCE.md](governance.md) — the proposal process these ballots sit inside · [COMMUNICATIONS.md](communications.md) — where discussion becomes record · [CODE_OF_CONDUCT.md](code-of-conduct.md) — how disagreement is conducted
