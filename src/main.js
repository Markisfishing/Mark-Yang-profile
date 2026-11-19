// 元件掛載入口：每一頁都載入這支，找出 HTML 裡的 data-component 掛載點，換成對應的 Vue 元件。
// 掛載點上其他的 data-* 會當成 props 傳進去，例如 data-link-base="/" → linkBase: "/"
//
// 執行順序很重要：這支是 type="module"、public/app.js 是 defer，兩者都等 HTML 解析完才依序執行，
// 所以元件一定先畫好，app.js 才去找 #langToggle、.nav-links、[data-i18n] 綁事件與翻譯
import { createApp } from "vue";
import SiteNav from "./components/SiteNav.vue";
import ProjectCardList from "./components/ProjectCardList.vue";

const components = { SiteNav, ProjectCardList };

document.querySelectorAll("[data-component]").forEach((el) => {
  const { component, ...props } = el.dataset;
  const Component = components[component];
  if (!Component) {
    console.warn(`找不到元件 ${component}`);
    return;
  }
  createApp(Component, props).mount(el);
});
