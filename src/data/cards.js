// 作品卡資料：新增一週的作品，只要在對應的清單加一筆，不用改 HTML
// title / body / cta 是預設文字（英文，跟原本的 HTML 一樣），*Key 對應 public/app.js 的翻譯表，
// 首頁載入後 app.js 會依目前語言換成中文或英文；新增卡片時兩種語言都要加進翻譯表
export const cardLists = {
  // 首頁「作品速覽」：點了跳到作品集分頁的那一項
  "home-projects": [
    {
      href: "#codemind",
      image: "/assets/projects/codemind-classes.png",
      imageAltKey: "projects.codemind.gallery.classes",
      title: "CodeMind / AI Programming Learning & Weakness Diagnosis Platform",
      titleKey: "projects.codemind.title",
      body: "Lead developer | Teacher Web, backend teaching workflows, and weakness-diagnosis integration",
      bodyKey: "projects.codemind.contribution",
      cta: "See screenshots and details",
      ctaKey: "home.projects.cta"
    },
    {
      href: "#qsearch",
      image: "/assets/projects/qsearch-model-comparison.png",
      imageAltKey: "projects.qsearch.gallery.comparison",
      title: "SNA / Viral Post Prediction & Content Strategy",
      titleKey: "projects.qsearch.title",
      body: "Team leadership, weighted-index design, data cleaning, model comparison, and project direction",
      bodyKey: "projects.qsearch.contribution",
      cta: "See screenshots and details",
      ctaKey: "home.projects.cta"
    },
    {
      href: "#threads",
      image: "/assets/projects/threads-overview.png",
      imageAltKey: "projects.threads.gallery.overview",
      title: "Threads Analyzer / Social Post Engagement Analytics Platform",
      titleKey: "projects.threads.title",
      body: "Solo project | full-stack development, analytics pipeline, LLM output checking, and testing, built with Claude Code",
      bodyKey: "projects.threads.contribution",
      cta: "See screenshots and details",
      ctaKey: "home.projects.cta"
    }
  ],

  // 作品集分頁「互動小工具」：課程每週做的工具，連到 tools/ 底下的頁面
  tools: [
    {
      href: "/tools/llm-cost.html",
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
