import React from 'react';
import { motion } from 'framer-motion';
import { CLIENT_LOGOS } from '../constants';

const Clients: React.FC = () => {
  return (
    <section className="py-16 relative overflow-hidden border-y border-white/5">
      <div className="container mx-auto px-6 mb-8 text-center">
        <span className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-500">
          Trusted by Industry Leaders
        </span>
      </div>

      <div className="flex w-max">
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
      </div>
    </section>
  );
};

export default Clients;
