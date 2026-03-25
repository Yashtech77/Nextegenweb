'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/lib/data';
import ProjectCard from './ProjectCard';

const categories = ['All', 'SaaS', 'Fintech', 'Healthcare', 'E-commerce', 'Education', 'Mobile App'];

export default function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="section-padding bg-[#050B18]">
      <div className="container-custom">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-2 justify-center mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.07]'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            No projects in this category yet. More coming soon!
          </div>
        )}

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 glass-card p-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center"
        >
          {[
            { label: 'Projects Delivered', value: '15' },
            { label: 'Industries Served', value: '10+' },
            { label: 'Countries', value: '15+' },
            { label: 'Avg. Client Rating', value: '5.0 ⭐' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-display font-bold text-2xl gradient-text mb-1">{stat.value}</div>
              <div className="text-slate-500 text-xs">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
