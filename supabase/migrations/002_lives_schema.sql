-- Tabela de tópicos/temas das lives (agrupamento)
create table if not exists public.live_topics (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- Tabela de lives (mentorias gravadas)
create table if not exists public.lives (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  topic_id uuid references public.live_topics(id) on delete set null,
  topic_name text not null,
  recorded_at date not null,
  video_url text not null,
  thumbnail_url text,
  attachment_url text,
  duration_minutes integer,
  mentor_name text,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_lives_topic on public.lives(topic_name);
create index if not exists idx_lives_topic_id on public.lives(topic_id);
create index if not exists idx_lives_recorded_at on public.lives(recorded_at desc);
create index if not exists idx_lives_published on public.lives(is_published);

-- Trigger updated_at
drop trigger if exists set_lives_updated_at on public.lives;
create trigger set_lives_updated_at
  before update on public.lives
  for each row execute procedure public.handle_updated_at();

-- RLS
alter table public.lives enable row level security;
alter table public.live_topics enable row level security;

drop policy if exists "Lives visiveis para alunos ativos" on public.lives;
create policy "Lives visiveis para alunos ativos"
  on public.lives for select
  using (
    auth.uid() is not null
    and is_published = true
    and exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.is_active = true
    )
  );

drop policy if exists "Topicos de lives visiveis para alunos" on public.live_topics;
create policy "Topicos de lives visiveis para alunos"
  on public.live_topics for select
  using (auth.uid() is not null);

-- Seeds de topicos
insert into public.live_topics (name, slug, description, sort_order) values
  ('Casos Clínicos', 'casos-clinicos', 'Discussão de casos reais e raciocínio clínico', 1),
  ('Atualização em Evidências', 'atualizacao-evidencias', 'Revisão de artigos e novidades científicas', 2),
  ('Marketing e Posicionamento', 'marketing-posicionamento', 'Estratégias de marketing para fisioterapeutas', 3),
  ('Neurodinâmica Avançada', 'neurodinamica-avancada', 'Aprofundamento em avaliação e tratamento neural', 4),
  ('Tira-Dúvidas', 'tira-duvidas', 'Sessões abertas de perguntas e respostas', 5)
on conflict (slug) do nothing;

-- Seeds de lives de exemplo (3 exemplos pra demonstração)
insert into public.lives (title, description, topic_name, recorded_at, video_url, duration_minutes, mentor_name) values
  ('Caso clínico: Paciente com dor lombar crônica e irradiação', 'Discussão de caso real — raciocínio diagnóstico, hipóteses e conduta baseada em evidências.', 'Casos Clínicos', '2025-03-15', 'https://player.vimeo.com/video/000000100', 90, 'Dr. Pablo Andrade'),
  ('Como criar conteúdo que atrai pacientes qualificados', 'Estratégias práticas de marketing ético para o Instagram do fisioterapeuta.', 'Marketing e Posicionamento', '2025-03-22', 'https://player.vimeo.com/video/000000101', 75, 'Dra. Gabriela'),
  ('Neurodinâmica do Plexo Braquial: avaliação passo a passo', 'Mentoria aprofundada sobre testes neurodinâmicos do membro superior.', 'Neurodinâmica Avançada', '2025-04-05', 'https://player.vimeo.com/video/000000102', 85, 'Dr. Pablo Andrade')
on conflict do nothing;
