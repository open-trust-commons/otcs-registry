import { describe, it, expect } from "vitest";
import { classifyLedgerEvent, classifyPublicItem, table, touchesOf, BAR } from "../src/participation.js";

// Both directions, like standing's suite: acts that must qualify, and acts
// that must not — each exclusion with its stated reason. The rule under test
// is issue #14's: public substance, attributable to the actor, across more
// than one proposal, over 90 days, computed rather than noticed.

process.env.OTCS_TODAY = "2026-08-05";

const at = new Date("2026-08-05");

const ballot = {
  actor_id: "some-handle",
  proposal_id: "OTCS-0001",
  event_type: "BALLOT_CAST",
  timestamp: "2026-04-01T12:00:00-06:00",
};

describe("participation — what qualifies", () => {
  it("a ballot with its artifact in the repo qualifies", () => {
    const act = classifyLedgerEvent(ballot, () => true)!;
    expect(act.qualifies).toBe(true);
    expect(act.act).toBe("cast a final ballot");
    expect(act.touches).toEqual(["OTCS-0001"]);
  });

  it("a ballot whose artifact is missing does not qualify, with the reason stated", () => {
    const act = classifyLedgerEvent(ballot, () => false)!;
    expect(act.qualifies).toBe(false);
    expect(act.why).toMatch(/artifact missing/i);
  });

  // Issue #14's stated consequence, as code: the strongest engagement to date
  // does not qualify as it stands, because it arrived privately. A ledger
  // COMMENT_SUBMITTED whose only substance is the recorder's note is the
  // recorder's account of the actor, not the actor's public act.
  it("a note-only comment event scores zero — the substance is the recorder's account", () => {
    const act = classifyLedgerEvent({
      actor_id: "outside-reviewer",
      proposal_id: "OTCS-0005",
      event_type: "COMMENT_SUBMITTED",
      timestamp: "2026-08-03T14:00:00-06:00",
      note: "Recorded by the founder on their behalf from written correspondence.",
    })!;
    expect(act.qualifies).toBe(false);
    expect(act.why).toMatch(/recorder's account/i);
  });

  it("operator bookkeeping is not participation at all", () => {
    for (const t of ["DECISION_RECORDED", "RECORD_UPDATED", "EVIDENCE_ANCHORED"]) {
      expect(classifyLedgerEvent({ actor_id: "x", event_type: t, timestamp: "2026-08-01" })).toBeNull();
    }
  });

  it("a public comment under a handle, engaging a proposal, qualifies — a name is not required", () => {
    const act = classifyPublicItem({
      author: "anon-handle-42",
      created_at: "2026-05-01T00:00:00Z",
      body: "OTCS-0007's two-party bar imports RFC 6410 but drops pairwise independence — see VOTING.md §7.",
    });
    expect(act.qualifies).toBe(true);
    expect(act.touches).toContain("OTCS-0007");
    expect(act.touches).toContain("VOTING.md");
  });

  it("a public comment engaging nothing is recorded and counts toward nothing", () => {
    const act = classifyPublicItem({ author: "anon-handle-42", created_at: "2026-05-01T00:00:00Z", body: "Great work! Following this." });
    expect(act.qualifies).toBe(false);
    expect(act.why).toMatch(/counts toward nothing/i);
  });

  it("automation is not a participant", () => {
    const act = classifyPublicItem({ author: "github-actions[bot]", created_at: "2026-05-01T00:00:00Z", body: "OTCS-0001 build passed" });
    expect(act.qualifies).toBe(false);
  });
});

describe("participation — the bar", () => {
  const act = (actor: string, date: string, touches: string[], qualifies = true) => ({
    actor, date, act: "wrote on the public record (issue tracker)", source: "github" as const,
    touches, qualifies, why: "test",
  });

  it("two proposals over 90+ days meets the bar", () => {
    const rows = table([
      act("a-handle", "2026-04-01", ["OTCS-0002"]),
      act("a-handle", "2026-06-01", ["OTCS-0003"]),
    ], at);
    expect(rows[0].bar).toBe("MET");
    expect(rows[0].days_since_first).toBeGreaterThanOrEqual(BAR.min_days);
  });

  it("one proposal, however energetically engaged, does not", () => {
    const rows = table([
      act("a-handle", "2026-04-01", ["OTCS-0002"]),
      act("a-handle", "2026-06-01", ["OTCS-0002"]),
      act("a-handle", "2026-07-01", ["OTCS-0002"]),
    ], at);
    expect(rows[0].bar).toBe("NOT MET");
    expect(rows[0].gaps.join(" ")).toMatch(/1 distinct/);
  });

  it("a young trail does not — the 90 days are not waivable here", () => {
    const rows = table([
      act("a-handle", "2026-07-20", ["OTCS-0002"]),
      act("a-handle", "2026-08-01", ["OTCS-0003"]),
    ], at);
    expect(rows[0].bar).toBe("NOT MET");
    expect(rows[0].gaps.join(" ")).toMatch(/90/);
  });

  it("non-qualifying acts never start the clock or touch the counts", () => {
    const rows = table([
      act("a-handle", "2026-01-01", ["OTCS-0002"], false),
      act("a-handle", "2026-07-30", ["OTCS-0003"]),
    ], at);
    expect(rows[0].first_qualifying_act).toBe("2026-07-30");
    expect(rows[0].distinct_touched).toEqual(["OTCS-0003"]);
    expect(rows[0].excluded_acts).toBe(1);
  });

  // NON-GOALS.md §5: the output must never read as a scoreboard. Ordering is
  // alphabetical regardless of volume — the busiest actor gains no position.
  it("rows are alphabetical, never ranked by volume", () => {
    const rows = table([
      act("zz-prolific", "2026-01-01", ["OTCS-0002"]),
      act("zz-prolific", "2026-02-01", ["OTCS-0003"]),
      act("zz-prolific", "2026-03-01", ["OTCS-0004"]),
      act("aa-quiet", "2026-06-01", ["OTCS-0002"]),
    ], at);
    expect(rows.map((r) => r.actor)).toEqual(["aa-quiet", "zz-prolific"]);
  });

  it("declared aliases fold to one actor; nothing else merges", () => {
    const a = classifyPublicItem({ author: "nmcitra", created_at: "2026-05-01T00:00:00Z", body: "re OTCS-0002" });
    expect(a.actor).toBe("chris-perkins-nmcitra");
    const b = classifyPublicItem({ author: "someone-else", created_at: "2026-05-01T00:00:00Z", body: "re OTCS-0002" });
    expect(b.actor).toBe("someone-else");
  });
});

describe("participation — touches extraction", () => {
  it("finds proposal ids and governing documents, deduplicated and sorted", () => {
    expect(touchesOf("OTCS-0009 and OTCS-0007, per PREMORTEM.md and OTCS-0007 again"))
      .toEqual(["OTCS-0007", "OTCS-0009", "PREMORTEM.md"]);
  });
});
