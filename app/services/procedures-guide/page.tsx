'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Container } from '@/components/ui/Container';
import { motion } from 'motion/react';
import { FileText, Download, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PageSlider } from '@/components/ui/PageSlider';
import Link from 'next/link';

export default function ProceduresGuidePage() {
  const { t } = useLanguage();

  const slides = [
    { 
      image: 'https://picsum.photos/seed/proc1/1920/600', 
      title: t('nav.procedures_guide'),
      subtitle: 'نعمل بوضوح وشفافية لتسهيل كافة الإجراءات'
    },
    { 
      image: 'https://picsum.photos/seed/proc2/1920/600', 
      title: 'دليل الإجراءات الموحد',
      subtitle: 'خطوات واضحة لكل خدمة نقدمها'
    }
  ];

  const guides = [
    { 
      title: 'دليل تراخيص محطات الوقود', 
      description: 'يتضمن كافة الشروط والمتطلبات الفنية والقانونية للحصول على ترخيص إنشاء أو تشغيل محطة وقود.',
      size: '2.4 MB', 
      date: '2025-10-15' 
    },
    { 
      title: 'دليل عقود نقل المشتقات النفطية', 
      description: 'يوضح الإجراءات المتبعة لإبرام عقود النقل واللوائح المنظمة لعملية توزيع المشتقات.',
      size: '1.8 MB', 
      date: '2025-11-20' 
    },
    { 
      title: 'دليل إجراءات الاستيراد والتوزيع', 
      description: 'دليل شامل يغطي مراحل استيراد المشتقات النفطية وآليات التوزيع في السوق المحلية.',
      size: '3.1 MB', 
      date: '2026-01-05' 
    },
  ];

  return (
    <main className="min-h-screen bg-bg-main pb-20">
      <PageSlider slides={slides} effect="smooth" />
      
      <Container className="mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <h2 className="text-3xl font-black text-primary">الملفات الإجرائية القابلة للتحميل</h2>
          <Link href="/">
            <Button variant="outline" className="rounded-full gap-2">
              <Home size={18} />
              العودة إلى الصفحة الرئيسية
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-[32px] border border-border flex flex-col h-full hover:border-primary transition-all group shadow-sm"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                <FileText size={32} />
              </div>
              <h3 className="text-xl font-black text-primary mb-3">{guide.title}</h3>
              <p className="text-text-secondary text-sm mb-6 flex-grow leading-relaxed">
                {guide.description}
              </p>
              <div className="pt-6 border-t border-border flex items-center justify-between">
                <span className="text-xs text-text-secondary font-bold">{guide.size} • {guide.date}</span>
                <a href="#" download onClick={(e) => e.preventDefault()}>
                  <Button variant="primary" size="sm" className="rounded-full gap-2">
                    <Download size={16} />
                    تنزيل الملف
                  </Button>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link href="/">
            <Button variant="primary" size="lg" className="rounded-full gap-2 mx-auto">
              <Home size={20} />
              العودة إلى الصفحة الرئيسية
            </Button>
          </Link>
        </div>
      </Container>
    </main>
  );
}

