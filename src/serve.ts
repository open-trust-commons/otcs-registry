// Zero-dependency static server for site/dist (local preview only).
import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { join, extname } from "node:path";
import { DIST } from "./sitegen.js";

const TYPES: Record<string, string> = { ".html": "text/html", ".css": "text/css", ".json": "application/json" };
const PORT = 8138;
createServer((req, res) => {
  let p = join(DIST, decodeURIComponent((req.url ?? "/").split("?")[0]));
  if (p.endsWith("/")) p += "index.html";
  if (!p.startsWith(DIST) || !existsSync(p)) { res.writeHead(404); res.end("not found"); return; }
  res.writeHead(200, { "content-type": TYPES[extname(p)] ?? "application/octet-stream" });
  res.end(readFileSync(p));
}).listen(PORT, () => console.log(`OTCS site: http://localhost:${PORT}`));
