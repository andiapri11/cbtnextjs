"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, User, LayoutDashboard, Settings, BookOpen, PenTool } from "lucide-react";

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (!token || !storedUser) {
            router.push("/login");
            return;
        }

        setUser(JSON.parse(storedUser));
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col p-6 space-y-8">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">S</div>
                    <span className="font-bold text-xl text-slate-800">ScholaCBT</span>
                </div>

                <nav className="flex-1 space-y-1">
                    <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
                    <NavItem icon={<BookOpen size={20} />} label="Subjects" />
                    <NavItem icon={<PenTool size={20} />} label="Exams" />
                    <NavItem icon={<Settings size={20} />} label="Settings" />
                </nav>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-semibold"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-800">Welcome, {user.name}</h1>
                        <p className="text-slate-500">Here's what's happening today.</p>
                    </div>

                    <div className="flex items-center gap-4 bg-white p-2 pr-6 rounded-full shadow-sm border border-slate-200">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
                            <User size={20} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-800">{user.name}</span>
                            <span className="text-[10px] font-bold text-indigo-500 tracking-wider uppercase">{user.role}</span>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard label="Total Students" value="1,280" change="+12%" />
                    <StatCard label="Active Exams" value="24" change="+4" />
                    <StatCard label="Results Pending" value="156" change="-5%" />
                </div>
            </main>
        </div>
    );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <button className={cn(
            "w-full flex items-center gap-3 p-3 rounded-xl transition-all font-semibold",
            active ? "bg-indigo-50 text-indigo-600" : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
        )}>
            {icon}
            <span>{label}</span>
        </button>
    );
}

function StatCard({ label, value, change }: { label: string, value: string, change: string }) {
    const isPositive = change.startsWith('+');
    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-sm font-bold text-slate-500 mb-1">{label}</p>
            <div className="flex items-end justify-between">
                <h3 className="text-4xl font-extrabold text-slate-800">{value}</h3>
                <span className={cn(
                    "text-xs font-bold px-2 py-1 rounded-full",
                    isPositive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                )}>
                    {change}
                </span>
            </div>
        </div>
    );
}

import { cn } from "@/lib/utils";
