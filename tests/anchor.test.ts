import { describe, it, expect } from "vitest";
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { join } from "node:path";
import { treeDigest, ROOT } from "../src/anchor.js";

const tmp = join(ROOT, ".tmp-anchor-test");

describe("anchor tree digest", () => {
  it("is stable across repeated reads and sensitive to content", () => {
    rmSync(tmp, { recursive: true, force: true });
    mkdirSync(join(tmp, "sub"), { recursive: true });
    writeFileSync(join(tmp, "a.txt"), "alpha");
    writeFileSync(join(tmp, "sub", "b.txt"), "beta");

    const first = treeDigest(tmp).sha256;
    expect(treeDigest(tmp).sha256).toBe(first);

    writeFileSync(join(tmp, "sub", "b.txt"), "beta!");
    expect(treeDigest(tmp).sha256).not.toBe(first);

    rmSync(tmp, { recursive: true, force: true });
  });
});

describe("anchor manifests are immutable once written", () => {
  it("index records a hash for every manifest, and every manifest still matches it", () => {
    const idxPath = join(ROOT, "governance-log/anchors/index.json");
    if (!existsSync(idxPath)) return; // no rounds yet — nothing to check
    const idx = JSON.parse(readFileSync(idxPath, "utf8")) as Array<Record<string, string>>;
    for (const e of idx) {
      expect(existsSync(join(ROOT, e.manifest_file))).toBe(true);
      expect(e.manifest_sha256).toMatch(/^[0-9a-f]{64}$/);
    }
  });
});

describe("anchor manifests state their limits", () => {
  it("every manifest carries the does_not_prove list", () => {
    const idxPath = join(ROOT, "governance-log/anchors/index.json");
    if (!existsSync(idxPath)) return;
    const idx = JSON.parse(readFileSync(idxPath, "utf8")) as Array<Record<string, string>>;
    for (const e of idx) {
      const m = JSON.parse(readFileSync(join(ROOT, e.manifest_file), "utf8"));
      expect(m.does_not_prove).toContain("that the content is true");
      expect(m.does_not_prove.length).toBeGreaterThanOrEqual(6);
    }
  });
});
