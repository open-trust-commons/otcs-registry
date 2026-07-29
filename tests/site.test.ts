import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { build, DIST } from "../src/sitegen.js";

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

describe("site build", () => {
  it("is deterministic — two builds produce identical files", () => {
    const first = new Map(build().map((f) => [f, readFileSync(join(DIST, f), "utf8")]));
    for (const [f, content] of new Map(build().map((f) => [f, readFileSync(join(DIST, f), "utf8")])))
      expect(content, f).toBe(first.get(f));
  });

  it("has no dangling internal links", () => {
    build();
    const pages = walk(DIST).filter((p) => p.endsWith(".html"));
    const missing: string[] = [];
    for (const page of pages) {
      const html = readFileSync(page, "utf8");
      for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
        const url = m[1];
        if (/^(https?:|mailto:|#)/.test(url)) continue;
        const target = resolve(dirname(page), url.split("#")[0]);
        if (!existsSync(target)) missing.push(`${page.replace(DIST, "")} → ${url}`);
      }
    }
    expect(missing).toEqual([]);
  });

  it("carries no forbidden positioning copy and no collapsed maturity badge", () => {
    build();
    for (const page of walk(DIST).filter((p) => p.endsWith(".html"))) {
      const html = readFileSync(page, "utf8");
      expect(html, page).not.toMatch(/missing layer/i);
      expect(html, page).not.toMatch(/GitHub for trust/i);
      // a maturity profile is a 3-column table; a lone "M3"-style badge outside one is prohibited
      expect(html, page).not.toMatch(/class="badge[^"]*">M[0-5]</);
    }
  });

  it("watermarks example records and renders honest zeros", () => {
    build();
    const ex = readFileSync(join(DIST, "projects/ex-gatekeeper.html"), "utf8");
    expect(ex).toMatch(/example-banner/);
    const ktp = readFileSync(join(DIST, "projects/ktp.html"), "utf8");
    expect(ktp).toMatch(/independent validation/);
    expect(ktp).toMatch(/M0/);
  });
});
