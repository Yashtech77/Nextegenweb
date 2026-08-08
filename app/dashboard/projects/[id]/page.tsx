import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FileCategory } from '@prisma/client';
import { FileText, Files, IndianRupee, ListChecks } from 'lucide-react';
import { fileCategoryLabels, milestoneStatusLabels, paymentStatusLabels } from '@/lib/constants';
import { getClientProjectById } from '@/lib/data-access';
import { requireUser } from '@/lib/auth/session';
import { formatCurrency, formatDate, formatDateTime } from '@/lib/utils';
import PortalShell from '@/components/dashboard/PortalShell';
import ProjectFileUploader from '@/components/dashboard/ProjectFileUploader';
import StatusBadge from '@/components/dashboard/StatusBadge';
import PaymentButton from '@/components/dashboard/PaymentButton';
import { dashboardNavigation } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Project Workspace | NextGenWebWorks',
  description: 'Track project progress, payments, milestones, updates, and delivery files inside your NextGenWebWorks client workspace.',
};

export default async function DashboardProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await requireUser();
  const project = await getClientProjectById(params.id, user.id);

  if (!project) {
    notFound();
  }

  const isAdvancePaid = project.payments.some(
    (payment) => payment.paymentType === 'ADVANCE' && payment.status === 'PAID'
  );
  const isFinalPaid = project.payments.some(
    (payment) => payment.paymentType === 'FINAL' && payment.status === 'PAID'
  );

  return (
    <PortalShell
      title={project.title}
      subtitle="Project scope, quotation, milestone visibility, payment actions, and delivery files all stay here."
      items={dashboardNavigation}
      roleLabel="Client Workspace"
    >
      <div className="glass-card p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <StatusBadge status={project.status} />
            <h1 className="mt-4 font-display text-3xl font-black text-white">{project.title}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-400">{project.description}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Quote</div>
              <div className="mt-2 text-lg font-semibold text-white">{formatCurrency(Number(project.quotationAmount ?? 0))}</div>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Deadline</div>
              <div className="mt-2 text-lg font-semibold text-white">{formatDate(project.deadline)}</div>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Budget</div>
              <div className="mt-2 text-lg font-semibold text-white">{project.budgetRange ?? 'Not specified'}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.25fr,0.75fr]">
        <div className="space-y-6">
          <div className="glass-card p-6">
            <div className="flex items-center gap-3">
              <ListChecks className="text-purple-300" size={18} />
              <h2 className="font-display text-xl font-bold text-white">Milestones</h2>
            </div>
            <div className="mt-5 space-y-4">
              {project.milestones.length ? (
                project.milestones.map((milestone) => (
                  <div key={milestone.id} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="text-base font-semibold text-white">{milestone.title}</div>
                        <p className="mt-2 text-sm text-slate-400">{milestone.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-white">{formatCurrency(Number(milestone.amount))}</div>
                        <div className="mt-1 text-xs text-slate-500">{milestoneStatusLabels[milestone.status]}</div>
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-slate-500">Due: {formatDate(milestone.dueDate)}</div>
                    {milestone.status !== 'COMPLETED' ? (
                      <div className="mt-4 max-w-xs">
                        {(() => {
                          const isMilestonePaid = project.payments.some(
                            (payment) =>
                              payment.paymentType === 'MILESTONE' &&
                              payment.milestoneId === milestone.id &&
                              payment.status === 'PAID'
                          );

                          return (
                        <PaymentButton
                          projectId={project.id}
                          paymentType="MILESTONE"
                          milestoneId={milestone.id}
                          label={`Pay ${milestone.title}`}
                          disabled={isMilestonePaid}
                          completedLabel="Milestone Paid"
                        />
                          );
                        })()}
                      </div>
                    ) : null}
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-white/[0.12] p-6 text-sm text-slate-400">
                  Milestones will appear here once the team structures delivery phases.
                </div>
              )}
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-3">
              <IndianRupee className="text-purple-300" size={18} />
              <h2 className="font-display text-xl font-bold text-white">Payment History</h2>
            </div>
            <div className="mt-5 space-y-4">
              {project.payments.length ? (
                project.payments.map((payment) => (
                  <div key={payment.id} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-sm font-semibold text-white">{payment.paymentType}</div>
                        <div className="mt-1 text-xs text-slate-500">{formatDateTime(payment.createdAt)}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-white">{formatCurrency(Number(payment.amount))}</div>
                        <div className="mt-1 text-xs text-slate-500">{paymentStatusLabels[payment.status]}</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-white/[0.12] p-6 text-sm text-slate-400">
                  No payment history yet.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6">
            <h2 className="font-display text-xl font-bold text-white">Payment Actions</h2>
            <div className="mt-5 space-y-4">
              {project.advanceAmount ? (
                <PaymentButton
                  projectId={project.id}
                  paymentType="ADVANCE"
                  label={`Pay Advance ${formatCurrency(Number(project.advanceAmount))}`}
                  disabled={isAdvancePaid}
                  completedLabel="Advance Paid"
                />
              ) : null}
              {project.remainingAmount ? (
                <PaymentButton
                  projectId={project.id}
                  paymentType="FINAL"
                  label={`Pay Remaining ${formatCurrency(Number(project.remainingAmount))}`}
                  disabled={isFinalPaid}
                  completedLabel="Final Payment Paid"
                />
              ) : null}
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-3">
              <Files className="text-purple-300" size={18} />
              <h2 className="font-display text-xl font-bold text-white">Files</h2>
            </div>
            <div className="mt-5">
              <ProjectFileUploader projectId={project.id} defaultCategory={FileCategory.REFERENCE} />
            </div>
            <div className="mt-5 space-y-3">
              {project.files.length ? (
                project.files.map((file) => (
                  <a key={file.id} href={file.fileUrl} target="_blank" className="block rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 transition hover:border-white/15">
                    <div className="text-sm font-semibold text-white">{file.fileName}</div>
                    <div className="mt-1 text-xs text-slate-500">{fileCategoryLabels[file.category]}</div>
                  </a>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-white/[0.12] p-6 text-sm text-slate-400">Files will appear here once shared by your team or uploaded with the project inquiry.</div>
              )}
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-3">
              <FileText className="text-purple-300" size={18} />
              <h2 className="font-display text-xl font-bold text-white">Latest Updates</h2>
            </div>
            <div className="mt-5 space-y-4">
              {project.updates.filter((update) => update.visibility !== 'INTERNAL').map((update) => (
                <div key={update.id} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                  <div className="text-sm font-semibold text-white">{update.title}</div>
                  <p className="mt-2 text-sm text-slate-400">{update.message}</p>
                  <div className="mt-3 text-xs text-slate-500">{formatDateTime(update.createdAt)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
