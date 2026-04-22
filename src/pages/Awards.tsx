import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ExternalLink, Award, Plus } from 'lucide-react';
import CertificateModal from '../components/CertificateModal';
import { MasonryGrid } from '../components/MasonryGrid';
import { getTestimonials, Category, Testimonial } from '../components/testimonials/data';
import { FilterBar } from '../components/testimonials/filter-bar';
import { TestimonialCard } from '../components/testimonials/testimonial-card';
import { TestimonialModal } from '../components/testimonials/testimonial-modal';

const ITEMS_PER_PAGE = 12;
// Updated to use Vercel Blob base URL pattern for awards as well if applicable,
// but for consistency with testimonials, we'll keep the logic modular.
const AWARDS_BASE_URL = 'https://yvuaka9diyhj4flq.public.blob.vercel-storage.com';

export default function Awards() {
  const { t, i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const awards = ['award1', 'award2', 'award3', 'award4', 'award5', 'award6'];

  const allTestimonials = useMemo(() => getTestimonials(t), [t, i18n.language]);

  const filteredTestimonials = useMemo(() => {
    return allTestimonials.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = item.name.toLowerCase().includes(searchLower) ||
                           item.nameAr.includes(searchQuery) ||
                           item.school.toLowerCase().includes(searchLower) ||
                           item.schoolAr.includes(searchQuery);
      return matchesCategory && matchesSearch;
    });
  }, [allTestimonials, activeCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allTestimonials.length };
    allTestimonials.forEach(item => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [allTestimonials]);

  const displayedTestimonials = useMemo(() => {
    return filteredTestimonials.slice(0, visibleCount);
  }, [filteredTestimonials, visibleCount]);

  const handlePrev = () => {
    const idx = filteredTestimonials.findIndex(item => item.id === selectedTestimonial?.id);
    if (idx > 0) setSelectedTestimonial(filteredTestimonials[idx - 1]);
  };

  const handleNext = () => {
    const idx = filteredTestimonials.findIndex(item => item.id === selectedTestimonial?.id);
    if (idx < filteredTestimonials.length - 1) setSelectedTestimonial(filteredTestimonials[idx + 1]);
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_PAGE);
  };

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-primary-50 to-neutral-50 dark:from-background-dark-surface dark:to-background-dark-page py-2xl">
        <div className="max-w-container mx-auto px-lg text-center">
          <motion.h1 initial="hidden" animate="visible" variants={fadeInUp} className="text-h1 font-bold mb-md">
            {t('awards.title')}
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeInUp} transition={{ delay: 0.1 }} className="text-body-large text-neutral-700 dark:text-neutral-300">
            {t('awards.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-2xl bg-white dark:bg-background-dark-surface">
        <div className="max-w-container mx-auto px-lg">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-lg">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col bg-white dark:bg-background-dark-surface p-xl rounded-lg border-t-4 border-accent-500 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl-light dark:hover:shadow-lg-dark transition-all duration-normal"
              >
                <div className="w-24 h-24 bg-accent-100 dark:bg-accent-900 rounded-lg flex items-center justify-center mb-md">
                  <Trophy className="w-12 h-12 text-accent-600 dark:text-accent-400" />
                </div>
                <h3 className="text-h3 font-semibold text-neutral-900 dark:text-neutral-100 mb-sm">{t(`awards.list.${award}.title`)}</h3>
                <p className="text-body text-neutral-700 dark:text-neutral-300 mb-xs">
                  {t(`awards.list.${award}.organization`)}
                </p>
                <p className="text-small text-primary-600 dark:text-primary-400 font-semibold mb-sm">
                  {t(`awards.list.${award}.year`)}
                </p>
                <p className="text-small text-neutral-600 dark:text-neutral-400 mb-md flex-grow">
                  {t(`awards.list.${award}.description`)}
                </p>
                <div className="mt-auto pt-md border-t border-neutral-100 dark:border-neutral-800">
                  <CertificateModal
                    certificateUrl={`${AWARDS_BASE_URL}/${t(`awards.list.${award}.certificatePath`, { defaultValue: `awards/${award}.pdf` })}`}
                    trigger={
                      <button className="inline-flex items-center space-x-2 rtl:space-x-reverse text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors group">
                        <ExternalLink className="w-4 h-4 transition-transform group-hover:scale-110" />
                        <span>{t('nav.viewCertificate')}</span>
                      </button>
                    }
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Testimonials Section */}
          <div className="mt-32">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-20"
            >
              <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mb-4 text-primary-600 dark:text-primary-400 font-black uppercase tracking-[0.3em] text-xs">
                <Award className="w-5 h-5" />
                <span>{t('nav.testimonials')}</span>
              </div>
              <h2 className="text-h1 font-black text-neutral-900 dark:text-neutral-100 leading-tight mb-6">
                {t('testimonials.subtitle', { defaultValue: 'Voices from Students, Parents & Colleagues' })}
              </h2>
              <div className="w-20 h-1.5 bg-primary-500 mx-auto rounded-full" />
            </motion.div>

            <div className="mb-16">
              <FilterBar
                activeCategory={activeCategory}
                searchQuery={searchQuery}
                onCategoryChange={(cat) => { setActiveCategory(cat); setVisibleCount(ITEMS_PER_PAGE); }}
                onSearchChange={(q) => { setSearchQuery(q); setVisibleCount(ITEMS_PER_PAGE); }}
                resultCount={filteredTestimonials.length}
                totalCount={allTestimonials.length}
                categoryCounts={categoryCounts}
              />
            </div>

            <div className="min-h-[400px]">
              <AnimatePresence mode="popLayout">
                {displayedTestimonials.length > 0 ? (
                  <MasonryGrid key="grid" columns={i18n.language === 'en' ? 3 : 2} gap={6} className="max-w-7xl mx-auto">
                    {displayedTestimonials.map((item, idx) => (
                      <TestimonialCard
                        key={item.id}
                        testimonial={item}
                        index={idx}
                        onClick={() => setSelectedTestimonial(item)}
                      />
                    ))}
                  </MasonryGrid>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-32 bg-neutral-50 dark:bg-neutral-900/50 rounded-[3rem] border-2 border-dashed border-neutral-200 dark:border-neutral-800"
                  >
                     <p className="text-h3 font-bold text-neutral-400 dark:text-neutral-600">
                       {t('common.noResults', { defaultValue: 'No testimonials found matching your criteria.' })}
                     </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {filteredTestimonials.length > visibleCount && (
              <div className="mt-16 text-center">
                <button
                  onClick={loadMore}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-primary-700 transition-all shadow-xl shadow-primary-600/20 active:scale-95"
                >
                  <Plus className="w-5 h-5" />
                  {t('common.loadMore', { defaultValue: 'Load More Testimonials' })}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <TestimonialModal
        testimonial={selectedTestimonial}
        onClose={() => setSelectedTestimonial(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrev={filteredTestimonials.findIndex(item => item.id === selectedTestimonial?.id) > 0}
        hasNext={filteredTestimonials.findIndex(item => item.id === selectedTestimonial?.id) < filteredTestimonials.length - 1}
      />
    </div>
  );
}
