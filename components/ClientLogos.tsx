'use client';

import { motion } from 'framer-motion';
import { clientLogos } from '@/lib/data';

export default function ClientLogos() {
  return (
    <section className="py-12 bg-[#080E1D] border-y border-white/[0.04] relative overflow-hidden">
      <div className="container-custom">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs uppercase tracking-widest text-slate-600 font-semibold mb-8"
        >
          Trusted by innovative teams
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {clientLogos.map((logo, i) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-2.5 text-slate-500 hover:text-slate-300 transition-colors cursor-default group"
            >
              <div className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-[10px] font-black text-slate-400 group-hover:border-white/[0.15] transition-colors">
                {logo.abbr}
              </div>
              <span className="font-semibold text-sm tracking-tight">{logo.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
