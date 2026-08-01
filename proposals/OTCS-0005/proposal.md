# OTCS-0005 — A sealed claim: provably dated, deliberately undisclosed, never inflated

*Class: `model_revision` · Clock: 45–90 days · Earliest decision: 2026-09-14*

## Provenance — four independent arrivals at the same missing state

The evidence model has seven states, from `SELF_ASSERTED` to `RETRACTED`. None of them can say: **this claim's substance is deliberately withheld, for a stated reason, and here is what can be verified anyway.**

Four parties found that hole independently, from four unrelated directions:

| Arrival | Direction | The form it took |
|---|---|---|
| **The financial-crime domain profile** (profiles/financial-crime/profile.md §6) | Adversarial security | The most effective controls are the least able to evidence themselves — describing the control tells the adversary how to route around it. The profile recorded the conflict and **explicitly declined to propose a fix** |
| **A prospective registrant** | Intellectual-property protection | What benefit does registration give over timestamping a PDF, if protecting the work means registering with minimal detail? Asked for priority claims without exposing the specification |
| **A second prospective registrant** | Architectural review | Independently specified the registry's value as preserving the distinction between *declared*, *evidenced*, *independently verified* — **and "what remains private or unproven."** The first three exist. The fourth does not |
| **A third prospective registrant** | Commercial confidentiality | Conditioned participation on an entry using only material cleared for release, with unpublished detail staying out of the registry entirely |

The correspondents are not named; they have not consented to appear in this record. The convergence is the point: **the same state is missing whether you arrive from security, IP, architecture, or commerce.**

This is the first model revision motivated primarily by external evidence rather than the founder's own analysis.

## Why the obvious fix is wrong

The profile's warning stands and this proposal honours it:

> A "trust us, it's secret" state is exactly the move the evidence model exists to prevent.

A state that lets a claim borrow credibility *because* it is hidden would be indistinguishable from the authority inflation this registry was built against. Whatever is added must make a sealed claim **weaker-or-equal** to a disclosed one on every axis except the one thing it can actually prove.

## What this proposal adds

### The `sealed` evidence state

```yaml
- claim_id: urn:otcs:claim:example:priority:1
  summary: "A method for X was reduced to practice"     # public, one line
  evidence_state: SEALED
  sealed:
    content_hash: "sha256:…"          # hash of the undisclosed material
    hash_scope: "single file | tree"  # what the hash covers, structurally
    anchored: [anchor-0007]           # witness round(s) covering this hash
    reason: ip_protection | dual_use | contractual | safety
    reason_statement: "one sentence, in the claimant's words"
    disclosure_condition: "what would cause the material to be published, if anything"
```

### What a sealed claim proves, exactly

One thing: **content with this hash existed no later than the witnessed time.** With the existing two-witness anchoring, that time is attested by parties with unrelated failure domains.

### What it never proves, stated in the schema's own description

- Not that the content is true, novel, original, or works
- Not that the content matches the one-line summary
- Not that no earlier version existed elsewhere — **an anchor is a floor for this copy, not a ceiling for anyone else's**
- Not priority in any legal sense. A registry entry is not a patent filing and confers nothing a court recognises

### The non-inflation rules, enforced rather than promised

1. **`SEALED` sits below `DOCUMENTED` in every ordering.** It is a variant of self-assertion with a provable date, and the maturity scale treats it as such
2. **A sealed claim cannot satisfy any qualifying or gate criterion** that a `SELF_ASSERTED` claim could not satisfy
3. **No count of sealed claims appears in any published view.** "This project has 14 sealed claims" is exactly the false signal the no-scores rule exists to prevent
4. **Unsealing is one-way and hash-checked.** If disclosed material does not hash to `content_hash`, the claim moves to `DISPUTED` automatically — a wrong reveal is worse than no reveal
5. **The `reason` is required.** A sealed claim with no stated reason is refused by the schema

## What this does not resolve

The dual-use conflict the profile identified is *narrowed*, not closed. A sealed claim lets a project say "withheld, and here is the checkable residue." It still cannot make withheld substance *count* as evidence — and it must not. That asymmetry is permanent and intended.

## Impact on existing records

None. No existing claim uses the state; it becomes available, not required.

## Alternatives considered

- **A trust-the-registry escrow** (registry holds the material privately). Rejected: makes the registry a custodian of secrets, a target, and a single point of trust — three things NON-GOALS.md refuses
- **Tiered registration levels.** Rejected: tiers become a ladder, ladders become status, status becomes the badge this registry will not issue. One state with strict non-inflation rules, not a hierarchy
- **Do nothing.** Rejected: four independent parties hit this wall before the registry had ten records. The gap is load-bearing
