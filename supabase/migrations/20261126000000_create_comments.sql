-- 留言板的資料表：一則留言四格，跟 api/comments.js 的欄位規則一致
--   id          伺服器（資料庫）產生，前端不能指定
--   name        暱稱，1~20 個字（使用者送）
--   body        留言內容，1~200 個字（使用者送）
--   created_at  建立時間，資料庫產生
-- 長度在 API 已經檢查過，這裡再用 check 擋一次：就算有人繞過 API 直接寫資料庫也存不進去
create table if not exists public.comments (
  id bigint generated always as identity primary key,
  name text not null check (char_length(btrim(name)) between 1 and 20),
  body text not null check (char_length(btrim(body)) between 1 and 200),
  created_at timestamptz not null default now()
);

-- 留言板一律依時間新到舊列出
create index if not exists comments_created_at_idx on public.comments (created_at desc);

-- 打開 Row Level Security 而且不給任何 policy：
-- 網頁看得到的公開金鑰（anon / publishable key）讀不到也寫不進這張表，
-- 只有後端 api/comments.js 用伺服器端的 secret key 才能存取
alter table public.comments enable row level security;
