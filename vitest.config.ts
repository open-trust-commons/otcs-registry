import { defineConfig } from "vitest/config";

// Bound concurrent subprocess-heavy suites on shared development and CI hosts.
// `maxWorkers: 1` is the bound; vitest 5 removed `minWorkers` from InlineConfig,
// and with a ceiling of one worker a floor could never have differed from it.
export default defineConfig({
  test: { setupFiles: ["./tests/runtime-setup.ts"], maxWorkers: 1 },
});
