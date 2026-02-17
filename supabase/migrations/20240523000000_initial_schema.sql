-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table (extends Supabase Auth)
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  full_name text,
  avatar_url text,
  role text check (role in ('user', 'admin')) default 'user',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Exams table (Metadata for certifications)
create table exams (
  id text primary key, -- e.g., 'cissp', 'cisa'
  title text not null,
  description text,
  price_one_set integer default 5000,
  price_ten_sets integer default 30000,
  price_one_month integer default 30000,
  price_three_months integer default 50000,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert default exams
insert into exams (id, title, description) values
('cissp', 'CISSP', 'Certified Information Systems Security Professional'),
('cism', 'CISM', 'Certified Information Security Manager'),
('cisa', 'CISA', 'Certified Information Systems Auditor'),
('cppg', 'CPPG', 'Certified Personal Information Protection Professional'),
('cia', 'CIA', 'Certified Internal Auditor');

-- Questions table
create table questions (
  id uuid default uuid_generate_v4() primary key,
  exam_id text references exams(id) on delete cascade not null,
  question_text text not null,
  options jsonb not null, -- Array of strings
  correct_answer text not null,
  explanation text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- User Exams (History of taken exams/practice sessions)
create table user_exam_sessions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  exam_id text references exams(id) not null,
  score integer,
  total_questions integer default 100,
  completed_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Purchases table
create table purchases (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  exam_id text references exams(id), -- Optional, if purchasing specific exam access
  product_type text check (product_type in ('count', 'period')) not null,
  amount integer not null, -- Payment amount
  quantity integer, -- Number of sets (for 'count')
  period_months integer, -- Number of months (for 'period')
  payment_key text, -- Toss Payments Key
  order_id text unique not null,
  status text check (status in ('pending', 'completed', 'failed', 'canceled')) default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies (Row Level Security)
alter table profiles enable row level security;
alter table exams enable row level security;
alter table questions enable row level security;
alter table user_exam_sessions enable row level security;
alter table purchases enable row level security;

-- Profiles: Users can see their own profile
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

-- Exams: Anyone can read
create policy "Exams are public" on exams for select using (true);

-- Questions: Only admins can Insert/Update/Delete. Users can read (if they have access - simplified for now to authenticated)
create policy "Authenticated users can read questions" on questions for select to authenticated using (true);
create policy "Admins can manage questions" on questions for all to authenticated using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- Purchases: Users see their own
create policy "Users see own purchases" on purchases for select using (auth.uid() = user_id);
