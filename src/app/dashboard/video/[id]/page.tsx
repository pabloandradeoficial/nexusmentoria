import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import {
  ArrowLeft,
  Download,
  FileText,
  Clock,
  Tag,
  MessageCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Aula',
  robots: { index: false, follow: false },
};

export default async function VideoPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();

  const { data: video, error } = await supabase
    .from('videos')
    .select('*')
    .eq('id', params.id)
    .eq('is_published', true)
    .single();

  if (error || !video) {
    notFound();
  }

  // Vídeos relacionados da mesma categoria
  const { data: relatedVideos } = await supabase
    .from('videos')
    .select('id, title, category, duration_minutes')
    .eq('category', video.category)
    .eq('is_published', true)
    .neq('id', video.id)
    .limit(4);

  const supportNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5535999999999';

  return (
    <main className="p-5 md:p-8 lg:p-12 max-w-7xl mx-auto">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm font-medium text-anthracite/60 hover:text-serene-600 transition-colors mb-6"
      >
        <ArrowLeft size={16} /> Voltar à biblioteca
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Player principal + detalhes */}
        <div className="lg:col-span-2 space-y-6">
          {/* Player */}
          <div className="bg-anthracite rounded-2xl overflow-hidden shadow-soft-lg">
            <div className="relative aspect-video">
              <iframe
                src={video.video_url}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>

          {/* Informações da aula */}
          <article className="bg-white rounded-2xl p-6 md:p-8 border border-warm-100 shadow-soft">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-sage-700 bg-sage-50 px-3 py-1.5 rounded-full border border-sage-100">
                <Tag size={12} />
                {video.category}
              </span>
              {video.duration_minutes && (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-anthracite/60 bg-warm-100 px-3 py-1.5 rounded-full">
                  <Clock size={12} />
                  {video.duration_minutes} minutos
                </span>
              )}
            </div>

            <h1 className="font-bold text-2xl md:text-3xl text-anthracite tracking-tight mb-4 leading-tight">
              {video.title}
            </h1>

            {video.description && (
              <p className="text-anthracite/75 leading-relaxed text-base md:text-lg">
                {video.description}
              </p>
            )}
          </article>
        </div>

        {/* Sidebar: Materiais + Suporte + Relacionados */}
        <aside className="space-y-6" aria-label="Materiais e conteúdos relacionados">
          {/* Materiais de Apoio */}
          <section className="bg-white rounded-2xl p-6 border border-warm-100 shadow-soft">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-serene-100 text-serene-600">
                <FileText size={18} />
              </div>
              <h2 className="font-bold text-anthracite">Materiais de Apoio</h2>
            </div>

            {video.attachment_url ? (
              <a
                href={video.attachment_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 p-4 rounded-xl bg-serene-50 border border-serene-100 hover:bg-serene-100 transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <FileText size={20} className="text-serene-600 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-anthracite truncate">
                      PDF da Aula
                    </p>
                    <p className="text-xs text-anthracite/60">Download disponível</p>
                  </div>
                </div>
                <Download size={18} className="text-serene-600 flex-shrink-0 transition-transform group-hover:translate-y-0.5" />
              </a>
            ) : (
              <p className="text-sm text-anthracite/60 text-center py-6">
                Nenhum material adicional para esta aula.
              </p>
            )}
          </section>

          {/* Suporte */}
          <section className="bg-gradient-to-br from-sage-500 to-sage-600 rounded-2xl p-6 text-white shadow-soft">
            <MessageCircle size={24} className="mb-3" />
            <h2 className="font-bold text-lg mb-2">Dúvida sobre a aula?</h2>
            <p className="text-white/90 text-sm mb-4 leading-relaxed">
              Converse diretamente com a equipe de mentoria. Estamos aqui para
              aprofundar o raciocínio clínico com você.
            </p>
            <a
              href={`https://wa.me/${supportNumber}?text=${encodeURIComponent(`Olá! Tenho uma dúvida sobre a aula: ${video.title}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-white text-sage-700 px-5 py-3 text-sm font-semibold hover:bg-warm-50 transition-colors"
            >
              <MessageCircle size={16} /> Falar no WhatsApp
            </a>
          </section>

          {/* Vídeos relacionados */}
          {relatedVideos && relatedVideos.length > 0 && (
            <section className="bg-white rounded-2xl p-6 border border-warm-100 shadow-soft">
              <h2 className="font-bold text-anthracite mb-4">Mais em {video.category}</h2>
              <ul className="space-y-2">
                {relatedVideos.map((rv) => (
                  <li key={rv.id}>
                    <Link
                      href={`/dashboard/video/${rv.id}`}
                      className="block p-3 rounded-xl hover:bg-warm-50 transition-colors group"
                    >
                      <p className="font-semibold text-sm text-anthracite leading-tight group-hover:text-serene-600 transition-colors line-clamp-2 mb-1">
                        {rv.title}
                      </p>
                      {rv.duration_minutes && (
                        <p className="text-xs text-anthracite/50 flex items-center gap-1">
                          <Clock size={11} /> {rv.duration_minutes} min
                        </p>
                      )}
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
