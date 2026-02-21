import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Menu, X, Globe, Download } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import NavDropdown from './NavDropdown';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';

export default function Navigation() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const groups = [
    {
      label: t('nav.aboutMeGroup'),
      links: [
        { path: '/about', label: t('nav.about') },
        { path: '/philosophy', label: t('nav.philosophy') },
        { path: '/journey', label: t('nav.journey') },
        { path: '/impact', label: t('nav.impact') }
      ]
    },
    {
      label: t('nav.recognitionGroup'),
      links: [
        { path: '/awards', label: t('nav.awards') },
        { path: '/testimonials', label: t('nav.testimonials') }
      ]
    },
    {
      label: t('nav.qualificationsGroup'),
      links: [
        { path: '/certifications', label: t('nav.certifications') },
        { path: '/skills', label: t('nav.skills') }
      ]
    }
  ];

  const standaloneLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/contact', label: t('nav.contact') }
  ];

  return (
    <nav
      className={`fixed top-0 ${i18n.language === 'ar' ? 'right-0 left-0' : 'left-0 right-0'} z-50 transition-all duration-normal ${
        isScrolled
          ? 'bg-white/90 dark:bg-background-dark-page/90 backdrop-blur-xl shadow-sm-light dark:shadow-sm-dark'
          : 'bg-white/80 dark:bg-background-dark-page/80 backdrop-blur-md'
      }`}
    >
      <div className="max-w-container mx-auto px-lg">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src={theme === 'light' ? '/images/logo_light.png' : '/images/logo_dark.png'}
              alt="Khalid Metwaly"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 rtl:space-x-reverse">
            <Link
              to="/"
              className={`text-small font-medium transition-colors duration-fast hover:text-primary-600 dark:hover:text-primary-400 relative ${
                location.pathname === '/'
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-neutral-700 dark:text-neutral-300'
              }`}
            >
              {t('nav.home')}
              {location.pathname === '/' && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400"
                />
              )}
            </Link>

            {groups.map((group) => (
              <NavDropdown key={group.label} label={group.label} links={group.links} />
            ))}

            <Link
              to="/contact"
              className={`text-small font-medium transition-colors duration-fast hover:text-primary-600 dark:hover:text-primary-400 relative ${
                location.pathname === '/contact'
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-neutral-700 dark:text-neutral-300'
              }`}
            >
              {t('nav.contact')}
              {location.pathname === '/contact' && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400"
                />
              )}
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <TooltipProvider>
              {/* Language Toggle */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={toggleLanguage}
                    className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-fast focus-visible:ring-2 focus-visible:ring-primary-500"
                    aria-label={i18n.language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
                  >
                    <Globe className="w-5 h-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  sideOffset={4}
                  className="bg-neutral-900 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 px-3 py-1.5 text-sm rounded-md"
                >
                  <p>{i18n.language === 'en' ? 'Switch to Arabic' : 'Switch to English'}</p>
                </TooltipContent>
              </Tooltip>

              {/* Theme Toggle */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={toggleTheme}
                    className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-fast focus-visible:ring-2 focus-visible:ring-primary-500"
                    aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
                  >
                    {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  sideOffset={4}
                  className="bg-neutral-900 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 px-3 py-1.5 text-sm rounded-md"
                >
                  <p>{theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {/* Download CV Button */}
            <a
              href="/Khalid_Metwaly_CV.pdf"
              download="Khalid_Metwaly_CV.pdf"
              className="hidden md:flex items-center space-x-2 rtl:space-x-reverse px-6 py-2.5 bg-primary-600 dark:bg-primary-400 text-white dark:text-neutral-900 rounded-md font-semibold hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg-light dark:hover:shadow-md-dark transition-all duration-fast"
            >
              <Download className="w-4 h-4" /><span>{t('nav.downloadCV')}</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-fast"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-white dark:bg-background-dark-surface border-t border-neutral-200 dark:border-neutral-700 overflow-hidden"
            data-testid="mobile-menu"
          >
            <div className="px-lg py-6 space-y-2">
              {[...standaloneLinks, ...groups.flatMap(g => g.links)].map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-md font-medium transition-colors duration-fast ${
                      location.pathname === link.path
                        ? 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                        : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (standaloneLinks.length + groups.flatMap(g => g.links).length) * 0.05 }}
                className="pt-4 px-4"
              >
                <a
                  href="/Khalid_Metwaly_CV.pdf"
                  download="Khalid_Metwaly_CV.pdf"
                  className="flex items-center justify-center space-x-2 rtl:space-x-reverse w-full py-4 bg-primary-600 dark:bg-primary-400 text-white dark:text-neutral-900 rounded-md font-bold shadow-md hover:bg-primary-700 dark:hover:bg-primary-500 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  <span>{t('nav.downloadCV')}</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
