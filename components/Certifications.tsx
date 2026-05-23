import React from 'react';
import { motion } from 'framer-motion';
import { CERTIFICATION_LOGOS } from '../constants';

const Certifications: React.FC = () => {
  return (
    <section className="py-12 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {CERTIFICATION_LOGOS.map((logo, i) => (
            <motion.div
              key={logo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white/[0.03] border border-white/5 rounded-xl px-6 py-4 flex items-center justify-center hover:bg-white/[0.06] hover:border-purple-500/20 transition-all duration-300 group"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-10 md:h-12 w-auto object-contain opacity-50 group-hover:opacity-80 transition-opacity duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;