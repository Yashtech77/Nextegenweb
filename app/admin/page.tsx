import type { Metadata } from 'next';
import Link from 'next/link';
import { ProjectStatus } from '@prisma/client';
import { Clock3, FolderKanban, IndianRupee, ListChecks } from 'lucide-react';
import { adminNavigation, projectStatusMeta } from '@/lib/constants';
import { getAdminProjects, getPlatformSnapshot } from '@/lib/data-access';
import { requireAdmin } from '@/lib/auth/session';
import { formatCurrency } from '@/lib/utils';
import PortalShell from '@/components/dashboard/PortalShell';
import MetricCard from '@/components/dashboard/MetricCard';
import ProjectRecordCard from '@/components/dashboard/ProjectRecordCard';

export const metadata: Metadata = {
  title: 'Admin Dashboard | NextGenWebWorks',
  description: 'Review project inquiries, manage quotations, track delivery status, and operate client payments from the admin dashboard.',
};

const statusFilters = [
  'ALL',
  ProjectStatus.INQUIRY_RECEIVED,
  ProjectStatus.UNDER_REVIEW,
  ProjectStatus.QUOTED,
  ProjectStatus.IN_PROGRESS,
  ProjectStatus.FINAL_PAYMENT_PENDING,
] as const;

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams?: { status?: string };
}) {
  const admin = await requireAdmin();
  const activeStatus =
    searchParams?.status && searchParams.status in projectStatusMeta
      ? (searchParams.status as ProjectStatus)
      : undefined;

  const [projects, snapshot] = await Promise.all([
    getAdminProjects(activeStatus),
    getPlatformSnapshot(admin.id, admin.role),
  ]);

  return (
    <PortalShell
      title="Admin Operations"
      subtitle="Review inquiries, quote new work, manage project statuses, publish updates, and handle payment checkpoints."
      items={adminNavigation}
      roleLabel="Admin Console"
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Projects" value={String(snapshot.totalProjects)} hint="All inquiries and engagements" icon={<FolderKanban size={20} />} />
        <MetricCard label="Pending Review" value={String(snapshot.pendingReview)} hint="Need scoping or response" icon={<Clock3 size={20} />} />
        <MetricCard label="Active Delivery" value={String(snapshot.activeProjects)} hint="Currently being built" icon={<ListChecks size={20} />} />
        <MetricCard label="Paid Revenue" value={formatCurrency(snapshot.revenue)} hint="Captured through Razorpay" icon={<IndianRupee size={20} />} />
      </div>

      <div className="glass-card p-6">
        <h2 className="font-display text-2xl font-bold text-white">Incoming & Active Projects</h2>
        <p className="mt-2 text-sm text-slate-400">Open a project to assign quotation, define milestones, publish updates, and manage payment stages.</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {statusFilters.map((status) => (
            <Link
              key={status}
              href={status === 'ALL' ? '/admin' : `/admin?status=${status}`}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                (status === 'ALL' && !activeStatus) || status === activeStatus
                  ? 'border-purple-500/20 bg-purple-500/10 text-white'
                  : 'border-white/[0.08] bg-white/[0.03] text-slate-300 hover:border-white/15 hover:text-white'
              }`}
            >
              {status === 'ALL' ? 'All' : projectStatusMeta[status].label}
            </Link>
          ))}
        </div>
        <div className="mt-6 space-y-5">
          {projects.map((project) => (
            <ProjectRecordCard key={project.id} hrefBase="/admin/projects" project={project} />
          ))}
        </div>
      </div>
    </PortalShell>
  );
}
