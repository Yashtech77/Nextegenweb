'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface PageHeaderProps {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  breadcrumb?: { label: string; href: string }[];
}

export default function PageHeader({
  badge,
  title,
  highlight,
  subtitle,
  breadcrumb,
}: PageHeaderProps) {
  const renderTitle = () => {
    if (!highlight) return <span>{title}</span>;
    const parts = title.split(highlight);
    return (
      <>
        {parts[0]}
        <span className="gradient-text">{highlight}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-[#050B18]">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/8 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="container-custom relative text-center">
        {/* Breadcrumb */}
        {breadcrumb && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-1.5 text-sm text-slate-500 mb-6"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-slate-300 transition-colors">
              Home
            </Link>
            {breadcrumb.map((crumb) => (
              <span key={crumb.href} className="flex items-center gap-1.5">
                <ChevronRight size={14} />
                <Link href={crumb.href} className="hover:text-slate-300 transition-colors">
                  {crumb.label}
                </Link>
              </span>
            ))}
          </motion.nav>
        )}

        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-widest mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            {badge}
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight mb-6"
        >
          {renderTitle()}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="w-24 h-1 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full mx-auto mt-8"
        />
      </div>
    </section>
  );
}
