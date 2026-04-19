'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '#mentores', label: 'Os Mentores' },
  { href: '#conteudo', label: 'Conteúdo' },
  { href: '#diferencial', label: 'Diferencial' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-offwhite/80 backdrop-blur-lg shadow-soft'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom flex h-20 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="Nexus Mentoria — Página inicial"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-serene-500 to-sage-500 text-white font-bold text-lg shadow-soft transition-transform duration-300 group-hover:scale-105">
            N
          </div>
          <span className="font-bold text-lg tracking-tight text-anthracite">
            Nexus <span className="font-light text-anthracite/60">Mentoria</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-anthracite/70 transition-colors hover:text-serene-600 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-serene-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="btn-ghost">
            Entrar
          </Link>
          <a href="#cta" className="btn-primary !py-2.5 !px-5 !text-sm">
            Quero entrar
          </a>
        </div>

        <button
          className="md:hidden p-2 rounded-xl hover:bg-warm-100 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-offwhite/95 backdrop-blur-lg border-t border-warm-200 animate-fade-in">
          <nav className="container-custom py-6 flex flex-col gap-4" aria-label="Navegação mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-anthracite/80 hover:text-serene-600 py-2"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-warm-200">
              <Link href="/login" className="btn-secondary !py-3">
                Entrar
              </Link>
              <a href="#cta" onClick={() => setMobileOpen(false)} className="btn-primary !py-3">
                Quero entrar
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
