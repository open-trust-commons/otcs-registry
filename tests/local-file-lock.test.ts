import { afterEach, describe, expect, it, vi } from "vitest";
import { mkdtempSync, readFileSync, writeFileSync, rmSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";
const h = vi.hoisted(() => ({ failRename: false }));
vi.mock("node:fs", async (load) => {
  const real = await load<typeof import("node:fs")>();
  return { ...real, renameSync: (...args: Parameters<typeof real.renameSync>) => {
    if (h.failRename) throw new Error("synthetic rename failure");
    return real.renameSync(...args);
  } };
});
import { withFileLock, replaceFile } from "../src/local-file-lock.js";
const roots: string[] = [];
function target() { const root = mkdtempSync(join(tmpdir(), "otcs-lock-test-")); roots.push(root); return join(root, "index.json"); }
afterEach(() => { h.failRename = false; for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true }); });
describe("local writer exclusion", () => {
  it("excludes another process while held and admits it after release", () => {
    const file = target();
    const child = () => spawnSync(process.execPath, ["--import", "tsx", "--input-type=module", "-e",
      'import {withFileLock} from "./src/local-file-lock.ts"; withFileLock(process.argv[1], () => console.log("entered"));', file], { encoding: "utf8", timeout: 20000 });
    withFileLock(file, () => {
      const result = child(); expect(result.status).not.toBe(0); expect(result.stderr).toContain("EEXIST"); expect(result.stdout).not.toContain("entered");
    });
    const result = child(); expect(result.status).toBe(0); expect(result.stdout).toContain("entered");
  });
  it("releases the lock when the action throws", () => {
    const file = target();
    expect(() => withFileLock(file, () => { throw new Error("synthetic action failure"); })).toThrow("synthetic action failure");
    expect(existsSync(file + ".lock")).toBe(false);
    expect(withFileLock(file, () => 42)).toBe(42);
  });
  it("retains the previous index if replacement fails, then allows retry", () => {
    const file = target(); writeFileSync(file, "old complete bytes");
    h.failRename = true;
    expect(() => replaceFile(file, "new complete bytes")).toThrow("synthetic rename failure");
    expect(readFileSync(file, "utf8")).toBe("old complete bytes");
    expect(readdirSync(join(file, ".."))).toEqual(["index.json"]);
    h.failRename = false; replaceFile(file, "new complete bytes");
    expect(readFileSync(file, "utf8")).toBe("new complete bytes");
  });
});
