import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CLIENT_LOGOS } from '../constants';

const Clients: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-16 relative overflow-hidden border-y border-white/5">
      {/* sweep reveal wrapper */}
      <motion.div
        initial={{ opacity: 0, x: -100, filter: 'blur(12px)' }}
        animate={isInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="container mx-auto px-6 mb-8 text-center"
      >
        <span className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-500">
          Trusted by Industry Leaders
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        style={{ transformOrigin: 'left center' }}
        className="flex w-max"
      >
        <div
          className="flex gap-16 items-center px-8 animate-marquee"
        >
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, idx) => (
            <span
              key={idx}
              className="text-2xl md:text-4xl font-bold text-gray-700/60 hover:text-purple-400/40 transition-colors cursor-default select-none tracking-tighter whitespace-nowrap"
            >
              {logo}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Clients;
