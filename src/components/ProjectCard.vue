<!-- 元件：ProjectCard · 用途：一張可點的作品卡（作品集分頁的全部作品、互動小工具）
     換一張卡只要換資料：連結、封面或標籤、標題、說明、按鈕文字。資料放在 src/data/cards.js
     props：
       href          點下去要去的地方
       image         封面圖路徑（可省略）；imageAltKey 是封面 alt 的翻譯 key
       tags          標籤文字陣列（可省略），顯示在標題上方
       title / body / cta              還沒翻譯前的預設文字
       titleKey / bodyKey / ctaKey     app.js 翻譯表的 key，首頁切語言時會換掉文字 -->
<script setup>
defineProps({
  href: { type: String, required: true },
  image: { type: String, default: "" },
  imageAltKey: { type: String, default: "" },
  tags: { type: Array, default: () => [] },
  title: { type: String, required: true },
  titleKey: { type: String, default: undefined },
  body: { type: String, default: "" },
  bodyKey: { type: String, default: undefined },
  cta: { type: String, required: true },
  ctaKey: { type: String, default: undefined }
});
</script>

<template>
  <a class="preview-card" :href="href">
    <div v-if="image" class="preview-cover">
      <img :src="image" alt="" :data-i18n-alt="imageAltKey || undefined" loading="lazy" />
    </div>
    <div v-if="tags.length" class="project-meta">
      <span v-for="tag in tags" :key="tag">{{ tag }}</span>
    </div>
    <h3 :data-i18n="titleKey">{{ title }}</h3>
    <p v-if="body" :data-i18n="bodyKey">{{ body }}</p>
    <span class="preview-cta" :data-i18n="ctaKey">{{ cta }}</span>
  </a>
</template>
