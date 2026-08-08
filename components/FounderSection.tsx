'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import SectionHeading from './SectionHeading';

export default function FounderSection() {
  return (
    <section className="section-padding bg-[#050B18] relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[350px] h-[350px] bg-purple-600/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-violet-600/5 rounded-full blur-[90px]" />

      <div className="container-custom relative">
        <div className="text-center mb-14">
          <SectionHeading
            badge="Who We Are"
            title="Built by Developers. Driven by Products."
            highlight="Driven by Products."
            subtitle="NextGenWebWorks is a software development agency focused on helping businesses and startups turn ideas into production-ready digital products. We build modern websites, web applications, SaaS platforms, AI solutions, e-commerce experiences and custom software tailored to real business needs."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          <AnimatedSection variant="slideLeft">
            <div className="glass-card p-7 sm:p-8 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[50px]" />
              <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-5">
                  <MessageCircle size={20} className="text-purple-400" />
                </div>
                <p className="font-display font-bold text-xl sm:text-2xl text-white mb-3 leading-snug">
                  Direct communication. Practical solutions. Real delivery.
                </p>
                <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                  We work closely with our clients throughout the project, from understanding the
                  initial requirement to building, launching and improving the final product.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection variant="slideRight" delay={0.1}>
            <div className="glass-card p-8 sm:p-10 h-full relative overflow-hidden text-center flex flex-col items-center justify-center">
              <div className="absolute top-0 left-0 w-40 h-40 bg-violet-500/10 rounded-full blur-[60px]" />
              <div className="relative flex flex-col items-center">
                <div className="relative mb-6">
                  <div className="w-28 h-28 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-violet-600 shadow-lg shadow-purple-500/20 ring-4 ring-white/[0.06] relative">
                    <Image
                      src="/harsh.png"
                      alt="Harsh Raj, Co-Founder of NextGenWebWorks"
                      fill
                      sizes="112px"
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#0A1628] border border-white/[0.08] flex items-center justify-center">
                    <Sparkles size={14} className="text-purple-400" />
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl text-white mb-1">Harsh Raj</h3>
                <p className="text-purple-400 text-sm font-semibold uppercase tracking-wide mb-5">
                  Co-Founder / Business &amp; Technology
                </p>
                <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                  Harsh Raj works across business strategy, technology and project delivery,
                  helping clients turn ideas and requirements into practical digital products.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 lg:mt-10 glass-card p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <p className="font-display font-bold text-2xl text-white text-center sm:text-left">
            Have a project in mind?
          </p>
          <Link href="/start-project" className="btn-primary shrink-0 px-8 group">
            Let&apos;s build it together
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
