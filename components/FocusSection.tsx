'use client';

import { motion } from 'framer-motion';
import { Target, Layers, HeartHandshake, Shield } from 'lucide-react';
import { focusAreas } from '@/lib/data';

const iconMap: Record<string, React.ElementType> = {
  Target,
  Layers,
  HeartHandshake,
  Shield,
};

export default function FocusSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-transparent to-violet-600/5" />

      <div className="container-custom relative">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            What We Focus On
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {focusAreas.map((area, index) => {
            const Icon = iconMap[area.iconName] || Target;
            return (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-6 sm:p-8 text-center group hover:border-purple-500/20 transition-all duration-300 relative overflow-hidden"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Icon size={22} className="text-purple-300" />
                  </div>
                  <div className="font-display font-bold text-base sm:text-lg text-white mb-2">
                    {area.title}
                  </div>
                  <div className="text-slate-400 text-sm leading-relaxed">{area.description}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
