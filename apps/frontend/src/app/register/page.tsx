import { AuthLayout } from '@/components/auth/auth-layout';
import { RegisterSchoolForm } from '@/components/auth/register-school-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Register School • ScholaCBT',
    description: 'Register your school to start using our smart assessment platform.',
};

export default function RegisterPage() {
    return (
        <AuthLayout
            title="Register School"
            subtitle="Start Your Enterprise Journey"
        >
            <RegisterSchoolForm />
        </AuthLayout>
    );
}
