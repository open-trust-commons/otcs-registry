import { describe, it, expect } from "vitest";
import { spawnSync } from "node:child_process";
import { ROOT } from "../src/registry-load.js";
import { esc, badge, maturityProfile } from "../src/html.js";
import { mdToHtml } from "../src/md.js";
import { projectPage } from "../src/pages-projects.js";

const project = (url: string) => ({ project: {
  id: "render-fixture", name: "Fixture", status: "active", record_state: "registered",
  first_public_date: "2026-01-01", license: "Apache-2.0", canonical_url: url,
} });

// A parser regression must fail within a deadline, without freezing the test worker.
const renderBounded = (source: string): string => {
  const child = spawnSync(process.execPath, ["--import", "tsx", "--input-type=module", "-e",
    'import {mdToHtml} from "./src/md.ts"; process.stdout.write(mdToHtml(JSON.parse(process.argv[1])));',
    JSON.stringify(source)], { cwd: ROOT, encoding: "utf8", timeout: 3000 });
  expect(child.error, "renderer exceeded deadline or failed to start").toBeUndefined();
  expect(child.status, child.stderr).toBe(0);
  return child.stdout;
};

describe("HTML output boundaries", () => {
  it("escapes quotes at attribute boundaries", () => {
    expect(esc('" onmouseover="bad')).toBe('&quot; onmouseover=&quot;bad');
    expect(esc("' onclick='bad")).toBe('&#39; onclick=&#39;bad');
    expect(esc("plain text")).toBe("plain text");
  });
  it("does not create links for executable URL schemes", () => {
    for (const url of ["javascript:alert", "JaVaScRiPt:alert", "data:text/html,hello", "vbscript:msgbox"]) {
      const html = mdToHtml(`[label](${url})`);
      expect(html, url).not.toContain("<a ");
      expect(html).toContain("label");
    }
  });
  it("preserves ordinary links and treats their destinations as attribute data", () => {
    for (const url of ["https://example.org/a?x=1&y=2", "http://example.org/", "mailto:a@example.org", "./doc.html#x", "#x"]) {
      expect(mdToHtml(`[label](${url})`)).toContain(`<a href="${esc(url)}">label</a>`);
    }
    expect(mdToHtml('[label](https://example.org/"onmouseover="bad)'))
      .toBe('<p><a href="https://example.org/&quot;onmouseover=&quot;bad">label</a></p>');
    expect(mdToHtml('[label](https://example.org/**x**)'))
      .toBe('<p><a href="https://example.org/**x**">label</a></p>');
  });
  it("applies URL restrictions to project canonical links too", () => {
    expect(projectPage(project("javascript:alert"), []).body).not.toContain('<a href="javascript:');
    expect(projectPage(project('https://example.org/"onclick="bad'), []).body)
      .toContain('href="https://example.org/&quot;onclick=&quot;bad"');
    expect(projectPage(project("https://example.org/"), []).body)
      .toContain('<a href="https://example.org/">canonical</a>');
  });
  it("escapes unvalidated numeric fields before rendering them", () => {
    const payload = '<img src=x onerror=alert(1)>';
    const evidence = { specification: payload, implementation: payload, independent_validation: payload } as any;
    const html = maturityProfile(evidence) + projectPage({ ...project("https://example.org/"),
      coordinates: { actor: { test: payload }, functions: { test: payload } } }, []).body;
    expect(html).not.toContain("<img");
    expect(html).toContain("&lt;img");
    expect(maturityProfile({ specification: 2 })).toContain("<td>M2</td>");
  });
});

describe("Markdown progress and line endings", () => {
  it("renders CRLF and LF documents identically", () => {
    const source = "# Heading\n\n- entry\n\n| a | b |\n| -- | -- |\n| c | d |\n\n```\ncode\n```\n";
    const expected = '<h1>Heading</h1>\n<ul><li>entry</li></ul>\n<table><thead><tr><th>a</th><th>b</th></tr></thead><tbody><tr><td>c</td><td>d</td></tr></tbody></table>\n<pre><code>code</code></pre>';
    expect(renderBounded(source)).toBe(expected);
    expect(renderBounded(source.replace(/\n/g, "\r\n"))).toBe(renderBounded(source));
    expect(renderBounded(source.replace(/\n/g, "\r"))).toBe(renderBounded(source));
  });
  it.each(["| incomplete", "   | incomplete\nnext line", "| -- | -- |", "| :-- | --: |\n| -- | -- |"])("consumes incomplete table-like input: %s", (source) => {
      const html = renderBounded(source);
      expect(html).toContain("<p>");
      expect(html).toContain(source.split("\n")[0].trim());
    });
});


describe("Rendering values and literal code", () => {
  it("uses fallback badge classes for inherited object property names", () => {
    for (const name of ["constructor", "toString", "valueOf", "hasOwnProperty"])
      expect(badge(name)).toBe(`<span class="badge b-grey">${name}</span>`);
    expect(badge("registered")).toBe('<span class="badge b-green">registered</span>');
  });
  it("escapes non-string YAML values through the shared boundary", () => {
    expect(esc(12)).toBe("12");
    expect(esc(["<img>"])).toBe("&lt;img&gt;");
    const html = projectPage({ ...project("https://example.org/"),
      declaration: { governed_object: [1, "<img>"] } }, []).body;
    expect(html).toContain("1, &lt;img&gt;");
  });
  it("keeps emphasis and links literal inside code spans", () => {
    expect(mdToHtml("`a**b**c` *outside*")).toBe('<p><code>a**b**c</code> <em>outside</em></p>');
    expect(mdToHtml("`[x](https://example.org/)` <tag>"))
      .toBe('<p><code>[x](https://example.org/)</code> &lt;tag&gt;</p>');
    expect(mdToHtml("[a `x*y*` b](https://example.org/)"))
      .toBe('<p><a href="https://example.org/">a <code>x*y*</code> b</a></p>');
  });
});
