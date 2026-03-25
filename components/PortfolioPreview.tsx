import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { projects } from '@/lib/data';
import SectionHeading from './SectionHeading';
import ProjectCard from './ProjectCard';

export default function PortfolioPreview() {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <section className="section-padding bg-[#050B18] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="container-custom">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <SectionHeading
            badge="Our Work"
            title="Products We've"
            highlight="Shipped"
            subtitle="A selection of digital products we've built for startups and growing companies."
            align="left"
          />
          <Link
            href="/portfolio"
            className="hidden lg:flex items-center gap-2 text-purple-400 font-medium hover:text-purple-300 transition-colors shrink-0 group"
          >
            View All Projects
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <div className="mt-10 text-center lg:hidden">
          <Link href="/portfolio" className="btn-secondary inline-flex">
            View All Projects
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
