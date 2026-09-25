import { describe, it, expect } from "vitest";

// Ordering is load-bearing: the first case queues work with setImmediate and the
// second asserts it has already run. vitest 5 removed the `describe.sequential`
// modifier; the option object carries the same meaning and keeps the dependency
// declared rather than inherited from a default that could later change.
describe("event-loop progress between cases", { sequential: true }, () => {
  let progressed = false;
  it("queues ready work", () => {
    expect(progressed).toBe(false);
    setImmediate(() => { progressed = true; });
  });
  it("delivers ready work before the next case", () => {
    expect(progressed).toBe(true);
  });
});
