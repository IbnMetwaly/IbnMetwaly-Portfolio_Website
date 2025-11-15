import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Laptop, Heart, Globe, GraduationCap } from 'lucide-react';

export default function Skills() {
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
            {t('skills.title')}
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeInUp} transition={{ delay: 0.1 }} className="text-body-large text-neutral-700 dark:text-neutral-300">
            {t('skills.subtitle')}
          </motion.p>
        </div>
      </section>

      <section className="py-2xl bg-white dark:bg-background-dark-surface">
        <div className="max-w-container mx-auto px-lg">
          <div className="grid md:grid-cols-2 gap-xl">
            {/* Technical Skills */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-neutral-50 dark:bg-background-dark-elevated p-xl rounded-lg">
              <div className="flex items-center space-x-md rtl:space-x-reverse mb-md">
                <Laptop className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                <h2 className="text-h2 font-bold text-neutral-900 dark:text-neutral-100">{t('skills.technical.title')}</h2>
              </div>
              <ul className="space-y-sm">
                {(t('skills.technical.skills', { returnObjects: true }) as string[]).map((skill, index) => (
                  <li key={index} className="flex items-start space-x-2 rtl:space-x-reverse">
                    <span className="text-primary-500 dark:text-primary-400 mt-1">•</span>
                    <span className="text-body text-neutral-700 dark:text-neutral-300">{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Soft Skills */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.1 }} className="bg-neutral-50 dark:bg-background-dark-elevated p-xl rounded-lg">
              <div className="flex items-center space-x-md rtl:space-x-reverse mb-md">
                <Heart className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                <h2 className="text-h2 font-bold text-neutral-900 dark:text-neutral-100">{t('skills.soft.title')}</h2>
              </div>
              <ul className="space-y-sm">
                {(t('skills.soft.skills', { returnObjects: true }) as string[]).map((skill, index) => (
                  <li key={index} className="flex items-start space-x-2 rtl:space-x-reverse">
                    <span className="text-primary-500 dark:text-primary-400 mt-1">•</span>
                    <span className="text-body text-neutral-700 dark:text-neutral-300">{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Languages */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.2 }} className="bg-neutral-50 dark:bg-background-dark-elevated p-xl rounded-lg">
              <div className="flex items-center space-x-md rtl:space-x-reverse mb-md">
                <Globe className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                <h2 className="text-h2 font-bold text-neutral-900 dark:text-neutral-100">{t('skills.languages.title')}</h2>
              </div>
              <ul className="space-y-sm">
                <li className="flex items-start space-x-2 rtl:space-x-reverse">
                  <span className="text-primary-500 dark:text-primary-400 mt-1">•</span>
                  <span className="text-body text-neutral-700 dark:text-neutral-300">{t('skills.languages.arabic')}</span>
                </li>
                <li className="flex items-start space-x-2 rtl:space-x-reverse">
                  <span className="text-primary-500 dark:text-primary-400 mt-1">•</span>
                  <span className="text-body text-neutral-700 dark:text-neutral-300">{t('skills.languages.english')}</span>
                </li>
              </ul>
            </motion.div>

            {/* Teaching Expertise */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.3 }} className="bg-neutral-50 dark:bg-background-dark-elevated p-xl rounded-lg">
              <div className="flex items-center space-x-md rtl:space-x-reverse mb-md">
                <GraduationCap className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                <h2 className="text-h2 font-bold text-neutral-900 dark:text-neutral-100">{t('skills.teaching.title')}</h2>
              </div>
              <ul className="space-y-sm">
                {(t('skills.teaching.areas', { returnObjects: true }) as string[]).map((area, index) => (
                  <li key={index} className="flex items-start space-x-2 rtl:space-x-reverse">
                    <span className="text-primary-500 dark:text-primary-400 mt-1">•</span>
                    <span className="text-body text-neutral-700 dark:text-neutral-300">{area}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
