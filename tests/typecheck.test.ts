import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, readdirSync, rmSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";
import { parse } from "yaml";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const paths = ["src/input.ts", "tests/input.test.ts", "vitest.config.ts"];
function compile(sources: string[]) {
  const scratch = resolve(process.env.OTCS_TEST_SCRATCH ?? tmpdir());
  const fixture = mkdtempSync(join(scratch, "otcs-typecheck-"));
  if (dirname(fixture) !== scratch || !/^otcs-typecheck-[^/\\]+$/.test(basename(fixture))) throw new Error("Unexpected fixture path");
  try {
    const config = JSON.parse(readFileSync(join(root, "tsconfig.json"), "utf8"));
    // Only dependency lookup changes: the fixture uses the installed Node types.
    config.compilerOptions.typeRoots = [join(root, "node_modules/@types")];
    writeFileSync(join(fixture, "tsconfig.json"), JSON.stringify(config));
    writeFileSync(join(fixture, "package.json"), '{"type":"module"}');
    for (const [index, file] of paths.entries()) {
      mkdirSync(dirname(join(fixture, file)), { recursive: true });
      writeFileSync(join(fixture, file), sources[index]);
    }
    const result = spawnSync(process.execPath,
      [join(root, "node_modules/typescript/bin/tsc"), "--project", join(fixture, "tsconfig.json"), "--pretty", "false"],
      { cwd: fixture, encoding: "utf8", timeout: 30000 });
    expect(result.error).toBeUndefined();
    expect(result.signal).toBeNull();
    expect(result.stderr).toBe("");
    const diagnostics = [...result.stdout.replaceAll("\\", "/").matchAll(/^(.+)\(\d+,\d+\): error TS(\d+):/gm)]
      .map(match => [match[1], Number(match[2])]).sort((a, b) => String(a[0]).localeCompare(String(b[0])));
    const emitted = readdirSync(fixture, { recursive: true }).filter(file => String(file).endsWith(".js"));
    return { status: result.status, output: result.stdout, diagnostics, emitted };
  } finally {
    rmSync(fixture, { recursive: true });
  }
}
describe("TypeScript project configuration", () => {
  it("accepts valid Node modules and narrowing without emitting JavaScript", () => {
    const result = compile([
      'import { Buffer } from "node:buffer"; export const value: number = Buffer.byteLength("text");',
      'import { value } from "../src/input.js"; export const result: number = value;',
      'export function size(value: string | null): number { return value === null ? 0 : value.length; }',
    ]);
    expect(result.status, result.output).toBe(0);
    expect(result.output).toBe("");
    expect(result.emitted).toEqual([]);
  }, 40000);
  it("rejects incompatible types in source, tests and configuration", () => {
    const result = compile(paths.map(() => 'export const value: number = "wrong";'));
    expect(result.status, result.output).toBe(2);
    expect(result.diagnostics).toEqual(paths.map(file => [file, 2322]));
  }, 40000);
  it("rejects implicit any and an unguarded null assignment", () => {
    const result = compile([
      "export function echo(value) { return value; }",
      "export const value: string = null;",
      "export const value: number = 1;",
    ]);
    expect(result.status, result.output).toBe(2);
    expect(result.diagnostics).toEqual([["src/input.ts", 7006], ["tests/input.test.ts", 2322]]);
  }, 40000);
  it("connects the compiler to local checks and CI", () => {
    const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
    const ci = parse(readFileSync(join(root, ".github/workflows/ci.yml"), "utf8"));
    expect(pkg.scripts.typecheck).toBe("tsc --project tsconfig.json");
    expect(pkg.scripts.check.split(" && ").slice(0, 3)).toEqual(["npm run lint", "npm run typecheck", "npm run validate"]);
    expect(ci.jobs.typecheck.steps.some((step: { run?: string }) => step.run === "npm run typecheck")).toBe(true);
  });
});
