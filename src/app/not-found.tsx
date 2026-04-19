import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center p-5">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-gradient-serene mb-4">404</div>
        <h1 className="text-2xl md:text-3xl font-bold text-anthracite mb-3 tracking-tight">
          Página não encontrada
        </h1>
        <p className="text-anthracite/60 mb-8">
          O conteúdo que você buscava não existe ou foi movido.
        </p>
        <Link href="/" className="btn-primary">
          <Home size={18} />
          Voltar para o início
        </Link>
      </div>
    </main>
  );
}
