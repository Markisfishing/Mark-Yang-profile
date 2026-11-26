-- 留言管理（第二階段）：下架代替刪除、封鎖來源
-- 在 Supabase 後台 Table Editor 直接改就能用，不需要管理頁面

-- ── 下架 ─────────────────────────────────────────────
--   status     visible（公開）或 hidden（下架）；公開的 GET 只回 visible
--   hidden_at  下架的時間，由下面的 trigger 自動填，恢復公開時自動清掉
-- 下架的留言還在資料表裡，改回 visible 就恢復，不怕誤刪
alter table public.comments
  add column if not exists status text not null default 'visible'
    check (status in ('visible', 'hidden')),
  add column if not exists hidden_at timestamptz;

-- 公開列表一律查「visible、新到舊」
create index if not exists comments_status_created_at_idx on public.comments (status, created_at desc);

-- 在後台只要把 status 改成 hidden，下架時間就會自己記上
create or replace function public.comments_track_hidden_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.status = 'hidden' and old.status is distinct from 'hidden' then
    new.hidden_at := now();
  elsif new.status = 'visible' then
    new.hidden_at := null;
  end if;
  return new;
end;
$$;

drop trigger if exists comments_track_hidden_at on public.comments;
create trigger comments_track_hidden_at
  before update of status on public.comments
  for each row execute function public.comments_track_hidden_at();

-- ── 封鎖名單 ─────────────────────────────────────────
-- 一列封鎖一個來源：ip_hash 從新留言通知或 comments 表複製過來
-- 被封鎖的來源送留言會被擋下；刪掉這一列就解除封鎖
create table if not exists public.blocked_sources (
  ip_hash text primary key,
  reason text,
  created_at timestamptz not null default now()
);

-- 跟 comments 一樣開 RLS 不給 policy：只有後端用 secret key 讀得到
alter table public.blocked_sources enable row level security;
