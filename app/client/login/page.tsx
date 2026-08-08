import type { Metadata } from 'next';
import AuthForm from '@/components/forms/AuthForm';

export const metadata: Metadata = {
  title: 'Client Login | NextGenWebWorks',
  description: 'Log in to your NextGenWebWorks client portal to track projects, quotations, payments, milestones, and deliveries.',
};

export default function ClientLoginPage() {
  return (
    <section className="min-h-screen bg-[#050B18] pt-28 pb-14">
      <div className="container-custom flex justify-center">
        <AuthForm mode="login" roleIntent="CLIENT" />
      </div>
    </section>
  );
}
