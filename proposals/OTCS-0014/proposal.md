# OTCS-0014 — Disagreeing well: restatement, disposition, agreed facts

**Class:** `constitutional` · **Phase:** DRAFT · **Clock start:** 2026-09-20
**Clock:** 45–90 days (`GOVERNANCE.md` §3, changing the rules themselves) — **earliest ratification: clock start + 45 days**

## Provenance

`GOVERNANCE.md` §2 obliges the record to answer every serious objection. It has no rule for deciding which objections are serious, which parts need an answer, and which can be carried without stalling a proposal. The gap was named by reading Bo Seo's *Good Arguments* against the governance documents on 2026-09-19 (analysis in the founder's worklog; the principles are Seo's, the mapping is this project's). It became urgent the same day, when the registry's scope was read to include laws and policies: a record that will hold bills will be asked to hold a real disagreement, and the current text rewards whoever posts most.

## The gap, in the text

- §2 DELIBERATION: "Serious objections must be answered or carried into the record as unresolved." Nothing says what makes an objection serious, or who decides.
- §10: a dispute record captures "what is at issue, who raised it, who is answering, evidence from both sides, and where it landed." Nothing orders it. Two parties can file a dispute without having found what they disagree about.
- `CODE_OF_CONDUCT.md` rule 2 says "I don't like it" is voice, not objection. Nothing makes that mechanical.
- `OBJECTION_ANSWERED` is a bare ledger event. It records *that* an objection was answered, not *how*, and not against what. What an answer did lives only in `note`, which the schema says is never load-bearing.

## The four moves — one pipeline

They are proposed together because they are one sequence: an objection is first *restated*, then *classified*, then *answered*, and a dispute opens on *agreed facts*. Move 4 is numbered last because it was added last (Amendment 1); in the sequence it comes before move 3. Each is cheap; each kills a failure the current text invites.

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

### 4. What an answer records

An answer to an accepted objection records two facts on its `OBJECTION_ANSWERED` event, not one verdict:

```text
finding    ACCEPTED | PARTLY_ACCEPTED | REJECTED      does the answerer agree the objection is correct?
outcome    REVISED | NARROWED | RETAINED | WITHDRAWN   what happened to the text it challenged
```

- **`PARTLY_ACCEPTED` names the part accepted.** Without that, the finding is not set.
- **`effected_by`** (optional) names the `VERSION_PUBLISHED` event that carried a `REVISED`, `NARROWED` or `WITHDRAWN` outcome. Until it is set, the change reads *promised, not landed*. The promise is the historical fact and the landing is current standing (`EVIDENCE-MODEL.md` §3).
- **`standard_ref`** (optional) names text that existed before the answer: an earlier ledger event, a section of the proposal at a version pinned before the answer, or the objection's own *what would resolve it* (move 2). The validator checks that it is older, using the pins and the hash chain. A `RETAINED` or `NARROWED` outcome without one reads *unmeasured*. It is never required, because requiring it raises the price of answering in good faith and of objecting.
- **The objector judges the answer, not the answerer.** The objector may record `ANSWER_ACCEPTED`, or `ANSWER_CONTESTED`, which opens a dispute under §10 at the price move 2 sets. Silence reads *unacknowledged*, never accepted. This is move 1 turned around: the proposer accepts the objector's restatement, and the objector accepts the proposer's answer.
- **`self_answered` is derived, never entered.** It is true when the same actor raised and answered the objection. It is shown, and it changes nothing by itself.

No field grades an answer as adequate. The person who wrote the answer would be grading it.

`outcome` is not `disposition`. A disposition (move 2) is set before the answer and says how much an objection blocks. An outcome is set at the answer and says what happened to the text. They are two axes on one record.

**Answers already on the ledger** keep their events unchanged, and the generated record shows them as *predates outcome field*. None is typed after the fact: an outcome assigned later by the person who answered is a standard written after the answer, which this move refuses. Where a change promised in such an answer has since landed, a new, dated `OBJECTION_ANSWERED` may record it under this move, and the objector may respond to it.

## What this does not do

- It adds no civility rule. A rule installs no capacity; only practice does.
- It forces no synthesis. `MINORITY-REPORTS.md` refuses that already.
- It gives the proposer no veto. `CARRIED` is contestable at the cost of evidence.
- It does not decide any classification. It says who declares, who may contest, and what an unresolved contest does.
- It does not implement the role in `VOTING.md` to certify that an objection has been answered. That role needs a second participant with standing, and belongs to the standing proposals.

## Alternatives considered

- **Three separate proposals.** Rejected: the moves are one pipeline, and three proposals referencing each other while amendable is the hazard the calendar already names for 0007–0009.
- **A seriousness threshold set by vote.** Rejected: it makes the filter a second election.
- **Leave it to conduct.** Rejected: `CODE_OF_CONDUCT.md` rule 7 covers bad faith after the fact; this prevents the record filling with it.

## On decision

If ratified: `GOVERNANCE.md` §2 gains the restatement and disposition rules; §10 gains the ordered sections; the objection and dispute shapes gain `restatement_state` and `disposition` fields; `OBJECTION_ANSWERED` gains `finding`, `outcome`, `effected_by` and `standard_ref`, and the objector's response is added as `ANSWER_ACCEPTED` and `ANSWER_CONTESTED`; the validator checks that a `standard_ref` is older than its answer; the generated record shows *promised, not landed*, *unmeasured*, *unacknowledged*, *self-answered* and *predates outcome field*; `AI-REVIEW-PROTOCOL.md` §1 gains a faithful-restatement pass with the owner's acceptance recorded; a worked example is published from the first real deliberation that runs under it, with any external participant's consent for attribution. If rejected: the gap stands and is recorded in `CALENDAR.md` so the next real disagreement does not rediscover it.

## Amendments

**Amendment 1** (SUBSTANTIVE under OTCS-0013 §3.1; pinned as v2 at its merge, which restarts the clock). Made during deliberation, after a gap was raised with the author: the record says that an objection was answered, but not how, or against what standard fixed in advance. One change: move 4, what an answer records, with its line in *On decision* and one line in *What this does not do*. New fields, so SUBSTANTIVE. A separate proposal was considered and rejected: it would put a second writer on the objection shape this proposal already extends, and it would need another word for what this proposal calls disposition.
