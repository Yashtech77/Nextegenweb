import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import CTASection from '@/components/CTASection';
import SectionHeading from '@/components/SectionHeading';
import ServiceCard from '@/components/ServiceCard';
import AnimatedSection from '@/components/AnimatedSection';
import { services } from '@/lib/data';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Services | NextGenWebWorks',
  description:
    'Explore our full range of software development services — web development, mobile apps, SaaS products, MVP development, UI/UX design, and more. Built for startups and growing businesses.',
  openGraph: {
    title: 'Software Development Services | NextGenWebWorks',
    description:
      'Custom web apps, mobile apps, SaaS products, and MVP development for startups and businesses. Enterprise-quality, startup-friendly.',
  },
};

const processHighlights = [
  'Free initial consultation',
  'Detailed project scoping',
  'Weekly progress updates',
  'Post-launch support included',
  'Scalable architecture by default',
  'NDA available on request',
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        badge="Our Services"
        title="Everything You Need to"
        highlight="Ship Great Software"
        subtitle="From early-stage MVPs to complex enterprise platforms, we provide end-to-end software development services with exceptional design and engineering quality."
        breadcrumb={[{ label: 'Services', href: '/services' }]}
      />

      {/* All Services */}
      <section className="section-padding bg-[#050B18]">
        <div className="container-custom">
          <div className="text-center mb-14">
            <SectionHeading
              badge="What We Offer"
              title="Complete"
              highlight="Software Services"
              subtitle="Whether you need a single feature or a full product, we have the expertise to deliver."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} variant="full" />
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="section-padding bg-[#080E1D]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection variant="slideLeft">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-widest mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                  Our Commitment
                </span>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-white leading-tight mb-5">
                  Every engagement includes{' '}
                  <span className="gradient-text">these guarantees</span>
                </h2>
                <p className="text-slate-400 leading-relaxed mb-8">
                  We don&apos;t just write code — we partner with you on your product journey.
                  That means going beyond the brief, thinking about your users, and building
                  things that genuinely move your business forward.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {processHighlights.map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-slate-300 text-sm">
                      <CheckCircle size={15} className="text-emerald-400 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Link href="/contact" className="btn-primary">
                    Start a Project
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection variant="slideRight">
              <div className="glass-card p-8">
                <h3 className="font-display font-semibold text-xl text-white mb-6">
                  Technology We Excel At
                </h3>
                <div className="space-y-5">
                  {[
                    {
                      category: 'Frontend',
                      techs: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
                      color: '#cb6de8',
                    },
                    {
                      category: 'Backend',
                      techs: ['Node.js', 'Python', 'tRPC', 'GraphQL', 'REST APIs'],
                      color: '#8b5cf6',
                    },
                    {
                      category: 'Mobile',
                      techs: ['React Native', 'Expo', 'iOS', 'Android'],
                      color: '#06b6d4',
                    },
                    {
                      category: 'Database',
                      techs: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma', 'Supabase'],
                      color: '#10b981',
                    },
                    {
                      category: 'Infrastructure',
                      techs: ['Vercel', 'AWS', 'Docker', 'GitHub Actions', 'Cloudflare'],
                      color: '#f59e0b',
                    },
                  ].map((stack) => (
                    <div key={stack.category}>
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        {stack.category}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {stack.techs.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 text-xs rounded-lg font-medium"
                            style={{
                              background: `${stack.color}15`,
                              border: `1px solid ${stack.color}30`,
                              color: stack.color,
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="section-padding bg-[#050B18]">
        <div className="container-custom">
          <div className="text-center mb-14">
            <SectionHeading
              badge="Flexible Engagement"
              title="How We Work"
              highlight="With You"
              subtitle="We adapt to your needs. Whether you want a fixed-scope project or an ongoing development partnership."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Project-Based',
                description: 'Perfect for well-defined projects with a clear scope and timeline.',
                features: [
                  'Fixed price & timeline',
                  'Detailed project spec',
                  'Weekly milestones',
                  '30 days post-launch support',
                  'Full source code ownership',
                ],
                cta: 'Start a Project',
                gradient: 'from-purple-500/10 to-cyan-500/10',
                border: 'border-purple-500/20',
              },
              {
                name: 'Dedicated Team',
                description: 'Extend your team with senior engineers and designers on a monthly basis.',
                features: [
                  'Full-time dedicated team',
                  'Daily standups & updates',
                  'Sprint-based delivery',
                  'Scale up/down as needed',
                  'Product roadmap support',
                ],
                cta: 'Build Your Team',
                gradient: 'from-violet-500/10 to-purple-500/10',
                border: 'border-violet-500/20',
                featured: true,
              },
              {
                name: 'MVP Sprint',
                description: 'Go from idea to live product in 6-8 weeks. Fast, focused, investor-ready.',
                features: [
                  '6-8 week delivery',
                  'Core feature set',
                  'Production deployment',
                  'Investor demo ready',
                  'Onboarding & handoff',
                ],
                cta: 'Launch Your MVP',
                gradient: 'from-emerald-500/10 to-teal-500/10',
                border: 'border-emerald-500/20',
              },
            ].map((tier, i) => (
              <AnimatedSection key={tier.name} delay={i * 0.1}>
                <div
                  className={`glass-card p-7 relative flex flex-col h-full transition-all duration-300 hover:border-white/20 ${tier.featured ? 'border-violet-500/30 ring-1 ring-violet-500/20' : ''}`}
                >
                  {tier.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} rounded-2xl`} />

                  <div className="relative flex flex-col flex-1">
                    <h3 className="font-display font-bold text-xl text-white mb-2">{tier.name}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">{tier.description}</p>

                    <ul className="space-y-3 flex-1 mb-8">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2.5 text-sm text-slate-300">
                          <CheckCircle size={14} className="text-emerald-400 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link href="/contact" className={tier.featured ? 'btn-primary' : 'btn-secondary'}>
                      {tier.cta}
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <div className="text-center mt-10 text-slate-500 text-sm">
            All engagements include code quality reviews, documentation, and post-launch support.{' '}
            <Link href="/contact" className="text-purple-400 hover:text-purple-300 transition-colors">
              Talk to us about custom arrangements →
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Start Building?"
        subtitle="Book a free consultation. We'll learn about your project and show you exactly how we'd approach it — no commitment needed."
        primaryCta="Book Free Consultation"
        secondaryCta="View Our Portfolio"
        secondaryHref="/portfolio"
      />
    </>
  );
}
