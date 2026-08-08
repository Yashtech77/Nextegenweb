'use client';

import { FormEvent, Suspense, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, LockKeyhole, Mail, UserRound } from 'lucide-react';

interface AuthFormProps {
  mode: 'login' | 'signup';
  roleIntent?: 'CLIENT' | 'ADMIN';
}

export default function AuthForm({ mode, roleIntent = 'CLIENT' }: AuthFormProps) {
  return (
    <Suspense fallback={<AuthFormContent mode={mode} roleIntent={roleIntent} presetEmail="" />}>
      <AuthFormInner mode={mode} roleIntent={roleIntent} />
    </Suspense>
  );
}

function AuthFormInner({ mode, roleIntent }: AuthFormProps) {
  const searchParams = useSearchParams();
  const presetEmail = searchParams.get('email') ?? '';

  return <AuthFormContent mode={mode} roleIntent={roleIntent} presetEmail={presetEmail} />;
}

interface AuthFormContentProps extends AuthFormProps {
  presetEmail: string;
}

function AuthFormContent({ mode, roleIntent = 'CLIENT', presetEmail }: AuthFormContentProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const title = useMemo(
    () =>
      mode === 'login'
        ? roleIntent === 'ADMIN'
          ? 'Admin Access'
          : 'Welcome Back to Your Client Portal'
        : 'Create Your Client Workspace',
    [mode, roleIntent]
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      setLoading(true);
      setError(null);

      const payload =
        mode === 'login'
          ? {
              email: formData.get('email'),
              password: formData.get('password'),
              expectedRole: roleIntent,
            }
          : {
              name: formData.get('name'),
              companyName: formData.get('companyName'),
              email: formData.get('email'),
              password: formData.get('password'),
              confirmPassword: formData.get('confirmPassword'),
            };

      const response = await fetch(`/api/auth/${mode === 'login' ? 'login' : 'signup'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? 'Unable to continue.');
        return;
      }

      router.push(data.redirectTo ?? (data.user.role === 'ADMIN' ? '/admin' : '/dashboard'));
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass-card w-full max-w-xl p-7 sm:p-9">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-purple-300">
          Secure Access
        </div>
        <h1 className="mt-4 font-display text-3xl font-black text-white sm:text-4xl">{title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          {mode === 'login'
            ? roleIntent === 'ADMIN'
              ? 'Review inquiries, manage quotations, operate payments, and control project delivery.'
              : 'Track projects, review quotations, and pay invoices from one premium workspace.'
            : 'Create your account to manage inquiries, payments, milestones, and delivery files.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'signup' ? (
          <>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-300">Full Name</span>
              <div className="flex items-center gap-3 rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-white">
                <UserRound size={16} className="text-slate-500" />
                <input name="name" placeholder="Ava Johnson" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500" />
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-300">Company</span>
              <div className="rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-white">
                <input name="companyName" placeholder="Nova Labs" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500" />
              </div>
            </label>
          </>
        ) : null}

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-300">Email</span>
          <div className="flex items-center gap-3 rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-white">
            <Mail size={16} className="text-slate-500" />
            <input
              name="email"
              type="email"
              defaultValue={presetEmail}
              placeholder="you@company.com"
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-300">Password</span>
          <div className="flex items-center gap-3 rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-white">
            <LockKeyhole size={16} className="text-slate-500" />
            <input
              name="password"
              type="password"
              placeholder="Minimum 8 characters"
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
            />
          </div>
        </label>

        {mode === 'signup' ? (
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-300">Confirm Password</span>
            <div className="rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-white">
              <input
                name="confirmPassword"
                type="password"
                placeholder="Re-enter password"
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
              />
            </div>
          </label>
        ) : null}

        {error ? <p className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p> : null}

        <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4">
          {loading
            ? 'Please wait...'
            : mode === 'login'
              ? roleIntent === 'ADMIN'
                ? 'Login to Admin Panel'
                : 'Login to Client Dashboard'
              : 'Create Account'}
          <ArrowRight size={16} />
        </button>
      </form>

      {roleIntent !== 'ADMIN' ? (
        <p className="mt-5 text-sm text-slate-500">
          {mode === 'login' ? 'Need an account?' : 'Already have an account?'}{' '}
          <Link
            href={mode === 'login' ? '/auth/signup' : '/client/login'}
            className="font-medium text-purple-300 hover:text-purple-200"
          >
            {mode === 'login' ? 'Sign up' : 'Log in'}
          </Link>
        </p>
      ) : null}
    </div>
  );
}
