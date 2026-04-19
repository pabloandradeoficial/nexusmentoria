import { BookOpenCheck, Megaphone, Microscope, Users } from 'lucide-react';

const differentials = [
  {
    icon: <Microscope size={28} strokeWidth={1.5} />,
    title: 'Prática Baseada em Evidências',
    description:
      'Cada protocolo apresentado é ancorado em literatura atual. Ensinamos a ler, interpretar e aplicar — não decorar receitas.',
    accent: 'serene' as const,
  },
  {
    icon: <Megaphone size={28} strokeWidth={1.5} />,
    title: 'Marketing para Fisioterapeutas',
    description:
      'Posicionamento, autoridade e captação de pacientes qualificados sem banalizar a profissão.',
    accent: 'sage' as const,
  },
  {
    icon: <BookOpenCheck size={28} strokeWidth={1.5} />,
    title: 'Raciocínio, não Receita',
    description:
      'Você aprende a pensar como um clínico experiente — diagnóstico diferencial, priorização e tomada de decisão.',
    accent: 'serene' as const,
  },
  {
    icon: <Users size={28} strokeWidth={1.5} />,
    title: 'Comunidade Ativa',
    description:
      'Acesso a mentores, discussões de casos e uma rede de fisioterapeutas comprometidos com excelência.',
    accent: 'sage' as const,
  },
];

export function Differential() {
  return (
    <section
      id="diferencial"
      className="py-24 md:py-32 bg-offwhite relative overflow-hidden"
      aria-labelledby="differential-title"
    >
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center mb-16 md:mb-20">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-sage-600 mb-4">
            — Por que Nexus
          </span>
          <h2
            id="differential-title"
            className="font-bold text-3xl md:text-5xl text-anthracite tracking-tight text-balance"
          >
            Técnica sólida, estratégia inteligente.
          </h2>
          <p className="mt-6 text-lg text-anthracite/70 leading-relaxed text-balance">
            A combinação que o mercado raramente oferece — e que faz toda diferença
            na sua trajetória.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto">
          {differentials.map((item, idx) => {
            const bgAccent =
              item.accent === 'serene'
                ? 'bg-serene-100 text-serene-600'
                : 'bg-sage-100 text-sage-600';
            return (
              <article
                key={idx}
                className="group bg-white rounded-2xl p-7 md:p-8 border border-warm-100 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${bgAccent} mb-5 transition-transform duration-300 group-hover:scale-110`}
                  aria-hidden="true"
                >
                  {item.icon}
                </div>
                <h3 className="font-bold text-xl text-anthracite mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-anthracite/70 leading-relaxed">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
