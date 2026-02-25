import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from './context/ThemeContext';
import './i18n';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import PublicLayout from './components/PublicLayout';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Philosophy from './pages/Philosophy';
import Journey from './pages/Journey';
import Impact from './pages/Impact';
import Awards from './pages/Awards';
import Certifications from './pages/Certifications';
import Skills from './pages/Skills';
import Contact from './pages/Contact';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AwardsManager from './pages/admin/AwardsManager';
import CertificationsManager from './pages/admin/CertificationsManager';
import TestimonialsManager from './pages/admin/TestimonialsManager';
import ContentManager from './pages/admin/ContentManager';
import ExperienceManager from './pages/admin/ExperienceManager';
import SkillsManager from './pages/admin/SkillsManager';
import MessagesManager from './pages/admin/MessagesManager';

function AppContent() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set document direction based on language
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
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
        </Route>

        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="journey" element={<ExperienceManager />} />
            <Route path="skills" element={<SkillsManager />} />
            <Route path="awards" element={<AwardsManager />} />
            <Route path="certifications" element={<CertificationsManager />} />
            <Route path="testimonials" element={<TestimonialsManager />} />
            <Route path="content" element={<ContentManager />} />
            <Route path="messages" element={<MessagesManager />} />
            <Route path="settings" element={<div className="p-4">Settings (Coming Soon)</div>} />
          </Route>
        </Route>

        <Route path="/admin/login" element={<Login />} />
      </Routes>
      <Analytics />
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
