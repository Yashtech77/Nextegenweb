import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import FocusSection from '@/components/FocusSection';
import ServicesPreview from '@/components/ServicesPreview';
import PortfolioPreview from '@/components/PortfolioPreview';
import WhyChooseUs from '@/components/WhyChooseUs';
import TrustSection from '@/components/TrustSection';
import FounderSection from '@/components/FounderSection';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'NextGenWebWorks | Websites, SaaS & AI Product Development',
  description:
    'NextGenWebWorks is a software development agency building websites, web applications, SaaS platforms, AI-powered solutions and e-commerce experiences for growing businesses.',
  openGraph: {
    title: 'NextGenWebWorks | Websites, SaaS & AI Product Development',
    description:
      'From idea to production, we help businesses turn requirements into modern, reliable digital products.',
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FocusSection />
      <ServicesPreview />
      <PortfolioPreview />
      <WhyChooseUs />
      <TrustSection />
      <FounderSection />
      <CTASection />
    </>
  );
}
