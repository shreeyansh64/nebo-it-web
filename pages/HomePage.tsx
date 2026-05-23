import React from 'react';

import Hero from '../components/Hero';
import StatsCounter from '../components/StatsCounter';
import Certifications from '../components/Certifications';
import Clients from '../components/Clients';
import ServiceOrbit from '../components/ServiceOrbit';
import ProcessSection from '../components/ProcessSection';
import Testimonials from '../components/Testimonials';
import CTABanner from '../components/CTABanner';
import CurtainReveal from '../components/CurtainReveal';

const HomePage: React.FC = () => {
  return (
    <CurtainReveal>
      <main>
        <Hero />
        <StatsCounter />
        <Certifications />
        <Clients />
        <ServiceOrbit />
        <ProcessSection />
        <Testimonials />
        <CTABanner />
      </main>
    </CurtainReveal>
  );
};

export default HomePage;
