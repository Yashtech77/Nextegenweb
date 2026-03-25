import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import ClientLogos from '@/components/ClientLogos';
import StatsSection from '@/components/StatsSection';
import ServicesPreview from '@/components/ServicesPreview';
import WhyChooseUs from '@/components/WhyChooseUs';
import PortfolioPreview from '@/components/PortfolioPreview';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'NextGenWebWorks | Premium Web & Mobile App Development Agency',
  description:
    'NextGenWebWorks is a premium software development agency helping startups and businesses build web apps, mobile apps, SaaS products, and MVPs. Ship faster with better engineering.',
  openGraph: {
    title: 'NextGenWebWorks | Premium Web & Mobile App Development Agency',
    description:
      'We help startups and businesses build fast, scalable, and beautifully designed web and mobile applications.',
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ClientLogos />
      <StatsSection />
      <ServicesPreview />
      <WhyChooseUs />
      <PortfolioPreview />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
