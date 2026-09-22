import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { appendEvent, verifyLedger } from "../src/ledger.js";

const fault = vi.hoisted(() => ({ schema: "" }));
vi.mock("node:fs", async (load) => {
  const real = await load<typeof import("node:fs")>();
  return {
    ...real,
    existsSync: (p: any) => fault.schema === "missing" && String(p).endsWith("governance-event.schema.json") ? false : real.existsSync(p),
    readFileSync: (p: any, ...args: any[]) => {
      if (fault.schema === "unreadable" && String(p).endsWith("governance-event.schema.json")) throw new Error("synthetic schema read failure");
      return (real.readFileSync as any)(p, ...args);
    },
  };
});
let dir: string;
let file: string;
const event = () => ({ actor_id: "synthetic-actor", event_type: "PROPOSAL_CREATED", timestamp: "2026-09-09T10:00:00Z" });
beforeEach(() => { fault.schema = ""; dir = mkdtempSync(join(tmpdir(), "otcs-ledger-regression-")); file = join(dir, "events.jsonl"); });
afterEach(() => { fault.schema = ""; rmSync(dir, { recursive: true, force: true }); });

describe("ledger append integrity", () => {
  it.each(["missing", "unreadable"])("schema %s refuses before writing", (kind) => {
    appendEvent(event(), file);
    const before = readFileSync(file);
    fault.schema = kind;
    expect(() => appendEvent(event(), file)).toThrow(/validation unavailable/);
    expect(readFileSync(file)).toEqual(before);
    fault.schema = "";
    appendEvent(event(), file);
    expect(verifyLedger(file).ok).toBe(true);
  });
  it("refuses to extend a damaged chain without changing bytes", () => {
    appendEvent(event(), file);
    const damaged = readFileSync(file, "utf8").replace("synthetic-actor", "altered-actor");
    writeFileSync(file, damaged);
    expect(() => appendEvent(event(), file)).toThrow(/existing chain/);
    expect(readFileSync(file, "utf8")).toBe(damaged);
  });
  it("recomputes all generated fields when given a complete prior event", () => {
    const first = appendEvent(event(), file);
    const second = appendEvent(first, file);
    expect(second.event_id).toBe("ev-000002");
    expect(second.prev_hash).toBe(first.content_hash);
    expect(verifyLedger(file)).toMatchObject({ ok: true, count: 2 });
  });
  it("appends after a complete final record without a newline", () => {
    appendEvent(event(), file);
    writeFileSync(file, readFileSync(file, "utf8").trimEnd());
    appendEvent(event(), file);
    expect(verifyLedger(file)).toMatchObject({ ok: true, count: 2 });
  });
});

it("journal append refuses an existing writer lock", () => {
  appendEvent(event(), file);
  const before = readFileSync(file);
  writeFileSync(file + ".lock", "held elsewhere");
  expect(() => appendEvent(event(), file)).toThrow();
  expect(readFileSync(file)).toEqual(before);
  rmSync(file + ".lock");
  appendEvent(event(), file); expect(verifyLedger(file)).toMatchObject({ ok: true, count: 2 });
});
