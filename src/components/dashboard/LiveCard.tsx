import Link from 'next/link';
import Image from 'next/image';
import { Radio, Clock, FileText, User } from 'lucide-react';
import type { Live } from '@/types/database';

function formatDate(dateStr: string): string {
  // dateStr é "YYYY-MM-DD" — adiciona meio-dia para evitar erro de fuso
  const date = new Date(`${dateStr}T12:00:00`);
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function LiveCard({ live }: { live: Live }) {
  return (
    <Link
      href={`/dashboard/live/${live.id}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-warm-100 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gradient-to-br from-red-50 to-amber-50 overflow-hidden">
        {live.thumbnail_url ? (
          <Image
            src={live.thumbnail_url}
            alt={`Capa: ${live.title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Radio size={48} className="text-red-200" />
          </div>
        )}

        {/* Badge AO VIVO GRAVADO */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow">
          <Radio size={11} />
          AO VIVO GRAVADO
        </div>

        {/* Overlay hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-anthracite/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="h-16 w-16 rounded-full bg-white/95 flex items-center justify-center shadow-soft-lg transition-transform duration-300 group-hover:scale-110">
            <Radio size={22} className="text-red-500" />
          </div>
        </div>

        {/* Duração */}
        {live.duration_minutes && (
          <div className="absolute top-3 right-3 bg-anthracite/80 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-lg flex items-center gap-1">
            <Clock size={12} />
            {live.duration_minutes} min
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-5">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-red-500 truncate">
            {live.topic_name}
          </span>
          <span className="text-xs text-anthracite/50 whitespace-nowrap">
            {formatDate(live.recorded_at)}
          </span>
        </div>

        <h3 className="font-bold text-anthracite leading-tight tracking-tight mb-2 line-clamp-2 group-hover:text-serene-600 transition-colors">
          {live.title}
        </h3>

        {live.description && (
          <p className="text-sm text-anthracite/60 leading-relaxed line-clamp-2 mb-3">
            {live.description}
          </p>
        )}

        <div className="flex items-center justify-between gap-2 pt-1">
          {live.mentor_name && (
            <div className="flex items-center gap-1.5 text-xs text-anthracite/50">
              <User size={12} />
              {live.mentor_name}
            </div>
          )}
          {live.attachment_url && (
            <div className="flex items-center gap-1.5 text-xs font-medium text-serene-600 ml-auto">
              <FileText size={12} />
              Material
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
