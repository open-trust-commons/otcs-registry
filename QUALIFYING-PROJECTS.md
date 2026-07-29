# What counts as a project, for counting purposes

*Version 0.1 · Status: EXPERIMENTAL*

**A raw registry count will be gamed** — sometimes deliberately, more often by accident.

So release gates and Commons stages never count records. They count **qualifying active projects**, and this document is the rule.

---

## 1. All nine conditions, or it does not count

```text
record_state: registered           not example, observed, withdrawn, or archived
owner or steward verified          a named method, not a badge
a canonical public artifact exists a social-media profile is not enough
the manifest validates
at least one substantive claim declared
at least one evidence record
owner confirmation no more than 12 months old
not a trivial duplicate or a namespace reservation
no unresolved dispute about the project's identity
```

## 2. It does not have to be software, or open

All of these qualify:

- A doctrine
- A specification
- A research programme
- An open-source implementation
- **A commercial product**
- A service
- A dataset
- A benchmark
- An evidence system
- A governance method

What is required is that it be a **real, bounded, stewarded object** ([PARTICIPATION.md](PARTICIPATION.md)).

## 3. What is never counted

| Excluded | Why |
|---|---|
| Fictional `example` records | They exist to test the schema |
| Unclaimed `observed` records | Nobody chose to take part |
| Government and standards artifacts | They are authority sources, not participants |
| Individual reviews, AI analysis runs | Not projects |
| Archived projects, trivial forks, abandoned placeholders | No live stewardship |
| Several versions of one project | It is one project |

## 4. Freshness

Owner confirmation lapses at 12 months and the record shows `OWNER_CONFIRMATION_STALE`.

**A stale record stays published and readable.** It simply stops counting toward gates until it is reconfirmed, after a published grace period.

> **Visibility and gate-eligibility are separate concerns.** Going stale hides nothing; it only stops the record from voting with its presence.

## 5. The anti-capture counter

Several projects from one organisation may each qualify **if they are genuinely distinct** — separate lifecycle, governance, claims and canonical artifacts, with the common ownership disclosed.

But every gate also carries a minimum **independent steward** count.

> **One company cannot register forty related records and trigger a major version by itself.**

**Stewards are counted by disclosed affiliation, not by account.** Two maintainers at one employer are one steward for gate purposes.

## 6. Measured, not asserted

```bash
npm run roadmap:status
```

Derives the qualifying-project and steward counts from the live registry against these rules, and writes `roadmap/status.yaml`.

**The dashboard reports a measurement. It never reports a claim.**

---

**See also:** [COMMONS-STAGES.md](COMMONS-STAGES.md) — the thresholds these counts feed · [VERSION-EXIT-CRITERIA.md](VERSION-EXIT-CRITERIA.md) — why counts alone never gate a release · [PARTICIPATION.md](PARTICIPATION.md) — what being listed means
