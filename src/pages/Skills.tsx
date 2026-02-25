import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Laptop, Heart, Globe, GraduationCap, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Database } from '../types/supabase';

type Skill = Database['public']['Tables']['skills']['Row'];

export default function Skills() {
  const { t, i18n } = useTranslation();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    fetchSkills();
  }, [i18n.language]);

  async function fetchSkills() {
    setLoading(true);
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .eq('language', i18n.language)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching skills:', error);
    } else {
      setSkills(data || []);
    }
    setLoading(false);
  }

  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  const categories = [
    { id: 'technical', icon: Laptop, title: t('skills.technical.title') },
    { id: 'soft', icon: Heart, title: t('skills.soft.title') },
    { id: 'languages', icon: Globe, title: t('skills.languages.title') },
    { id: 'teaching', icon: GraduationCap, title: t('skills.teaching.title') }
  ];

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-primary-50 to-neutral-50 dark:from-background-dark-surface dark:to-background-dark-page py-2xl">
        <div className="max-w-container mx-auto px-lg text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-h1 font-bold mb-md"
          >
            {t('skills.title')}
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-body-large text-neutral-700 dark:text-neutral-300"
          >
            {t('skills.subtitle')}
          </motion.p>
        </div>
      </section>

      <section className="py-2xl bg-white dark:bg-background-dark-surface min-h-[400px]">
        <div className="max-w-container mx-auto px-lg">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
            </div>
          ) : skills.length === 0 ? (
            <div className="text-center py-20 text-neutral-500">
              {i18n.language === 'ar' ? 'لا يوجد مهارات مسجلة حاليا' : 'No skills available yet.'}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-xl">
              {categories.map((cat, index) => {
                const catSkills = getSkillsByCategory(cat.id);
                if (catSkills.length === 0) return null;

                return (
                  <motion.div
                    key={cat.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    transition={{ delay: index * 0.1 }}
                    className="bg-neutral-50 dark:bg-background-dark-elevated p-xl rounded-lg h-full"
                  >
                    <div className="flex items-center space-x-md rtl:space-x-reverse mb-md">
                      <cat.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                      <h2 className="text-h2 font-bold text-neutral-900 dark:text-neutral-100">
                        {cat.title}
                      </h2>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-md gap-y-sm">
                      {catSkills.map((skill) => (
                        <li key={skill.id} className="flex items-start space-x-2 rtl:space-x-reverse group">
                          <span className="text-primary-500 dark:text-primary-400 mt-1 transition-transform group-hover:scale-125">•</span>
                          <div>
                            <span className="text-body font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                              {skill.name}
                            </span>
                            {skill.proficiency && (
                              <p className="text-small text-neutral-500 dark:text-neutral-400 italic">
                                {skill.proficiency}
                              </p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
