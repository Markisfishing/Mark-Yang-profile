# Mark Yang｜AI Application Engineering Portfolio

這是楊祐瑜（Mark Yang）的 AI 應用工程實習作品集，展示 AI Agent、資料處理、機器學習、程式學習診斷，以及目前正在學習的自動化與前後端開發成果。

## 線上作品集

- Website：[mark-yang-ai-profile.vercel.app](https://mark-yang-ai-profile.vercel.app/)
- GitHub：[Markisfishing/mark-yang-ai-profile](https://github.com/Markisfishing/mark-yang-ai-profile)

## 作品集特色

- AI Profile Agent：可詢問個人專案、技能、學習方向與聯絡方式
- CodeMind：結合 VS Code、遠端 Agent Twin、Socratic Agent 與 R-GCN 的 AI 程式學習與弱點診斷平台
- QSearch SNA：社群貼文爆紅預測與內容策略分析專案
- 中英文切換與響應式手機版介面
- 整合 AI Agent、資料處理、模型成果與個人履歷資訊

## 使用技術

- HTML、CSS、JavaScript
- Node.js API
- Groq / OpenAI API
- GitHub 與 Vercel
- Prompt design、LLM workflow、AI Agent

## 專案結構

```text
public/
├── index.html
├── app.js
└── styles.css
api/
└── chat.js
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
npm start
```

啟動後開啟 <http://localhost:3000>。

## 我的貢獻

- 負責作品集網站的內容規劃、介面實作與雙語文案整理
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
