'use client';

import { motion } from 'framer-motion';
import {
  Target,
  Zap,
  Shield,
  Code2,
  Sparkles,
  HeartHandshake,
} from 'lucide-react';
import { whyChooseUs } from '@/lib/data';
import SectionHeading from './SectionHeading';

const iconMap: Record<string, React.ElementType> = {
  Target,
  Zap,
  Shield,
  Code2,
  Sparkles,
  HeartHandshake,
};

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-[#080E1D] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[100px] -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-600/5 rounded-full blur-[80px]" />

      <div className="container-custom relative">
        <div className="text-center mb-16">
          <SectionHeading
            badge="Why NextGenWebWorks"
            title="Engineering Excellence Meets"
            highlight="Startup Speed"
            subtitle="We combine the rigor of enterprise engineering with the urgency of startup execution. That's what makes us different."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseUs.map((item, index) => {
            const Icon = iconMap[item.iconName] || Zap;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="relative group"
              >
                <div className="glass-card p-6 h-full hover:border-purple-500/20 transition-all duration-300 relative overflow-hidden">
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/4 to-violet-500/4 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

                  <div className="relative">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-500/20 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                      <Icon size={22} className="text-purple-400" />
                    </div>

                    <h3 className="font-display font-semibold text-lg text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 glass-card p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="text-center sm:text-left">
            <p className="font-display font-bold text-2xl text-white mb-1">
              Ready to build something{' '}
              <span className="gradient-text">extraordinary?</span>
            </p>
            <p className="text-slate-400 text-sm">
              Let&apos;s talk about your project. No commitments, just a real conversation.
            </p>
          </div>
          <a href="/contact" className="btn-primary shrink-0 px-8">
            Book a Free Call →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
