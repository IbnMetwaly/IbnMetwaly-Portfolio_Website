import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import {
    Upload,
    Trash2,
    Loader2,
    Image as ImageIcon,
    Search,
    AlertCircle,
    X
} from 'lucide-react';

export default function TestimonialsManager() {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    async function fetchTestimonials() {
        setLoading(true);
        const { data, error } = await supabase.storage
            .from('Recognition')
            .list('Testimonials', {
                limit: 100,
                offset: 0,
                sortBy: { column: 'name', order: 'asc' }
            });

        if (error) {
            setError('Failed to fetch testimonials');
        } else if (data) {
            const files = data.filter(file => file.name && file.name !== '.emptyFolderPlaceholder');
            setTestimonials(files);
        }
        setLoading(false);
    }

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setError(null);

        const fileName = `${Date.now()}-${file.name}`;
        const { error } = await supabase.storage
            .from('Recognition')
            .upload(`Testimonials/${fileName}`, file);

        if (error) {
            setError('Failed to upload testimonial');
        } else {
            fetchTestimonials();
        }
        setUploading(false);
    };

    const handleDelete = async (name: string) => {
        if (!confirm('Are you sure you want to delete this testimonial?')) return;

        setLoading(true);
        const { error } = await supabase.storage
            .from('Recognition')
            .remove([`Testimonials/${name}`]);

        if (error) {
            setError('Failed to delete testimonial');
        } else {
            fetchTestimonials();
        }
        setLoading(false);
    };

    const filtered = testimonials.filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-xl font-latin">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-md">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                        type="text"
                        id="search-testimonials"
                        aria-label="Search testimonials"
                        placeholder="Search testimonials..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white dark:bg-background-dark-surface border border-neutral-200 dark:border-neutral-800 rounded-md outline-none"
                    />
                </div>
                <div className="flex items-center">
                    <label className="flex items-center justify-center space-x-2 px-6 py-2 bg-primary-600 text-white rounded-md font-bold hover:bg-primary-700 cursor-pointer transition-colors">
                        {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                        <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} aria-label="Upload testimonial image" />
                    </label>
                </div>
            </div>

            {error && (
                <div className="p-md bg-red-50 dark:bg-red-900/10 border border-red-200 text-red-600 rounded-md flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5" />
                    <span>{error}</span>
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-lg">
                {loading && testimonials.length === 0 ? (
                    <div className="col-span-full py-20 text-center">
                        <Loader2 className="w-8 h-8 text-primary-500 animate-spin mx-auto" />
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="col-span-full py-20 text-center text-neutral-500">
                        No testimonials found.
                    </div>
                ) : (
                    filtered.map((file) => {
                        const publicUrl = `https://isbicrdzbyxeckyckrmg.supabase.co/storage/v1/object/public/Recognition/Testimonials/${file.name}`;
                        return (
                            <div key={file.id} className="group relative bg-white dark:bg-background-dark-surface rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 aspect-square shadow-sm">
                                <img src={publicUrl} alt={file.name} className="w-full h-full object-cover" loading="lazy" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button
                                        onClick={() => handleDelete(file.name)}
                                        className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                                        title="Delete Testimonial"
                                        aria-label={`Delete testimonial ${file.name}`}
                                    >
                                        <Trash2 className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
