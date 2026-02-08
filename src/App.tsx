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
import Qualifications from './pages/Qualifications';
import Skills from './pages/Skills';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';

// New Pages
import Gallery from './pages/Gallery';
import Services from './pages/Services';
import Playground from './pages/Playground';

// Admin Imports
import Login from './pages/admin/Login';
import AdminLayout from './pages/admin/components/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import TimelineManager from './pages/admin/sections/Timeline';
import GalleryManager from './pages/admin/sections/Gallery';
import QualificationsManager from './pages/admin/sections/Qualifications';
import { ProtectedRoute } from './pages/admin/components/ProtectedRoute';

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
            <Route path="/qualifications" element={<Qualifications />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />

            {/* New Public Routes */}
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/services" element={<Services />} />
            <Route path="/playground" element={<Playground />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="timeline" element={<TimelineManager />} />
              <Route path="gallery" element={<GalleryManager />} />
              <Route path="qualifications" element={<QualificationsManager />} />
            </Route>
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
