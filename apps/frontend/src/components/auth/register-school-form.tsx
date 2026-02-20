"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User, Building2, Globe, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { schoolRegisterSchema, SchoolRegisterValues } from '@/schemas/school.schema';

export function RegisterSchoolForm() {
    const [showPassword, setShowPassword] = useState(false);
    const { registerSchool, isLoading, error } = useAuth();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SchoolRegisterValues>({
        resolver: zodResolver(schoolRegisterSchema),
    });

    const onSubmit = async (values: SchoolRegisterValues) => {
        const result = await registerSchool(values);
        if (result.success) {
            router.push('/login?registered=true');
        }
    };

    return (
        <div className="w-full space-y-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex items-center gap-3 bg-red-50 border-2 border-red-100 p-5 rounded-3xl text-red-600 shadow-sm"
                        >
                            <AlertCircle size={20} className="flex-shrink-0" />
                            <p className="text-sm font-bold">{error}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="space-y-5">
                    {/* School Info Section */}
                    <div className="space-y-4">
                        <Input
                            {...register('schoolName')}
                            label="School Name"
                            placeholder="SMA Negeri 1 Jakarta"
                            icon={<Building2 size={20} />}
                            error={errors.schoolName?.message}
                        />
                    </div>

                    <div className="h-px bg-slate-100 w-full my-6"></div>

                    {/* Admin Info Section */}
                    <div className="space-y-4">
                        <Input
                            {...register('adminName')}
                            label="Admin Name"
                            placeholder="John Doe"
                            icon={<User size={20} />}
                            error={errors.adminName?.message}
                        />

                        <Input
                            {...register('adminEmail')}
                            label="Admin Email"
                            placeholder="admin@school.com"
                            type="email"
                            icon={<Mail size={20} />}
                            error={errors.adminEmail?.message}
                        />

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
                                    className="text-slate-400 hover:text-indigo-600 transition-colors p-2"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            }
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    className="w-full py-5 text-[16px] font-black bg-[#625be3] hover:bg-[#524ac7] rounded-[2rem] shadow-[0_15px_30px_-5px_rgba(98,91,227,0.3)] transition-all hover:translate-y-[-2px]"
                    isLoading={isLoading}
                >
                    Register School
                </Button>
            </form>

            <div className="text-center text-[15px] font-bold text-slate-500 pt-4">
                Already have an account? <button onClick={() => router.push('/login')} className="text-indigo-600 font-extrabold hover:underline ml-1">Login</button>
            </div>
        </div>
    );
}
