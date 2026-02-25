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
    Award as AwardIcon,
    Search,
    AlertCircle
} from 'lucide-react';

type Award = Database['public']['Tables']['awards']['Row'];

export default function AwardsManager() {
    const [awards, setAwards] = useState<Award[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState<Partial<Award>>({
        title: '',
        organization: '',
        year: '',
        description: '',
        language: 'en',
        display_order: 0
    });

    useEffect(() => {
        fetchAwards();
    }, []);

    async function fetchAwards() {
        setLoading(true);
        const { data, error } = await supabase
            .from('awards')
            .select('*')
            .order('display_order', { ascending: true });

        if (error) {
            setError('Failed to fetch awards');
            console.error(error);
        } else {
            setAwards(data || []);
        }
        setLoading(false);
    }

    const handleEdit = (award: Award) => {
        setEditingId(award.id);
        setFormData(award);
        setIsAdding(false);
    };

    const handleCancel = () => {
        setEditingId(null);
        setIsAdding(false);
        setFormData({
            title: '',
            organization: '',
            year: '',
            description: '',
            language: 'en',
            display_order: 0
        });
    };

    const handleSave = async () => {
        setError(null);
        if (!formData.title || !formData.organization || !formData.year) {
            setError('Please fill in all required fields');
            return;
        }

        setLoading(true);
        const { error } = editingId
            ? await supabase.from('awards').update(formData).eq('id', editingId)
            : await supabase.from('awards').insert([formData as any]);

        if (error) {
            setError('Failed to save award');
            console.error(error);
        } else {
            handleCancel();
            fetchAwards();
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this award?')) return;

        setLoading(true);
        const { error } = await supabase.from('awards').delete().eq('id', id);
        if (error) {
            setError('Failed to delete award');
            console.error(error);
        } else {
            fetchAwards();
        }
        setLoading(false);
    };

    const filteredAwards = awards.filter(a =>
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.organization.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-xl font-latin">
            {/* Search and Add Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-md">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                        type="text"
                        placeholder="Search awards..."
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
                    <span>Add New Award</span>
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
                    <h3 className="text-h3 font-bold mb-lg">{editingId ? 'Edit Award' : 'Add New Award'}</h3>
                    <div className="grid md:grid-cols-2 gap-lg">
                        <div className="space-y-md">
                            <div>
                                <label htmlFor="award-title" className="block text-small font-semibold mb-xs">Award Title *</label>
                                <input
                                    id="award-title"
                                    type="text"
                                    placeholder="e.g. App Whisperer Award"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-2 bg-neutral-50 dark:bg-background-dark-elevated border border-neutral-200 dark:border-neutral-800 rounded-md outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="award-org" className="block text-small font-semibold mb-xs">Organization *</label>
                                <input
                                    id="award-org"
                                    type="text"
                                    placeholder="e.g. Al-Kharran School"
                                    value={formData.organization}
                                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                    className="w-full px-4 py-2 bg-neutral-50 dark:bg-background-dark-elevated border border-neutral-200 dark:border-neutral-800 rounded-md outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-md">
                                <div>
                                    <label htmlFor="award-year" className="block text-small font-semibold mb-xs">Year *</label>
                                    <input
                                        id="award-year"
                                        type="text"
                                        value={formData.year}
                                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                        placeholder="e.g. 2024"
                                        className="w-full px-4 py-2 bg-neutral-50 dark:bg-background-dark-elevated border border-neutral-200 dark:border-neutral-800 rounded-md outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="award-lang" className="block text-small font-semibold mb-xs">Language</label>
                                    <select
                                        id="award-lang"
                                        title="Select Language"
                                        value={formData.language}
                                        onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                                        className="w-full px-4 py-2 bg-neutral-50 dark:bg-background-dark-elevated border border-neutral-200 dark:border-neutral-800 rounded-md outline-none focus:ring-2 focus:ring-primary-500"
                                    >
                                        <option value="en">English</option>
                                        <option value="ar">Arabic</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-md">
                            <div>
                                <label htmlFor="award-desc" className="block text-small font-semibold mb-xs">Description</label>
                                <textarea
                                    id="award-desc"
                                    rows={4}
                                    placeholder="Award description..."
                                    value={formData.description || ''}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-2 bg-neutral-50 dark:bg-background-dark-elevated border border-neutral-200 dark:border-neutral-800 rounded-md outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                                />
                            </div>
                            <div>
                                <label htmlFor="award-order" className="block text-small font-semibold mb-xs">Display Order</label>
                                <input
                                    id="award-order"
                                    type="number"
                                    placeholder="0"
                                    value={formData.display_order || 0}
                                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                                    className="w-full px-4 py-2 bg-neutral-50 dark:bg-background-dark-elevated border border-neutral-200 dark:border-neutral-800 rounded-md outline-none focus:ring-2 focus:ring-primary-500"
                                />
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
                            <span>{editingId ? 'Update' : 'Save'} Award</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Awards List */}
            <div className="bg-white dark:bg-background-dark-surface rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-neutral-50 dark:bg-background-dark-elevated text-small font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                            <th className="px-xl py-4">Award</th>
                            <th className="px-xl py-4">Organization</th>
                            <th className="px-xl py-4">Year</th>
                            <th className="px-xl py-4">Lang</th>
                            <th className="px-xl py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                        {loading && awards.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-xl py-20 text-center">
                                    <Loader2 className="w-8 h-8 text-primary-500 animate-spin mx-auto" />
                                </td>
                            </tr>
                        ) : filteredAwards.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-xl py-20 text-center text-neutral-500">
                                    No awards found. Click "Add New Award" to get started.
                                </td>
                            </tr>
                        ) : (
                            filteredAwards.map((award) => (
                                <tr key={award.id} className="hover:bg-neutral-50 dark:hover:bg-primary-900/5 transition-colors group">
                                    <td className="px-xl py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded text-primary-600">
                                                <AwardIcon className="w-5 h-5" />
                                            </div>
                                            <span className="font-semibold text-neutral-900 dark:text-neutral-100">{award.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-xl py-4 text-neutral-600 dark:text-neutral-400">{award.organization}</td>
                                    <td className="px-xl py-4 text-neutral-600 dark:text-neutral-400">{award.year}</td>
                                    <td className="px-xl py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${award.language === 'ar' ? 'bg-teal-100 text-teal-700' : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {award.language}
                                        </span>
                                    </td>
                                    <td className="px-xl py-4 text-right">
                                        <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleEdit(award)}
                                                className="p-2 text-neutral-400 hover:text-primary-600 transition-colors"
                                                title="Edit"
                                            >
                                                <Pencil className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(award.id)}
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
