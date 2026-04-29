import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, CloudUpload, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

interface TestimonialModalProps {
    trigger: React.ReactNode;
}

export default function TestimonialModal({ trigger }: TestimonialModalProps) {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => {
            setIsOpen(false);
            // Reset after modal closes
            setTimeout(() => setIsSubmitted(false), 300);
        }, 3000);
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) setIsSubmitted(false);
        }}>
            <Dialog.Trigger asChild>
                {trigger}
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-50 transition-all duration-300" />
                <Dialog.Content
                    asChild
                    className="fixed left-[50%] top-[50%] z-50 w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] outline-none"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="bg-white dark:bg-background-dark-surface rounded-xl shadow-2xl overflow-hidden"
                    >
                        <div className="p-10">
                            <div className="flex justify-between items-center mb-8">
                                <Dialog.Title className="text-h3 font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                                    {isSubmitted ? t('testimonials.modal.successTitle') : t('testimonials.modal.title')}
                                </Dialog.Title>
                                <Dialog.Close className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors active:scale-90">
                                    <X className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                                    <span className="sr-only">Close</span>
                                </Dialog.Close>
                            </div>

                            <AnimatePresence mode="wait">
                                {isSubmitted ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-12 text-center space-y-4"
                                    >
                                        <CheckCircle2 className="w-20 h-20 text-semantic-success mx-auto" />
                                        <p className="text-body-large font-medium text-neutral-900 dark:text-neutral-100">
                                            {t('testimonials.modal.successMessage')}
                                        </p>
                                        <p className="text-small text-neutral-600 dark:text-neutral-400">
                                            {t('testimonials.modal.successDescription')}
                                        </p>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="space-y-6"
                                        onSubmit={handleSubmit}
                                    >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-small font-medium text-neutral-700 dark:text-neutral-300">
                                            {t('testimonials.modal.fullName')}
                                        </label>
                                        <input
                                            className="w-full px-4 py-3 bg-neutral-50 dark:bg-background-dark-page border border-neutral-200 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none text-body dark:text-neutral-100"
                                            placeholder={t('testimonials.modal.fullNamePlaceholder')}
                                            required
                                            type="text"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="role-select" className="block text-small font-medium text-neutral-700 dark:text-neutral-300">
                                            {t('testimonials.modal.role')}
                                        </label>
                                        <select
                                            id="role-select"
                                            title={t('testimonials.modal.role')}
                                            className="w-full px-4 py-3 bg-neutral-50 dark:bg-background-dark-page border border-neutral-200 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none text-body dark:text-neutral-100 appearance-none"
                                            required
                                            defaultValue=""
                                        >
                                            <option disabled value="">{t('testimonials.modal.selectRole')}</option>
                                            <option value="parent">{t('testimonials.categories.parents')}</option>
                                            <option value="student">{t('testimonials.categories.students')}</option>
                                            <option value="colleague">{t('testimonials.categories.colleagues')}</option>
                                            <option value="alumni">Alumni</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-small font-medium text-neutral-700 dark:text-neutral-300">
                                            {t('testimonials.modal.institution')}
                                        </label>
                                        <input
                                            className="w-full px-4 py-3 bg-neutral-50 dark:bg-background-dark-page border border-neutral-200 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none text-body dark:text-neutral-100"
                                            placeholder={t('testimonials.modal.institutionPlaceholder')}
                                            required
                                            type="text"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-small font-medium text-neutral-700 dark:text-neutral-300">
                                            {t('testimonials.modal.year')}
                                        </label>
                                        <input
                                            className="w-full px-4 py-3 bg-neutral-50 dark:bg-background-dark-page border border-neutral-200 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none text-body dark:text-neutral-100"
                                            max="2025"
                                            min="1990"
                                            placeholder={t('testimonials.modal.yearPlaceholder')}
                                            required
                                            type="number"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-small font-medium text-neutral-700 dark:text-neutral-300">
                                        {t('testimonials.modal.profileImage')}
                                    </label>
                                    <div className="flex items-center justify-center w-full">
                                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-neutral-200 dark:border-neutral-800 border-dashed rounded-lg cursor-pointer bg-neutral-50 dark:bg-background-dark-page hover:bg-neutral-100 dark:hover:bg-background-dark-elevated transition-colors">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <CloudUpload className="w-8 h-8 text-neutral-400 mb-2" />
                                                <p className="text-caption text-neutral-600 dark:text-neutral-400">{t('testimonials.modal.uploadText')}</p>
                                                <p className="text-[10px] text-neutral-500 uppercase tracking-wider">{t('testimonials.modal.uploadHint')}</p>
                                            </div>
                                            <input accept="image/*" className="hidden" type="file" />
                                        </label>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-small font-medium text-neutral-700 dark:text-neutral-300">
                                        {t('testimonials.modal.testimonial')}
                                    </label>
                                    <textarea
                                        className="w-full px-4 py-3 bg-neutral-50 dark:bg-background-dark-page border border-neutral-200 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none resize-none text-body dark:text-neutral-100"
                                        placeholder={t('testimonials.modal.testimonialPlaceholder')}
                                        required
                                        rows={4}
                                    />
                                </div>

                                        <div className="flex justify-end pt-4">
                                            <button
                                                className="w-full md:w-auto px-10 py-3.5 bg-primary-600 dark:bg-primary-400 text-white dark:text-neutral-900 font-semibold rounded-lg hover:bg-primary-700 dark:hover:bg-primary-500 transition-all active:scale-95 shadow-lg shadow-primary-600/20 dark:shadow-none"
                                                type="submit"
                                            >
                                                {t('testimonials.modal.submit')}
                                            </button>
                                        </div>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
