import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

const require = createRequire(import.meta.url);
const root = fileURLToPath(new URL(".", import.meta.url));

// 本機的 npm run dev／npm run preview 也要能用 AI 聊天與 APOD：
// 直接把 api/ 底下 Vercel 用的同一支 handler 掛到 Vite 伺服器上，不用另外開 server.js
function localApi() {
  const routes = {
    "/api/chat": require("./api/chat.js"),
    "/api/apod": require("./api/apod.js")
  };
  const mount = (server) => {
    server.middlewares.use((req, res, next) => {
      const handler = routes[(req.url || "").split("?")[0]];
      if (handler) handler(req, res);
      else next();
    });
  };
  return { name: "local-api", configureServer: mount, configurePreviewServer: mount };
}

export default defineConfig(({ mode }) => {
  // 金鑰只放 .env.local（不進版控），跟 server.js 一樣讀進 process.env 給 api/ 用
  const env = loadEnv(mode, root, "");
  for (const [key, value] of Object.entries(env)) {
    if (!process.env[key]) process.env[key] = value;
  }

  return {
    plugins: [vue(), localApi()],
    build: {
      rolldownOptions: {
        // 多頁入口：首頁與兩個工具頁各自是一個 HTML，共用 src/components 裡的元件
        input: {
          main: fileURLToPath(new URL("index.html", import.meta.url)),
          llmCost: fileURLToPath(new URL("tools/llm-cost.html", import.meta.url)),
          apod: fileURLToPath(new URL("tools/apod.html", import.meta.url))
        }
      }
    }
  };
});
