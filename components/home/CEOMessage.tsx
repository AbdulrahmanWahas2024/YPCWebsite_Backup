'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Quote } from 'lucide-react';

export default function CEOMessage() {
  const { t } = useLanguage();

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      <Container>
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-[32px] overflow-hidden shadow-2xl shadow-primary/5 border-border"
        >
          <div className="flex flex-col lg:flex-row items-center">
            {/* Image Side */}
            <div className="w-full lg:w-[400px] relative h-[300px] md:h-[400px] lg:h-[500px] shrink-0 overflow-hidden rounded-xl">
              <Image 
                src="https://picsum.photos/seed/executive/800/800" 
                alt="CEO" 
                fill
                priority
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-primary/10" />
            </div>

            {/* Content Side */}
            <div className="p-8 md:p-12 lg:p-20 relative">
              <Quote size={80} className="absolute top-10 right-10 text-primary/5 -z-10" />
              
              <div className="flex items-center gap-2 mb-4 md:mb-6">
                <div className="w-10 h-0.5 bg-accent" />
                <span className="text-accent text-[10px] font-black uppercase tracking-[0.2em]">{t('home.ceo_title')}</span>
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-primary mb-6 md:mb-8 leading-tight">
                {t('nav.ceo_message')}
              </h2>

              <blockquote className="space-y-4 md:space-y-6 text-text-secondary leading-relaxed text-base md:text-lg italic">
                <p>
                  &quot;نسعى في شركة النفط الوطنية إلى أن نكون الركيزة الأساسية لاستقرار الطاقة في الوطن، من خلال تبني أفضل الممارسات العالمية في التوزيع والخدمات اللوجستية.&quot;
                </p>
                <p>
                  &quot;التزامنا بالشفافية والتميز هو ما يدفعنا للتطوير المستمر لمنظومتنا الرقمية وخدماتنا الميدانية لتلبية تطلعات المواطنين وقطاعات الأعمال.&quot;
                </p>
              </blockquote>

              <div className="mt-8 md:mt-12">
                <cite className="not-italic">
                  <span className="block text-lg md:text-xl font-black text-primary">المهندس / طارق عبدالله</span>
                  <span className="text-xs md:text-sm font-bold text-text-secondary opacity-60 uppercase tracking-widest">المدير التنفيذي العام</span>
                </cite>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
