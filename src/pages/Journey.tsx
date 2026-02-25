import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Database } from '../types/supabase';

type Experience = Database['public']['Tables']['experience']['Row'];

export default function Journey() {
  const { t, i18n } = useTranslation();
  const [positions, setPositions] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    fetchExperience();
  }, [i18n.language]);

  async function fetchExperience() {
    setLoading(true);
    const { data, error } = await supabase
      .from('experience')
      .select('*')
      .eq('language', i18n.language)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching experience:', error);
    } else {
      setPositions(data || []);
    }
    setLoading(false);
  }

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
      <section className="py-2xl bg-white dark:bg-background-dark-surface min-h-[400px]">
        <div className="max-w-4xl mx-auto px-lg">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
            </div>
          ) : positions.length === 0 ? (
            <div className="text-center py-20 text-neutral-500">
              {i18n.language === 'ar' ? 'لا يوجد بيانات متاحة حاليا' : 'No experience data available yet.'}
            </div>
          ) : (
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-neutral-300 dark:bg-neutral-700 rtl:left-auto rtl:right-8"></div>

              {/* Timeline Entries */}
              <div className="space-y-xl">
                {positions.map((position, index) => (
                  <motion.div
                    key={position.id}
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

                      {position.description && (
                        <p className="text-body text-neutral-700 dark:text-neutral-300 mb-sm">
                          {position.description}
                        </p>
                      )}

                      {position.achievements && Array.isArray(position.achievements) && position.achievements.length > 0 && (
                        <ul className="space-y-2 mt-md">
                          {(position.achievements as string[]).map((achievement, idx) => (
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
          )}
        </div>
      </section>
    </div>
  );
}
