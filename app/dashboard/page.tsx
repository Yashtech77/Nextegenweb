import type { Metadata } from 'next';
import { Activity, CreditCard, FolderKanban, IndianRupee } from 'lucide-react';
import { dashboardNavigation, paymentStatusLabels } from '@/lib/constants';
import { getClientProjects, getPlatformSnapshot } from '@/lib/data-access';
import { requireUser } from '@/lib/auth/session';
import { formatCurrency, formatDateTime } from '@/lib/utils';
import PortalShell from '@/components/dashboard/PortalShell';
import MetricCard from '@/components/dashboard/MetricCard';
import ProjectRecordCard from '@/components/dashboard/ProjectRecordCard';

export const metadata: Metadata = {
  title: 'Client Dashboard | NextGenWebWorks',
  description: 'View your submitted software projects, quotations, milestone progress, payments, and latest delivery updates.',
};

export default async function DashboardPage() {
  const user = await requireUser();
  const [projects, snapshot] = await Promise.all([
    getClientProjects(user.id),
    getPlatformSnapshot(user.id, user.role),
  ]);

  return (
    <PortalShell
      title="Client Dashboard"
      subtitle={`Welcome back, ${user.name}. Track every project, invoice, update, and delivery from one premium workspace.`}
      items={dashboardNavigation}
      roleLabel="Client Workspace"
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Projects" value={String(snapshot.totalProjects)} hint="All submitted engagements" icon={<FolderKanban size={20} />} />
        <MetricCard label="Active" value={String(snapshot.activeProjects)} hint="Currently in delivery" icon={<Activity size={20} />} />
        <MetricCard label="Pending Payments" value={String(snapshot.pendingPayments)} hint="Awaiting action from you" icon={<CreditCard size={20} />} />
        <MetricCard label="Paid So Far" value={formatCurrency(snapshot.revenue)} hint="Successful Razorpay receipts" icon={<IndianRupee size={20} />} />
      </div>

      <div className="glass-card p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-white">Your Projects</h2>
            <p className="mt-1 text-sm text-slate-400">Open any project to review scope, progress, milestones, files, and payment actions.</p>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          {projects.length ? (
            projects.map((project) => <ProjectRecordCard key={project.id} hrefBase="/dashboard/projects" project={project} />)
          ) : (
            <div className="rounded-3xl border border-dashed border-white/[0.12] p-10 text-center text-slate-400">
              No projects yet. Your first project inquiry will appear here as soon as it is submitted.
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card p-6">
          <h3 className="font-display text-xl font-bold text-white">Latest Project Updates</h3>
          <div className="mt-5 space-y-4">
            {projects.flatMap((project) =>
              project.updates.slice(0, 1).map((update) => (
                <div key={update.id} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{project.title}</div>
                  <div className="mt-2 text-base font-semibold text-white">{update.title}</div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{update.message}</p>
                  <div className="mt-3 text-xs text-slate-500">{formatDateTime(update.createdAt)}</div>
                </div>
              ))
            ).slice(0, 4)}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-display text-xl font-bold text-white">Payment Snapshot</h3>
          <div className="mt-5 space-y-4">
            {projects.flatMap((project) =>
              project.payments.slice(0, 2).map((payment) => (
                <div key={payment.id} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-white">{project.title}</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{payment.paymentType}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-white">{formatCurrency(Number(payment.amount))}</div>
                      <div className="mt-1 text-xs text-slate-500">{paymentStatusLabels[payment.status]}</div>
                    </div>
                  </div>
                </div>
              ))
            ).slice(0, 5)}
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
