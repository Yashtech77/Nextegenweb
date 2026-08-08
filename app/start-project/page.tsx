import type { Metadata } from 'next';
import { ClipboardList, CreditCard, FolderKanban } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import StartProjectForm from '@/components/forms/StartProjectForm';

export const metadata: Metadata = {
  title: 'Start Your Project | NextGenWebWorks',
  description:
    'Submit your software project requirement, upload reference files, and move into a premium client workflow with quotation, milestone tracking, and payments.',
};

export default function StartProjectPage() {
  return (
    <>
      <PageHeader
        badge="Project Intake"
        title="Start the Project"
        highlight="That Moves Your Business Forward"
        subtitle="Use our premium intake flow to submit requirements, share product goals, upload documents, and move into a managed delivery process with quotation and milestone tracking."
        breadcrumb={[{ label: 'Start Project', href: '/start-project' }]}
      />

      <section className="section-padding bg-[#050B18]">
        <div className="container-custom space-y-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                icon: ClipboardList,
                title: 'Structured Discovery',
                text: 'We capture the details we need to review scope, technical complexity, and timeline properly.',
              },
              {
                icon: CreditCard,
                title: 'Quotation to Payment',
                text: 'Once approved, clients can receive quotations, pay advance invoices, and track remaining balances.',
              },
              {
                icon: FolderKanban,
                title: 'One Managed Workspace',
                text: 'Project updates, milestones, files, and payment records live inside the same premium portal.',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="glass-card p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] text-purple-300">
                    <Icon size={20} />
                  </div>
                  <h2 className="mt-4 font-display text-xl font-bold text-white">{item.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.text}</p>
                </div>
              );
            })}
          </div>

          <StartProjectForm />
        </div>
      </section>
    </>
  );
}
