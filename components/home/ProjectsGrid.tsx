'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { apiService } from '@/lib/api-service';
import { API_CONFIG } from '@/lib/api-config';
import { Skeleton } from '@/components/ui/Skeleton';

export default function ProjectsGrid() {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await apiService.get<any>(API_CONFIG.DOC_TYPES.PROJECTS);
        setProjects(data.slice(0, 3));
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section className="py-24 bg-bg-soft relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2 pointer-events-none" />

      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-0.5 bg-accent" />
              <span className="text-accent text-[10px] font-black uppercase tracking-[0.2em]">{t('home.projects_title')}</span>
            </div>
            <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-black text-primary leading-tight">
              {t('home.projects_title')}
            </h2>
          </div>
          <Link href="/projects">
            <Button variant="outline" size="sm">
              {t('common.view_all')}
              <ArrowRight size={16} className="rtl:rotate-180" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton key={idx} className="h-[400px] md:h-[500px] w-full rounded-[32px] bg-primary/5" />
            ))
          ) : (
            projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative h-[400px] md:h-[500px] rounded-[32px] overflow-hidden shadow-2xl shadow-primary/10"
              >
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                
                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                  <div className="space-y-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="inline-block px-3 py-1 rounded-lg bg-accent/20 text-accent text-[9px] font-black uppercase tracking-widest backdrop-blur-sm border border-accent/30">
                      مشروع استراتيجي
                    </span>
                    <h3 className="text-2xl font-black text-white leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {project.description}
                    </p>
                    <div className="pt-4">
                      <Link href={`/projects/${project.id}`}>
                        <Button size="sm" className="bg-white text-primary hover:bg-accent hover:text-primary-dark">
                          تفاصيل المشروع
                          <ExternalLink size={16} />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </Container>
    </section>
  );
}
