import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants';
import { ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';

const ServicesPage: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const scrollToContact = () => {
    window.location.href = '/#/contact';
  };

  return (
    <main className="pt-28 pb-20">
      <div className="container mx-auto px-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <span className="section-label">Our Expertise</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Services That <span className="gradient-text">Power Growth</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            We provide a comprehensive suite of digital solutions — from custom software development 
            to AI integration, cloud architecture, and cybersecurity — engineered for enterprise scale.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => {
            const Icon = (Icons as any)[service.icon];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.6 }}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={scrollToContact}
                className="nebo-card p-8 group cursor-pointer relative overflow-hidden"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                {/* Glow blob */}
                <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/15 transition-colors duration-500" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-300">
                    {Icon && <Icon size={26} />}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="flex items-center gap-2 text-purple-400 text-sm font-semibold">
                    Inquire Now
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default ServicesPage;
