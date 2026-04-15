'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { BackButton } from '@/components/ui/BackButton';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Calendar, CheckCircle2, Trophy } from 'lucide-react';
import Image from 'next/image';
import Link from "next/link";
import { API_CONFIG } from '@/lib/api-config';

export default function ProjectDetailsPage() {

  const { id } = useParams();
  const { t } = useLanguage();

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  /* ==============================
     جلب المشروع من ERPNext
  ============================== */

  useEffect(() => {

    const fetchProject = async () => {

      try {

        setLoading(true);

        const fields = encodeURIComponent(JSON.stringify([
          "name",
          "title",
          "category",
          "status",
          "date",
          "image",
          "description",
          "content",
          "completion_percentage",
          "start_date",
          "gallery_images",
          "contractor"
        ]));

        const url =
          `${API_CONFIG.BASE_URL}/api/resource/YPC Project/${id}` +
          `?fields=${fields}`;

        console.log("PROJECT DETAIL URL:", url);

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("API Error " + res.status);
        }

        const result = await res.json();

        console.log("PROJECT DETAIL RESULT:", result);

        setProject(result.data);

      }

      catch (err) {

        console.error("PROJECT DETAIL ERROR:", err);

      }

      finally {

        setLoading(false);

      }

    };

    if (id) fetchProject();

  }, [id]);

  /* ==============================
     تحويل رابط الصورة
  ============================== */

  const getImageUrl = (img?: string) => {

    if (!img) return "/placeholder.jpg";

    if (img.startsWith("http")) return img;

    return `${API_CONFIG.BASE_URL}${img}`;

  };

  /* ==============================
     حماية
  ============================== */

  if (loading)
    return <div className="min-h-screen bg-bg-main" />;

  if (!project)
    return (
      <div className="min-h-screen flex items-center justify-center">
        لا يوجد مشروع
      </div>
    );

  /* ==============================
     Gallery من ERPNext
  ============================== */

  const gallery = [

    getImageUrl(project.image),

    ...(project.gallery_images?.map((g: any) =>
      getImageUrl(g.image)
    ) || [])

  ].filter(Boolean);

  return (

    <main className="bg-bg-main min-h-screen">

      <Header />

      {/* ================= HERO ================= */}

      <section className="relative pt-32 pb-20 bg-primary-dark overflow-hidden">

        <div className="absolute inset-0 opacity-20">

          <Image
            src={getImageUrl(project.image)}
            alt={project.title || "عنوان المشروع"}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/60 to-transparent" />

        </div>

        <Container className="relative z-10">

          <BackButton className="text-white/60 hover:text-white" />

          <div className="max-w-4xl">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-6"
            >

              <Trophy className="text-accent" size={32} />

              <span className="text-accent font-black uppercase tracking-widest text-sm">
                إنجاز وطني استراتيجي
              </span>

            </motion.div>

            {/* ✅ عنوان المشروع */}

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight"
            >

              {project.title}

            </motion.h1>

            {/* معلومات المشروع */}

            <div className="flex flex-wrap gap-8 text-white/70">

              <div className="flex items-center gap-2">
                <MapPin size={20} className="text-accent" />
                <span className="font-bold">
                  المنطقة : اليمن - صنعاء
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar size={20} className="text-accent" />
                <span className="font-bold">
                  {project.start_date || "2024"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 size={20} className="text-accent" />
                <span className="font-bold">
                  {project.status || "قيد التنفيذ"}
                </span>
              </div>

            </div>

          </div>

        </Container>

      </section>

      {/* ================= CONTENT ================= */}

      <Container className="py-20">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* LEFT */}

          <div className="lg:col-span-2 space-y-12">

            {/* ================= وصف المشروع ================= */}

            <section>

              {/* ✅ صندوق شفاف جميل */}

              <div className="bg-white/60 backdrop-blur-md border border-border rounded-3xl p-10 shadow-xl">

                {/* عنوان */}

                <h2 className="text-2xl font-black text-primary mb-6">
                  {project.title}
                </h2>

                {/* وصف */}

                <p className="text-text-secondary text-lg leading-relaxed mb-8">

                  {project.description}
                  
                </p>
                
                {/* محتوى المشروع */}


                <div
  className="
    max-w-none
    text-text-secondary
    leading-relaxed
    text-right
    text-base

    [&_p]:mb-4
    [&_p]:text-base

    [&_ul]:mb-4
    [&_li]:mb-2
    [&_li]:text-base

    [&_h1]:text-xl
    [&_h2]:text-lg
    [&_h3]:text-base

    [&_strong]:text-primary
  "
                  style={{
                    background: "transparent",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: project.content || ""
                  }}
                />

              </div>

            </section>

            {/* ================= معرض الصور ================= */}

            <section>

              <h2 className="text-3xl font-black text-primary mb-8">
                معرض الصور
              </h2>

              <div className="space-y-6">

                <div className="relative aspect-video rounded-[40px] overflow-hidden shadow-2xl group bg-black">

                  <AnimatePresence mode="wait">

                    <motion.div
                      key={activeImage}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-0"
                    >

                      <Image
                        src={gallery[activeImage]}
                        alt="Project Gallery"
                        fill
                        sizes="100vw"
                        className="object-contain"
                      />

                    </motion.div>

                  </AnimatePresence>

                </div>

                {/* thumbnails */}

                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">

                  {gallery.map((img, idx) => (

                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`relative w-24 h-16 md:w-32 md:h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${activeImage === idx ? 'border-accent scale-105 shadow-lg' : 'border-border opacity-50 hover:opacity-100'
                        }`}
                    >

                      <Image
                        src={img}
                        alt="thumb"
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />

                    </button>

                  ))}

                </div>

              </div>

            </section>

          </div>

          {/* RIGHT SIDEBAR */}

          <div className="space-y-8">

            {/* تفاصيل فنية */}

            <div className="bg-white p-8 rounded-3xl border border-border shadow-sm">

              <h3 className="text-xl font-black text-primary mb-6 pb-4 border-b border-border">
                تفاصيل فنية
              </h3>

              <ul className="space-y-4">

                <li className="flex justify-between items-center">
                  <span className="text-text-secondary">
                    الجهة المنفذة
                  </span>

                  <span className="font-bold text-primary">
                    {project.contractor || "غير محدد"}
                  </span>
                </li>

                <li className="flex justify-between items-center">
                  <span className="text-text-secondary">
                    نسبة الإنجاز
                  </span>

                  <span className="font-bold text-emerald-600">
                    {project.completion_percentage || 0}%
                  </span>
                </li>

              </ul>

            </div>

            {/* لم يتم حذف هذا الجزء */}

            <div className="bg-primary p-8 rounded-3xl text-white">

              <h3 className="text-xl font-black mb-4">
                هل لديك استفسار؟
              </h3>

              <p className="text-white/70 text-sm mb-6">
                يمكنكم التواصل مع قسم المشاريع للحصول على مزيد من المعلومات حول هذا المشروع.
              </p>
              <Link href="/contact">
              <button className="btn-gov w-full bg-accent text-primary-dark">
                تواصل معنا الآن
              </button>
              </Link>

            </div>

          </div>

        </div>

      </Container>

      <Footer />

    </main>

  );

}