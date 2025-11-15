import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

export default function Journey() {
  const { t } = useTranslation();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const positions = [
    {
      title: t('journey.timeline.position1.title'),
      organization: t('journey.timeline.position1.organization'),
      location: t('journey.timeline.position1.location'),
      period: t('journey.timeline.position1.period'),
      description: t('journey.timeline.position1.description'),
      achievements: t('journey.timeline.position1.achievements', { returnObjects: true }) as string[]
    },
    {
      title: t('journey.timeline.position2.title'),
      organization: t('journey.timeline.position2.organization'),
      location: t('journey.timeline.position2.location'),
      period: t('journey.timeline.position2.period'),
      description: t('journey.timeline.position2.description'),
      achievements: t('journey.timeline.position2.achievements', { returnObjects: true }) as string[]
    },
    {
      title: t('journey.timeline.position3.title'),
      organization: t('journey.timeline.position3.organization'),
      location: t('journey.timeline.position3.location'),
      period: t('journey.timeline.position3.period'),
      description: t('journey.timeline.position3.description'),
      achievements: t('journey.timeline.position3.achievements', { returnObjects: true }) as string[]
    },
    {
      title: t('journey.timeline.position4.title'),
      organization: t('journey.timeline.position4.organization'),
      location: t('journey.timeline.position4.location'),
      period: t('journey.timeline.position4.period'),
      description: t('journey.timeline.position4.description')
    },
    {
      title: t('journey.timeline.position5.title'),
      organization: t('journey.timeline.position5.organization'),
      location: t('journey.timeline.position5.location'),
      period: t('journey.timeline.position5.period'),
      description: t('journey.timeline.position5.description')
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
            {t('journey.title')}
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-body-large text-neutral-700 dark:text-neutral-300"
          >
            {t('journey.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-2xl bg-white dark:bg-background-dark-surface">
        <div className="max-w-4xl mx-auto px-lg">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-neutral-300 dark:bg-neutral-700 rtl:left-auto rtl:right-8"></div>

            {/* Timeline Entries */}
            <div className="space-y-xl">
              {positions.map((position, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-20 rtl:pl-0 rtl:pr-20"
                >
                  {/* Timeline Node */}
                  <div className="absolute left-6 top-2 w-4 h-4 bg-primary-500 dark:bg-primary-400 rounded-full border-4 border-white dark:border-background-dark-surface rtl:left-auto rtl:right-6"></div>

                  {/* Content Card */}
                  <div className="bg-neutral-50 dark:bg-background-dark-elevated p-lg rounded-lg hover:shadow-lg-light dark:hover:shadow-md-dark transition-all duration-normal">
                    <div className="flex items-start justify-between mb-md flex-wrap gap-sm">
                      <div>
                        <h3 className="text-h3 font-semibold text-primary-600 dark:text-primary-400 mb-xs">
                          {position.title}
                        </h3>
                        <p className="text-body font-medium text-neutral-900 dark:text-neutral-100">
                          {position.organization}
                        </p>
                      </div>
                      <div className="text-small text-neutral-600 dark:text-neutral-400 space-y-1">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Calendar className="w-4 h-4" />
                          <span>{position.period}</span>
                        </div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <MapPin className="w-4 h-4" />
                          <span>{position.location}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-body text-neutral-700 dark:text-neutral-300 mb-sm">
                      {position.description}
                    </p>

                    {position.achievements && (
                      <ul className="space-y-2 mt-md">
                        {position.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start space-x-2 rtl:space-x-reverse">
                            <span className="text-primary-500 dark:text-primary-400 mt-1">•</span>
                            <span className="text-body text-neutral-700 dark:text-neutral-300">
                              {achievement}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
