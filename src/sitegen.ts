// OTCS static site generator — deterministic build into site/dist.
// Inputs: declared records (registry/, proposals/, *.md) + computed/ artifacts.
import { writeFileSync, mkdirSync, readFileSync, rmSync, existsSync } from "node:fs";
import { join } from "node:path";
import { ROOT } from "./registry-load.js";
import { layout } from "./html.js";
import { pages } from "./pages.js";

export const DIST = join(ROOT, "site", "dist");

export function build(): string[] {
  rmSync(DIST, { recursive: true, force: true });
  mkdirSync(DIST, { recursive: true });
  writeFileSync(join(DIST, "style.css"), readFileSync(join(ROOT, "site/static/style.css")));
  const written: string[] = ["style.css"];
  for (const page of pages()) {
    const dir = join(DIST, ...page.path.split("/").slice(0, -1));
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    const depth = page.path.split("/").length - 1;
    writeFileSync(join(DIST, page.path), layout(page.title, page.body, depth) + "\n");
    written.push(page.path);
  }
  return written.sort();
}

if (process.argv[1]?.endsWith("sitegen.ts")) {
  const written = build();
  console.log(`site/dist: ${written.length} files\n  ` + written.join("\n  "));
}
