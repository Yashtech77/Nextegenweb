import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/[0.08]">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-5 w-fit">
              <div className="h-12 w-12 rounded-xl overflow-hidden shrink-0">
                <Image
                  src="/nextgenlogo.png"
                  alt="NextGenWebWorks"
                  width={500}
                  height={500}
                  className="h-full w-full object-cover"
                />
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              A premium software development agency helping startups and growing businesses build high-quality digital products that scale.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-5">Services</h3>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Web Development', href: '/services#web-development' },
                { label: 'Mobile Apps', href: '/services#mobile-development' },
                { label: 'SaaS Products', href: '/services#saas-development' },
                { label: 'MVP Development', href: '/services#mvp-development' },
                { label: 'UI/UX Design', href: '/services#ui-ux-design' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-5">Company</h3>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Portfolio', href: '/portfolio' },
                { label: 'Privacy Policy', href: '/privacy-policy' },
                { label: 'Terms & Conditions', href: '/terms' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-5">Contact</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:admin@nextgenwebwork.online"
                  className="text-slate-400 hover:text-white text-sm transition-colors"
                >
                  admin@nextgenwebwork.online
                </a>
              </li>
              <li>
                <span className="text-slate-400 text-sm">Pune, Maharashtra, India</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.08] mt-14 pt-8 flex items-center justify-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} NextGenWebWorks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
