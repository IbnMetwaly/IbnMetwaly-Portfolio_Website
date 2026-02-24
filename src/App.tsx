import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from './context/ThemeContext';
import './i18n';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Philosophy from './pages/Philosophy';
import Journey from './pages/Journey';
import Impact from './pages/Impact';
import Awards from './pages/Awards';
import Certifications from './pages/Certifications';
import Skills from './pages/Skills';
import Contact from './pages/Contact';

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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/philosophy" element={<Philosophy />} />
            <Route path="/journey" element={<Journey />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/awards" element={<Awards />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/testimonials" element={<Awards />} />
          </Routes>
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
