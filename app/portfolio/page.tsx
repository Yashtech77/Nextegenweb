import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import CTASection from '@/components/CTASection';
import PortfolioGrid from '@/components/PortfolioGrid';

export const metadata: Metadata = {
  title: 'Portfolio | NextGenWebWorks',
  description:
    'Explore our portfolio of web apps, mobile apps, SaaS products, and startup MVPs. Real products built for real companies — see what we\'ve shipped.',
  openGraph: {
    title: 'Our Work & Portfolio | NextGenWebWorks',
    description:
      'Browse our portfolio of digital products — healthcare SaaS, fintech dashboards, e-commerce platforms, and more.',
  },
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        badge="Our Portfolio"
        title="Products We've"
        highlight="Proudly Shipped"
        subtitle="Every project here represents a real challenge solved and a business moved forward. These aren't concepts — they're live products used by real people."
        breadcrumb={[{ label: 'Portfolio', href: '/portfolio' }]}
      />

      <PortfolioGrid />

      <CTASection
        title="Your Product Could Be Next"
        subtitle="Ready to build something that makes this list? Let's talk about your project and see how we can help."
        primaryCta="Start Your Project"
        secondaryCta="Learn About Our Services"
        secondaryHref="/services"
      />
    </>
  );
}
