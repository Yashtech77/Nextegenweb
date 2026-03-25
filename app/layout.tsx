import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nextgenwebworks.com'),
  title: {
    default: 'NextGenWebWorks | Premium Web & Mobile App Development Agency',
    template: '%s | NextGenWebWorks',
  },
  description:
    'NextGenWebWorks is a premium software development agency helping startups and businesses build web apps, mobile apps, SaaS products, and startup MVPs with exceptional design and engineering.',
  keywords: [
    'web development agency',
    'mobile app development company',
    'startup app development',
    'SaaS product development',
    'custom software development',
    'MVP development agency',
    'UI UX design agency',
    'software development for startups',
    'React Next.js development',
    'product engineering',
  ],
  authors: [{ name: 'NextGenWebWorks' }],
  creator: 'NextGenWebWorks',
  publisher: 'NextGenWebWorks',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nextgenwebworks.com',
    siteName: 'NextGenWebWorks',
    title: 'NextGenWebWorks | Premium Web & Mobile App Development Agency',
    description:
      'We help startups and businesses build fast, scalable, and beautifully designed web and mobile applications.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NextGenWebWorks – Premium Software Development Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NextGenWebWorks | Premium Web & Mobile App Development Agency',
    description:
      'We help startups and businesses build fast, scalable, and beautifully designed web and mobile applications.',
    images: ['/og-image.png'],
    creator: '@nextgenwebworks',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/nextgenlogo.png',
    shortcut: '/nextgenlogo.png',
    apple: '/nextgenlogo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
