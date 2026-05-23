import React from 'react';
import { motion } from 'framer-motion';
import { PROCESS_STEPS } from '../constants';
import * as Icons from 'lucide-react';

const ProcessSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="section-label justify-center">How We Work</span>
          <h2 className="section-title text-center mx-auto">Our Proven Process</h2>
          <p className="section-subtitle mx-auto text-center mt-4">
            A systematic approach to transforming your vision into a high-performance digital reality.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection line (desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-[1px] -translate-y-1/2"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.2), rgba(124, 58, 237, 0.2), transparent)' }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = (Icons as any)[step.icon];
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="relative group"
                >
                  <div className="nebo-card p-8 text-center h-full flex flex-col items-center relative overflow-hidden">
                    {/* Step number */}
                    <div className="absolute top-4 right-4 text-5xl font-black text-purple-500/5 select-none">
                      {String(step.step).padStart(2, '0')}
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform relative z-10">
                      {Icon && <Icon size={28} />}
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-white mb-3 relative z-10">{step.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed relative z-10">{step.description}</p>
                  </div>

                  {/* Mobile connection line */}
                  {index < PROCESS_STEPS.length - 1 && (
                    <div className="lg:hidden flex justify-center my-4">
                      <div className="w-[1px] h-8 bg-purple-500/20" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
