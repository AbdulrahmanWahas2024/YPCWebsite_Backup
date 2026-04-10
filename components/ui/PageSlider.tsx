'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { Container } from './Container';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface Slide {
  image: string;
  title: string;
  subtitle?: string;
}

interface PageSliderProps {
  slides: Slide[];
  effect?: 'smooth' | '3d';
}

export const PageSlider = ({ slides, effect = 'smooth' }: PageSliderProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-[400px] lg:h-[500px] w-full overflow-hidden bg-primary-dark">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: effect === '3d' ? 1.1 : 1 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: effect === '3d' ? 0.9 : 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{ perspective: effect === '3d' ? '1000px' : 'none' }}
        >
          {/* Image Container with subtle motion */}
          <motion.div 
            className="relative h-full w-full"
            animate={effect === '3d' ? {
              rotateY: [0, 5, 0, -5, 0],
              rotateX: [0, 2, 0, -2, 0],
              scale: [1, 1.02, 1],
            } : {
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Image
              src={slides[current].image}
              alt={slides[current].title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
              referrerPolicy="no-referrer"
            />
            {/* Subtle dark overlay for readability */}
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <Container>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="max-w-3xl"
              >
                <div className="w-12 h-1 bg-accent mb-6" />
                <h1 className="text-4xl lg:text-6xl font-black text-white mb-4 tracking-tight">
                  {slides[current].title}
                </h1>
                {slides[current].subtitle && (
                  <p className="text-xl text-white/80 font-medium">
                    {slides[current].subtitle}
                  </p>
                )}
              </motion.div>
            </Container>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-0 right-0 z-20">
          <Container className="flex justify-center gap-4">
            <button 
              onClick={prev} 
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary-dark transition-all"
            >
              <ChevronLeft size={20} className="rtl:rotate-180" />
            </button>
            <div className="flex items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`h-1.5 transition-all rounded-full ${current === idx ? 'w-8 bg-accent' : 'w-2 bg-white/20'}`}
                />
              ))}
            </div>
            <button 
              onClick={next} 
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary-dark transition-all"
            >
              <ChevronRight size={20} className="rtl:rotate-180" />
            </button>
          </Container>
        </div>
      )}
    </section>
  );
};
