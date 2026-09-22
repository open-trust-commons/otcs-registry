import { afterEach } from "vitest";
import { setImmediate as yieldEventLoop } from "node:timers/promises";

// Let worker replies and ready I/O run between synchronous scenarios.
afterEach(() => yieldEventLoop());
