'use client';

import { FormEvent, useState } from 'react';
import { MilestoneStatus, ProjectStatus, UpdateVisibility } from '@prisma/client';
import { projectStatusMeta } from '@/lib/constants';

function ActionMessage({ message }: { message: string | null }) {
  if (!message) return null;
  return <p className="mt-3 text-xs text-slate-400">{message}</p>;
}

export function QuoteForm({ projectId }: { projectId: string }) {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/projects/${projectId}/quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quotationAmount: formData.get('quotationAmount'),
          advanceAmount: formData.get('advanceAmount'),
          remainingAmount: formData.get('remainingAmount'),
          status: formData.get('status'),
        }),
      });
      const data = await response.json();
      setMessage(data.error ?? 'Quotation updated successfully.');
      if (response.ok) window.location.reload();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5">
      <h3 className="font-display text-xl font-bold text-white">Quotation & Payment Split</h3>
      <div className="grid gap-4 md:grid-cols-3">
        <input name="quotationAmount" type="number" min="0" placeholder="Total quote" className="w-full rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none" />
        <input name="advanceAmount" type="number" min="0" placeholder="Advance amount" className="w-full rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none" />
        <input name="remainingAmount" type="number" min="0" placeholder="Remaining amount" className="w-full rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none" />
      </div>
      <select name="status" className="w-full rounded-2xl border border-white/[0.1] bg-[#0b1323] px-4 py-3 text-sm text-white outline-none">
        {Object.entries(projectStatusMeta).map(([value, meta]) => (
          <option key={value} value={value}>
            {meta.label}
          </option>
        ))}
      </select>
      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? 'Saving...' : 'Save Quotation'}
      </button>
      <ActionMessage message={message} />
    </form>
  );
}

export function StatusForm({ projectId, currentStatus }: { projectId: string; currentStatus: ProjectStatus }) {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/projects/${projectId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: formData.get('status'),
        }),
      });
      const data = await response.json();
      setMessage(data.error ?? 'Project status updated.');
      if (response.ok) window.location.reload();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5">
      <h3 className="font-display text-xl font-bold text-white">Operational Status</h3>
      <select
        name="status"
        defaultValue={currentStatus}
        className="w-full rounded-2xl border border-white/[0.1] bg-[#0b1323] px-4 py-3 text-sm text-white outline-none"
      >
        {Object.entries(projectStatusMeta).map(([value, meta]) => (
          <option key={value} value={value}>
            {meta.label}
          </option>
        ))}
      </select>
      <button type="submit" disabled={loading} className="btn-secondary">
        {loading ? 'Updating...' : 'Update Status'}
      </button>
      <ActionMessage message={message} />
    </form>
  );
}

export function MilestoneForm({ projectId }: { projectId: string }) {
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch(`/api/admin/projects/${projectId}/milestones`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: formData.get('title'),
        description: formData.get('description'),
        amount: formData.get('amount'),
        status: formData.get('status'),
        dueDate: formData.get('dueDate'),
      }),
    });
    const data = await response.json();
    setMessage(data.error ?? 'Milestone created successfully.');
    if (response.ok) window.location.reload();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5">
      <h3 className="font-display text-xl font-bold text-white">Create Milestone</h3>
      <input name="title" placeholder="Milestone title" className="w-full rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none" />
      <textarea name="description" rows={3} placeholder="Milestone description" className="w-full rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none" />
      <div className="grid gap-4 md:grid-cols-3">
        <input name="amount" type="number" min="0" placeholder="Amount" className="w-full rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none" />
        <select name="status" defaultValue={MilestoneStatus.PENDING} className="w-full rounded-2xl border border-white/[0.1] bg-[#0b1323] px-4 py-3 text-sm text-white outline-none">
          {Object.values(MilestoneStatus).map((status) => (
            <option key={status} value={status}>
              {status.replace(/_/g, ' ')}
            </option>
          ))}
        </select>
        <input name="dueDate" type="date" className="w-full rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none" />
      </div>
      <button type="submit" className="btn-secondary">Add Milestone</button>
      <ActionMessage message={message} />
    </form>
  );
}

export function UpdateForm({ projectId }: { projectId: string }) {
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch(`/api/admin/projects/${projectId}/updates`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: formData.get('title'),
        message: formData.get('message'),
        status: formData.get('status') || undefined,
        visibility: formData.get('visibility'),
      }),
    });
    const data = await response.json();
    setMessage(data.error ?? 'Project update shared successfully.');
    if (response.ok) window.location.reload();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5">
      <h3 className="font-display text-xl font-bold text-white">Share Client Update</h3>
      <input name="title" placeholder="Update title" className="w-full rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none" />
      <textarea name="message" rows={4} placeholder="What changed, what shipped, or what needs attention?" className="w-full rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none" />
      <div className="grid gap-4 md:grid-cols-2">
        <select name="status" className="w-full rounded-2xl border border-white/[0.1] bg-[#0b1323] px-4 py-3 text-sm text-white outline-none">
          <option value="">No status change</option>
          {Object.entries(projectStatusMeta).map(([value, meta]) => (
            <option key={value} value={value}>
              {meta.label}
            </option>
          ))}
        </select>
        <select name="visibility" defaultValue={UpdateVisibility.CLIENT} className="w-full rounded-2xl border border-white/[0.1] bg-[#0b1323] px-4 py-3 text-sm text-white outline-none">
          <option value={UpdateVisibility.CLIENT}>Visible to client</option>
          <option value={UpdateVisibility.INTERNAL}>Internal only</option>
        </select>
      </div>
      <button type="submit" className="btn-secondary">Publish Update</button>
      <ActionMessage message={message} />
    </form>
  );
}
