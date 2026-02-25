import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Award, FileText, BookOpen, ExternalLink, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import CertificateModal from '../components/CertificateModal';

export default function Certifications() {
  const { t, i18n } = useTranslation();
  const [certs, setCerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    async function fetchCerts() {
      try {
        const { data, error } = await supabase
          .from('certifications')
          .select('*')
          .eq('language', i18n.language)
          .order('display_order', { ascending: true });

        if (error) {
          console.error('Error fetching certifications:', error);
        } else {
          setCerts(data || []);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchCerts();
  }, [i18n.language]);

  const licenses = certs.filter(c => c.type === 'license');
  const certifications = certs.filter(c => c.type === 'core');
  const professionalDev = certs.filter(c => c.type === 'pd');

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-primary-50 to-neutral-50 dark:from-background-dark-surface dark:to-background-dark-page py-2xl">
        <div className="max-w-container mx-auto px-lg text-center">
          <motion.h1 initial="hidden" animate="visible" variants={fadeInUp} className="text-h1 font-bold mb-md">
            {t('certifications.title')}
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeInUp} transition={{ delay: 0.1 }} className="text-body-large text-neutral-700 dark:text-neutral-300">
            {t('certifications.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Licenses */}
      {licenses.length > 0 && (
        <section className="py-2xl bg-white dark:bg-background-dark-surface">
          <div className="max-w-container mx-auto px-lg">
            <h2 className="text-h2 font-bold text-center mb-xl text-neutral-900 dark:text-neutral-100">{t('certifications.licenses.title')}</h2>
            <div className="grid md:grid-cols-2 gap-lg max-w-4xl mx-auto">
              {licenses.map((license, index) => (
                <motion.div
                  key={license.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="flex flex-col bg-white dark:bg-background-dark-surface p-lg rounded-lg border-t-4 border-accent-500 hover:shadow-lg-light dark:hover:shadow-md-dark transition-all duration-normal"
                >
                  <div className="flex-grow">
                    <Award className="w-8 h-8 text-accent-600 dark:text-accent-400 mb-sm" />
                    <h3 className="text-h3 font-semibold mb-xs text-neutral-900 dark:text-neutral-100">{license.title}</h3>
                    {license.organization && (
                      <p className="text-small text-neutral-600 dark:text-neutral-400 mb-xs">
                        {license.organization}
                      </p>
                    )}
                    <p className="text-small text-primary-600 dark:text-primary-400 font-semibold mb-md">
                      {license.year}
                    </p>
                  </div>
                  <div className="pt-sm border-t border-neutral-100 dark:border-neutral-800">
                    <CertificateModal
                      certificateUrl={license.certificate_path?.startsWith('http')
                        ? license.certificate_path
                        : `https://isbicrdzbyxeckyckrmg.supabase.co/storage/v1/object/public/certificates/${license.certificate_path}`}
                      trigger={
                        <button className="inline-flex items-center space-x-2 rtl:space-x-reverse text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors group">
                          <ExternalLink className="w-4 h-4 transition-transform group-hover:scale-110" />
                          <span>{t('nav.viewCertificate')}</span>
                        </button>
                      }
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Core Certifications */}
      {certifications.length > 0 && (
        <section className="py-2xl bg-neutral-50 dark:bg-background-dark-page">
          <div className="max-w-container mx-auto px-lg">
            <h2 className="text-h2 font-bold text-center mb-xl text-neutral-900 dark:text-neutral-100">{t('certifications.certifications.title')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-lg">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col bg-white dark:bg-background-dark-surface p-lg rounded-lg hover:shadow-lg-light dark:hover:shadow-md-dark transition-all duration-normal"
                >
                  <div className="flex-grow">
                    <FileText className="w-6 h-6 text-primary-600 dark:text-primary-400 mb-sm" />
                    <h3 className="text-body font-semibold mb-xs text-neutral-900 dark:text-neutral-100">{cert.title}</h3>
                    <p className="text-small text-neutral-600 dark:text-neutral-400 mb-xs">
                      {cert.organization}
                    </p>
                    <p className="text-small text-primary-600 dark:text-primary-400 font-semibold mb-md">
                      {cert.year}
                    </p>
                  </div>
                  <div className="pt-sm border-t border-neutral-100 dark:border-neutral-800">
                    <CertificateModal
                      certificateUrl={cert.certificate_path?.startsWith('http')
                        ? cert.certificate_path
                        : `https://isbicrdzbyxeckyckrmg.supabase.co/storage/v1/object/public/certificates/${cert.certificate_path}`}
                      trigger={
                        <button className="inline-flex items-center space-x-2 rtl:space-x-reverse text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors group">
                          <ExternalLink className="w-4 h-4 transition-transform group-hover:scale-110" />
                          <span>{t('nav.viewCertificate')}</span>
                        </button>
                      }
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Professional Development */}
      {professionalDev.length > 0 && (
        <section className="py-2xl bg-white dark:bg-background-dark-surface">
          <div className="max-w-container mx-auto px-lg">
            <h2 className="text-h2 font-bold text-center mb-xl text-neutral-900 dark:text-neutral-100">{t('certifications.professional.title')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-md">
              {professionalDev.map((pd, index) => (
                <motion.div
                  key={pd.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.05 }}
                  className="flex flex-col bg-neutral-50 dark:bg-background-dark-elevated p-md rounded-lg"
                >
                  <div className="flex-grow">
                    <BookOpen className="w-5 h-5 text-primary-600 dark:text-primary-400 mb-xs" />
                    <h3 className="text-body font-medium mb-xs text-neutral-900 dark:text-neutral-100">{pd.title}</h3>
                    <p className="text-small text-neutral-600 dark:text-neutral-400 mb-xs">
                      {pd.organization}
                    </p>
                    <p className="text-small text-primary-600 dark:text-primary-400 mb-md">
                      {pd.year}
                    </p>
                  </div>
                  <div className="pt-xs border-t border-neutral-200 dark:border-neutral-700">
                    <CertificateModal
                      certificateUrl={pd.certificate_path?.startsWith('http')
                        ? pd.certificate_path
                        : `https://isbicrdzbyxeckyckrmg.supabase.co/storage/v1/object/public/certificates/${pd.certificate_path}`}
                      trigger={
                        <button className="inline-flex items-center space-x-2 rtl:space-x-reverse text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-small font-medium transition-colors group">
                          <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                          <span>{t('nav.viewCertificate')}</span>
                        </button>
                      }
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
