import { describe, it, expect, beforeEach, afterAll } from "vitest";
import { appendEvent, verifyLedger } from "../src/ledger.js";
import { readFileSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const TMP = join(dirname(fileURLToPath(import.meta.url)), "..", ".tmp-test-ledger.jsonl");
const clean = () => existsSync(TMP) && rmSync(TMP);

const ev = (type: string) => ({
  actor_id: "test-actor",
  event_type: type,
  timestamp: "2026-07-25T21:00:00-06:00",
});

describe("governance ledger", () => {
  beforeEach(clean);
  afterAll(clean);

  it("appends a hash-chained sequence that verifies", () => {
    appendEvent(ev("PROPOSAL_CREATED"), TMP);
    appendEvent(ev("BALLOT_CAST"), TMP);
    appendEvent(ev("DECISION_RECORDED"), TMP);
    const r = verifyLedger(TMP);
    expect(r.count).toBe(3);
    expect(r.ok).toBe(true);
  });

  it("detects a tampered record (content edit)", () => {
    appendEvent(ev("PROPOSAL_CREATED"), TMP);
    appendEvent(ev("BALLOT_CAST"), TMP);
    appendEvent(ev("DECISION_RECORDED"), TMP);
    const lines = readFileSync(TMP, "utf8").trim().split("\n");
    const mid = JSON.parse(lines[1]);
    mid.actor_id = "attacker"; // rewrite history
    lines[1] = JSON.stringify(mid);
    writeFileSync(TMP, lines.join("\n") + "\n");
    const r = verifyLedger(TMP);
    expect(r.ok).toBe(false);
    expect(r.problems.join(" ")).toMatch(/content_hash mismatch/);
  });

  it("detects a deleted record (chain break)", () => {
    appendEvent(ev("PROPOSAL_CREATED"), TMP);
    appendEvent(ev("BALLOT_CAST"), TMP);
    appendEvent(ev("DECISION_RECORDED"), TMP);
    const lines = readFileSync(TMP, "utf8").trim().split("\n");
    writeFileSync(TMP, [lines[0], lines[2]].join("\n") + "\n"); // drop the middle event
    const r = verifyLedger(TMP);
    expect(r.ok).toBe(false);
    expect(r.problems.join(" ")).toMatch(/prev_hash broken/);
  });
  // An append is hash-chained the moment it lands, so the cheap fix for a bad
  // record - edit it - is exactly what the chain exists to make detectable.
  // append once wrote whatever it was handed and left validation to a later
  // `npm run validate`; an over-length note reached the chain that way.
  it("refuses an event the schema rejects, and writes nothing", () => {
    appendEvent(ev("PROPOSAL_CREATED"), TMP);
    const before = readFileSync(TMP, "utf8");
    expect(() =>
      appendEvent({ ...ev("COMMENT_SUBMITTED"), note: "x".repeat(2001) }, TMP),
    ).toThrow(/refusing to append/);
    expect(readFileSync(TMP, "utf8")).toBe(before);
    expect(verifyLedger(TMP).ok).toBe(true);
  });

  it("accepts an event at the schema boundary", () => {
    appendEvent({ ...ev("COMMENT_SUBMITTED"), note: "x".repeat(2000) }, TMP);
    expect(verifyLedger(TMP).count).toBe(1);
  });
});
