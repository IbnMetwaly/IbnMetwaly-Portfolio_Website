import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Trophy, ExternalLink, Loader2, Award } from 'lucide-react';
import CertificateModal from '../components/CertificateModal';
import { supabase } from '../lib/supabase';
import { MasonryGrid } from '../components/MasonryGrid';
import ImageModal from '../components/ImageModal';

export default function Awards() {
  const { t, i18n } = useTranslation();
  const [dbAwards, setDbAwards] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [awardsLoading, setAwardsLoading] = useState(true);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    async function fetchAwards() {
      try {
        const { data, error } = await supabase
          .from('awards')
          .select('*')
          .eq('language', i18n.language)
          .order('display_order', { ascending: true });

        if (error) {
          console.error('Error fetching awards:', error);
        } else {
          setDbAwards(data || []);
        }
      } catch (err) {
        console.error('Unexpected error fetching awards:', err);
      } finally {
        setAwardsLoading(false);
      }
    }

    async function fetchTestimonials() {
      try {
        const { data, error } = await supabase.storage
          .from('Recognition')
          .list('Testimonials', {
            limit: 100,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' }
          });

        if (error) {
          console.error('Error fetching testimonials:', error);
        } else if (data) {
          const files = data.filter(file => file.name && file.name !== '.emptyFolderPlaceholder');
          setTestimonials(files);
        }
      } catch (err) {
        console.error('Unexpected error fetching testimonials:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchAwards();
    fetchTestimonials();
  }, [i18n.language]);

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

      <section className="py-2xl bg-white dark:bg-background-dark-surface">
        <div className="max-w-container mx-auto px-lg">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-lg">
            {awardsLoading ? (
              <div className="col-span-full py-12 flex justify-center">
                <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
              </div>
            ) : dbAwards.length > 0 ? (
              dbAwards.map((award, index) => (
                <motion.div
                  key={award.id}
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
                  <h3 className="text-h3 font-semibold text-neutral-900 dark:text-neutral-100 mb-sm">{award.title}</h3>
                  <p className="text-body text-neutral-700 dark:text-neutral-300 mb-xs">
                    {award.organization}
                  </p>
                  <p className="text-small text-primary-600 dark:text-primary-400 font-semibold mb-sm">
                    {award.year}
                  </p>
                  <p className="text-small text-neutral-600 dark:text-neutral-400 mb-md flex-grow">
                    {award.description}
                  </p>
                  {award.certificate_path && (
                    <div className="mt-auto pt-md border-t border-neutral-100 dark:border-neutral-800">
                      <CertificateModal
                        certificateUrl={award.certificate_path.startsWith('http')
                          ? award.certificate_path
                          : `https://isbicrdzbyxeckyckrmg.supabase.co/storage/v1/object/public/Recognition/${award.certificate_path}`}
                        trigger={
                          <button className="inline-flex items-center space-x-2 rtl:space-x-reverse text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors group">
                            <ExternalLink className="w-4 h-4 transition-transform group-hover:scale-110" />
                            <span>{t('nav.viewCertificate')}</span>
                          </button>
                        }
                      />
                    </div>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-neutral-500 italic">
                No awards found in the database.
              </div>
            )}
          </div>


          {/* Testimonials Masonry Grid Section */}
          <div className="mt-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mb-2">
                < Award className="w-5 h-5 text-primary-500" />
                <span className="text-small font-bold text-primary-600 dark:text-primary-400 uppercase tracking-widest">{t('nav.testimonials')}</span>
              </div>
              <h2 className="text-h2 font-bold text-neutral-900 dark:text-neutral-100 italic">Voices of impact from our community</h2>
            </motion.div>

            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
              </div>
            ) : testimonials.length > 0 ? (
              <div className="px-lg">
                <MasonryGrid columns={2} gap={6} className="max-w-6xl mx-auto">
                  {testimonials.map((file, idx) => {
                    const fullUrl = `https://isbicrdzbyxeckyckrmg.supabase.co/storage/v1/object/public/Recognition/Testimonials/${encodeURIComponent(file.name)}`;
                    return (
                      <div key={`${file.name}-${idx}`} className="group relative overflow-hidden rounded-xl">
                        <ImageModal
                          src={fullUrl}
                          alt={file.name}
                          trigger={
                            <img
                              src={fullUrl}
                              alt={file.name}
                              className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-105 cursor-pointer"
                              loading="lazy"
                            />
                          }
                        />
                        {/* Subtle overlay on hover */}
                        <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/5 transition-colors duration-normal pointer-events-none" />
                      </div>
                    );
                  })}
                </MasonryGrid>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
