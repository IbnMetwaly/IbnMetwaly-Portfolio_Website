import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Quote, ChevronDown, MessageSquareQuote } from 'lucide-react';
import { MasonryGrid } from '../components/MasonryGrid';
import TestimonialModal from '../components/TestimonialModal';
import { cn } from '../lib/utils';

interface Testimonial {
    id: number;
    content: string;
    author: string;
    role: 'Student' | 'Parent' | 'Colleague' | 'Alumni';
    institution: string;
    image: string;
    dir?: 'ltr' | 'rtl';
}

const mockTestimonials: Testimonial[] = [
    {
        id: 1,
        content: "The strategic vision implemented here has transformed not just the curriculum, but the entire cultural fabric of our institution. We've seen a 40% increase in student engagement under this leadership.",
        author: "Dr. Robert Chen",
        role: "Colleague",
        institution: "ENS UAE",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    {
        id: 2,
        content: "لقد وفرت لي هذه المنصة إمكانية الوصول إلى أحدث الأبحاث العلمية بكل سهولة. الدعم الفني متميز والبيئة الأكاديمية مشجعة جداً للابتكار والبحث العلمي المستمر.",
        author: "د. ليلى منصور",
        role: "Student",
        institution: "SIS Egypt",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        dir: 'rtl'
    },
    {
        id: 3,
        content: "As a parent, I've felt more connected to my child's educational journey than ever before. The transparency and innovation are unmatched.",
        author: "Sarah Jenkins",
        role: "Parent",
        institution: "ENS UAE",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    {
        id: 4,
        content: "The Scholarly platform has fundamentally changed how I approach peer review. The interface is intuitive, and the quality of academic discourse is unmatched.",
        author: "Dr. Sarah Jenkins",
        role: "Colleague",
        institution: "Academic Board",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
    },
    {
        id: 5,
        content: "A brilliant resource for parents navigating the complex world of higher education admissions.",
        author: "Elena Rodriguez",
        role: "Parent",
        institution: "Parent Association",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
    },
    {
        id: 6,
        content: "What sets this apart is the rigorous verification of all contributors. Knowing that the testimonials and reviews come from verified experts gives me confidence.",
        author: "Marcus Thorne",
        role: "Student",
        institution: "University Alumni",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    {
        id: 7,
        content: "The data-driven approach to student wellbeing has seen a measurable decline in stress-related absences across the board.",
        author: "Marcus Thorne",
        role: "Colleague",
        institution: "Aldar Education",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    {
        id: 8,
        content: "Leadership that actually listens. It's rare in academia, and it's why I've stayed at this institution for 10 years.",
        author: "Prof. Elena Rossi",
        role: "Colleague",
        institution: "ENS UAE",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    }
];

export default function Testimonials() {
    const { t, i18n } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', 'Parents', 'Students', 'Colleagues'];

    const filteredTestimonials = mockTestimonials.filter(item => {
        const matchesSearch = item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             item.content.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'All' || item.role + 's' === activeCategory || (activeCategory === 'Colleagues' && item.role === 'Colleague');

        // Handle plural/singular mapping for categories
        if (activeCategory === 'All') return matchesSearch;
        const roleMap: Record<string, string> = {
            'Parents': 'Parent',
            'Students': 'Student',
            'Colleagues': 'Colleague'
        };
        return matchesSearch && item.role === roleMap[activeCategory];
    });

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="pt-20 bg-neutral-50 dark:bg-background-dark-page min-h-screen">
            {/* Header Section */}
            <header className="max-w-7xl mx-auto px-lg pt-24 pb-16 text-center">
                <motion.h1
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="text-h1 font-bold text-neutral-900 dark:text-neutral-100 mb-4 tracking-tight"
                >
                    {t('testimonials.title')}
                </motion.h1>
                <motion.p
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    transition={{ delay: 0.1 }}
                    className="text-body-large text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    {t('testimonials.subtitle')}
                </motion.p>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    transition={{ delay: 0.2 }}
                >
                    <TestimonialModal
                        trigger={
                            <button className="inline-flex items-center space-x-2 rtl:space-x-reverse px-10 py-4 bg-primary-600 dark:bg-primary-400 text-white dark:text-neutral-900 font-semibold rounded-lg shadow-lg shadow-primary-600/20 dark:shadow-none hover:bg-primary-700 dark:hover:bg-primary-500 transition-all active:scale-95 group">
                                <MessageSquareQuote className="w-5 h-5 transition-transform group-hover:rotate-12" />
                                <span>{t('testimonials.ctaButton')}</span>
                            </button>
                        }
                    />
                </motion.div>
            </header>

            <main className="max-w-7xl mx-auto px-lg pb-24">
                {/* Search and Filter Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse bg-neutral-100 dark:bg-background-dark-surface p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={cn(
                                    "px-8 py-2.5 rounded font-medium transition-all",
                                    activeCategory === cat
                                        ? "bg-white dark:bg-background-dark-page text-primary-600 dark:text-primary-400 shadow-sm"
                                        : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                                )}
                            >
                                {t(`testimonials.categories.${cat.toLowerCase()}`)}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-primary-500 transition-colors" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t('testimonials.searchPlaceholder')}
                            className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-background-dark-surface border border-neutral-200 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none text-body dark:text-neutral-100 placeholder:text-neutral-400"
                        />
                    </div>
                </div>

                {/* Masonry Grid */}
                <MasonryGrid columns={3} gap={6}>
                    {filteredTestimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className={cn(
                                "group bg-white dark:bg-background-dark-surface p-8 rounded-xl border border-neutral-200 dark:border-neutral-800 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl-light dark:hover:shadow-lg-dark hover:border-primary-500/30",
                                testimonial.dir === 'rtl' && "text-right"
                            )}
                            dir={testimonial.dir || (i18n.language === 'ar' ? 'rtl' : 'ltr')}
                        >
                            <div className="mb-6">
                                <Quote className="w-10 h-10 text-primary-500 opacity-20 mb-4 rotate-180" />
                                <p className="text-body text-neutral-700 dark:text-neutral-300 leading-relaxed italic">
                                    "{testimonial.content}"
                                </p>
                            </div>
                            <div className={cn(
                                "flex items-center gap-4 border-t border-neutral-100 dark:border-neutral-800 pt-6",
                                testimonial.dir === 'rtl' && "flex-row-reverse"
                            )}>
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.author}
                                    className="w-12 h-12 rounded-lg object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ring-1 ring-neutral-200 dark:ring-neutral-700"
                                />
                                <div>
                                    <h4 className="font-bold text-small text-neutral-900 dark:text-neutral-100">{testimonial.author}</h4>
                                    <p className="text-[10px] uppercase tracking-wider text-primary-600 dark:text-primary-400 font-bold">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </MasonryGrid>

                {/* Empty State */}
                {filteredTestimonials.length === 0 && (
                    <div className="text-center py-20">
                        <MessageSquareQuote className="w-16 h-16 text-neutral-200 dark:text-neutral-800 mx-auto mb-4" />
                        <p className="text-neutral-500 dark:text-neutral-400">No testimonials found matching your criteria.</p>
                    </div>
                )}

                {/* View More CTA */}
                <div className="mt-24 text-center">
                    <button className="inline-flex items-center space-x-3 rtl:space-x-reverse px-12 py-4 bg-white dark:bg-background-dark-surface border border-neutral-200 dark:border-neutral-800 text-primary-600 dark:text-primary-400 font-semibold rounded-lg hover:bg-primary-600 dark:hover:bg-primary-400 hover:text-white dark:hover:text-neutral-900 transition-all duration-300 shadow-sm">
                        <span>{t('testimonials.viewMore')}</span>
                        <ChevronDown className="w-5 h-5" />
                    </button>
                </div>

                {/* Secondary CTA Section */}
                <div className="mt-32 p-12 bg-gradient-to-br from-white to-neutral-50 dark:from-background-dark-surface dark:to-background-dark-page border border-primary-500/20 rounded-2xl text-center space-y-6 shadow-sm">
                    <h2 className="text-h2 font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                        {t('testimonials.secondaryCTA.title')}
                    </h2>
                    <p className="text-body-large text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
                        {t('testimonials.secondaryCTA.description')}
                    </p>
                    <div className="pt-4">
                        <TestimonialModal
                            trigger={
                                <button className="px-8 py-3.5 bg-primary-600 dark:bg-primary-400 text-white dark:text-neutral-900 font-bold rounded-xl hover:bg-primary-700 dark:hover:bg-primary-500 transition-all transform hover:-translate-y-1">
                                    {t('testimonials.secondaryCTA.button')}
                                </button>
                            }
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
