import {
  FileCategory,
  MilestoneStatus,
  PaymentType,
  ProjectStatus,
  ProjectType,
  Role,
  UpdateVisibility,
} from '@prisma/client';
import { z } from 'zod';

export const signUpSchema = z
  .object({
    name: z.string().min(2, 'Please enter your full name.'),
    email: z.string().email('Please enter a valid email address.'),
    companyName: z.string().optional(),
    password: z.string().min(8, 'Password must be at least 8 characters long.'),
    confirmPassword: z.string().min(8, 'Please confirm your password.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match.',
  });

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters long.'),
  expectedRole: z.nativeEnum(Role).optional(),
});

export const projectInquirySchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name.'),
  email: z.string().email('Please enter a valid email address.'),
  companyName: z.string().optional(),
  projectTitle: z.string().min(3, 'Project title is required.'),
  projectType: z.nativeEnum(ProjectType),
  projectDescription: z.string().min(40, 'Please describe the project in more detail.'),
  coreFeaturesRequired: z.string().min(15, 'List the key features you need.'),
  preferredTechStack: z.string().optional(),
  deadline: z
    .string()
    .optional()
    .refine((value) => !value || !Number.isNaN(Date.parse(value)), 'Please choose a valid date.'),
  budgetRange: z.string().min(2, 'Select a budget range.'),
  referenceLink: z
    .string()
    .optional()
    .refine((value) => !value || /^https?:\/\//i.test(value), 'Please enter a valid URL.'),
  additionalNotes: z.string().optional(),
  attachmentUrls: z.array(z.string()).default([]),
  attachmentNames: z.array(z.string()).default([]),
});

export const quoteSchema = z.object({
  quotationAmount: z.coerce.number().positive('Quotation amount must be greater than zero.'),
  advanceAmount: z.coerce.number().min(0, 'Advance amount cannot be negative.'),
  remainingAmount: z.coerce.number().min(0, 'Remaining amount cannot be negative.'),
  status: z.nativeEnum(ProjectStatus).default(ProjectStatus.QUOTED),
});

export const milestoneSchema = z.object({
  title: z.string().min(3, 'Milestone title is required.'),
  description: z.string().min(8, 'Please add a short milestone description.'),
  amount: z.coerce.number().positive('Milestone amount must be greater than zero.'),
  status: z.nativeEnum(MilestoneStatus).default(MilestoneStatus.PENDING),
  dueDate: z
    .string()
    .optional()
    .refine((value) => !value || !Number.isNaN(Date.parse(value)), 'Please choose a valid date.'),
});

export const projectUpdateSchema = z.object({
  title: z.string().min(3, 'Update title is required.'),
  message: z.string().min(10, 'Please add a more helpful project update.'),
  status: z.nativeEnum(ProjectStatus).optional(),
  visibility: z.nativeEnum(UpdateVisibility).default(UpdateVisibility.CLIENT),
});

export const projectStatusSchema = z.object({
  status: z.nativeEnum(ProjectStatus),
});

export const createPaymentOrderSchema = z.object({
  projectId: z.string().min(1),
  paymentType: z.nativeEnum(PaymentType),
  milestoneId: z.string().optional(),
});

export const verifyPaymentSchema = z.object({
  paymentId: z.string().min(1),
  razorpayOrderId: z.string().min(1),
  razorpayPaymentId: z.string().min(1),
  razorpaySignature: z.string().min(1),
});

export const fileUploadMetadataSchema = z.object({
  projectId: z.string().min(1),
  category: z.nativeEnum(FileCategory).default(FileCategory.OTHER),
});
