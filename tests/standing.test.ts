import { describe, it, expect } from "vitest";
import { assess } from "../src/standing.js";

// The break test supplied by Richard Lynes (Genesis AiX) during architectural
// review. Before `standing` existed, every one of these degradations left the
// claim reading INDEPENDENTLY_TESTED at maturity 4 — five for five. The schema
// accepted all of them, because none of them is a schema question.
//
// These are the regression tests for that. If any of them ever returns
// UNREVIEWED again, the corpus has gone back to preserving history and not
// governing standing.

const manifest = {
  otcs_version: "0.1",
  project: { record_state: "registered", canonical_url: "https://example.invalid/x" },
  freshness: { review_interval_days: 365, next_owner_confirmation: "2027-07-27" },
};

const strongest = {
  project: "ktp",
  class: "VALIDATION",
  content: "An outside laboratory reproduced the falsifier suite.",
  date: "2026-07-25",
  otcs_version: "0.1",
  evidence_state: "INDEPENDENTLY_TESTED",
  maturity: 4,
  evaluator: "An outside laboratory",
  evidence: ["urn:otcs:evidence:lab-report-2026-01"],
  evaluator_independence: {
    assessed_at: "2026-07-25",
    independent_at_assessment: true,
    current_status: "UNCHANGED",
    current_status_as_of: "2026-07-25",
  },
};

// A fixed date, so these assertions do not rot with the wall clock.
process.env.OTCS_TODAY = "2026-08-03";

const degrade = (patch: Record<string, unknown>) =>
  assess({ ...structuredClone(strongest), ...patch }, manifest);

describe("standing — the break test", () => {
  it("a fully-supported recent claim is UNREVIEWED, never UNCHANGED", () => {
    const { state } = assess(strongest, manifest);
    // The clean result is the honest one: nothing here says otherwise is not
    // the same as someone checked. Only a human act produces UNCHANGED.
    expect(state).toBe("UNREVIEWED");
  });

  it("catches an evaluator relationship formed after assessment", () => {
    const { state, reasons } = degrade({
      evaluator_independence: {
        ...strongest.evaluator_independence,
        current_status: "RELATIONSHIP_FORMED_SINCE",
        relationship_note: "the laboratory took a paid support contract",
        current_status_as_of: "2026-08-03",
      },
    });
    expect(state).toBe("POTENTIALLY_STALE");
    expect(reasons.join(" ")).toMatch(/relationship formed since/i);
  });

  // A withdrawn evidence pointer is not decay. That claim was never supported.
  // Richard Lynes: "later change removes current standing; new evidence of an
  // earlier defect challenges historical validity. Those must remain separate."
  it("classes a missing evidence pointer as a DEFECT, not staleness", () => {
    const { state, defects } = degrade({ evidence: [] });
    expect(defects.join(" ")).toMatch(/never supported/i);
    expect(state).toBe("UNREVIEWED"); // decay axis untouched — nothing decayed
  });

  it("classes a never-declared otcs_version as a DEFECT", () => {
    const c = structuredClone(strongest) as Record<string, unknown>;
    delete c.otcs_version;
    const { defects } = assess(c, manifest);
    expect(defects.join(" ")).toMatch(/never said which vocabulary/i);
  });

  it("catches a claim written under a different vocabulary version", () => {
    const { state, reasons } = degrade({ otcs_version: "0.0.9" });
    expect(state).toBe("POTENTIALLY_STALE");
    expect(reasons.join(" ")).toMatch(/differs from manifest/);
  });

  it("catches independence that was never re-reviewed", () => {
    const { state, reasons } = degrade({
      evaluator_independence: { ...strongest.evaluator_independence, current_status: "UNREVIEWED" },
    });
    expect(state).toBe("POTENTIALLY_STALE");
    expect(reasons.join(" ")).toMatch(/never re-reviewed/i);
  });

  it("classes a missing independence record as a DEFECT", () => {
    const c = structuredClone(strongest) as Record<string, unknown>;
    delete c.evaluator_independence;
    const { defects } = assess(c, manifest);
    expect(defects.join(" ")).toMatch(/never established/i);
  });

  it("keeps decay and defect on separate axes", () => {
    // Decay: was correctly made, the world moved. Repairable by re-review.
    const decayed = degrade({
      evaluator_independence: { ...strongest.evaluator_independence,
        current_status: "RELATIONSHIP_FORMED_SINCE", relationship_note: "paid contract",
        current_status_as_of: "2026-08-03" },
    });
    expect(decayed.state).toBe("POTENTIALLY_STALE");
    expect(decayed.defects).toHaveLength(0);

    // Defect: was wrong when written. Re-review does not repair it.
    const broken = degrade({ evidence: [] });
    expect(broken.defects.length).toBeGreaterThan(0);
    expect(broken.state).toBe("UNREVIEWED");
  });

  it("degrades when the project underneath the claim withdraws", () => {
    const { state, reasons } = assess(strongest, {
      ...manifest,
      withdrawal: { active_participation: false },
    });
    expect(state).toBe("STALE");
    expect(reasons.join(" ")).toMatch(/withdrawn/i);
  });

  it("reports the WEAKEST state when several degradations stack", () => {
    // Richard's full sequence at once. This is the scenario that previously
    // returned a pristine INDEPENDENTLY_TESTED.
    const { state, reasons, defects } = assess(
      { ...structuredClone(strongest), evidence: [], otcs_version: undefined,
        evaluator_independence: { ...strongest.evaluator_independence,
          current_status: "RELATIONSHIP_FORMED_SINCE", relationship_note: "paid contract",
          current_status_as_of: "2026-08-03" } },
      { ...manifest, project: { record_state: "registered" } },
    );
    expect(state).toBe("POTENTIALLY_STALE");   // the decay that actually decayed
    expect(defects.length).toBeGreaterThanOrEqual(2); // the parts that were never valid
    expect(reasons.length + defects.length).toBeGreaterThanOrEqual(3);
  });

  // --- the fifth degradation: a referenced artifact superseded elsewhere ----
  // Four of five were caught when this suite was written. The fifth could not
  // be, because nothing in the corpus declared the dependency — a recompute
  // only sees declared facts. `depends_on` is the declaration; these prove
  // standing reads it.

  const dep = {
    identifier: "urn:example:falsifier-suite",
    version: "2.1.0",
    basis_hash: "sha256:" + "ab".repeat(32),
  };

  it("catches a declared dependency superseded elsewhere", () => {
    const { state, reasons } = degrade({
      depends_on: [{ ...dep, status: "SUPERSEDED", superseded_by: "urn:example:falsifier-suite@3.0.0" }],
    });
    expect(state).toBe("STALE");
    expect(reasons.join(" ")).toMatch(/superseded by urn:example:falsifier-suite@3\.0\.0/);
  });

  it("catches a declared dependency retracted by its owner", () => {
    const { state, reasons } = degrade({ depends_on: [{ ...dep, status: "RETRACTED" }] });
    expect(state).toBe("STALE");
    expect(reasons.join(" ")).toMatch(/retracted/i);
  });

  it("lets 'still CURRENT' age like every other positive assertion", () => {
    const { state, reasons } = degrade({
      depends_on: [{ ...dep, status: "CURRENT", status_as_of: "2024-01-01" }],
    });
    expect(state).toBe("POTENTIALLY_STALE");
    expect(reasons.join(" ")).toMatch(/last verified \d+d ago/);
  });

  it("does not punish declaring — a fresh or unreviewed dependency stays clean", () => {
    expect(degrade({ depends_on: [{ ...dep, status: "CURRENT", status_as_of: "2026-07-25" }] }).state).toBe("UNREVIEWED");
    expect(degrade({ depends_on: [{ ...dep, status: "UNREVIEWED" }] }).state).toBe("UNREVIEWED");
    expect(degrade({ depends_on: [dep] }).state).toBe("UNREVIEWED");
  });

  it("THE BREAK TEST GOES FIVE FOR FIVE", () => {
    // Richard's full sequence: relationship formed, evidence withdrawn,
    // referenced artifact superseded, coordinate meaning changed, nothing
    // re-reviewed. Every degradation must surface — none may read clean.
    const { state, reasons, defects } = assess(
      {
        ...structuredClone(strongest),
        evidence: [],                                    // 2: evidence source withdrawn  → DEFECT
        otcs_version: "0.0.9",                           // 4: meaning changed underneath → reason
        depends_on: [{ ...dep, status: "SUPERSEDED" }],  // 3: artifact superseded        → reason (NEW)
        evaluator_independence: {
          ...strongest.evaluator_independence,
          current_status: "RELATIONSHIP_FORMED_SINCE",   // 1: relationship formed        → reason
          relationship_note: "paid contract",
          current_status_as_of: "2025-01-01",            // 5: re-reviewed nothing        → reason
        },
      },
      manifest,
    );
    expect(state).toBe("STALE"); // the supersession is the deepest cut
    const all = reasons.join(" | ") + " || " + defects.join(" | ");
    expect(all).toMatch(/relationship formed since/i);   // 1
    expect(all).toMatch(/never supported/i);             // 2
    expect(all).toMatch(/superseded/i);                  // 3
    expect(all).toMatch(/differs from manifest/);        // 4
    expect(all).toMatch(/independence last determined/i); // 5
    expect(reasons.length + defects.length).toBeGreaterThanOrEqual(5);
  });

  it("never raises standing — a weak declared state is not promoted", () => {
    // The machine only ever lowers. A SELF_ASSERTED claim with everything in
    // order still comes back UNREVIEWED, not something stronger.
    const { state } = assess(
      { ...structuredClone(strongest), evidence_state: "SELF_ASSERTED", maturity: 0 },
      manifest,
    );
    expect(state).toBe("UNREVIEWED");
  });
});
