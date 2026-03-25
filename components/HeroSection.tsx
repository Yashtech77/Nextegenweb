'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Play, Star } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#050B18]">
      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full bg-purple-600/10 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, 15, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
          className="absolute top-[40%] left-[40%] w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[100px]"
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating dots — deterministic positions to avoid hydration mismatch */}
        {[
          { l: 8, t: 15, d: 4.2, del: 0.3 },
          { l: 20, t: 45, d: 6.1, del: 1.1 },
          { l: 35, t: 22, d: 5.3, del: 2.2 },
          { l: 50, t: 65, d: 4.8, del: 0.7 },
          { l: 62, t: 30, d: 7.0, del: 3.1 },
          { l: 75, t: 55, d: 5.6, del: 1.8 },
          { l: 88, t: 18, d: 4.4, del: 0.5 },
          { l: 15, t: 75, d: 6.5, del: 2.9 },
          { l: 43, t: 85, d: 5.1, del: 1.4 },
          { l: 68, t: 72, d: 4.9, del: 3.6 },
          { l: 92, t: 42, d: 6.8, del: 0.9 },
          { l: 28, t: 58, d: 5.7, del: 2.5 },
          { l: 55, t: 12, d: 4.3, del: 1.7 },
          { l: 80, t: 82, d: 7.2, del: 4.1 },
          { l: 12, t: 33, d: 5.9, del: 3.3 },
          { l: 47, t: 48, d: 4.6, del: 0.2 },
          { l: 72, t: 25, d: 6.3, del: 2.0 },
          { l: 36, t: 70, d: 5.4, del: 1.2 },
          { l: 85, t: 60, d: 4.7, del: 3.8 },
          { l: 58, t: 38, d: 6.0, del: 2.7 },
        ].map((dot, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: dot.d, repeat: Infinity, delay: dot.del, ease: 'easeInOut' }}
            className="absolute w-1 h-1 rounded-full bg-purple-400/40"
            style={{ left: `${dot.l}%`, top: `${dot.t}%` }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10 pt-28 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-8"
          >
            <Star size={12} className="fill-purple-400 text-purple-400" />
            Trusted by 20+ Innovative Startups
            <Star size={12} className="fill-purple-400 text-purple-400" />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-black text-4xl sm:text-5xl md:text-5xl lg:text-6xl text-white leading-[1.05] tracking-tight mb-8"
          >
            Building the{' '}
            <span className="relative inline-block">
              <span className="gradient-text">Next Generation</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 to-violet-500 rounded-full origin-left"
              />
            </span>{' '}
            <br className="hidden sm:block" />
            of Digital Products
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
          >
            We help startups and businesses build fast, scalable, and beautifully designed web
            and mobile applications. From MVPs to enterprise platforms — we ship products that win.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/contact" className="btn-primary text-base px-8 py-3.5 group">
              Get Started Free
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link href="/portfolio" className="btn-secondary text-base px-8 py-3.5 group">
              <Play size={16} className="text-purple-400 group-hover:scale-110 transition-transform" />
              View Our Work
            </Link>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {['SJ', 'MW', 'EC', 'DR', 'RK'].map((initials, i) => (
                  <div
                    key={initials}
                    className="w-8 h-8 rounded-full border-2 border-[#050B18] flex items-center justify-center text-[10px] font-bold text-white"
                    style={{
                      background: [
                        'linear-gradient(135deg, #059669, #0891b2)',
                        'linear-gradient(135deg, #cb6de8, #6366f1)',
                        'linear-gradient(135deg, #8b5cf6, #ec4899)',
                        'linear-gradient(135deg, #f59e0b, #ef4444)',
                        'linear-gradient(135deg, #06b6d4, #cb6de8)',
                      ][i],
                    }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <span>Join 20+ happy clients</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/10" />
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
              ))}
              <span>5.0 avg. rating</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/10" />
            <div>50+ projects shipped</div>
          </motion.div>
        </div>

        {/* Floating UI Cards */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative mt-20 max-w-4xl mx-auto"
        >
          {/* Main dashboard mockup */}
          <div className="glass-card p-1 shadow-2xl shadow-black/40">
            <div className="bg-[#0A1628] rounded-[14px] p-6 overflow-hidden">
              {/* Mockup header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                    <div className="w-3 h-3 rounded-full bg-green-400/80" />
                  </div>
                  <div className="px-4 py-1 rounded-lg bg-white/5 border border-white/[0.06] text-xs text-slate-500">
                    dashboard.nextgenwebworks.com
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-slate-500">Live</span>
                </div>
              </div>

              {/* Mockup content */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: 'Revenue', value: '$142K', trend: '+24%', color: 'from-purple-500 to-cyan-500' },
                  { label: 'Users', value: '8,420', trend: '+18%', color: 'from-violet-500 to-purple-600' },
                  { label: 'Uptime', value: '99.9%', trend: 'stable', color: 'from-emerald-500 to-teal-500' },
                ].map((card) => (
                  <div key={card.label} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                    <div className="text-xs text-slate-500 mb-1">{card.label}</div>
                    <div className="text-xl font-bold text-white mb-1">{card.value}</div>
                    <div className={`text-xs font-medium gradient-text bg-gradient-to-r ${card.color}`}
                      style={{
                        background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {card.trend}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart bars */}
              <div className="flex items-end gap-1.5 h-16 bg-white/[0.02] rounded-xl px-4 py-3 border border-white/[0.04]">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.5, delay: 1 + i * 0.05 }}
                    className="flex-1 rounded-sm origin-bottom"
                    style={{
                      height: `${h}%`,
                      background:
                        i === 11
                          ? 'linear-gradient(to top, #cb6de8, #8b5cf6)'
                          : 'rgba(255,255,255,0.08)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Floating notification card */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-6 -right-4 sm:right-4 glass-card px-4 py-3 flex items-center gap-3 shadow-xl"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-sm">
              ✓
            </div>
            <div>
              <div className="text-xs font-semibold text-white">New deployment</div>
              <div className="text-xs text-slate-400">v2.4.1 shipped successfully</div>
            </div>
          </motion.div>

          {/* Floating tech stack card */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -bottom-6 -left-4 sm:left-4 glass-card px-4 py-3 shadow-xl"
          >
            <div className="text-xs text-slate-400 mb-2">Tech Stack</div>
            <div className="flex items-center gap-2">
              {['Next.js', 'TypeScript', 'Tailwind', 'Postgres'].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-xs rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
