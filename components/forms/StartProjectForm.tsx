'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle2, Loader2, UploadCloud } from 'lucide-react';
import { budgetRanges, projectTypeOptions } from '@/lib/constants';

const steps = [
  { title: 'Business Context', hint: 'Tell us who you are and what you are building.' },
  { title: 'Scope & Product', hint: 'Share feature expectations, stack preferences, and references.' },
  { title: 'Budget & Delivery', hint: 'Upload documents and confirm timeline details.' },
];

interface UploadedAsset {
  fileName: string;
  fileUrl: string;
}

export default function StartProjectForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedAsset[]>([]);

  const progress = useMemo(() => ((currentStep + 1) / steps.length) * 100, [currentStep]);

  async function handleUpload(fileList: FileList | null) {
    if (!fileList?.length) return;

    try {
      setUploading(true);
      setError(null);
      const uploads = await Promise.all(
        Array.from(fileList).map(async (file) => {
          const formData = new FormData();
          formData.append('file', file);
          const response = await fetch('/api/uploads', {
            method: 'POST',
            body: formData,
          });
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error ?? 'Upload failed.');
          }

          return data as UploadedAsset;
        })
      );

      setUploadedFiles((prev) => [...prev, ...uploads]);
    } catch (uploadError) {
      console.error(uploadError);
      setError(uploadError instanceof Error ? uploadError.message : 'Upload failed.');
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      setSubmitting(true);
      setError(null);
      setSuccess(null);

      const payload = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        companyName: formData.get('companyName'),
        projectTitle: formData.get('projectTitle'),
        projectType: formData.get('projectType'),
        projectDescription: formData.get('projectDescription'),
        coreFeaturesRequired: formData.get('coreFeaturesRequired'),
        preferredTechStack: formData.get('preferredTechStack'),
        deadline: formData.get('deadline'),
        budgetRange: formData.get('budgetRange'),
        referenceLink: formData.get('referenceLink'),
        additionalNotes: formData.get('additionalNotes'),
        attachmentNames: uploadedFiles.map((file) => file.fileName),
        attachmentUrls: uploadedFiles.map((file) => file.fileUrl),
      };

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? 'Unable to submit project.');
        return;
      }

      setSuccess('Project inquiry submitted successfully. Your workspace is ready for the next step.');
      setTimeout(() => {
        router.push(data.nextStep ?? '/dashboard');
        router.refresh();
      }, 1400);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="border-b border-white/[0.08] bg-gradient-to-r from-purple-500/10 via-transparent to-cyan-500/10 px-6 py-5 sm:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-purple-300">Project Intake</div>
            <h2 className="mt-2 font-display text-3xl font-black text-white">Turn Your Brief into a Real Delivery Pipeline</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
              Share scope, budget, references, and deadline expectations. We use this to review the inquiry, prepare quotation, and move your project into a managed client workspace.
            </p>
          </div>
          <div className="min-w-[220px]">
            <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-500">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/[0.06]">
              <div className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-violet-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 px-6 py-8 sm:px-8">
        <div className="grid gap-3 md:grid-cols-3">
          {steps.map((step, index) => (
            <button
              key={step.title}
              type="button"
              onClick={() => setCurrentStep(index)}
              className={`rounded-2xl border p-4 text-left transition-all ${
                currentStep === index
                  ? 'border-purple-500/20 bg-purple-500/10'
                  : 'border-white/[0.08] bg-white/[0.03]'
              }`}
            >
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Step {index + 1}</div>
              <div className="mt-2 font-display text-lg font-bold text-white">{step.title}</div>
              <div className="mt-1 text-sm text-slate-400">{step.hint}</div>
            </button>
          ))}
        </div>

        {currentStep === 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-300">Full Name</span>
              <input name="fullName" placeholder="Ava Johnson" className="w-full rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-300">Email</span>
              <input name="email" type="email" placeholder="ava@company.com" className="w-full rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-300">Company / Startup</span>
              <input name="companyName" placeholder="Nova Labs" className="w-full rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-300">Project Title</span>
              <input name="projectTitle" placeholder="Client portal for enterprise onboarding" className="w-full rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500" />
            </label>
            <label className="block md:col-span-2">
              <span className="mb-1.5 block text-sm font-medium text-slate-300">Project Type</span>
              <select name="projectType" defaultValue={projectTypeOptions[0]?.value} className="w-full rounded-2xl border border-white/[0.1] bg-[#0b1323] px-4 py-3 text-sm text-white outline-none">
                {projectTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        ) : null}

        {currentStep === 1 ? (
          <div className="space-y-5">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-300">Project Description</span>
              <textarea name="projectDescription" rows={5} placeholder="Describe the product, users, goals, and what success looks like." className="w-full rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-300">Core Features Required</span>
              <textarea name="coreFeaturesRequired" rows={4} placeholder="Authentication, dashboard, billing, admin panel, analytics, file uploads..." className="w-full rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500" />
            </label>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-300">Preferred Tech Stack</span>
                <input name="preferredTechStack" placeholder="Next.js, PostgreSQL, Prisma, AWS..." className="w-full rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-300">Reference Link</span>
                <input name="referenceLink" placeholder="https://example.com" className="w-full rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500" />
              </label>
            </div>
          </div>
        ) : null}

        {currentStep === 2 ? (
          <div className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-300">Deadline / Delivery Timeline</span>
                <input name="deadline" type="date" className="w-full rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-300">Budget Range</span>
                <select name="budgetRange" defaultValue={budgetRanges[2]} className="w-full rounded-2xl border border-white/[0.1] bg-[#0b1323] px-4 py-3 text-sm text-white outline-none">
                  {budgetRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-300">Additional Notes</span>
              <textarea name="additionalNotes" rows={4} placeholder="Anything else the team should know before we scope and quote the project?" className="w-full rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500" />
            </label>

            <div className="rounded-3xl border border-dashed border-purple-500/20 bg-purple-500/5 p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="font-display text-xl font-bold text-white">Upload Reference Files</div>
                  <p className="mt-2 max-w-xl text-sm text-slate-400">
                    Attach requirement docs, screenshots, briefs, PDFs, or exports to speed up our review.
                  </p>
                </div>
                <label className="btn-secondary cursor-pointer">
                  {uploading ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
                  Upload Files
                  <input type="file" multiple className="hidden" onChange={(event) => handleUpload(event.target.files)} />
                </label>
              </div>

              {uploadedFiles.length ? (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {uploadedFiles.map((file) => (
                    <div key={file.fileUrl} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
                      {file.fileName}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        {error ? <p className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p> : null}
        {success ? (
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
            <CheckCircle2 size={18} />
            {success}
          </div>
        ) : null}

        <div className="flex flex-col gap-3 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <button type="button" onClick={() => setCurrentStep((step) => Math.max(0, step - 1))} disabled={currentStep === 0} className="btn-secondary disabled:opacity-50">
              Back
            </button>
            <button type="button" onClick={() => setCurrentStep((step) => Math.min(steps.length - 1, step + 1))} disabled={currentStep === steps.length - 1} className="btn-secondary disabled:opacity-50">
              Next
            </button>
          </div>
          <button type="submit" disabled={submitting || uploading} className="btn-primary">
            {submitting ? <Loader2 size={16} className="animate-spin" /> : 'Submit Your Requirement'}
            <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
