import React from 'react';
import Hero from '../components/Hero';
import StatsCounter from '../components/StatsCounter';
import Certifications from '../components/Certifications';
import Clients from '../components/Clients';
import ServiceHighlights from '../components/ServiceHighlights';
import ProcessSection from '../components/ProcessSection';
import Testimonials from '../components/Testimonials';
import CTABanner from '../components/CTABanner';

const HomePage: React.FC = () => {
  return (
    <main>
      <Hero />
      <StatsCounter />
      <Certifications />
      <Clients />
      <ServiceHighlights />
      <ProcessSection />
      <Testimonials />
      <CTABanner />
    </main>
  );
};

export default HomePage;
