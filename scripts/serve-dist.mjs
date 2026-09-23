// Local preview of the production build: serves app/dist/client as static files and
// forwards everything else to the Worker bundle's fetch() handler, as Cloudflare does.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("../app/dist/", import.meta.url));
const worker = (await import(pathToFileURL(join(root, "server/server.js")).href)).default;
const port = Number(process.env.PORT ?? 4173);
const TYPES = {
  ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png",
  ".jpg": "image/jpeg", ".webp": "image/webp", ".avif": "image/avif", ".woff2": "font/woff2",
  ".json": "application/json", ".txt": "text/plain", ".ico": "image/x-icon",
};

createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://localhost:${port}`);
  const file = normalize(join(root, "client", decodeURIComponent(url.pathname)));
  if (file.startsWith(join(root, "client")) && url.pathname !== "/") {
    try {
      if ((await stat(file)).isFile()) {
        res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
        res.end(await readFile(file));
        return;
      }
    } catch {}
  }
  const chunks = [];
  for await (const c of req) chunks.push(c);
  const request = new Request(url, {
    method: req.method,
    headers: req.headers,
    body: ["GET", "HEAD"].includes(req.method ?? "GET") ? undefined : Buffer.concat(chunks),
  });
  const response = await worker.fetch(request, {}, {});
  res.writeHead(response.status, Object.fromEntries(response.headers));
  res.end(Buffer.from(await response.arrayBuffer()));
}).listen(port, "127.0.0.1", () => console.log(`http://127.0.0.1:${port}`));
