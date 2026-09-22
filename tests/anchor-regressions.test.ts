import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const h = vi.hoisted(() => ({
  root: `${process.env.TEMP || process.env.TMP || "/tmp"}/otcs-anchor-regression-${process.pid}-${Date.now()}`,
  available: true,
  submit: vi.fn(),
  check: vi.fn(),
}));
vi.mock("node:url", async (load) => {
  const real = await load<typeof import("node:url")>();
  return { ...real, fileURLToPath: (url: any, ...args: any[]) => {
    const path = (real.fileURLToPath as any)(url, ...args);
    return /[\\/]src[\\/]anchor\.ts$/.test(path) ? `${h.root}/src/anchor.ts` : path;
  } };
});
// Exercise persisted Windows separators even on a POSIX CI runner.
vi.mock("node:path", async (load) => {
  const real = await load<typeof import("node:path")>();
  return { ...real, sep: "\\", relative: (from: string, to: string) =>
    real.relative(from, to).split(real.sep).join("\\") };
});
vi.mock("../src/witnesses.js", () => ({ WITNESSES: [{ id: "synthetic", substrate: "local-test", available: () => h.available, submit: h.submit, check: h.check }] }));
import { round, stampPending, status, verify, ROOT, treeDigest } from "../src/anchor.js";
const indexFile = () => join(ROOT, "governance-log", "anchors", "index.json");
const readIndex = () => JSON.parse(readFileSync(indexFile(), "utf8"));
beforeEach(() => {
  if (!ROOT.includes("otcs-anchor-regression-")) throw new Error("fixture root not isolated");
  rmSync(ROOT, { recursive: true, force: true }); mkdirSync(ROOT, { recursive: true });
  writeFileSync(join(ROOT, "input.txt"), "synthetic anchor bytes");
  h.available = true; h.submit.mockReset(); h.check.mockReset();
  h.submit.mockReturnValue({ proofs: ["synthetic-proof"] });
  h.check.mockReturnValue({ state: "CONFIRMED", note: "synthetic confirmation" });
});
afterAll(() => rmSync(ROOT, { recursive: true, force: true }));

it("tree digest uses the portable slash-separated byte vector", () => {
  const dir = join(ROOT, "registry");
  mkdirSync(join(dir, "nested"), { recursive: true });
  writeFileSync(join(dir, "a.txt"), "alpha");
  writeFileSync(join(dir, "nested", "b.txt"), "beta");
  const digest = (s: string) => createHash("sha256").update(s).digest("hex");
  const bytes = `registry/a.txt ${digest("alpha")}\nregistry/nested/b.txt ${digest("beta")}`;
  expect(treeDigest(dir)).toEqual({ sha256: digest(bytes), bytes: Buffer.byteLength(bytes) });
});
it("new index paths use portable forward slashes", () => {
  const { file } = round("portable", ["input.txt"]);
  expect(readIndex()[0].manifest_file).toBe("governance-log/anchors/anchor-0001.json");
  expect(readFileSync(file, "utf8")).toContain('"label": "portable"');
  expect(verify().ok).toBe(true);
});

describe("anchor integrity and retry", () => {
  it("refuses to overwrite an existing manifest when the index is stale", () => {
    const first = round("first", ["input.txt"]);
    const before = readFileSync(first.file);
    writeFileSync(indexFile(), "[]\n");
    expect(() => round("collision", ["input.txt"])).toThrow();
    expect(readFileSync(first.file)).toEqual(before);
    expect(readIndex()).toEqual([]);
  });
  it("retries a failed submission and does not resubmit a successful one", () => {
    round("retry", ["input.txt"]);
    h.submit.mockImplementationOnce(() => { throw new Error("synthetic temporary outage"); });
    stampPending();
    expect(status()[0].witnesses.synthetic.state).toBe("UNKNOWN");
    expect(stampPending().stamped).toEqual(["anchor-0001"]);
    expect(h.submit).toHaveBeenCalledTimes(2);
    stampPending();
    expect(h.submit).toHaveBeenCalledTimes(2);
  });
  it.each(["altered", "missing"])("%s manifest loses confirmed status without witness calls", (kind) => {
    const { file } = round("integrity", ["input.txt"]);
    stampPending(); verify();
    expect(status()[0].status).toBe("ANCHOR_CONFIRMED");
    h.check.mockClear();
    if (kind === "missing") rmSync(file); else writeFileSync(file, readFileSync(file, "utf8") + " ");
    expect(verify().ok).toBe(false);
    expect(h.check).not.toHaveBeenCalled();
    expect(status()[0].status).toBe("ANCHOR_PENDING");
  });
  it("valid manifest is still eligible for confirmation", () => {
    const { file } = round("control", ["input.txt"]);
    const digest = createHash("sha256").update(readFileSync(file)).digest("hex");
    expect(readIndex()[0].manifest_sha256).toBe(digest);
    stampPending();
    expect(verify().ok).toBe(true);
    expect(status()[0].status).toBe("ANCHOR_CONFIRMED");
  });
});

it.each(["altered", "missing"])("refuses %s manifest before submission", (kind) => {
  const { file } = round("pending", ["input.txt"]);
  if (kind === "missing") rmSync(file); else writeFileSync(file, "different bytes");
  expect(stampPending().skipped).toEqual(["anchor-0001"]);
  expect(h.submit).not.toHaveBeenCalled();
});
it.each(["unavailable", "throws"])("clears confirmation when verification %s", (kind) => {
  round("verification", ["input.txt"]); stampPending(); verify();
  expect(status()[0].status).toBe("ANCHOR_CONFIRMED");
  if (kind === "unavailable") h.available = false;
  else h.check.mockImplementation(() => { throw new Error("synthetic verifier failure"); });
  expect(verify().ok).toBe(true); // only manifest/index consistency
  expect(status()[0].status).toBe("ANCHOR_PENDING");
});
it("legacy confirmation is not accepted without client verification", () => {
  round("legacy", ["input.txt"]); stampPending(); verify();
  const data = readIndex(); delete data[0].witnesses.synthetic.verification;
  writeFileSync(indexFile(), JSON.stringify(data));
  expect(status()[0].status).toBe("ANCHOR_PENDING");
  verify(); expect(status()[0].status).toBe("ANCHOR_CONFIRMED");
});
it("all anchor writers refuse an existing lock without changing index", () => {
  round("locked", ["input.txt"]);
  const before = readFileSync(indexFile());
  writeFileSync(indexFile() + ".lock", "held elsewhere");
  for (const action of [() => round("second", ["input.txt"]), stampPending, verify]) expect(action).toThrow();
  expect(readFileSync(indexFile())).toEqual(before);
  expect(h.submit).not.toHaveBeenCalled(); expect(h.check).not.toHaveBeenCalled();
  rmSync(indexFile() + ".lock");
});
it("refuses an index path outside the named manifest even with a matching hash", () => {
  round("path", ["input.txt"]);
  const data = readIndex();
  data[0].manifest_file = "input.txt";
  data[0].manifest_sha256 = createHash("sha256").update(readFileSync(join(ROOT, "input.txt"))).digest("hex");
  writeFileSync(indexFile(), JSON.stringify(data));
  expect(stampPending().skipped).toEqual(["anchor-0001"]);
  expect(h.submit).not.toHaveBeenCalled();
  expect(verify().ok).toBe(false);
  expect(h.check).not.toHaveBeenCalled();
});
