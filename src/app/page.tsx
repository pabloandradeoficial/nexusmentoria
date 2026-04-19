import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { Mentors } from '@/components/landing/Mentors';
import { Content } from '@/components/landing/Content';
import { Differential } from '@/components/landing/Differential';
import { CtaFinal, Footer } from '@/components/landing/CtaFinal';
import { WhatsAppFAB } from '@/components/landing/WhatsAppFAB';

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Mentors />
        <Content />
        <Differential />
        <CtaFinal />
      </main>
      <Footer />
      <WhatsAppFAB />

      {/* JSON-LD Structured Data para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'Nexus Mentoria',
            description:
              'Mentoria clínica em Fisioterapia baseada em evidências com foco em raciocínio clínico e marketing para fisioterapeutas.',
            url: process.env.NEXT_PUBLIC_SITE_URL || 'https://nexusmentoria.com.br',
            sameAs: ['https://instagram.com/nexusmentoria'],
            founder: [
              { '@type': 'Person', name: 'Dr. Pablo Andrade', jobTitle: 'Fisioterapeuta Clínico e Professor Universitário' },
              { '@type': 'Person', name: 'Dra. Gabriela', jobTitle: 'Especialista em Marketing e Terapia Manual' },
            ],
          }),
        }}
      />
    </>
  );
}
