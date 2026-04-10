'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Container } from '@/components/ui/Container';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary-dark text-white pt-20 pb-10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary font-black text-2xl">O</div>
              <div className="flex flex-col">
                <span className="font-black text-xl leading-tight tracking-tight">NOC</span>
                <span className="text-[9px] uppercase tracking-widest text-white/60 font-bold">National Oil Company</span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              {t('hero.subtitle')}
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Linkedin, label: 'LinkedIn' }
              ].map(({ Icon, label }, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary-dark transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-black mb-8 border-b border-white/10 pb-4">{t('footer.quick_links')}</h3>
            <ul className="space-y-4">
              {[
                { id: 'home', path: '/' },
                { id: 'about', path: '/company' },
                { id: 'services', path: '/services' },
                { id: 'projects', path: '/projects' },
                { id: 'news', path: '/news' },
                { id: 'tenders', path: '/tenders' },
                { id: 'contact', path: '/contact' }
              ].map((item) => (
                <li key={item.id}>
                  <Link href={item.path} className="text-white/60 hover:text-accent transition-colors flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
                    {t(`nav.${item.id}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-black mb-8 border-b border-white/10 pb-4">{t('nav.services')}</h3>
            <ul className="space-y-4">
              {[
                { id: 'procedures_guide', path: '/services/procedures-guide' },
                { id: 'user_guide', path: '/services/user-guide' },
                { id: 'transaction_inquiry', path: '/services/inquiry' },
                { id: 'fuel_license', path: '/services/fuel-license' },
                { id: 'complaints', path: '/complaints' }
              ].map((item) => (
                <li key={item.id}>
                  <Link href={item.path} className="text-white/60 hover:text-accent transition-colors flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
                    {t(`nav.${item.id}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-black mb-8 border-b border-white/10 pb-4">{t('footer.contact_info')}</h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-accent" />
                </div>
                <div className="text-sm text-white/60">
                  <span className="block text-white font-bold mb-1">العنوان</span>
                  الجمهورية اليمنية، صنعاء، شارع الستين
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-accent" />
                </div>
                <div className="text-sm text-white/60">
                  <span className="block text-white font-bold mb-1">الهاتف</span>
                  +967 1 234567
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-accent" />
                </div>
                <div className="text-sm text-white/60">
                  <span className="block text-white font-bold mb-1">البريد الإلكتروني</span>
                  info@noc.gov.ye
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest">
            {t('footer.rights')}
          </p>
          <button 
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-primary-dark hover:scale-110 transition-all shadow-lg"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </Container>
    </footer>
  );
}
