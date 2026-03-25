'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({
  badge,
  title,
  highlight,
  subtitle,
  align = 'center',
  className,
}: SectionHeadingProps) {
  const fullTitle = highlight ? title.replace(highlight, `|||${highlight}|||`) : title;
  const parts = fullTitle.split('|||');

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className
      )}
    >
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          {badge}
        </span>
      )}

      <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-tight">
        {parts.map((part, i) =>
          part === highlight ? (
            <span key={i} className="gradient-text">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </h2>

      {subtitle && (
        <p
          className={cn(
            'text-slate-400 text-base sm:text-lg leading-relaxed',
            align === 'center' ? 'max-w-2xl' : 'max-w-xl'
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
