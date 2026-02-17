-- Admin Features Migration: Content Blocks Table for CMS

-- Content blocks for dynamic text management
create table content_blocks (
  id uuid default gen_random_uuid() primary key,
  key text unique not null,
  value text not null,
  label text not null,
  description text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_by uuid references auth.users on delete set null
);

-- Insert default content blocks
insert into content_blocks (key, value, label, description) values
  ('hero_title', 'About C', 'Hero Section Title', 'Main hero section title on homepage'),
  ('hero_subtitle', '보안 자격증의 정점, About C에서 완벽하게 준비하세요.', 'Hero Subtitle', 'Main hero section subtitle'),
  ('hero_description', '업계 최고의 문제은행과 AI 기반 학습 시스템으로 CISSP, CISM, CISA, CPPG, CIA 자격증을 효율적으로 준비하세요.', 'Hero Description', 'Hero section description text');

-- Enable RLS
alter table content_blocks enable row level security;

-- Policies for content_blocks
create policy "Content blocks are viewable by everyone"
  on content_blocks for select
  using (true);

create policy "Content blocks are editable by admins only"
  on content_blocks for all
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- Add indexes
create index content_blocks_key_idx on content_blocks(key);
