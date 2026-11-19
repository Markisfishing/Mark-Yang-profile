<!-- 元件：SiteNav · 用途：全站共用的導覽列，首頁與 tools/ 底下每一頁都用這一份
     props：
       linkBase  連結前綴。首頁是 ""（同一頁換分頁），其他頁是 "/"（回首頁再換分頁）
       current   目前所在分頁的 id（home / projects / skills / agent）；首頁不用給，由 app.js 依網址切換
       lang      還沒被 app.js 翻譯前先顯示的語言，首頁 en、工具頁 zh
       toggles   要不要顯示語言與深淺色切換鈕；只有載入 app.js 的首頁才有切換邏輯 -->
<script setup>
const props = defineProps({
  linkBase: { type: String, default: "" },
  current: { type: String, default: "" },
  lang: { type: String, default: "en" },
  toggles: { type: Boolean, default: false }
});

// 分頁清單只在這裡維護；data-i18n 的 key 與 app.js 的翻譯表對應，首頁切語言時 app.js 會換掉文字
const items = [
  { id: "home", key: "nav.home", label: { en: "Home", zh: "首頁" } },
  { id: "projects", key: "nav.projects", label: { en: "Portfolio", zh: "作品集" } },
  { id: "skills", key: "nav.skills", label: { en: "About", zh: "關於我" } },
  { id: "agent", key: "nav.agent", label: { en: "AI Agent", zh: "AI 助理" } }
];

const href = (id) => `${props.linkBase}#${id}`;
const label = (item) => item.label[props.lang] || item.label.en;
</script>

<template>
  <header class="topbar">
    <a class="brand" :href="href('home')" aria-label="Mark Yang resume home">
      <span class="brand-mark">MY</span>
      <span>Mark Yang</span>
    </a>
    <nav class="nav-links" aria-label="Primary navigation">
      <a
        v-for="item in items"
        :key="item.id"
        :href="href(item.id)"
        :data-i18n="item.key"
        :aria-current="item.id === current ? 'page' : undefined"
      >{{ label(item) }}</a>
    </nav>
    <!-- 按鈕的 id 給 app.js 綁事件用，不可改名 -->
    <div v-if="toggles" class="actions">
      <button class="lang-toggle" type="button" id="langToggle" aria-label="Toggle language">中文</button>
      <button class="lang-toggle theme-toggle" type="button" id="themeToggle" aria-label="Toggle color theme"></button>
    </div>
  </header>
</template>
