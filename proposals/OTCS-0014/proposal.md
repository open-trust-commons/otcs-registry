# OTCS-0014 — Disagreeing well: restatement, disposition, agreed facts

**Class:** `constitutional` · **Phase:** DRAFT · **Clock start:** 2026-09-20
**Clock:** 45–90 days (`GOVERNANCE.md` §3, changing the rules themselves) — **earliest ratification: clock start + 45 days**

## Provenance

`GOVERNANCE.md` §2 obliges the record to answer every serious objection. It has no rule for deciding which objections are serious, which parts need an answer, and which can be carried without stalling a proposal. The gap was named by reading Bo Seo's *Good Arguments* against the governance documents on 2026-09-19 (analysis in the founder's worklog; the principles are Seo's, the mapping is this project's). It became urgent the same day, when the registry's scope was read to include laws and policies: a record that will hold bills will be asked to hold a real disagreement, and the current text rewards whoever posts most.

## The gap, in the text

- §2 DELIBERATION: "Serious objections must be answered or carried into the record as unresolved." Nothing says what makes an objection serious, or who decides.
- §10: a dispute record captures "what is at issue, who raised it, who is answering, evidence from both sides, and where it landed." Nothing orders it. Two parties can file a dispute without having found what they disagree about.
- `CODE_OF_CONDUCT.md` rule 2 says "I don't like it" is voice, not objection. Nothing makes that mechanical.

## The three moves — one pipeline

They are proposed together because they are one sequence: an objection is first *restated*, then *classified*, and a dispute opens on *agreed facts*. Each is cheap; each kills a failure the current text invites.

### 1. Faithful restatement, with `NOT MY CLAIM`

An objection opens with a one-paragraph restatement of the claim it objects to, in a form the proposer would recognise as faithful. The proposer returns one of two states, recorded on the objection:

```text
RESTATEMENT ACCEPTED    the objection is on the record's answer list
NOT MY CLAIM            it is not, until the restatement is corrected
```

An objection carrying `NOT MY CLAIM` is not yet an objection under §2. This stops the straw man at the door and records the moment of contact — the point at which two people are disagreeing about the same thing — as an event.

### 2. Objection disposition

Every accepted objection receives a disposition, set by the proposer, visible in the record:

```text
NECESSARY      must be resolved before vote A can return READY
PROGRESSING    not necessary to decide; answering it improves the draft; answered
CARRIED        neither; recorded as unresolved; does not block
```

An objector who disagrees with `CARRIED` may escalate it to a dispute record under §10, which costs them the evidence a dispute requires. That price keeps the filter honest in both directions: the proposer cannot carry everything, and the objector cannot make everything necessary. Every `OBJECT` ballot and every `NECESSARY` objection states *what would resolve it*, which is rule 2 made mechanical.

### 3. Agreed facts before contested interpretation

A dispute record under §10 has two ordered sections. `AGREED FACTS` is written and acknowledged by both parties before `CONTESTED INTERPRETATION` opens. A dispute with an empty agreed-facts section is not yet a dispute; it is two parties who have not found what they disagree about. `MINORITY-REPORTS.md` already treats "source facts agreed, interpretation disputed" as a successful outcome; this gives it a sequence.

## What this does not do

- It adds no civility rule. A rule installs no capacity; only practice does.
- It forces no synthesis. `MINORITY-REPORTS.md` refuses that already.
- It gives the proposer no veto. `CARRIED` is contestable at the cost of evidence.
- It does not decide any classification. It says who declares, who may contest, and what an unresolved contest does.

## Alternatives considered

- **Three separate proposals.** Rejected: the moves are one pipeline, and three proposals referencing each other while amendable is the hazard the calendar already names for 0007–0009.
- **A seriousness threshold set by vote.** Rejected: it makes the filter a second election.
- **Leave it to conduct.** Rejected: `CODE_OF_CONDUCT.md` rule 7 covers bad faith after the fact; this prevents the record filling with it.

## On decision

If ratified: `GOVERNANCE.md` §2 gains the restatement and disposition rules; §10 gains the ordered sections; the objection and dispute shapes gain `restatement_state` and `disposition` fields; `AI-REVIEW-PROTOCOL.md` §1 gains a faithful-restatement pass with the owner's acceptance recorded; a worked example is published from the first real deliberation that runs under it, with any external participant's consent for attribution. If rejected: the gap stands and is recorded in `CALENDAR.md` so the next real disagreement does not rediscover it.
