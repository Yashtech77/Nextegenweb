'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { type Testimonial } from '@/lib/data';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

export default function TestimonialCard({ testimonial, index = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card p-7 relative group hover:border-purple-500/20 transition-all duration-300 flex flex-col h-full"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/3 to-violet-500/3 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

      <div className="relative flex flex-col h-full">
        {/* Quote icon */}
        <div className="absolute top-0 right-0 -mt-1 -mr-1">
          <Quote size={40} className="text-purple-500/10" fill="currentColor" />
        </div>

        {/* Stars */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        {/* Content */}
        <p className="text-slate-300 text-sm leading-relaxed flex-1 mb-6">
          &ldquo;{testimonial.content}&rdquo;
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
          <div
            className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.avatarGradient} flex items-center justify-center text-sm font-bold text-white shrink-0`}
          >
            {testimonial.initials}
          </div>
          <div>
            <div className="font-semibold text-white text-sm">{testimonial.name}</div>
            <div className="text-xs text-slate-500">
              {testimonial.role} · {testimonial.company}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
