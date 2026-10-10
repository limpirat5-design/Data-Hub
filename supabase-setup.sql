-- ==============================================================
-- Branch Smart Document Hub — Supabase SQL Setup (1-Click Run)
-- วิธีใช้:
--   1. ไปที่ Supabase Dashboard (https://supabase.com/dashboard)
--   2. เลือกโปรเจกต์ของคุณ -> ไปที่เมนู "SQL Editor" ด้านซ้าย
--   3. วางโค้ดทั้งหมดนี้ แล้วกดปุ่ม "Run" ด้านล่างขวา
-- ==============================================================

-- 1. สร้างตาราง documents สำหรับเก็บข้อมูลเอกสารของทุกสาขา
create table if not exists documents (
  doc_id text primary key,
  category_id text not null,
  subcategory text not null,
  title text not null,
  file_name text,
  version text,
  effective_date text,
  status text default 'active',
  download_url text,
  changelog_summary text,
  download_count integer default 0,
  last_updated_by text default 'สาขา',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. เปิดระบบสิทธิ์ความปลอดภัย (Row Level Security) ให้ทุกสาขาอ่าน/เขียนได้
alter table documents enable row level security;

drop policy if exists "Allow all read" on documents;
create policy "Allow all read" on documents for select using (true);

drop policy if exists "Allow all insert" on documents;
create policy "Allow all insert" on documents for insert with check (true);

drop policy if exists "Allow all update" on documents;
create policy "Allow all update" on documents for update using (true);

drop policy if exists "Allow all delete" on documents;
create policy "Allow all delete" on documents for delete using (true);

-- 3. สร้าง Storage Bucket ชื่อ 'documents' สำหรับจัดเก็บไฟล์เอกสารจริง (PDF, Word, Excel)
insert into storage.buckets (id, name, public) 
values ('documents', 'documents', true)
on conflict (id) do update set public = true;

-- 4. เปิดสิทธิ์ให้ดาวน์โหลดและอัปโหลดไฟล์ใน Storage ได้
drop policy if exists "Public Access" on storage.objects;
create policy "Public Access" on storage.objects for select using (bucket_id = 'documents');

drop policy if exists "Public Upload" on storage.objects;
create policy "Public Upload" on storage.objects for insert with check (bucket_id = 'documents');

drop policy if exists "Public Update" on storage.objects;
create policy "Public Update" on storage.objects for update using (bucket_id = 'documents');

drop policy if exists "Public Delete" on storage.objects;
create policy "Public Delete" on storage.objects for delete using (bucket_id = 'documents');
