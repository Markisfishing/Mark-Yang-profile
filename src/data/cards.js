// 作品卡資料：新增一週的作品，只要在對應的清單加一筆，不用改 HTML
// title / body / cta 是預設文字（英文，跟原本的 HTML 一樣），*Key 對應 public/app.js 的翻譯表，
// 首頁載入後 app.js 會依目前語言換成中文或英文；新增卡片時兩種語言都要加進翻譯表
// navLabel 是導覽列「作品集」下拉選單裡的短名稱；有 navKey 的項目要在 app.js 翻譯表加上中英兩種
export const cardLists = {
  // 作品集分頁「全部作品」：點了只顯示那一項的完整介紹（href 對應 index.html 裡 article 的 id）
  projects: [
    {
      href: "#codemind",
      navLabel: { en: "CodeMind", zh: "CodeMind" },
      image: "/assets/projects/codemind-classes.png",
      imageAltKey: "projects.codemind.gallery.classes",
      title: "CodeMind / AI Programming Learning & Weakness Diagnosis Platform",
      titleKey: "projects.codemind.title",
      body: "Lead developer | Teacher Web, backend teaching workflows, and weakness-diagnosis integration",
      bodyKey: "projects.codemind.contribution",
      cta: "See full details",
      ctaKey: "home.projects.cta"
    },
    {
      href: "#qsearch",
      navLabel: { en: "SNA Viral Post Prediction", zh: "SNA 社群貼文爆紅預測" },
      navKey: "nav.projects.sna",
      image: "/assets/projects/qsearch-model-comparison.png",
      imageAltKey: "projects.qsearch.gallery.comparison",
      title: "SNA Viral Post Prediction & Content Strategy",
      titleKey: "projects.qsearch.title",
      body: "Team lead | weighted-index design, data cleaning, model comparison, and project direction",
      bodyKey: "projects.qsearch.contribution",
      cta: "See full details",
      ctaKey: "home.projects.cta"
    },
    {
      href: "#threads",
      navLabel: { en: "Threads Analyzer", zh: "Threads Analyzer" },
      image: "/assets/projects/threads-overview.png",
      imageAltKey: "projects.threads.gallery.overview",
      title: "Threads Analyzer / Social Post Engagement Analytics Platform",
      titleKey: "projects.threads.title",
      body: "Solo developer | full-stack development, analytics pipeline, LLM output checking, and testing, built with Claude Code",
      bodyKey: "projects.threads.contribution",
      cta: "See full details",
      ctaKey: "home.projects.cta"
    }
  ],

  // 作品集分頁「互動小工具」：課程每週做的工具，連到 tools/ 底下的頁面
  tools: [
    {
      href: "/tools/llm-cost.html",
      navLabel: { en: "LLM cost estimator", zh: "LLM 成本估算" },
      navKey: "nav.tools.llmCost",
      tags: ["HTML", "JavaScript", "LLM API"],
      title: "LLM API Cost Estimator",
      titleKey: "projects.tools.llmCost.title",
      body: "Enter tokens per call, calls per day, and per-million-token prices to estimate the monthly API bill before shipping an AI feature.",
      bodyKey: "projects.tools.llmCost.body",
      cta: "Open the tool",
      ctaKey: "projects.tools.cta"
    },
    {
      href: "/tools/apod.html",
      navLabel: { en: "NASA APOD", zh: "NASA 每日天文圖" },
      navKey: "nav.tools.apod",
      tags: ["HTML", "JavaScript", "NASA API"],
      title: "NASA Astronomy Picture of the Day",
      titleKey: "projects.tools.apod.title",
      body: "Pick any date since 1995 to see NASA's featured photo or video for that day, with loading, empty, and error states, an 8-second timeout, and retries.",
      bodyKey: "projects.tools.apod.body",
      cta: "Open the tool",
      ctaKey: "projects.tools.cta"
    }
  ]
};
