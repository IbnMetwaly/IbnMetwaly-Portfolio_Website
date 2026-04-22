import React, { useEffect, useState } from 'react';
import {
    Loader2,
    Search,
    AlertCircle,
} from 'lucide-react';
import { fetchBlobFileList, getBlobPublicUrl } from '../../lib/blobStorage';

export default function TestimonialsManager() {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    async function fetchTestimonials() {
        setLoading(true);
        try {
            const files = await fetchBlobFileList('Testimonials/manifest.json');
            setTestimonials(files);
        } catch {
            setError('Failed to fetch testimonials. Make sure Testimonials/manifest.json exists in Blob storage.');
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
                <p className="text-small text-neutral-600 dark:text-neutral-400">
                    Manage testimonial files directly in Vercel Blob and update <code>Testimonials/manifest.json</code>.
                </p>
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
                        const publicUrl = getBlobPublicUrl(file.path);
                        return (
                            <div key={file.path} className="group relative bg-white dark:bg-background-dark-surface rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 aspect-square shadow-sm">
                                <img src={publicUrl} alt={file.name} className="w-full h-full object-cover" loading="lazy" />
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
