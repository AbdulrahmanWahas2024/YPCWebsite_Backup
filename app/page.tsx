'use client';

import React, { useEffect, useState } from 'react'; // أضفنا useEffect و useState
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSlider from '@/components/home/HeroSlider';
import CEOMessage from '@/components/home/CEOMessage';
import FuelPrices from '@/components/home/FuelPrices';
import ProjectsGrid from '@/components/home/ProjectsGrid';
import TendersSection from '@/components/home/TendersSection';
import NewsSection from '@/components/home/NewsSection';
import { motion, useScroll, useSpring } from 'framer-motion'; // تأكد من الاسم الصحيح للمكتبة
import { getFrappeData } from '@/lib/erpService'; // استيراد الدالة

export default function Home() {
  const [connectionStatus, setConnectionStatus] = useState<string>('جاري الفحص...');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // اختبار الاتصال بـ ERPNext عند فتح الصفحة
  // داخل useEffect في ملف app/page.tsx
  useEffect(() => {
    const checkConnection = async () => {
      const res = await getFrappeData('frappe.auth.get_logged_user');

      if (res && res.message && !res.error) {
        setConnectionStatus(`✅ متصل بـ ERPNext (${res.message})`);
      } else {
        setConnectionStatus('❌ فشل الاتصال بالسيرفر (تأكد من تشغيل Bench)');
      }
    };

    checkConnection();
  }, []);

  return (
    <main className="relative">
      {/* شريط حالة الاتصال للتأكد فقط (يمكنك حذفه لاحقاً) */}
      <div className="fixed bottom-4 left-4 bg-black/80 text-white p-2 rounded-lg text-xs z-[9999]">
        {connectionStatus}
      </div>

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-[10000] origin-left"
        style={{ scaleX }}
      />

      <Header />
      <HeroSlider />
      <CEOMessage />

      {/* هنا ستبدأ لاحقاً بتمرير بيانات حقيقية بدلاً من البيانات الثابتة */}
      <FuelPrices />
      <NewsSection />

      <ProjectsGrid />
      <TendersSection />
      <Footer />
    </main>
  );
}