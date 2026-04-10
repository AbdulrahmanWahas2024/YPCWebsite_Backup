'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { PageHero } from '@/components/ui/PageHero';
import { Container } from '@/components/ui/Container';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Loader2, ArrowRight, Building2, MapPin, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function TenderApplyPage() {
  const { id } = useParams();
  const router = useRouter();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock API call
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-navy-dark pb-20">
      <PageHero 
        title="تقديم طلب مناقصة" 
        subtitle={`أنت بصدد التقديم على المناقصة رقم: TND-2026-00${id}`}
        image="https://picsum.photos/seed/tender-apply/1920/600"
      />
      
      <Container className="mt-12">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-navy-dark/80 rounded-[40px] overflow-hidden shadow-2xl border border-white/10">
                <div className="p-8 md:p-16">
                  <div className="flex items-center gap-4 mb-12">
                    <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                      <FileText size={28} />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white">نموذج التقديم</h3>
                      <p className="text-white/80 font-bold">يرجى ملء كافة البيانات المطلوبة بدقة</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Field: Category */}
                    <div className="space-y-2">
                      <label className="text-sm font-black text-white uppercase tracking-widest">مجال التقديم</label>
                      <select required className="w-full bg-white/10 border border-white/20 rounded-2xl py-5 px-6 focus:outline-none focus:border-accent transition-all font-bold text-white appearance-none">
                        <option value="" className="bg-navy-dark">اختر المجال...</option>
                        <option value="supply" className="bg-navy-dark">توريد مشتقات</option>
                        <option value="construction" className="bg-navy-dark">إنشاءات هندسية</option>
                        <option value="tech" className="bg-navy-dark">خدمات تقنية</option>
                        <option value="maintenance" className="bg-navy-dark">صيانة وتشغيل</option>
                      </select>
                    </div>

                    {/* Field: Company Name */}
                    <div className="space-y-2">
                      <label className="text-sm font-black text-white uppercase tracking-widest">اسم الشركة</label>
                      <div className="relative">
                        <Building2 className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50" size={20} />
                        <input type="text" required placeholder="اسم الشركة كما في السجل" className="w-full bg-white/10 border border-white/20 rounded-2xl py-5 pr-14 pl-6 focus:outline-none focus:border-accent transition-all font-bold text-white placeholder:text-white/30" />
                      </div>
                    </div>

                    {/* Field: Company Type */}
                    <div className="space-y-2">
                      <label className="text-sm font-black text-white uppercase tracking-widest">نوع الشركة</label>
                      <select required className="w-full bg-white/10 border border-white/20 rounded-2xl py-5 px-6 focus:outline-none focus:border-accent transition-all font-bold text-white appearance-none">
                        <option value="local" className="bg-navy-dark">شركة محلية</option>
                        <option value="global" className="bg-navy-dark">شركة عالمية</option>
                        <option value="sme" className="bg-navy-dark">شركة متوسطة وصغيرة</option>
                      </select>
                    </div>

                    {/* Field: Commercial Reg */}
                    <div className="space-y-2">
                      <label className="text-sm font-black text-white uppercase tracking-widest">رقم السجل التجاري</label>
                      <input type="text" required placeholder="0000000000" className="w-full bg-white/10 border border-white/20 rounded-2xl py-5 px-6 focus:outline-none focus:border-accent transition-all font-bold text-white placeholder:text-white/30" />
                    </div>

                    {/* Field: Governorate */}
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-black text-white uppercase tracking-widest">المحافظة</label>
                      <div className="relative">
                        <MapPin className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50" size={20} />
                        <select required className="w-full bg-white/10 border border-white/20 rounded-2xl py-5 pr-14 pl-6 focus:outline-none focus:border-accent transition-all font-bold text-white appearance-none">
                          <option value="sanaa" className="bg-navy-dark">صنعاء</option>
                          <option value="aden" className="bg-navy-dark">عدن</option>
                          <option value="taiz" className="bg-navy-dark">تعز</option>
                          <option value="hadhramaut" className="bg-navy-dark">حضرموت</option>
                          <option value="hodeidah" className="bg-navy-dark">الحديدة</option>
                        </select>
                      </div>
                    </div>

                    <div className="md:col-span-2 flex flex-col sm:flex-row justify-end pt-8 gap-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="lg" 
                        className="rounded-2xl px-10 py-7 border-white/20 text-white hover:bg-white/10 w-full sm:w-auto"
                        onClick={() => router.back()}
                      >
                        إلغاء
                      </Button>
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="rounded-2xl px-16 py-7 text-xl font-black shadow-xl shadow-primary/40 gap-3 bg-accent text-primary-dark hover:bg-white w-full sm:w-auto"
                        disabled={loading}
                      >
                        {loading ? <Loader2 className="animate-spin" size={24} /> : 'إرسال الطلب'}
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
              <h2 className="text-4xl font-black text-white mb-6">تم إرسال طلبك بنجاح</h2>
              <p className="text-xl text-white/60 mb-10 leading-relaxed">
                شكراً لتقديم طلب المناقصة. تم تسجيل طلبك برقم مرجعي <span className="text-primary font-black">APP-2026-9912</span>. سيتم مراجعة طلبك من قبل لجنة المناقصات وإشعاركم بالنتيجة عبر البريد الإلكتروني المسجل.
              </p>
              <div className="flex justify-center gap-6">
                <Button size="lg" className="rounded-2xl px-12 py-7" onClick={() => router.push('/tenders')}>
                  العودة للمناقصات
                </Button>
                <Button variant="outline" size="lg" className="rounded-2xl px-12 py-7 border-white/10 text-white hover:bg-white/5" onClick={() => router.push('/')}>
                  الرئيسية
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </main>
  );
}
