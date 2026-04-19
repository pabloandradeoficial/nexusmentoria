import Link from 'next/link';
import { ArrowRight, Instagram, Mail, MessageCircle } from 'lucide-react';

export function CtaFinal() {
  return (
    <section
      id="cta"
      className="py-24 md:py-32 relative overflow-hidden"
      aria-labelledby="cta-title"
    >
      <div className="container-custom">
        <div className="relative max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-serene-500 to-sage-600 p-10 md:p-16 text-center overflow-hidden shadow-soft-xl">
          <div
            className="absolute inset-0 bg-subtle-dots opacity-20"
            aria-hidden="true"
          />
          <div
            className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-white/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative">
            <h2
              id="cta-title"
              className="font-bold text-3xl md:text-5xl text-white leading-tight tracking-tight text-balance"
            >
              Pronto para elevar sua prática ao próximo nível?
            </h2>
            <p className="mt-6 text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto text-balance">
              As vagas são limitadas para preservar a qualidade do acompanhamento.
              Dê o primeiro passo agora.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5535998732804'}?text=Ol%C3%A1!%20Quero%20saber%20mais%20sobre%20a%20Nexus%20Mentoria`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-serene-700 shadow-soft transition-all duration-300 hover:shadow-soft-lg hover:-translate-y-0.5 group w-full sm:w-auto"
              >
                Falar com um mentor
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-white/30 bg-transparent px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-white/10 w-full sm:w-auto"
              >
                Já sou mentorado
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-warm-100 border-t border-warm-200 py-14" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">Rodapé</h2>
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 mb-4" aria-label="Nexus Mentoria">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-serene-500 to-sage-500 text-white font-bold text-lg shadow-soft">
                N
              </div>
              <span className="font-bold text-lg tracking-tight text-anthracite">
                Nexus <span className="font-light text-anthracite/60">Mentoria</span>
              </span>
            </Link>
            <p className="text-sm text-anthracite/70 leading-relaxed max-w-xs">
              Fisioterapia clínica baseada em evidências, elevando a prática de quem
              busca excelência.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-anthracite mb-4 uppercase tracking-wider">
              Navegação
            </h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#mentores" className="text-anthracite/70 hover:text-serene-600 transition-colors">Os Mentores</a></li>
              <li><a href="#conteudo" className="text-anthracite/70 hover:text-serene-600 transition-colors">Conteúdo</a></li>
              <li><a href="#diferencial" className="text-anthracite/70 hover:text-serene-600 transition-colors">Diferencial</a></li>
              <li><Link href="/login" className="text-anthracite/70 hover:text-serene-600 transition-colors">Área do Mentorado</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-anthracite mb-4 uppercase tracking-wider">
              Contato
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5535998732804'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-anthracite/70 hover:text-serene-600 transition-colors"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-anthracite/70 hover:text-serene-600 transition-colors"
                >
                  <Instagram size={16} /> @nexusmentoria
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@nexusmentoria.com.br"
                  className="inline-flex items-center gap-2 text-anthracite/70 hover:text-serene-600 transition-colors"
                >
                  <Mail size={16} /> contato@nexusmentoria.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-warm-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-anthracite/60">
          <p>© {new Date().getFullYear()} Nexus Mentoria. Todos os direitos reservados.</p>
          <p>Desenvolvido com cuidado para fisioterapeutas de excelência.</p>
        </div>
      </div>
    </footer>
  );
}
