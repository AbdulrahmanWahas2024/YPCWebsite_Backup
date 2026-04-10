'use client';

import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export const SectionHeading = ({ 
  title, 
  subtitle, 
  centered = false, 
  light = false,
  className 
}: SectionHeadingProps) => {
  return (
    <div className={cn(
      'mb-12 md:mb-16',
      centered ? 'text-center' : 'text-start',
      className
    )}>
      {subtitle && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn(
            'font-black uppercase tracking-[0.2em] mb-3 flex items-center gap-2 text-[10px]',
            centered ? 'justify-center' : 'justify-start',
            'text-primary'
          )}
        >
          {!centered && <div className="w-8 h-[2px] bg-current" />}
          {subtitle}
          {centered && <div className="w-8 h-[2px] bg-current" />}
        </motion.div>
      )}
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={cn(
          'text-2xl md:text-4xl font-black leading-tight',
          light ? 'text-white' : 'text-text-primary'
        )}
      >
        {title}
      </motion.h2>
      {centered && (
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="h-1 bg-primary mx-auto rounded-full mt-4 shadow-sm"
        />
      )}
    </div>
  );
};
