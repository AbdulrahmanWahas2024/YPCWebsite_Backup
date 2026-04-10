'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import { ArrowRight, FileText, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { apiService } from '@/lib/api-service';
import { API_CONFIG } from '@/lib/api-config';

export default function TendersSection() {
  const { t } = useLanguage();
  const [tenders, setTenders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        setLoading(true);
        const data = await apiService.get<any>(API_CONFIG.DOC_TYPES.TENDERS);
        setTenders(data.slice(0, 3));
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    fetchTenders();
  }, []);

  return (
    <section className="py-24 bg-white relative">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-0.5 bg-accent" />
              <span className="text-accent text-[10px] font-black uppercase tracking-[0.2em]">{t('nav.tenders')}</span>
            </div>
            <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-black text-primary leading-tight">
              المناقصات والمزايدات المفتوحة
            </h2>
          </div>
          <Link href="/tenders">
            <Button variant="outline" size="sm">
              {t('common.view_all')}
              <ArrowRight size={16} className="rtl:rotate-180" />
            </Button>
          </Link>
        </div>

        <div className="space-y-6">
          {loading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="h-24 w-full bg-bg-soft animate-pulse rounded-2xl" />
            ))
          ) : (
            tenders.map((tender, idx) => (
              <motion.div
                key={tender.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-bg-soft hover:bg-white border border-border hover:border-accent/30 p-6 md:p-8 rounded-[24px] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 md:gap-8 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="flex items-center gap-4 md:gap-6 w-full lg:w-auto">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                    <FileText size={24} className="md:w-8 md:h-8" />
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <div className="flex items-center gap-2 md:gap-3">
                      <span className="text-[9px] md:text-[10px] font-black text-accent uppercase tracking-widest">{tender.id}</span>
                      <div className="w-1 h-1 rounded-full bg-border" />
                      <span className="flex items-center gap-1.5 text-[9px] md:text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                        <CheckCircle2 size={12} className="md:w-3.5 md:h-3.5" />
                        {tender.status}
                      </span>
                    </div>
                    <h3 className="text-base md:text-lg font-black text-primary group-hover:text-accent transition-colors line-clamp-2">
                      {tender.title}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 md:gap-8 w-full lg:w-auto">
                  <div className="flex items-center gap-3 text-text-secondary/60">
                    <Calendar size={16} className="text-primary md:w-[18px] md:h-[18px]" />
                    <div className="flex flex-col">
                      <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest">تاريخ الإغلاق</span>
                      <span className="text-[10px] md:text-xs font-bold text-text-primary">{tender.date}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-text-secondary/60">
                    <MapPin size={16} className="text-primary md:w-[18px] md:h-[18px]" />
                    <div className="flex flex-col">
                      <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest">الموقع</span>
                      <span className="text-[10px] md:text-xs font-bold text-text-primary">الإدارة العامة</span>
                    </div>
                  </div>

                  <Link href={`/tenders/apply/${tender.id}`} className="w-full sm:w-auto">
                    <Button size="sm" className="w-full sm:w-auto bg-primary text-white group-hover:bg-accent group-hover:text-primary-dark">
                      تقديم الآن
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </Container>
    </section>
  );
}
