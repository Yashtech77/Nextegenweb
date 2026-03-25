import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { services } from '@/lib/data';
import SectionHeading from './SectionHeading';
import ServiceCard from './ServiceCard';

export default function ServicesPreview() {
  const previewServices = services.slice(0, 6);

  return (
    <section className="section-padding bg-[#050B18] relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="container-custom">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <SectionHeading
            badge="What We Build"
            title="Services That Drive"
            highlight="Real Results"
            subtitle="From rapid MVPs to enterprise platforms, we cover every stage of your product journey."
            align="left"
          />
          <Link
            href="/services"
            className="hidden lg:flex items-center gap-2 text-purple-400 font-medium hover:text-purple-300 transition-colors shrink-0 group"
          >
            View All Services
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {previewServices.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        <div className="mt-10 text-center lg:hidden">
          <Link href="/services" className="btn-secondary inline-flex">
            View All Services
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
