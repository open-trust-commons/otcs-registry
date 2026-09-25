import { describe, it, expect } from "vitest";

// Ordering is load-bearing: the first case queues work with setImmediate and the
// second asserts it has already run. vitest runs the cases in a file in order
// unless a suite or the config opts into concurrency, and nothing here does.
//
// vitest 5 removed the `describe.sequential` modifier this suite used, and its
// `SuiteOptions` has no `sequential` key to replace it with, so the guarantee
// cannot be restated inline. If global concurrency is ever enabled, this suite
// breaks and the fix is to isolate the state rather than to reorder the cases.
describe("event-loop progress between cases", () => {
  let progressed = false;
  it("queues ready work", () => {
    expect(progressed).toBe(false);
    setImmediate(() => { progressed = true; });
  });
  it("delivers ready work before the next case", () => {
    expect(progressed).toBe(true);
  });
});
