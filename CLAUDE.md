## 這個專案是什麼
- 個人作品集網站，給面試官、合作夥伴與想了解作者的人瀏覽
- 在原專案 D:\project\intro 上把自我介紹頁擴充改造成作品集首頁，之後每週的新作品也會加進來
- 首頁要讓訪客在十秒內看出作者是誰、專長是什麼、做過哪些作品

## 技術規範
- 直接修改 D:\project\intro，不建立新的專案資料夾
- 延續現有 Git repository，不重新建立另一個
- 沿用現有結構：index.html 留在 public/，不在根目錄另建 styles/
- 不新增 React、Vue、Tailwind 或其他前端框架；頁面本身用 HTML 和 CSS
- 保留 public/app.js 與 api/chat.js，中英切換、AI 聊天、Groq/OpenAI 串接都不可退化
- 顏色、字級、間距的變數統一定義在 public/styles/design-tokens.css
- 版面樣式放在 public/styles/main.css，且只使用 design-tokens.css 內已有的變數
- 既有的 public/styles.css 若要整理，改放到 public/styles/main.css，並同步更新 index.html 的引用路徑
- 響應式斷點只用 768px 和 1024px
- 改版前的備份點就是目前的 HEAD，不建立沒有內容的 commit
- 每完成一項獨立功能就 commit 一次，訊息以繁體中文為主並加前綴（例如「樣式：」「版面：」「功能：」「驗收：」）
- 完成後部署到 Vercel

## 怎樣算做完了
- 網站分四個分頁：首頁、作品集、關於我、AI 助理
- 首頁有三個區塊：開頭（姓名與一句話介紹）、作品速覽、聯絡方式
- 關於我分頁最上方是個人簡介（三到四句），接著是我能貢獻什麼、技能、經歷
- 作品集分頁放完整的作品列表
- 作品列表有 CodeMind 與 QSearch 兩項，各附可用向右箭頭切換、點選可放大的截圖
- 作品截圖不帶簡報播放器、瀏覽器等非內容的邊框
- 原本自我介紹頁的重要內容已整合進作品集，沒有整批刪除
- 所有範例文字都已換成作者的真實內容
- public/styles/design-tokens.css 已建立，顏色、字級、間距都有變數名稱
- public/styles/main.css 裡沒有寫死的色碼
- 中英切換與 AI 聊天在改版後仍能正常運作
- 375px 寬度下沒有橫向捲軸
- 手機、平板、桌面寬度都不重疊、不破版
- index.html 有 viewport 設定，所有圖片都有 alt 文字
- 所有按鈕與連結都能正常使用
- Git 修改已依功能分段 commit，訊息為繁體中文
- Vercel 公開網址可以正常開啟

## 絕對不可以做的事
- 不可以把密碼、API 金鑰或其他機密資料寫進程式碼
- 不可以把 .env 加進版本控制
- 不可以把原本沒有公開顯示的個人資料新增到首頁
- 不可以自行修改或補充聯絡資料；要改變呈現位置或公開範圍，必須先問作者
- 不可以刪除與本次作品集改造無關的檔案
- 不可以移除既有的中英切換、聊天功能或 Groq/OpenAI 串接
- 不可以加入 React、Vue、Tailwind 或其他前端框架
- 不可以在 main.css 寫死色碼，必須用 design-tokens.css 的變數
- 不可以自行發明 design-tokens.css 裡不存在的變數
- 不可以直接刪除原本的自我介紹內容，要先判斷哪些能整合進作品集
