import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Database } from '../../types/supabase';
import {
    Plus,
    Pencil,
    Trash2,
    Save,
    X,
    Loader2,
    Briefcase,
    Search,
    AlertCircle,
    PlusCircle,
    MinusCircle
} from 'lucide-react';

type Experience = Database['public']['Tables']['experience']['Row'];

export default function ExperienceManager() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState<Partial<Experience>>({
        title: '',
        organization: '',
        location: '',
        period: '',
        description: '',
        achievements: [],
        language: 'en',
        display_order: 0
    });

    useEffect(() => {
        fetchExperiences();
    }, []);

    async function fetchExperiences() {
        setLoading(true);
        const { data, error } = await supabase
            .from('experience')
            .select('*')
            .order('display_order', { ascending: true });

        if (error) {
            setError('Failed to fetch experiences');
            console.error(error);
        } else {
            setExperiences(data || []);
        }
        setLoading(false);
    }

    const handleEdit = (exp: Experience) => {
        setEditingId(exp.id);
        setFormData({
            ...exp,
            achievements: Array.isArray(exp.achievements) ? exp.achievements : []
        });
        setIsAdding(false);
    };

    const handleCancel = () => {
        setEditingId(null);
        setIsAdding(false);
        setFormData({
            title: '',
            organization: '',
            location: '',
            period: '',
            description: '',
            achievements: [],
            language: 'en',
            display_order: 0
        });
    };

    const handleSave = async () => {
        setError(null);
        if (!formData.title || !formData.organization || !formData.period) {
            setError('Title, Organization, and Period are required');
            return;
        }

        setLoading(true);
        const { error } = editingId
            ? await supabase.from('experience').update(formData).eq('id', editingId)
            : await supabase.from('experience').insert([formData as any]);

        if (error) {
            setError('Failed to save experience');
            console.error(error);
        } else {
            handleCancel();
            fetchExperiences();
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this experience entry?')) return;

        setLoading(true);
        const { error } = await supabase.from('experience').delete().eq('id', id);
        if (error) {
            setError('Failed to delete experience');
            console.error(error);
        } else {
            fetchExperiences();
        }
        setLoading(false);
    };

    const handleAddAchievement = () => {
        const achievements = [...(formData.achievements as string[] || []), ''];
        setFormData({ ...formData, achievements });
    };

    const handleRemoveAchievement = (index: number) => {
        const achievements = [...(formData.achievements as string[] || [])];
        achievements.splice(index, 1);
        setFormData({ ...formData, achievements });
    };

    const handleAchievementChange = (index: number, value: string) => {
        const achievements = [...(formData.achievements as string[] || [])];
        achievements[index] = value;
        setFormData({ ...formData, achievements });
    };

    const filteredExperiences = experiences.filter(e =>
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.organization.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-xl font-latin">
            {/* Search and Add Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-md">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                        type="text"
                        placeholder="Search experiences..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white dark:bg-background-dark-surface border border-neutral-200 dark:border-neutral-800 rounded-md focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                    />
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="flex items-center justify-center space-x-2 px-6 py-2 bg-primary-600 text-white rounded-md font-bold hover:bg-primary-700 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add New Experience</span>
                </button>
            </div>

            {error && (
                <div className="p-md bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-md flex items-center space-x-3 text-red-600 dark:text-red-400">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-small font-medium">{error}</span>
                </div>
            )}

            {/* Form (Add/Edit) */}
            {(isAdding || editingId) && (
                <div className="bg-white dark:bg-background-dark-surface p-xl rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-lg animate-in fade-in slide-in-from-top-4">
                    <h3 className="text-h3 font-bold mb-lg">{editingId ? 'Edit Experience' : 'Add New Experience'}</h3>
                    <div className="grid md:grid-cols-2 gap-lg">
                        <div className="space-y-md">
                            <div>
                                <label htmlFor="exp-title" className="block text-small font-semibold mb-xs">Title *</label>
                                <input
                                    id="exp-title"
                                    type="text"
                                    placeholder="e.g. Senior Educator"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-2 bg-neutral-50 dark:bg-background-dark-elevated border border-neutral-200 dark:border-neutral-800 rounded-md outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="exp-org" className="block text-small font-semibold mb-xs">Organization *</label>
                                <input
                                    id="exp-org"
                                    type="text"
                                    placeholder="e.g. Ministry of Education"
                                    value={formData.organization}
                                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                    className="w-full px-4 py-2 bg-neutral-50 dark:bg-background-dark-elevated border border-neutral-200 dark:border-neutral-800 rounded-md outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-md">
                                <div>
                                    <label htmlFor="exp-location" className="block text-small font-semibold mb-xs">Location</label>
                                    <input
                                        id="exp-location"
                                        type="text"
                                        placeholder="e.g. Dubai, UAE"
                                        value={formData.location || ''}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full px-4 py-2 bg-neutral-50 dark:bg-background-dark-elevated border border-neutral-200 dark:border-neutral-800 rounded-md outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="exp-period" className="block text-small font-semibold mb-xs">Period *</label>
                                    <input
                                        id="exp-period"
                                        type="text"
                                        placeholder="e.g. 2020 - Present"
                                        value={formData.period}
                                        onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                                        className="w-full px-4 py-2 bg-neutral-50 dark:bg-background-dark-elevated border border-neutral-200 dark:border-neutral-800 rounded-md outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-md">
                                <div>
                                    <label htmlFor="exp-lang" className="block text-small font-semibold mb-xs">Language</label>
                                    <select
                                        id="exp-lang"
                                        title="Select Language"
                                        value={formData.language}
                                        onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                                        className="w-full px-4 py-2 bg-neutral-50 dark:bg-background-dark-elevated border border-neutral-200 dark:border-neutral-800 rounded-md outline-none focus:ring-2 focus:ring-primary-500"
                                    >
                                        <option value="en">English</option>
                                        <option value="ar">Arabic</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="exp-order" className="block text-small font-semibold mb-xs">Display Order</label>
                                    <input
                                        id="exp-order"
                                        type="number"
                                        placeholder="0"
                                        value={formData.display_order || 0}
                                        onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                                        className="w-full px-4 py-2 bg-neutral-50 dark:bg-background-dark-elevated border border-neutral-200 dark:border-neutral-800 rounded-md outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-md">
                            <div>
                                <label htmlFor="exp-desc" className="block text-small font-semibold mb-xs">Description</label>
                                <textarea
                                    id="exp-desc"
                                    rows={3}
                                    placeholder="Brief overview..."
                                    value={formData.description || ''}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-2 bg-neutral-50 dark:bg-background-dark-elevated border border-neutral-200 dark:border-neutral-800 rounded-md outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                                />
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-xs">
                                    <label className="block text-small font-semibold">Achievements</label>
                                    <button
                                        type="button"
                                        onClick={handleAddAchievement}
                                        className="text-primary-600 hover:text-primary-700 text-xs font-bold flex items-center space-x-1"
                                    >
                                        <PlusCircle className="w-4 h-4" />
                                        <span>Add Item</span>
                                    </button>
                                </div>
                                <div className="space-y-sm max-h-48 overflow-y-auto p-1">
                                    {(formData.achievements as string[] || []).map((achievement, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <input
                                                type="text"
                                                placeholder="e.g. Managed 50+ students"
                                                value={achievement}
                                                onChange={(e) => handleAchievementChange(index, e.target.value)}
                                                className="flex-1 px-3 py-1 text-small bg-neutral-50 dark:bg-background-dark-elevated border border-neutral-200 dark:border-neutral-800 rounded outline-none focus:ring-1 focus:ring-primary-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveAchievement(index)}
                                                className="text-neutral-400 hover:text-red-600 transition-colors"
                                                title="Remove Achievement"
                                            >
                                                <MinusCircle className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                    {(formData.achievements as string[] || []).length === 0 && (
                                        <p className="text-xs text-neutral-500 italic">No achievements added yet.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-md mt-xl">
                        <button
                            onClick={handleCancel}
                            className="px-6 py-2 border border-neutral-200 dark:border-neutral-800 rounded-md font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="flex items-center space-x-2 px-6 py-2 bg-primary-600 text-white rounded-md font-bold hover:bg-primary-700 transition-colors disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                            <span>{editingId ? 'Update' : 'Save'} Experience</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Experience List */}
            <div className="bg-white dark:bg-background-dark-surface rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-neutral-50 dark:bg-background-dark-elevated text-small font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                            <th className="px-xl py-4">Title & Organization</th>
                            <th className="px-xl py-4">Period</th>
                            <th className="px-xl py-4 text-center">Lang</th>
                            <th className="px-xl py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                        {loading && experiences.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-xl py-20 text-center">
                                    <Loader2 className="w-8 h-8 text-primary-500 animate-spin mx-auto" />
                                </td>
                            </tr>
                        ) : filteredExperiences.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-xl py-20 text-center text-neutral-500">
                                    No experience entries found.
                                </td>
                            </tr>
                        ) : (
                            filteredExperiences.map((exp) => (
                                <tr key={exp.id} className="hover:bg-neutral-50 dark:hover:bg-primary-900/5 transition-colors group">
                                    <td className="px-xl py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded text-primary-600">
                                                <Briefcase className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-neutral-900 dark:text-neutral-100">{exp.title}</div>
                                                <div className="text-xs text-neutral-500">{exp.organization}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-xl py-4 text-small text-neutral-600 dark:text-neutral-400">{exp.period}</td>
                                    <td className="px-xl py-4 text-center">
                                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${exp.language === 'ar' ? 'bg-teal-100 text-teal-700' : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {exp.language}
                                        </span>
                                    </td>
                                    <td className="px-xl py-4 text-right">
                                        <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleEdit(exp)}
                                                className="p-2 text-neutral-400 hover:text-primary-600 transition-colors"
                                                title="Edit"
                                            >
                                                <Pencil className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(exp.id)}
                                                className="p-2 text-neutral-400 hover:text-red-600 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
