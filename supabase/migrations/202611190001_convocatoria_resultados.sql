-- Resultados públicos por etapa para cada convocatoria.
-- Ejecutar en el SQL Editor de Supabase antes de desplegar la aplicación.

create extension if not exists pgcrypto;

create table if not exists public."Convocatoria_Resultado" (
  resultado_id uuid primary key default gen_random_uuid(),
  puest_id_int uuid not null references public."Puesto"(puest_id_int) on delete cascade,
  etapa smallint not null check (etapa between 1 and 5),
  titulo text not null,
  archivo_path text not null,
  archivo_nombre text not null,
  publicado_bool boolean not null default false,
  publicado_at_dt timestamptz,
  created_at_dt timestamptz not null default now(),
  updated_at_dt timestamptz not null default now(),
  constraint convocatoria_resultado_puesto_etapa_unique unique (puest_id_int, etapa)
);

create index if not exists convocatoria_resultado_publicados_idx
  on public."Convocatoria_Resultado" (publicado_bool, puest_id_int, etapa);

create or replace function public.set_convocatoria_resultado_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at_dt = now();
  return new;
end;
$$;

drop trigger if exists convocatoria_resultado_updated_at on public."Convocatoria_Resultado";
create trigger convocatoria_resultado_updated_at
before update on public."Convocatoria_Resultado"
for each row execute function public.set_convocatoria_resultado_updated_at();

alter table public."Convocatoria_Resultado" enable row level security;

drop policy if exists "Resultados publicados visibles" on public."Convocatoria_Resultado";
create policy "Resultados publicados visibles"
on public."Convocatoria_Resultado"
for select
to anon, authenticated
using (publicado_bool = true);

drop policy if exists "Administradores gestionan resultados" on public."Convocatoria_Resultado";
create policy "Administradores gestionan resultados"
on public."Convocatoria_Resultado"
for all
to authenticated
using (true)
with check (true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'convocatorias-resultados',
  'convocatorias-resultados',
  false,
  10485760,
  array['application/pdf']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Leer PDFs publicados de convocatorias" on storage.objects;
create policy "Leer PDFs publicados de convocatorias"
on storage.objects
for select
to anon, authenticated
using (
  bucket_id = 'convocatorias-resultados'
  and (
    auth.role() = 'authenticated'
    or exists (
      select 1
      from public."Convocatoria_Resultado" resultado
      where resultado.archivo_path = name
        and resultado.publicado_bool = true
    )
  )
);

drop policy if exists "Subir PDFs de convocatorias" on storage.objects;
create policy "Subir PDFs de convocatorias"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'convocatorias-resultados');

drop policy if exists "Actualizar PDFs de convocatorias" on storage.objects;
create policy "Actualizar PDFs de convocatorias"
on storage.objects
for update
to authenticated
using (bucket_id = 'convocatorias-resultados')
with check (bucket_id = 'convocatorias-resultados');

drop policy if exists "Eliminar PDFs de convocatorias" on storage.objects;
create policy "Eliminar PDFs de convocatorias"
on storage.objects
for delete
to authenticated
using (bucket_id = 'convocatorias-resultados');
