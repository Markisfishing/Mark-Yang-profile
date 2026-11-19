# 元件化重構：逐項對照清單

重構範圍：`9d57fe8`（改版前的備份點）→ 目前的 main。

**誠實說明：** 改版前沒有先截圖，也沒有先寫這份清單。這份清單是改完之後補的，「改版前」的數據是把 `9d57fe8` 另外取出來執行量到的，不是改版當下留下的紀錄。

## 一、重構前後畫面比對

做法：同時開兩個版本。
- 改版前：從 `9d57fe8` 取出的程式，用 `server.js` 開在 :3201。
- 改版後：`npm run preview`，開在 :4173。

每頁量測每個元素的位置、大小、文字，以及 21 項計算後樣式（顏色、背景、字級、字重、行高、內外距、邊框、圓角、陰影、透明度等）。兩邊逐一比對，寬度 375／768／1280 各量一次。

| 頁面 | 375px | 768px | 1280px |
|---|---|---|---|
| 首頁（四個分頁＋頁尾＋導覽列，共 341 個元素） | 0 差異 | 0 差異 | 0 差異 |
| LLM 成本估算 | 只多了導覽列 | 只多了導覽列 | 只多了導覽列 |
| APOD | 只多了導覽列 | 只多了導覽列 | 只多了導覽列 |

量測時出現過兩種假差異，查過之後都排除了：
- **隱藏元素：** 空的錯誤訊息欄沒有方框，位置會讀成 0，所以上面多一條導覽列，它的相對位置就跟著變。
- **APOD 圖片：** 第一次量測時，舊版的圖片還沒載完，高度是 0。等圖片載完重量，高度兩邊都是 504px。

## 二、導覽列的差異（刻意的）

- 工具頁的導覽列不顯示語言、深淺色切換鈕。工具頁只有中文，也沒載入負責切換的 `app.js`，放了按鈕也按不動。
- 工具頁的「作品集」是高亮狀態，表示工具屬於作品集分頁。
- 工具頁的導覽列沒有首頁那條會滑動的底線。底線是 `app.js` 畫的，工具頁沒有載入 `app.js`。

## 三、四個頁面 → 本專案三個頁面

課程範例是首頁＋分帳／小費／天氣。本專案依作者決定，沿用自己的兩個工具：

| 課程頁面 | 本專案對應 | 網址 |
|---|---|---|
| 首頁 | 首頁 | `/index.html` |
| 分帳、小費（計算型工具） | LLM API 成本估算器 | `/tools/llm-cost.html` |
| 天氣（API 查詢＋錯誤與重試） | NASA 每日一天文圖 | `/tools/apod.html` |

## 四、驗收結果（線上網址 https://mark-yang-profile.vercel.app ）

- [x] 三個頁面都開過，帶 `.html` 與不帶 `.html` 的網址都是 200。
- [x] 三頁都有導覽列；導覽列的 HTML 只寫在 `src/components/SiteNav.vue` 一處。
- [x] 每頁的站名＋四個連結（共 15 個）逐一點過，網址列與大標題都對：

  | 點的連結 | 網址 | 看到的大標題 |
  |---|---|---|
  | 站名、首頁 | `/#home` | 楊祐瑜 / Mark Yang |
  | 作品集 | `/#projects` | 作品集 |
  | 關於我 | `/#skills` | 把學習轉化成實際作品的 AI 實作者 |
  | AI 助理 | `/#agent` | 詢問我的作品與能力 |

- [x] LLM 成本估算：
  - 填 -5 時顯示錯誤。
  - 填 2000／800／500／1／5 時，算出每月 US$90.00，跟手算一致：(2000×1＋800×5)÷10⁶×500×30。
- [x] APOD：
  - 打開會正常載入當天的圖。
  - 斷網時顯示「連不上 NASA，請檢查網路連線」和「重試」按鈕。斷網是用暫時讓 fetch 失敗的方式模擬的。
  - 網路恢復後按重試可以成功載入。
- [x] 中英切換、AI 聊天（實際送出問題並收到串流回覆）、截圖輪播與放大都正常。
- [x] 375px 寬度下沒有橫向捲軸（`scrollWidth` 等於 375）：首頁四個分頁、兩個工具頁都檢查過。
- [x] `npm run build` 成功，`npm run preview` 底下以上功能都正常。
- [x] Vercel：
  - 部署狀態是 READY。
  - 專案的 Framework Preset 從 Node 改成 Vite。原本是靠 `vercel.json` 的 `framework: vite` 覆蓋，後台設定一直沒改，跑這份清單時才發現並補上。
- [x] `.gitignore` 排除了 `node_modules/`、`dist/`、`.env`、`.env.*`；這些檔案都沒有進版控。

## 五、git diff 逐段說明（`9d57fe8..main`）

| 檔案 | 改了什麼 | 為什麼 |
|---|---|---|
| `CLAUDE.md` | 允許 Vue 3 + Vite；頁面改放根目錄；加入 v2 驗收條件 | 原規範禁止框架，跟本週作業衝突，作者同意後才改 |
| `public/index.html → index.html` | 移到根目錄（rename） | Vite 不處理 `public/` 裡的 HTML，頁面必須放在入口位置 |
| `index.html` 導覽列 | 19 行換成 1 行掛載點 | 導覽列改由 SiteNav 元件畫出 |
| `index.html` 兩組 `.preview-grid` | 卡片 HTML 換成掛載點 | 作品卡改由 ProjectCard 元件畫出，資料移到 `src/data/cards.js` |
| `index.html` script | 加入 `src/main.js`；`app.js` 加上 `defer` | 元件要先畫好，`app.js` 才找得到按鈕；兩支都延後執行，順序才固定 |
| `public/tools/* → tools/*` | 移到根目錄；外層加 `div.site-shell` 和導覽列掛載點 | 跟首頁同理；導覽列與內容要放在同一個 `.site-shell` 裡，sticky 才有效 |
| `public/styles/main.css` | 掛載點設 `display: contents`；`.tool-page` 加 `margin-inline: auto` | 前者讓 sticky 導覽列正常；後者是因為 main 不再自己當 `.site-shell`，需要補回置中。量測確認位置與改版前相同 |
| `src/components/*.vue`、`src/data/cards.js`、`src/main.js` | 新增 | 共用元件、卡片資料、掛載入口 |
| `vite.config.mjs` | 新增 | 多頁入口；本機 dev／preview 時，把 `api/` 的 handler 掛上去 |
| `package.json`、`package-lock.json` | 加入 vue、vite、@vitejs/plugin-vue 與 dev／build／preview 指令 | 導入框架與打包 |
| `vercel.json` | 加入 framework／buildCommand／outputDirectory | 讓 Vercel 執行 `vite build` 並發布 `dist/` |
| `server.js` | 改成提供 `dist/` | 頁面已不在 `public/`，`npm start` 要改看打包後的檔案 |
| `.claude/launch.json` | 預覽改用 `npm run dev` 與 `npm run preview` | 配合新的執行方式 |
| `README.md` | 更新專案結構與執行方式 | 跟實際結構一致 |
| `component-inventory.md`、`.claude/skills/component-refactor/SKILL.md`、本檔 | 新增 | 作業要求的元件清單、Skill 與驗收紀錄 |

逐段檢查時發現一處沒有理由的改動：`app.js` 的 `cache-bust` 從 `20261102-title` 改成了 `20261119-vue`。`app.js` 內容沒有變，不需要讓瀏覽器重新下載，已經改回原值。
