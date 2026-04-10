'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { FileText, Settings, Building2, MapPin } from 'lucide-react';

import { Container } from '@/components/ui/Container';

const stats = [
  { id: 'requests', labelKey: 'home.stats.requests', value: 12500, icon: FileText },
  { id: 'services', labelKey: 'home.stats.services', value: 48, icon: Settings },
  { id: 'entities', labelKey: 'home.stats.entities', value: 32, icon: Building2 },
  { id: 'stations', labelKey: 'home.stats.stations', value: 850, icon: MapPin },
];

function Counter({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{Math.floor(count).toLocaleString()}</span>;
}

export default function StatsSection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 relative overflow-hidden bg-bg-main">
      <Container className="relative z-10">
        <h2 className="sr-only">Company Statistics</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-bg-card border border-border text-primary mx-auto mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                <stat.icon size={32} />
              </div>
              <div className="text-3xl md:text-5xl font-black text-text-primary mb-2 tracking-tight group-hover:text-primary transition-colors">
                <Counter value={stat.value} />
                <span className="text-primary">+</span>
              </div>
              <div className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">
                {t(stat.labelKey)}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
