import { describe, it, expect } from "vitest";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import {
  computeClock, clockTable, clockFindings, artifactHash, addDays, MINIMUM_DAYS, CONTEST_DAYS,
} from "../src/clock.js";

// The regression that matters most: the computed table must reproduce the
// hand-maintained proposals/CALENDAR.md before any rule changes. If this
// fails, either the calendar was typed wrong or the computation is — and
// either way a person and a script disagree about a date, which is the thing
// this module exists to make visible.
describe("clock reproduces the hand calendar from the ledger alone", () => {
  const expected: Record<string, string> = {
    "OTCS-0001": "2026-07-28", // registry_update, 3-day floor — the "clock demonstration"
    "OTCS-0002": "2026-09-09",
    "OTCS-0003": "2026-10-18", // window opened 2026-09-20 + 28 (OTCS-0013 window minimum)
    "OTCS-0004": "2026-10-10", // window opened 2026-09-12 + 28
    "OTCS-0005": "2026-09-14",
    "OTCS-0006": "2026-09-14",
    "OTCS-0007": "2026-09-17",
    "OTCS-0008": "2026-09-17",
    "OTCS-0009": "2026-09-18",
    "OTCS-0010": "2026-09-24",
    "OTCS-0011": "2026-09-25",
  };
  const table = new Map(clockTable().map((c) => [c.proposal_id, c]));
  for (const [id, date] of Object.entries(expected)) {
    it(`${id} → ${date}`, () => {
      expect(table.get(id)?.earliest).toBe(date);
    });
  }
  it("pre-rule pins (0002 v1→v2) do not move the clock", () => {
    const c = table.get("OTCS-0002")!;
    expect(c.pins.length).toBe(2);
    expect(c.clock_start).toBe(c.declared_clock_start);
  });
  it("today's ledger raises no findings", () => {
    expect(clockFindings()).toEqual([]);
  });
});

// ---- fixture proposals in a temp dir -----------------------------------------
function fixture(proposals: Record<string, { cls: string; clock_start: string; history?: [string, string][] }>) {
  const root = mkdtempSync(join(tmpdir(), "otcs-clock-"));
  for (const [id, p] of Object.entries(proposals)) {
    mkdirSync(join(root, id));
    writeFileSync(join(root, id, "proposal.md"), `# ${id}\n\nA proposal.\n`);
    const hist = (p.history ?? [["SEED", p.clock_start], ["DRAFT", p.clock_start]])
      .map(([ph, d]) => `  - { phase: ${ph}, date: "${d}" }`).join("\n");
    writeFileSync(join(root, id, "proposal.yaml"),
      `proposal_id: ${id}\ntitle: t\nclass: ${p.cls}\nphase: DRAFT\nauthor: a\nsponsor: a\ncreated: "${p.clock_start}"\nclock_start: "${p.clock_start}"\nreview_date: "2028-01-01"\naffected_projects: []\nphase_history:\n${hist}\n`);
  }
  return root;
}
const pin = (id: string, ts: string, extra: Record<string, unknown> = {}) => ({
  proposal_id: id, event_type: "VERSION_PUBLISHED", timestamp: `${ts}T12:00:00-06:00`, actor_id: "x", ...extra,
});

describe("OTCS-0012 §3.1 semantics", () => {
  it("a SUBSTANTIVE amendment restarts the clock at its merge date for the full class minimum", () => {
    const root = fixture({ "OTCS-9001": { cls: "model_revision", clock_start: "2026-07-31" } });
    try {
      const events = [
        pin("OTCS-9001", "2026-09-12", { artifact_version: "v1", artifact_hash: "a".repeat(64) }),
        pin("OTCS-9001", "2026-09-20", { artifact_version: "v2", artifact_hash: "b".repeat(64), amendment_class: "SUBSTANTIVE", supersedes_version: "v1" }),
      ];
      const c = computeClock("OTCS-9001", { root, events })!;
      expect(c.clock_start).toBe("2026-09-20");
      expect(c.earliest).toBe(addDays("2026-09-20", MINIMUM_DAYS.model_revision)); // 2026-11-04
      expect(c.earliest).toBe("2026-11-04");
      // yaml still says 07-31: that disagreement is a finding, not silently absorbed
      expect(clockFindings({ root, events }).map((f) => f.msg).join(" ")).toMatch(/disagrees/);
    } finally { rmSync(root, { recursive: true }); }
  });

  it("a NON_SUBSTANTIVE amendment adds only the contest tail, and only if it is later", () => {
    const root = fixture({ "OTCS-9002": { cls: "model_revision", clock_start: "2026-07-31" } });
    try {
      const early = [pin("OTCS-9002", "2026-08-10", { artifact_version: "v2", artifact_hash: "b".repeat(64), amendment_class: "NON_SUBSTANTIVE", supersedes_version: "v1" })];
      expect(computeClock("OTCS-9002", { root, events: early })!.earliest).toBe("2026-09-14"); // 08-17 < floor
      const late = [pin("OTCS-9002", "2026-09-12", { artifact_version: "v2", artifact_hash: "b".repeat(64), amendment_class: "NON_SUBSTANTIVE", supersedes_version: "v1" })];
      const c = computeClock("OTCS-9002", { root, events: late })!;
      expect(c.earliest).toBe(addDays("2026-09-12", CONTEST_DAYS)); // 2026-09-19
      expect(c.clock_start).toBe("2026-07-31"); // no restart
    } finally { rmSync(root, { recursive: true }); }
  });

  it("a pin that follows a pin without an amendment_class is a finding; the same hash twice is a finding", () => {
    const root = fixture({ "OTCS-9003": { cls: "constitutional", clock_start: "2026-08-01" } });
    try {
      const events = [
        pin("OTCS-9003", "2026-09-01", { artifact_version: "v1", artifact_hash: "a".repeat(64) }),
        pin("OTCS-9003", "2026-09-05", { artifact_version: "v2", artifact_hash: "a".repeat(64) }),
      ];
      const msgs = clockFindings({ root, events }).map((f) => f.msg).join("\n");
      expect(msgs).toMatch(/without an amendment_class/);
      expect(msgs).toMatch(/re-pins the same artifact hash/);
    } finally { rmSync(root, { recursive: true }); }
  });

  it("a decision phase entered before the computed date is a finding", () => {
    const root = fixture({ "OTCS-9004": { cls: "new_interface", clock_start: "2026-08-01", history: [["DRAFT", "2026-08-01"], ["RATIFICATION", "2026-08-05"], ["OPERATION", "2026-08-10"]] } });
    try {
      expect(clockFindings({ root, events: [] }).map((f) => f.msg).join(" ")).toMatch(/before the computed earliest decision 2026-08-22/);
    } finally { rmSync(root, { recursive: true }); }
  });

  it("emergency proposals expire and admit no amendments", () => {
    const root = fixture({ "OTCS-9005": { cls: "emergency", clock_start: "2026-08-01" } });
    try {
      expect(computeClock("OTCS-9005", { root, events: [] })!.earliest).toBe("2026-08-08");
      const events = [pin("OTCS-9005", "2026-08-03", { artifact_version: "v2", artifact_hash: "b".repeat(64), amendment_class: "SUBSTANTIVE", supersedes_version: "v1" })];
      expect(clockFindings({ root, events }).map((f) => f.msg).join(" ")).toMatch(/admit no amendments/);
    } finally { rmSync(root, { recursive: true }); }
  });

  it("the artifact hash ignores phase and clock bookkeeping", () => {
    const root = fixture({ "OTCS-9006": { cls: "model_revision", clock_start: "2026-07-31" } });
    try {
      const before = artifactHash(join(root, "OTCS-9006"));
      const y = join(root, "OTCS-9006", "proposal.yaml");
      writeFileSync(y, `${readFileSync(y, "utf8").replace("phase: DRAFT", "phase: DELIBERATION")}  - { phase: DELIBERATION, date: "2026-09-12" }\n`);
      expect(artifactHash(join(root, "OTCS-9006"))).toBe(before);
      writeFileSync(join(root, "OTCS-9006", "proposal.md"), "# changed\n");
      expect(artifactHash(join(root, "OTCS-9006"))).not.toBe(before);
    } finally { rmSync(root, { recursive: true }); }
  });
});
