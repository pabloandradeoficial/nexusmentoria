import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { VideoCard } from '@/components/dashboard/VideoCard';
import type { Video } from '@/types/database';
import { BookOpen, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Área do Mentorado',
  description: 'Sua biblioteca de aulas da Nexus Mentoria.',
  robots: { index: false, follow: false },
};

export default async function DashboardHome() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: videosData } = await supabase
    .from('videos')
    .select('*')
    .eq('is_published', true)
    .order('category', { ascending: true })
    .order('sort_order', { ascending: true });

  const videos: Video[] = videosData ?? [];

  // Agrupa vídeos por categoria
  const groupedVideos = videos.reduce<Record<string, Video[]>>((acc, v) => {
    if (!acc[v.category]) acc[v.category] = [];
    acc[v.category].push(v);
    return acc;
  }, {});

  const categoryEntries = Object.entries(groupedVideos);

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user?.id ?? '')
    .single();

  const firstName = (profile?.full_name || user?.email?.split('@')[0] || '').split(' ')[0];

  return (
    <main className="p-5 md:p-8 lg:p-12 max-w-7xl mx-auto">
      {/* Welcome header */}
      <header className="mb-12">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-sage-600 mb-3">
          <span className="h-0.5 w-8 bg-sage-500 rounded-full" />
          Bem-vindo(a) de volta
        </div>
        <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-anthracite tracking-tight mb-3">
          Olá, {firstName || 'Mentorado(a)'}
        </h1>
        <p className="text-lg text-anthracite/70 max-w-2xl">
          Continue sua jornada clínica. Todos os conteúdos da mentoria organizados
          em um só lugar.
        </p>
      </header>

      {/* Stats / quick info */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12" aria-label="Resumo da biblioteca">
        <StatCard
          icon={<BookOpen size={22} />}
          value={videos.length.toString()}
          label="Aulas disponíveis"
          accent="serene"
        />
        <StatCard
          icon={<TrendingUp size={22} />}
          value={categoryEntries.length.toString()}
          label="Áreas de estudo"
          accent="sage"
        />
        <StatCard
          icon={<BookOpen size={22} />}
          value="PBE"
          label="Baseado em evidências"
          accent="serene"
        />
      </section>

      {/* Videos por categoria */}
      {categoryEntries.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-14">
          {categoryEntries.map(([category, catVideos]) => (
            <section key={category} aria-labelledby={`cat-${category}`}>
              <div className="flex items-center gap-3 mb-6">
                <h2
                  id={`cat-${category}`}
                  className="font-bold text-xl md:text-2xl text-anthracite tracking-tight"
                >
                  {category}
                </h2>
                <span className="text-xs font-semibold text-anthracite/50 bg-warm-100 px-2.5 py-1 rounded-full">
                  {catVideos.length} {catVideos.length === 1 ? 'aula' : 'aulas'}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {catVideos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}

function StatCard({
  icon,
  value,
  label,
  accent,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  accent: 'serene' | 'sage';
}) {
  const accentBg =
    accent === 'serene'
      ? 'bg-serene-100 text-serene-600'
      : 'bg-sage-100 text-sage-600';
  return (
    <div className="bg-white rounded-2xl p-5 border border-warm-100 shadow-soft">
      <div className={`inline-flex items-center justify-center h-11 w-11 rounded-xl ${accentBg} mb-3`}>
        {icon}
      </div>
      <div className="text-2xl font-bold text-anthracite tracking-tight">
        {value}
      </div>
      <div className="text-sm text-anthracite/60 font-medium">{label}</div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16 bg-white rounded-2xl border border-warm-100 shadow-soft">
      <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-serene-100 text-serene-600 mb-4">
        <BookOpen size={28} />
      </div>
      <h2 className="font-bold text-xl text-anthracite mb-2">
        Biblioteca em preparação
      </h2>
      <p className="text-anthracite/60 max-w-md mx-auto">
        Novos conteúdos estão sendo adicionados. Em breve você verá sua
        biblioteca completa aqui.
      </p>
    </div>
  );
}
