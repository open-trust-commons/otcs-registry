# How OTCS works — the process

*Five diagrams. The first is the whole system; the rest are the four flows that make it run.*

---

## 1. The system, end to end

A project describes itself, gets located in shared coordinates, accumulates evidence and relationships, and becomes findable by people who need what it does. Nothing here validates anything by the fact of being listed.

```mermaid
flowchart TD
    A["People and projects"] --> B["Project registry<br/>otcs.yaml manifest"]
    B --> C["Coordinate map<br/>actor · authority · action · environment<br/>function · time · maturity"]
    C --> D["Evidence ledger<br/>claim-by-claim states, maturity profile"]
    D --> E["Relationship graph<br/>typed edges, each with assertion status"]
    E --> F["Coordination<br/>offers · needs · interfaces"]
    F --> G["Composition in the world<br/>signals → decisions → enforcement → receipts → repair"]
    G -. "field evidence returns" .-> D
```

The dotted line is the only way maturity ever rises to the top of the scale: real deployment, observed, reported back.

---

## 2. Getting into the registry

Self-registration is the normal path. Two other doors exist and both are visibly different from it.

```mermaid
flowchart TD
    START(["A project exists"]) --> WHO{"Who is writing<br/>the record?"}

    WHO -- "the project itself" --> PR["Pull request adding<br/>registry/projects/&lt;id&gt;/otcs.yaml"]
    WHO -- "an OTCS maintainer,<br/>from public evidence" --> OBS["record_state: observed<br/>not project-controlled<br/>never shown as participation"]
    WHO -- "nobody — project declines" --> DECL["DECLINE honored<br/>no page is created"]

    PR --> VAL{"npm run validate"}
    VAL -- "schema error,<br/>semantic error,<br/>dangling edge" --> FIX["Fix and resubmit"]
    FIX --> VAL
    VAL -- "passes" --> MERGE["Maintainer merges"]
    MERGE --> EV["Ledger event:<br/>PROJECT_REGISTERED"]
    EV --> REG["record_state: registered<br/>maintainer-verified"]

    OBS --> EV
    REG --> LIVE(["Live record — a public,<br/>attributable claim about itself,<br/>and nothing more"])
    OBS --> LIVE
```

Registration asserts existence. It does not imply endorsement, validation, interoperability, originality, or conformance.

---

## 3. How a claim earns its evidence state

Every claim moves on its own. A single project routinely holds claims in three different states at once — that is the expected condition, not an anomaly.

```mermaid
stateDiagram-v2
    [*] --> SELF_ASSERTED: project states it
    SELF_ASSERTED --> DOCUMENTED: a public artifact shows it
    DOCUMENTED --> REPRODUCIBLE: an outsider can re-derive it
    REPRODUCIBLE --> INDEPENDENTLY_TESTED: independence test passes
    INDEPENDENTLY_TESTED --> FIELD_OBSERVED: repeated real-world evidence

    REPRODUCIBLE --> DOCUMENTED: independence test FAILS
    SELF_ASSERTED --> DISPUTED: dispute record opened
    DOCUMENTED --> DISPUTED: dispute record opened
    REPRODUCIBLE --> DISPUTED: dispute record opened
    INDEPENDENTLY_TESTED --> DISPUTED: dispute record opened
    DISPUTED --> DOCUMENTED: resolved
    SELF_ASSERTED --> RETRACTED: withdrawn by claimant
    DOCUMENTED --> RETRACTED: withdrawn by claimant
    RETRACTED --> [*]
```

**The independence test** is the gate that matters. An evaluator is *not* independent merely for being a separate legal entity. Any of these and the evaluation lands at `DOCUMENTED` instead: shared founders · shared funders · advisory relationship · reciprocal review · employment · contractor status · code contribution · commercial dependency · substantial prior collaboration.

`RETRACTED` removes the claim's force, never the record of it.

---

## 4. How the shared system changes

Nothing changes by consensus, seniority, or volume. It changes by proposal, on a clock, through three separate questions — and a vote count alone never ratifies anything.

```mermaid
flowchart TD
    SEED["SEED — anyone, no standing required"] --> DISC["DISCOVERY — prior art, affected projects, risks"]
    DISC --> DRAFT["DRAFT — concrete change published<br/>⏱ clock starts here"]
    DRAFT --> DELIB["DELIBERATION — objections raised and answered"]
    DELIB --> TRIAL["TRIAL — implementation or simulation<br/>interfaces target two independent ones"]
    TRIAL --> CLOCK{"Has the class minimum<br/>elapsed?"}
    CLOCK -- "no" --> WAIT["Wait. The clock binds the founder<br/>or it binds nobody."]
    WAIT --> CLOCK
    CLOCK -- "yes" --> BALLOTS

    subgraph BALLOTS ["RATIFICATION — three ballots, not one"]
        BA["A · Readiness<br/>is it specified and evidenced enough to decide?"]
        BB["B · Ratification<br/>should this exact version pass?"]
        BC["C · Implementation<br/>will your project actually implement it?"]
    end

    BALLOTS --> GATE{"Process validity<br/>A_g ≤ E_g"}
    GATE -- "environment supports it" --> ALLOW["ALLOW — ratify"]
    GATE -- "scope or evidence too broad" --> SHAPE["SHAPE — revise"]
    GATE -- "deliberation bypassed or overwhelmed" --> DEAUT["DEAUTOMATE — back to human deliberation"]
    GATE -- "cannot be legitimately supported" --> VETO["VETO — reject"]

    SHAPE --> DELIB
    DEAUT --> DELIB
    ALLOW --> OP["OPERATION — change is active,<br/>ledger event recorded"]
    OP --> REV["REVIEW — every decision carries<br/>a review, expiry, or reaffirmation date"]
    REV --> RENEW["RENEWED"]
    REV --> DEP["DEPRECATED"]
```

**Clocks by consequence:** typo 24–72h · registry update 3–7d · interface clarification 7–14d · new interface 21–30d · breaking change 30–45d · constitutional or model revision 45–90d · emergency immediate but auto-expiring in 7 days.

**The gate is the point.** A proposal with 80% support is *held*, not ratified, if affected projects were absent, a serious objection went unanswered, notification failed, the version changed mid-vote, or the participant set was organizationally concentrated.

---

## 5. Declared facts vs computed interpretations

The separation that keeps a score from turning into a reputation.

```mermaid
flowchart LR
    subgraph DECLARED ["Declared — authoritative, human-written, PR-reviewed"]
        M["manifests"]
        R["relationships"]
        C["claims"]
        B["ballots and receipts"]
    end

    subgraph GEN ["Generators — deterministic"]
        G1["relationship graph"]
        G2["capability matrix"]
        G3["overlap O · complementarity Γ"]
    end

    subgraph COMPUTED ["computed/ — interpretation, never attribute"]
        S["every artifact stamped:<br/>algorithm version · input hashes<br/>weights · timestamp"]
    end

    DECLARED --> GEN --> COMPUTED
    COMPUTED --> SITE["Site pages, labeled<br/>'computed interpretation, not fact'"]
    DECLARED --> SITE

    LEDGER[/"governance ledger<br/>append-only, hash-chained"/]
    DECLARED -. "every change emits an event" .-> LEDGER
```

Overlap says two projects occupy similar positions. It says nothing about copying — derivation needs chronology, documented access, distinctive terminology, structural correspondence, citations, transmission paths. High overlap with no transmission evidence is **independent convergence**, which strengthens both records.

And the ledger's honest limit, stated wherever it appears: this is **tamper-evident sequence integrity**, not immutable evidence. The chain proves the committed records form a consistent sequence. It cannot prove that omitted events never existed, that timestamps are true, that the author held authority, or that any event's content is factually correct.

---

## The rule underneath all five

> A system that cannot show its own weakness in the same format it demands of everyone else is not a registry. It is a brochure.

Which is why KTP is registered as project #1 with a zero in its validation column, why OTCS scores itself on its own scale, why the unreachable rung is named on the capability matrix, and why the proposal adopting this registry is sitting unfinished with its clock still running.
