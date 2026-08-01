!!! info "Generated page"
    Compiled from `governance-log/events.jsonl` by `npm run generate:docs`. Edit the source, not this file. The repository is the record; this page is a rendering of it.

# Governance ledger

24 events, hash-chained. Run `npm run ledger:verify` against a clone; you do not
have to take this page's word for it.

## What the chain proves

That the committed records form a consistent sequence, and that no committed record was altered
after the fact.

## What it does not prove

That events **omitted** from the ledger never happened · that the timestamps are true ·
that the authors held the authority they exercised · that the record is complete.
External timestamp anchoring addresses exactly the second of these, and only for anchored rounds.

| Event type | Count |
|---|---|
| `BALLOT_CAST` | 2 |
| `CONFLICT_DISCLOSED` | 2 |
| `DECISION_RECORDED` | 1 |
| `EVIDENCE_ANCHORED` | 5 |
| `OBJECTION_ANSWERED` | 1 |
| `OBJECTION_RAISED` | 1 |
| `PROPOSAL_CREATED` | 6 |
| `RECORD_UPDATED` | 1 |
| `VERSION_PUBLISHED` | 5 |

| Event | Type | Timestamp |
|---|---|---|
| `ev-000001` | PROPOSAL_CREATED | 2026-07-25T20:30:00-06:00 |
| `ev-000002` | VERSION_PUBLISHED | 2026-07-25T20:45:00-06:00 |
| `ev-000003` | CONFLICT_DISCLOSED | 2026-07-25T20:50:00-06:00 |
| `ev-000004` | BALLOT_CAST | 2026-07-25T21:00:00-06:00 |
| `ev-000005` | DECISION_RECORDED | 2026-07-25T21:05:00-06:00 |
| `ev-000006` | PROPOSAL_CREATED | 2026-07-25T21:40:00-06:00 |
| `ev-000007` | VERSION_PUBLISHED | 2026-07-25T21:41:00-06:00 |
| `ev-000008` | OBJECTION_RAISED | 2026-07-25T21:42:00-06:00 |
| `ev-000009` | OBJECTION_ANSWERED | 2026-07-25T21:43:00-06:00 |
| `ev-000010` | CONFLICT_DISCLOSED | 2026-07-25T21:44:00-06:00 |
| `ev-000011` | BALLOT_CAST | 2026-07-25T21:45:00-06:00 |
| `ev-000012` | PROPOSAL_CREATED | 2026-07-26T20:30:00-06:00 |
| `ev-000013` | VERSION_PUBLISHED | 2026-07-26T20:31:00-06:00 |
| `ev-000014` | VERSION_PUBLISHED | 2026-07-26T21:15:00-06:00 |
| `ev-000015` | EVIDENCE_ANCHORED | 2026-07-27T10:45:00-06:00 |
| `ev-000016` | PROPOSAL_CREATED | 2026-07-27T13:10:00-06:00 |
| `ev-000017` | RECORD_UPDATED | 2026-07-28T20:55:00-06:00 |
| `ev-000018` | VERSION_PUBLISHED | 2026-07-29T16:10:00-06:00 |
| `ev-000019` | EVIDENCE_ANCHORED | 2026-07-29T16:11:00-06:00 |
| `ev-000020` | EVIDENCE_ANCHORED | 2026-07-29T16:20:00-06:00 |
| `ev-000021` | EVIDENCE_ANCHORED | 2026-07-29T16:55:00-06:00 |
| `ev-000022` | EVIDENCE_ANCHORED | 2026-07-29T18:05:00-06:00 |
| `ev-000023` | PROPOSAL_CREATED | 2026-07-31T10:00:00-06:00 |
| `ev-000024` | PROPOSAL_CREATED | 2026-07-31T10:05:00-06:00 |
