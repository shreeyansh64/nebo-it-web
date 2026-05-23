import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PROCESS_STEPS } from '../constants';
import * as Icons from 'lucide-react';

const ProcessSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const cardVariants = (i: number) => ({
    hidden: { opacity: 0, y: 60, scale: 0.85, filter: 'blur(8px)' },
    visible: {
      opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
      transition: { duration: 0.8, delay: i * 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  });

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2" />
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="text-center mb-20"
        >
          <span className="section-label justify-center">How We Work</span>
          <h2 className="section-title text-center mx-auto">Our AI-First Engineering Process</h2>
          <p className="section-subtitle mx-auto text-center mt-4">
            A rigorous, intelligence-driven methodology that turns your vision into a production-grade AI system — on time, on budget, and built to last.
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-[2px] -translate-y-1/2 origin-left"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.35), rgba(129,140,248,0.35), transparent)', boxShadow: '0 0 12px rgba(124,58,237,0.2)' }}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = (Icons as any)[step.icon];
              return (
                <motion.div key={step.id} variants={cardVariants(index)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="relative group">
                  <div className="nebo-card p-8 text-center h-full flex flex-col items-center relative overflow-hidden">
                    <div className="absolute top-4 right-4 text-5xl font-black text-purple-500/5 select-none">{String(step.step).padStart(2, '0')}</div>
                    <motion.div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-purple-500" initial={{ scale: 0, opacity: 0 }} animate={isInView ? { scale: 1, opacity: 1 } : {}} transition={{ delay: 0.6 + index * 0.3, duration: 0.4, type: 'spring' }} style={{ boxShadow: '0 0 12px rgba(124,58,237,0.6)' }} />
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform relative z-10">{Icon && <Icon size={28} />}</div>
                    <h3 className="text-lg font-bold text-white mb-3 relative z-10">{step.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed relative z-10">{step.description}</p>
                  </div>
                  {index < PROCESS_STEPS.length - 1 && (
                    <div className="lg:hidden flex justify-center my-4">
                      <motion.div className="w-[2px] h-8 origin-top" initial={{ scaleY: 0, opacity: 0 }} whileInView={{ scaleY: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.5 }} style={{ background: 'linear-gradient(to bottom, rgba(124,58,237,0.4), transparent)' }} />
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
