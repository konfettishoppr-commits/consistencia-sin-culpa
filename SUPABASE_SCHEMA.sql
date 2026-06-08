-- Run this in your Supabase SQL Editor

create table if not exists daily_logs (
  id uuid default gen_random_uuid() primary key,
  date date not null default current_date,
  energy_level text check (energy_level in ('alta','media','baja')),
  p_oracion boolean default false,
  p_biblia boolean default false,
  p_hogar boolean default false,
  p_konfetti boolean default false,
  konfetti_action text,
  completed_count int default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists rewards (
  id uuid default gen_random_uuid() primary key,
  flowers_total int default 0,
  stars_total int default 0,
  streak_current int default 0,
  streak_max int default 0,
  updated_at timestamp with time zone default now()
);

-- Insert initial rewards row
insert into rewards (flowers_total, stars_total, streak_current, streak_max)
values (0, 0, 0, 0);

-- Index for fast date lookups
create index if not exists idx_daily_logs_date on daily_logs(date);
