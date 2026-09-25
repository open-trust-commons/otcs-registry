import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";

vi.mock("node:fs", async () => {
  const actual = await vi.importActual<typeof import("node:fs")>("node:fs");
  return { ...actual, readFileSync: vi.fn(actual.readFileSync) };
});
const nativeRead = (await vi.importActual<typeof import("node:fs")>("node:fs")).readFileSync;
const readFile = vi.mocked(readFileSync);
let output: string[], errors: string[];

beforeEach(() => {
  vi.resetModules();
  readFile.mockImplementation(nativeRead);
  output = []; errors = [];
  vi.spyOn(console, "log").mockImplementation((...args) => output.push(args.join(" ")));
  vi.spyOn(console, "error").mockImplementation((...args) => errors.push(args.join(" ")));
  vi.spyOn(process, "exit").mockImplementation((code) => { throw new Error(`EXIT:${code}`); });
});
afterEach(() => vi.restoreAllMocks());

function replaceDocument(suffix: string, body: string) {
  readFile.mockImplementation(((path: any, options: any) => {
    const original = nativeRead(path, options);
    return String(path).replaceAll("\\", "/").endsWith(suffix) ? body : original;
  }) as any);
}

async function expectCompleteRun() {
  await expect(import("../src/validate.js")).rejects.toThrow("EXIT:0");
  expect(output.join("\n")).toMatch(/validate: \d+ passed, 0 failed/);
  expect(errors).toEqual([]);
}

describe("schema and semantic validation ordering", () => {
  it("completes the real valid and invalid fixture suite", expectCompleteRun);

  it.each([
    ["null claim", "claim", "null\n"],
    ["null manifest", "project-manifest", "null\n"],
    ["non-array environment", "project-manifest", "coordinates:\n  environment: 7\n"],
    ["non-array time", "project-manifest", "coordinates:\n  time: 7\n"],
  ])("handles schema-invalid fixture: %s", async (_label, schema, body) => {
    replaceDocument(`/schemas/examples/${schema}/invalid-1.yaml`, body);
    await expectCompleteRun();
  });

  it("still rejects schema-valid claims with unsupported maturity", async () => {
    replaceDocument("/schemas/examples/claim/valid-1.yaml", [
      "project: ktp", "class: IMPLEMENTATION", "content: A claim without independent evidence.",
      'date: "2026-07-25"', "evidence_state: SELF_ASSERTED", "maturity: 4", "",
    ].join("\n"));
    await expect(import("../src/validate.js")).rejects.toThrow("EXIT:1");
    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("examples/claim/valid-1.yaml: expected VALID");
    expect(errors[0]).toContain("maturity 4 requires INDEPENDENTLY_TESTED or FIELD_OBSERVED");
  });
});


describe("registry document validation", () => {
  it.each([
    ["null manifest", "/registry/projects/abt/otcs.yaml", "null\n", "expected VALID"],
    ["invalid project", "/registry/projects/abt/otcs.yaml", "project: 7\n", "expected VALID"],
    ["null relationships", "/registry/projects/abt/relationships.yaml", "null\n", "expected YAML sequence"],
    ["mapping relationships", "/registry/projects/abt/relationships.yaml", "unexpected: value\n", "expected YAML sequence"],
    ["scalar relationships", "/registry/projects/abt/relationships.yaml", "7\n", "expected YAML sequence"],
    ["null claims", "/registry/projects/abt/claims.yaml", "null\n", "expected YAML sequence"],
    ["mapping claims", "/registry/projects/abt/claims.yaml", "unexpected: value\n", "expected YAML sequence"],
    ["scalar claims", "/registry/projects/abt/claims.yaml", "7\n", "expected YAML sequence"],
    ["null relationship entry", "/registry/projects/abt/relationships.yaml", "- null\n", "expected VALID"],
    ["invalid relationship source", "/registry/projects/abt/relationships.yaml", "- source_project: 7\n", "expected VALID"],
    ["mapping use evidence", "/evidence/use-instances.yaml", "unexpected: value\n", "expected YAML sequence"],
    ["scalar use evidence", "/evidence/use-instances.yaml", "7\n", "expected YAML sequence"],
    ["mapping contact log", "/evidence/contact-log.yaml", "unexpected: value\n", "expected YAML sequence"],
    ["scalar contact log", "/evidence/contact-log.yaml", "7\n", "expected YAML sequence"],
  ])("reports one validation failure for %s", async (_name, suffix, body, reason) => {
    replaceDocument(suffix, body);
    await expect(import("../src/validate.js")).rejects.toThrow("EXIT:1");
    expect(output.join("\n")).toMatch(/validate: \d+ passed, 1 failed/);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain(suffix.replace("/registry/projects/", "registry/").replace(/^\//, ""));
    expect(errors[0]).toContain(reason);
  });

  it.each([
    ["empty relationship list", "/registry/projects/abt/relationships.yaml", "[]\n"],
    ["empty claim list", "/registry/projects/abt/claims.yaml", "[]\n"],
    ["empty use list", "/evidence/use-instances.yaml", "[]\n"],
    ["empty contact list", "/evidence/contact-log.yaml", "[]\n"],
    ["blank use file", "/evidence/use-instances.yaml", "# No records yet.\n"],
    ["blank contact file", "/evidence/contact-log.yaml", "# No records yet.\n"],
  ])("preserves the allowed %s", async (_name, suffix, body) => {
    replaceDocument(suffix, body);
    await expectCompleteRun();
  });

  it("still rejects a schema-valid dangling relationship", async () => {
    const source = nativeRead(new URL("../registry/projects/abt/relationships.yaml", import.meta.url), "utf8");
    expect(source).toContain("source_project: abt");
    replaceDocument("/registry/projects/abt/relationships.yaml", source.replace("source_project: abt", "source_project: missing-project"));
    await expect(import("../src/validate.js")).rejects.toThrow("EXIT:1");
    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain('registry/abt/relationships.yaml[0]: source_project "missing-project" is not a registered record');
  });
});
