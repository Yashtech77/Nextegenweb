import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import CTASection from '@/components/CTASection';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import SectionHeading from '@/components/SectionHeading';
import { processSteps } from '@/lib/data';
import {
  Target,
  Eye,
  Rocket,
  Users,
  Globe,
  Award,
  CheckCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | NextGenWebWorks',
  description:
    'Learn about NextGenWebWorks — a premium software development agency founded to help startups and growing businesses build world-class digital products with exceptional speed and quality.',
  openGraph: {
    title: 'About NextGenWebWorks | Premium Software Development Agency',
    description:
      'We are a startup-first software agency that combines engineering excellence with modern design to build products that grow businesses.',
  },
};

const values = [
  {
    icon: Rocket,
    title: 'Velocity Without Compromise',
    description:
      'We move fast — but never at the expense of quality. Our streamlined process lets us ship MVPs in weeks while maintaining production-grade standards.',
  },
  {
    icon: Users,
    title: 'Genuine Partnership',
    description:
      "We're invested in your success, not just your invoice. We think like co-founders — challenging assumptions, suggesting improvements, and celebrating wins together.",
  },
  {
    icon: Award,
    title: 'Excellence as a Standard',
    description:
      'Good enough is never good enough. From code architecture to pixel-perfect design, we hold ourselves to the highest standards in everything we deliver.',
  },
  {
    icon: Globe,
    title: 'Remote-First, Results-Focused',
    description:
      'Our global team brings world-class talent to every project. Async-friendly communication, regular demos, and full transparency — no matter your timezone.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        badge="Our Story"
        title="Built to Ship"
        highlight="Ship"
        subtitle="We're a team of engineers and designers who started NextGenWebWorks because we believed there had to be a better way to build software for startups."
        breadcrumb={[{ label: 'About', href: '/about' }]}
      />

      {/* Story Section */}
      <section className="section-padding bg-[#050B18]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection variant="slideLeft">
              <div className="space-y-6">
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-white leading-tight">
                  We started as{' '}
                  <span className="gradient-text">frustrated engineers</span> who knew
                  software could be built better
                </h2>
                <p className="text-slate-400 leading-relaxed">
                  In 2021, our founders — a senior engineer and a product designer — had spent
                  years watching great startup ideas die because the software wasn&apos;t built
                  right. Too slow, too expensive, too focused on billable hours rather than actual
                  outcomes.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  So we built the agency we always wished existed. One that cares deeply about
                  the product, moves at startup speed, and treats every client as a long-term
                  partner. Three years and 50+ products later, we&apos;re proud of what
                  NextGenWebWorks has become.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  {['Founded in 2021', 'Remote-first team', '50+ products shipped', '20+ countries served'].map(
                    (badge) => (
                      <span
                        key={badge}
                        className="flex items-center gap-1.5 text-sm text-slate-300 bg-white/[0.04] border border-white/[0.08] px-3 py-1.5 rounded-lg"
                      >
                        <CheckCircle size={13} className="text-emerald-400" />
                        {badge}
                      </span>
                    )
                  )}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection variant="slideRight">
              {/* Visual card */}
              <div className="relative">
                <div className="glass-card p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-[60px]" />

                  <div className="grid grid-cols-2 gap-5 relative">
                    {[
                      { number: '15', label: 'Products Shipped', gradient: 'from-purple-400 to-cyan-400' },
                      { number: '10+', label: 'Happy Clients', gradient: 'from-violet-400 to-pink-400' },
                      { number: '1', label: 'Year Building', gradient: 'from-emerald-400 to-teal-400' },
                      { number: '99.99%', label: 'Satisfaction Rate', gradient: 'from-orange-400 to-amber-400' },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 text-center"
                      >
                        <div
                          className={`font-display font-black text-3xl bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}
                        >
                          {stat.number}
                        </div>
                        <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-5 -left-5 glass-card px-4 py-3 shadow-xl">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center text-white">
                      ⚡
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">Avg. MVP delivery</div>
                      <div className="text-xs text-slate-400">6-8 weeks</div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-[#080E1D]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedSection delay={0}>
              <div className="glass-card p-8 h-full relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-5">
                    <Target size={22} className="text-purple-400" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white mb-4">Our Mission</h3>
                  <p className="text-slate-400 leading-relaxed">
                    To democratize access to world-class software engineering. We believe every
                    startup deserves an engineering partner that combines Silicon Valley talent with
                    founder-friendly pricing and communication. We exist to make great software
                    accessible to every ambitious team.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="glass-card p-8 h-full relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-5">
                    <Eye size={22} className="text-violet-400" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white mb-4">Our Vision</h3>
                  <p className="text-slate-400 leading-relaxed">
                    A world where the quality of your software isn&apos;t limited by your budget or
                    location. We&apos;re building toward a future where NextGenWebWorks is the trusted
                    product partner behind the next generation of category-defining startups — the ones
                    that change how we work, live, and connect.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-[#050B18]">
        <div className="container-custom">
          <div className="text-center mb-14">
            <SectionHeading
              badge="How We Work"
              title="Values That Guide"
              highlight="Every Decision"
              subtitle="These aren't just words on a wall. They're the principles behind every line of code, every design choice, every client conversation."
            />
          </div>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <StaggerItem key={value.title}>
                  <div className="glass-card p-7 group hover:border-purple-500/20 transition-all duration-300 h-full">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500/15 to-violet-500/15 border border-white/[0.08] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                      <Icon size={20} className="text-purple-300" />
                    </div>
                    <h3 className="font-display font-semibold text-lg text-white mb-3">
                      {value.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{value.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="section-padding bg-[#080E1D]">
        <div className="container-custom">
          <div className="text-center mb-14">
            <SectionHeading
              badge="Our Process"
              title="How We Turn Ideas Into"
              highlight="Shipped Products"
              subtitle="A proven process refined across 50+ engagements. Transparent, collaborative, and laser-focused on outcomes."
            />
          </div>

          <div className="relative">
            {/* Connection line */}
            <div className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent hidden lg:block" />

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, i) => (
                <StaggerItem key={step.step}>
                  <div className="glass-card p-6 relative group hover:border-purple-500/20 transition-all duration-300">
                    {/* Step number */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center mb-5 shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/30 transition-shadow">
                      <span className="font-display font-black text-white text-lg">{step.step}</span>
                    </div>
                    <h3 className="font-display font-semibold text-lg text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Build with Us?"
        subtitle="Let's start with a free strategy call. We'll review your idea, assess the technical requirements, and give you an honest assessment — no strings attached."
        primaryCta="Schedule a Free Call"
        secondaryCta="View Our Work"
      />
    </>
  );
}
