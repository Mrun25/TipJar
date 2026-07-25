/**
 * dev-server.js — Local dev server with auto-save of contract address
 * Serves frontend/ on port 3000
 * Accepts POST /save-contract  { address, network } → writes contract-address.json
 * 
 * Run: node dev-server.js
 */
const http = require("http");
const fs   = require("fs");
const path = require("path");

const PORT        = 3000;
const FRONTEND    = path.join(__dirname, "frontend");

const MIME = {
  ".html": "text/html",
  ".css":  "text/css",
  ".js":   "application/javascript",
  ".json": "application/json",
  ".txt":  "text/plain",
  ".png":  "image/png",
  ".ico":  "image/x-icon",
  ".webp": "image/webp",
};

const server = http.createServer((req, res) => {
  // CORS headers (needed for MetaMask interactions)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") { res.writeHead(204); res.end(); return; }

  // ── POST /save-contract ──────────────────────────────────────────────────
  if (req.method === "POST" && req.url === "/save-contract") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        if (!data.address) throw new Error("Missing address");

        // Write contract-address.json
        const addrFile = path.join(FRONTEND, "contract-address.json");
        fs.writeFileSync(addrFile, JSON.stringify({ address: data.address, network: data.network || "sepolia" }, null, 2));
        console.log(`✅ Saved contract address: ${data.address} (${data.network})`);

        // Write ABI if provided
        if (data.abi) {
          const abiFile = path.join(FRONTEND, "TipJarABI.json");
          fs.writeFileSync(abiFile, JSON.stringify(data.abi, null, 2));
          console.log(`✅ Saved ABI to TipJarABI.json`);
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true, address: data.address }));
      } catch(e) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: false, error: e.message }));
      }
    });
    return;
  }

  // ── GET /health ──────────────────────────────────────────────────────────
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  // ── Static file serving ──────────────────────────────────────────────────
  let urlPath = req.url.split("?")[0];
  if (urlPath === "/") urlPath = "/index.html";

  const filePath = path.join(FRONTEND, urlPath);
  const ext      = path.extname(filePath);

  // Security: prevent path traversal
  if (!filePath.startsWith(FRONTEND)) {
    res.writeHead(403); res.end("Forbidden"); return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end(`Not found: ${urlPath}`);
      return;
    }
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  TipJar Dev Server");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`  Frontend : http://localhost:${PORT}`);
  console.log(`  Deploy   : http://localhost:${PORT}/deploy.html`);
  console.log(`  API      : POST http://localhost:${PORT}/save-contract`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
});
