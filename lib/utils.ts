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

export function formatCurrency(value: number | string | null | undefined) {
  if (value === null || value === undefined) {
    return 'Not set';
  }

  const amount = typeof value === 'string' ? Number(value) : value;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(value: string | Date | null | undefined) {
  if (!value) {
    return 'Not specified';
  }

  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
  }).format(date);
}

export function formatDateTime(value: string | Date | null | undefined) {
  if (!value) {
    return 'Not available';
  }

  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

export const siteConfig = {
  name: 'NextGenWebWorks',
  url: 'https://nextgenwebworks.com',
  description:
    'Premium software development agency building web apps, mobile apps, SaaS products, and startup MVPs.',
  email: 'admin@nextgenwebwork.online',
  phone: '+91 00000 00000',
  location: 'Pune, Maharashtra (Remote-First)',
  twitter: '@nextgenwebworks',
  linkedin: 'nextgenwebworks',
  github: 'nextgenwebworks',
};
