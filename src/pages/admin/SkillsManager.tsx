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
    Search,
    AlertCircle,
    Globe,
    Laptop,
    Heart,
    GraduationCap
} from 'lucide-react';

type Skill = Database['public']['Tables']['skills']['Row'];

const CATEGORIES = [
    { id: 'technical', label: 'Technical Skills', icon: Laptop },
    { id: 'soft', label: 'Soft Skills', icon: Heart },
    { id: 'languages', label: 'Languages', icon: Globe },
    { id: 'teaching', label: 'Teaching Expertise', icon: GraduationCap },
];

export default function SkillsManager() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState<Partial<Skill>>({
        name: '',
        category: 'technical',
        proficiency: '',
        language: 'en',
        display_order: 0
    });

    useEffect(() => {
        fetchSkills();
    }, []);

    async function fetchSkills() {
        setLoading(true);
        const { data, error } = await supabase
            .from('skills')
            .select('*')
            .order('display_order', { ascending: true });

        if (error) {
            setError('Failed to fetch skills');
            console.error(error);
        } else {
            setSkills(data || []);
        }
        setLoading(false);
    }

    const handleEdit = (skill: Skill) => {
        setEditingId(skill.id);
        setFormData(skill);
        setIsAdding(false);
    };

    const handleCancel = () => {
        setEditingId(null);
        setIsAdding(false);
        setFormData({
            name: '',
            category: 'technical',
            proficiency: '',
            language: 'en',
            display_order: 0
        });
    };

    const handleSave = async () => {
        setError(null);
        if (!formData.name || !formData.category) {
            setError('Name and Category are required');
            return;
        }

        setLoading(true);
        const { error } = editingId
            ? await supabase.from('skills').update(formData).eq('id', editingId)
            : await supabase.from('skills').insert([formData as any]);

        if (error) {
            setError('Failed to save skill');
            console.error(error);
        } else {
            handleCancel();
            fetchSkills();
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this skill?')) return;

        setLoading(true);
        const { error } = await supabase.from('skills').delete().eq('id', id);
        if (error) {
            setError('Failed to delete skill');
            console.error(error);
        } else {
            fetchSkills();
        }
        setLoading(false);
    };

    const filteredSkills = skills.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-xl font-latin">
            {/* Search and Add Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-md">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                        type="text"
                        placeholder="Search skills..."
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
                    <span>Add New Skill</span>
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
                    <h3 className="text-h3 font-bold mb-lg">{editingId ? 'Edit Skill' : 'Add New Skill'}</h3>
                    <div className="grid md:grid-cols-2 gap-lg">
                        <div className="space-y-md">
                            <div>
                                <label htmlFor="skill-name" className="block text-small font-semibold mb-xs">Skill Name *</label>
                                <input
                                    id="skill-name"
                                    type="text"
                                    placeholder="e.g. Arabic Calligraphy"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 bg-neutral-50 dark:bg-background-dark-elevated border border-neutral-200 dark:border-neutral-800 rounded-md outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="skill-cat" className="block text-small font-semibold mb-xs">Category *</label>
                                <select
                                    id="skill-cat"
                                    title="Select Category"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-2 bg-neutral-50 dark:bg-background-dark-elevated border border-neutral-200 dark:border-neutral-800 rounded-md outline-none focus:ring-2 focus:ring-primary-500"
                                >
                                    {CATEGORIES.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="space-y-md">
                            <div className="grid grid-cols-2 gap-md">
                                <div>
                                    <label htmlFor="skill-lang" className="block text-small font-semibold mb-xs">Language</label>
                                    <select
                                        id="skill-lang"
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
                                    <label htmlFor="skill-order" className="block text-small font-semibold mb-xs">Order</label>
                                    <input
                                        id="skill-order"
                                        type="number"
                                        placeholder="0"
                                        value={formData.display_order || 0}
                                        onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                                        className="w-full px-4 py-2 bg-neutral-50 dark:bg-background-dark-elevated border border-neutral-200 dark:border-neutral-800 rounded-md outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="skill-prof" className="block text-small font-semibold mb-xs">Proficiency (Optional)</label>
                                <input
                                    id="skill-prof"
                                    type="text"
                                    placeholder="e.g. Native, Expert, 90%"
                                    value={formData.proficiency || ''}
                                    onChange={(e) => setFormData({ ...formData, proficiency: e.target.value })}
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
                            <span>{editingId ? 'Update' : 'Save'} Skill</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Skills List by Category */}
            <div className="grid lg:grid-cols-2 gap-lg">
                {CATEGORIES.map(cat => {
                    const catSkills = filteredSkills.filter(s => s.category === cat.id);
                    return (
                        <div key={cat.id} className="bg-white dark:bg-background-dark-surface rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
                            <div className="bg-neutral-50 dark:bg-background-dark-elevated px-xl py-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center space-x-3">
                                <cat.icon className="w-5 h-5 text-primary-600" />
                                <h3 className="font-bold text-neutral-900 dark:text-neutral-100 uppercase text-xs tracking-wider">{cat.label}</h3>
                            </div>
                            <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                                {catSkills.length === 0 ? (
                                    <div className="px-xl py-8 text-center text-xs text-neutral-500 italic">No skills in this category.</div>
                                ) : (
                                    catSkills.map(skill => (
                                        <div key={skill.id} className="px-xl py-3 flex items-center justify-between group hover:bg-neutral-50 dark:hover:bg-primary-900/5 transition-colors">
                                            <div>
                                                <div className="font-medium text-neutral-900 dark:text-neutral-100">{skill.name}</div>
                                                {skill.proficiency && <div className="text-xs text-neutral-500">{skill.proficiency}</div>}
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${skill.language === 'ar' ? 'bg-teal-100 text-teal-700' : 'bg-blue-100 text-blue-700'}`}>
                                                    {skill.language}
                                                </span>
                                                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => handleEdit(skill)} className="p-1.5 text-neutral-400 hover:text-primary-600 transition-colors" title="Edit">
                                                        <Pencil className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => handleDelete(skill.id)} className="p-1.5 text-neutral-400 hover:text-red-600 transition-colors" title="Delete">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
