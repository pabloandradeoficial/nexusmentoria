'use client';

import { MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export function WhatsAppFAB() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5535999999999';
  const message = encodeURIComponent('Olá! Quero saber mais sobre a Nexus Mentoria');

  return (
    <a
      href={`https://wa.me/${number}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className={`fixed bottom-6 right-6 z-40 group flex items-center gap-3 rounded-full bg-sage-500 text-white px-5 py-4 shadow-soft-xl transition-all duration-500 hover:bg-sage-600 hover:scale-105 hover:shadow-2xl ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
    >
      <MessageCircle size={22} className="flex-shrink-0" />
      <span className="hidden sm:inline font-semibold text-sm pr-1">
        Fale conosco
      </span>
      <span className="absolute inset-0 rounded-full bg-sage-400 animate-pulse-soft -z-10" aria-hidden="true" />
    </a>
  );
}
