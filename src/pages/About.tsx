import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lightbulb, Target, Heart, GraduationCap } from 'lucide-react';

export default function About() {
  const { t } = useTranslation();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const values = [
    {
      icon: Lightbulb,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description')
    },
    {
      icon: Target,
      title: t('about.values.excellence.title'),
      description: t('about.values.excellence.description')
    },
    {
      icon: Heart,
      title: t('about.values.inclusion.title'),
      description: t('about.values.inclusion.description')
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
            {t('about.title')}
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-body-large text-neutral-700 dark:text-neutral-300"
          >
            {t('about.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-2xl bg-white dark:bg-background-dark-surface">
        <div className="max-w-container mx-auto px-lg">
          <div className="grid lg:grid-cols-2 gap-xl items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-h2 font-bold mb-md text-neutral-900 dark:text-neutral-100">{t('about.introduction.title')}</h2>
              <p className="text-body text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {t('about.introduction.content')}
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <img
                src="/images/khalid-profile.png"
                alt="Khalid Metwaly"
                className="w-full max-w-md mx-auto rounded-lg shadow-lg-light dark:shadow-md-dark"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-2xl bg-neutral-50 dark:bg-background-dark-page">
        <div className="max-w-container mx-auto px-lg">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto bg-white dark:bg-background-dark-surface p-xl rounded-lg shadow-md-light dark:shadow-sm-dark"
          >
            <div className="flex items-start space-x-md rtl:space-x-reverse">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="text-h2 font-bold mb-sm text-neutral-900 dark:text-neutral-100">{t('about.education.title')}</h3>
                <p className="text-body-large font-semibold text-primary-600 dark:text-primary-400 mb-xs">
                  {t('about.education.degree')}
                </p>
                <p className="text-body text-neutral-700 dark:text-neutral-300 mb-xs">
                  {t('about.education.university')}
                </p>
                <p className="text-small text-neutral-600 dark:text-neutral-400">
                  {t('about.education.years')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-2xl bg-white dark:bg-background-dark-surface">
        <div className="max-w-container mx-auto px-lg">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-h1 font-bold text-center mb-xl"
          >
            {t('about.values.title')}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-lg">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="bg-neutral-50 dark:bg-background-dark-elevated p-xl rounded-lg hover:scale-105 hover:shadow-lg-light dark:hover:shadow-md-dark transition-all duration-normal"
              >
                <value.icon className="w-12 h-12 text-primary-500 dark:text-primary-400 mb-md" />
                <h3 className="text-h3 font-semibold mb-sm">{value.title}</h3>
                <p className="text-body text-neutral-700 dark:text-neutral-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Link */}
      <section className="py-2xl bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 text-white">
        <div className="max-w-container mx-auto px-lg text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-h1 font-bold mb-xl"
          >
            {t('about.philosophyLink.title')}
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
          >
            <Link
              to="/philosophy"
              className="inline-block px-10 py-5 bg-white text-primary-600 rounded-md font-bold text-lg hover:scale-105 hover:-translate-y-1 hover:shadow-xl transition-all duration-fast"
            >
              {t('about.philosophyLink.button')}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
