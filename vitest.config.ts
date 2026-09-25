import { defineConfig } from "vitest/config";

// Bound concurrent subprocess-heavy suites on shared development and CI hosts.
export default defineConfig({
  test: { setupFiles: ["./tests/runtime-setup.ts"], maxWorkers: 1, minWorkers: 1 },
});
