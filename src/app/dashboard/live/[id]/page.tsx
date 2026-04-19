import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import {
  ArrowLeft,
  Download,
  FileText,
  Clock,
  Radio,
  User,
  Calendar,
  MessageCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Live',
  robots: { index: false, follow: false },
};

function formatDate(dateStr: string): string {
  const date = new Date(`${dateStr}T12:00:00`);
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export default async function LivePage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();

  const { data: live, error } = await supabase
    .from('lives')
    .select('*')
    .eq('id', params.id)
    .eq('is_published', true)
    .single();

  if (error || !live) {
    notFound();
  }

  const { data: relatedLives } = await supabase
    .from('lives')
    .select('id, title, topic_name, recorded_at, duration_minutes, mentor_name')
    .eq('topic_name', live.topic_name)
    .eq('is_published', true)
    .neq('id', live.id)
    .order('recorded_at', { ascending: false })
    .limit(4);

  const supportNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5535998732804';

  return (
    <main className="p-5 md:p-8 lg:p-12 max-w-7xl mx-auto">
      <Link
        href="/dashboard/lives"
        className="inline-flex items-center gap-2 text-sm font-medium text-anthracite/60 hover:text-serene-600 transition-colors mb-6"
      >
        <ArrowLeft size={16} /> Voltar às Lives
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Player + detalhes */}
        <div className="lg:col-span-2 space-y-6">
          {/* Player */}
          <div className="bg-anthracite rounded-2xl overflow-hidden shadow-soft-lg">
            <div className="relative aspect-video">
              <iframe
                src={live.video_url}
                title={live.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>

          {/* Informações da live */}
          <article className="bg-white rounded-2xl p-6 md:p-8 border border-warm-100 shadow-soft">
            {/* Badge + metadados */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white bg-red-500 px-3 py-1.5 rounded-full">
                <Radio size={11} />
                AO VIVO GRAVADO
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-sage-700 bg-sage-50 px-3 py-1.5 rounded-full border border-sage-100">
                {live.topic_name}
              </span>
              {live.duration_minutes && (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-anthracite/60 bg-warm-100 px-3 py-1.5 rounded-full">
                  <Clock size={12} />
                  {live.duration_minutes} minutos
                </span>
              )}
            </div>

            <h1 className="font-bold text-2xl md:text-3xl text-anthracite tracking-tight mb-4 leading-tight">
              {live.title}
            </h1>

            {/* Data e mentor */}
            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-anthracite/60">
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={14} />
                {formatDate(live.recorded_at)}
              </span>
              {live.mentor_name && (
                <span className="inline-flex items-center gap-1.5">
                  <User size={14} />
                  {live.mentor_name}
                </span>
              )}
            </div>

            {live.description && (
              <p className="text-anthracite/75 leading-relaxed text-base md:text-lg">
                {live.description}
              </p>
            )}
          </article>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6" aria-label="Materiais e lives relacionadas">
          {/* Material de Apoio */}
          <section className="bg-white rounded-2xl p-6 border border-warm-100 shadow-soft">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-serene-100 text-serene-600">
                <FileText size={18} />
              </div>
              <h2 className="font-bold text-anthracite">Material de Apoio</h2>
            </div>

            {live.attachment_url ? (
              <a
                href={live.attachment_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 p-4 rounded-xl bg-serene-50 border border-serene-100 hover:bg-serene-100 transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <FileText size={20} className="text-serene-600 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-anthracite truncate">
                      PDF da Live
                    </p>
                    <p className="text-xs text-anthracite/60">Download disponível</p>
                  </div>
                </div>
                <Download size={18} className="text-serene-600 flex-shrink-0 transition-transform group-hover:translate-y-0.5" />
              </a>
            ) : (
              <p className="text-sm text-anthracite/60 text-center py-6">
                Nenhum material adicional para esta live.
              </p>
            )}
          </section>

          {/* Suporte WhatsApp */}
          <section className="bg-gradient-to-br from-sage-500 to-sage-600 rounded-2xl p-6 text-white shadow-soft">
            <MessageCircle size={24} className="mb-3" />
            <h2 className="font-bold text-lg mb-2">Dúvida sobre a live?</h2>
            <p className="text-white/90 text-sm mb-4 leading-relaxed">
              Converse com a equipe de mentoria. Estamos prontos para aprofundar
              o raciocínio clínico com você.
            </p>
            <a
              href={`https://wa.me/${supportNumber}?text=${encodeURIComponent(`Olá! Tenho uma dúvida sobre a live: ${live.title}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-white text-sage-700 px-5 py-3 text-sm font-semibold hover:bg-warm-50 transition-colors"
            >
              <MessageCircle size={16} /> Falar no WhatsApp
            </a>
          </section>

          {/* Lives relacionadas */}
          {relatedLives && relatedLives.length > 0 && (
            <section className="bg-white rounded-2xl p-6 border border-warm-100 shadow-soft">
              <h2 className="font-bold text-anthracite mb-4">
                Mais em {live.topic_name}
              </h2>
              <ul className="space-y-2">
                {relatedLives.map((related) => (
                  <li key={related.id}>
                    <Link
                      href={`/dashboard/live/${related.id}`}
                      className="block p-3 rounded-xl hover:bg-warm-50 transition-colors group"
                    >
                      <p className="font-semibold text-sm text-anthracite leading-tight group-hover:text-serene-600 transition-colors line-clamp-2 mb-1">
                        {related.title}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-anthracite/50">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} />
                          {formatDate(related.recorded_at)}
                        </span>
                        {related.duration_minutes && (
                          <span className="flex items-center gap-1">
                            <Clock size={11} />
                            {related.duration_minutes} min
                          </span>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>
    </main>
  );
}
