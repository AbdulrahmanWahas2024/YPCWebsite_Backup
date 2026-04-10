'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PageHero } from '@/components/ui/PageHero';
import { Container } from '@/components/ui/Container';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'motion/react';
import { History, Target, Eye, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  const { t } = useLanguage();

  const values = [
    { icon: History, title: 'تاريخنا', desc: 'تأسست شركة النفط الوطنية لتكون الذراع الاستراتيجي لتوزيع المشتقات النفطية في كافة أرجاء الوطن.' },
    { icon: Target, title: 'رسالتنا', desc: 'توفير احتياجات المواطنين والقطاعات الحيوية من الطاقة بأعلى معايير الجودة والشفافية.' },
    { icon: Eye, title: 'رؤيتنا', desc: 'الريادة في تقديم خدمات الطاقة والحلول اللوجستية المتكاملة والمستدامة.' },
    { icon: ShieldCheck, title: 'قيمنا', desc: 'النزاهة، التميز، المسؤولية الاجتماعية، والابتكار في خدمة المجتمع.' },
  ];

  return (
    <main>
      <Header />
      <PageHero 
        title={t('nav.about')} 
        subtitle="تعرف على مسيرة شركة النفط الوطنية ودورها في بناء المستقبل"
      />
      
      <Container className="py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-black text-primary">من نحن؟</h2>
            <div className="space-y-6 text-text-secondary leading-relaxed text-lg">
              <p>
                تعتبر شركة النفط الوطنية المؤسسة الرائدة في مجال تسويق وتوزيع المشتقات النفطية، حيث تمتلك شبكة واسعة من المنشآت الاستراتيجية ومحطات التوزيع التي تغطي كافة المحافظات.
              </p>
              <p>
                نعمل من خلال كوادرنا المؤهلة وتقنياتنا الحديثة على ضمان استقرار سوق الطاقة وتوفير الاحتياجات المتزايدة للتنمية الاقتصادية والاجتماعية.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[400px] rounded-[32px] overflow-hidden shadow-2xl"
          >
            <Image 
              src="https://picsum.photos/seed/about/800/600" 
              alt="About NOC" 
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-10 rounded-[24px] border border-border hover:border-accent transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                <item.icon size={28} />
              </div>
              <h3 className="text-xl font-black text-primary mb-4">{item.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed opacity-70">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
      
      <Footer />
    </main>
  );
}
