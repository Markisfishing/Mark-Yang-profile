// NASA 每日一天文圖（APOD）的代理：前端打 /api/apod，這裡帶上金鑰再去問 NASA。
// 金鑰只放在環境變數 NASA_API_KEY（本機 .env.local、線上 Vercel 專案設定），不會出現在前端或 Git 裡。
//
// 備援：2026 年起 apod.nasa.gov 搬到 science.nasa.gov，官方 APOD API 還照舊網站的格式抓資料，
// 結果每天都回「NASA Science」標誌當佔位圖。所以同時去問 science.nasa.gov 的 WordPress API，
// 官方 API 有真資料就用官方的，是佔位圖或失敗才改用備援。NASA 修好之後備援自然就用不到了。

const NASA_URL = "https://api.nasa.gov/planetary/apod";
const SCIENCE_URL = "https://science.nasa.gov/wp-json/wp/v2/image-article";
const FIRST_DATE = "1995-06-16";
const TOTAL_BUDGET_MS = 7000; // 整個請求最多 7 秒，比前端的 8 秒短，前端才收得到我們的回應而不是自己逾時
const NASA_API_BUDGET_MS = 6000; // 官方 API 有時要等十幾秒；備援先拿到就不等它，這只是兩邊都沒結果時的上限
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

let warnedAboutDemoKey = false;

function send(res, status, body, headers = {}) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  for (const [key, value] of Object.entries(headers)) {
    if (value !== null && value !== undefined) res.setHeader(key, value);
  }
  res.end(JSON.stringify(body));
}

// APOD 以美國東部時間換日
function easternToday() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit"
  }).format(new Date());
}

function isPlaceholder(body) {
  return Boolean(body) && body.title === "NASA Science" && /nasa-logo/.test(body.url || "");
}

// 在期限內 fetch；超時就 abort，丟出 name 為 AbortError 的錯誤
async function fetchBefore(url, deadline, capMs = Infinity) {
  const wait = Math.max(0, Math.min(deadline - Date.now(), capMs));
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), wait);
  try {
    const response = await fetch(url, { signal: controller.signal, headers: { Accept: "application/json" } });
    const text = await response.text();
    return { response, text };
  } finally {
    clearTimeout(timer);
  }
}

// ---------- 官方 APOD API ----------

async function askNasaApi(date, deadline) {
  let apiKey = process.env.NASA_API_KEY;
  if (!apiKey) {
    // 還沒設定金鑰時先退回 NASA 公開的 DEMO_KEY，網站照樣能用，只是額度很少
    apiKey = "DEMO_KEY";
    if (!warnedAboutDemoKey) {
      console.warn("[apod] NASA_API_KEY is not set; falling back to DEMO_KEY.");
      warnedAboutDemoKey = true;
    }
  }

  const url = new URL(NASA_URL);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("thumbs", "true");
  url.searchParams.set("date", date);

  try {
    const { response, text } = await fetchBefore(url, deadline, NASA_API_BUDGET_MS);
    let body;
    try {
      body = JSON.parse(text);
    } catch (e) {
      body = { code: response.status, msg: "NASA returned a non-JSON response" };
    }
    return { status: response.status, body, remaining: response.headers.get("X-RateLimit-Remaining") };
  } catch (error) {
    return error.name === "AbortError"
      ? { status: 504, body: { code: 504, msg: "NASA did not respond in time" } }
      : { status: 502, body: { code: 502, msg: "Could not reach NASA" } };
  }
}

// ---------- 備援：science.nasa.gov ----------

function decodeEntities(text) {
  const named = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", hellip: "…", ndash: "–", mdash: "—", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“" };
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code) => {
    if (code[0] === "#") {
      const n = code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : match;
    }
    return named[code.toLowerCase()] ?? match;
  });
}

function toPlainText(html) {
  return decodeEntities(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").replace(/\s+([.,;:!?)])/g, "$1").trim();
}

// 從文章 HTML 拆出 APOD 欄位；格式和 science.nasa.gov 文章頁的上半部一樣
function parseArticle(post, date) {
  const html = (post.content && post.content.rendered) || "";

  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const title = h1
    ? toPlainText(h1[1])
    : toPlainText((post.title && post.title.rendered) || "").replace(/^APOD:\s*\d{4}\s+\w+\s+\d{1,2}\s*[–-]\s*/, "");

  const explanationMatch = html.match(/<strong>\s*Explanation:?\s*<\/strong>([\s\S]*?)(?:<\/p>|<\/div>)/i);
  const explanation = explanationMatch ? toPlainText(explanationMatch[1]) : "";

  // 舊文章欄名是「Credit」，近期文章是「Credit &amp; Copyright」
  const creditMatch = html.match(/<th[^>]*>\s*Credits?(?:\s*(?:&amp;|&|and)\s*Copyright)?\s*<\/th>\s*<td[^>]*>([\s\S]*?)<\/td>/i);
  const copyright = creditMatch
    ? toPlainText(creditMatch[1]).replace(/^(?:Image|Video|Illustration|Animation|Images)?\s*Credits?(?:\s*(?:&|and)\s*Copyright)?\s*:\s*/i, "")
    : "";

  // 只看媒體區（標題之前），避免抓到說明裡的連結或頁尾的圖
  const start = html.indexOf("media-detail-hero__media");
  const end = html.indexOf("<h1", start + 1);
  const media = start >= 0 ? html.slice(start, end > start ? end : undefined) : html.slice(0, html.indexOf("Explanation"));

  const base = { date, title, explanation, service_version: "science.nasa.gov", source_url: post.link };
  if (copyright) base.copyright = copyright;

  const iframe = media.match(/<iframe[^>]+src="([^"]+)"/i);
  if (iframe) return { ...base, media_type: "video", url: decodeEntities(iframe[1]) };

  const video = media.match(/<(?:video|source)[^>]+src="([^"]+\.(?:mp4|webm|ogg)[^"]*)"/i) || media.match(/href="([^"]+\.(?:mp4|webm|ogg))"/i);
  if (video) return { ...base, media_type: "video", url: decodeEntities(video[1]) };

  const full = media.match(/<a[^>]+href="(https:\/\/[^"]+\.(?:jpe?g|png|gif|webp))"/i);
  const shown = media.match(/<img[^>]+src="([^"]+)"/i);
  const featured = post.featured_image && post.featured_image.file;
  const url = shown ? decodeEntities(shown[1]) : post.featured_image_url || featured;
  if (url && !/news-thumbnail/.test(url)) {
    return { ...base, media_type: "image", url, hdurl: full ? decodeEntities(full[1]) : featured || url };
  }

  // 找不到圖也找不到影片（例如互動網頁），交給前端顯示「其他格式」
  return { ...base, media_type: "other", url: "" };
}

async function askScienceSite(date, deadline) {
  const [year, month, day] = date.split("-").map(Number);
  const monthName = MONTHS[month - 1];
  const capital = monthName[0].toUpperCase() + monthName.slice(1);
  // 網址代稱長這樣：apod-2026-november-1-colors-of-the-moon；1996 年以前的舊文章日期補零：apod-1996-january-01-…
  const prefixes = [`apod-${year}-${monthName}-${day}-`, `apod-${year}-${monthName}-${String(day).padStart(2, "0")}-`];
  const queries = [`APOD ${year} ${capital} ${day}`];
  if (day < 10) queries.push(`APOD ${year} ${capital} 0${day}`);

  for (const query of queries) {
    const url = new URL(SCIENCE_URL);
    url.searchParams.set("search", query);
    url.searchParams.set("per_page", "20");
    url.searchParams.set("_fields", "slug,link,title,content,featured_image,featured_image_url");
    try {
      const { response, text } = await fetchBefore(url, deadline);
      if (!response.ok) continue;
      const posts = JSON.parse(text);
      const post = Array.isArray(posts) && posts.find((p) => prefixes.some((prefix) => (p.slug || "").startsWith(prefix)));
      if (post) return parseArticle(post, date);
    } catch (error) {
      if (error.name === "AbortError") return null;
    }
  }
  return null;
}

// ---------- 入口 ----------

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    return send(res, 405, { code: 405, msg: "Method not allowed" }, { Allow: "GET" });
  }

  // 只接受 date 一個參數，其他一律不轉給 NASA；沒給就用美東的今天
  const query = new URL(req.url || "/", "http://localhost").searchParams;
  const date = query.get("date") || easternToday();
  if (!DATE_PATTERN.test(date)) {
    return send(res, 400, { code: 400, msg: "date must be YYYY-MM-DD" }, { "Cache-Control": "no-store" });
  }
  const today = easternToday();
  if (date < FIRST_DATE || date > today) {
    return send(res, 400, { code: 400, msg: `Date must be between ${FIRST_DATE} and ${today}.` }, { "Cache-Control": "no-store" });
  }

  // 兩邊同時開跑，誰先拿到「真的」當天內容就用誰（兩邊是同一篇 APOD）。
  // 官方 API 常常十幾秒才回、或回佔位圖，不必等它；額度用完（429）也不影響備援，因為備援不用金鑰
  const deadline = Date.now() + TOTAL_BUDGET_MS;
  const officialPromise = askNasaApi(date, deadline);
  const fallbackPromise = askScienceSite(date, deadline).catch(() => null);

  // 成功的結果放在 Vercel CDN 快取：過去的日期內容不會再變，快取一天；今天只快取一小時
  const goodCache = `public, max-age=0, s-maxage=${date === today ? 3600 : 86400}, stale-while-revalidate=86400`;

  try {
    const winner = await Promise.any([
      officialPromise.then((r) => (r.status === 200 && !isPlaceholder(r.body) ? { source: "api", r } : Promise.reject())),
      fallbackPromise.then((body) => (body ? { source: "science.nasa.gov", r: { status: 200, body } } : Promise.reject()))
    ]);
    return send(res, 200, winner.r.body, {
      "Cache-Control": goodCache,
      "X-APOD-Source": winner.source,
      "X-RateLimit-Remaining": winner.r.remaining
    });
  } catch (e) {
    // 兩邊都沒有：照官方的回應回（佔位圖、429、5xx、504），前端各有對應畫面；都不快取，NASA 恢復後才拿得到真資料
    const official = await officialPromise;
    return send(res, official.status, official.body, {
      "Cache-Control": "no-store",
      "X-RateLimit-Remaining": official.remaining
    });
  }
};
