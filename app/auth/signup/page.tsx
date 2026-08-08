import type { Metadata } from 'next';
import AuthForm from '@/components/forms/AuthForm';

export const metadata: Metadata = {
  title: 'Create Client Account | NextGenWebWorks',
  description: 'Create your NextGenWebWorks client account to manage project requests, quotations, milestone updates, and payments.',
};

export default function SignupPage() {
  return (
    <section className="min-h-screen bg-[#050B18] pt-28 pb-14">
      <div className="container-custom flex justify-center">
        <AuthForm mode="signup" />
      </div>
    </section>
  );
}
