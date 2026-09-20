import { describe, it, expect } from "vitest";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { buildWindow, dueWindows, windowTitle } from "../src/window.js";

const H = "5cca3b8c473d7da4d9b4aba8327aa4acbc96b145a4db256512a1c268f0beaa00";

describe("the window for OTCS-0004 is generated from the record", () => {
  const w = buildWindow("OTCS-0004");
  it("carries the title #49 used, so the workflow finds the existing issue and leaves it alone", () => {
    expect(w.title).toBe("OTCS-0004 — deliberation window (opened 2026-09-12)");
    expect(windowTitle("OTCS-0004", "2026-09-12")).toBe(w.title);
  });
  it("names the pin, the computed date, and where objections land", () => {
    expect(w.pin).toEqual({ version: "v1", hash: H });
    expect(w.body).toContain(`artifact hash \`${H}\``);
    expect(w.body).toContain("**Earliest legal decision:** 2026-10-10");
    expect(w.body).toContain("### Where objections land");
    expect(w.body).toContain("Nothing in it was typed by a person.");
  });
  it("is due alongside 0003, 0012, 0013, 0014 and 0015", () => {
    expect(dueWindows().map((x) => x.proposal_id)).toEqual(["OTCS-0003", "OTCS-0004", "OTCS-0012", "OTCS-0013", "OTCS-0014", "OTCS-0015"]);
  });
});

describe("the window fails closed", () => {
  const root = mkdtempSync(join(tmpdir(), "otcs-window-"));
  const mk = (id: string, phase: string, extraHist = "") => {
    mkdirSync(join(root, id));
    writeFileSync(join(root, id, "proposal.md"), `# ${id}\n`);
    writeFileSync(join(root, id, "proposal.yaml"),
      `proposal_id: ${id}\ntitle: t\nclass: model_revision\nphase: ${phase}\nauthor: a\nsponsor: a\ncreated: "2026-08-01"\nclock_start: "2026-08-01"\nreview_date: "2028-01-01"\naffected_projects: []\nphase_history:\n  - { phase: DRAFT, date: "2026-08-01" }\n${extraHist}`);
  };
  it("refuses a DELIBERATION with no pin, and ignores a DRAFT", () => {
    try {
      mk("OTCS-9101", "DELIBERATION", `  - { phase: DELIBERATION, date: "2026-09-01" }\n`);
      mk("OTCS-9102", "DRAFT");
      expect(() => buildWindow("OTCS-9101", { root, events: [] })).toThrow(/no VERSION_PUBLISHED pin/);
      expect(() => dueWindows({ root, events: [] })).toThrow(/OTCS-9101/);
      const events = [{ proposal_id: "OTCS-9101", event_type: "VERSION_PUBLISHED", timestamp: "2026-09-01T12:00:00-06:00", actor_id: "x", artifact_version: "v1", artifact_hash: "a".repeat(64) }];
      expect(dueWindows({ root, events }).map((w) => w.proposal_id)).toEqual(["OTCS-9101"]);
      expect(() => buildWindow("OTCS-9102", { root, events })).toThrow(/not in DELIBERATION/);
    } finally { rmSync(root, { recursive: true }); }
  });
});
