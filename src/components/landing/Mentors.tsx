import Image from 'next/image';
import { GraduationCap, Stethoscope, TrendingUp, HandMetal } from 'lucide-react';

type MentorCardProps = {
  name: string;
  photo: string;
  imagePriority?: boolean;
  tagline: string;
  bio: string;
  specialties: { icon: React.ReactNode; label: string }[];
  accent: 'serene' | 'sage';
};

function MentorCard({ name, photo, imagePriority, tagline, bio, specialties, accent }: MentorCardProps) {
  const accentClasses =
    accent === 'serene'
      ? {
          bg: 'bg-serene-50',
          border: 'border-serene-100',
          chipBg: 'bg-white',
          chipText: 'text-serene-700',
          chipBorder: 'border-serene-100',
          badge: 'bg-serene-500',
          iconBg: 'bg-serene-100 text-serene-600',
        }
      : {
          bg: 'bg-sage-50',
          border: 'border-sage-100',
          chipBg: 'bg-white',
          chipText: 'text-sage-700',
          chipBorder: 'border-sage-100',
          badge: 'bg-sage-500',
          iconBg: 'bg-sage-100 text-sage-600',
        };

  return (
    <article
      className={`group relative overflow-hidden rounded-3xl border ${accentClasses.border} ${accentClasses.bg} p-6 md:p-8 shadow-soft transition-all duration-500 hover:shadow-soft-xl hover:-translate-y-1`}
    >
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6 bg-warm-100">
        <Image
          src={photo}
          alt={`Retrato profissional de ${name}`}
          fill
          priority={imagePriority}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-anthracite/40 via-transparent to-transparent"
          aria-hidden="true"
        />
        <div className={`absolute top-4 left-4 ${accentClasses.badge} text-white text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-soft`}>
          Mentor
        </div>
      </div>

      <div>
        <h3 className="text-2xl md:text-3xl font-bold text-anthracite mb-2 tracking-tight">
          {name}
        </h3>
        <p className={`text-sm font-semibold mb-5 ${accent === 'serene' ? 'text-serene-600' : 'text-sage-600'}`}>
          {tagline}
        </p>
        <p className="text-anthracite/75 leading-relaxed mb-6">
          {bio}
        </p>

        <ul className="space-y-3" aria-label={`Áreas de atuação de ${name}`}>
          {specialties.map((spec, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${accentClasses.iconBg} flex-shrink-0`}>
                {spec.icon}
              </div>
              <span className="text-sm font-medium text-anthracite/85">
                {spec.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function Mentors() {
  return (
    <section
      id="mentores"
      className="py-24 md:py-32 relative overflow-hidden"
      aria-labelledby="mentors-title"
    >
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center mb-16 md:mb-20">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-sage-600 mb-4">
            — Os Mentores
          </span>
          <h2
            id="mentors-title"
            className="font-bold text-3xl md:text-5xl text-anthracite tracking-tight text-balance"
          >
            Experiência clínica e visão estratégica lado a lado.
          </h2>
          <p className="mt-6 text-lg text-anthracite/70 leading-relaxed text-balance">
            Dois profissionais complementares que unem ciência aplicada à clínica
            com o posicionamento necessário para você se tornar referência.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          <MentorCard
            name="Dr. Pablo Andrade"
            photo="/images/pablo.png"
            imagePriority
            tagline="Professor Universitário · Fisioterapeuta Clínico"
            bio="Une a profundidade do ambiente acadêmico à realidade do consultório. Conduz o raciocínio clínico pela lógica da PBE e traduz artigos em decisões práticas para sua clínica."
            accent="serene"
            specialties={[
              { icon: <GraduationCap size={18} />, label: 'Docência em Fisioterapia' },
              { icon: <Stethoscope size={18} />, label: 'Raciocínio clínico aplicado' },
              { icon: <HandMetal size={18} />, label: 'Terapia manual ortopédica' },
            ]}
          />

          <MentorCard
            name="Dra. Gabriela"
            photo="/images/gabriela.png"
            tagline="Especialista em Marketing · Terapia Manual"
            bio="Fisioterapeuta com olhar estratégico. Mostra como construir autoridade digital sem abrir mão da ética e da profundidade técnica — transformando presença online em pacientes qualificados."
            accent="sage"
            specialties={[
              { icon: <TrendingUp size={18} />, label: 'Marketing para Fisioterapeutas' },
              { icon: <HandMetal size={18} />, label: 'Terapia Manual' },
              { icon: <Stethoscope size={18} />, label: 'Posicionamento clínico digital' },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
