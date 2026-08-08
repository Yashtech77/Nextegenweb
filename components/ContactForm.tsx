'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight, CheckCircle, Loader2, Send } from 'lucide-react';
import { budgetRanges, projectTypeOptions } from '@/lib/constants';
import { ProjectType } from '@prisma/client';

interface FormData {
  name: string;
  email: string;
  company: string;
  projectType: ProjectType;
  budget: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    projectType: ProjectType.WEB_APP,
    budget: budgetRanges[2],
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please tell us about your project';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Please provide more details (min. 20 characters)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    setErrorMessage(null);

    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: formData.name,
        email: formData.email,
        companyName: formData.company,
        projectTitle: `${projectTypeOptions.find((option) => option.value === formData.projectType)?.label ?? 'Software Project'} Inquiry`,
        projectType: formData.projectType,
        projectDescription: formData.message,
        coreFeaturesRequired: formData.message,
        preferredTechStack: '',
        deadline: '',
        budgetRange: formData.budget,
        referenceLink: '',
        additionalNotes: 'Submitted from the contact page quick inquiry form.',
        attachmentNames: [],
        attachmentUrls: [],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setStatus('error');
      setErrorMessage(data.error ?? 'Unable to submit your inquiry right now.');
      return;
    }

    setStatus('success');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'projectType' ? (value as ProjectType) : value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (status === 'success') {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-10 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10">
          <CheckCircle size={40} className="text-emerald-400" />
        </div>
        <h3 className="mb-3 font-display text-2xl font-bold text-white">Inquiry Submitted</h3>
        <p className="mx-auto mb-8 max-w-md leading-relaxed text-slate-400">
          Your project inquiry is now in our system. For a more detailed brief with file uploads, use the full intake workspace.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={() => {
              setStatus('idle');
              setFormData({
                name: '',
                email: '',
                company: '',
                projectType: ProjectType.WEB_APP,
                budget: budgetRanges[2],
                message: '',
              });
            }}
            className="btn-secondary"
          >
            Send Another Inquiry
          </button>
          <Link href="/start-project" className="btn-primary">
            Open Full Project Intake
            <ArrowRight size={16} />
          </Link>
        </div>
      </motion.div>
    );
  }

  const inputClass =
    'w-full rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder-slate-500 transition-all focus:border-purple-500/50 focus:bg-white/[0.06] focus:outline-none';
  const errorClass = 'mt-1.5 flex items-center gap-1 text-xs text-red-400';
  const labelClass = 'mb-1.5 block text-sm font-medium text-slate-300';

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="glass-card space-y-5 p-6 sm:p-8"
      noValidate
    >
      <div className="rounded-2xl border border-purple-500/20 bg-purple-500/10 p-4">
        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-300">Quick Inquiry</div>
        <p className="mt-2 text-sm text-slate-300">
          Need the full requirement workflow with file uploads, quotation, and payment tracking?{' '}
          <Link href="/start-project" className="font-medium text-white underline underline-offset-4">
            Start your project here
          </Link>
          .
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Your Name <span className="text-red-400">*</span>
          </label>
          <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Alex Johnson" className={`${inputClass} ${errors.name ? 'border-red-500/50' : ''}`} />
          {errors.name ? <p className={errorClass}><AlertCircle size={12} />{errors.name}</p> : null}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email Address <span className="text-red-400">*</span>
          </label>
          <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="alex@company.com" className={`${inputClass} ${errors.email ? 'border-red-500/50' : ''}`} />
          {errors.email ? <p className={errorClass}><AlertCircle size={12} />{errors.email}</p> : null}
        </div>
      </div>

      <div>
        <label htmlFor="company" className={labelClass}>Company / Startup</label>
        <input id="company" name="company" type="text" value={formData.company} onChange={handleChange} placeholder="Acme Inc. (optional)" className={inputClass} />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="projectType" className={labelClass}>Project Type</label>
          <select id="projectType" name="projectType" value={formData.projectType} onChange={handleChange} className={`${inputClass} cursor-pointer bg-[#0A1628]`}>
            {projectTypeOptions.map((type) => (
              <option key={type.value} value={type.value} className="bg-[#0A1628]">
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="budget" className={labelClass}>Estimated Budget</label>
          <select id="budget" name="budget" value={formData.budget} onChange={handleChange} className={`${inputClass} cursor-pointer bg-[#0A1628]`}>
            {budgetRanges.map((range) => (
              <option key={range} value={range} className="bg-[#0A1628]">
                {range}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Tell Us About Your Project <span className="text-red-400">*</span>
        </label>
        <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Describe your project, goals, timeline, or any questions you have..." rows={5} className={`${inputClass} resize-none ${errors.message ? 'border-red-500/50' : ''}`} />
        {errors.message ? <p className={errorClass}><AlertCircle size={12} />{errors.message}</p> : null}
      </div>

      {errorMessage ? (
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {errorMessage}
        </div>
      ) : null}

      <button type="submit" disabled={status === 'loading'} className="btn-primary w-full justify-center">
        {status === 'loading' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        {status === 'loading' ? 'Submitting...' : 'Submit Quick Inquiry'}
      </button>
    </motion.form>
  );
}
