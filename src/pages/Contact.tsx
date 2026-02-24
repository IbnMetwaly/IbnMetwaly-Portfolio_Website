import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Send, Download, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const { data, error } = await supabase.functions.invoke('contact-form', {
        body: formData
      });

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
            {t('contact.title')}
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-body-large text-neutral-700 dark:text-neutral-300"
          >
            {t('contact.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-2xl bg-white dark:bg-background-dark-surface">
        <div className="max-w-container mx-auto px-lg">
          <div className="grid lg:grid-cols-3 gap-xl">
            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="lg:col-span-2"
            >
              <h2 className="text-h2 font-bold text-neutral-900 dark:text-neutral-100 mb-xl">{t('contact.form.submit')}</h2>
              <form onSubmit={handleSubmit} className="space-y-lg">
                <div>
                  <label htmlFor="name" className="block text-body font-medium text-neutral-900 dark:text-neutral-100 mb-xs">
                    {t('contact.form.name')}
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={t('contact.form.namePlaceholder')}
                    className="w-full px-4 py-3 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-background-dark-elevated text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-50 dark:focus:ring-primary-900 transition-all outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-body font-medium text-neutral-900 dark:text-neutral-100 mb-xs">
                    {t('contact.form.email')}
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder={t('contact.form.emailPlaceholder')}
                    className="w-full px-4 py-3 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-background-dark-elevated text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-50 dark:focus:ring-primary-900 transition-all outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-body font-medium text-neutral-900 dark:text-neutral-100 mb-xs">
                    {t('contact.form.subject')}
                  </label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder={t('contact.form.subjectPlaceholder')}
                    className="w-full px-4 py-3 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-background-dark-elevated text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-50 dark:focus:ring-primary-900 transition-all outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-body font-medium text-neutral-900 dark:text-neutral-100 mb-xs">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder={t('contact.form.messagePlaceholder')}
                    className="w-full px-4 py-3 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-background-dark-elevated text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-50 dark:focus:ring-primary-900 transition-all outline-none resize-y"
                  />
                </div>

                {submitStatus && (
                  <div
                    className={`p-lg rounded-md ${submitStatus === 'success'
                        ? 'bg-semantic-success/10 text-semantic-success'
                        : 'bg-semantic-error/10 text-semantic-error'
                      }`}
                  >
                    {submitStatus === 'success'
                      ? t('contact.form.success')
                      : t('contact.form.error')}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-primary-600 dark:bg-primary-400 text-white dark:text-neutral-900 rounded-md font-semibold hover:scale-105 hover:-translate-y-1 hover:shadow-lg-light dark:hover:shadow-md-dark transition-all duration-fast disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 rtl:space-x-reverse"
                >
                  <Send className="w-5 h-5" />
                  <span>
                    {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
                  </span>
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-neutral-50 dark:bg-background-dark-elevated p-xl rounded-lg">
                <h2 className="text-h2 font-bold text-neutral-900 dark:text-neutral-100 mb-xl">{t('contact.info.title')}</h2>

                <div className="space-y-lg mb-xl">
                  <a
                    href="mailto:k.metwaly@hotmail.com"
                    className="flex items-center space-x-md rtl:space-x-reverse hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <span className="text-body">{t('contact.info.email')}</span>
                  </a>

                  <a
                    href="tel:+971545009890"
                    className="flex items-center space-x-md rtl:space-x-reverse hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <span className="text-body">{t('contact.info.phone')}</span>
                  </a>

                  <a
                    href="https://linkedin.com/in/ibnmetwaly"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-md rtl:space-x-reverse hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                      <Linkedin className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <span className="text-body">{t('contact.info.linkedin')}<span className="sr-only"> (opens in a new tab)</span></span>
                  </a>
                </div>

                <div className="space-y-md">
                  <a
                    href="/Khalid_Metwaly_CV.pdf"
                    download
                    className="flex items-center justify-center space-x-2 rtl:space-x-reverse w-full px-6 py-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-md font-semibold hover:scale-105 transition-all duration-fast"
                  >
                    <Download className="w-5 h-5" />
                    <span>{t('contact.links.downloadCV')}</span>
                  </a>

                  <a
                    href="https://aacens.wixsite.com/futurewriters"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 rtl:space-x-reverse w-full px-6 py-3 border-2 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-md font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-fast"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>{t('contact.links.futureWriters')}<span className="sr-only"> (opens in a new tab)</span></span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
