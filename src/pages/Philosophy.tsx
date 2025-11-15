import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { BookOpen, Laptop, TrendingUp } from 'lucide-react';

export default function Philosophy() {
  const { t } = useTranslation();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const pillars = [
    {
      icon: BookOpen,
      title: t('philosophy.pillars.curriculum.title'),
      description: t('philosophy.pillars.curriculum.description')
    },
    {
      icon: Laptop,
      title: t('philosophy.pillars.digital.title'),
      description: t('philosophy.pillars.digital.description')
    },
    {
      icon: TrendingUp,
      title: t('philosophy.pillars.datadriven.title'),
      description: t('philosophy.pillars.datadriven.description')
    }
  ];

  const stories = [
    {
      title: t('philosophy.success.story1.title'),
      description: t('philosophy.success.story1.description')
    },
    {
      title: t('philosophy.success.story2.title'),
      description: t('philosophy.success.story2.description')
    },
    {
      title: t('philosophy.success.story3.title'),
      description: t('philosophy.success.story3.description')
    }
  ];

  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary-50 to-neutral-50 dark:from-background-dark-surface dark:to-background-dark-page py-2xl">
        <div className="max-w-container mx-auto px-lg text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-h1 font-bold mb-md"
          >
            {t('philosophy.title')}
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-body-large text-neutral-700 dark:text-neutral-300"
          >
            {t('philosophy.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Vision */}
      <section className="py-2xl bg-white dark:bg-background-dark-surface">
        <div className="max-w-container mx-auto px-lg">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-h2 font-bold mb-xl text-neutral-900 dark:text-neutral-100">{t('philosophy.vision.title')}</h2>
            <p className="text-h3 text-primary-600 dark:text-primary-400 italic leading-relaxed">
              "{t('philosophy.vision.quote')}"
            </p>
          </motion.div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-2xl bg-neutral-50 dark:bg-background-dark-page">
        <div className="max-w-container mx-auto px-lg">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-h2 font-bold mb-xl text-neutral-900 dark:text-neutral-100 text-center"
          >
            {t('philosophy.pillars.title')}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-lg">
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-background-dark-surface p-xl rounded-lg hover:scale-105 hover:shadow-lg-light dark:hover:shadow-md-dark transition-all duration-normal"
              >
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-md">
                  <pillar.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-h3 font-semibold mb-sm">{pillar.title}</h3>
                <p className="text-body text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-2xl bg-white dark:bg-background-dark-surface">
        <div className="max-w-container mx-auto px-lg">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-h2 font-bold mb-xl text-neutral-900 dark:text-neutral-100 text-center"
          >
            {t('philosophy.success.title')}
          </motion.h2>

          <div className="space-y-lg max-w-4xl mx-auto">
            {stories.map((story, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-primary-50 to-neutral-50 dark:from-primary-900 dark:to-background-dark-elevated p-xl rounded-lg border-l-4 border-primary-500"
              >
                <h3 className="text-h3 font-semibold mb-sm text-primary-600 dark:text-primary-400">
                  {story.title}
                </h3>
                <p className="text-body text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {story.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
