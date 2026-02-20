import { AuthLayout } from '@/components/auth/auth-layout';
import { LoginForm } from '@/components/auth/login-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login • ScholaCBT',
    description: 'Sign in to access your dashboard and manage exams.',
};

export default function LoginPage() {
    return (
        <AuthLayout
            title="Design School"
            subtitle="Sign in to your administration dashboard."
        >
            <LoginForm />
        </AuthLayout>
    );
}
