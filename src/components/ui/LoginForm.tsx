'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Loader2, Mail, Lock, AlertCircle, ArrowLeft } from 'lucide-react';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(`[DEBUG] ${signInError.message}`);
      setLoading(false);
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-anthracite/60 hover:text-serene-600 transition-colors mb-2"
      >
        <ArrowLeft size={16} />
        Voltar ao site
      </Link>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-anthracite mb-2"
        >
          E-mail
        </label>
        <div className="relative">
          <Mail
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-anthracite/40"
            aria-hidden="true"
          />
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-warm-200 bg-white px-11 py-3.5 text-sm placeholder:text-anthracite/40 focus:border-serene-400 focus:outline-none focus:ring-4 focus:ring-serene-100 transition-all"
            placeholder="seu@email.com"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-anthracite mb-2"
        >
          Senha
        </label>
        <div className="relative">
          <Lock
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-anthracite/40"
            aria-hidden="true"
          />
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-warm-200 bg-white px-11 py-3.5 text-sm placeholder:text-anthracite/40 focus:border-serene-400 focus:outline-none focus:ring-4 focus:ring-serene-100 transition-all"
            placeholder="••••••••"
          />
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700"
        >
          <AlertCircle size={18} className="flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full !py-3.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Entrando...
          </>
        ) : (
          'Entrar na plataforma'
        )}
      </button>

      <p className="text-center text-xs text-anthracite/60 pt-2">
        Problemas para acessar?{' '}
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5535998732804'}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-serene-600 hover:underline"
        >
          Fale com a equipe
        </a>
      </p>
    </form>
  );
}
