import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden" aria-labelledby="hero-title">
      {/* Blobs decorativos */}
      <div
        className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-serene-200 blob"
        aria-hidden="true"
      />
      <div
        className="absolute top-40 -right-20 w-[500px] h-[500px] rounded-full bg-sage-200 blob"
        aria-hidden="true"
      />

      {/* Padrão sutil de fundo */}
      <div
        className="absolute inset-0 bg-subtle-dots opacity-40"
        aria-hidden="true"
      />

      <div className="container-custom relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm border border-sage-200 px-4 py-2 mb-8 shadow-soft animate-fade-in">
            <Sparkles size={14} className="text-sage-600" />
            <span className="text-xs font-semibold tracking-wide uppercase text-sage-700">
              Mentoria Clínica de Alto Escalão
            </span>
          </div>

          <h1
            id="hero-title"
            className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-balance text-anthracite animate-fade-in-up animation-delay-100"
          >
            Fisioterapia clínica com{' '}
            <span className="text-gradient-serene">autoridade técnica</span>
            <br className="hidden sm:block" />
            e raciocínio baseado em evidências.
          </h1>

          <p className="mt-8 text-lg md:text-xl text-anthracite/70 leading-relaxed max-w-2xl mx-auto text-balance animate-fade-in-up animation-delay-200">
            Do diagnóstico diferencial à construção da sua presença digital. Uma mentoria
            desenhada para fisioterapeutas que querem dominar o raciocínio clínico e
            transformá-lo em autoridade.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-300">
            <a href="#cta" className="btn-primary group w-full sm:w-auto">
              Garantir minha vaga
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a href="#mentores" className="btn-secondary w-full sm:w-auto">
              Conhecer os mentores
            </a>
          </div>

          {/* Stats row */}
          <div className="mt-20 grid grid-cols-3 gap-8 md:gap-16 max-w-3xl mx-auto animate-fade-in-up animation-delay-500">
            <Stat number="20+" label="Patologias abordadas" />
            <Stat number="PBE" label="Prática baseada em evidências" />
            <Stat number="1:1" label="Acompanhamento próximo" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-gradient-serene mb-2">
        {number}
      </div>
      <div className="text-xs md:text-sm font-medium text-anthracite/60 leading-tight">
        {label}
      </div>
    </div>
  );
}
