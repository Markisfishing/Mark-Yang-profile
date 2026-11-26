const http = require("http");
const fs = require("fs");
const path = require("path");
const chatHandler = require("./api/chat");
const apodHandler = require("./api/apod");
const commentsHandler = require("./api/comments");

const root = __dirname;
// 改用 Vite 之後，頁面要先 npm run build 打包到 dist/，這支伺服器再提供打包好的檔案
const publicDir = path.join(root, "dist");
const port = Number(process.env.PORT || 3000);

loadEnvFile(path.join(root, ".env.local"));

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".pdf": "application/pdf",
  ".svg": "image/svg+xml"
};

const server = http.createServer(async (req, res) => {
  if (req.url === "/api/chat" && req.method === "POST") {
    return chatHandler(req, res);
  }

  if ((req.url || "").split("?")[0] === "/api/apod") {
    return apodHandler(req, res);
  }

  if ((req.url || "").split("?")[0] === "/api/comments") {
    return commentsHandler(req, res);
  }

  const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  const safePath = urlPath === "/" ? "/index.html" : urlPath;
  const filePath = path.normalize(path.join(publicDir, safePath));

  if (!filePath.startsWith(publicDir)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end("Not found");
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
    res.end(data);
  });
});

server.listen(port, () => {
  console.log(`Mark Yang resume site running at http://localhost:${port}`);
});

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;

    const key = trimmed.slice(0, separator).trim();
    const rawValue = trimmed.slice(separator + 1).trim();
    const value = rawValue.replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}
