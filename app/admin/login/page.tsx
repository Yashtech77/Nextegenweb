import type { Metadata } from 'next';
import AuthForm from '@/components/forms/AuthForm';

export const metadata: Metadata = {
  title: 'Admin Login | NextGenWebWorks',
  description: 'Secure admin access for project operations, quotations, milestones, files, and payment workflows.',
};

export default function AdminLoginPage() {
  return (
    <section className="min-h-screen bg-[#050B18] pt-28 pb-14">
      <div className="container-custom flex justify-center">
        <AuthForm mode="login" roleIntent="ADMIN" />
      </div>
    </section>
  );
}
