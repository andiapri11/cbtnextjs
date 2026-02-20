import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
    rightElement?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, icon, rightElement, ...props }, ref) => {
        return (
            <div className="w-full text-left">
                <div className={cn(
                    "relative group flex items-center bg-[#eeeeee] border-2 border-transparent rounded-xl px-5 py-3.5 transition-all focus-within:bg-white focus-within:border-[#6366f1]/20 focus-within:ring-4 focus-within:ring-[#6366f1]/5",
                    error && "border-red-200 bg-white"
                )}>
                    {icon && (
                        <div className="mr-4 text-slate-800 flex-shrink-0">
                            {icon}
                        </div>
                    )}
                    <div className="flex-1 flex flex-col min-w-0">
                        {label && (
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
                                {label}
                            </label>
                        )}
                        <input
                            ref={ref}
                            className={cn(
                                "w-full bg-transparent outline-none text-[14px] font-bold text-slate-900 placeholder:text-slate-300",
                                className
                            )}
                            {...props}
                        />
                    </div>
                    {rightElement && (
                        <div className="ml-2 flex-shrink-0">
                            {rightElement}
                        </div>
                    )}
                </div>
                {error && (
                    <p className="text-[11px] font-bold text-red-500 ml-1 mt-1.5 animate-in fade-in slide-in-from-top-1">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
