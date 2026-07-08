-- Supabase SQL Editor에서 실행하세요.

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  department text,
  course text not null check (course in ('입문반', '실전반', '심화반')),
  message text
);

alter table public.applications enable row level security;

-- 신청 페이지(익명 사용자)에서 신규 신청을 등록할 수 있도록 허용
create policy "Allow anonymous insert"
  on public.applications
  for insert
  to anon
  with check (true);

-- 관리자 페이지(별도 인증 없음)에서 목록을 조회할 수 있도록 허용
-- 주의: 이 정책은 anon key를 아는 누구나 신청 내역을 읽을 수 있게 합니다.
-- 운영 환경에서는 관리자 페이지에 로그인 등 접근 제어를 추가하고
-- 이 정책을 인증된 사용자 전용으로 제한하는 것을 권장합니다.
create policy "Allow anonymous select"
  on public.applications
  for select
  to anon
  using (true);
