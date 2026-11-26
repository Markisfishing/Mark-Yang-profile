// 新留言通知：有人留言就發一則訊息到 Discord 頻道，附上下架與封鎖要用的資料
// 檔名開頭是底線，Vercel 不會把它當成一條 API 網址，只給 api/comments.js 引用
//
// 設定：在 Discord 頻道「編輯頻道 → 整合 → Webhook」建一個 webhook，
// 把網址放到 .env.local 與 Vercel 環境變數 DISCORD_WEBHOOK_URL（不要寫進程式碼）
// 沒設定就不通知，留言照常運作

const TIMEOUT_MS = 3000;  // Discord 太慢就放棄，不讓訪客一直等

// Supabase 後台的資料表編輯頁：通知裡的「下架」連結點過去，把 status 改成 hidden
function editorUrl() {
  const ref = process.env.SUPABASE_PROJECT_REF
    || (process.env.SUPABASE_URL || "").match(/^https:\/\/([^.]+)\.supabase\.co/)?.[1];
  return ref ? `https://supabase.com/dashboard/project/${ref}/editor` : null;
}

// 通知失敗（逾時、網址錯、Discord 掛了）只記在 log，不影響留言已經存好的結果
async function notifyNewComment(comment, ipHash) {
  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (!webhook || !webhook.startsWith("https://")) return;

  const editor = editorUrl();
  const fields = [
    { name: "留言 id", value: String(comment.id), inline: true },
    { name: "要封鎖這個來源：複製到 blocked_sources 的 ip_hash", value: "`" + ipHash + "`" }
  ];
  if (editor) {
    fields.push({ name: "下架", value: `[到 Supabase 的 comments 表，把 status 改成 hidden](${editor})` });
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      body: JSON.stringify({
        username: "留言板通知",
        // 留言裡就算寫了 @everyone 也不會真的去標記頻道裡的人
        allowed_mentions: { parse: [] },
        embeds: [{
          title: `新留言：${comment.name}`.slice(0, 256),
          description: comment.body.slice(0, 4000),
          timestamp: comment.createdAt,
          fields
        }]
      })
    });
    if (!response.ok) console.error(`Discord 通知失敗：HTTP ${response.status}`);
  } catch (error) {
    console.error("Discord 通知失敗：", error.message);
  }
}

module.exports = { notifyNewComment };
