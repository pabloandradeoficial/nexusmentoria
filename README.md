# Nexus Mentoria — MVP

Plataforma de mentoria em Fisioterapia Clínica de alto escalão com foco em Prática Baseada em Evidências e Marketing para Fisioterapeutas.

## 🧩 Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** com tema customizado (cores acolhedoras + Montserrat)
- **Supabase** (Auth + Database + RLS)
- **Lucide React** (ícones)

## 📁 Estrutura

```
nexus-mentoria/
├── public/images/          # pablo.png, gabriela.png
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Layout raiz (Montserrat + metadata SEO)
│   │   ├── page.tsx                 # Landing Page
│   │   ├── globals.css              # Estilos globais + Tailwind
│   │   ├── not-found.tsx            # Página 404
│   │   ├── sitemap.ts               # SEO sitemap
│   │   ├── robots.ts                # SEO robots
│   │   ├── login/page.tsx           # Página de login
│   │   └── dashboard/
│   │       ├── layout.tsx           # Layout protegido
│   │       ├── page.tsx             # Galeria por categorias
│   │       └── video/[id]/page.tsx  # Player + materiais
│   ├── components/
│   │   ├── landing/                 # Header, Hero, Mentors, Content, Differential, CtaFinal, WhatsAppFAB
│   │   ├── dashboard/               # Sidebar, VideoCard
│   │   └── ui/LoginForm.tsx
│   ├── lib/supabase/                # client, server, middleware
│   ├── types/database.ts            # Tipos do Supabase
│   └── middleware.ts                # Proteção de rotas
└── supabase/migrations/001_initial_schema.sql
```

## 🚀 Setup

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar Supabase

1. Crie um projeto em [supabase.com](https://supabase.com)
2. No SQL Editor, execute o conteúdo de `supabase/migrations/001_initial_schema.sql`
3. Em **Authentication → Providers**, habilite o provider Email
4. (Opcional) Em **Authentication → Email Templates**, personalize os e-mails

### 3. Variáveis de ambiente

Copie `.env.local.example` para `.env.local` e preencha:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
NEXT_PUBLIC_WHATSAPP_NUMBER=5535999999999
NEXT_PUBLIC_SITE_URL=https://seudominio.com.br
```

### 4. Rodar em dev

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

### 5. Criar um usuário de teste

No painel do Supabase, vá em **Authentication → Users → Add user**, crie um usuário com e-mail/senha, e depois marque no SQL Editor:

```sql
update public.profiles
set is_active = true, subscription_active = true
where id = 'uuid-do-usuario';
```

## 🎨 Design System

- **Fundo**: `#FAFAFA` (off-white)
- **Texto**: `#333333` (cinza antracite)
- **Primária**: Azul Sereno (`serene-500` `#4A7FB5`)
- **Secundária**: Verde Sálvia (`sage-500` `#6B9075`)
- **Fonte**: Montserrat (300 a 800)
- **Radius**: `rounded-xl` (1rem) e `rounded-2xl` (1.5rem)
- **Sombras**: `shadow-soft`, `shadow-soft-lg`, `shadow-soft-xl`

## 🔐 Segurança (RLS)

- `videos`: visíveis apenas para usuários autenticados com `profiles.is_active = true`
- `profiles`: cada usuário só lê/edita o próprio perfil
- `video_progress`: cada usuário só vê o próprio progresso
- Middleware bloqueia `/dashboard/*` para não-autenticados

## 🎥 Hospedagem de vídeos

O campo `video_url` aceita URLs de iframe de **Vimeo**, **Bunny.net** ou **YouTube**:

- Vimeo: `https://player.vimeo.com/video/SEU_ID`
- Bunny: `https://iframe.mediadelivery.net/embed/LIBRARY/VIDEO_ID`
- YouTube: `https://www.youtube.com/embed/VIDEO_ID`

## 📈 SEO & Performance

- HTML5 semântico (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Metadata completa no `layout.tsx` (OpenGraph, Twitter, robots)
- JSON-LD estruturado na landing
- `next/image` com priorização de LCP
- `sitemap.xml` e `robots.txt` automáticos
- Fonte carregada via `next/font/google` (sem FOUT)

## ♿ Acessibilidade (A11y)

- Landmarks corretos (`<main>`, `<nav aria-label>`, `<aside>`, `<article>`)
- `aria-labelledby` nas sections
- `aria-hidden` em elementos decorativos
- Foco visível com `focus-visible:ring`
- Contraste adequado (antracite + cores acolhedoras)

## 📞 Suporte

Botão flutuante de WhatsApp aparece após scroll e também no player de vídeo, para suporte contextual à dúvida da aula.
