// NASA 每日一天文圖（APOD）的代理：前端打 /api/apod，這裡帶上金鑰再去問 NASA。
// 金鑰只放在環境變數 NASA_API_KEY（本機 .env.local、線上 Vercel 專案設定），不會出現在前端或 Git 裡。

const NASA_URL = "https://api.nasa.gov/planetary/apod";
const UPSTREAM_TIMEOUT_MS = 7000; // 比前端的 8 秒短，前端才收得到我們的 504，而不是自己逾時
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

let warnedAboutDemoKey = false;

function send(res, status, body, headers = {}) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  for (const [key, value] of Object.entries(headers)) {
    if (value !== null && value !== undefined) res.setHeader(key, value);
  }
  res.end(JSON.stringify(body));
}

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    return send(res, 405, { code: 405, msg: "Method not allowed" }, { Allow: "GET" });
  }

  // 只接受 date 一個參數，其他一律不轉給 NASA
  const query = new URL(req.url || "/", "http://localhost").searchParams;
  const date = query.get("date");
  if (date !== null && !DATE_PATTERN.test(date)) {
    return send(res, 400, { code: 400, msg: "date must be YYYY-MM-DD" }, { "Cache-Control": "no-store" });
  }

  let apiKey = process.env.NASA_API_KEY;
  if (!apiKey) {
    // 還沒設定金鑰時先退回 NASA 公開的 DEMO_KEY，網站照樣能用，只是額度很少
    apiKey = "DEMO_KEY";
    if (!warnedAboutDemoKey) {
      console.warn("[apod] NASA_API_KEY is not set; falling back to DEMO_KEY.");
      warnedAboutDemoKey = true;
    }
  }

  const upstream = new URL(NASA_URL);
  upstream.searchParams.set("api_key", apiKey);
  upstream.searchParams.set("thumbs", "true");
  if (date) upstream.searchParams.set("date", date);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const response = await fetch(upstream, { signal: controller.signal });
    const text = await response.text();
    let body;
    try {
      body = JSON.parse(text);
    } catch (e) {
      body = { code: response.status, msg: "NASA returned a non-JSON response" };
    }

    // 成功的結果放在 Vercel CDN 快取：指定日期的內容不會再變，快取一天；「最新一天」只快取一小時。
    // NASA 不穩時會回一張「NASA Science」標誌當佔位，這種不快取，等 NASA 恢復後才拿得到真的圖
    const isPlaceholder = body && body.title === "NASA Science" && /nasa-logo/.test(body.url || "");
    const cacheControl = response.ok && !isPlaceholder
      ? `public, max-age=0, s-maxage=${date ? 86400 : 3600}, stale-while-revalidate=86400`
      : "no-store";

    return send(res, response.status, body, {
      "Cache-Control": cacheControl,
      "X-RateLimit-Remaining": response.headers.get("X-RateLimit-Remaining")
    });
  } catch (error) {
    if (error.name === "AbortError") {
      return send(res, 504, { code: 504, msg: "NASA did not respond in time" }, { "Cache-Control": "no-store" });
    }
    return send(res, 502, { code: 502, msg: "Could not reach NASA" }, { "Cache-Control": "no-store" });
  } finally {
    clearTimeout(timer);
  }
};
