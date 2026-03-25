'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const projectTypes = [
  'Web Application',
  'Mobile App',
  'SaaS Product',
  'MVP Development',
  'UI/UX Design',
  'Product Engineering',
  'Maintenance & Scaling',
  'Other',
];

const budgetRanges = [
  '₹999 – ₹2,000',
  '₹2,000 – ₹5,000',
  '₹5,000 – ₹10,000',
  '₹10,000 – ₹50,000',
  '₹50,000+',
  'Not sure yet',
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

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
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1800));
    setStatus('success');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-10 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-emerald-400" />
        </div>
        <h3 className="font-display font-bold text-2xl text-white mb-3">Message Received!</h3>
        <p className="text-slate-400 leading-relaxed mb-8 max-w-sm mx-auto">
          Thanks for reaching out. We review every message personally and will get back to you
          within 24 hours.
        </p>
        <button
          onClick={() => {
            setStatus('idle');
            setFormData({
              name: '',
              email: '',
              company: '',
              projectType: '',
              budget: '',
              message: '',
            });
          }}
          className="btn-secondary"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  const inputClass =
    'w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-3.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.06] transition-all';
  const errorClass = 'text-red-400 text-xs mt-1.5 flex items-center gap-1';
  const labelClass = 'block text-sm font-medium text-slate-300 mb-1.5';

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="glass-card p-6 sm:p-8 space-y-5"
      noValidate
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className={labelClass}>
            Your Name <span className="text-red-400">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Alex Johnson"
            className={`${inputClass} ${errors.name ? 'border-red-500/50' : ''}`}
          />
          {errors.name && (
            <p className={errorClass}>
              <AlertCircle size={12} />
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className={labelClass}>
            Email Address <span className="text-red-400">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="alex@company.com"
            className={`${inputClass} ${errors.email ? 'border-red-500/50' : ''}`}
          />
          {errors.email && (
            <p className={errorClass}>
              <AlertCircle size={12} />
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className={labelClass}>
          Company / Startup
        </label>
        <input
          id="company"
          name="company"
          type="text"
          value={formData.company}
          onChange={handleChange}
          placeholder="Acme Inc. (optional)"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Project Type */}
        <div>
          <label htmlFor="projectType" className={labelClass}>
            Project Type
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="" className="bg-[#0A1628]">Select project type</option>
            {projectTypes.map((type) => (
              <option key={type} value={type} className="bg-[#0A1628]">
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Budget */}
        <div>
          <label htmlFor="budget" className={labelClass}>
            Estimated Budget
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="" className="bg-[#0A1628]">Select budget range</option>
            {budgetRanges.map((range) => (
              <option key={range} value={range} className="bg-[#0A1628]">
                {range}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClass}>
          Tell Us About Your Project <span className="text-red-400">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Describe your project, goals, timeline, or any questions you have..."
          rows={5}
          className={`${inputClass} resize-none ${errors.message ? 'border-red-500/50' : ''}`}
        />
        {errors.message && (
          <p className={errorClass}>
            <AlertCircle size={12} />
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={18} />
            Send Message
          </>
        )}
      </button>

      <p className="text-xs text-slate-500 text-center">
        We respond within 24 hours · Your information is never shared
      </p>
    </motion.form>
  );
}
