import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

export const siteConfig = {
  name: 'NextGenWebWorks',
  url: 'https://nextgenwebworks.com',
  description:
    'Premium software development agency building web apps, mobile apps, SaaS products, and startup MVPs.',
  email: 'hello@nextgenwebworks.com',
  phone: '+1 (555) 000-0000',
  location: 'San Francisco, CA (Remote-First)',
  twitter: '@nextgenwebworks',
  linkedin: 'nextgenwebworks',
  github: 'nextgenwebworks',
};