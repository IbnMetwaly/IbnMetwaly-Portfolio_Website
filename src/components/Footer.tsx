import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Linkedin, Mail, Phone, ExternalLink } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const isArabic = i18n.language === 'ar';

  return (
    <footer className="bg-white dark:bg-background-dark-surface border-t border-neutral-200 dark:border-neutral-700 py-2xl">
      <div className="max-w-container mx-auto px-lg">
        <div className="grid md:grid-cols-3 gap-xl mb-xl">
          {/* About */}
          <div>
            <img
              src={theme === 'light' ? '/images/logo_light.png' : '/images/logo_dark.png'}
              alt="Khalid Metwaly"
              className="h-10 w-auto mb-md"
            />
            <p className="text-small text-neutral-700 dark:text-neutral-300">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 mb-md">{t('footer.quickLinks', 'Quick Links')}</h3>
            <ul className="space-y-2">
              {[
                { path: '/about', label: t('nav.about') },
                { path: '/philosophy', label: t('nav.philosophy') },
                { path: '/journey', label: t('nav.journey') },
                { path: '/impact', label: t('nav.impact') },
                { path: '/contact', label: t('nav.contact') }
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-small text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-fast"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 mb-md">{t('contact.info.title')}</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 rtl:space-x-reverse text-small">
                <Mail className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                <a
                  href="mailto:k.metwaly@hotmail.com"
                  className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  k.metwaly@hotmail.com
                </a>
              </li>
              <li className="flex items-center space-x-3 rtl:space-x-reverse text-small">
                <Phone className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                <span>+971 54 500 9890</span>
              </li>
              <li className="flex items-center space-x-3 rtl:space-x-reverse text-small">
                <Linkedin className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                <a
                  href="https://linkedin.com/in/ibnmetwaly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors inline-flex items-center space-x-2"
                >
                  <span>linkedin.com/in/ibnmetwaly</span>
                  <ExternalLink className="w-4 h-4" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-xl border-t border-neutral-200 dark:border-neutral-700">
          <p className="text-center text-small text-neutral-600 dark:text-neutral-400">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
