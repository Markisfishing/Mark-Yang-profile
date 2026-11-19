---
name: component-refactor
description: 把既有的純 HTML／CSS／JS 多頁網站改成 Vue 3 + Vite 元件化架構，且不改變既有功能與畫面。使用者說「元件化」「導入框架」「把導覽列抽成元件」「改成 Vue」「重構成 v2」時使用。
---

# 元件化重構（保留原功能）

目標是讓重複的區塊只維護一份，不是重寫網站。重構完成時，畫面與行為要跟重構前一樣。

## 開始前

1. 先讀專案規範（CLAUDE.md），確認允許使用框架。如果規範寫著禁止，先問使用者，不要自己改規範。
2. 確認 Node.js 版本符合 Vite 的要求：`node -v`，並對照 `node_modules/vite/package.json` 的 `engines`。
3. 列出每一頁目前的功能，當成驗收清單。例如：中英切換、聊天、計算、查詢、錯誤處理、重試。
4. 找出所有用 `document.getElementById`／`querySelector` 抓元素的舊程式。這些元素如果改由元件畫出來，舊程式必須在元件畫好之後才執行。

## 做法

- 用 Vite 多頁入口：每個 HTML 都列進 `build.rolldownOptions.input`。Vite 8 之後是 `rolldownOptions`，`rollupOptions` 已經是舊名稱。
- HTML 入口不能放在 `public/`。Vite 不會處理 `public/` 裡的 HTML，所以頁面要移到專案根目錄（用 `git mv`，保留歷史）。CSS、圖片、舊的 app.js 可以留在 `public/`，路徑不變。
- 只把重複的區塊做成元件，例如導覽列、作品卡。其餘 HTML 原樣保留，用 `data-component` 掛載點把元件放進去。
- 卡片資料集中在一個 data 檔，新增作品只改資料、不改 HTML。

## 這次踩過的坑（檢查規則）

- **執行順序**：元件入口用 `<script type="module">`，舊程式用 `<script defer>`，而且元件入口要寫在前面。兩者都在 HTML 解析完後依序執行，舊程式才找得到元件畫出來的按鈕。如果舊程式是一般的 `<script>`，它會先執行，然後抓不到元素。
- **sticky 導覽列**：Vue 的掛載點會多包一層 div。sticky 只在父層的範圍內黏住，所以掛載點要設 `display: contents`，不然導覽列捲一下就跑掉了。
- **翻譯屬性**：元件要保留舊程式用到的屬性與 id（例如 `data-i18n`、`id="langToggle"`），舊的翻譯程式才能繼續替換文字。
- **沒有載入舊程式的頁面**：工具頁沒有翻譯程式，元件要用 prop 決定預設語言。切換鈕在這種頁面按了沒有作用，就不要顯示。
- **本機 API**：改用 Vite 之後，原本伺服器提供的 `/api/*` 在 `npm run dev` 底下會不見。要用 Vite plugin 的 `configureServer` 與 `configurePreviewServer`，把同一支 handler 掛上去，並用 `loadEnv` 讀 `.env.local`。
- **部署設定**：`vercel.json` 要寫 `buildCommand: npm run build` 和 `outputDirectory: dist`，`api/` 的 serverless function 不用動。
- **換行字元**：Windows 上的 HTML 可能是 CRLF，用字串比對做替換時會對不上，改用編輯工具或先統一換行。

## 驗收

1. `npm run build` 成功，`dist/` 裡每個入口 HTML 都在。
2. `npm run preview` 底下，每一頁都要逐一試過：
   - 導覽列每個連結都會跳到對的分頁。
   - 工具頁的連結會回首頁的對應分頁。
   - 中英切換後，元件裡的文字也跟著換。
   - 聊天真的送出一則訊息並收到回覆。
   - 計算工具填錯會顯示錯誤，填對會顯示正確結果（自己手算一次對照）。
   - 查詢工具在斷網時會顯示錯誤與「重試」按鈕；網路恢復後按重試能成功。可以暫時把 `window.fetch` 換成會失敗的函式來模擬斷網。
3. 375px 寬度下，`document.documentElement.scrollWidth` 不能大於 `innerWidth`。
4. 有進場動畫的頁面要等動畫播完再截圖，不然看起來會像空白頁。
5. `git diff` 逐檔看過：移動的檔案應該顯示為 rename，內容只多了掛載點與 script，不應該有文字或功能被改掉。
6. `.gitignore` 要排除 `node_modules/`、`dist/`、`.env*`。
