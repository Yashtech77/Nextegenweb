export interface NavLink {
  href: string;
  label: string;
}

export interface Stat {
  value: string;
  label: string;
  numericValue: number;
  suffix: string;
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
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  techStack: string[];
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
  featured: boolean;
  year: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  initials: string;
  avatarGradient: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
  gradient: string;
}

export const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
];

export const stats: Stat[] = [
  { value: '15', label: 'Projects Delivered', numericValue: 15, suffix: '' },
  { value: '10+', label: 'Happy Clients', numericValue: 10, suffix: '+' },
  { value: '1', label: 'Year Experience', numericValue: 1, suffix: '' },
  { value: '99.99%', label: 'Client Satisfaction', numericValue: 99, suffix: '%' },
];

export const services: Service[] = [
  {
    id: 'web-development',
    iconName: 'Monitor',
    title: 'Custom Web Development',
    shortDesc: 'Blazing-fast, scalable web apps built with modern frameworks and cloud-native architecture.',
    description: 'We engineer high-performance web applications using React, Next.js, and TypeScript — optimized for speed, SEO, and long-term scalability. Every line of code is written for production.',
    benefits: ['Next.js & React', 'SSR + SSG Ready', 'SEO Optimized', 'Lightning Fast'],
    forWho: 'Startups, SMBs & Enterprise',
    gradient: 'from-purple-500 to-cyan-500',
  },
  {
    id: 'mobile-development',
    iconName: 'Smartphone',
    title: 'Mobile App Development',
    shortDesc: 'Native and cross-platform mobile experiences for iOS and Android that users love.',
    description: 'From polished React Native apps to fully native iOS and Android builds, we craft mobile experiences that feel premium and perform flawlessly across all devices.',
    benefits: ['React Native', 'iOS & Android', 'Offline Support', 'Push Notifications'],
    forWho: 'Startups & Product Teams',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    id: 'saas-development',
    iconName: 'Cloud',
    title: 'SaaS Product Development',
    shortDesc: 'End-to-end SaaS platforms with subscriptions, billing, auth, and multi-tenancy built in.',
    description: 'We build full-stack SaaS products with everything you need: user authentication, subscription billing, dashboards, API integrations, and the infrastructure to scale from 0 to 100k users.',
    benefits: ['Multi-tenancy', 'Stripe Billing', 'Auth & RBAC', 'Scalable APIs'],
    forWho: 'SaaS Founders & Entrepreneurs',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'mvp-development',
    iconName: 'Zap',
    title: 'MVP Development',
    shortDesc: 'Ship your startup idea in weeks, not months. From concept to live product, fast.',
    description: 'Speed is your competitive edge. We specialize in rapid MVP development — helping you validate ideas, attract investors, and acquire early users before burning runway.',
    benefits: ['6-8 Week Delivery', 'Investor Ready', 'Validated Stack', 'Growth Ready'],
    forWho: 'Early-Stage Startups',
    gradient: 'from-orange-500 to-amber-500',
  },
  {
    id: 'ui-ux-design',
    iconName: 'Palette',
    title: 'UI/UX Design',
    shortDesc: 'Research-driven design systems that convert visitors, delight users, and drive retention.',
    description: 'Great software starts with great design. Our UI/UX team builds intuitive user flows, stunning interfaces, and design systems that make your product stand out in a crowded market.',
    benefits: ['User Research', 'Figma Prototypes', 'Design System', 'A/B Optimized'],
    forWho: 'Product Teams & Startups',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    id: 'product-engineering',
    iconName: 'Layers',
    title: 'Product Engineering',
    shortDesc: 'Full-lifecycle product engineering from architecture to deployment and scaling.',
    description: 'For teams that need a complete product partner. We handle architecture, backend, frontend, DevOps, and ongoing engineering — so you can focus on growth and customers.',
    benefits: ['Full-Stack', 'DevOps & CI/CD', 'API Design', 'Ongoing Support'],
    forWho: 'Growth-Stage Companies',
    gradient: 'from-cyan-500 to-purple-600',
  },
  {
    id: 'backend-development',
    iconName: 'Database',
    title: 'Backend & API Development',
    shortDesc: 'Rock-solid APIs, microservices, and database architecture built for scale.',
    description: 'We build RESTful and GraphQL APIs, microservices architectures, and data pipelines that can handle massive scale. PostgreSQL, Redis, and cloud-native — done right.',
    benefits: ['REST & GraphQL', 'Microservices', 'PostgreSQL & Redis', 'High Availability'],
    forWho: 'Tech Teams & Scale-ups',
    gradient: 'from-slate-400 to-slate-600',
  },
  {
    id: 'maintenance-scaling',
    iconName: 'Wrench',
    title: 'Maintenance & Scaling',
    shortDesc: 'Keep your product healthy, performant, and ready to handle whatever growth throws at it.',
    description: 'Launching is just the beginning. We provide ongoing engineering support, performance monitoring, security audits, and scaling strategies to keep your product running at its best.',
    benefits: ['24/7 Monitoring', 'Performance Audits', 'Security Reviews', 'Scaling Strategy'],
    forWho: 'Existing Product Owners',
    gradient: 'from-indigo-500 to-violet-500',
  },
];

export const projects: Project[] = [
  {
    id: 'healthtrack-pro',
    title: 'HealthTrack Pro',
    description: 'A comprehensive healthcare SaaS platform enabling clinics to manage patient records, appointments, billing, and telemedicine — all in one HIPAA-compliant dashboard.',
    category: 'Healthcare',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Stripe'],
    gradientFrom: '#059669',
    gradientTo: '#0891b2',
    accentColor: '#10b981',
    featured: true,
    year: '2024',
  },
  {
    id: 'finflow',
    title: 'FinFlow',
    description: 'A real-time fintech dashboard for financial advisors — featuring portfolio analytics, automated reporting, client management, and secure payment processing.',
    category: 'Fintech',
    techStack: ['React', 'Node.js', 'GraphQL', 'Redis', 'Plaid API'],
    gradientFrom: '#1d4ed8',
    gradientTo: '#4f46e5',
    accentColor: '#cb6de8',
    featured: true,
    year: '2024',
  },
  {
    id: 'shopsphere',
    title: 'ShopSphere',
    description: 'A headless e-commerce platform with AI-powered product recommendations, dynamic pricing, multi-vendor support, and a blazing-fast storefront built on Next.js.',
    category: 'E-commerce',
    techStack: ['Next.js', 'Tailwind', 'Sanity CMS', 'Stripe', 'Vercel'],
    gradientFrom: '#9333ea',
    gradientTo: '#ec4899',
    accentColor: '#a855f7',
    featured: true,
    year: '2023',
  },
  {
    id: 'learnpath',
    title: 'LearnPath',
    description: 'An EdTech startup MVP that connects learners with expert instructors through live sessions, structured learning paths, progress tracking, and community features.',
    category: 'Education',
    techStack: ['React Native', 'Firebase', 'WebRTC', 'Node.js', 'MongoDB'],
    gradientFrom: '#d97706',
    gradientTo: '#ea580c',
    accentColor: '#f59e0b',
    featured: false,
    year: '2023',
  },
  {
    id: 'taskmaster',
    title: 'TaskMaster',
    description: 'A project management SaaS for distributed engineering teams with sprint planning, time tracking, Slack integration, and AI-generated standup summaries.',
    category: 'SaaS',
    techStack: ['Next.js', 'tRPC', 'PlanetScale', 'Pusher', 'OpenAI'],
    gradientFrom: '#0369a1',
    gradientTo: '#0d9488',
    accentColor: '#06b6d4',
    featured: false,
    year: '2024',
  },
  {
    id: 'mobilebank',
    title: 'MobileBank',
    description: 'A mobile banking app MVP for a neobank startup — featuring biometric auth, real-time transactions, virtual cards, spending analytics, and peer-to-peer transfers.',
    category: 'Mobile App',
    techStack: ['React Native', 'TypeScript', 'Plaid', 'AWS Amplify', 'Redux'],
    gradientFrom: '#1e1b4b',
    gradientTo: '#312e81',
    accentColor: '#6366f1',
    featured: false,
    year: '2023',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'CTO',
    company: 'HealthTech Ventures',
    content: 'NextGenWebWorks transformed our vision into a world-class platform. They delivered our HIPAA-compliant SaaS ahead of schedule and the quality blew our entire team away. They feel like true product partners, not just a dev shop.',
    rating: 5,
    initials: 'SJ',
    avatarGradient: 'from-emerald-400 to-teal-600',
  },
  {
    id: '2',
    name: 'Marcus Williams',
    role: 'Founder & CEO',
    company: 'FinFlow',
    content: 'We went from idea to funded product in under 3 months. The team understood fintech nuances immediately — the architecture they built scales beautifully. We raised our seed round with the MVP they built.',
    rating: 5,
    initials: 'MW',
    avatarGradient: 'from-purple-400 to-indigo-600',
  },
  {
    id: '3',
    name: 'Emily Chen',
    role: 'VP of Product',
    company: 'ShopSphere',
    content: 'The UI/UX work alone was worth every penny. Our conversion rate jumped 40% after launch. They brought design thinking and engineering excellence that I haven\'t seen in other agencies. Highly recommend for any serious product.',
    rating: 5,
    initials: 'EC',
    avatarGradient: 'from-violet-400 to-purple-600',
  },
  {
    id: '4',
    name: 'David Rodriguez',
    role: 'Founder',
    company: 'LearnPath',
    content: 'As a non-technical founder, I needed a team I could trust completely. NextGenWebWorks was transparent, communicative, and delivered exactly what they promised. Our app launched to 500 users on day one.',
    rating: 5,
    initials: 'DR',
    avatarGradient: 'from-orange-400 to-red-500',
  },
  {
    id: '5',
    name: 'Rachel Kim',
    role: 'COO',
    company: 'TaskMaster SaaS',
    content: 'The speed and quality of their work is remarkable. They integrated AI features we didn\'t even know were possible on our timeline. Our enterprise clients are constantly complimenting the product\'s polish.',
    rating: 5,
    initials: 'RK',
    avatarGradient: 'from-cyan-400 to-purple-500',
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

export const clientLogos = [
  { name: 'HealthTech', abbr: 'HT' },
  { name: 'FinFlow', abbr: 'FF' },
  { name: 'ShopSphere', abbr: 'SS' },
  { name: 'LearnPath', abbr: 'LP' },
  { name: 'TaskMaster', abbr: 'TM' },
  { name: 'MobileBank', abbr: 'MB' },
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