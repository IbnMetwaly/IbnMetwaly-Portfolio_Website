import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import {
    Award,
    Trophy,
    MessageSquare,
    Users,
    ArrowUpRight,
    TrendingUp,
    Loader2
} from 'lucide-react';

export default function Dashboard() {
    const [stats, setStats] = useState({
        awards: 0,
        certifications: 0,
        testimonials: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            const [awardsRes, certsRes] = await Promise.all([
                supabase.from('awards').select('id', { count: 'exact' }),
                supabase.from('certifications').select('id', { count: 'exact' })
            ]);

            // For testimonials, we check the storage bucket
            const { data: testimonials } = await supabase.storage
                .from('Recognition')
                .list('Testimonials');

            setStats({
                awards: awardsRes.count || 0,
                certifications: certsRes.count || 0,
                testimonials: (testimonials?.length || 1) - 1, // Subtract placeholder if exists
            });
            setLoading(false);
        }

        fetchStats();
    }, []);

    const statCards = [
        { label: 'Total Awards', value: stats.awards, icon: Award, color: 'text-primary-600', bg: 'bg-primary-50 dark:bg-primary-900/20' },
        { label: 'Certifications', value: stats.certifications, icon: Trophy, color: 'text-accent-600', bg: 'bg-accent-50 dark:bg-accent-900/20' },
        { label: 'Testimonials', value: stats.testimonials, icon: MessageSquare, color: 'text-teal-600', bg: 'bg-teal-50 dark:bg-teal-900/20' },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-xl">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl p-xl text-white">
                <h1 className="text-h3 font-bold mb-xs">Welcome back, Admin!</h1>
                <p className="opacity-90">Manage your portfolio content and track your professional impact from one place.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-lg">
                {statCards.map((card, index) => (
                    <div key={index} className="bg-white dark:bg-background-dark-surface p-xl rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                        <div className="flex items-center justify-between mb-md">
                            <div className={`p-md rounded-lg ${card.bg}`}>
                                <card.icon className={`w-6 h-6 ${card.color}`} />
                            </div>
                            <TrendingUp className="w-5 h-5 text-neutral-400" />
                        </div>
                        <div>
                            <p className="text-neutral-500 dark:text-neutral-400 font-medium">{card.label}</p>
                            <h3 className="text-h2 font-bold text-neutral-900 dark:text-neutral-100">{card.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-lg">
                <div className="bg-white dark:bg-background-dark-surface p-xl rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                    <h3 className="text-h3 font-bold text-neutral-900 dark:text-neutral-100 mb-lg">Recent Activities</h3>
                    <div className="space-y-md">
                        <div className="flex items-center space-x-4 p-md rounded-md bg-neutral-50 dark:bg-background-dark-elevated">
                            <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                            <p className="text-small text-neutral-700 dark:text-neutral-300">New table schema for Awards created</p>
                            <span className="text-xs text-neutral-400 ms-auto">Just now</span>
                        </div>
                        <div className="flex items-center space-x-4 p-md rounded-md bg-neutral-50 dark:bg-background-dark-elevated">
                            <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                            <p className="text-small text-neutral-700 dark:text-neutral-300">Admin dashboard layout initialized</p>
                            <span className="text-xs text-neutral-400 ms-auto">2 mins ago</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-background-dark-surface p-xl rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                    <h3 className="text-h3 font-bold text-neutral-900 dark:text-neutral-100 mb-lg">Database Status</h3>
                    <div className="space-y-md text-small">
                        <div className="flex justify-between items-center py-sm border-b border-neutral-100 dark:border-neutral-800">
                            <span className="text-neutral-600 dark:text-neutral-400">Database Connection</span>
                            <span className="text-green-600 font-bold flex items-center">
                                <span className="w-2 h-2 rounded-full bg-green-600 me-2"></span>
                                Active
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-sm border-b border-neutral-100 dark:border-neutral-800">
                            <span className="text-neutral-600 dark:text-neutral-400">Tables Initialized</span>
                            <span className="text-neutral-900 dark:text-neutral-100 font-bold">4 / 4</span>
                        </div>
                        <div className="flex justify-between items-center py-sm">
                            <span className="text-neutral-600 dark:text-neutral-400">Storage Buckets</span>
                            <span className="text-neutral-900 dark:text-neutral-100 font-bold">1 Found</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
