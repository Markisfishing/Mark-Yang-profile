const PROFILE_CONTEXT = `
Mark Yang / 楊祐瑜 is looking for internship opportunities.

Core positioning:
- Chinese name: 楊祐瑜
- English name: Mark Yang
- Target: internship opportunities where he can keep building and learning through real projects
- Education: Intelligent Computing and Big Data, Chung Yuan Christian University
- GitHub: https://github.com/Markisfishing
- Email: y7632457@gmail.com
- Phone: 0979-982-811
- Current learning: automation with n8n and AI Agent workflows; frontend and backend development.

Personality and work style:
- Willing to learn
- Able to work under pressure
- Communicates well
- Responsible
- Cooperates well with different people
- Adaptable in real-world situations
- If given a clear learning direction, Mark is willing to invest effort both during work time and after work, often fully committing to improvement.

Current learning:
- Mark is currently studying automation with n8n and AI Agent workflows.
- He is also studying frontend and backend development to connect AI features with usable web systems.

Technical strengths:
- AI agent development
- Machine learning
- Python
- Data preprocessing
- LLM workflows
- Prompt design
- Gradio dashboards
- GraphCodeBERT
- Remote Agent Twin integration
- Socratic Agent workflow
- R-GCN-based programming weakness diagnosis
- VS Code client and teacher dashboard integration
- Social network analysis
- NetworkX
- Automation workflows with n8n and AI Agents
- Frontend and backend development

Growth areas:
- Mark is still improving coding fluency and database skills. When asked about weaknesses, frame them constructively as active growth areas. Do not hide them, but do not present them as major blockers. Explain that he is strengthening code fluency through project practice and database concepts through structured learning.

CodeMind project:
- An AI programming learning system combining a VS Code student client, teacher management platform, AI tutoring Agent, and programming weakness diagnosis.
- Role: lead developer for Teacher Web, backend teaching workflows, and weakness-diagnosis integration.
- Built courses, classes, materials, question banks, assignments, live classrooms, student learning history, and backend authorization isolation across teachers, classes, and students.
- Integrated Socratic prompts, Agent assistance levels, material citations, teacher hints, answer-leakage safeguards, and responses that adapt to course policy and student state.
- Established a diagnosis pipeline using a knowledge graph, R-GCN, GraphCodeBERT features, FastAPI inference, data splits, ablation experiments, and reproducible tests.
- Integrated four subsystems: Teacher Web, Backend API, VS Code Extension, and the diagnosis service. The teaching workflow connects assignment, submission, execution records, weakness diagnosis, and teacher intervention.
- Quality validation includes pytest, Vitest, Playwright E2E, authorization isolation, and real-Agent acceptance testing.
- Team contribution boundary: the initial Agent Twin concept and early student workflow were proposed by team members. Mark handled subsequent platform development, teaching features, diagnosis models, frontend-backend integration, and acceptance testing.
- Mark also used Agent Twin to generate programming questions and other learning content within the teaching workflow.

QSearch SNA project:
- Full title: Viral Social Media Post Prediction & Strategy Analysis.
- One-line summary: training models to predict which social media posts may gain high future traffic.
- Mark worked on data cleaning, model comparison, and direction-setting as the team leader.
- As team leader, he researched ahead, planned the project direction, and arranged weekly progress.
- The project designed a weighted interaction index: Reaction x 1 + Comment x 13.5 + Share x 20.
- A post is labeled viral_top5 if its interaction score ranks in the top 5% within the same month and category.
- The project compared Logistic Regression against LightGBM.
- LightGBM results: Test AUC 0.7227, Test AP 0.1731, Top-1,000 Hit Rate 54.9%.
- The output combines predictive ranking with interpretable content recommendations using Support, Viral Rate, Lift, interaction composition, and original-post evidence.

Experience:
- Administrative support assistant: document organization, administrative tasks, campus event coordination, internal communication.
- Accounting firm assistant: document handling, data organization, basic administrative support.
- Overseas English volunteer service in Cambodia: teaching activities, material preparation, local interaction, communication, adaptability, teamwork.
`;

// Ref: https://console.groq.com/docs/model/openai/gpt-oss-120b
const DEFAULT_GROQ_MODEL = "openai/gpt-oss-120b";
const LEGACY_GROQ_MODELS = new Set(["llama-3.3-70b-versatile"]);

const SYSTEM_PROMPT = `
You are AI Profile Agent, a bilingual resume assistant for Mark Yang / 楊祐瑜.

Your role is to answer questions about Mark's resume, projects, skills, education, work experience, current learning path, personality, and contact information.

Answer in the same language as the user when possible. Keep responses concise, confident, professional, and recruiter-friendly. Be positive but do not exaggerate or invent facts.

For recruiter-style questions, answer in 2-4 short paragraphs. Prioritize concrete evidence from projects. Avoid overly salesy language.
Use plain text only. Do not use Markdown, asterisks, hyphens as list markers, headings, backticks, or other formatting symbols.

You are Mark's assistant, not Mark himself. Always refer to Mark in the third person: in Chinese use "Mark" or "他", never "我" to mean Mark; in English use "Mark" or "he", never "I" to mean Mark. Only use "我" or "I" when speaking about yourself as the assistant.

Use only the provided profile context. If information is unavailable and the user asks in Chinese, say:
"目前履歷中沒有列出這項資訊，建議直接聯絡 Mark 確認。"

If information is unavailable and the user asks in English, say:
"This information is not listed in Mark's current resume. Please contact Mark directly to confirm."

For unrelated questions, politely redirect the user back to Mark's profile, AI projects, automation learning, technical skills, or contact information.

When appropriate, encourage the user to contact Mark by email or phone for more details.

Profile context:
${PROFILE_CONTEXT}
`;

module.exports = async function handler(req, res) {
  setJsonHeaders(res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (req.method !== "POST") {
    res.writeHead(405);
    return res.end(JSON.stringify({ error: "Method not allowed" }));
  }

  try {
    const body = await readJson(req);
    const messages = normalizeMessages(body.messages);
    const provider = (process.env.AI_PROVIDER || "groq").toLowerCase();
    const callProvider = provider === "openai" ? callOpenAI : callGroq;

    // 前端帶 stream: true 時改成串流：模型一邊產生，這裡一邊轉送給瀏覽器；
    // 訪客關掉頁面就中止對模型的請求，不浪費額度
    if (body.stream === true) {
      const controller = new AbortController();
      res.on("close", () => {
        if (!res.writableEnded) controller.abort();
      });
      const upstream = await callProvider(messages, { stream: true, signal: controller.signal });
      return pipeReplyStream(upstream, res);
    }

    const reply = await callProvider(messages);
    res.writeHead(200);
    res.end(JSON.stringify({ reply }));
  } catch (error) {
    const status = error.statusCode || 500;
    res.writeHead(status);
    res.end(JSON.stringify({
      error: error.publicMessage || "AI Profile Agent is temporarily unavailable."
    }));
  }
};

async function callGroq(messages, options = {}) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw publicError(500, "GROQ_API_KEY is not configured on the server.");
  }

  return callChatCompletions({
    url: "https://api.groq.com/openai/v1/chat/completions",
    apiKey,
    model: getGroqModel(),
    messages,
    ...options
  });
}

function getGroqModel() {
  const configuredModel = process.env.GROQ_MODEL?.trim();
  return configuredModel && !LEGACY_GROQ_MODELS.has(configuredModel)
    ? configuredModel
    : DEFAULT_GROQ_MODEL;
}

async function callOpenAI(messages, options = {}) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw publicError(500, "OPENAI_API_KEY is not configured on the server.");
  }

  return callChatCompletions({
    url: "https://api.openai.com/v1/chat/completions",
    apiKey,
    model: process.env.AI_MODEL || "set-AI_MODEL-in-env",
    messages,
    ...options
  });
}

const EMPTY_REPLY = "目前履歷中沒有列出這項資訊，建議直接聯絡 Mark 確認。";

// stream 為 true 時回傳模型的原始串流回應（交給 pipeReplyStream），否則回傳整段文字
async function callChatCompletions({ url, apiKey, model, messages, stream = false, signal }) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      temperature: 0.35,
      max_tokens: 500,
      stream,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages
      ]
    }),
    signal
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw publicError(response.status, data.error?.message || "The AI provider rejected the request.");
  }
  if (stream) return response;

  const data = await response.json().catch(() => ({}));
  return data.choices?.[0]?.message?.content?.trim() || EMPTY_REPLY;
}

// 把模型的 SSE 串流（每行 data: {...}）轉成給前端的 NDJSON，一行一個事件：
// {"delta":"文字片段"}、最後 {"done":true}；中途出錯送 {"error":"..."}。
// 狀態碼已經送出 200，中途的錯誤只能放在內容裡告訴前端
async function pipeReplyStream(upstream, res) {
  res.writeHead(200, {
    "Content-Type": "application/x-ndjson; charset=utf-8",
    "Cache-Control": "no-cache, no-transform"
  });
  const send = (event) => {
    if (!res.writableEnded && !res.destroyed) res.write(`${JSON.stringify(event)}\n`);
  };

  const decoder = new TextDecoder();
  let buffer = "";
  let sentText = false;
  try {
    for await (const chunk of upstream.body) {
      buffer += decoder.decode(chunk, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop();
      for (const line of lines) {
        if (!line.startsWith("data:")) continue;
        const data = line.slice(5).trim();
        if (data === "[DONE]") continue;
        const delta = JSON.parse(data).choices?.[0]?.delta?.content;
        if (delta) {
          sentText = true;
          send({ delta });
        }
      }
    }
    if (!sentText) send({ delta: EMPTY_REPLY });
    send({ done: true });
  } catch {
    send({ error: "AI Profile Agent is temporarily unavailable." });
  }
  res.end();
}

function normalizeMessages(messages) {
  if (!Array.isArray(messages)) return [];

  return messages
    .filter((message) => message && ["user", "assistant"].includes(message.role))
    .slice(-8)
    .map((message) => ({
      role: message.role,
      content: String(message.content || "").slice(0, 1200)
    }));
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 15000) {
        reject(publicError(413, "Message is too long."));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(publicError(400, "Invalid JSON body."));
      }
    });
    req.on("error", reject);
  });
}

function setJsonHeaders(res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function publicError(statusCode, publicMessage) {
  const error = new Error(publicMessage);
  error.statusCode = statusCode;
  error.publicMessage = publicMessage;
  return error;
}
