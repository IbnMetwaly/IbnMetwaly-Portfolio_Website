import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import {
    LayoutDashboard,
    Trophy,
    Award,
    FileText,
    LogOut,
    Home as HomeIcon,
    MessageSquare,
    Settings,
    Briefcase,
    Zap,
    Mail
} from 'lucide-react';

export default function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        { icon: Briefcase, label: 'Journey', path: '/admin/journey' },
        { icon: Zap, label: 'Skills', path: '/admin/skills' },
        { icon: Award, label: 'Awards', path: '/admin/awards' },
        { icon: Trophy, label: 'Certifications', path: '/admin/certifications' },
        { icon: MessageSquare, label: 'Testimonials', path: '/admin/testimonials' },
        { icon: FileText, label: 'Site Content', path: '/admin/content' },
        { icon: Mail, label: 'Messages', path: '/admin/messages' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];

    return (
        <div className="flex min-h-screen bg-neutral-50 dark:bg-background-dark-page font-latin">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-background-dark-surface border-e border-neutral-200 dark:border-neutral-800 flex flex-col">
                <div className="p-xl border-b border-neutral-200 dark:border-neutral-800">
                    <Link to="/" className="flex items-center space-x-2 text-primary-600 dark:text-primary-400">
                        <HomeIcon className="w-6 h-6" />
                        <span className="font-bold text-lg">Portfolio Admin</span>
                    </Link>
                </div>

                <nav className="flex-1 p-md space-y-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${location.pathname === item.path
                                ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-md border-t border-neutral-200 dark:border-neutral-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-3 w-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-md transition-colors font-medium"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="h-16 bg-white dark:bg-background-dark-surface border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between px-xl">
                    <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                        {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
                    </h2>
                    <div className="flex items-center space-x-4">
                        <span className="text-small text-neutral-500 dark:text-neutral-400 italic">
                            Logged in as Admin
                        </span>
                    </div>
                </header>

                <div className="p-xl">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
