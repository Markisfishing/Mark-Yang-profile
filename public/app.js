const translations = {
  en: {
    "nav.home": "Home",
    "nav.projects": "Portfolio",
    "nav.skills": "Skills",
    "nav.agent": "AI Agent",
    "hero.github": "GitHub",
    "theme.dark": "Dark",
    "theme.light": "Light",
    "hero.eyebrow": "AI Application Engineering Internship Portfolio",
    "hero.name": "Mark Yang / 楊祐瑜",
    "hero.position": "I turn data and LLM workflows into practical AI applications.",
    "hero.text": "I am building toward an AI application engineering internship, with hands-on experience across AI agents, data preprocessing, dashboards, and practical automation.",
    "hero.projects": "View Project Evidence",
    "hero.askAgent": "Ask AI Profile Agent",
    "hero.download": "Resume",
    "hero.contact": "Contact Me",
    "hero.proof.agentTitle": "CodeMind",
    "hero.proof.agent": "Teaching Platform · Weakness Diagnosis",
    "hero.proof.auc": "QSearch test AUC",
    "hero.proof.automation": "n8n + AI Agent learning",
    "about.kicker": "About",
    "about.title": "An AI builder who turns learning into working demos.",
    "about.p1": "I am currently studying Intelligent Computing and Big Data at Chung Yuan Christian University. My work focuses on Python, machine learning, LLM workflows, AI Agent development, programming-learning diagnosis, and dashboard-based applications.",
    "about.p2": "I am expanding from AI and data projects into automation and full-stack development, with a focus on building useful tools and connecting the pieces into working systems.",
    "about.p3": "I am looking for an AI application engineering internship where I can keep building and learning through real projects.",
    "projects.title": "Portfolio",
    "home.projects.cta": "See screenshots and details →",
    "projects.contributionLabel": "My contribution",
    "projects.codemind.roleLabel": "My role",
    "projects.codemind.contribution": "Lead developer | Teacher Web, backend teaching workflows, and weakness-diagnosis integration",
    "projects.codemind.title": "CodeMind / AI Programming Learning & Weakness Diagnosis Platform",
    "projects.codemind.body": "CodeMind integrates a VS Code student client, teacher management platform, AI tutoring agent, and programming weakness diagnosis. Building on the team's existing Agent Twin and student workflow concepts, I primarily developed the teacher interface, backend teaching APIs, AI teaching policies, diagnosis models, and cross-system integration.",
    "projects.codemind.point1": "Built Teacher Web and backend teaching workflows for courses, classes, materials, question banks, assignments, live classrooms, learning history, and teacher-class-student authorization.",
    "projects.codemind.point2": "Integrated AI tutoring and teacher intervention through Socratic prompts, assistance levels, material citations, teacher hints, and answer-leakage safeguards.",
    "projects.codemind.point3": "Established a weakness-diagnosis pipeline with a knowledge graph, R-GCN, GraphCodeBERT features, FastAPI inference, ablation experiments, and reproducible tests.",
    "projects.codemind.evidence.systemsTitle": "4 integrated subsystems",
    "projects.codemind.evidence.systemsBody": "Teacher Web, Backend API, VS Code Extension, Diagnosis Service",
    "projects.codemind.evidence.flowTitle": "Teaching workflow",
    "projects.codemind.evidence.flowBody": "Assignment → submission → execution record → diagnosis → intervention",
    "projects.codemind.evidence.qualityTitle": "Quality validation",
    "projects.codemind.evidence.qualityBody": "pytest, Vitest, Playwright E2E, authorization isolation, and Agent acceptance",
    "projects.codemind.collaboration": "Team contribution: the initial Agent Twin concept and early student workflow were proposed by team members; I handled subsequent platform development, teaching features, diagnosis models, frontend-backend integration, and acceptance testing.",
    "projects.qsearch.title": "SNA / Viral Post Prediction & Content Strategy",
    "projects.qsearch.body": "Labels identify the top 5% of engagement within each month and category. LightGBM ranks candidates and achieved Test AUC 0.7227, Test AP 0.1731, and a 54.9% Top-1,000 hit rate.",
    "projects.qsearch.contribution": "Team leadership, weighted-index design, data cleaning, model comparison, and project direction",
    "projects.qsearch.auc": "LightGBM Test AUC",
    "projects.qsearch.ap": "LightGBM Test AP",
    "projects.qsearch.hitRate": "Top-1,000 Hit Rate",
    "projects.qsearch.methodLabel": "From model to recommendation",
    "projects.qsearch.method": "Weighted interaction index → LightGBM ranking → Support, Viral Rate, Lift, composition, and original-post evidence.",
    "gallery.prev": "Previous image",
    "gallery.next": "Next image",
    "gallery.zoom": "Enlarge image",
    "gallery.close": "Close",
    "gallery.viewer": "Image viewer",
    "projects.codemind.galleryLabel": "CodeMind screenshots",
    "projects.codemind.gallery.classes": "My classes: class list, join code, and class entry (demo data)",
    "projects.codemind.gallery.overview": "Class overview: weakness analysis ranked by affected students (demo data)",
    "projects.codemind.gallery.assignment": "Assignment editor: question types, question editing, and publishing to classes (demo data)",
    "projects.codemind.gallery.aiQuestion": "AI-generated question preview with Markdown and LaTeX rendering (demo data)",
    "projects.qsearch.galleryLabel": "QSearch presentation slides",
    "projects.qsearch.gallery.comparison": "Model comparison: AUC and AP for Logistic Regression and LightGBM",
    "projects.qsearch.gallery.topk": "Top-K evaluation: LightGBM reaches a 54.9% hit rate at Top-1,000",
    "projects.qsearch.gallery.quadrants": "Page category quadrants: post volume versus interaction efficiency",
    "projects.qsearch.gallery.flow": "Implementation flow: weighting, model ranking, cross evidence, original posts, and UI simulation",
    "contribution.kicker": "What I Can Contribute",
    "contribution.title": "A practical teammate for AI application work.",
    "contribution.build.title": "Build useful AI flows",
    "contribution.build.body": "Turn a repeated task into a clear workflow using Python, prompts, LLMs, and lightweight interfaces.",
    "contribution.data.title": "Make data easier to act on",
    "contribution.data.body": "Clean data, compare models, and present the result through metrics, dashboards, and interpretable observations.",
    "contribution.team.title": "Keep projects moving",
    "contribution.team.body": "Plan tasks, communicate progress, and learn quickly when a project needs a new direction.",
    "skills.kicker": "Skills",
    "skills.title": "A practical stack for AI application work.",
    "skills.pythonTitle": "Python & Data",
    "skills.pythonStatus": "Implemented",
    "skills.pythonBody": "Python, Pandas, NumPy, CSV / Parquet, data cleaning, and data preprocessing",
    "skills.aiTitle": "AI / ML",
    "skills.aiStatus": "Implemented",
    "skills.aiBody": "Machine learning, LightGBM, Logistic Regression, model comparison, and evaluation metrics",
    "skills.llmTitle": "LLM & Agent",
    "skills.llmStatus": "Implemented",
    "skills.llmBody": "AI Agent development, prompt design, LLM workflows, response flow, and GraphCodeBERT",
    "skills.toolsTitle": "Tools",
    "skills.toolsStatus": "Used in projects",
    "skills.toolsBody": "Gradio, Streamlit, Docker, Qdrant, NetworkX, and dashboard prototyping",
    "skills.automationTitle": "Automation & Integration",
    "skills.automationStatus": "Currently studying",
    "skills.automationBody": "n8n, AI Agent workflows, API connections, and practical automation patterns",
    "skills.fullstackTitle": "Frontend & Backend",
    "skills.fullstackStatus": "Currently studying",
    "skills.fullstackBody": "HTML, CSS, JavaScript, Node.js, API integration, and database-connected applications",
    "experience.kicker": "Experience",
    "experience.title": "Reliable execution across work, teams, and real settings.",
    "experience.admin.role": "Administrative Support Assistant",
    "experience.admin.body": "Document organization, campus event coordination, administrative support, and internal communication.",
    "experience.accounting.role": "Accounting Firm Assistant",
    "experience.accounting.body": "Document handling, data organization, and basic administrative support in a business workflow.",
    "experience.volunteer.role": "Overseas English Volunteer Service in Cambodia",
    "experience.volunteer.body": "Teaching support, material preparation, local interaction, adaptability, and teamwork.",
    "agent.kicker": "Interactive Resume",
    "agent.title": "Ask about my work",
    "agent.description": "Ask about Mark's AI projects, technical skills, current learning path, automation interests, experience, or contact information.",
    "agent.note": "Start with a suggested question to see how the portfolio explains project evidence.",
    "agent.placeholder": "Ask about Mark's projects, skills, or current learning path...",
    "agent.send": "Send",
    "contact.kicker": "Contact",
    "contact.title": "Let's talk about AI applications, automation, and web development.",
    "contact.description": "Interested in my work? Let's connect.",
    "contact.resume": "Download PDF Resume",
    "footer.note": "AI application engineering internship portfolio"
  },
  zh: {
    "nav.home": "首頁",
    "nav.projects": "作品集",
    "nav.skills": "能力與經歷",
    "nav.agent": "AI 助理",
    "hero.github": "GitHub",
    "theme.dark": "深色",
    "theme.light": "淺色",
    "hero.eyebrow": "AI 應用工程實習作品集",
    "hero.name": "楊祐瑜 / Mark Yang",
    "hero.position": "我把資料與 LLM workflow 轉化成可以實際使用的 AI 應用。",
    "hero.text": "我正在準備投入 AI 應用工程實習，累積 AI Agent、資料處理、dashboard 與實務自動化的實作經驗。",
    "hero.projects": "查看專案成果",
    "hero.askAgent": "詢問 AI Profile Agent",
    "hero.download": "履歷",
    "hero.contact": "聯絡我",
    "hero.proof.agentTitle": "CodeMind",
    "hero.proof.agent": "教學平台・弱點診斷",
    "hero.proof.auc": "QSearch 測試 AUC",
    "hero.proof.automation": "n8n＋AI Agent 學習中",
    "about.kicker": "關於我",
    "about.title": "把學習轉化成實際作品的 AI 實作者。",
    "about.p1": "目前就讀中原大學智慧運算與大數據學系，專注於 Python、機器學習、LLM workflow、AI Agent、程式學習診斷與 dashboard 應用。",
    "about.p2": "目前正從 AI 與資料專案延伸到自動化與前後端開發，持續練習把不同技術整合成可以實際運作的工具。",
    "about.p3": "我正在尋找 AI 應用工程實習機會，希望在真實專案中持續實作與學習。",
    "projects.title": "作品集",
    "home.projects.cta": "查看截圖與完整介紹 →",
    "projects.contributionLabel": "我的貢獻",
    "projects.codemind.roleLabel": "我的角色",
    "projects.codemind.contribution": "主要開發者｜Teacher Web、Backend 教學流程與弱點診斷整合",
    "projects.codemind.title": "CodeMind / AI 程式學習與弱點診斷平台",
    "projects.codemind.body": "CodeMind 是一套整合 VS Code 學生端、教師管理平台、AI 輔導 Agent 與程式弱點診斷的程式學習系統。我以團隊既有的 Agent Twin 與學生端流程為基礎，主要完成教師端介面、後端教學 API、AI 教學政策、診斷模型及跨系統整合。",
    "projects.codemind.point1": "建置教師端與後端教學流程：完成課程、班級、教材、題庫、作業、即時課堂與學生學習歷程，並實作教師、班級及學生資料的權限隔離。",
    "projects.codemind.point2": "整合 AI 輔導與教師介入：設計蘇格拉底式提示、Agent 協助層級、教材引用、教師提示及洩題防護，使回應能依課程政策與學生狀態調整。",
    "projects.codemind.point3": "建立程式弱點診斷流程：整合知識圖譜、R-GCN、GraphCodeBERT 特徵與 FastAPI 推論服務，並以資料切分、消融實驗及可重現測試檢查模型限制。",
    "projects.codemind.evidence.systemsTitle": "4 個整合子系統",
    "projects.codemind.evidence.systemsBody": "Teacher Web、Backend API、VS Code Extension、Diagnosis Service",
    "projects.codemind.evidence.flowTitle": "教學流程串接",
    "projects.codemind.evidence.flowBody": "教師出題 → 學生作答 → 執行紀錄 → 弱點診斷 → 教師介入",
    "projects.codemind.evidence.qualityTitle": "品質驗證",
    "projects.codemind.evidence.qualityBody": "pytest、Vitest、Playwright E2E、權限隔離與 Agent 驗收",
    "projects.codemind.collaboration": "團隊分工：Agent Twin 最初構想與早期學生端流程由團隊成員提出；我負責後續平台化、教學功能、診斷模型、前後端整合與驗收測試。",
    "projects.qsearch.title": "SNA / 社群貼文爆紅預測與內容策略",
    "projects.qsearch.body": "以月份與貼文類別定義前 5% 高互動貼文，使用 LightGBM 進行候選排序；模型在測試集取得 AUC 0.7227、AP 0.1731，前 1,000 篇候選命中率為 54.9%。",
    "projects.qsearch.contribution": "團隊帶領、加權互動指標設計、資料清理、模型比較與專案方向規劃",
    "projects.qsearch.auc": "LightGBM 測試 AUC",
    "projects.qsearch.ap": "LightGBM 測試 AP",
    "projects.qsearch.hitRate": "前 1,000 篇命中率",
    "projects.qsearch.methodLabel": "從模型到內容建議",
    "projects.qsearch.method": "加權互動指標 → LightGBM 排名 → Support、Viral Rate、Lift、互動組成與原文證據。",
    "gallery.prev": "上一張圖片",
    "gallery.next": "下一張圖片",
    "gallery.zoom": "放大圖片",
    "gallery.close": "關閉",
    "gallery.viewer": "圖片檢視",
    "projects.codemind.galleryLabel": "CodeMind 系統截圖",
    "projects.codemind.gallery.classes": "我的班級：班級列表、班級代碼與進入班級（示範資料）",
    "projects.codemind.gallery.overview": "班級總覽：依受影響學生比例排序的班級弱點分析（示範資料）",
    "projects.codemind.gallery.assignment": "作業編輯：題型選擇、題目編輯與發布到班級（示範資料）",
    "projects.codemind.gallery.aiQuestion": "AI 產題預覽：支援 Markdown 與 LaTeX 公式排版（示範資料）",
    "projects.qsearch.galleryLabel": "QSearch 簡報頁面",
    "projects.qsearch.gallery.comparison": "模型表現比較：Logistic Regression 與 LightGBM 的 AUC、AP",
    "projects.qsearch.gallery.topk": "Top-K 評估：LightGBM 在 Top-1,000 的命中率達 54.9%",
    "projects.qsearch.gallery.quadrants": "頁面類別象限圖：貼文量與互動效率",
    "projects.qsearch.gallery.flow": "實作流程：加權、模型排名、交叉佐證、原文檢索與 UI 模擬輸出",
    "contribution.kicker": "我能貢獻什麼",
    "contribution.title": "適合 AI 應用工程團隊的實作型夥伴。",
    "contribution.build.title": "建立有用的 AI 流程",
    "contribution.build.body": "使用 Python、Prompt、LLM 與輕量介面，把重複任務整理成清楚可用的工作流程。",
    "contribution.data.title": "讓資料更容易支持決策",
    "contribution.data.body": "整理資料、比較模型，並透過指標、dashboard 與可解釋觀察呈現結果。",
    "contribution.team.title": "讓專案持續前進",
    "contribution.team.body": "規劃任務、溝通進度，並在方向需要調整時快速學習與適應。",
    "skills.kicker": "技能",
    "skills.title": "面向 AI 應用工程的實作型技能組合。",
    "skills.pythonTitle": "Python 與資料",
    "skills.pythonStatus": "已實作",
    "skills.pythonBody": "Python、Pandas、NumPy、CSV / Parquet、資料清理與資料前處理",
    "skills.aiTitle": "AI 與機器學習",
    "skills.aiStatus": "已實作",
    "skills.aiBody": "機器學習、LightGBM、Logistic Regression、模型比較與評估指標",
    "skills.llmTitle": "LLM 與 Agent",
    "skills.llmStatus": "已實作",
    "skills.llmBody": "AI Agent 開發、Prompt 設計、LLM workflow、回答流程與 GraphCodeBERT",
    "skills.toolsTitle": "工具",
    "skills.toolsStatus": "專案中使用",
    "skills.toolsBody": "Gradio、Streamlit、Docker、Qdrant、NetworkX 與 dashboard 原型製作",
    "skills.automationTitle": "自動化與整合",
    "skills.automationStatus": "目前修習中",
    "skills.automationBody": "n8n、AI Agent workflow、API 串接與實務自動化流程",
    "skills.fullstackTitle": "前端與後端",
    "skills.fullstackStatus": "目前修習中",
    "skills.fullstackBody": "HTML、CSS、JavaScript、Node.js、API 整合與資料庫串接應用",
    "experience.kicker": "經歷",
    "experience.title": "在工作、團隊與現場環境中穩定執行。",
    "experience.admin.role": "行政活動支援工讀生",
    "experience.admin.body": "協助文件整理、校內活動支援、行政作業與單位溝通。",
    "experience.accounting.role": "會計師事務所助理",
    "experience.accounting.body": "協助文件處理、資料整理與基礎行政支援，接觸商務文件與行政流程。",
    "experience.volunteer.role": "柬埔寨海外英文志工服務",
    "experience.volunteer.body": "參與教學活動、教材準備與現場互動，培養溝通、適應力與團隊合作。",
    "agent.kicker": "互動式履歷",
    "agent.title": "詢問我的作品與能力",
    "agent.description": "你可以詢問 Mark 的 AI 專案、技術能力、目前學習方向、自動化興趣、經歷或聯絡方式。",
    "agent.note": "可以先從推薦問題開始，看看這份作品集如何說明專案成果。",
    "agent.placeholder": "詢問 Mark 的專案、技能或目前學習方向...",
    "agent.send": "送出",
    "contact.kicker": "聯絡",
    "contact.title": "歡迎一起聊聊 AI 應用、自動化與網站開發。",
    "contact.description": "對我的作品有興趣，歡迎與我聯絡。",
    "contact.resume": "下載 PDF 履歷",
    "footer.note": "AI 應用工程實習作品集"
  }
};

const prompts = {
  en: [
    "Tell me about Mark.",
    "Why AI Application Engineering?",
    "What AI projects has Mark built?",
    "What is Mark currently learning?",
    "What are Mark's technical skills?",
    "How can I contact Mark?"
  ],
  zh: [
    "介紹一下楊祐瑜",
    "為什麼想做 AI 應用工程？",
    "有哪些 AI 專案經驗？",
    "目前正在學習什麼？",
    "具備哪些技術能力？",
    "如何聯絡？"
  ]
};

const welcome = {
  en: "Hi, I am Mark's AI Profile Agent. You can ask me about his AI projects, technical skills, current learning path, automation interests, experience, or contact information.",
  zh: "你好，我是 Mark 的 AI Profile Agent。你可以問我關於他的 AI 專案、技術能力、目前學習方向、自動化興趣、經歷或聯絡方式。"
};

let currentLang = localStorage.getItem("lang") || "zh";
let messages = [];
let isSending = false;

const langToggle = document.getElementById("langToggle");
const themeToggle = document.getElementById("themeToggle");
const chatLog = document.getElementById("chatLog");
const promptChips = document.getElementById("promptChips");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");

applyLanguage(currentLang);
resetChat();

langToggle.addEventListener("click", () => {
  currentLang = currentLang === "zh" ? "en" : "zh";
  localStorage.setItem("lang", currentLang);
  applyLanguage(currentLang);
  resetChat();
});

themeToggle.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
  updateThemeToggle();
});

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const content = chatInput.value.trim();
  if (!content || isSending) return;
  chatInput.value = "";
  await sendMessage(content);
});

function updateThemeToggle() {
  const isDark = document.documentElement.dataset.theme === "dark";
  themeToggle.textContent = translations[currentLang][isDark ? "theme.light" : "theme.dark"];
}

function applyLanguage(lang) {
  document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en";
  langToggle.textContent = lang === "zh" ? "EN" : "中文";
  updateThemeToggle();

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    node.textContent = translations[lang][key] || translations.en[key] || "";
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    const key = node.getAttribute("data-i18n-placeholder");
    node.placeholder = translations[lang][key] || translations.en[key] || "";
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((node) => {
    const key = node.getAttribute("data-i18n-alt");
    node.alt = translations[lang][key] || translations.en[key] || "";
  });

  document.querySelectorAll("[data-i18n-label]").forEach((node) => {
    const key = node.getAttribute("data-i18n-label");
    node.setAttribute("aria-label", translations[lang][key] || translations.en[key] || "");
  });

  renderPromptChips();
}

function resetChat() {
  messages = [{ role: "assistant", content: welcome[currentLang] }];
  renderChat();
}

function renderPromptChips() {
  promptChips.innerHTML = "";
  prompts[currentLang].forEach((prompt) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = prompt;
    button.addEventListener("click", () => sendMessage(prompt));
    promptChips.appendChild(button);
  });
}

function renderChat() {
  chatLog.innerHTML = "";
  messages.forEach((message) => {
    const bubble = document.createElement("div");
    bubble.className = `message ${message.role}${message.error ? " error" : ""}`;
    bubble.textContent = message.content;
    chatLog.appendChild(bubble);
  });
  chatLog.scrollTop = chatLog.scrollHeight;
}

async function sendMessage(content) {
  isSending = true;
  messages.push({ role: "user", content });
  messages.push({
    role: "assistant",
    content: currentLang === "zh" ? "正在整理 Mark 的履歷資料..." : "Reviewing Mark's profile..."
  });
  renderChat();

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: messages
          .filter((message) => !message.error)
          .slice(0, -1)
      })
    });
    const data = await response.json();
    const reply = response.ok
      ? cleanAgentReply(data.reply)
      : data.error || fallbackError();
    messages[messages.length - 1] = {
      role: "assistant",
      content: reply,
      error: !response.ok
    };
  } catch {
    messages[messages.length - 1] = {
      role: "assistant",
      content: fallbackError(),
      error: true
    };
  } finally {
    isSending = false;
    renderChat();
  }
}

function fallbackError() {
  return currentLang === "zh"
    ? "AI Profile Agent 暫時無法回應。若要了解更多，建議直接透過 Email 或電話聯絡 Mark。"
    : "AI Profile Agent is temporarily unavailable. Please contact Mark by email or phone for more details.";
}

function cleanAgentReply(content) {
  return String(content || "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/^\s*[-*]\s+/gm, "")
    .replace(/^\s*#{1,6}\s+/gm, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// 作品截圖：左右箭頭（或鍵盤左右鍵、手指滑動）切換，點圖放大
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const swipeThreshold = 40;
let lightboxGallery = null;

document.querySelectorAll("[data-gallery]").forEach((gallery) => {
  const slides = [...gallery.querySelectorAll(".gallery-slide")];
  let index = 0;

  gallery.showSlide = (next) => {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== index; });
    if (lightboxGallery === gallery) syncLightbox(slides[index]);
  };
  gallery.step = (delta) => gallery.showSlide(index + delta);

  slides.forEach((slide) => {
    slide.querySelector(".gallery-prev").addEventListener("click", () => gallery.step(-1));
    slide.querySelector(".gallery-next").addEventListener("click", () => gallery.step(1));
    slide.querySelector(".gallery-zoom").addEventListener("click", () => {
      lightboxGallery = gallery;
      syncLightbox(slide);
      lightbox.showModal();
    });
    onSwipe(slide.querySelector(".gallery-frame"), (delta) => gallery.step(delta));
  });
});

function syncLightbox(slide) {
  const image = slide.querySelector("img");
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = slide.querySelector("figcaption span").textContent;
}

// 手指在圖上左滑看下一張、右滑看上一張；點擊不受影響
function onSwipe(element, callback) {
  let startX = null;
  element.addEventListener("touchstart", (event) => { startX = event.touches[0].clientX; }, { passive: true });
  element.addEventListener("touchend", (event) => {
    if (startX === null) return;
    const distance = event.changedTouches[0].clientX - startX;
    startX = null;
    if (Math.abs(distance) >= swipeThreshold) callback(distance < 0 ? 1 : -1);
  });
}

document.getElementById("lightboxPrev").addEventListener("click", () => lightboxGallery.step(-1));
document.getElementById("lightboxNext").addEventListener("click", () => lightboxGallery.step(1));
document.getElementById("lightboxClose").addEventListener("click", () => lightbox.close());
onSwipe(lightbox, (delta) => lightboxGallery && lightboxGallery.step(delta));
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});
lightbox.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") lightboxGallery.step(-1);
  if (event.key === "ArrowRight") lightboxGallery.step(1);
});
lightbox.addEventListener("close", () => { lightboxGallery = null; });

// 分頁：導覽列每個標籤各自一頁，依網址的 # 決定顯示哪一頁；
// 指向頁內區塊的連結（例如 #about、#codemind）會切到該區塊所在的分頁再捲過去，
// 聯絡區塊不屬於任何分頁，所以 #contact 只捲動、不換頁
const pages = [...document.querySelectorAll("[data-page]")];
const navTabs = [...document.querySelectorAll(".nav-links a")];
const topbar = document.querySelector(".topbar");
let currentPage = pages[0];

function showPageFromHash() {
  const id = decodeURIComponent(location.hash.slice(1));
  const target = id ? document.getElementById(id) : null;
  const page = target ? target.closest("[data-page]") : pages[0];
  if (page) currentPage = page;

  pages.forEach((p) => { p.hidden = p !== currentPage; });
  navTabs.forEach((tab) => {
    if (tab.getAttribute("href") === `#${currentPage.id}`) tab.setAttribute("aria-current", "page");
    else tab.removeAttribute("aria-current");
  });

  if (!target || target === currentPage) window.scrollTo({ top: 0, behavior: "instant" });
  // 導覽列是黏在上方的，手機版會換行變高，所以用實際高度扣掉，目標才不會被蓋住
  else window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - topbar.offsetHeight, behavior: "instant" });
}

window.addEventListener("hashchange", showPageFromHash);
showPageFromHash();
