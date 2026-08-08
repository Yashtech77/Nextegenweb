export interface NavLink {
  href: string;
  label: string;
}

export interface FocusArea {
  iconName: string;
  title: string;
  description: string;
}

export interface Service {
  id: string;
  iconName: string;
  title: string;
  shortDesc: string;
  description: string;
  benefits: string[];
  forWho: string;
  gradient: string;
  ctaLabel: string;
  emphasis?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  siteUrl: string;
  previewImage: string;
  previewAlt: string;
  accentColor: string;
  featured: boolean;
}

export const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Work' },
  { href: '/about#process', label: 'Process' },
  { href: '/contact', label: 'Contact' },
];

export const focusAreas: FocusArea[] = [
  {
    iconName: 'Target',
    title: 'Real Business Problems',
    description: 'We build technology around actual business requirements.',
  },
  {
    iconName: 'Layers',
    title: 'Modern Digital Products',
    description: 'From websites and web apps to SaaS and AI-powered solutions.',
  },
  {
    iconName: 'HeartHandshake',
    title: 'Direct Collaboration',
    description: 'Work directly with the people responsible for building your product.',
  },
  {
    iconName: 'Shield',
    title: 'Built to Scale',
    description: 'Clean, maintainable solutions designed with future growth in mind.',
  },
];

export const services: Service[] = [
  {
    id: 'web-development',
    iconName: 'Monitor',
    title: 'Websites & Web Apps',
    shortDesc: 'Modern business websites, dashboards, portals and custom web applications built for performance, usability and growth.',
    description: 'Modern business websites, dashboards, portals and custom web applications built for performance, usability and growth.',
    benefits: ['Business websites', 'Custom web applications', 'Admin dashboards', 'Customer portals', 'Internal business tools'],
    forWho: 'Growing Businesses & Startups',
    gradient: 'from-purple-500 to-cyan-500',
    ctaLabel: 'Explore Web Development',
  },
  {
    id: 'saas-development',
    iconName: 'Cloud',
    title: 'SaaS Products',
    shortDesc: 'Scalable software platforms with authentication, subscriptions, user management, permissions and powerful admin systems.',
    description: 'Scalable software platforms with authentication, subscriptions, user management, permissions and powerful admin systems.',
    benefits: ['Multi-tenant SaaS', 'Subscription platforms', 'RBAC systems', 'Admin panels', 'Document management', 'Business platforms'],
    forWho: 'SaaS Founders & Entrepreneurs',
    gradient: 'from-emerald-500 to-teal-500',
    ctaLabel: 'Build a SaaS Product',
  },
  {
    id: 'ai-automation',
    iconName: 'Bot',
    title: 'AI & Automation',
    shortDesc: 'AI-powered products and automated workflows that help businesses reduce manual work and create better customer experiences.',
    description: 'AI-powered products and automated workflows that help businesses reduce manual work and create better customer experiences.',
    benefits: ['AI assistants', 'AI chatbots', 'Voice AI agents', 'AI-powered applications', 'Business automation', 'AI integrations', 'Intelligent document systems'],
    forWho: 'Businesses Ready to Automate',
    gradient: 'from-fuchsia-500 to-purple-600',
    ctaLabel: 'Build an AI Solution',
    emphasis: true,
  },
  {
    id: 'ecommerce',
    iconName: 'ShoppingCart',
    title: 'E-commerce',
    shortDesc: 'Custom e-commerce experiences designed to help businesses showcase products, manage orders and grow online.',
    description: 'Custom e-commerce experiences designed to help businesses showcase products, manage orders and grow online.',
    benefits: ['Custom online stores', 'Product management', 'Payment integration', 'Order management', 'Customer accounts', 'Admin dashboards'],
    forWho: 'Retail & Direct-to-Consumer Brands',
    gradient: 'from-orange-500 to-amber-500',
    ctaLabel: 'Build an E-commerce Platform',
  },
  {
    id: 'mobile-development',
    iconName: 'Smartphone',
    title: 'Mobile Apps',
    shortDesc: 'Modern mobile applications designed to give customers and teams a seamless experience across devices.',
    description: 'Modern mobile applications designed to give customers and teams a seamless experience across devices.',
    benefits: ['Customer applications', 'Business applications', 'Cross-platform apps', 'Mobile dashboards', 'API-connected applications'],
    forWho: 'Startups & Product Teams',
    gradient: 'from-violet-500 to-purple-600',
    ctaLabel: 'Build a Mobile App',
  },
  {
    id: 'ui-ux-design',
    iconName: 'Palette',
    title: 'UI/UX & Product Design',
    shortDesc: 'From Figma concepts to production-ready interfaces, we design digital experiences that are clear, intuitive and built around users.',
    description: 'From Figma concepts to production-ready interfaces, we design digital experiences that are clear, intuitive and built around users.',
    benefits: ['UI/UX design', 'Product design', 'Design systems', 'Figma prototypes', 'Dashboard design', 'Responsive interfaces'],
    forWho: 'Product Teams & Startups',
    gradient: 'from-pink-500 to-rose-500',
    ctaLabel: 'Design Your Product',
  },
];

export const projects: Project[] = [
  {
    id: 'pinnacle-finance-advisors',
    title: 'Pinnacle Finance Advisors',
    description:
      'A polished website for a financial advisory firm, built to present wealth management and financial planning services with clarity, trust, and a straightforward path to connect.',
    category: 'Financial Services',
    siteUrl: 'https://www.pinnaclefinanceadvisors.com/',
    previewImage: '/pinnacle-finance-advisors-preview.png',
    previewAlt: 'Homepage preview of the Pinnacle Finance Advisors website',
    accentColor: '#67d5d1',
    featured: true,
  },
  {
    id: 'gurbaani-living',
    title: 'Gurbaani Living',
    description:
      'A premium PG accommodation website that showcases locations, amenities, and room options for students and working professionals, with clear calls to book a visit or explore rooms.',
    category: 'PG Accommodation',
    siteUrl: 'https://gurbaaniliving.com/',
    previewImage: '/gurbaani-living-preview.png',
    previewAlt: 'Homepage preview of the Gurbaani Living website',
    accentColor: '#73dfcf',
    featured: true,
  },
];

export const whyChooseUs = [
  {
    iconName: 'Target',
    title: 'Startup-First Mindset',
    description: 'We think like founders, not just developers. Every decision is made with your product growth and business outcomes in mind.',
  },
  {
    iconName: 'Zap',
    title: 'Fast, Reliable Delivery',
    description: 'We ship MVPs in 6–8 weeks and full products on schedule. No surprises, no delays. Your runway is precious — we respect it.',
  },
  {
    iconName: 'Shield',
    title: 'Scalable Architecture',
    description: 'We build with scale in mind from day one. Our architecture handles 10 users today and 10 million users tomorrow.',
  },
  {
    iconName: 'Code2',
    title: 'Clean, Maintainable Code',
    description: 'TypeScript, thorough testing, and clear documentation. Your codebase will be a pleasure to work with, now and in five years.',
  },
  {
    iconName: 'Sparkles',
    title: 'Premium UI/UX',
    description: 'We combine engineering excellence with world-class design. Every pixel is intentional. Your users will notice the difference.',
  },
  {
    iconName: 'HeartHandshake',
    title: 'Long-Term Partnership',
    description: 'We don\'t disappear after launch. We offer ongoing support, maintenance, and scaling — growing with your product.',
  },
];

export const processSteps = [
  {
    step: '01',
    title: 'Discovery & Strategy',
    description: 'We start with a deep-dive into your product goals, user needs, and technical requirements. This shapes everything.',
  },
  {
    step: '02',
    title: 'Design & Architecture',
    description: 'Our designers craft the UI/UX while our architects design the system — ensuring every detail is built to last.',
  },
  {
    step: '03',
    title: 'Build & Iterate',
    description: 'We develop in sprints with weekly demos. You see real progress every week, not just at the end.',
  },
  {
    step: '04',
    title: 'Launch & Scale',
    description: 'We deploy, monitor, and optimize your product. Then we help you scale — users, performance, and features.',
  },
];
