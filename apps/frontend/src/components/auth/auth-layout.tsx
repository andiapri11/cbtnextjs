"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#f8f9fa]">
            {/* Left Side: Illustration (Light Gray Background) */}
            <div className="hidden md:flex flex-1 items-center justify-center p-12 bg-[#f8f9fa]">
                <div className="relative w-full max-w-lg">
                    <img
                        src="https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7863.jpg"
                        alt="Login Illustration"
                        className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                    />
                </div>
            </div>

            {/* Right Side: Form (White Background) */}
            <main className="flex-1 bg-white flex items-center justify-center p-6 sm:p-10 md:p-16">
                <div className="max-w-[450px] w-full">
                    <header className="mb-8 md:mb-10 text-center md:text-left">
                        <p className="text-lg sm:text-xl font-medium text-slate-800 tracking-tight">Welcome to</p>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#6366f1] mt-1 tracking-tight">
                            ScholaCBT
                        </h1>
                    </header>

                    {children}
                </div>
            </main>
        </div>
    );
}
