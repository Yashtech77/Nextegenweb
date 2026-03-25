import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions | NextGenWebWorks',
  description: 'Read the Terms & Conditions governing the use of NextGenWebWorks\' website and services.',
  robots: { index: true, follow: false },
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        badge="Legal"
        title="Terms & Conditions"
        subtitle="The rules and guidelines that govern our relationship with clients and website visitors."
        breadcrumb={[{ label: 'Terms & Conditions', href: '/terms' }]}
      />

      <section className="section-padding bg-[#050B18]">
        <div className="container-custom max-w-3xl">
          <div className="glass-card p-8 sm:p-12">
            <div className="text-slate-500 text-xs mb-8 pb-4 border-b border-white/[0.06]">
              Last updated: January 1, 2024 · Effective date: January 1, 2024
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Please read these Terms and Conditions carefully before using our website or engaging
              our services. By accessing our website or entering into a service agreement with
              NextGenWebWorks, you agree to be bound by these terms.
            </p>

            {[
              {
                title: '1. Services',
                content: `NextGenWebWorks provides software development, design, and consulting services as described in individual project proposals and service agreements. The scope, timeline, and deliverables for each engagement are defined in a separate Statement of Work (SOW) or project agreement signed by both parties.

We reserve the right to decline any project request at our discretion.`,
              },
              {
                title: '2. Payment Terms',
                content: `Payment terms are specified in individual service agreements. Standard terms include:

• 50% deposit due upon contract signing to initiate work
• Remaining balance due upon project completion and delivery
• Milestone-based payments for longer engagements as specified in the SOW
• Late payments incur a 1.5% monthly fee on overdue balances
• All prices are in USD unless otherwise agreed in writing`,
              },
              {
                title: '3. Intellectual Property',
                content: `Upon receipt of full payment, NextGenWebWorks assigns all intellectual property rights for the deliverables to the client, including source code, designs, and documentation.

NextGenWebWorks retains rights to:
• Internal tools and frameworks developed independently
• General knowledge and skills gained during the project
• The right to display completed work in our portfolio (unless client requests otherwise in writing)

Client retains ownership of all content, data, and pre-existing materials provided to us.`,
              },
              {
                title: '4. Confidentiality',
                content: `Both parties agree to keep confidential any proprietary or sensitive information shared during the engagement. This obligation continues for 3 years after the conclusion of the project.

We are happy to sign a mutual NDA before any project discussions begin — just ask.`,
              },
              {
                title: '5. Revisions and Changes',
                content: `Project scope changes must be agreed upon in writing before work begins. We operate on a transparent change order process:

• Minor changes (under 2 hours) may be accommodated at no charge at our discretion
• Significant scope changes require a written change order with updated timeline and cost
• Rush requests may incur additional fees as agreed in writing`,
              },
              {
                title: '6. Warranties and Guarantees',
                content: `We warrant that our work will:
• Be performed professionally and with reasonable skill
• Conform to the specifications in the agreed SOW
• Be original work (or properly licensed third-party components)

We provide a 30-day bug-fix warranty after project delivery at no charge. This covers defects in our work but does not cover new features, changes in requirements, or issues caused by third-party services.`,
              },
              {
                title: '7. Limitation of Liability',
                content: `To the maximum extent permitted by law, NextGenWebWorks\' total liability for any claims arising from a project shall not exceed the total amount paid by the client for that specific project.

We are not liable for indirect, incidental, or consequential damages, including lost profits, data loss, or business interruption.`,
              },
              {
                title: '8. Website Use',
                content: `By using our website, you agree to:
• Not use the site for any unlawful purpose
• Not attempt to gain unauthorized access to any systems
• Not copy, reproduce, or distribute our content without permission
• Accept that our website is provided "as is" without warranties of any kind`,
              },
              {
                title: '9. Termination',
                content: `Either party may terminate a project agreement with 14 days written notice. Upon termination:

• Client pays for all work completed up to the termination date
• NextGenWebWorks delivers all completed work and associated files
• Any pre-paid amounts for uncompleted work are refunded on a pro-rated basis`,
              },
              {
                title: '10. Governing Law',
                content: `These terms are governed by the laws of the State of California, United States. Any disputes shall be resolved through binding arbitration in San Francisco, CA, under the rules of the American Arbitration Association.`,
              },
              {
                title: '11. Contact',
                content: `For questions about these terms, contact us at:

NextGenWebWorks
Email: legal@nextgenwebworks.com
San Francisco, CA`,
              },
            ].map((section) => (
              <div key={section.title} className="mb-8">
                <h2 className="font-display font-bold text-xl text-white mb-3">{section.title}</h2>
                <div className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}

            <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-slate-500 text-xs">
                Questions? Email{' '}
                <a
                  href="mailto:legal@nextgenwebworks.com"
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  legal@nextgenwebworks.com
                </a>
              </p>
              <Link
                href="/privacy-policy"
                className="text-purple-400 hover:text-purple-300 text-xs transition-colors"
              >
                View Privacy Policy →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
