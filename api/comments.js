// 留言板 API（Vercel Function）：GET 拿最新的留言、POST 新增一則
// 網址就是檔案位置：api/comments.js → /api/comments
//
// 留言存在 Supabase（Postgres）的 comments 資料表，資料表結構在 supabase/migrations/。
// 金鑰只在這支後端程式讀（SUPABASE_URL、SUPABASE_SECRET_KEY，放在 .env.local 與 Vercel 環境變數），
// 網頁不直接連資料庫：資料表開了 RLS，網頁拿得到的公開金鑰讀不到也寫不進去
//
// 管理留言（在 Supabase 後台 Table Editor 操作）：
//   下架：comments 表把 status 改成 hidden（改回 visible 就恢復），公開列表只顯示 visible
//   封鎖：把那則留言的 ip_hash 加到 blocked_sources 表，那個來源之後送不出留言
//   通知：設定 DISCORD_WEBHOOK_URL 後，每則新留言都會發到 Discord（見 api/_notify.js）
const crypto = require("crypto");
const { createClient } = require("@supabase/supabase-js");
const { notifyNewComment } = require("./_notify.js");

// ── 欄位規則 ─────────────────────────────────────────
// 一則留言只有四格：id 和 createdAt 由資料庫產生，name 和 body 由使用者送
// 長度用「字」算（[...text].length），中文、emoji 都算一個字；資料表的 check 也是同樣的上限
const FIELDS = {
  name: { label: "暱稱", max: 20 },
  body: { label: "留言內容", max: 200 }
};
const ALLOWED_METHODS = ["GET", "POST"];
const MAX_BODY_BYTES = 4000;   // 兩個欄位加起來最多兩百多個字，超過這個大小一定是亂送的
const LIST_LIMIT = 100;        // 一次最多列出最新的 100 則

// ── 防洗版規則 ───────────────────────────────────────
// 同一個來源（IP 雜湊）：兩則之間至少隔 30 秒、一小時最多 5 則；同樣的內容一小時內只能出現一次
// 計數存在資料庫，Vercel 開幾個實例都算同一份
const RATE_LIMITS = [
  { windowMs: 30 * 1000, max: 1 },
  { windowMs: 60 * 60 * 1000, max: 5 }
];
const DUPLICATE_WINDOW_MS = 60 * 60 * 1000;
const MAX_LINKS = 1;           // 留言最多一個網址，塞一堆連結的幾乎都是廣告
const HONEYPOT_FIELD = "website";  // 隱藏欄位：真人看不到不會填，機器人常把每一格都填滿

// ── 資料存放：Supabase ───────────────────────────────
// 第一次用到才建立連線物件，之後同一支程式重複使用；沒設定金鑰時回 503，不讓整支程式掛掉
let supabase = null;
function getDb() {
  if (supabase) return supabase;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw publicError(503, "留言板暫時無法使用（資料庫尚未設定）");
  supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  return supabase;
}

// 資料庫的欄位叫 created_at，回給前端時換成 createdAt，前端不用管資料庫怎麼命名
const COLUMNS = "id, name, body, created_at";
const toComment = (row) => ({ id: row.id, name: row.name, body: row.body, createdAt: row.created_at });

async function listComments() {
  const { data, error } = await getDb()
    .from("comments")
    .select(COLUMNS)
    .eq("status", "visible")
    .order("created_at", { ascending: false })
    .limit(LIST_LIMIT);
  if (error) throw dbError(error);
  return data.map(toComment);
}

async function addComment(name, body, ipHash) {
  const { data, error } = await getDb()
    .from("comments")
    .insert({ name, body, ip_hash: ipHash })
    .select(COLUMNS)
    .single();
  if (error) throw dbError(error);
  return toComment(data);
}

// 這個來源有沒有在封鎖名單上（blocked_sources 表）
async function isBlocked(ipHash) {
  const { data, error } = await getDb().from("blocked_sources").select("ip_hash").eq("ip_hash", ipHash).limit(1);
  if (error) throw dbError(error);
  return data.length > 0;
}

// 檢查同一個來源是不是送太快、或重送一樣的內容；沒問題回 null，有問題回要拋出的錯誤
async function checkSpam(ipHash, body) {
  const now = Date.now();
  const longest = Math.max(...RATE_LIMITS.map((rule) => rule.windowMs));
  const since = new Date(now - Math.max(longest, DUPLICATE_WINDOW_MS)).toISOString();

  const [recent, duplicate] = await Promise.all([
    getDb().from("comments").select("created_at")
      .eq("ip_hash", ipHash).gte("created_at", since)
      .order("created_at", { ascending: false }).limit(Math.max(...RATE_LIMITS.map((rule) => rule.max))),
    getDb().from("comments").select("id")
      .eq("body", body).gte("created_at", new Date(now - DUPLICATE_WINDOW_MS).toISOString()).limit(1)
  ]);
  if (recent.error) throw dbError(recent.error);
  if (duplicate.error) throw dbError(duplicate.error);

  // 每條規則：視窗內的則數到上限，就要等到「視窗內最舊那則」滑出視窗才能再送
  const times = recent.data.map((row) => Date.parse(row.created_at));
  let waitMs = 0;
  for (const { windowMs, max } of RATE_LIMITS) {
    const inWindow = times.filter((time) => now - time < windowMs);
    if (inWindow.length >= max) waitMs = Math.max(waitMs, inWindow[max - 1] + windowMs - now);
  }
  if (waitMs > 0) {
    const retryAfter = Math.ceil(waitMs / 1000);
    const wait = retryAfter >= 60 ? `${Math.ceil(retryAfter / 60)} 分鐘` : `${retryAfter} 秒`;
    return spamError(429, "rateLimited", `留言送得太快了，請 ${wait}後再試`, { retryAfter });
  }
  if (duplicate.data.length) return spamError(409, "duplicate", "這則留言剛剛已經有人送過了");
  return null;
}

// 送出者的來源：Vercel 會把真正的 IP 放在 x-forwarded-for 第一個；本機開發沒有就用連線位址
// 只存 HMAC 雜湊，資料庫外洩也拿不到原始 IP
function ipHashOf(req) {
  const forwarded = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  const ip = forwarded || req.headers["x-real-ip"] || req.socket?.remoteAddress || "unknown";
  const secret = process.env.IP_HASH_SECRET || process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  return crypto.createHmac("sha256", secret).update(ip).digest("hex");
}

function spamError(statusCode, reason, message, extra = {}) {
  const error = publicError(statusCode, message);
  error.payload = { reason, ...extra };
  return error;
}

// 資料庫的原始錯誤只印在伺服器的 log，回給使用者的是看得懂、不洩漏細節的中文
function dbError(error) {
  console.error("Supabase 錯誤：", error.message);
  return publicError(502, "資料庫暫時連不上，請稍後再試");
}

// ── 入口：依方法分給不同的處理 ─────────────────────────
module.exports = async function handler(req, res) {
  let status = 500;
  try {
    if (req.method === "GET") {
      const comments = await listComments();
      status = 200;
      return sendJson(res, status, { comments });
    }

    if (req.method === "POST") {
      const input = cleanInput(await readJson(req));
      const fieldErrors = validate(input);
      if (fieldErrors.length) {
        status = 400;
        // problems 是給人看的中文原因；fieldErrors 讓頁面標出是哪一格，英文介面也能自己換成英文
        const problems = fieldErrors.map((e) => e.message);
        return sendJson(res, status, { error: problems[0], problems, fieldErrors });
      }

      // 隱藏欄位有填：當成機器人，不存，也不說原因
      if (input[HONEYPOT_FIELD]) {
        status = 400;
        return sendJson(res, status, { error: "送出失敗，請重新整理頁面再試" });
      }

      const { name, body } = input;
      const ipHash = ipHashOf(req);
      // 被封鎖的來源：只說「無法留言」，不說被封鎖，免得對方換個方式再來
      if (await isBlocked(ipHash)) throw spamError(403, "blocked", "目前無法留言");
      const spam = await checkSpam(ipHash, body);
      if (spam) throw spam;

      const comment = await addComment(name, body, ipHash);
      // 等通知送出再回應（最多 3 秒）：Vercel 回應送出後程式可能就被暫停，通知會發不出去
      await notifyNewComment(comment, ipHash);
      status = 201;
      return sendJson(res, status, { comment });
    }

    // 網址對、方法不對：回 405，並在 Allow 標頭與訊息裡說出可以用哪些方法
    status = 405;
    res.setHeader("Allow", ALLOWED_METHODS.join(", "));
    return sendJson(res, status, {
      error: `不支援 ${req.method}，這條網址只能用 ${ALLOWED_METHODS.join(" 或 ")}`,
      allowed: ALLOWED_METHODS
    });
  } catch (error) {
    // 送來的不是合法 JSON、或太大：是送的人的問題，回 4xx 和看得懂的原因；
    // 資料庫連不上回 502／503；其他才是伺服器自己出錯
    // 送太快（429）、重複（409）也走這裡，payload 帶 reason 讓頁面換成對應語言
    status = error.statusCode || 500;
    if (!error.statusCode) console.error(error);
    if (error.payload?.retryAfter) res.setHeader("Retry-After", String(error.payload.retryAfter));
    return sendJson(res, status, { error: error.publicMessage || "伺服器出錯了，請稍後再試", ...error.payload });
  } finally {
    // 每個請求在終端機印一行：方法、網址、狀態碼。出問題時看這一行就知道請求有沒有送到後端
    console.log(`${req.method} ${req.url} → ${status}`);
  }
};

// ── 清理：先把看不到、會撐版的字元處理掉，再驗證與存檔 ─────────
// 統一換行、去掉控制字元與零寬字元（看不到卻會算進字數、也能拿來繞過重複檢查）
// 留言最多連續空一行（不讓一則留言用一堆空行撐得很長），暱稱不能換行，連續空白縮成一個
// 200D（零寬連字）不刪：emoji 家族、膚色組合靠它接起來
const INVISIBLE = /[\u0000-\u0008\u000B-\u001F\u007F-\u009F\u200B-\u200C\u200E-\u200F\u2028-\u202E\u2060-\u2064\uFEFF]/g;
function cleanText(text, { multiline }) {
  let value = text.normalize("NFC").replace(/\r\n?/g, "\n").replace(INVISIBLE, "");
  value = multiline
    ? value.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n")
    : value.replace(/\s+/g, " ");
  return value.trim();
}

function cleanInput(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return input;
  const output = { ...input };
  if (typeof input.name === "string") output.name = cleanText(input.name, { multiline: false });
  if (typeof input.body === "string") output.body = cleanText(input.body, { multiline: true });
  return output;
}

// ── 驗證：每個欄位都要說得出哪裡錯 ─────────────────────
// 回傳 [{ field, reason, max, message }]；reason 是 empty（空白）、tooLong（超過上限）或 tooManyLinks（網址太多）
function validate(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return [{ field: null, reason: "invalid", message: "送來的資料要是一個物件，包含暱稱（name）和留言內容（body）" }];
  }
  const errors = [];
  for (const [field, { label, max }] of Object.entries(FIELDS)) {
    const value = input[field];
    const length = typeof value === "string" ? [...value.trim()].length : 0;
    if (!length) {
      errors.push({ field, reason: "empty", max, message: `${label}不能空白` });
    } else if (length > max) {
      errors.push({ field, reason: "tooLong", max, message: `${label}最多 ${max} 個字，現在是 ${length} 個字` });
    }
  }
  // 連結太多的幾乎都是廣告：只在內容本身沒其他問題時才檢查
  if (!errors.some((e) => e.field === "body") && typeof input.body === "string") {
    const links = (input.body.match(/https?:\/\/|www\./gi) || []).length;
    if (links > MAX_LINKS) {
      errors.push({ field: "body", reason: "tooManyLinks", max: MAX_LINKS, message: `留言最多放 ${MAX_LINKS} 個網址` });
    }
  }
  return errors;
}

// ── 讀取請求內容 ─────────────────────────────────────
function readJson(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    let tooLarge = false;
    req.on("data", (chunk) => {
      if (tooLarge) return;  // 超過就不再收，但不切斷連線，才回得了 413
      raw += chunk;
      if (raw.length > MAX_BODY_BYTES) {
        tooLarge = true;
        reject(publicError(413, "送來的內容太大了"));
      }
    });
    req.on("end", () => {
      if (tooLarge) return;
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(publicError(400, "送來的內容不是合法的 JSON"));
      }
    });
    req.on("error", reject);
  });
}

// ── 回應 ─────────────────────────────────────────────
function sendJson(res, status, data) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  // 留言會變，不要讓瀏覽器或 CDN 快取舊的清單
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(data));
}

function publicError(statusCode, publicMessage) {
  const error = new Error(publicMessage);
  error.statusCode = statusCode;
  error.publicMessage = publicMessage;
  return error;
}
