// 留言板 API（Vercel Function）：GET 拿全部留言、POST 新增一則
// 網址就是檔案位置：api/comments.js → /api/comments
//
// 留言先存在下面的陣列裡，還沒接資料庫：這支程式被關掉（重新部署、閒置被回收、本機重開）
// 留言就會不見，只剩一開始的兩則假留言。之後換成資料庫時，只要改「資料存放」那一段

// ── 欄位規則 ─────────────────────────────────────────
// 一則留言只有四格：id 和 createdAt 由伺服器產生，name 和 body 由使用者送
// 長度用「字」算（[...text].length），中文、emoji 都算一個字
const FIELDS = {
  name: { label: "暱稱", max: 20 },
  body: { label: "留言內容", max: 200 }
};
const ALLOWED_METHODS = ["GET", "POST"];
const MAX_BODY_BYTES = 4000;   // 兩個欄位加起來最多兩百多個字，超過這個大小一定是亂送的
const MAX_COMMENTS = 100;      // 陣列最多留 100 則，避免記憶體被灌爆

// ── 資料存放 ─────────────────────────────────────────
// 一開始先放兩則假留言，打開留言板時才分得出「沒讀到」和「本來就是空的」
const comments = [
  { id: 1, name: "測試訪客", body: "這是一開始就在的示範留言。", createdAt: "2026-11-26T00:00:00.000Z" },
  { id: 2, name: "測試訪客", body: "伺服器重開之後，只會剩下我們兩則。", createdAt: "2026-11-26T00:01:00.000Z" }
];
let nextId = 3;

// ── 入口：依方法分給不同的處理 ─────────────────────────
module.exports = async function handler(req, res) {
  let status = 500;
  try {
    if (req.method === "GET") {
      status = 200;
      // 新的在前面
      return sendJson(res, status, { comments: [...comments].reverse() });
    }

    if (req.method === "POST") {
      const input = await readJson(req);
      const problems = validate(input);
      if (problems.length) {
        status = 400;
        return sendJson(res, status, { error: problems[0], problems });
      }

      const comment = {
        id: nextId++,
        name: input.name.trim(),
        body: input.body.trim(),
        createdAt: new Date().toISOString()
      };
      comments.push(comment);
      if (comments.length > MAX_COMMENTS) comments.splice(0, comments.length - MAX_COMMENTS);

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
    // 送來的不是合法 JSON、或太大：是送的人的問題，回 4xx 和看得懂的原因；其他才是伺服器自己出錯
    status = error.statusCode || 500;
    return sendJson(res, status, { error: error.publicMessage || "伺服器出錯了，請稍後再試" });
  } finally {
    // 每個請求在終端機印一行：方法、網址、狀態碼。出問題時看這一行就知道請求有沒有送到後端
    console.log(`${req.method} ${req.url} → ${status}`);
  }
};

// ── 驗證：每個欄位都要說得出哪裡錯 ─────────────────────
function validate(input) {
  const problems = [];
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return ["送來的資料要是一個物件，包含暱稱（name）和留言內容（body）"];
  }
  for (const [key, { label, max }] of Object.entries(FIELDS)) {
    const value = input[key];
    if (typeof value !== "string" || !value.trim()) {
      problems.push(`${label}不能空白`);
    } else if ([...value.trim()].length > max) {
      problems.push(`${label}最多 ${max} 個字，現在是 ${[...value.trim()].length} 個字`);
    }
  }
  return problems;
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
