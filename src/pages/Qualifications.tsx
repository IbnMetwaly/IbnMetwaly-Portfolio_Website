import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Award, BookOpen, ShieldCheck, ExternalLink, Download } from 'lucide-react';

export default function Qualifications() {
  const { t } = useTranslation();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from('qualifications').select('*').order('year', { ascending: false });
      if (data) setItems(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const categories = [
    { type: 'license', label: 'Professional Licenses', icon: ShieldCheck },
    { type: 'certification', label: 'Core Certifications', icon: Award },
    { type: 'pd', label: 'Professional Development', icon: BookOpen }
  ];

  return (
    <div className="pt-20 min-h-screen pb-2xl">
      <section className="bg-neutral-50 dark:bg-background-dark-page py-2xl">
        <div className="max-w-container mx-auto px-lg text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-h1 font-bold mb-md"
          >
            Qualifications & Credentials
          </motion.h1>
          <p className="text-body-large text-neutral-600 dark:text-neutral-400">
            A testament to continuous learning and professional excellence in educational leadership.
          </p>
        </div>
      </section>

      <div className="max-w-container mx-auto px-lg mt-2xl space-y-3xl">
        {categories.map((cat) => {
          const catItems = items.filter(i => i.type === cat.type);
          if (catItems.length === 0 && !loading) return null;

          return (
            <div key={cat.type}>
              <div className="flex items-center space-x-3 mb-xl">
                <cat.icon className="text-primary-600 w-8 h-8" />
                <h2 className="text-h3 font-bold">{cat.label}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
                {loading ? [1,2,3].map(i => <div key={i} className="h-32 bg-neutral-100 dark:bg-neutral-800 animate-pulse rounded-xl" />) :
                catItems.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-background-dark-elevated p-lg rounded-xl shadow-sm border border-neutral-100 dark:border-neutral-800 flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-xs">{item.title}</h3>
                      <p className="text-small text-neutral-600 dark:text-neutral-400">{item.organization}</p>
                      <p className="text-xs text-primary-500 font-medium mt-xs">{item.year}</p>
                    </div>
                    {item.file_url && (
                      <a
                        href={item.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-lg flex items-center space-x-2 text-primary-600 text-small font-bold hover:text-primary-700"
                      >
                        <Download size={16} />
                        <span>View Digital Copy</span>
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
