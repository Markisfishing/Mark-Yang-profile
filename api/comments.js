// 留言板 API（Vercel Function）：GET 拿最新的留言、POST 新增一則
// 網址就是檔案位置：api/comments.js → /api/comments
//
// 留言存在 Supabase（Postgres）的 comments 資料表，資料表結構在 supabase/migrations/。
// 金鑰只在這支後端程式讀（SUPABASE_URL、SUPABASE_SECRET_KEY，放在 .env.local 與 Vercel 環境變數），
// 網頁不直接連資料庫：資料表開了 RLS，網頁拿得到的公開金鑰讀不到也寫不進去
const { createClient } = require("@supabase/supabase-js");

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
    .order("created_at", { ascending: false })
    .limit(LIST_LIMIT);
  if (error) throw dbError(error);
  return data.map(toComment);
}

async function addComment(name, body) {
  const { data, error } = await getDb()
    .from("comments")
    .insert({ name, body })
    .select(COLUMNS)
    .single();
  if (error) throw dbError(error);
  return toComment(data);
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
      const input = await readJson(req);
      const fieldErrors = validate(input);
      if (fieldErrors.length) {
        status = 400;
        // problems 是給人看的中文原因；fieldErrors 讓頁面標出是哪一格，英文介面也能自己換成英文
        const problems = fieldErrors.map((e) => e.message);
        return sendJson(res, status, { error: problems[0], problems, fieldErrors });
      }

      const comment = await addComment(input.name.trim(), input.body.trim());
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
    status = error.statusCode || 500;
    if (!error.statusCode) console.error(error);
    return sendJson(res, status, { error: error.publicMessage || "伺服器出錯了，請稍後再試" });
  } finally {
    // 每個請求在終端機印一行：方法、網址、狀態碼。出問題時看這一行就知道請求有沒有送到後端
    console.log(`${req.method} ${req.url} → ${status}`);
  }
};

// ── 驗證：每個欄位都要說得出哪裡錯 ─────────────────────
// 回傳 [{ field, reason, max, message }]；reason 是 empty（空白）或 tooLong（超過上限）
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
