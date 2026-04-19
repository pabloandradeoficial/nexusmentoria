import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { LiveCard } from '@/components/dashboard/LiveCard';
import type { Live } from '@/types/database';
import { Radio, BookOpen, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Lives da Mentoria',
  description: 'Gravações das mentorias ao vivo da Nexus Mentoria.',
  robots: { index: false, follow: false },
};

export default async function LivesPage() {
  const supabase = createClient();

  const { data: livesData } = await supabase
    .from('lives')
    .select('*')
    .eq('is_published', true)
    .order('recorded_at', { ascending: false });

  const lives: Live[] = livesData ?? [];

  // Agrupa por topic_name mantendo a ordem da primeira live de cada grupo
  const topicOrder: string[] = [];
  const groupedLives = lives.reduce<Record<string, Live[]>>((acc, l) => {
    if (!acc[l.topic_name]) {
      acc[l.topic_name] = [];
      topicOrder.push(l.topic_name);
    }
    acc[l.topic_name].push(l);
    return acc;
  }, {});

  const topicEntries = topicOrder.map((topic) => [topic, groupedLives[topic]] as [string, Live[]]);

  return (
    <main className="p-5 md:p-8 lg:p-12 max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-red-500 mb-3">
          <span className="h-0.5 w-8 bg-red-400 rounded-full" />
          Mentorias ao Vivo
        </div>
        <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-anthracite tracking-tight mb-3">
          Lives da Mentoria
        </h1>
        <p className="text-lg text-anthracite/70 max-w-2xl">
          Gravações das sessões ao vivo realizadas pelo Google Meet. Reveja quando
          quiser, quantas vezes precisar.
        </p>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12" aria-label="Resumo das lives">
        <StatCard
          icon={<Radio size={22} />}
          value={lives.length.toString()}
          label="Lives disponíveis"
          accent="red"
        />
        <StatCard
          icon={<TrendingUp size={22} />}
          value={topicEntries.length.toString()}
          label="Tópicos abordados"
          accent="serene"
        />
        <StatCard
          icon={<BookOpen size={22} />}
          value="AO VIVO"
          label="Gravações originais"
          accent="sage"
        />
      </section>

      {/* Lives por tópico */}
      {topicEntries.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-14">
          {topicEntries.map(([topic, topicLives]) => (
            <section key={topic} aria-labelledby={`topic-${topic}`}>
              <div className="flex items-center gap-3 mb-6">
                <Radio size={18} className="text-red-400 flex-shrink-0" />
                <h2
                  id={`topic-${topic}`}
                  className="font-bold text-xl md:text-2xl text-anthracite tracking-tight"
                >
                  {topic}
                </h2>
                <span className="text-xs font-semibold text-anthracite/50 bg-warm-100 px-2.5 py-1 rounded-full">
                  {topicLives.length} {topicLives.length === 1 ? 'live' : 'lives'}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {topicLives.map((live) => (
                  <LiveCard key={live.id} live={live} />
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
  accent: 'red' | 'serene' | 'sage';
}) {
  const accentBg =
    accent === 'red'
      ? 'bg-red-50 text-red-500'
      : accent === 'serene'
      ? 'bg-serene-100 text-serene-600'
      : 'bg-sage-100 text-sage-600';

  return (
    <div className="bg-white rounded-2xl p-5 border border-warm-100 shadow-soft">
      <div className={`inline-flex items-center justify-center h-11 w-11 rounded-xl ${accentBg} mb-3`}>
        {icon}
      </div>
      <div className="text-2xl font-bold text-anthracite tracking-tight">{value}</div>
      <div className="text-sm text-anthracite/60 font-medium">{label}</div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16 bg-white rounded-2xl border border-warm-100 shadow-soft">
      <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-red-50 text-red-400 mb-4">
        <Radio size={28} />
      </div>
      <h2 className="font-bold text-xl text-anthracite mb-2">
        Nenhuma live disponível ainda
      </h2>
      <p className="text-anthracite/60 max-w-md mx-auto">
        As gravações das mentorias ao vivo aparecerão aqui assim que forem publicadas.
      </p>
    </div>
  );
}
