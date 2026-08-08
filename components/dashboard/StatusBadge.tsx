'use client';

import { ProjectStatus } from '@prisma/client';
import { projectStatusMeta } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function StatusBadge({
  status,
  className,
}: {
  status: ProjectStatus;
  className?: string;
}) {
  const meta = projectStatusMeta[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide',
        meta.tone,
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {meta.label}
    </span>
  );
}
