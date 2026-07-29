// Minimal deterministic Markdown → HTML for OTCS docs (headers, emphasis, code,
// fences, lists, tables, blockquotes, links, hr). No external dependencies.
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const inline = (s: string): string =>
  esc(s)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');

export function mdToHtml(md: string): string {
  const lines = md.split("\n");
  const out: string[] = [];
  let i = 0;
  const isTableRow = (l: string) => /^\s*\|.*\|\s*$/.test(l);
  while (i < lines.length) {
    const line = lines[i];
    if (/^```/.test(line)) {                        // fenced code
      const buf: string[] = []; i++;
      while (i < lines.length && !/^```/.test(lines[i])) buf.push(esc(lines[i++]));
      i++; out.push(`<pre><code>${buf.join("\n")}</code></pre>`); continue;
    }
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) { out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`); i++; continue; }
    if (/^---+\s*$/.test(line)) { out.push("<hr>"); i++; continue; }
    if (/^\s*>/.test(line)) {                       // blockquote
      const buf: string[] = [];
      while (i < lines.length && /^\s*>/.test(lines[i])) buf.push(inline(lines[i++].replace(/^\s*>\s?/, "")));
      out.push(`<blockquote><p>${buf.join("<br>")}</p></blockquote>`); continue;
    }
    if (isTableRow(line)) {                         // table
      const rows: string[][] = [];
      while (i < lines.length && isTableRow(lines[i])) {
        const cells = lines[i].trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
        if (!cells.every((c) => /^:?-{2,}:?$/.test(c))) rows.push(cells);
        i++;
      }
      const [head, ...body] = rows;
      out.push("<table><thead><tr>" + head.map((c) => `<th>${inline(c)}</th>`).join("") + "</tr></thead><tbody>" +
        body.map((r) => "<tr>" + r.map((c) => `<td>${inline(c)}</td>`).join("") + "</tr>").join("") + "</tbody></table>");
      continue;
    }
    if (/^\s*[-*]\s+/.test(line)) {                 // unordered list
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) items.push(inline(lines[i++].replace(/^\s*[-*]\s+/, "")));
      out.push("<ul>" + items.map((it) => `<li>${it}</li>`).join("") + "</ul>"); continue;
    }
    if (/^\s*\d+\.\s+/.test(line)) {                // ordered list
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) items.push(inline(lines[i++].replace(/^\s*\d+\.\s+/, "")));
      out.push("<ol>" + items.map((it) => `<li>${it}</li>`).join("") + "</ol>"); continue;
    }
    if (line.trim() === "") { i++; continue; }
    const buf: string[] = [];                        // paragraph
    while (i < lines.length && lines[i].trim() !== "" && !/^(#{1,4}\s|```|---+\s*$|\s*[-*]\s|\s*\d+\.\s|\s*>|\s*\|)/.test(lines[i]))
      buf.push(inline(lines[i++]));
    if (buf.length) out.push(`<p>${buf.join(" ")}</p>`);
  }
  return out.join("\n");
}
