---
name: component-refactor
description: 把既有的純 HTML／CSS／JS 多頁網站改成 Vue 3 + Vite 元件化架構，且不改變既有功能與畫面。使用者說「元件化」「導入框架」「把導覽列抽成元件」「改成 Vue」「重構成 v2」時使用。
---

# 元件化重構（保留原功能）

目標是讓重複的區塊只維護一份，不是重寫網站。重構完成時，畫面與行為要跟重構前一樣；唯一允許的畫面差異是新加的共用元件本身（例如工具頁多出的導覽列）。

## ① 改之前：留下對照基準

1. 先讀專案規範（CLAUDE.md），確認允許使用框架。如果規範寫著禁止，或規範指定的檔案位置跟 Vite 衝突（例如「index.html 留在 public/」），先問使用者，問完才能動，不要邊做邊改規範。
2. 確認 Node.js 版本符合 Vite 的要求：`node -v`，並對照 `node_modules/vite/package.json` 的 `engines`。
3. 記下備份點的 commit（例如 `git rev-parse HEAD`）。
4. 每一頁、每個寬度（375／768／1280）都截圖。
5. 寫一份逐項對照清單，列出每一頁、每個連結、每個功能。例如：中英切換、聊天、計算、查詢、錯誤處理、重試。
6. 找出所有用 `getElementById`／`querySelector` 抓元素的舊程式。這些元素如果改由元件畫出來，舊程式必須在元件畫好之後才執行。

## ② 做法

- 用 Vite 多頁入口：每個 HTML 都列進 `build.rolldownOptions.input`。Vite 8 之後是 `rolldownOptions`，`rollupOptions` 已經是舊名稱。
- HTML 入口不能放在 `public/`。Vite 不會處理 `public/` 裡的 HTML，所以頁面要移到專案根目錄（用 `git mv`，保留歷史）。CSS、圖片、舊的 app.js 可以留在 `public/`，路徑不變。
- 只把重複的區塊做成元件，例如導覽列、作品卡。其餘 HTML 原樣保留，用 `data-component` 掛載點把元件放進去。
- 卡片資料集中在一個 data 檔，新增作品只改資料、不改 HTML。

## ③ 這次踩過的坑

- **執行順序**：元件入口用 `<script type="module">`，舊程式用 `<script defer>`，而且元件入口要寫在前面。兩者都在 HTML 解析完後依序執行，舊程式才找得到元件畫出來的按鈕。
- **sticky 導覽列**：Vue 的掛載點會多包一層 div。sticky 只在父層的範圍內黏住，所以掛載點要設 `display: contents`。
- **翻譯屬性**：元件要保留舊程式用到的屬性與 id（例如 `data-i18n`、`id="langToggle"`）。
- **沒有載入舊程式的頁面**：元件要用 prop 決定預設語言。切換鈕在這種頁面按了沒有作用，就不要顯示。
- **本機 API**：改用 Vite 之後，`/api/*` 在 `npm run dev` 底下會不見。要用 Vite plugin 的 `configureServer` 與 `configurePreviewServer`，把同一支 handler 掛上去，並用 `loadEnv` 讀 `.env.local`。
- **部署設定**：`vercel.json` 要寫 `buildCommand: npm run build` 和 `outputDirectory: dist`。
- **換行字元**：Windows 上的 HTML 可能是 CRLF，用字串比對做替換時會對不上。

## ④ 量測方法

- **畫面比對不要只靠眼睛看截圖。** 把備份點用 `git worktree add` 取出來開在另一個 port，跟新版同時開著。兩邊量每個元素的位置、大小、文字與計算後樣式，再逐一比對。
- **量之前先關掉動畫與進場效果**，等圖片載完再量。否則會出現假差異：例如隱藏元素的位置讀成 0、圖片高度讀成 0。
- **測斷網**：暫時把 `window.fetch` 換成會失敗的函式，測完再換回來。
- **點連結**：每頁的站名與每個連結都要真的點一次，確認網址列與畫面上的大標題。

## ⑤ 驗收條件

1. `npm run build` 成功，`dist/` 裡每個入口 HTML 都在。
2. 在 `npm run preview` 和線上網址各做一次以下檢查：
   - 每一頁都開過，不是只開首頁；帶 `.html` 與不帶 `.html` 的網址都能開。
   - 每一頁的導覽列都在；站名和每個連結都點過，網址列與大標題都對。
   - 中英切換後，元件裡的文字也跟著換；聊天真的送出一則訊息並收到回覆。
   - 計算工具填錯會顯示錯誤，填對會顯示正確結果（自己手算一次對照）。
   - 查詢工具在斷網時會顯示錯誤與「重試」按鈕，網路恢復後按重試能成功。
3. 前後比對：每頁在 375／768／1280 三個寬度下，除了新加的共用元件，沒有任何元素的位置、大小、顏色、間距、字級或高亮不同。
4. 375px 寬度下，每一頁的 `scrollWidth` 都不能大於 `innerWidth`。
5. 導覽列的 HTML 在整個專案只出現一次：搜尋 `class="topbar"`，只會找到元件檔。
6. `git diff 備份點..HEAD` 從頭看到尾，每個檔案、每一段都寫得出改動的理由。寫不出理由的就改回去。
7. **這次沒擋住的問題：AI 會順便改你沒要求的東西，以下每一項都要檢查**：
   - 規範衝突時，不能先動手再說：這次先把 index.html 搬出 `public/`，才回頭問規範能不能改。
   - 沒有理由的「順手」修改：這次 `app.js` 內容沒變，卻改了它的 cache-bust 版本號。只要 diff 裡有寫不出理由的改動，就要改回去。
   - 改了既有指令的行為：例如 `npm start` 變成必須先 build；這類改變要寫進 README，並在回報時說明。
   - 改版前的截圖與對照清單沒有先做，事後才補。之後一定要在動手之前完成第 ① 段。
   - 部署平台的後台設定沒跟著改：`vercel.json` 能覆蓋後台設定，所以網站照樣部署成功，但後台的 Framework Preset 還是舊的。要去後台（或用 API）確認專案設定真的改了。
   - 漏搬頁面：`dist/` 裡的 HTML 數量要等於改版前 `public/` 裡的 HTML 數量。這次是 3 對 3，沒有漏。
8. `.gitignore` 要排除 `node_modules/`、`dist/`、`.env*`，而且 `git ls-files` 裡沒有這些檔案。
