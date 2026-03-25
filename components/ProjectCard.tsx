'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { type Project } from '@/lib/data';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card overflow-hidden group hover:border-purple-500/20 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Project Image / Gradient placeholder */}
      <div
        className="relative h-52 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
        }}
      >
        {/* Abstract decoration */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="w-32 h-32 border-2 border-white rounded-full" />
          <div className="absolute w-20 h-20 border-2 border-white rounded-full" />
          <div className="absolute w-8 h-8 border-2 border-white rounded-full" />
        </div>
        <div className="absolute inset-0">
          <div className="absolute top-4 left-4 w-12 h-1.5 bg-white/20 rounded-full" />
          <div className="absolute top-8 left-4 w-20 h-1.5 bg-white/10 rounded-full" />
          <div className="absolute bottom-8 right-4 w-16 h-16 bg-white/10 rounded-2xl" />
          <div className="absolute bottom-14 right-8 w-8 h-8 bg-white/10 rounded-lg" />
        </div>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-medium text-sm backdrop-blur-sm">
            <ExternalLink size={15} />
            View Project
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute top-4 right-4">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold text-white"
            style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}
          >
            {project.category}
          </span>
        </div>

        {/* Year */}
        <div className="absolute bottom-4 left-4">
          <span
            className="px-2 py-0.5 rounded-md text-xs text-white/60"
            style={{ background: 'rgba(0,0,0,0.3)' }}
          >
            {project.year}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-display font-bold text-xl text-white group-hover:text-purple-300 transition-colors">
            {project.title}
          </h3>
          <ArrowUpRight
            size={18}
            className="text-slate-500 group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-0.5"
          />
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-5">{project.description}</p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs rounded-lg font-medium"
              style={{
                background: `${project.accentColor}15`,
                border: `1px solid ${project.accentColor}30`,
                color: project.accentColor,
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
