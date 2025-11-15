import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MessageSquare, FileText } from 'lucide-react';

export default function Testimonials() {
  const { t } = useTranslation();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

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

      <section className="py-2xl bg-white dark:bg-background-dark-surface">
        <div className="max-w-container mx-auto px-lg">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-neutral-50 dark:bg-background-dark-elevated p-3xl rounded-lg text-center">
              <MessageSquare className="w-24 h-24 mx-auto mb-lg text-primary-500 dark:text-primary-400" />
              <h2 className="text-h2 font-bold mb-md text-neutral-900 dark:text-neutral-100">{t('testimonials.placeholder.note')}</h2>
              <p className="text-body-large text-neutral-700 dark:text-neutral-300 mb-xl">
                {t('testimonials.placeholder.message')}
              </p>
              
              {/* Sample Layout */}
              <div className="grid md:grid-cols-2 gap-lg mt-xl">
                {[1, 2, 3, 4].map((index) => (
                  <div key={index} className="bg-white dark:bg-background-dark-surface p-lg rounded-lg border-2 border-dashed border-neutral-300 dark:border-neutral-600">
                    <div className="flex items-center space-x-md rtl:space-x-reverse mb-md">
                      <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-700 rounded-full"></div>
                      <div>
                        <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-700 rounded mb-2"></div>
                        <div className="h-3 w-16 bg-neutral-100 dark:bg-neutral-800 rounded"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-neutral-100 dark:bg-neutral-800 rounded"></div>
                      <div className="h-3 bg-neutral-100 dark:bg-neutral-800 rounded"></div>
                      <div className="h-3 w-3/4 bg-neutral-100 dark:bg-neutral-800 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-xl p-lg bg-accent-50 dark:bg-accent-900 rounded-lg">
                <FileText className="w-8 h-8 mx-auto mb-sm text-accent-600 dark:text-accent-400" />
                <p className="text-small text-neutral-700 dark:text-neutral-300">
                  This section will showcase 31 testimonials from ENS UAE (2017-2024) and SIS Egypt (2013-2017) once uploaded.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
