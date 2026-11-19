<!-- 元件：ProjectCardList · 用途：把 src/data/cards.js 裡的一組卡片排出來
     props：list 卡片組的名稱（例如 home-projects、tools）
     外層的 .preview-grid 寫在 HTML 上（掛載點本身），這裡只負責產生一張張卡片 -->
<script setup>
import { computed } from "vue";
import ProjectCard from "./ProjectCard.vue";
import { cardLists } from "../data/cards.js";

const props = defineProps({
  list: { type: String, required: true }
});

const cards = computed(() => cardLists[props.list] || []);
</script>

<template>
  <ProjectCard v-for="card in cards" :key="card.href" v-bind="card" />
</template>
