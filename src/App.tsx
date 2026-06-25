import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from './context/ThemeContext';
import './i18n';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Awards = React.lazy(() => import('./pages/Awards'));
const Certifications = React.lazy(() => import('./pages/Certifications'));
const Skills = React.lazy(() => import('./pages/Skills'));
const Contact = React.lazy(() => import('./pages/Contact'));

function PageFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-lg py-2xl text-neutral-600 dark:text-neutral-300" role="status" aria-live="polite">
      Loading page…
    </div>
  );
}

function AppContent() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set document direction based on language
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <Router>
      <div className="min-h-screen bg-neutral-50 dark:bg-background-dark-page text-neutral-900 dark:text-neutral-100 transition-colors duration-normal">
        <Navigation />
        <main>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/philosophy" element={<Navigate to="/about#philosophy" replace />} />
              <Route path="/journey" element={<Navigate to="/about#journey" replace />} />
              <Route path="/impact" element={<Navigate to="/about#impact" replace />} />
              <Route path="/awards" element={<Awards />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <Analytics />
      </div>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
