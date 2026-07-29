import { describe, it, expect } from "vitest";
import { esc } from "../src/html.js";
import { mdToHtml } from "../src/md.js";

// A malicious project record must not be able to inject markup into the public site.
const HOSTILE = [
  '<script>alert(1)</script>',
  '"><img src=x onerror=alert(1)>',
  "javascript:alert(1)",
  '<svg onload=alert(1)>',
  '</td></tr><tr><td>injected',
  '<iframe src="evil"></iframe>',
  "‮gnp.exe",                  // RTL override — filename spoofing
  "а/../../etc/passwd",             // Cyrillic homoglyph + traversal
];

describe("stored-XSS resistance", () => {
  it("escapes every hostile string past the HTML boundary", () => {
    for (const h of HOSTILE) {
      const out = esc(h);
      expect(out, h).not.toMatch(/<script/i);
      expect(out, h).not.toMatch(/<img/i);
      expect(out, h).not.toMatch(/<svg/i);
      expect(out, h).not.toMatch(/<iframe/i);
      expect(out, h).not.toMatch(/<\/t[dr]>/i);
      expect(out).not.toContain("<");
      expect(out).not.toContain(">");
    }
  });

  it("markdown renderer escapes raw HTML in source documents", () => {
    const out = mdToHtml('# Title\n\n<script>alert(1)</script>\n\nnormal text');
    expect(out).not.toMatch(/<script/i);
    expect(out).toContain("&lt;script&gt;");
  });

  it("markdown link syntax cannot smuggle a tag through the href", () => {
    const out = mdToHtml('[click](javascript:alert&#40;1&#41;)');
    expect(out).not.toMatch(/<script/i);
    expect(out).not.toContain('"><');
  });

  it("oversized input does not crash the renderer", () => {
    const big = "a".repeat(200_000);
    expect(() => mdToHtml(big)).not.toThrow();
    expect(esc(big).length).toBeGreaterThan(0);
  });
});
