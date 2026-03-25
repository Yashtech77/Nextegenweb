import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | NextGenWebWorks',
  description: 'Read NextGenWebWorks\' privacy policy to understand how we collect, use, and protect your personal information.',
  robots: { index: true, follow: false },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        badge="Legal"
        title="Privacy Policy"
        subtitle="How we handle your data — plainly and transparently."
        breadcrumb={[{ label: 'Privacy Policy', href: '/privacy-policy' }]}
      />

      <section className="section-padding bg-[#050B18]">
        <div className="container-custom max-w-3xl">
          <div className="glass-card p-8 sm:p-12 prose prose-invert prose-sm max-w-none">
            <div className="text-slate-500 text-xs mb-8 pb-4 border-b border-white/[0.06]">
              Last updated: January 1, 2024 · Effective date: January 1, 2024
            </div>

            {[
              {
                title: '1. Information We Collect',
                content: `We collect information you provide directly to us, such as when you fill out our contact form, request a consultation, or communicate with our team. This includes:

• Name, email address, and phone number
• Company name and website
• Project details and requirements
• Communication history with our team

We also automatically collect certain technical information when you visit our website, including IP address, browser type, pages visited, and referral source. This is collected through standard web analytics tools.`,
              },
              {
                title: '2. How We Use Your Information',
                content: `We use the information we collect to:

• Respond to your inquiries and provide customer support
• Send project proposals, estimates, and updates
• Improve our website and services
• Send occasional marketing communications (you can opt out at any time)
• Comply with legal obligations

We do not sell your personal information to third parties. Ever.`,
              },
              {
                title: '3. Information Sharing',
                content: `We may share your information with:

• Service providers who help us operate our business (e.g., email service providers, project management tools)
• Professional advisors such as lawyers and accountants
• Law enforcement when required by law

All third-party service providers are bound by confidentiality agreements and are prohibited from using your information for any other purpose.`,
              },
              {
                title: '4. Data Security',
                content: `We take the security of your personal information seriously. We implement industry-standard security measures including:

• SSL/TLS encryption for all data in transit
• Secure, access-controlled data storage
• Regular security audits
• Limited employee access on a need-to-know basis

However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.`,
              },
              {
                title: '5. Cookies',
                content: `Our website uses cookies to enhance your browsing experience. We use:

• Essential cookies required for the website to function
• Analytics cookies to understand how visitors use our site (via privacy-respecting analytics)

You can control cookies through your browser settings. Disabling cookies may affect some website functionality.`,
              },
              {
                title: '6. Your Rights',
                content: `Depending on your location, you may have the following rights:

• Access: Request a copy of the personal information we hold about you
• Correction: Request we correct inaccurate information
• Deletion: Request we delete your personal information
• Opt-out: Unsubscribe from marketing communications at any time
• Data portability: Request your data in a portable format

To exercise any of these rights, contact us at privacy@nextgenwebworks.com.`,
              },
              {
                title: '7. Data Retention',
                content: `We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, or resolve disputes. Contact form submissions are retained for 3 years. Client project data is retained for 7 years per standard business practice.`,
              },
              {
                title: '8. Children\'s Privacy',
                content: `Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If we become aware that we have collected personal data from a child, we will take steps to delete that information.`,
              },
              {
                title: '9. Changes to This Policy',
                content: `We may update this privacy policy from time to time. We will notify you of significant changes by posting a notice on our website or sending an email to clients. Your continued use of our website after changes are posted constitutes your acceptance of the updated policy.`,
              },
              {
                title: '10. Contact Us',
                content: `If you have questions about this privacy policy or our data practices, please contact us at:

NextGenWebWorks
Email: privacy@nextgenwebworks.com
San Francisco, CA (Remote-First)`,
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
                Questions? Email us at{' '}
                <a
                  href="mailto:privacy@nextgenwebworks.com"
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  privacy@nextgenwebworks.com
                </a>
              </p>
              <Link href="/terms" className="text-purple-400 hover:text-purple-300 text-xs transition-colors">
                View Terms & Conditions →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
