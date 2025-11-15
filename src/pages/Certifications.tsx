import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Award, FileText, BookOpen } from 'lucide-react';

export default function Certifications() {
  const { t } = useTranslation();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const licenses = ['license1', 'license2'];
  const certifications = ['cert1', 'cert2', 'cert3', 'cert4', 'cert5'];
  const professionalDev = ['pd1', 'pd2', 'pd3', 'pd4', 'pd5', 'pd6', 'pd7'];

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-primary-50 to-neutral-50 dark:from-background-dark-surface dark:to-background-dark-page py-2xl">
        <div className="max-w-container mx-auto px-lg text-center">
          <motion.h1 initial="hidden" animate="visible" variants={fadeInUp} className="text-h1 font-bold mb-md">
            {t('certifications.title')}
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeInUp} transition={{ delay: 0.1 }} className="text-body-large text-neutral-700 dark:text-neutral-300">
            {t('certifications.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Licenses */}
      <section className="py-2xl bg-white dark:bg-background-dark-surface">
        <div className="max-w-container mx-auto px-lg">
          <h2 className="text-h2 font-bold text-center mb-xl text-neutral-900 dark:text-neutral-100">{t('certifications.licenses.title')}</h2>
          <div className="grid md:grid-cols-2 gap-lg max-w-4xl mx-auto">
            {licenses.map((license, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-gradient-to-br from-accent-50 to-neutral-50 dark:from-accent-900 dark:to-background-dark-elevated p-lg rounded-lg border-l-4 border-accent-500"
              >
                <Award className="w-8 h-8 text-accent-600 dark:text-accent-400 mb-sm" />
                <h3 className="text-h3 font-semibold mb-xs">{t(`certifications.licenses.${license}.title`)}</h3>
                {t(`certifications.licenses.${license}.organization`) && (
                  <p className="text-small text-neutral-600 dark:text-neutral-400 mb-xs">
                    {t(`certifications.licenses.${license}.organization`)}
                  </p>
                )}
                <p className="text-small text-primary-600 dark:text-primary-400 font-semibold">
                  {t(`certifications.licenses.${license}.year`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Certifications */}
      <section className="py-2xl bg-neutral-50 dark:bg-background-dark-page">
        <div className="max-w-container mx-auto px-lg">
          <h2 className="text-h2 font-bold text-center mb-xl text-neutral-900 dark:text-neutral-100">{t('certifications.certifications.title')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-lg">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-background-dark-surface p-lg rounded-lg hover:shadow-lg-light dark:hover:shadow-md-dark transition-all duration-normal"
              >
                <FileText className="w-6 h-6 text-primary-600 dark:text-primary-400 mb-sm" />
                <h3 className="text-body font-semibold mb-xs">{t(`certifications.certifications.${cert}.title`)}</h3>
                <p className="text-small text-neutral-600 dark:text-neutral-400 mb-xs">
                  {t(`certifications.certifications.${cert}.organization`)}
                </p>
                <p className="text-small text-primary-600 dark:text-primary-400 font-semibold">
                  {t(`certifications.certifications.${cert}.year`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Development */}
      <section className="py-2xl bg-white dark:bg-background-dark-surface">
        <div className="max-w-container mx-auto px-lg">
          <h2 className="text-h2 font-bold text-center mb-xl text-neutral-900 dark:text-neutral-100">{t('certifications.professional.title')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-md">
            {professionalDev.map((pd, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.05 }}
                className="bg-neutral-50 dark:bg-background-dark-elevated p-md rounded-lg"
              >
                <BookOpen className="w-5 h-5 text-primary-600 dark:text-primary-400 mb-xs" />
                <h3 className="text-body font-medium mb-xs">{t(`certifications.professional.${pd}.title`)}</h3>
                <p className="text-small text-neutral-600 dark:text-neutral-400 mb-xs">
                  {t(`certifications.professional.${pd}.organization`)}
                </p>
                <p className="text-small text-primary-600 dark:text-primary-400">
                  {t(`certifications.professional.${pd}.year`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
