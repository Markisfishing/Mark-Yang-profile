const translations = {
  en: {
    "nav.home": "Home",
    "nav.projects": "Portfolio",
    "nav.skills": "About",
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
    "home.projects.cta": "See screenshots and details",
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
    "projects.tools.title": "Interactive Tools",
    "projects.tools.cta": "Open the tool",
    "projects.tools.llmCost.title": "LLM API Cost Estimator",
    "projects.tools.llmCost.body": "Enter tokens per call, calls per day, and per-million-token prices to estimate the monthly API bill before shipping an AI feature.",
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
    "nav.skills": "關於我",
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
    "home.projects.cta": "查看截圖與完整介紹",
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
    "projects.tools.title": "互動小工具",
    "projects.tools.cta": "開啟工具",
    "projects.tools.llmCost.title": "LLM API 成本估算器",
    "projects.tools.llmCost.body": "輸入每次呼叫的 token 數、每天呼叫次數與每百萬 token 單價，在上線 AI 功能之前先估出每月的 API 花費。",
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
const chatSend = chatForm.querySelector("button[type='submit']");

applyLanguage(currentLang);
resetChat();

langToggle.addEventListener("click", () => {
  currentLang = currentLang === "zh" ? "en" : "zh";
  localStorage.setItem("lang", currentLang);
  applyLanguage(currentLang);
  resetChat();
  moveNavIndicator();
});

themeToggle.addEventListener("click", () => {
  const root = document.documentElement;
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  // 只在切換的這一下開啟全頁顏色漸變，等 body 背景漸變完就拿掉，平常的轉場不受影響
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
  renderChat(0);
}

function renderPromptChips() {
  promptChips.innerHTML = "";
  prompts[currentLang].forEach((prompt) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = prompt;
    button.disabled = isSending;
    button.addEventListener("click", () => {
      if (isSending) return;
      replay(button, "is-picked");
      sendMessage(prompt);
    });
    promptChips.appendChild(button);
  });
}

// animateFrom：從第幾則訊息開始播進場動畫，之前的訊息直接顯示，重畫時才不會整串一起動
function renderChat(animateFrom = messages.length) {
  chatLog.innerHTML = "";
  messages.forEach((message, i) => {
    const bubble = document.createElement("div");
    bubble.className = `message ${message.role}${message.error ? " error" : ""}${message.streaming ? " is-streaming" : ""}${i >= animateFrom ? " is-entering" : ""}`;
    bubble.textContent = message.display ?? message.content;
    if (message.pending) {
      const dots = document.createElement("span");
      dots.className = "typing-dots";
      dots.setAttribute("aria-hidden", "true");
      dots.append(document.createElement("span"), document.createElement("span"), document.createElement("span"));
      bubble.prepend(dots);
    }
    chatLog.appendChild(bubble);
  });
  chatLog.scrollTop = chatLog.scrollHeight;
}

// 等待回覆時送出鈕與推薦問題都停用，避免重複送出
function setSending(sending) {
  isSending = sending;
  chatSend.disabled = sending;
  chatSend.toggleAttribute("aria-busy", sending);
  // 串流時文字一直在變，aria-busy 讓螢幕閱讀器等回答完整了再一次念出來
  chatLog.toggleAttribute("aria-busy", sending);
  promptChips.querySelectorAll("button").forEach((button) => { button.disabled = sending; });
}

async function sendMessage(content) {
  setSending(true);
  messages.push({ role: "user", content });
  const reply = {
    role: "assistant",
    content: currentLang === "zh" ? "正在整理 Mark 的履歷資料" : "Reviewing Mark's profile",
    pending: true
  };
  messages.push(reply);
  renderChat(messages.length - 2);

  const history = messages.filter((message) => !message.error && message !== reply);
  let raw = "";
  let bubble = null;

  // 收到的文字交給打字機，畫面上一個字一個字打出來；第一次打字時把「正在整理」換成回答泡泡
  const typer = createTypewriter((text) => {
    reply.display = text;
    // 等待途中切換語言會清空對話，這則回答已不在畫面上就不用再畫
    if (!messages.includes(reply)) return;
    if (!bubble) {
      reply.pending = false;
      reply.streaming = true;
      renderChat(messages.length - 1);
      bubble = chatLog.lastElementChild;
    } else {
      bubble.textContent = text;
      chatLog.scrollTop = chatLog.scrollHeight;
    }
  });
  const receive = () => {
    reply.content = cleanAgentReply(raw);
    typer.update(reply.content);
  };

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stream: true, messages: history })
    });
    if (!response.ok || !response.body) {
      const data = await response.json().catch(() => ({}));
      throw Object.assign(new Error("chat failed"), { publicMessage: data.error });
    }

    if ((response.headers.get("Content-Type") || "").includes("application/json")) {
      // 後端還是舊版（沒重開的本機伺服器）會一次回整段 JSON，一樣用打字機打出來
      const data = await response.json();
      raw = String(data.reply || "");
      receive();
    } else {
      // 串流：每收到一段就交給打字機，打字速度穩定，不會隨網路一塊一塊跳出來
      await readReplyStream(response, (delta) => {
        raw += delta;
        receive();
      });
    }
    await typer.finish();
  } catch (error) {
    // 回答到一半斷掉：停止打字，保留已收到的文字，後面接上錯誤說明
    typer.stop();
    reply.error = true;
    reply.content = raw
      ? `${cleanAgentReply(raw)}\n\n${fallbackError()}`
      : error.publicMessage || fallbackError();
  } finally {
    // 串流結束卻一個字都沒收到：顯示錯誤說明，而不是把「正在整理」留在畫面上
    if (!reply.error && !raw) {
      reply.error = true;
      reply.content = fallbackError();
    }
    delete reply.display;
    reply.pending = false;
    reply.streaming = false;
    setSending(false);
    // 有串流過的泡泡已經在畫面上，不再重播進場；錯誤或整段回覆才播
    if (messages.includes(reply)) renderChat(bubble ? messages.length : messages.length - 1);
  }
}

// 打字機：update 給它目前收到的完整文字，畫面依經過的時間多顯示幾個字追上去。
// 平常每秒 60 字；落後的字數比 60 多時，改成「每秒補上落後的字數」，越落後打越快，
// 長回答也不會讓人等太久。用時間而不是畫格計算，120Hz 螢幕或掉格時速度都一樣。
// 計時用 setTimeout 而不是 requestAnimationFrame：視窗被擋住時畫格會停，回答就會卡住不出來。
// 分頁在背景或開了「減少動態效果」就直接顯示全部
const typeCharsPerSecond = 60;
const typeTickMs = 16;

function createTypewriter(onRender) {
  let target = "";
  let shown = 0;
  let last = null;
  let frame = null;
  let resolveDone = null;

  const settle = () => {
    frame = null;
    last = null;
    if (resolveDone) resolveDone();
    resolveDone = null;
  };
  const tick = () => {
    const now = performance.now();
    const elapsed = last === null ? 0 : (now - last) / 1000;
    last = now;
    const backlog = target.length - shown;
    const step = reduceMotion.matches || document.hidden
      ? backlog
      : Math.max(typeCharsPerSecond, backlog) * elapsed;
    shown = Math.min(target.length, shown + step);
    onRender(target.slice(0, Math.floor(shown)));
    if (shown < target.length) frame = setTimeout(tick, typeTickMs);
    else settle();
  };

  return {
    update(text) {
      target = text;
      shown = Math.min(shown, target.length);
      if (!frame && shown < target.length) frame = setTimeout(tick);
    },
    finish() {
      return frame ? new Promise((resolve) => { resolveDone = resolve; }) : Promise.resolve();
    },
    stop() {
      clearTimeout(frame);
      settle();
    }
  };
}

// 讀 /api/chat 的 NDJSON 串流：一行一個事件，{"delta"} 是文字片段、{"error"} 是中途出錯
async function readReplyStream(response, onDelta) {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  for (;;) {
    const { value, done } = await reader.read();
    buffer += decoder.decode(value, { stream: !done });
    const lines = buffer.split("\n");
    buffer = done ? "" : lines.pop();
    for (const line of lines) {
      if (!line.trim()) continue;
      const event = JSON.parse(line);
      if (event.error) throw new Error(event.error);
      if (event.delta) onDelta(event.delta);
    }
    if (done) return;
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
const autoplayDelay = 4000;
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
let lightboxGallery = null;

document.querySelectorAll("[data-gallery]").forEach((gallery, galleryIndex) => {
  const slides = [...gallery.querySelectorAll(".gallery-slide")];
  let index = 0;
  let autoplayTimer = null;

  // 自動輪播：像電視牆一樣每 4 秒換下一張。滑鼠停在圖上、鍵盤焦點在圖庫裡、放大檢視開著、
  // 分頁不在畫面上、或使用者開了「減少動態效果」時都先停下來，不搶正在看的人
  const autoplayTick = () => {
    const paused = gallery.matches(":hover, :focus-within") || lightbox.open || document.hidden
      || !gallery.offsetParent || reduceMotion.matches;
    if (!paused) gallery.showSlide(index + 1, 1);
  };
  const restartAutoplay = () => {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(autoplayTick, autoplayDelay);
  };

  gallery.showSlide = (next, direction = 0) => {
    const previous = slides[index];
    index = (next + slides.length) % slides.length;
    const current = slides[index];
    // 每張圖都有自己的箭頭，舊的那張藏起來焦點會掉；用鍵盤操作時把焦點移到新圖的同一顆按鈕
    const focused = previous !== current && previous.contains(document.activeElement) ? document.activeElement : null;
    slides.forEach((slide, i) => { slide.hidden = i !== index; });
    if (focused) current.querySelector(`.${focused.classList[0]}`).focus();
    if (direction) {
      crossfade(previous, current);
      replay(current, "is-switching");
    }
    preloadNext();
    if (lightboxGallery === gallery) syncLightbox(current, direction);
  };

  // 下一張先載好，交叉淡化時新圖才不會是空白
  const preloadNext = () => { slides[(index + 1) % slides.length].querySelector("img").loading = "eager"; };
  preloadNext();
  // 手動換圖後重新計時，剛按完不會馬上又被自動切走
  gallery.step = (delta) => {
    gallery.showSlide(index + delta, delta);
    restartAutoplay();
  };
  // 兩組圖庫錯開半個間隔，不會同時換圖
  setTimeout(restartAutoplay, galleryIndex * autoplayDelay / 2);

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

function syncLightbox(slide, direction = 0) {
  const image = slide.querySelector("img");
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = slide.querySelector("figcaption span").textContent;
  if (direction) replay(lightbox, "is-switching");
}

// 交叉淡化：把舊圖複製一張疊在新圖上面慢慢變透明，新圖就從底下浮現；
// 疊圖插在箭頭前面，箭頭仍在最上層，淡完就移除
function crossfade(previous, current) {
  const ghost = previous.querySelector(".gallery-zoom img").cloneNode();
  ghost.className = "gallery-ghost";
  ghost.alt = "";
  ghost.removeAttribute("data-i18n-alt");
  ghost.setAttribute("aria-hidden", "true");
  const frame = current.querySelector(".gallery-frame");
  frame.insertBefore(ghost, frame.querySelector(".gallery-prev"));
  ghost.addEventListener("animationend", () => ghost.remove(), { once: true });
}

// 放大檢視關閉時先播退場動畫再真的關掉；按 Esc 也走同一條路
function closeLightbox() {
  if (!lightbox.open || lightbox.classList.contains("is-closing")) return;
  lightbox.classList.add("is-closing");
  const finish = () => {
    if (!lightbox.classList.contains("is-closing")) return;
    lightbox.classList.remove("is-closing");
    lightbox.close();
  };
  lightbox.addEventListener("animationend", finish, { once: true });
  // 分頁在背景時動畫不會跑完，時間到了也要關掉
  setTimeout(finish, parseFloat(getComputedStyle(lightbox).animationDuration) * 1000 + 50);
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
document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
onSwipe(lightbox, (delta) => lightboxGallery && lightboxGallery.step(delta));
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
lightbox.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeLightbox();
});
lightbox.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") lightboxGallery.step(-1);
  if (event.key === "ArrowRight") lightboxGallery.step(1);
});
lightbox.addEventListener("close", () => { lightboxGallery = null; });

// 分頁：導覽列每個標籤各自一頁，依網址的 # 決定顯示哪一頁；
// 指向頁內區塊的連結（例如 #about、#contact、#codemind）會切到該區塊所在的分頁再捲過去
const pages = [...document.querySelectorAll("[data-page]")];
const navTabs = [...document.querySelectorAll(".nav-links a")];
const topbar = document.querySelector(".topbar");
const navIndicator = document.createElement("span");
let currentPage = null;

navIndicator.className = "nav-indicator";
navIndicator.setAttribute("aria-hidden", "true");
document.querySelector(".nav-links").appendChild(navIndicator);

function showPageFromHash() {
  const id = decodeURIComponent(location.hash.slice(1));
  const target = id ? document.getElementById(id) : null;
  const page = (target ? target.closest("[data-page]") : pages[0]) || currentPage || pages[0];
  // 第一次載入不淡入（首頁開頭有自己的進場），之後換頁才淡入
  if (currentPage && page !== currentPage) replay(page, "is-entering");
  currentPage = page;

  pages.forEach((p) => { p.hidden = p !== currentPage; });
  navTabs.forEach((tab) => {
    if (tab.getAttribute("href") === `#${currentPage.id}`) tab.setAttribute("aria-current", "page");
    else tab.removeAttribute("aria-current");
  });
  moveNavIndicator();

  if (!target || target === currentPage) window.scrollTo({ top: 0, behavior: "instant" });
  // 導覽列是黏在上方的，手機版會換行變高，所以用實際高度扣掉，目標才不會被蓋住
  else window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - topbar.offsetHeight, behavior: "instant" });
}

// 底線對齊目前分頁標籤的文字（扣掉左右內距）；語言切換或視窗縮放後標籤寬度會變，要重算
function moveNavIndicator() {
  const tab = navTabs.find((t) => t.hasAttribute("aria-current"));
  if (!tab) return;
  const inset = parseFloat(getComputedStyle(tab).paddingLeft);
  const top = tab.offsetTop + tab.offsetHeight - navIndicator.offsetHeight;
  navIndicator.style.width = `${tab.offsetWidth - inset * 2}px`;
  navIndicator.style.transform = `translate(${tab.offsetLeft + inset}px, ${top}px)`;
}

// 重播一次 CSS 動畫：先拿掉 class、強制重排，再加回去；播完自動拿掉
function replay(element, className) {
  element.classList.remove(className);
  void element.offsetWidth;
  element.classList.add(className);
  element.addEventListener("animationend", () => element.classList.remove(className), { once: true });
}

// 首頁開頭的進場只播一次：最後一個元素播完就拿掉 is-intro，之後回到首頁不再重播
const hero = document.querySelector(".hero.is-intro");
if (hero) hero.querySelector(".hero-proof").addEventListener("animationend", () => hero.classList.remove("is-intro"), { once: true });

// 捲動進場：卡片進入畫面時淡入上移一次，播完拿掉 class，卡片原本的 hover 效果才不會被延遲
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const card = entry.target;
      revealObserver.unobserve(card);
      card.classList.add("is-visible");
      card.addEventListener("transitionend", () => card.classList.remove("reveal", "is-visible"), { once: true });
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".preview-card, .contribution-card, .skill-block, .timeline article, .metric-row > div").forEach((card) => {
    card.classList.add("reveal");
    revealObserver.observe(card);
  });
}

window.addEventListener("hashchange", showPageFromHash);
window.addEventListener("resize", moveNavIndicator);
showPageFromHash();
// 第一次定位不要有滑動，下一個畫格才開啟轉場
requestAnimationFrame(() => navIndicator.classList.add("is-ready"));
