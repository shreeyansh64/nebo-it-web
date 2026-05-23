import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import ScrollToTop from './components/ScrollToTop';
import ToggleSwitch from './components/ToggleSwitch';
import NeboEngineering from './components/NeboEngineering';

import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';

const App: React.FC = () => {
  const [isEngineeringMode, setIsEngineeringMode] = useState(() => {
    const savedMode = localStorage.getItem('neboSiteMode');
    return savedMode === 'engineering';
  });

  const toggleSiteMode = () => {
    setIsEngineeringMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('neboSiteMode', newMode ? 'engineering' : 'it-solutions');
      return newMode;
    });
  };

  if (isEngineeringMode) {
    return (
      <Router>
        <div className="relative min-h-screen overflow-x-hidden">
          {/* Engineering/IT Toggle */}
          <div className="fixed top-4 right-2 sm:top-6 sm:right-6 z-[9999] flex flex-col gap-3 items-end">
            <div className="it-glass p-1.5 sm:p-2 rounded-full shadow-lg scale-[0.85] sm:scale-100 origin-top-right">
              <ToggleSwitch isEngineering={isEngineeringMode} onToggle={toggleSiteMode} />
            </div>
          </div>
          <Routes>
            <Route path="*" element={
              <div className="min-h-screen w-full">
                <NeboEngineering onSwitchToIT={toggleSiteMode} />
              </div>
            } />
          </Routes>
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen overflow-x-hidden" style={{ background: '#06060e' }}>
        <AnimatedBackground />
        <Navbar onSwitchToEngineering={toggleSiteMode} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;