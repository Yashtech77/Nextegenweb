import {
  FileCategory,
  MilestoneStatus,
  PaymentStatus,
  PaymentType,
  ProjectStatus,
  ProjectType,
  Role,
} from '@prisma/client';

export const projectTypeOptions: { value: ProjectType; label: string }[] = [
  { value: ProjectType.WEB_APP, label: 'Web App' },
  { value: ProjectType.MOBILE_APP, label: 'Mobile App' },
  { value: ProjectType.SAAS_PLATFORM, label: 'SaaS Platform' },
  { value: ProjectType.MVP, label: 'MVP' },
  { value: ProjectType.UI_UX_DESIGN, label: 'UI/UX Design' },
  { value: ProjectType.CUSTOM_SOFTWARE, label: 'Custom Software' },
];

export const projectStatusMeta: Record<
  ProjectStatus,
  { label: string; tone: string; description: string }
> = {
  INQUIRY_RECEIVED: {
    label: 'Inquiry Received',
    tone: 'bg-sky-500/10 text-sky-300 border-sky-500/20',
    description: 'We have received the request and logged it into our pipeline.',
  },
  UNDER_REVIEW: {
    label: 'Under Review',
    tone: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
    description: 'The team is reviewing scope, feasibility, and delivery expectations.',
  },
  QUOTED: {
    label: 'Quoted',
    tone: 'bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20',
    description: 'A quotation is ready for client approval.',
  },
  ADVANCE_PENDING: {
    label: 'Advance Pending',
    tone: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    description: 'Advance payment is required before work begins.',
  },
  IN_PROGRESS: {
    label: 'In Progress',
    tone: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    description: 'The project is actively being designed, built, or tested.',
  },
  MILESTONE_PENDING: {
    label: 'Milestone Pending',
    tone: 'bg-orange-500/10 text-orange-300 border-orange-500/20',
    description: 'A milestone approval or milestone payment is pending.',
  },
  REVIEW: {
    label: 'In Review',
    tone: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
    description: 'The latest delivery is awaiting review or feedback.',
  },
  COMPLETED: {
    label: 'Completed',
    tone: 'bg-green-500/10 text-green-300 border-green-500/20',
    description: 'The work is complete and ready for final payment or delivery.',
  },
  FINAL_PAYMENT_PENDING: {
    label: 'Final Payment Pending',
    tone: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
    description: 'Final payment is pending before closing the engagement.',
  },
  DELIVERED: {
    label: 'Delivered',
    tone: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
    description: 'Final assets and handoff have been delivered.',
  },
  REJECTED: {
    label: 'Rejected',
    tone: 'bg-slate-500/10 text-slate-300 border-slate-500/20',
    description: 'The inquiry was declined or closed without moving forward.',
  },
};

export const paymentTypeLabels: Record<PaymentType, string> = {
  ADVANCE: 'Advance Payment',
  MILESTONE: 'Milestone Payment',
  FINAL: 'Final Payment',
};

export const paymentStatusLabels: Record<PaymentStatus, string> = {
  PENDING: 'Pending',
  CREATED: 'Awaiting Payment',
  PAID: 'Paid',
  FAILED: 'Failed',
  REFUNDED: 'Refunded',
};

export const milestoneStatusLabels: Record<MilestoneStatus, string> = {
  PENDING: 'Pending',
  READY: 'Ready',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  BLOCKED: 'Blocked',
};

export const roleLabels: Record<Role, string> = {
  CLIENT: 'Client',
  ADMIN: 'Admin',
};

export const fileCategoryLabels: Record<FileCategory, string> = {
  REQUIREMENT: 'Requirement Doc',
  REFERENCE: 'Reference File',
  DELIVERABLE: 'Deliverable',
  REVISION: 'Revision File',
  OTHER: 'Other File',
};

export const budgetRanges = [
  'Below ₹50,000',
  '₹50,000 - ₹1,00,000',
  '₹1,00,000 - ₹2,00,000',
  '₹2,00,000 - ₹5,00,000',
  '₹5,00,000+',
  'Need guidance',
];

export const dashboardNavigation = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/start-project', label: 'New Project' },
];

export const adminNavigation = [
  { href: '/admin', label: 'Operations' },
  { href: '/start-project', label: 'Public Intake' },
];
