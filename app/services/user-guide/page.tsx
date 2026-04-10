'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { PageHero } from '@/components/ui/PageHero';
import { Container } from '@/components/ui/Container';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BackButton } from '@/components/ui/BackButton';
import { Search, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PageSlider } from '@/components/ui/PageSlider';

export default function UserGuidePage() {
  const { t, dir } = useLanguage();

  const slides = [
    { 
      image: 'https://picsum.photos/seed/guide1/1920/600', 
      title: t('nav.user_guide'),
      subtitle: 'دليلك الشامل لاستخدام خدماتنا الإلكترونية بكل سهولة'
    },
    { 
      image: 'https://picsum.photos/seed/guide2/1920/600', 
      title: 'بوابة الخدمات الذاتية',
      subtitle: 'نظام متكامل يضع خدماتنا بين يديك على مدار الساعة'
    }
  ];

  const sections = [
    { 
      title: 'كيفية استخدام المنصة الإلكترونية', 
      desc: 'شرح مفصل لخطوات التسجيل والوصول للخدمات الإلكترونية المتاحة عبر البوابة الرسمية لشركة النفط.',
      content: 'يمكنك البدء بإنشاء حساب جديد باستخدام بريدك الإلكتروني ورقم الهاتف، ثم تفعيل الحساب للوصول إلى كافة الخدمات.'
    },
    { 
      title: 'تقديم طلبات التراخيص', 
      desc: 'دليل خطوة بخطوة لتقديم طلبات تراخيص المحطات الجديدة أو تجديد التراخيص القائمة.',
      content: 'يتطلب التقديم رفع وثائق الملكية، المخططات الهندسية، وموافقة الجهات ذات العلاقة عبر نظام المرفقات المدمج.'
    },
    { 
      title: 'نظام الاستعلام عن المعاملات', 
      desc: 'كيفية متابعة حالة طلبك عبر الرقم المرجعي ومعرفة المرحلة الحالية للمعاملة.',
      content: 'بمجرد تقديم الطلب، ستحصل على رقم مرجعي فريد يمكنك استخدامه في صفحة الاستعلام لمتابعة سير المعاملة لحظة بلحظة.'
    },
    { 
      title: 'الدعم الفني والمساعدة', 
      desc: 'قنوات التواصل المتاحة للدعم والمساعدة التقنية في حال واجهتكم أي صعوبات.',
      content: 'فريق الدعم الفني متاح على مدار الساعة عبر الدردشة المباشرة أو من خلال الاتصال بالرقم المجاني الموحد.'
    },
  ];

  const [expanded, setExpanded] = React.useState<number | null>(null);

  return (
    <main className="min-h-screen bg-bg-main">
      <Header />
      <PageSlider slides={slides} effect="3d" />
      
      <Container className="py-16">
        <BackButton />

        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
            <input 
              type="text" 
              placeholder={t('common.search')}
              className="input-field pr-12"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {sections.map((section, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center text-primary shrink-0">
                    <BookOpen size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-primary mb-2">{section.title}</h3>
                    <p className="text-text-secondary leading-relaxed">{section.desc}</p>
                    
                    <AnimatePresence>
                      {expanded === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 p-4 bg-bg-soft rounded-lg text-text-secondary border-r-4 border-accent">
                            {section.content}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                
                <button 
                  onClick={() => setExpanded(expanded === idx ? null : idx)}
                  className="btn-gov whitespace-nowrap"
                >
                  {expanded === idx ? 'إغلاق' : t('common.read_more')}
                  <ChevronRight size={18} className={cn("transition-transform", expanded === idx ? "rotate-90" : "rtl:rotate-180")} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
      <Footer />
    </main>
  );
}
