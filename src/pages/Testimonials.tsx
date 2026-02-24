import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MessageSquare, ImageIcon, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

// Swiper components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Testimonials() {
  const { t } = useTranslation();
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  useEffect(() => {
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
          // Filter out standard placeholder files that Supabase might create for empty folders
          const files = data.filter(file => file.name && file.name !== '.emptyFolderPlaceholder');
          setTestimonials(files);
        }
      } catch (err) {
        console.error('Unexpected error fetching testimonials:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-primary-50 to-neutral-50 dark:from-background-dark-surface dark:to-background-dark-page py-2xl">
        <div className="max-w-container mx-auto px-lg text-center">
          <motion.h1 initial="hidden" animate="visible" variants={fadeInUp} className="text-h1 font-bold mb-md">
            {t('testimonials.title')}
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeInUp} transition={{ delay: 0.1 }} className="text-body-large text-neutral-700 dark:text-neutral-300">
            {t('testimonials.subtitle')}
          </motion.p>
        </div>
      </section>

      <section className="py-2xl bg-white dark:bg-background-dark-surface overflow-hidden">
        <div className="max-w-container mx-auto px-lg">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="relative px-4"
          >
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24">
                <Loader2 className="w-12 h-12 text-primary-500 animate-spin mb-4" />
                <p className="text-neutral-500 dark:text-neutral-400 font-medium tracking-wide">Loading Testimonials...</p>
              </div>
            ) : testimonials.length === 0 ? (
              <div className="text-center py-16 bg-neutral-50 dark:bg-background-dark-elevated rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700">
                <MessageSquare className="w-16 h-16 mx-auto mb-md text-neutral-400 dark:text-neutral-600" />
                <h2 className="text-h3 font-bold mb-sm text-neutral-700 dark:text-neutral-300">No Testimonials Found</h2>
                <p className="text-neutral-500 dark:text-neutral-400">
                  If you recently uploaded files to Supabase, you may need to add a Storage RLS policy allowing anon SELECT on the Recognition bucket.
                </p>
              </div>
            ) : (
              <Swiper
                modules={[Navigation, Pagination, A11y, Autoplay]}
                spaceBetween={24}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true, dynamicBullets: true }}
                autoplay={{ delay: 5000, disableOnInteraction: true }}
                breakpoints={{
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                className="pb-16"
              >
                {testimonials.map((file) => {
                  // Metadata parsing from filename: e.g. "ENS_PARENTS.png"
                  const nameWithoutExt = file.name.split('.').slice(0, -1).join('.') || file.name;
                  const parts = nameWithoutExt.split('_');

                  // If filename doesn't match the format, fallback gracefully
                  const school = parts.length > 0 ? parts[0] : 'School';
                  const role = parts.length > 1 ? parts.slice(1).join(' ') : 'Testimonial';

                  const fullUrl = `https://isbicrdzbyxeckyckrmg.supabase.co/storage/v1/object/public/Recognition/Testimonials/${encodeURIComponent(file.name)}`;

                  return (
                    <SwiperSlide key={file.id || file.name} className="h-auto pb-4">
                      <div className="group h-full flex flex-col bg-white dark:bg-background-dark-elevated rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-xl-light dark:hover:shadow-lg-dark transition-all duration-normal overflow-hidden cursor-pointer"
                        onClick={() => window.open(fullUrl, '_blank')}
                      >
                        {/* Image Container */}
                        <div className="relative w-full aspect-[4/3] bg-neutral-100 dark:bg-neutral-900/50 p-4 flex items-center justify-center overflow-hidden">
                          <img
                            src={fullUrl}
                            alt={nameWithoutExt}
                            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                            loading="lazy"
                          />

                          {/* Hover Overlay Icon */}
                          <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/10 dark:group-hover:bg-black/30 transition-colors duration-normal z-20 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm p-3 rounded-full text-primary-600 dark:text-primary-400 shadow-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-normal">
                              <ImageIcon className="w-6 h-6" />
                            </div>
                          </div>
                        </div>

                        {/* Text Content */}
                        <div className="p-xl flex-grow flex flex-col justify-center text-center">
                          <h3 className="text-h3 font-bold text-neutral-900 dark:text-neutral-100 mb-xs">{school}</h3>
                          <p className="text-primary-600 dark:text-primary-400 font-medium text-small uppercase tracking-wider">
                            {role}
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
