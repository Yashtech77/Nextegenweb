import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import ContactForm from '@/components/ContactForm';
import AnimatedSection from '@/components/AnimatedSection';
import { Mail, MapPin, Clock, Calendar, Linkedin, Twitter } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | NextGenWebWorks',
  description:
    'Get in touch with NextGenWebWorks. Tell us about your project and we\'ll schedule a free 30-minute consultation to discuss how we can help you build your digital product.',
  openGraph: {
    title: 'Contact NextGenWebWorks | Start Your Project',
    description:
      'Ready to build your next digital product? Contact us for a free consultation. We respond within 24 hours.',
  },
};

const contactDetails = [
  {
    icon: Mail,
    label: 'Email Us',
    value: 'admin@nextgenwebwork.online',
    description: 'For project inquiries and general questions',
    href: 'mailto:admin@nextgenwebwork.online',
    color: '#cb6de8',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Pune, Maharashtra',
    description: 'Remote-first · Available worldwide',
    href: '#',
    color: '#8b5cf6',
  },
  {
    icon: Clock,
    label: 'Response Time',
    value: 'Within 24 hours',
    description: 'We review every message personally',
    href: null,
    color: '#f59e0b',
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        badge="Get In Touch"
        title="Let's Discuss Your"
        highlight="Next Product"
        subtitle="Have a project in mind? We'd love to hear about it. Book a free 30-minute call and let's explore how we can build something great together."
        breadcrumb={[{ label: 'Contact', href: '/contact' }]}
      />

      <section className="section-padding bg-[#050B18]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left: Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatedSection variant="slideLeft">
                <div>
                  <h2 className="font-display font-bold text-2xl text-white mb-3">
                    We&apos;d love to hear from you
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Whether you have a fully-formed product idea or just a spark of inspiration,
                    we&apos;re here to help you figure out the best path forward.
                  </p>
                </div>
              </AnimatedSection>

              <div className="space-y-4">
                {contactDetails.map((detail, i) => {
                  const Icon = detail.icon;
                  const content = (
                    <div className="glass-card p-5 flex items-start gap-4 group hover:border-purple-500/20 transition-all duration-300">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                        style={{
                          background: `${detail.color}15`,
                          border: `1px solid ${detail.color}25`,
                        }}
                      >
                        <Icon size={18} style={{ color: detail.color }} />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-0.5">{detail.label}</div>
                        <div className="font-semibold text-white text-sm">{detail.value}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{detail.description}</div>
                      </div>
                    </div>
                  );

                  return (
                    <AnimatedSection key={detail.label} delay={i * 0.08} variant="slideLeft">
                      {detail.href && detail.href !== '#' ? (
                        <a href={detail.href}>{content}</a>
                      ) : (
                        content
                      )}
                    </AnimatedSection>
                  );
                })}
              </div>

              {/* Social Links */}
              <AnimatedSection variant="slideLeft" delay={0.4}>
                <div className="glass-card p-5">
                  <div className="text-xs text-slate-500 mb-3 font-medium uppercase tracking-wider">
                    Follow Us
                  </div>
                  <div className="flex gap-3">
                    {[
                      { Icon: Twitter, label: 'Twitter', href: '#' },
                      { Icon: Linkedin, label: 'LinkedIn', href: '#' },
                    ].map(({ Icon, label, href }) => (
                      <a
                        key={label}
                        href={href}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all text-sm"
                      >
                        <Icon size={15} />
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Book a call */}
              <AnimatedSection variant="slideLeft" delay={0.5}>
                <div className="glass-card p-5 bg-gradient-to-br from-purple-500/8 to-violet-500/8 border-purple-500/20">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shrink-0">
                      <Calendar size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm mb-1">Book a Video Call</div>
                      <div className="text-xs text-slate-400 leading-relaxed">
                        Prefer to talk directly? Schedule a free 30-minute discovery call with our
                        team.
                      </div>
                      <a
                        href="#"
                        className="inline-flex items-center gap-1 text-xs text-purple-400 font-medium mt-2 hover:text-purple-300 transition-colors"
                      >
                        Schedule on Calendly →
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-3">
              <AnimatedSection variant="slideRight">
                <ContactForm />
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-[#080E1D]">
        <div className="container-custom max-w-3xl">
          <h2 className="font-display font-bold text-2xl text-white text-center mb-10">
            Common Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: 'How quickly can you start on a project?',
                a: 'Typically within 1-2 weeks of signing the contract, depending on our current capacity. We\'ll always give you an honest timeline during our initial call.',
              },
              {
                q: 'Do you work with non-technical founders?',
                a: 'Absolutely — most of our best client relationships are with non-technical founders. We\'ll guide you through every technical decision in plain language.',
              },
              {
                q: 'What does a typical engagement cost?',
                a: 'MVP projects typically start around $15K–$30K. Full product development ranges from $50K–$150K+. We\'ll give you a detailed estimate after our discovery call.',
              },
              {
                q: 'Do you sign NDAs?',
                a: 'Yes, always. We\'re happy to sign a mutual NDA before any discussions about your product or business.',
              },
              {
                q: 'Who owns the code after the project?',
                a: 'You do. 100% full ownership of all source code and intellectual property is transferred to you upon final payment. No strings attached.',
              },
            ].map((faq, i) => (
              <AnimatedSection key={faq.q} delay={i * 0.07}>
                <div className="glass-card p-6">
                  <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">{faq.q}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
