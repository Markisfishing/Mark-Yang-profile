# Mark Yang｜AI Application Engineering Portfolio

這是楊祐瑜（Mark Yang）的 AI 應用工程實習作品集，展示 AI Agent、資料處理、機器學習、程式學習診斷，以及目前正在學習的自動化與前後端開發成果。

## 線上作品集

- Website：[mark-yang-profile.vercel.app](https://mark-yang-profile.vercel.app/)
- GitHub：[Markisfishing/Mark-Yang-profile](https://github.com/Markisfishing/Mark-Yang-profile)（目前為私人 repository，僅本人可開啟）

## 作品集特色

- AI Profile Agent：可詢問個人專案、技能、學習方向與聯絡方式
- CodeMind：整合 VS Code 學生端、Teacher Web、Backend API、AI 輔導與弱點診斷的程式學習平台
- QSearch SNA：社群貼文爆紅預測與內容策略分析專案
- 中英文切換與響應式手機版介面
- 整合 AI Agent、資料處理、模型成果與個人履歷資訊

## CodeMind 工程範圍

角色：主要開發者，負責 Teacher Web、Backend 教學流程與弱點診斷整合。

- 教師端與後端：課程、班級、教材、題庫、作業、即時課堂、學生學習歷程，以及教師、班級與學生資料的權限隔離
- AI 輔導與教師介入：蘇格拉底式提示、Agent 協助層級、教材引用、教師提示與洩題防護
- 弱點診斷：知識圖譜、R-GCN、GraphCodeBERT 特徵、FastAPI 推論、資料切分、消融實驗與可重現測試
- 四個整合子系統：Teacher Web、Backend API、VS Code Extension、Diagnosis Service
- 教學流程：教師出題 → 學生作答 → 執行紀錄 → 弱點診斷 → 教師介入
- 品質驗證：pytest、Vitest、Playwright E2E、權限隔離與 Agent 驗收

團隊分工：Agent Twin 最初構想與早期學生端流程由團隊成員提出；我負責後續平台化、教學功能、診斷模型、前後端整合與驗收測試。

## 使用技術

- HTML、CSS、JavaScript
- Vue 3 + Vite（共用元件與多頁打包）
- Node.js API
- Groq / OpenAI API
- GitHub 與 Vercel
- Prompt design、LLM workflow、AI Agent

## 專案結構

```text
index.html              首頁（首頁、作品集、關於我、AI 助理四個分頁）
tools/
├── llm-cost.html       LLM API 成本估算器
└── apod.html           NASA 每日一天文圖
src/
├── main.js             找出 data-component 掛載點並掛上 Vue 元件
├── components/         SiteNav、ProjectCard、ProjectCardList
└── data/cards.js       作品卡資料
public/
├── app.js              中英切換、聊天、截圖輪播
├── assets/
└── styles/
    ├── design-tokens.css
    └── main.css
api/
├── chat.js
└── apod.js
component-inventory.md  元件清單
vite.config.mjs
server.js
vercel.json
```

## 本機執行

### 安裝套件

```bash
npm install
```

### 設定環境變數

請建立 `.env.local`，填入實際 API 金鑰。金鑰不應提交到 GitHub。

```env
AI_PROVIDER=groq
GROQ_API_KEY=your-groq-api-key
```

若使用 OpenAI，可改用：

```env
AI_PROVIDER=openai
OPENAI_API_KEY=your-openai-api-key
AI_MODEL=your-openai-model
```

### 啟動網站

```bash
npm run dev
```

啟動後開啟 <http://localhost:5173>。AI 聊天與 APOD 的 `/api/*` 由 Vite 伺服器直接提供，不用另外開伺服器。

### 打包與預覽

```bash
npm run build
npm run preview
```

`npm run build` 會打包到 `dist/`，`npm run preview` 用打包好的檔案開在 <http://localhost:4173>。也可以在打包後用 `npm start`，以 `server.js` 在 <http://localhost:3000> 提供 `dist/`。

## 我的貢獻

- 負責作品集網站的內容規劃、介面實作與雙語文案整理
- 擔任 CodeMind 主要開發者，負責 Teacher Web、Backend 教學流程、AI 教學政策、診斷模型及跨系統整合
- 完成 AI Profile Agent 的 Prompt、API 串接與純文字回答流程
- 整理 CodeMind 與 QSearch SNA 的專案成果、技術內容與可展示證據
- 持續學習 n8n、AI Agent workflow、前端與後端開發

## 未來規劃

- 增加更多 AI 與資料處理專案案例
- 串接 n8n 自動化流程
- 強化 AI Profile Agent 的回答品質與資料管理
- 持續完善前後端與資料庫整合

## 聯絡方式

- Email：y7632457@gmail.com
- GitHub：[Markisfishing](https://github.com/Markisfishing)

## NASA APOD 工具的實作細節

頁面上只留給訪客看的說明，下面這些技術細節記在這裡：

- APOD 官網搬到 science.nasa.gov 之後，官方 API 常回 NASA 標誌而不是當天的圖；這時 `api/apod.js` 會改從 science.nasa.gov 的文章取得同一天的內容。
- NASA 金鑰只放在伺服器端（`.env.local` 與 Vercel 環境變數），不會出現在網頁原始碼裡。
- 查過的日期會先存在瀏覽器分頁裡，再看一次不會再打 API。
