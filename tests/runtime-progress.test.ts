import { describe, it, expect } from "vitest";

describe.sequential("event-loop progress between cases", () => {
  let progressed = false;
  it("queues ready work", () => {
    expect(progressed).toBe(false);
    setImmediate(() => { progressed = true; });
  });
  it("delivers ready work before the next case", () => {
    expect(progressed).toBe(true);
  });
});
