import type { Metadata } from 'next';
import { FileCategory } from '@prisma/client';
import { notFound } from 'next/navigation';
import { ClipboardList, Files, MessageSquareText } from 'lucide-react';
import { adminNavigation, fileCategoryLabels, milestoneStatusLabels, paymentStatusLabels } from '@/lib/constants';
import { getAdminProjectById } from '@/lib/data-access';
import { requireAdmin } from '@/lib/auth/session';
import { formatCurrency, formatDate, formatDateTime } from '@/lib/utils';
import PortalShell from '@/components/dashboard/PortalShell';
import ProjectFileUploader from '@/components/dashboard/ProjectFileUploader';
import StatusBadge from '@/components/dashboard/StatusBadge';
import { MilestoneForm, QuoteForm, StatusForm, UpdateForm } from '@/components/dashboard/AdminProjectForms';

export const metadata: Metadata = {
  title: 'Admin Project Detail | NextGenWebWorks',
  description: 'Manage quotation, statuses, milestones, updates, and payment stages for a specific client project.',
};

export default async function AdminProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  await requireAdmin();
  const project = await getAdminProjectById(params.id);

  if (!project) {
    notFound();
  }

  return (
    <PortalShell
      title={project.title}
      subtitle={`Client: ${project.client.name} · ${project.client.email}`}
      items={adminNavigation}
      roleLabel="Admin Console"
    >
      <div className="glass-card p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <StatusBadge status={project.status} />
            <h1 className="mt-4 font-display text-3xl font-black text-white">{project.title}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-400">{project.description}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Company</div>
              <div className="mt-2 text-base font-semibold text-white">{project.companyName ?? project.client.companyName ?? 'Independent client'}</div>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Deadline</div>
              <div className="mt-2 text-base font-semibold text-white">{formatDate(project.deadline)}</div>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Quotation</div>
              <div className="mt-2 text-base font-semibold text-white">{formatCurrency(Number(project.quotationAmount ?? 0))}</div>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Budget</div>
              <div className="mt-2 text-base font-semibold text-white">{project.budgetRange ?? 'Not specified'}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
        <div className="space-y-6">
          <div className="glass-card p-6">
            <div className="flex items-center gap-3">
              <ClipboardList className="text-purple-300" size={18} />
              <h2 className="font-display text-xl font-bold text-white">Operations Panel</h2>
            </div>
            <div className="mt-5 grid gap-5 xl:grid-cols-2">
              <QuoteForm projectId={project.id} />
              <StatusForm projectId={project.id} currentStatus={project.status} />
            </div>
            <div className="mt-5 grid gap-5 xl:grid-cols-2">
              <MilestoneForm projectId={project.id} />
              <UpdateForm projectId={project.id} />
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-3">
              <MessageSquareText className="text-purple-300" size={18} />
              <h2 className="font-display text-xl font-bold text-white">Client Updates</h2>
            </div>
            <div className="mt-5 space-y-4">
              {project.updates.map((update) => (
                <div key={update.id} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-base font-semibold text-white">{update.title}</div>
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-500">{update.visibility}</div>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{update.message}</p>
                  <div className="mt-3 text-xs text-slate-500">{formatDateTime(update.createdAt)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6">
            <h2 className="font-display text-xl font-bold text-white">Milestones</h2>
            <div className="mt-5 space-y-4">
              {project.milestones.length ? project.milestones.map((milestone) => (
                <div key={milestone.id} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-white">{milestone.title}</div>
                      <div className="mt-1 text-xs text-slate-500">{milestoneStatusLabels[milestone.status]}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-white">{formatCurrency(Number(milestone.amount))}</div>
                      <div className="mt-1 text-xs text-slate-500">Due {formatDate(milestone.dueDate)}</div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-slate-400">{milestone.description}</p>
                </div>
              )) : <div className="rounded-2xl border border-dashed border-white/[0.12] p-6 text-sm text-slate-400">No milestones yet.</div>}
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-3">
              <Files className="text-purple-300" size={18} />
              <h2 className="font-display text-xl font-bold text-white">Files & Payments</h2>
            </div>
            <div className="mt-5">
              <ProjectFileUploader projectId={project.id} defaultCategory={FileCategory.DELIVERABLE} />
            </div>
            <div className="mt-5 space-y-3">
              {project.files.map((file) => (
                <a key={file.id} href={file.fileUrl} target="_blank" className="block rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                  <div className="text-sm font-semibold text-white">{file.fileName}</div>
                  <div className="mt-1 text-xs text-slate-500">{fileCategoryLabels[file.category]}</div>
                </a>
              ))}
              {!project.files.length ? <div className="rounded-2xl border border-dashed border-white/[0.12] p-6 text-sm text-slate-400">No files uploaded yet.</div> : null}
            </div>
            <div className="mt-5 space-y-3">
              {project.payments.map((payment) => (
                <div key={payment.id} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-white">{payment.paymentType}</div>
                      <div className="mt-1 text-xs text-slate-500">{paymentStatusLabels[payment.status]}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-white">{formatCurrency(Number(payment.amount))}</div>
                      <div className="mt-1 text-xs text-slate-500">{formatDateTime(payment.createdAt)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
