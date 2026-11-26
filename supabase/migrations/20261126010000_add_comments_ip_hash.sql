-- 防洗版：記下每則留言是從哪個來源送的，用來限制同一個人送出的頻率
--   ip_hash  送出者 IP 的 HMAC-SHA256 雜湊（後端算好才存），不存原始 IP，也算不回原始 IP
--            只有後端 api/comments.js 讀寫，GET 回給網頁的欄位不包含它
-- 舊留言沒有這個值（null），不影響限制的計算
alter table public.comments add column if not exists ip_hash text;

-- 限制頻率時查「同一個 ip_hash 最近一小時的留言」，用這個索引查得快
create index if not exists comments_ip_hash_created_at_idx on public.comments (ip_hash, created_at desc);
