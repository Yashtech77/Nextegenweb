'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { type Project } from '@/lib/data';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card overflow-hidden group hover:border-purple-500/20 transition-all duration-300 hover:-translate-y-1"
    >
      <a
        href={project.siteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        aria-label={`View ${project.title} live website`}
      >
        <div className="relative overflow-hidden border-b border-white/[0.08] bg-[#09111f]">
          <div className="flex items-center gap-2 border-b border-white/[0.08] bg-white/[0.04] px-4 py-3">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#28c840]" />
            <span className="ml-2 min-w-0 flex-1 truncate rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-slate-300">
              {project.siteUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
            </span>
            <ExternalLink
              size={14}
              className="shrink-0 text-slate-500 transition-colors group-hover:text-white"
            />
          </div>

          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={project.previewImage}
              alt={project.previewAlt}
              fill
              sizes="(min-width: 1280px) 45vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover object-top transition duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050B18]/70 via-transparent to-transparent" />
          </div>
        </div>
      </a>

      <div className="p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display font-bold text-2xl text-white transition-colors group-hover:text-purple-300">
              {project.title}
            </h3>
            <p
              className="mt-2 text-sm font-medium"
              style={{ color: project.accentColor }}
            >
              {project.category}
            </p>
          </div>
          <ArrowUpRight
            size={18}
            className="mt-1 shrink-0 text-slate-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-purple-400"
          />
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-400">{project.description}</p>

        <a
          href={project.siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-purple-300"
        >
          View Live Website
          <ArrowUpRight size={16} />
        </a>
      </div>
    </motion.article>
  );
}
