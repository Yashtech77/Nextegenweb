'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryCta?: string;
  primaryHref?: string;
  secondaryCta?: string;
  secondaryHref?: string;
}

export default function CTASection({
  title = "Let's Build Something Amazing Together",
  subtitle = "Have an idea? We'll help you validate it, design it, and ship it. No agency fluff — just real product work.",
  primaryCta = 'Book a Free Consultation',
  primaryHref = '/contact',
  secondaryCta = 'View Our Work',
  secondaryHref = '/portfolio',
}: CTASectionProps) {
  return (
    <section className="section-padding relative overflow-hidden bg-[#080E1D]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-violet-600/10" />

      {/* Decorative circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/[0.03] rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/[0.05] rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-white/[0.08] rounded-full" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-purple-500/10 blur-[80px]" />

      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
            {title.split('Amazing')[0]}
            <span className="gradient-text">Amazing</span>
            {title.split('Amazing')[1]}
          </h2>

          <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={primaryHref} className="btn-primary text-base px-8 py-4 group">
              <Calendar size={18} />
              {primaryCta}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link href={secondaryHref} className="btn-secondary text-base px-8 py-4">
              {secondaryCta}
            </Link>
          </div>

          {/* Micro-copy */}
          <p className="mt-6 text-sm text-slate-600">
            No commitment required · Free 30-min strategy call · NDA available
          </p>
        </motion.div>
      </div>
    </section>
  );
}
