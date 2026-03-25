'use client';

import { motion } from 'framer-motion';
import {
  Monitor,
  Smartphone,
  Cloud,
  Zap,
  Palette,
  Layers,
  Database,
  Wrench,
} from 'lucide-react';
import { type Service } from '@/lib/data';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Monitor,
  Smartphone,
  Cloud,
  Zap,
  Palette,
  Layers,
  Database,
  Wrench,
};

interface ServiceCardProps {
  service: Service;
  index?: number;
  variant?: 'compact' | 'full';
}

export default function ServiceCard({ service, index = 0, variant = 'compact' }: ServiceCardProps) {
  const Icon = iconMap[service.iconName] || Monitor;

  if (variant === 'full') {
    return (
      <motion.div
        id={service.id}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card p-8 group hover:border-purple-500/20 transition-all duration-300 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/3 to-violet-500/3 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

        <div className="relative">
          <div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
            style={{ boxShadow: `0 8px 32px rgba(203, 109, 232, 0.2)` }}
          >
            <Icon size={26} className="text-white" />
          </div>

          <h3 className="font-display font-bold text-xl text-white mb-3">{service.title}</h3>
          <p className="text-slate-400 leading-relaxed mb-6">{service.description}</p>

          <div className="mb-6">
            <div className="text-sm font-semibold text-slate-300 mb-3">Key Features</div>
            <div className="grid grid-cols-2 gap-2">
              {service.benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2 text-sm text-slate-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
            <span className="text-xs text-slate-500 bg-white/[0.04] px-3 py-1 rounded-full">
              {service.forWho}
            </span>
            <Link
              href="/contact"
              className="flex items-center gap-1 text-sm text-purple-400 font-medium hover:text-purple-300 transition-colors group/link"
            >
              Get Started
              <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="glass-card-hover p-6 group relative overflow-hidden cursor-pointer"
    >
      {/* Gradient glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

      <div className="relative">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon size={22} className="text-white" />
        </div>

        <h3 className="font-display font-semibold text-lg text-white mb-2">{service.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">{service.shortDesc}</p>

        <div className="flex flex-wrap gap-1.5">
          {service.benefits.slice(0, 2).map((benefit) => (
            <span
              key={benefit}
              className="text-xs px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.08] text-slate-400"
            >
              {benefit}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
