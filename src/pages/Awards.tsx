import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Trophy, ExternalLink, Loader2, Award } from 'lucide-react';
import CertificateModal from '../components/CertificateModal';
import { getVercelBlobUrl } from '../lib/blob';

import { MasonryGrid } from '../components/MasonryGrid';
import ImageModal from '../components/ImageModal';

const VERCEL_BLOB_URL = getVercelBlobUrl();
const TESTIMONIAL_URLS = ['https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/ENS_PARENTS%20%281%29.jpg', 'https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/ENS_PARENTS%20%282%29.jpg', 'https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/ENS_PARENTS%20%283%29.jpg', 'https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/ENS_PARENTS%20%284%29.jpg', 'https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/ENS_PARENTS.png', 'https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/ENS_STUDENTS%20%281%29.jpg', 'https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/ENS_STUDENTS%20%282%29.jpg', 'https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/ENS_TEACHERS%20%281%29.jpg', 'https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/ENS_TEACHERS%20%281%29.png', 'https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/ENS_TEACHERS%20%282%29.jpg', 'https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/ENS_TEACHERS%20%282%29.png', 'https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/ENS_TEACHERS%20%283%29.jpg', 'https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/ENS_TEACHERS%20%283%29.png', 'https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/ENS_TEACHERS%20%284%29.png', 'https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/SIS_Parent%20%281%29.png', 'https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/SIS_Parent%20%2810%29.png', 'https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/SIS_Parent%20%2811%29.png', 'https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/SIS_Parent%20%2812%29.png', 'https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/SIS_Parent%20%2813%29.png', 'https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/SIS_Parent%20%2816%29.png', 'https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/SIS_Parent%20%2817%29.png', 'https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/SIS_Parent%20%2819%29.png', 'https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/SIS_Parent%20%282%29.png', 'https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/SIS_Parent%20%283%29.png', 'https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/SIS_Parent%20%284%29.png', 'https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/SIS_Parent%20%285%29.png', 'https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/SIS_Parent%20%286%29.png', 'https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/SIS_Parent%20%288%29.png', 'https://yvuaka9diyhj4flq.public.blob.vercel-storage.com/Testimonials/SIS_Parent%20%289%29.png'];

export default function Awards() {
  const { t } = useTranslation();
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const awards = ['award1', 'award2', 'award3', 'award4', 'award5', 'award6'];

    useEffect(() => {
    const files = TESTIMONIAL_URLS.map((url, idx) => ({
      url,
      pathname: url.split('/').pop() || `testimonial-${idx}`
    }));
    setTestimonials(files);
    setLoading(false);
  }, []);

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
                    certificateUrl={`${VERCEL_BLOB_URL}/${t(`awards.list.${award}.certificatePath`, { defaultValue: `Recognition/Awards/${award}.png` })}`}
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
                    const fullUrl = file.url;
                    return (
                      <div key={`${file.pathname}-${idx}`} className="group relative overflow-hidden rounded-xl">
                        <ImageModal
                          src={fullUrl}
                          alt={file.pathname}
                          trigger={
                            <img
                              src={fullUrl}
                              alt={file.pathname}
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
