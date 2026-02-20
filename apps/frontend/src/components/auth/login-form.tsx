"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { loginSchema, LoginFormValues } from '@/schemas/auth.schema';
import { useRouter } from 'next/navigation';

export function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const { login, isLoading, error } = useAuth();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (values: LoginFormValues) => {
        const result = await login(values);
        if (result.success) {
            router.push('/dashboard');
        }
    };

    return (
        <div className="w-full space-y-6">
            {/* Social Login Buttons */}
            <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-slate-100 rounded-xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:bg-slate-50 transition-all font-semibold text-slate-700 text-sm">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                    <span>Login with Google</span>
                </button>
                <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-slate-100 rounded-xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:bg-slate-50 transition-all font-semibold text-slate-700 text-sm">
                    <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="w-5 h-5" />
                    <span>Login with Facebook</span>
                </button>
            </div>

            {/* Separator */}
            <div className="relative flex items-center justify-center py-2">
                <div className="w-full border-t border-slate-200"></div>
                <span className="absolute z-10 bg-white px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">or</span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex items-center gap-3 bg-red-50 border border-red-200 p-4 rounded-xl text-red-600"
                        >
                            <AlertCircle size={18} className="flex-shrink-0" />
                            <p className="text-sm font-semibold">{error}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="space-y-4">
                    <Input
                        {...register('email')}
                        label="Email"
                        placeholder="example@gmail.com"
                        type="email"
                        icon={<Mail size={20} />}
                        error={errors.email?.message}
                    />

                    <div className="relative">
                        <Input
                            {...register('password')}
                            label="Password"
                            placeholder="••••••••••••"
                            type={showPassword ? 'text' : 'password'}
                            icon={<Lock size={20} />}
                            error={errors.password?.message}
                            rightElement={
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-slate-400 hover:text-slate-600 transition-colors p-2"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            }
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 text-xs font-bold px-1">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-500">
                        <input type="checkbox" className="rounded border-slate-300 text-[#6366f1] focus:ring-[#6366f1]/20 w-4 h-4" />
                        Remember me
                    </label>
                    <button type="button" className="text-[#6366f1] hover:underline">
                        Forgot Password?
                    </button>
                </div>

                <Button
                    type="submit"
                    className="w-full py-4 text-base font-bold bg-[#6366f1] hover:bg-[#5255e3] rounded-xl shadow-lg shadow-indigo-100 transition-all hover:translate-y-[-1px]"
                    isLoading={isLoading}
                >
                    Login
                </Button>
            </form>

            <div className="text-center text-sm font-bold text-slate-500 pt-2">
                Don't have an account? <button onClick={() => router.push('/register')} className="text-[#6366f1] hover:underline">Register</button>
            </div>
        </div>
    );
}
