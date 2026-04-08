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
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_patient_profiles_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists patient_profiles_set_updated_at on public.patient_profiles;

create trigger patient_profiles_set_updated_at
before update on public.patient_profiles
for each row
execute function public.set_patient_profiles_updated_at();
