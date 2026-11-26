# 元件清單（component-inventory）

作品集 v2 的共用元件。框架是 Vue 3 + Vite，頁面仍是三個獨立 HTML，元件只掛在 HTML 裡標了 `data-component` 的位置。

## 掛載方式

HTML 放一個掛載點，`src/main.js` 會把它換成對應的元件，掛載點上其他的 `data-*` 會變成 props：

```html
<div data-component="SiteNav" data-link-base="/" data-current="projects" data-lang="site" data-toggles></div>
```

要掛載的元件必須先在 `src/main.js` 的 `components` 裡登記。

## 元件

| 元件 | 檔案 | 用在哪裡 | props | 什麼時候該用它 |
|---|---|---|---|---|
| SiteNav | `src/components/SiteNav.vue` | 首頁、`guestbook.html`、`tools/llm-cost.html`、`tools/apod.html` | `linkBase`、`current`、`lang`、`toggles` | 每加一個新頁面（例如下週的新工具）就放一個，讓訪客隨時能回到首頁四個分頁。不要在新頁面自己再寫一份導覽列 |
| ProjectCardList | `src/components/ProjectCardList.vue` | 首頁「作品速覽」、作品集分頁「互動小工具」 | `list` | 想在某個區塊排出一整組作品或工具卡時用。新增一組卡片，就在 `cards.js` 開一個新清單，再放一個掛載點 |
| ProjectCard | `src/components/ProjectCard.vue` | 由 ProjectCardList 產生，不直接掛載 | `href`、`image`、`imageAltKey`、`tags`、`title`/`titleKey`、`body`/`bodyKey`、`cta`/`ctaKey` | 只需要「標題＋一句說明＋點進去」的作品摘要時用，例如每週新工具。如果需要截圖輪播、成果數字或詳細貢獻，就不適合，要寫成作品集分頁裡的完整作品卡 |

> 「什麼時候該用它」是依目前的使用方式寫的草稿，作者要依自己的判斷修改。

### SiteNav：全站導覽列

- `linkBase`：首頁是 `""`（在同一頁切換分頁），其他頁是 `"/"`（回到首頁再切換）。
- `current`：目前所在分頁，會加上 `aria-current="page"`。首頁不用傳，由 `public/app.js` 依網址的 # 切換。
- 分頁清單在 `items`：前四個是首頁裡的 # 分頁；「留言板」帶 `page: "/guestbook.html"`，是獨立頁面，連結直接給完整路徑。
- `lang`：首頁不傳（預設 `en`），由 app.js 翻譯成目前語言。工具頁給 `site`，導覽列跟著 `src/site-lang.js` 的目前語言，按切換鈕時一起重畫。
- `toggles`：要不要顯示語言與深淺色切換鈕。首頁由 app.js 綁事件，工具頁由 `src/tool-page.js` 的 `setupToolPage()` 綁事件；新工具頁要打開它，並在自己的 module script 呼叫 `setupToolPage(翻譯表, 重畫函式)`，且要放在 `src/main.js` 的 script 之後。
- 按鈕 id `langToggle`、`themeToggle` 與 class `.nav-links` 是 app.js 綁事件用的，不可改名。

### ProjectCardList／ProjectCard：作品卡

- 卡片資料放在 `src/data/cards.js`，目前有兩組：`projects`（CodeMind、SNA 社群貼文爆紅預測、Threads Analyzer）和 `tools`（LLM 成本估算、APOD）。
- 新增一張卡，只要在清單裡加一筆資料；有 `image` 就顯示封面，有 `tags` 就顯示標籤。
- `*Key` 對應 `public/app.js` 翻譯表的 key，所以新增卡片時中英兩種語言都要加進翻譯表。

## 不是元件、仍由 app.js 處理的部分

以下行為原本就寫在 `public/app.js`，這次重構沒有搬動：

- 中英切換
- 深淺色切換
- 分頁切換與導覽列底線
- AI 聊天（串流）
- 作品截圖輪播與放大
- 捲動進場動畫

作品集分頁裡兩張完整的作品卡（含截圖輪播）也維持原本的 HTML，因為輪播的事件綁定在 app.js 裡。

## 之後可以再抽的元件

- `ToolHeader`：工具頁的標題區（eyebrow、標題、說明），兩個工具頁的結構相同。
- `ProjectGallery`：截圖輪播。要先把 app.js 裡的輪播邏輯搬進元件，才能拿掉 HTML 裡重複的箭頭按鈕。
