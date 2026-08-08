'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, LogOut, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PortalShellProps {
  title: string;
  subtitle: string;
  items: { href: string; label: string }[];
  roleLabel: string;
  children: React.ReactNode;
}

export default function PortalShell({
  title,
  subtitle,
  items,
  roleLabel,
  children,
}: PortalShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  };

  return (
    <section className="min-h-screen bg-[#050B18] pt-28 pb-14">
      <div className="container-custom">
        <div className="grid gap-6 lg:grid-cols-[280px,1fr]">
          <aside className="glass-card h-fit p-5 lg:sticky lg:top-28">
            <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-purple-500/10 via-white/[0.02] to-cyan-500/10 p-5">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.05] text-purple-300">
                <LayoutDashboard size={22} />
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{roleLabel}</div>
              <h1 className="mt-2 font-display text-2xl font-bold text-white">{title}</h1>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{subtitle}</p>
            </div>

            <nav className="mt-5 space-y-2">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium transition-all',
                    pathname === item.href || pathname.startsWith(`${item.href}/`)
                      ? 'border-purple-500/20 bg-purple-500/10 text-white'
                      : 'border-white/[0.08] bg-white/[0.03] text-slate-400 hover:border-white/15 hover:text-white'
                  )}
                >
                  {item.label}
                  <ShieldCheck size={16} className="opacity-60" />
                </Link>
              ))}
            </nav>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-300 transition-all hover:bg-white/[0.06] hover:text-white"
            >
              <LogOut size={16} />
              Logout
            </button>
          </aside>

          <div className="space-y-6">{children}</div>
        </div>
      </div>
    </section>
  );
}
