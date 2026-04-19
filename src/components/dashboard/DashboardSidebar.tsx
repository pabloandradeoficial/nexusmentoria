'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  LayoutGrid,
  PlayCircle,
  Radio,
  MessageCircle,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '/dashboard', label: 'Início', icon: LayoutGrid },
  { href: '/dashboard/videos', label: 'Biblioteca', icon: PlayCircle },
  { href: '/dashboard/lives', label: 'Lives', icon: Radio },
];

export function DashboardSidebar({ userName }: { userName: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  }

  const supportNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5535998732804';
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <>
      {/* Mobile topbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-lg border-b border-warm-200 h-16 flex items-center justify-between px-5">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-serene-500 to-sage-500 text-white font-bold">
            N
          </div>
          <span className="font-bold text-anthracite">Nexus</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-xl hover:bg-warm-100"
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-anthracite/30 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-30 w-72 bg-white border-r border-warm-200 flex flex-col transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        aria-label="Navegação do dashboard"
      >
        <div className="p-6 border-b border-warm-100">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-serene-500 to-sage-500 text-white font-bold text-lg shadow-soft">
              N
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-anthracite">
                Nexus
              </span>
              <span className="text-xs text-anthracite/60 font-medium -mt-0.5">
                Mentoria
              </span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1" aria-label="Menu principal">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                  active
                    ? 'bg-serene-50 text-serene-700'
                    : 'text-anthracite/70 hover:bg-warm-100 hover:text-anthracite'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}

          <a
            href={`https://wa.me/${supportNumber}?text=${encodeURIComponent('Olá! Preciso de suporte.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm text-anthracite/70 hover:bg-sage-50 hover:text-sage-700 transition-all"
          >
            <MessageCircle size={18} />
            Suporte
          </a>
        </nav>

        <div className="p-4 border-t border-warm-100">
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-warm-50 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-serene-400 to-sage-500 text-white font-semibold text-sm">
              {initials || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-anthracite truncate">
                {userName}
              </p>
              <p className="text-xs text-anthracite/60">Mentorado</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-anthracite/70 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </aside>
    </>
  );
}
