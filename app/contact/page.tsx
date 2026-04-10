'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PageHero } from '@/components/ui/PageHero';
import { Container } from '@/components/ui/Container';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  const { t } = useLanguage();

  const contactInfo = [
    { icon: Phone, title: 'اتصل بنا', detail: '+967 1 123456', sub: 'متاح من 8:00 ص - 3:00 م' },
    { icon: Mail, title: 'البريد الإلكتروني', detail: 'info@noc.gov.ye', sub: 'نرد خلال 24 ساعة' },
    { icon: MapPin, title: 'الموقع', detail: 'صنعاء، شارع الستين', sub: 'الإدارة العامة' },
    { icon: Clock, title: 'ساعات العمل', detail: 'الأحد - الخميس', sub: '8:00 صباحاً - 3:00 مساءً' },
  ];

  return (
    <main>
      <Header />
      <PageHero 
        title={t('nav.contact')} 
        subtitle="نحن هنا للاستماع إليكم وتقديم المساعدة في أي وقت"
      />
      
      <Container className="py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-primary">معلومات التواصل</h2>
              <p className="text-text-secondary leading-relaxed">
                يمكنكم التواصل معنا عبر القنوات الرسمية الموضحة أدناه أو زيارة مقرنا الرئيسي.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-6 p-6 rounded-2xl bg-bg-soft border border-border"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shrink-0">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-primary mb-1">{item.title}</h3>
                    <p className="text-lg font-bold text-text-primary mb-1">{item.detail}</p>
                    <p className="text-xs text-text-secondary/60 uppercase tracking-widest">{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 md:p-16 rounded-[40px] shadow-2xl shadow-primary/5 border border-border"
            >
              <h2 className="text-3xl font-black text-primary mb-12">أرسل لنا رسالة</h2>
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-primary uppercase tracking-widest">الاسم الكامل</label>
                    <input 
                      type="text" 
                      placeholder="أدخل اسمك هنا"
                      className="w-full bg-bg-soft border border-border rounded-xl px-6 py-4 focus:outline-none focus:border-accent transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-primary uppercase tracking-widest">البريد الإلكتروني</label>
                    <input 
                      type="email" 
                      placeholder="email@example.com"
                      className="w-full bg-bg-soft border border-border rounded-xl px-6 py-4 focus:outline-none focus:border-accent transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-primary uppercase tracking-widest">الموضوع</label>
                  <input 
                    type="text" 
                    placeholder="كيف يمكننا مساعدتك؟"
                    className="w-full bg-bg-soft border border-border rounded-xl px-6 py-4 focus:outline-none focus:border-accent transition-all"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-primary uppercase tracking-widest">الرسالة</label>
                  <textarea 
                    rows={6}
                    placeholder="اكتب رسالتك هنا بالتفصيل..."
                    className="w-full bg-bg-soft border border-border rounded-xl px-6 py-4 focus:outline-none focus:border-accent transition-all resize-none"
                  />
                </div>

                <Button className="w-full py-6 text-lg group">
                  إرسال الرسالة
                  <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </Container>
      
      <Footer />
    </main>
  );
}
