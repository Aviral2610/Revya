create extension if not exists pgcrypto;

create table if not exists public.patient_profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id text unique,
  email text not null unique,
  full_name text,
  avatar_url text,
  member_since text not null default to_char(timezone('utc', now()), 'FMMonth YYYY'),
  medication text not null default 'Weekly semaglutide',
  dosage text not null default 'Current dose: 0.5 mg weekly',
  start_weight integer not null default 226 check (start_weight > 0),
  current_weight integer not null default 204 check (current_weight > 0),
  target_weight integer not null default 168 check (target_weight > 0),
  loss_to_date integer not null default 22 check (loss_to_date >= 0),
  refill_eligible boolean not null default true,
  next_refill_date text not null default 'Apr 18, 2026',
  shipment_status text not null default 'Preparing for shipment',
  next_appointment text not null default 'Apr 10, 2026 at 11:30 AM ET',
  labs_status text not null default 'Upload updated labs before dose review',
  billing_amount text not null default '$299 every 28 days',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.patient_profiles add column if not exists auth_user_id text;
alter table public.patient_profiles add column if not exists email text;
alter table public.patient_profiles add column if not exists full_name text;
alter table public.patient_profiles add column if not exists avatar_url text;
alter table public.patient_profiles add column if not exists member_since text not null default to_char(timezone('utc', now()), 'FMMonth YYYY');
alter table public.patient_profiles add column if not exists medication text not null default 'Weekly semaglutide';
alter table public.patient_profiles add column if not exists dosage text not null default 'Current dose: 0.5 mg weekly';
alter table public.patient_profiles add column if not exists start_weight integer not null default 226 check (start_weight > 0);
alter table public.patient_profiles add column if not exists current_weight integer not null default 204 check (current_weight > 0);
alter table public.patient_profiles add column if not exists target_weight integer not null default 168 check (target_weight > 0);
alter table public.patient_profiles add column if not exists loss_to_date integer not null default 22 check (loss_to_date >= 0);
alter table public.patient_profiles add column if not exists refill_eligible boolean not null default true;
alter table public.patient_profiles add column if not exists next_refill_date text not null default 'Apr 18, 2026';
alter table public.patient_profiles add column if not exists shipment_status text not null default 'Preparing for shipment';
alter table public.patient_profiles add column if not exists next_appointment text not null default 'Apr 10, 2026 at 11:30 AM ET';
alter table public.patient_profiles add column if not exists labs_status text not null default 'Upload updated labs before dose review';
alter table public.patient_profiles add column if not exists billing_amount text not null default '$299 every 28 days';
alter table public.patient_profiles add column if not exists created_at timestamptz not null default timezone('utc', now());
alter table public.patient_profiles add column if not exists updated_at timestamptz not null default timezone('utc', now());

update public.patient_profiles
set email = lower(trim(email))
where email is not null and email <> lower(trim(email));

create unique index if not exists patient_profiles_auth_user_id_key
on public.patient_profiles (auth_user_id)
where auth_user_id is not null;

create unique index if not exists patient_profiles_email_lower_key
on public.patient_profiles (lower(email));

create or replace function public.set_row_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists patient_profiles_set_updated_at on public.patient_profiles;

create trigger patient_profiles_set_updated_at
before update on public.patient_profiles
for each row
execute function public.set_row_updated_at();

create table if not exists public.quiz_submissions (
  id uuid primary key default gen_random_uuid(),
  patient_profile_id uuid references public.patient_profiles(id) on delete set null,
  auth_user_id text,
  email text not null,
  answers jsonb not null default '{}'::jsonb,
  route_result jsonb not null default '{}'::jsonb,
  eligibility_route text not null default 'manual_review',
  submitted_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.quiz_submissions add column if not exists patient_profile_id uuid references public.patient_profiles(id) on delete set null;
alter table public.quiz_submissions add column if not exists auth_user_id text;
alter table public.quiz_submissions add column if not exists email text;
alter table public.quiz_submissions add column if not exists answers jsonb not null default '{}'::jsonb;
alter table public.quiz_submissions add column if not exists route_result jsonb not null default '{}'::jsonb;
alter table public.quiz_submissions add column if not exists eligibility_route text not null default 'manual_review';
alter table public.quiz_submissions add column if not exists submitted_at timestamptz not null default timezone('utc', now());
alter table public.quiz_submissions add column if not exists created_at timestamptz not null default timezone('utc', now());
alter table public.quiz_submissions add column if not exists updated_at timestamptz not null default timezone('utc', now());

update public.quiz_submissions
set email = lower(trim(email))
where email is not null and email <> lower(trim(email));

create index if not exists quiz_submissions_patient_profile_id_submitted_at_idx
on public.quiz_submissions (patient_profile_id, submitted_at desc);

create index if not exists quiz_submissions_auth_user_id_submitted_at_idx
on public.quiz_submissions (auth_user_id, submitted_at desc);

create index if not exists quiz_submissions_email_submitted_at_idx
on public.quiz_submissions (lower(email), submitted_at desc);

drop trigger if exists quiz_submissions_set_updated_at on public.quiz_submissions;

create trigger quiz_submissions_set_updated_at
before update on public.quiz_submissions
for each row
execute function public.set_row_updated_at();

alter table public.patient_profiles enable row level security;
alter table public.quiz_submissions enable row level security;

drop policy if exists "patient_profiles_select_own" on public.patient_profiles;
create policy "patient_profiles_select_own"
on public.patient_profiles
for select
to authenticated
using (
  (auth.uid() is not null and auth.uid()::text = auth_user_id)
  or lower(coalesce(auth.jwt() ->> 'email', '')) = lower(email)
);

drop policy if exists "patient_profiles_update_own" on public.patient_profiles;
create policy "patient_profiles_update_own"
on public.patient_profiles
for update
to authenticated
using (
  (auth.uid() is not null and auth.uid()::text = auth_user_id)
  or lower(coalesce(auth.jwt() ->> 'email', '')) = lower(email)
)
with check (
  (auth.uid() is not null and auth.uid()::text = auth_user_id)
  or lower(coalesce(auth.jwt() ->> 'email', '')) = lower(email)
);

drop policy if exists "quiz_submissions_select_own" on public.quiz_submissions;
create policy "quiz_submissions_select_own"
on public.quiz_submissions
for select
to authenticated
using (
  (auth.uid() is not null and auth.uid()::text = auth_user_id)
  or lower(coalesce(auth.jwt() ->> 'email', '')) = lower(email)
);

drop policy if exists "quiz_submissions_insert_own" on public.quiz_submissions;
create policy "quiz_submissions_insert_own"
on public.quiz_submissions
for insert
to authenticated
with check (
  (auth.uid() is not null and auth.uid()::text = auth_user_id)
  or lower(coalesce(auth.jwt() ->> 'email', '')) = lower(email)
);

grant select, update on public.patient_profiles to authenticated;
grant select, insert on public.quiz_submissions to authenticated;
