'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PageHero } from '@/components/ui/PageHero';
import { Container } from '@/components/ui/Container';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'motion/react';
import { TrendingUp, Shield, Zap, Users, Globe, BarChart3 } from 'lucide-react';

export default function StrategyPage() {
  const { t } = useLanguage();

  const goals = [
    { icon: TrendingUp, title: 'النمو المستدام', desc: 'تحقيق نمو متوازن في كافة قطاعات الشركة مع الحفاظ على الموارد.' },
    { icon: Shield, title: 'الأمن الطاقي', desc: 'ضمان استمرارية تدفق المشتقات النفطية وتأمين المخزون الاستراتيجي.' },
    { icon: Zap, title: 'التحول الرقمي', desc: 'أتمتة كافة العمليات الإدارية والميدانية لرفع الكفاءة والشفافية.' },
    { icon: Users, title: 'تطوير الكوادر', desc: 'الاستثمار في العنصر البشري وتأهيل الكفاءات الوطنية الشابة.' },
    { icon: Globe, title: 'المسؤولية البيئية', desc: 'الالتزام بالمعايير البيئية العالمية وتقليل الأثر الكربوني.' },
    { icon: BarChart3, title: 'الكفاءة التشغيلية', desc: 'تحسين سلاسل الإمداد وتقليل التكاليف التشغيلية غير الضرورية.' },
  ];

  return (
    <main>
      <Header />
      <PageHero 
        title="الخطة الاستراتيجية 2040" 
        subtitle="خارطة طريق نحو الريادة والابتكار في قطاع الطاقة"
      />
      
      <Container className="py-24">
        <div className="max-w-4xl mx-auto text-center mb-20 space-y-6">
          <h2 className="text-4xl font-black text-primary">رؤيتنا للمستقبل</h2>
          <p className="text-xl text-text-secondary leading-relaxed">
            تستند خطتنا الاستراتيجية 2040 على ركائز أساسية تهدف إلى تحويل شركة النفط الوطنية إلى مؤسسة طاقة متكاملة، تعتمد على التكنولوجيا والابتكار لخدمة المجتمع وتحقيق التنمية المستدامة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {goals.map((goal, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative p-12 rounded-[40px] bg-white border border-border hover:border-accent transition-all group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -mr-10 -mt-10 transition-all group-hover:bg-primary group-hover:scale-150" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-8 group-hover:bg-white group-hover:text-primary transition-all">
                  <goal.icon size={32} />
                </div>
                
                <h3 className="text-2xl font-black text-primary mb-6 group-hover:text-accent transition-colors">
                  {goal.title}
                </h3>
                
                <p className="text-text-secondary leading-relaxed group-hover:text-text-primary transition-colors">
                  {goal.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 p-12 md:p-20 rounded-[50px] bg-primary text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
            </svg>
          </div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black leading-tight">ملتزمون بالتميز والابتكار</h2>
              <p className="text-xl text-white/70 leading-relaxed">
                نحن لا نبني فقط منشآت نفطية، بل نبني مستقبلاً آمناً للطاقة في وطننا الغالي. انضم إلينا في رحلتنا نحو التميز.
              </p>
              <button className="px-10 py-5 rounded-2xl bg-accent text-primary-dark font-black text-lg hover:bg-white transition-all shadow-xl shadow-accent/20">
                تحميل ملف الاستراتيجية (PDF)
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              {[
                { label: 'مشروع استراتيجي', val: '50+' },
                { label: 'موظف مؤهل', val: '5000+' },
                { label: 'محطة توزيع', val: '1200+' },
                { label: 'سنة من العطاء', val: '60+' },
              ].map((stat, idx) => (
                <div key={idx} className="p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
                  <div className="text-3xl font-black text-accent mb-2">{stat.val}</div>
                  <div className="text-xs font-bold text-white/60 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
      
      <Footer />
    </main>
  );
}
