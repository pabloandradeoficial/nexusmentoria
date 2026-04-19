import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { LoginForm } from '@/components/ui/LoginForm';

export const metadata: Metadata = {
  title: 'Área do Mentorado',
  description: 'Acesse sua área exclusiva de conteúdo da Nexus Mentoria.',
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-5 md:p-8 relative overflow-hidden">
      {/* Blobs de fundo */}
      <div
        className="absolute top-0 -left-20 w-96 h-96 rounded-full bg-serene-200 blob"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 -right-20 w-96 h-96 rounded-full bg-sage-200 blob"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-soft-xl p-8 md:p-10 border border-warm-100">
          <div className="flex flex-col items-center text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-5" aria-label="Nexus Mentoria">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-serene-500 to-sage-500 text-white font-bold text-xl shadow-soft">
                N
              </div>
            </Link>
            <h1 className="font-bold text-2xl md:text-3xl text-anthracite tracking-tight mb-2">
              Bem-vindo de volta
            </h1>
            <p className="text-sm text-anthracite/60">
              Acesse sua área de mentoria
            </p>
          </div>

          <Suspense fallback={<div className="h-64 animate-pulse bg-warm-100 rounded-xl" />}>
            <LoginForm />
          </Suspense>
        </div>

        <p className="text-center text-xs text-anthracite/50 mt-6">
          Ainda não é mentorado?{' '}
          <Link href="/#cta" className="font-semibold text-serene-600 hover:underline">
            Conheça a mentoria
          </Link>
        </p>
      </div>
    </main>
  );
}
