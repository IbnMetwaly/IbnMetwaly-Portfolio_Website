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
    Trophy,
    Search,
    AlertCircle,
    Link as LinkIcon
} from 'lucide-react';

type Certification = Database['public']['Tables']['certifications']['Row'];

export default function CertificationsManager() {
    const [certs, setCerts] = useState<Certification[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<Partial<Certification>>({
        title: '',
        organization: '',
        year: '',
        type: 'core',
        language: 'en',
        display_order: 0,
        certificate_path: ''
    });

    useEffect(() => {
        fetchCerts();
    }, []);

    async function fetchCerts() {
        setLoading(true);
        const { data, error } = await supabase
            .from('certifications')
            .select('*')
            .order('display_order', { ascending: true });

        if (error) {
            setError('Failed to fetch certifications');
        } else {
            setCerts(data || []);
        }
        setLoading(false);
    }

    const handleCancel = () => {
        setEditingId(null);
        setIsAdding(false);
        setFormData({
            title: '',
            organization: '',
            year: '',
            type: 'core',
            language: 'en',
            display_order: 0,
            certificate_path: ''
        });
    };

    const handleEdit = (cert: Certification) => {
        setEditingId(cert.id);
        setFormData(cert);
        setIsAdding(false);
    };

    const handleSave = async () => {
        setError(null);
        if (!formData.title || !formData.year || !formData.type) {
            setError('Title, Year, and Type are required');
            return;
        }

        setLoading(true);
        const { error } = editingId
            ? await supabase.from('certifications').update(formData).eq('id', editingId)
            : await supabase.from('certifications').insert([formData as any]);

        if (error) {
            setError('Failed to save certification');
        } else {
            handleCancel();
            fetchCerts();
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        setLoading(true);
        await supabase.from('certifications').delete().eq('id', id);
        fetchCerts();
    };

    const filteredCerts = certs.filter(c =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.organization?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-xl font-latin">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-md">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                        type="text"
                        placeholder="Search certifications..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white dark:bg-background-dark-surface border border-neutral-200 dark:border-neutral-800 rounded-md outline-none focus:ring-2 focus:ring-primary-500"
                    />
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="flex items-center justify-center space-x-2 px-6 py-2 bg-primary-600 text-white rounded-md font-bold hover:bg-primary-700"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Certification</span>
                </button>
            </div>

            {error && (
                <div className="p-md bg-red-50 dark:bg-red-900/10 border border-red-200 text-red-600 rounded-md flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5" />
                    <span>{error}</span>
                </div>
            )}

            {(isAdding || editingId) && (
                <div className="bg-white dark:bg-background-dark-surface p-xl rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-lg">
                    <h3 className="text-h3 font-bold mb-lg">{editingId ? 'Edit Certification' : 'Add Certification'}</h3>
                    <div className="grid md:grid-cols-2 gap-lg">
                        <div className="space-y-md">
                            <div>
                                <label htmlFor="cert-title" className="block text-small font-semibold mb-xs">Title *</label>
                                <input
                                    id="cert-title"
                                    type="text"
                                    placeholder="e.g. Certified Microsoft Innovative Educator"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-2 bg-neutral-50 dark:bg-background-dark-elevated border border-neutral-200 dark:border-neutral-800 rounded-md outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="cert-org" className="block text-small font-semibold mb-xs">Organization</label>
                                <input
                                    id="cert-org"
                                    type="text"
                                    placeholder="e.g. Microsoft Educator Center"
                                    value={formData.organization || ''}
                                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                    className="w-full px-4 py-2 bg-neutral-50 dark:bg-background-dark-elevated border border-neutral-200 dark:border-neutral-800 rounded-md outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-md">
                                <div>
                                    <label htmlFor="cert-year" className="block text-small font-semibold mb-xs">Year *</label>
                                    <input
                                        id="cert-year"
                                        type="text"
                                        placeholder="e.g. 2020"
                                        value={formData.year}
                                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                        className="w-full px-4 py-2 bg-neutral-50 dark:bg-background-dark-elevated border border-neutral-200 dark:border-neutral-800 rounded-md outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="cert-type" className="block text-small font-semibold mb-xs">Type *</label>
                                    <select
                                        id="cert-type"
                                        title="Select Certification Type"
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                                        className="w-full px-4 py-2 bg-neutral-50 dark:bg-background-dark-elevated border border-neutral-200 dark:border-neutral-800 rounded-md outline-none focus:ring-2 focus:ring-primary-500"
                                    >
                                        <option value="license">Professional License</option>
                                        <option value="core">Core Certification</option>
                                        <option value="pd">Professional Development</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-md">
                            <div>
                                <label htmlFor="cert-path" className="block text-small font-semibold mb-xs">Certificate URL/Path</label>
                                <input
                                    id="cert-path"
                                    type="text"
                                    placeholder="certifications/cert1.pdf"
                                    value={formData.certificate_path || ''}
                                    onChange={(e) => setFormData({ ...formData, certificate_path: e.target.value })}
                                    className="w-full px-4 py-2 bg-neutral-50 dark:bg-background-dark-elevated border border-neutral-200 dark:border-neutral-800 rounded-md outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-md">
                                <div>
                                    <label htmlFor="cert-lang" className="block text-small font-semibold mb-xs">Language</label>
                                    <select
                                        id="cert-lang"
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
                                    <label htmlFor="cert-order" className="block text-small font-semibold mb-xs">Order</label>
                                    <input
                                        id="cert-order"
                                        type="number"
                                        placeholder="0"
                                        value={formData.display_order || 0}
                                        onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                                        className="w-full px-4 py-2 bg-neutral-50 dark:bg-background-dark-elevated border border-neutral-200 dark:border-neutral-800 rounded-md outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-md mt-xl">
                        <button onClick={handleCancel} className="px-6 py-2 border border-neutral-200 dark:border-neutral-800 rounded-md font-semibold">Cancel</button>
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="flex items-center space-x-2 px-6 py-2 bg-primary-600 text-white rounded-md font-bold hover:bg-primary-700 disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                            <span>Save</span>
                        </button>
                    </div>
                </div>
            )}

            <div className="bg-white dark:bg-background-dark-surface rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-neutral-50 dark:bg-background-dark-elevated text-xs font-bold uppercase text-neutral-500">
                        <tr>
                            <th className="px-xl py-4">Certification</th>
                            <th className="px-xl py-4">Type</th>
                            <th className="px-xl py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                        {filteredCerts.map((cert) => (
                            <tr key={cert.id} className="group hover:bg-neutral-50 dark:hover:bg-primary-900/5 transition-colors">
                                <td className="px-xl py-4">
                                    <div className="flex items-center space-x-3">
                                        <Trophy className="w-5 h-5 text-accent-500" />
                                        <div>
                                            <p className="font-semibold text-neutral-900 dark:text-neutral-100">{cert.title}</p>
                                            <p className="text-xs text-neutral-500">{cert.organization} • {cert.year}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-xl py-4">
                                    <span className="text-xs font-bold uppercase bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
                                        {cert.type}
                                    </span>
                                </td>
                                <td className="px-xl py-4 text-right">
                                    <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleEdit(cert)}
                                            className="p-2 text-neutral-400 hover:text-primary-600"
                                            title="Edit Certification"
                                            aria-label={`Edit ${cert.title}`}
                                        >
                                            <Pencil className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(cert.id)}
                                            className="p-2 text-neutral-400 hover:text-red-600"
                                            title="Delete Certification"
                                            aria-label={`Delete ${cert.title}`}
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
