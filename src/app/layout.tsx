import type { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const viewport: Viewport = {
  themeColor: '#FAFAFA',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://nexusmentoria.com.br'
  ),
  title: {
    default: 'Nexus Mentoria — Fisioterapia de Alto Escalão | Dr. Pablo Andrade & Dra. Gabriela',
    template: '%s | Nexus Mentoria',
  },
  description:
    'Mentoria clínica em Fisioterapia baseada em evidências. Do diagnóstico diferencial ao marketing clínico: domine dor lombar, hérnia, tendinopatias, neurodinâmica e construa autoridade.',
  keywords: [
    'mentoria fisioterapia',
    'fisioterapia baseada em evidências',
    'ciatalgia',
    'hérnia de disco',
    'tendinopatia',
    'neurodinâmica',
    'marketing para fisioterapeutas',
    'Dr. Pablo Andrade',
    'curso de fisioterapia',
    'PBE',
  ],
  authors: [{ name: 'Nexus Mentoria' }],
  creator: 'Nexus Mentoria',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    title: 'Nexus Mentoria — Fisioterapia de Alto Escalão',
    description:
      'Mentoria clínica baseada em evidências com Dr. Pablo Andrade e Dra. Gabriela. Técnica + autoridade digital para fisioterapeutas.',
    siteName: 'Nexus Mentoria',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexus Mentoria — Fisioterapia de Alto Escalão',
    description: 'Mentoria clínica baseada em evidências para fisioterapeutas.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={montserrat.variable}>
      <body className="min-h-screen bg-offwhite font-sans text-anthracite antialiased">
        {children}
      </body>
    </html>
  );
}
