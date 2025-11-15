import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Award, Trophy } from 'lucide-react';

export default function Awards() {
  const { t } = useTranslation();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const awards = ['award1', 'award2', 'award3', 'award4', 'award5', 'award6'];

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
                className="bg-white dark:bg-background-dark-surface p-xl rounded-lg border-t-4 border-accent-500 hover:scale-105 hover:shadow-lg-light dark:hover:shadow-md-dark transition-all duration-normal"
              >
                <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900 rounded-lg flex items-center justify-center mb-md">
                  <Trophy className="w-6 h-6 text-accent-600 dark:text-accent-400" />
                </div>
                <h3 className="text-h3 font-semibold text-neutral-900 dark:text-neutral-100 mb-sm">{t(`awards.list.${award}.title`)}</h3>
                <p className="text-body text-neutral-700 dark:text-neutral-300 mb-xs">
                  {t(`awards.list.${award}.organization`)}
                </p>
                <p className="text-small text-primary-600 dark:text-primary-400 font-semibold mb-sm">
                  {t(`awards.list.${award}.year`)}
                </p>
                <p className="text-small text-neutral-600 dark:text-neutral-400">
                  {t(`awards.list.${award}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
