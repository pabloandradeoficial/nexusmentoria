-- =====================================================
-- NEXUS MENTORIA - Schema do Banco de Dados
-- =====================================================

-- Extensões necessárias
create extension if not exists "uuid-ossp";

-- =====================================================
-- TABELA: categories
-- Organização hierárquica dos conteúdos
-- =====================================================
create table if not exists public.categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text,
  icon text,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- =====================================================
-- TABELA: videos
-- Conteúdos de aula da plataforma
-- =====================================================
create table if not exists public.videos (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  category text not null,
  category_id uuid references public.categories(id) on delete set null,
  video_url text not null,
  thumbnail_url text,
  attachment_url text,
  duration_minutes integer,
  sort_order integer default 0,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Índices para performance
create index if not exists idx_videos_category on public.videos(category);
create index if not exists idx_videos_category_id on public.videos(category_id);
create index if not exists idx_videos_published on public.videos(is_published);

-- =====================================================
-- TABELA: profiles
-- Extensão de dados do usuário (Supabase Auth)
-- =====================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  phone text,
  is_active boolean default true,
  subscription_active boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- =====================================================
-- TABELA: video_progress
-- Progresso de visualização por aluno
-- =====================================================
create table if not exists public.video_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  video_id uuid references public.videos(id) on delete cascade not null,
  watched_seconds integer default 0,
  completed boolean default false,
  last_watched_at timestamptz default now(),
  unique(user_id, video_id)
);

-- =====================================================
-- TRIGGER: Criar profile automaticamente ao cadastrar usuário
-- =====================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =====================================================
-- TRIGGER: Atualizar updated_at automaticamente
-- =====================================================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_videos_updated_at on public.videos;
create trigger set_videos_updated_at
  before update on public.videos
  for each row execute procedure public.handle_updated_at();

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Ativa RLS
alter table public.videos enable row level security;
alter table public.categories enable row level security;
alter table public.profiles enable row level security;
alter table public.video_progress enable row level security;

-- Políticas: videos (apenas usuários autenticados com assinatura ativa leem)
drop policy if exists "Videos visíveis para alunos ativos" on public.videos;
create policy "Videos visíveis para alunos ativos"
  on public.videos for select
  using (
    auth.uid() is not null
    and is_published = true
    and exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.is_active = true
    )
  );

-- Políticas: categories (leitura para autenticados)
drop policy if exists "Categorias visíveis para alunos" on public.categories;
create policy "Categorias visíveis para alunos"
  on public.categories for select
  using (auth.uid() is not null);

-- Políticas: profiles (cada usuário vê/edita o próprio)
drop policy if exists "Usuários visualizam próprio perfil" on public.profiles;
create policy "Usuários visualizam próprio perfil"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Usuários atualizam próprio perfil" on public.profiles;
create policy "Usuários atualizam próprio perfil"
  on public.profiles for update
  using (auth.uid() = id);

-- Políticas: video_progress (cada usuário vê/edita o próprio progresso)
drop policy if exists "Usuários gerenciam próprio progresso" on public.video_progress;
create policy "Usuários gerenciam próprio progresso"
  on public.video_progress for all
  using (auth.uid() = user_id);

-- =====================================================
-- SEEDS: Categorias iniciais
-- =====================================================
insert into public.categories (name, slug, description, sort_order) values
  ('Membros Inferiores', 'membros-inferiores', 'Patologias e tratamentos dos membros inferiores', 1),
  ('Coluna Vertebral', 'coluna-vertebral', 'Tratamento de dores e disfunções da coluna', 2),
  ('Membros Superiores', 'membros-superiores', 'Ombro, cotovelo, punho e mão', 3),
  ('Neurodinâmica', 'neurodinamica', 'Avaliação e tratamento dos plexos e nervos periféricos', 4),
  ('Prática Baseada em Evidências', 'pbe', 'Ciência aplicada à Fisioterapia', 5),
  ('Marketing para Fisioterapeutas', 'marketing', 'Estratégias para construir autoridade e atrair pacientes', 6)
on conflict (slug) do nothing;

-- =====================================================
-- SEEDS: Vídeos de exemplo (substitua as URLs reais)
-- =====================================================
insert into public.videos (title, description, category, video_url, thumbnail_url, duration_minutes, sort_order) values
  ('Introdução à Ciatalgia: Avaliação Clínica', 'Protocolo completo de avaliação baseado em evidências para pacientes com dor ciática.', 'Coluna Vertebral', 'https://player.vimeo.com/video/000000001', null, 42, 1),
  ('Síndrome do Piriforme: Diagnóstico Diferencial', 'Como diferenciar a síndrome do piriforme de outras causas de dor glútea.', 'Coluna Vertebral', 'https://player.vimeo.com/video/000000002', null, 38, 2),
  ('Hérnia de Disco Lombar: Tratamento Conservador', 'Abordagem conservadora com McKenzie, exercícios neurodinâmicos e manipulação.', 'Coluna Vertebral', 'https://player.vimeo.com/video/000000003', null, 55, 3),
  ('Tendinopatia Patelar: Protocolo Progressivo', 'Carga progressiva, isometria e retorno ao esporte.', 'Membros Inferiores', 'https://player.vimeo.com/video/000000004', null, 48, 1),
  ('Síndrome do Trato Iliotibial', 'Avaliação biomecânica e tratamento para corredores.', 'Membros Inferiores', 'https://player.vimeo.com/video/000000005', null, 35, 2),
  ('Impacto Subacromial: Avaliação e Manejo', 'Testes clínicos validados e protocolo de tratamento.', 'Membros Superiores', 'https://player.vimeo.com/video/000000006', null, 50, 1),
  ('Epicondilopatia Lateral', 'Dor no cotovelo do tenista: carga e progressão.', 'Membros Superiores', 'https://player.vimeo.com/video/000000007', null, 40, 2),
  ('Síndrome do Túnel do Carpo', 'Neurodinâmica aplicada e manejo conservador.', 'Membros Superiores', 'https://player.vimeo.com/video/000000008', null, 33, 3),
  ('Avaliação do Plexo Braquial', 'Testes neurodinâmicos e interpretação clínica.', 'Neurodinâmica', 'https://player.vimeo.com/video/000000009', null, 45, 1),
  ('Síndrome do Desfiladeiro Torácico', 'Avaliação e tratamento das diferentes apresentações.', 'Neurodinâmica', 'https://player.vimeo.com/video/000000010', null, 42, 2),
  ('Como Ler um Artigo Científico', 'Análise crítica aplicada à prática clínica.', 'Prática Baseada em Evidências', 'https://player.vimeo.com/video/000000011', null, 30, 1),
  ('Posicionamento Digital para Fisioterapeutas', 'Construa autoridade no Instagram e conquiste pacientes qualificados.', 'Marketing para Fisioterapeutas', 'https://player.vimeo.com/video/000000012', null, 52, 1)
on conflict do nothing;
