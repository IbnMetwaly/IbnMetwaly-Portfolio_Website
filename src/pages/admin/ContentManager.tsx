import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Database } from '../../types/supabase';
import {
    Save,
    Loader2,
    TrendingUp,
    Search,
    AlertCircle,
    FileText
} from 'lucide-react';

type SiteStat = Database['public']['Tables']['site_stats']['Row'];

export default function ContentManager() {
    const [stats, setStats] = useState<SiteStat[]>([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchStats();
    }, []);

    async function fetchStats() {
        setLoading(true);
        const { data, error } = await supabase
            .from('site_stats')
            .select('*')
            .order('display_order', { ascending: true });

        if (error) {
            setError('Failed to fetch site stats');
        } else {
            setStats(data || []);
            // If no stats, initialize with defaults
            if (data?.length === 0) {
                initializeStats();
            }
        }
        setLoading(false);
    }

    async function initializeStats() {
        const defaults = [
            { key: 'attainment', value: 96.5, suffix: '%', label_en: 'Student Attainment', label_ar: 'تحصيل الطلاب' },
            { key: 'stories', value: 68, suffix: 'K+', label_en: 'Stories Read', label_ar: 'القصص المقروءة' },
            { key: 'experience', value: 13, suffix: '+', label_en: 'Years of Experience', label_ar: 'سنوات الخبرة' },
            { key: 'ranking', value: 1, suffix: 'st', label_en: 'Global Ranking', label_ar: 'الترتيب العالمي' },
        ];
        await supabase.from('site_stats').insert(defaults);
        fetchStats();
    }

    const handleUpdateStat = async (stat: SiteStat) => {
        setUpdating(stat.id);
        const { error } = await supabase
            .from('site_stats')
            .update(stat)
            .eq('id', stat.id);

        if (error) {
            setError('Failed to update stat');
        }
        setUpdating(null);
    };

    return (
        <div className="space-y-xl font-latin">
            <div className="bg-white dark:bg-background-dark-surface p-xl rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <h3 className="text-h3 font-bold mb-lg flex items-center space-x-2">
                    <TrendingUp className="w-6 h-6 text-primary-600" />
                    <span>Professional Impact Stats</span>
                </h3>

                {error && (
                    <div className="mb-lg p-md bg-red-50 dark:bg-red-900/10 border border-red-200 text-red-600 rounded-md">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="py-20 text-center">
                        <Loader2 className="w-8 h-8 text-primary-500 animate-spin mx-auto" />
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-xl">
                        {stats.map((stat, idx) => (
                            <div key={stat.id} className="p-xl bg-neutral-50 dark:bg-background-dark-elevated rounded-lg space-y-md border border-neutral-100 dark:border-neutral-800">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-wider text-primary-600">{stat.key}</span>
                                    <button
                                        onClick={() => handleUpdateStat(stat)}
                                        disabled={updating === stat.id}
                                        className="text-primary-600 hover:text-primary-700 transition-colors disabled:opacity-50"
                                        title="Save Changes"
                                        aria-label={`Save changes for ${stat.key}`}
                                    >
                                        {updating === stat.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-md">
                                    <div>
                                        <label htmlFor={`stat-value-${stat.id}`} className="block text-xs font-semibold mb-1 text-neutral-500">Value</label>
                                        <input
                                            id={`stat-value-${stat.id}`}
                                            type="number"
                                            step="0.1"
                                            placeholder="e.g. 96.5"
                                            value={stat.value || 0}
                                            onChange={(e) => {
                                                const newStats = [...stats];
                                                newStats[idx].value = parseFloat(e.target.value);
                                                setStats(newStats);
                                            }}
                                            className="w-full px-3 py-1 bg-white dark:bg-background-dark-surface border border-neutral-200 dark:border-neutral-700 rounded outline-none focus:ring-1 focus:ring-primary-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={`stat-suffix-${stat.id}`} className="block text-xs font-semibold mb-1 text-neutral-500">Suffix</label>
                                        <input
                                            id={`stat-suffix-${stat.id}`}
                                            type="text"
                                            placeholder="e.g. %"
                                            value={stat.suffix || ''}
                                            onChange={(e) => {
                                                const newStats = [...stats];
                                                newStats[idx].suffix = e.target.value;
                                                setStats(newStats);
                                            }}
                                            className="w-full px-3 py-1 bg-white dark:bg-background-dark-surface border border-neutral-200 dark:border-neutral-700 rounded outline-none focus:ring-1 focus:ring-primary-500"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-md">
                                    <div>
                                        <label htmlFor={`stat-label-en-${stat.id}`} className="block text-xs font-semibold mb-1 text-neutral-500">Label (EN)</label>
                                        <input
                                            id={`stat-label-en-${stat.id}`}
                                            type="text"
                                            placeholder="Label in English"
                                            value={stat.label_en || ''}
                                            onChange={(e) => {
                                                const newStats = [...stats];
                                                newStats[idx].label_en = e.target.value;
                                                setStats(newStats);
                                            }}
                                            className="w-full px-3 py-1 bg-white dark:bg-background-dark-surface border border-neutral-200 dark:border-neutral-700 rounded outline-none focus:ring-1 focus:ring-primary-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={`stat-label-ar-${stat.id}`} className="block text-xs font-semibold mb-1 text-neutral-500">Label (AR)</label>
                                        <input
                                            id={`stat-label-ar-${stat.id}`}
                                            type="text"
                                            dir="rtl"
                                            placeholder="العنوان بالعربية"
                                            value={stat.label_ar || ''}
                                            onChange={(e) => {
                                                const newStats = [...stats];
                                                newStats[idx].label_ar = e.target.value;
                                                setStats(newStats);
                                            }}
                                            className="w-full px-3 py-1 bg-white dark:bg-background-dark-surface border border-neutral-200 dark:border-neutral-700 rounded outline-none focus:ring-1 focus:ring-primary-500 font-arabic"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="bg-white dark:bg-background-dark-surface p-xl rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm opacity-50 cursor-not-allowed">
                <h3 className="text-h3 font-bold mb-md flex items-center space-x-2">
                    <FileText className="w-6 h-6" />
                    <span>Page Content Editor</span>
                </h3>
                <p className="text-small italic text-neutral-500">Static content editing (Hero, About, Philosphy) is coming in the next version.</p>
            </div>
        </div>
    );
}
