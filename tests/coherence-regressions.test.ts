import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ROOT } from "../src/registry-load.js";
import { execFileSync } from "node:child_process";

vi.mock("node:fs", async () => {
  const actual = await vi.importActual<typeof import("node:fs")>("node:fs");
  return { ...actual, readFileSync: vi.fn(actual.readFileSync) };
});
const nativeRead = (await vi.importActual<typeof import("node:fs")>("node:fs")).readFileSync;
const readFile = vi.mocked(readFileSync);
const runIgnoringOtherFindings = async () => {
  try { await import("../src/coherence.js"); }
  catch (error) { if (!(error instanceof Error) || error.message !== "EXIT:1") throw error; }
};
const appendToReadme = (text: string) => readFile.mockImplementation(((path: Parameters<typeof nativeRead>[0], options: Parameters<typeof nativeRead>[1]) => {
  const body = nativeRead(path, options);
  return String(path).replaceAll("\\", "/").endsWith("/README.md") && typeof body === "string" ? body + "\n" + text : body;
}) as any);

vi.mock("node:child_process", () => ({ execFileSync: vi.fn() }));
const command = vi.mocked(execFileSync);
const files = (dir: string, prefix = ""): string[] => readdirSync(dir, { withFileTypes: true })
  .filter(e => ![".git", "node_modules", "dist"].includes(e.name))
  .flatMap(e => e.isDirectory() ? files(join(dir, e.name), prefix + e.name + "/") : [prefix + e.name]);
let output: string[];

beforeEach(() => {
  vi.resetModules(); command.mockReset(); readFile.mockImplementation(nativeRead); output = [];
  vi.spyOn(console, "log").mockImplementation((...args) => { output.push(args.join(" ")); });
  vi.spyOn(process, "exit").mockImplementation((code) => { throw new Error(`EXIT:${code}`); });
});
afterEach(() => vi.restoreAllMocks());

describe("Git coverage of document links", () => {
  it("refuses a linked document missing from an otherwise complete inventory", async () => {
    command.mockReturnValue(files(ROOT).filter(f => f !== "EVIDENCE-MODEL.md").join("\n"));
    await expect(import("../src/coherence.js")).rejects.toThrow("EXIT:1");
    expect(output.join("\n")).toContain("links EVIDENCE-MODEL.md, which git does not track");
  });
  it("keeps Git coverage separate from an unrelated count finding", async () => {
    command.mockReturnValue(files(ROOT).join("\n"));
    readFile.mockImplementation(((path: Parameters<typeof nativeRead>[0], options: Parameters<typeof nativeRead>[1]) => {
      const body = nativeRead(path, options);
      return String(path).endsWith("ROADMAP.md") && typeof body === "string"
        ? body.replace(/\d+ files under `schemas\/`/, "9999 files under `schemas/`") : body;
    }) as any);
    await runIgnoringOtherFindings();
    expect(output.join("\n")).toContain("claims 9999 schemas");
    expect(output.join("\n")).toContain("UNTRACKED ok");
  });
  it("refuses to certify tracking when Git cannot be read", async () => {
    command.mockImplementation(() => { throw new Error("Git unavailable"); });
    await expect(import("../src/coherence.js")).rejects.toThrow("EXIT:1");
    expect(output.join("\n")).toContain("Git tracking could not be measured");
    expect(command).toHaveBeenCalledWith("git", ["ls-files"], expect.objectContaining({ cwd: ROOT }));
  });
  it("refuses an empty tracking inventory", async () => {
    command.mockReturnValue("");
    await expect(import("../src/coherence.js")).rejects.toThrow("EXIT:1");
    expect(output.join("\n")).toContain("Git index contains no tracked files");
  });
  it("accepts a complete tracking inventory", async () => {
    command.mockReturnValue(files(ROOT).join("\n"));
    await runIgnoringOtherFindings();
    expect(output.join("\n")).toContain("UNTRACKED ok");
  });
});

describe("Version and section citation boundaries", () => {
  beforeEach(() => command.mockReturnValue(files(ROOT).join("\n")));
  it("rejects genuine incubation tags but accepts longer version tokens", async () => {
    appendToReadme("v10.0.3 1.0.0.2 v0.0.3.1 0.0.31suffix");
    await runIgnoringOtherFindings();
    expect(output.join("\n")).toMatch(/VERSION\s+ok/);
    vi.resetModules(); output = [];
    appendToReadme("A release v0.0.3 is cited here.");
    await runIgnoringOtherFindings();
    expect(output.join("\n")).toContain("cites incubation tag v0.0.3");
  });
  it("accepts an uppercase numbered suffix while refusing an absent section", async () => {
    readFile.mockImplementation(((path: Parameters<typeof nativeRead>[0], options: Parameters<typeof nativeRead>[1]) => {
      const body = nativeRead(path, options);
      if (typeof body !== "string") return body;
      if (String(path).endsWith("GOVERNANCE.md")) return body + "\n## 99b. Fixture section\n";
      if (String(path).endsWith("README.md")) return body + "\nGOVERNANCE.md §99B\nGOVERNANCE.md §999\n";
      return body;
    }) as any);
    await runIgnoringOtherFindings();
    expect(output.join("\n")).not.toContain("§99B does not exist");
    expect(output.join("\n")).toContain("§999 does not exist");
  });
});
