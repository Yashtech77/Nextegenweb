import Link from 'next/link';
import { ProjectStatus } from '@prisma/client';
import { ArrowRight, CalendarDays, CreditCard, Layers3 } from 'lucide-react';
import { projectTypeOptions } from '@/lib/constants';
import { formatCurrency, formatDate } from '@/lib/utils';
import StatusBadge from '@/components/dashboard/StatusBadge';

interface ProjectRecordCardProps {
  hrefBase: string;
  project: {
    id: string;
    title: string;
    description: string;
    projectType: string;
    deadline: Date | null;
    status: ProjectStatus;
    quotationAmount: any;
    payments: { status: string }[];
    milestones: { id: string }[];
  };
}

export default function ProjectRecordCard({ hrefBase, project }: ProjectRecordCardProps) {
  const projectTypeLabel =
    projectTypeOptions.find((item) => item.value === project.projectType)?.label ?? project.projectType;

  return (
    <div className="glass-card p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={project.status} />
            <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs font-medium text-slate-400">
              {projectTypeLabel}
            </span>
          </div>
          <h3 className="mt-4 font-display text-2xl font-bold text-white">{project.title}</h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">{project.description}</p>
        </div>

        <Link href={`${hrefBase}/${project.id}`} className="btn-secondary shrink-0">
          Open Workspace
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-500">
            <CalendarDays size={14} />
            Deadline
          </div>
          <div className="mt-2 text-base font-semibold text-white">{formatDate(project.deadline)}</div>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-500">
            <CreditCard size={14} />
            Quotation
          </div>
          <div className="mt-2 text-base font-semibold text-white">{formatCurrency(Number(project.quotationAmount ?? 0))}</div>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-500">
            <Layers3 size={14} />
            Milestones
          </div>
          <div className="mt-2 text-base font-semibold text-white">{project.milestones.length} planned</div>
        </div>
      </div>
    </div>
  );
}
