import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { parse } from "yaml";
describe("anchor CI verification exit", () => {
  it.each([0, 1])("preserves verification exit %s", (code) => {
    const workflow = parse(readFileSync(".github/workflows/anchor.yml", "utf8"));
    const step = workflow.jobs.upgrade.steps.find((s: any) => s.name === "Re-verify and record state");
    const node = process.execPath.replace(/\\/g, "/");
    const shell = process.platform === "win32" ? "C:/Program Files/Git/bin/bash.exe" : "/bin/bash";
    const script = step.run.replace("npm run anchor:verify", `'${node}' -e 'process.exit(${code})'`);
    expect(script).not.toBe(step.run);
    const result = spawnSync(shell, ["-c", script], { encoding: "utf8", timeout: 10000 });
    expect(result.status, result.stderr).toBe(code);
  });
});
