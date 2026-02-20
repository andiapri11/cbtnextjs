import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { LoginFormValues } from '@/schemas/auth.schema';

export function useAuth() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const login = async (values: LoginFormValues) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.post('/auth/login', values);
            const { access_token, user } = response.data.data;

            localStorage.setItem('token', access_token);
            localStorage.setItem('user', JSON.stringify(user));

            return { success: true };
        } catch (err: any) {
            const message = err.response?.data?.message || 'Login gagal. Periksa kembali email dan password Anda.';
            setError(message);
            return { success: false, message };
        } finally {
            setIsLoading(false);
        }
    };

    const registerSchool = async (data: any) => {
        setIsLoading(true);
        setError(null);
        try {
            await api.post('/auth/register-school', data);
            return { success: true };
        } catch (err: any) {
            const message = err.response?.data?.message || 'Registrasi gagal. Silakan coba lagi.';
            setError(message);
            return { success: false, message };
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
    };

    return {
        login,
        registerSchool,
        logout,
        isLoading,
        error,
    };
}
