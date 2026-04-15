'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

const slides = [
  {
    image: 'https://picsum.photos/seed/oil-refinery/1920/1080',
    title: 'Energy Solutions for the Future',
    subtitle: 'نعمل بتميز واستدامة لتوفير احتياجات الوطن من الطاقة',
  },
  {
    image: 'https://picsum.photos/seed/oil-tanker/1920/1080',
    title: 'Global Logistics Excellence',
    subtitle: 'أسطول نقل حديث يغطي كافة أرجاء الجمهورية',
  },
  {
    image: 'https://picsum.photos/seed/energy-infrastructure/1920/1080',
    title: 'Strategic Storage Capacity',
    subtitle: 'منشآت تخزين استراتيجية تضمن أمن الطاقة الوطني',
  },
];

export default function HeroSlider() {
  const { t, dir } = useLanguage();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-[220px] md:h-[500px] lg:h-[600px] w-full overflow-hidden bg-primary-dark">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Background */}
          <motion.div 
            className="relative h-full w-full overflow-hidden"
            animate={{ scale: 1.05 }}
            transition={{ duration: 10, ease: "linear" }}
          >
            <Image
              src={slides[current].image}
              alt="Hero Image"
              fill
              sizes="100vw"
              className="object-cover"
              priority
              referrerPolicy="no-referrer"
              unoptimized // أضف هذا السطر لحل مشكلة الـ 504 فوراً
            />
            <div className="absolute inset-0 bg-primary-dark/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 via-transparent to-transparent" />
          </motion.div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <Container>
              <div className="max-w-3xl space-y-4 md:space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-accent text-primary-dark text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-2 md:mb-6">
                    National Oil Company
                  </span>
                  <h1 className="text-[clamp(1.5rem,5vw,4.5rem)] font-black text-white leading-tight mb-2 md:mb-6 tracking-tight">
                    {slides[current].title}
                  </h1>
                  <p className="text-[clamp(0.875rem,2vw,1.25rem)] text-white/80 leading-relaxed font-medium line-clamp-2 md:line-clamp-none">
                    {slides[current].subtitle}
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-2 md:gap-4"
                >
                  <Button size="sm" className="md:hidden bg-accent text-primary-dark hover:bg-white text-[10px] px-3 py-1 h-auto">
                    {t('hero.cta_projects')}
                  </Button>
                  <div className="hidden md:flex gap-4">
                    <Button size="lg" className="bg-accent text-primary-dark hover:bg-white">
                      {t('hero.cta_projects')}
                      <ArrowRight size={20} className="rtl:rotate-180" />
                    </Button>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-dark">
                      {t('hero.cta_services')}
                    </Button>
                  </div>
                </motion.div>
              </div>
            </Container>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-10 left-0 right-0 z-20">
        <Container className="flex justify-between items-center">
          <div className="flex gap-4">
            <button onClick={prev} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary-dark transition-all">
              <ChevronLeft size={24} className="rtl:rotate-180" />
            </button>
            <button onClick={next} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary-dark transition-all">
              <ChevronRight size={24} className="rtl:rotate-180" />
            </button>
          </div>

          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-1.5 transition-all rounded-full ${current === idx ? 'w-12 bg-accent' : 'w-4 bg-white/20'}`}
              />
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
