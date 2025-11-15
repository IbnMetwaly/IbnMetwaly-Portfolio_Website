import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { TrendingUp, BookOpen, Users, Target } from 'lucide-react';

export default function Impact() {
  const { t } = useTranslation();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const metrics = [
    {
      icon: TrendingUp,
      value: t('impact.metrics.attainment.value'),
      label: t('impact.metrics.attainment.label'),
      subtitle: t('impact.metrics.attainment.subtitle')
    },
    {
      icon: BookOpen,
      value: t('impact.metrics.stories.value'),
      label: t('impact.metrics.stories.label'),
      subtitle: t('impact.metrics.stories.subtitle')
    },
    {
      icon: Target,
      value: t('impact.metrics.increase.value'),
      label: t('impact.metrics.increase.label'),
      subtitle: t('impact.metrics.increase.subtitle')
    },
    {
      icon: Users,
      value: t('impact.metrics.engagement.value'),
      label: t('impact.metrics.engagement.label'),
      subtitle: t('impact.metrics.engagement.subtitle')
    }
  ];

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-primary-50 to-neutral-50 dark:from-background-dark-surface dark:to-background-dark-page py-2xl">
        <div className="max-w-container mx-auto px-lg text-center">
          <motion.h1 initial="hidden" animate="visible" variants={fadeInUp} className="text-h1 font-bold mb-md">
            {t('impact.title')}
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeInUp} transition={{ delay: 0.1 }} className="text-body-large text-neutral-700 dark:text-neutral-300">
            {t('impact.subtitle')}
          </motion.p>
        </div>
      </section>

      <section className="py-2xl bg-white dark:bg-background-dark-surface">
        <div className="max-w-container mx-auto px-lg">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-lg">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-primary-50 to-neutral-50 dark:from-primary-900 dark:to-background-dark-elevated p-xl rounded-lg text-center hover:scale-105 hover:shadow-lg-light dark:hover:shadow-md-dark transition-all duration-normal"
              >
                <metric.icon className="w-16 h-16 mx-auto mb-md text-primary-500 dark:text-primary-400" />
                <div className="text-hero font-bold text-primary-600 dark:text-primary-400 mb-sm">
                  {metric.value}
                </div>
                <div className="text-body font-medium text-neutral-900 dark:text-neutral-100 mb-xs">
                  {metric.label}
                </div>
                <div className="text-small text-neutral-600 dark:text-neutral-400">
                  {metric.subtitle}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
