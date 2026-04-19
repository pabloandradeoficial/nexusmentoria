import Link from 'next/link';
import Image from 'next/image';
import { Play, Clock, FileText } from 'lucide-react';
import type { Video } from '@/types/database';

export function VideoCard({ video }: { video: Video }) {
  return (
    <Link
      href={`/dashboard/video/${video.id}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-warm-100 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-video bg-gradient-to-br from-serene-100 to-sage-100 overflow-hidden">
        {video.thumbnail_url ? (
          <Image
            src={video.thumbnail_url}
            alt={`Capa: ${video.title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-6xl font-bold text-serene-300/40 select-none">
              {video.title.charAt(0)}
            </div>
          </div>
        )}

        {/* Play overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-anthracite/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="h-16 w-16 rounded-full bg-white/95 flex items-center justify-center shadow-soft-lg transition-transform duration-300 group-hover:scale-110">
            <Play size={24} className="text-serene-600 ml-1" fill="currentColor" />
          </div>
        </div>

        {video.duration_minutes && (
          <div className="absolute top-3 right-3 bg-anthracite/80 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-lg flex items-center gap-1">
            <Clock size={12} />
            {video.duration_minutes} min
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-sage-600 mb-2">
          {video.category}
        </div>
        <h3 className="font-bold text-anthracite leading-tight tracking-tight mb-2 line-clamp-2 group-hover:text-serene-600 transition-colors">
          {video.title}
        </h3>
        {video.description && (
          <p className="text-sm text-anthracite/60 leading-relaxed line-clamp-2 mb-3">
            {video.description}
          </p>
        )}
        {video.attachment_url && (
          <div className="flex items-center gap-1.5 text-xs font-medium text-serene-600">
            <FileText size={13} />
            Material de apoio
          </div>
        )}
      </div>
    </Link>
  );
}
