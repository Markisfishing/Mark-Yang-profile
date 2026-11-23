<!-- 元件：SiteNav · 用途：全站共用的導覽列，首頁與 tools/ 底下每一頁都用這一份
     props：
       linkBase  連結前綴。首頁是 ""（同一頁換分頁），其他頁是 "/"（回首頁再換分頁）
       current   目前所在分頁的 id（home / projects / skills / agent）；首頁不用給，由 app.js 依網址切換
       lang      還沒被 app.js 翻譯前先顯示的語言，首頁 en、工具頁 zh
       toggles   要不要顯示語言與深淺色切換鈕；只有載入 app.js 的首頁才有切換邏輯
     「作品集」是下拉選單：桌面（1024px 以上且有滑鼠）滑過就展開、點文字直接到作品集；
     觸控或較窄的螢幕點「作品集」才展開，窄螢幕改在導覽列下方整排顯示 -->
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { cardLists } from "../data/cards.js";

const props = defineProps({
  linkBase: { type: String, default: "" },
  current: { type: String, default: "" },
  lang: { type: String, default: "en" },
  toggles: { type: Boolean, default: false }
});

// 分頁清單只在這裡維護；data-i18n 的 key 與 app.js 的翻譯表對應，首頁切語言時 app.js 會換掉文字
const items = [
  { id: "home", key: "nav.home", label: { en: "Home", zh: "首頁" } },
  { id: "projects", key: "nav.projects", label: { en: "Portfolio", zh: "作品集" }, menu: true },
  { id: "skills", key: "nav.skills", label: { en: "About", zh: "關於我" } },
  { id: "agent", key: "nav.agent", label: { en: "AI Agent", zh: "AI 助理" } }
];

// 下拉選單內容直接從作品卡資料產生，每週新增作品時選單會自動多一項
const menuGroups = [
  {
    key: "nav.projects.featured",
    label: { en: "Featured work", zh: "主要作品" },
    links: cardLists["home-projects"].map((card) => ({ href: card.href, key: card.navKey, label: card.navLabel }))
  },
  {
    key: "nav.projects.tools",
    label: { en: "Mini tools", zh: "互動小工具" },
    links: cardLists.tools.map((card) => ({ href: card.href, key: card.navKey, label: card.navLabel }))
  }
];
const allWork = { key: "nav.projects.all", label: { en: "All work", zh: "全部作品" } };

const href = (id) => `${props.linkBase}#${id}`;
const linkHref = (target) => (target.startsWith("#") ? `${props.linkBase}${target}` : target);
const text = (label) => label[props.lang] || label.en;
const isExternal = (target) => !target.startsWith("#");

const open = ref(false);       // 用點的展開（觸控、窄螢幕）
const dismissed = ref(false);  // 桌面選了一項後先收起，滑鼠離開再恢復滑過展開
const dropdown = ref(null);
const trigger = ref(null);
// v-for 裡的 ref 會變成陣列，選單只有一個，用函式 ref 直接存元素
const setDropdown = (el) => { dropdown.value = el; };
const setTrigger = (el) => { trigger.value = el; };
const hoverMedia = typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px) and (hover: hover)") : null;

function onTriggerClick(event) {
  // 有滑鼠的桌面：選單靠滑過展開，點文字就是到作品集分頁
  if (hoverMedia && hoverMedia.matches) {
    dismissed.value = true;
    open.value = false;
    return;
  }
  event.preventDefault();
  open.value = !open.value;
}

function close() {
  open.value = false;
  dismissed.value = true;
}

function onDocumentClick(event) {
  if (!open.value || !dropdown.value) return;
  // 窄螢幕的面板不在 .nav-dropdown 裡，點面板內的連結由 close() 處理
  if (dropdown.value.contains(event.target) || event.target.closest(".nav-panel")) return;
  open.value = false;
}

function onKeydown(event) {
  if (event.key !== "Escape") return;
  const wasOpen = open.value || (dropdown.value && dropdown.value.contains(document.activeElement));
  open.value = false;
  dismissed.value = true;
  if (wasOpen && trigger.value) trigger.value.focus();
}

onMounted(() => {
  document.addEventListener("click", onDocumentClick);
  document.addEventListener("keydown", onKeydown);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", onDocumentClick);
  document.removeEventListener("keydown", onKeydown);
});
</script>

<template>
  <header class="topbar">
    <a class="brand" :href="href('home')" aria-label="Mark Yang resume home">
      <span class="brand-mark">MY</span>
      <span>Mark Yang</span>
    </a>
    <nav class="nav-links" aria-label="Primary navigation">
      <template v-for="item in items" :key="item.id">
        <div
          v-if="item.menu"
          :ref="setDropdown"
          class="nav-dropdown"
          :class="{ 'is-open': open, 'is-dismissed': dismissed && !open }"
          @mouseleave="dismissed = false"
          @focusin="(e) => { if (!e.currentTarget.contains(e.relatedTarget)) dismissed = false; }"
        >
          <a
            :ref="setTrigger"
            class="nav-tab"
            :href="href(item.id)"
            :aria-current="item.id === current ? 'page' : undefined"
            :aria-expanded="open ? 'true' : 'false'"
            aria-controls="projectsMenu projectsPanel"
            @click="onTriggerClick"
          >
            <span :data-i18n="item.key">{{ text(item.label) }}</span>
            <svg class="nav-chevron" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 9l6 6 6-6" /></svg>
          </a>
          <!-- 桌面版：浮在「作品集」下方 -->
          <div id="projectsMenu" class="nav-menu">
            <a class="nav-menu-link" :href="href(item.id)" :data-i18n="allWork.key" @click="close">{{ text(allWork.label) }}</a>
            <template v-for="group in menuGroups" :key="group.key">
              <p class="nav-menu-heading" :data-i18n="group.key">{{ text(group.label) }}</p>
              <a
                v-for="link in group.links"
                :key="link.href"
                class="nav-menu-link"
                :href="linkHref(link.href)"
                :data-i18n="link.key"
                @click="close"
              >{{ text(link.label) }}</a>
            </template>
          </div>
        </div>
        <a
          v-else
          class="nav-tab"
          :href="href(item.id)"
          :data-i18n="item.key"
          :aria-current="item.id === current ? 'page' : undefined"
        >{{ text(item.label) }}</a>
      </template>
    </nav>
    <!-- 按鈕的 id 給 app.js 綁事件用，不可改名 -->
    <div v-if="toggles" class="actions">
      <button class="lang-toggle" type="button" id="langToggle" aria-label="Toggle language">中文</button>
      <button class="lang-toggle theme-toggle" type="button" id="themeToggle" aria-label="Toggle color theme"></button>
    </div>
    <!-- 窄螢幕版：導覽列有橫向捲動，浮動選單會被切掉，所以改在導覽列下方整排展開 -->
    <div id="projectsPanel" class="nav-panel" :hidden="!open">
      <a class="nav-menu-link" :href="href('projects')" :data-i18n="allWork.key" @click="close">{{ text(allWork.label) }}</a>
      <template v-for="group in menuGroups" :key="group.key">
        <p class="nav-menu-heading" :data-i18n="group.key">{{ text(group.label) }}</p>
        <a
          v-for="link in group.links"
          :key="link.href"
          class="nav-menu-link"
          :href="linkHref(link.href)"
          :data-i18n="link.key"
          @click="close"
        >{{ text(link.label) }}</a>
      </template>
    </div>
  </header>
</template>
