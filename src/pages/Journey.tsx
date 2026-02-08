import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function Journey() {
  const { t } = useTranslation();
  const [milestones, setMilestones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchMilestones() {
      const { data } = await supabase.from('milestones').select('*').order('date', { ascending: true });

      if (data && data.length > 0) {
        setMilestones(data);
      } else {
        const fallback = [
          {
            title: t('journey.timeline.position5.title'),
            organization: t('journey.timeline.position5.organization'),
            period: '2012-2013',
            description: t('journey.timeline.position5.description'),
            date: '2012-05-01'
          },
          {
            title: t('journey.timeline.position4.title'),
            organization: t('journey.timeline.position4.organization'),
            period: '2013-2017',
            description: t('journey.timeline.position4.description'),
            date: '2013-09-01'
          },
          {
            title: t('journey.timeline.position3.title'),
            organization: t('journey.timeline.position3.organization'),
            period: '2017-2024',
            description: t('journey.timeline.position3.description'),
            achievements: t('journey.timeline.position3.achievements', { returnObjects: true }),
            date: '2017-09-01'
          },
          {
            title: t('journey.timeline.position2.title'),
            organization: t('journey.timeline.position2.organization'),
            period: '2021-2024',
            description: t('journey.timeline.position2.description'),
            achievements: t('journey.timeline.position2.achievements', { returnObjects: true }),
            date: '2021-09-01'
          },
          {
            title: t('journey.timeline.position1.title'),
            organization: t('journey.timeline.position1.organization'),
            period: '2024-Present',
            description: t('journey.timeline.position1.description'),
            achievements: t('journey.timeline.position1.achievements', { returnObjects: true }),
            date: '2024-09-01'
          }
        ];
        setMilestones(fallback);
      }
      setLoading(false);
    }
    fetchMilestones();
  }, [t]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 400 : scrollLeft + 400;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') scroll('left');
      if (e.key === 'ArrowRight') scroll('right');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (loading) return <div className="pt-32 text-center" aria-live="polite">Loading Journey...</div>;

  return (
    <div className="pt-20 min-h-screen overflow-hidden">
      <section className="bg-white dark:bg-background-dark-page py-2xl border-b border-neutral-100 dark:border-neutral-800">
        <div className="max-w-container mx-auto px-lg text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-h1 font-bold mb-md"
          >
            A 13-Year Odyssey in Education
          </motion.h1>
          <p className="text-body-large text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            From Cairo to Al Ain, a journey of growth, innovation, and lasting impact on the next generation.
          </p>
        </div>
      </section>

      <section className="relative py-3xl bg-neutral-50 dark:bg-background-dark-surface overflow-hidden">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-300 dark:bg-neutral-700 -translate-y-1/2"></div>

        <div className="absolute top-1/2 -translate-y-1/2 left-lg z-10">
          <button
            onClick={() => scroll('left')}
            aria-label="Scroll timeline left"
            className="p-sm bg-white dark:bg-background-dark-elevated shadow-lg rounded-full hover:scale-110 transition-transform focus-visible:ring-2 focus-visible:ring-primary-600 outline-none"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-lg z-10">
          <button
            onClick={() => scroll('right')}
            aria-label="Scroll timeline right"
            className="p-sm bg-white dark:bg-background-dark-elevated shadow-lg rounded-full hover:scale-110 transition-transform focus-visible:ring-2 focus-visible:ring-primary-600 outline-none"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div
          ref={scrollRef}
          role="region"
          aria-label="Career Odyssey Timeline"
          tabIndex={0}
          className="flex overflow-x-auto gap-xl px-[10vw] no-scrollbar snap-x snap-mandatory py-xl focus-visible:ring-2 focus-visible:ring-primary-600/20 outline-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {milestones.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-shrink-0 w-[400px] snap-center relative"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-primary-600 rounded-full border-4 border-white dark:border-background-dark-surface z-20"></div>

              <div
                className={`bg-white dark:bg-background-dark-elevated p-xl rounded-2xl shadow-lg border border-neutral-100 dark:border-neutral-800 transition-all hover:shadow-xl hover:-translate-y-1 ${
                index % 2 === 0 ? 'mb-[150px]' : 'mt-[150px]'
              }`}
              >
                <div className="flex items-center justify-between mb-md">
                   <span className="text-small font-bold text-primary-600 bg-primary-50 dark:bg-primary-900/20 px-sm py-xs rounded">
                    {item.period}
                  </span>
                </div>
                <h3 className="text-h4 font-bold mb-xs">{item.title}</h3>
                <p className="text-body font-medium text-neutral-900 dark:text-neutral-100 mb-md">{item.organization}</p>

                <p className="text-small text-neutral-600 dark:text-neutral-400 mb-lg line-clamp-3">
                  {item.description}
                </p>

                {item.achievements && (Array.isArray(item.achievements)) && item.achievements.length > 0 && (
                  <div className="space-y-2">
                    {item.achievements.slice(0, 2).map((ach: string, i: number) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-neutral-700 dark:text-neutral-300">
                        <span className="text-primary-500 mt-1" aria-hidden="true">•</span>
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-2xl bg-white dark:bg-background-dark-page">
        <div className="max-w-container mx-auto px-lg flex flex-col md:flex-row items-center justify-between gap-xl">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <p className="text-h2 font-bold text-primary-600">13+</p>
              <p className="text-small text-neutral-500 uppercase tracking-wider">Years</p>
            </div>
            <div className="text-center">
              <p className="text-h2 font-bold text-primary-600">5+</p>
              <p className="text-small text-neutral-500 uppercase tracking-wider">Institutions</p>
            </div>
            <div className="text-center">
              <p className="text-h2 font-bold text-primary-600">1000+</p>
              <p className="text-small text-neutral-500 uppercase tracking-wider">Students</p>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <p className="text-body-large font-medium mb-md text-center md:text-right">Want to see more details?</p>
            <a
              href="/qualifications"
              className="px-lg py-sm bg-neutral-900 dark:bg-white dark:text-neutral-900 text-white rounded-full font-bold hover:scale-105 transition-transform focus-visible:ring-2 focus-visible:ring-primary-600 outline-none"
            >
              View Qualifications
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
