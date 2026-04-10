'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { PageHero } from '@/components/ui/PageHero';
import { Container } from '@/components/ui/Container';
import { motion, AnimatePresence } from 'motion/react';
import { Truck, Upload, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function TransportContractPage() {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-navy-dark pb-20">
      <PageHero 
        title={t('nav.transport_contract')} 
        image="https://picsum.photos/seed/oil-truck/1920/600"
      />
      
      <Container className="mt-12">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-5xl mx-auto"
            >
              <div className="glass-card rounded-[40px] overflow-hidden shadow-2xl border border-white/5">
                <div className="p-8 md:p-16">
                  <h3 className="text-3xl font-black text-white mb-12 text-center">تقديم عقد تشغيل ناقلة</h3>
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-white/80">اسم مالك الناقلة</label>
                      <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:outline-none focus:border-primary transition-all text-white" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-white/80">رقم اللوحة</label>
                      <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:outline-none focus:border-primary transition-all text-white" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-white/80">سعة الناقلة (لتر)</label>
                      <input type="number" required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:outline-none focus:border-primary transition-all text-white" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-white/80">نوع الوقود المخصص</label>
                      <select className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:outline-none focus:border-primary transition-all text-white">
                        <option className="bg-navy-dark">بنزين</option>
                        <option className="bg-navy-dark">ديزل</option>
                        <option className="bg-navy-dark">مازوت</option>
                      </select>
                    </div>
                    
                    <div className="md:col-span-2 space-y-4 mt-4">
                      <h4 className="font-black text-white border-b border-white/10 pb-2">المرفقات المطلوبة</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border-2 border-dashed border-white/10 rounded-2xl p-6 text-center hover:border-primary transition-all cursor-pointer bg-white/5">
                          <Upload className="mx-auto mb-2 text-white/30" size={24} />
                          <p className="text-xs font-bold text-white/60">رخصة القيادة والملكية</p>
                        </div>
                        <div className="border-2 border-dashed border-white/10 rounded-2xl p-6 text-center hover:border-primary transition-all cursor-pointer bg-white/5">
                          <Upload className="mx-auto mb-2 text-white/30" size={24} />
                          <p className="text-xs font-bold text-white/60">شهادة فحص السلامة</p>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2 flex justify-end pt-8">
                      <Button type="submit" size="lg" className="rounded-2xl px-16 py-8 text-xl font-black shadow-xl">
                        تقديم الطلب
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto text-center py-20"
            >
              <div className="w-24 h-24 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                <CheckCircle2 size={56} />
              </div>
              <h2 className="text-4xl font-black text-white mb-6">تم استلام طلبك بنجاح</h2>
              <p className="text-xl text-white/60 mb-10 leading-relaxed">
                شكراً لتقديم طلب عقد تشغيل ناقلة. تم تسجيل طلبك برقم مرجعي <span className="text-primary font-black">TRN-2026-1123</span>. سيقوم فريقنا بمراجعة الوثائق والتواصل معك قريباً.
              </p>
              <Button size="lg" className="rounded-2xl px-12" onClick={() => setIsSubmitted(false)}>
                العودة للخدمات
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </main>
  );
}
