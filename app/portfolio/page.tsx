import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import CTASection from '@/components/CTASection';
import PortfolioGrid from '@/components/PortfolioGrid';

export const metadata: Metadata = {
  title: 'Selected Work | NextGenWebWorks',
  description:
    'A selection of real websites designed and developed by NextGenWebWorks for businesses and organizations.',
  openGraph: {
    title: 'Selected Work | NextGenWebWorks',
    description:
      'Websites we\'ve actually built for real businesses and organizations.',
  },
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        badge="Selected Work"
        title="Websites We've Built"
        highlight="Built"
        subtitle="A selection of real digital projects designed and developed for businesses and organizations."
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
