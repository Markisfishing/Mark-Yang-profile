// 工具頁的中英切換與深淺色切換（首頁的同一組按鈕由 public/app.js 處理，這支只給 tools/ 底下的頁面用）
//
// 用法：在工具頁的 <script type="module"> 裡
//   const { t, lang } = setupToolPage({ zh: {...}, en: {...} }, () => 重畫會變的區塊);
// - 頁面上寫死的文字加 data-i18n="key"（換文字）、data-i18n-placeholder="key"（換 placeholder）
// - 翻譯表裡 "meta.title"、"meta.description" 會換掉分頁標題與搜尋結果的說明
// - t(key, { n: 3 }) 取目前語言的字，{n} 會換成參數；onChange 在切換語言後呼叫，讓頁面重畫結果區
//
// 這支要在 src/main.js 之後執行，按鈕是 SiteNav 畫出來的
import { siteLang, setSiteLang } from "./site-lang.js";

const NAV_TEXT = {
  zh: { toggle: "EN", dark: "深色", light: "淺色" },
  en: { toggle: "中文", dark: "Dark", light: "Light" }
};

export function setupToolPage(dict, onChange = () => {}) {
  const root = document.documentElement;
  const langToggle = document.getElementById("langToggle");
  const themeToggle = document.getElementById("themeToggle");
  const description = document.querySelector('meta[name="description"]');

  function t(key, params = {}) {
    const text = dict[siteLang.value][key] ?? dict.zh[key] ?? "";
    return text.replace(/\{(\w+)\}/g, (_, name) => params[name] ?? "");
  }

  function updateThemeToggle() {
    const isDark = root.dataset.theme === "dark";
    themeToggle.textContent = NAV_TEXT[siteLang.value][isDark ? "light" : "dark"];
  }

  function applyLanguage() {
    const lang = siteLang.value;
    root.lang = lang === "zh" ? "zh-Hant" : "en";
    document.title = t("meta.title");
    if (description) description.content = t("meta.description");
    langToggle.textContent = NAV_TEXT[lang].toggle;
    updateThemeToggle();
    document.querySelectorAll("main [data-i18n]").forEach((node) => {
      node.textContent = t(node.dataset.i18n);
    });
    document.querySelectorAll("main [data-i18n-placeholder]").forEach((node) => {
      node.placeholder = t(node.dataset.i18nPlaceholder);
    });
  }

  langToggle.addEventListener("click", () => {
    setSiteLang(siteLang.value === "zh" ? "en" : "zh");
    applyLanguage();
    onChange();
  });

  // 跟 app.js 的深淺色切換同一套：只在切換那一下開全頁顏色漸變，body 背景漸變完就拿掉
  themeToggle.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.classList.add("theme-changing");
    const finish = (event) => {
      if (event && event.target !== document.body) return;
      root.classList.remove("theme-changing");
      document.body.removeEventListener("transitionend", finish);
    };
    document.body.addEventListener("transitionend", finish);
    setTimeout(finish, 500);
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    updateThemeToggle();
  });

  applyLanguage();
  return { t, lang: () => siteLang.value };
}
