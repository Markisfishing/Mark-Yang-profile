// 工具頁共用的目前語言：tool-page.js 切換時改它，SiteNav（lang="site"）跟著重畫導覽列文字。
// 首頁不用這支：首頁的語言由 public/app.js 管，直接換 [data-i18n] 的文字。
// 跟首頁共用同一個 localStorage 鍵 "lang"，在首頁選的語言進到工具頁也會沿用，預設中文（同 app.js）
import { ref } from "vue";

function readLang() {
  try {
    return localStorage.getItem("lang") === "en" ? "en" : "zh";
  } catch (e) {
    return "zh";
  }
}

export const siteLang = ref(readLang());

export function setSiteLang(lang) {
  siteLang.value = lang;
  try { localStorage.setItem("lang", lang); } catch (e) {}
}
