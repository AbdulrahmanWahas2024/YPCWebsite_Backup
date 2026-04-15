'use client';

import React from 'react';
import { Container } from './Container';
import Image from 'next/image';
import { motion } from 'motion/react';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image?: string;
}

export const PageHero = ({ title, subtitle, image = 'https://picsum.photos/seed/oil/1920/600' }: PageHeroProps) => {
  return (
    <section className="relative h-[400px] w-full overflow-hidden bg-primary-dark">
      <div className="relative h-full w-full">
        <Image 
          src={image} 
          alt={title} 
          fill 
          priority
          sizes="100vw"
          className="object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Subtle overlay for text readability, but not a glowing gradient at the bottom */}
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="absolute inset-0 flex items-center">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="w-12 h-1 bg-accent mb-6" />
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xl text-white/70 font-medium">
                {subtitle}
              </p>
            )}
          </motion.div>
        </Container>
      </div>
    </section>
  );
};
