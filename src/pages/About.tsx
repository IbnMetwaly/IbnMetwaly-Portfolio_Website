import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Briefcase,
  Calendar,
  GraduationCap,
  Heart,
  Laptop,
  Lightbulb,
  MapPin,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';

import SEO from '../components/SEO';

export default function About() {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const target = document.querySelector(location.hash);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [location.hash]);

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

  const sectionLinks = [
    { href: '#story', label: t('about.introduction.title') },
    { href: '#philosophy', label: t('philosophy.title') },
    { href: '#journey', label: t('journey.title') },
    { href: '#impact', label: t('impact.title') }
  ];

  return (
    <>
      <SEO
        title="About Khalid Metwaly | Arabic Education Specialist"
        description="Learn about Khalid Metwaly's background, values, education, leadership philosophy, professional journey, and measurable impact as an Arabic language educator."
        type="profile"
      />
      <div className="pt-20">
        <section className="bg-gradient-to-br from-primary-50 via-white to-neutral-50 dark:from-background-dark-surface dark:via-background-dark-page dark:to-background-dark-elevated py-2xl">
          <div className="max-w-container mx-auto px-lg">
            <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-xl items-center">
              <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                <p className="text-small font-semibold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400 mb-sm">
                  {t('about.subtitle')}
                </p>
                <h1 className="text-h1 font-bold mb-md text-neutral-950 dark:text-neutral-50">
                  {t('about.title')}
                </h1>
                <p className="text-body-large text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-3xl">
                  {t('about.introduction.content')}
                </p>
                <nav className="mt-lg flex flex-wrap gap-sm" aria-label="About page sections">
                  {sectionLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="rounded-full border border-primary-200 dark:border-primary-800 px-4 py-2 text-small font-semibold text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </motion.div>
              <motion.div initial="hidden" animate="visible" variants={fadeInUp} transition={{ delay: 0.15 }}>
                <img
                  src="/images/khalid-profile.png"
                  alt="Khalid Metwaly"
                  className="w-full max-w-md mx-auto rounded-2xl shadow-xl-light dark:shadow-lg-dark"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section id="story" className="py-2xl bg-white dark:bg-background-dark-surface" aria-labelledby="story-heading">
          <div className="max-w-container mx-auto px-lg grid lg:grid-cols-[0.85fr_1.15fr] gap-xl items-start">
            <motion.article initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-neutral-50 dark:bg-background-dark-elevated p-xl rounded-2xl shadow-sm-light dark:shadow-sm-dark">
              <div className="flex items-start space-x-md rtl:space-x-reverse">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <GraduationCap className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h2 id="story-heading" className="text-h2 font-bold mb-sm text-neutral-900 dark:text-neutral-100">{t('about.education.title')}</h2>
                  <p className="text-body-large font-semibold text-primary-600 dark:text-primary-400 mb-xs">{t('about.education.degree')}</p>
                  <p className="text-body text-neutral-700 dark:text-neutral-300 mb-xs">{t('about.education.university')}</p>
                  <p className="text-small text-neutral-600 dark:text-neutral-400">{t('about.education.years')}</p>
                </div>
              </div>
            </motion.article>

            <div>
              <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-h2 font-bold mb-lg text-neutral-900 dark:text-neutral-100">
                {t('about.values.title')}
              </motion.h2>
              <div className="grid sm:grid-cols-3 gap-md">
                {values.map((value, index) => (
                  <motion.article key={value.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: index * 0.08 }} className="bg-neutral-50 dark:bg-background-dark-elevated p-lg rounded-xl border border-neutral-100 dark:border-neutral-800">
                    <value.icon className="w-10 h-10 text-primary-500 dark:text-primary-400 mb-md" aria-hidden="true" />
                    <h3 className="text-h3 font-semibold mb-sm">{value.title}</h3>
                    <p className="text-body text-neutral-700 dark:text-neutral-300">{value.description}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="philosophy" className="py-2xl bg-neutral-50 dark:bg-background-dark-page" aria-labelledby="philosophy-heading">
          <div className="max-w-container mx-auto px-lg">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-4xl mx-auto text-center mb-xl">
              <h2 id="philosophy-heading" className="text-h2 font-bold mb-md text-neutral-900 dark:text-neutral-100">{t('philosophy.title')}</h2>
              <blockquote className="text-h3 text-primary-600 dark:text-primary-400 italic leading-relaxed">
                “{t('philosophy.vision.quote')}”
              </blockquote>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-lg mb-xl">
              {pillars.map((pillar, index) => (
                <motion.article key={pillar.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: index * 0.08 }} className="bg-white dark:bg-background-dark-surface p-xl rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm-light dark:shadow-sm-dark">
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center mb-md" aria-hidden="true">
                    <pillar.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-h3 font-semibold mb-sm">{pillar.title}</h3>
                  <p className="text-body text-neutral-700 dark:text-neutral-300 leading-relaxed">{pillar.description}</p>
                </motion.article>
              ))}
            </div>
            <div className="grid lg:grid-cols-3 gap-md" aria-label={t('philosophy.success.title')}>
              {stories.map((story, index) => (
                <motion.article key={story.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: index * 0.08 }} className="bg-gradient-to-br from-primary-50 to-white dark:from-primary-950 dark:to-background-dark-elevated p-lg rounded-xl border-s-4 border-primary-500">
                  <h3 className="text-h3 font-semibold mb-sm text-primary-600 dark:text-primary-400">{story.title}</h3>
                  <p className="text-body text-neutral-700 dark:text-neutral-300 leading-relaxed">{story.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="journey" className="py-2xl bg-white dark:bg-background-dark-surface" aria-labelledby="journey-heading">
          <div className="max-w-4xl mx-auto px-lg">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-xl">
              <Briefcase className="w-12 h-12 mx-auto text-primary-500 dark:text-primary-400 mb-md" aria-hidden="true" />
              <h2 id="journey-heading" className="text-h2 font-bold mb-sm text-neutral-900 dark:text-neutral-100">{t('journey.title')}</h2>
              <p className="text-body-large text-neutral-700 dark:text-neutral-300">{t('journey.subtitle')}</p>
            </motion.div>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-neutral-300 dark:bg-neutral-700 rtl:left-auto rtl:right-8" aria-hidden="true" />
              <div className="space-y-lg">
                {positions.map((position, index) => (
                  <motion.article key={`${position.title}-${position.period}`} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: index * 0.08 }} className="relative pl-20 rtl:pl-0 rtl:pr-20">
                    <div className="absolute left-6 top-2 w-4 h-4 bg-primary-500 dark:bg-primary-400 rounded-full border-4 border-white dark:border-background-dark-surface rtl:left-auto rtl:right-6" aria-hidden="true" />
                    <div className="bg-neutral-50 dark:bg-background-dark-elevated p-lg rounded-2xl border border-neutral-100 dark:border-neutral-800">
                      <div className="flex items-start justify-between mb-md flex-wrap gap-sm">
                        <div>
                          <h3 className="text-h3 font-semibold text-primary-600 dark:text-primary-400 mb-xs">{position.title}</h3>
                          <p className="text-body font-medium text-neutral-900 dark:text-neutral-100">{position.organization}</p>
                        </div>
                        <div className="text-small text-neutral-600 dark:text-neutral-400 space-y-1">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse"><Calendar className="w-4 h-4" aria-hidden="true" /><span>{position.period}</span></div>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse"><MapPin className="w-4 h-4" aria-hidden="true" /><span>{position.location}</span></div>
                        </div>
                      </div>
                      <p className="text-body text-neutral-700 dark:text-neutral-300 mb-sm">{position.description}</p>
                      {position.achievements && (
                        <ul className="space-y-2 mt-md">
                          {position.achievements.map((achievement) => (
                            <li key={achievement} className="flex items-start space-x-2 rtl:space-x-reverse">
                              <span className="text-primary-500 dark:text-primary-400 mt-1" aria-hidden="true">•</span>
                              <span className="text-body text-neutral-700 dark:text-neutral-300">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="impact" className="py-2xl bg-gradient-to-br from-primary-50 to-neutral-50 dark:from-background-dark-page dark:to-background-dark-elevated" aria-labelledby="impact-heading">
          <div className="max-w-container mx-auto px-lg">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-xl">
              <h2 id="impact-heading" className="text-h2 font-bold mb-sm text-neutral-900 dark:text-neutral-100">{t('impact.title')}</h2>
              <p className="text-body-large text-neutral-700 dark:text-neutral-300">{t('impact.subtitle')}</p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-lg">
              {metrics.map((metric, index) => (
                <motion.article key={metric.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: index * 0.08 }} className="bg-white dark:bg-background-dark-surface p-xl rounded-2xl text-center border border-primary-100 dark:border-primary-900 shadow-md-light dark:shadow-sm-dark">
                  <metric.icon className="w-14 h-14 mx-auto mb-md text-primary-500 dark:text-primary-400" aria-hidden="true" />
                  <p className="text-hero font-bold text-primary-600 dark:text-primary-400 mb-sm">{metric.value}</p>
                  <h3 className="text-body font-semibold text-neutral-900 dark:text-neutral-100 mb-xs">{metric.label}</h3>
                  <p className="text-small text-neutral-600 dark:text-neutral-400">{metric.subtitle}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
