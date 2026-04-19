import { CheckCircle2 } from 'lucide-react';

const categories = [
  {
    title: 'Coluna Vertebral',
    items: [
      'Ciatalgia',
      'Síndrome do Piriforme',
      'Hérnia de Disco',
      'Dor Lombar',
      'Cervicalgia',
      'Cervicobraquialgia',
      'Dor Torácica',
    ],
  },
  {
    title: 'Membros Inferiores',
    items: [
      'Tendinopatia Patelar',
      'Tendinopatia da Pata de Ganso',
      'Tendinopatia de Aquiles',
      'Bursite',
      'Síndrome do Trato Iliotibial',
      'Neuralgia Parestésica',
      'Neuralgia Obturatória',
    ],
  },
  {
    title: 'Membros Superiores',
    items: [
      'Tendinopatia do Supraespinhal',
      'Síndrome do Impacto',
      'Sinestesia Escapular',
      'Epicondilopatias',
      'Síndrome do Túnel do Carpo',
    ],
  },
  {
    title: 'Neurodinâmica & Plexos',
    items: [
      'Plexo Sacral',
      'Plexo Cervical',
      'Plexo Braquial',
      'Síndrome do Desfiladeiro Torácico',
    ],
  },
];

export function Content() {
  return (
    <section
      id="conteudo"
      className="py-24 md:py-32 bg-gradient-warm relative overflow-hidden"
      aria-labelledby="content-title"
    >
      <div
        className="absolute inset-0 bg-subtle-grid opacity-50"
        aria-hidden="true"
      />

      <div className="container-custom relative">
        <div className="max-w-2xl mx-auto text-center mb-16 md:mb-20">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-serene-600 mb-4">
            — O Que Você Vai Dominar
          </span>
          <h2
            id="content-title"
            className="font-bold text-3xl md:text-5xl text-anthracite tracking-tight text-balance"
          >
            Do queixa-conduta ao raciocínio clínico avançado.
          </h2>
          <p className="mt-6 text-lg text-anthracite/70 leading-relaxed text-balance">
            Abordagem clínica estruturada para os quadros musculoesqueléticos e
            neurais mais frequentes — sempre com respaldo científico.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {categories.map((cat) => (
            <article
              key={cat.title}
              className="group bg-white rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-soft-lg transition-all duration-300 border border-warm-100"
            >
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-warm-100">
                <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-serene-500 to-sage-500" aria-hidden="true" />
                <h3 className="font-bold text-xl text-anthracite tracking-tight">
                  {cat.title}
                </h3>
              </div>
              <ul className="grid grid-cols-1 gap-3" aria-label={`Tópicos de ${cat.title}`}>
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-anthracite/80 font-medium text-[15px]"
                  >
                    <CheckCircle2
                      size={18}
                      className="text-sage-500 flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
