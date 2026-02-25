import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, BookOpen, Award, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';


// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(end * easeOutQuart));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Home() {
  const { t, i18n } = useTranslation();
  const [dbStats, setDbStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    async function fetchStats() {
      const { data, error } = await supabase
        .from('site_stats')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching stats:', error);
      } else {
        setDbStats(data || []);
      }
      setLoading(false);
    }
    fetchStats();
  }, []);

  const stats = dbStats.map(stat => ({
    icon: stat.key === 'attainment' ? TrendingUp :
      stat.key === 'stories' ? BookOpen :
        stat.key === 'experience' ? Users : Award,
    value: stat.value,
    suffix: stat.suffix,
    label: i18n.language === 'ar' ? stat.label_ar : stat.label_en,
    subtitle: i18n.language === 'ar' ? stat.subtitle_ar : stat.subtitle_en
  }));

  const awards = [
    {
      title: t('home.featuredAwards.award1.title'),
      year: t('home.featuredAwards.award1.year'),
      organization: t('home.featuredAwards.award1.organization')
    },
    {
      title: t('home.featuredAwards.award2.title'),
      year: t('home.featuredAwards.award2.year'),
      organization: t('home.featuredAwards.award2.organization')
    },
    {
      title: t('home.featuredAwards.award3.title'),
      year: t('home.featuredAwards.award3.year'),
      organization: t('home.featuredAwards.award3.organization')
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-100 via-neutral-50 to-teal-50 dark:from-primary-900/20 dark:via-background-dark-surface dark:to-background-dark-page py-3xl overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.05))] bg-[size:30px_30px]"></div>
        <div className="max-w-container mx-auto px-lg relative z-10">
          <div className="grid lg:grid-cols-2 gap-xl items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-latin text-hero md:text-h1-mobile font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-teal-400 dark:from-primary-400 dark:to-teal-300 mb-md">
                {t('home.hero.name')}
              </h1>
              <h2 className="font-latin text-h2 md:text-h2-mobile font-semibold text-primary-600 dark:text-primary-400 mb-md">
                {t('home.hero.title')}
              </h2>
              <p className="font-latin text-body-large text-neutral-700 dark:text-neutral-300 mb-xl">
                {t('home.hero.subtitle')}
              </p>
              <div className="flex flex-wrap gap-md">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-primary-600 dark:bg-primary-400 text-white dark:text-neutral-900 rounded-md font-semibold hover:scale-105 hover:-translate-y-1 hover:shadow-lg-light dark:hover:shadow-md-dark transition-all duration-fast"
                >
                  {t('home.cta.button')}
                </Link>
                <Link
                  to="/about"
                  className="px-8 py-4 border-2 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-md font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-fast"
                >
                  {t('nav.about')}
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src="/images/khalid-profile.png"
                alt="Khalid Metwaly"
                className="w-full max-w-md mx-auto rounded-xl shadow-xl-light dark:shadow-md-dark"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-2xl bg-white dark:bg-background-dark-surface">
        <div className="max-w-container mx-auto px-lg">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-h1 font-bold text-neutral-900 dark:text-neutral-100 text-center mb-xl"
          >
            {t('home.stats.title')}
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-lg">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="bg-neutral-50 dark:bg-background-dark-elevated p-xl rounded-lg text-center hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl-light dark:hover:shadow-lg-dark transition-all duration-normal"
              >
                <stat.icon className="w-16 h-16 mx-auto mb-md text-primary-500 dark:text-primary-400" />
                <div className="text-hero font-bold text-primary-600 dark:text-primary-400 mb-sm">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-body font-medium text-neutral-900 dark:text-neutral-100 mb-xs">
                  {stat.label}
                </div>
                <div className="text-small text-neutral-600 dark:text-neutral-400">
                  {stat.subtitle}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Awards */}
      <section className="py-2xl bg-neutral-50 dark:bg-background-dark-page">
        <div className="max-w-container mx-auto px-lg">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-h1 font-bold text-neutral-900 dark:text-neutral-100 text-center mb-xl"
          >
            {t('home.featuredAwards.title')}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-lg">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-background-dark-surface p-xl rounded-lg border-t-4 border-accent-500 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl-light dark:hover:shadow-lg-dark transition-all duration-normal"
              >
                <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900 rounded-lg flex items-center justify-center mb-md">
                  <Award className="w-6 h-6 text-accent-600 dark:text-accent-400" />
                </div>
                <h3 className="text-h3 font-semibold text-neutral-900 dark:text-neutral-100 mb-sm">{award.title}</h3>
                <p className="text-body text-neutral-700 dark:text-neutral-300 mb-xs">
                  {award.organization}
                </p>
                <p className="text-small text-primary-600 dark:text-primary-400 font-semibold">
                  {award.year}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mt-xl"
          >
            <Link
              to="/awards"
              className="inline-block px-8 py-4 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-md font-semibold hover:scale-105 hover:-translate-y-1 transition-all duration-fast"
            >
              {t('nav.awards')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Professional Summary */}
      <section className="py-2xl bg-white dark:bg-background-dark-surface">
        <div className="max-w-container mx-auto px-lg">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-h1 font-bold text-neutral-900 dark:text-neutral-100 text-center mb-xl"
            >
              {t('home.summary.title')}
            </motion.h2>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-body-large text-neutral-700 dark:text-neutral-300 text-center leading-relaxed"
            >
              {t('home.summary.content')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-3xl bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 text-white">
        <div className="max-w-container mx-auto px-lg text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-h1 font-bold mb-md"
          >
            {t('home.cta.title')}
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-body-large mb-xl opacity-90"
          >
            {t('home.cta.subtitle')}
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/contact"
              className="inline-block px-10 py-5 bg-white text-primary-600 rounded-md font-bold text-lg hover:scale-105 hover:-translate-y-1 hover:shadow-xl transition-all duration-fast"
            >
              {t('home.cta.button')}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
