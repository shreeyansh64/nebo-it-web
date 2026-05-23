import React from 'react';
import { motion } from 'framer-motion';

const CERTIFICATIONS_DETAILS = [
  {
    id: 1,
    src: '/img/iso_9001.svg',
    alt: 'ISO 9001:2015',
    title: 'ISO 9001:2015',
    subtitle: 'Quality Management',
    badge: 'Quality Standard',
    description: 'Ensuring our software engineering, delivery methodologies, and consulting services consistently exceed international benchmarks.',
    logoClass: 'grayscale brightness-150 contrast-125 opacity-40 group-hover:opacity-100 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500',
    bgLight: 'from-blue-500/[0.01] to-purple-500/[0.01] group-hover:from-blue-500/[0.05] group-hover:to-purple-500/[0.05]'
  },
  {
    id: 2,
    src: '/img/iso_27001.svg',
    alt: 'ISO 27001',
    title: 'ISO 27001',
    subtitle: 'Information Security',
    badge: 'Information Security',
    description: 'Verifying our enterprise protocols for data protection, network resilience, systems safety, and secure software architecture.',
    logoClass: 'invert brightness-[0.7] opacity-40 group-hover:opacity-100 group-hover:brightness-100 transition-all duration-500',
    bgLight: 'from-purple-500/[0.01] to-indigo-500/[0.01] group-hover:from-purple-500/[0.05] group-hover:to-indigo-500/[0.05]'
  },
  {
    id: 3,
    src: '/img/startup_india.png',
    alt: 'Startup India',
    title: 'Startup India',
    subtitle: 'DPIIT Recognized',
    badge: 'Government Approved',
    description: 'Officially recognized as an innovative tech enterprise under the flagship program of the Government of India.',
    logoClass: 'grayscale brightness-120 contrast-110 opacity-40 group-hover:opacity-100 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500',
    bgLight: 'from-orange-500/[0.01] to-red-500/[0.01] group-hover:from-orange-500/[0.05] group-hover:to-red-500/[0.05]'
  }
];

/* 3D flip-in card variants */
const cardVariants = (i: number) => ({
  hidden: {
    opacity: 0,
    rotateY: 90,
    scale: 0.7,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    rotateY: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 1,
      delay: i * 0.2,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
});

const headerVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const Certifications: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-transparent to-[#06060e]" style={{ perspective: '1200px' }}>
      {/* Background radial accent glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/[0.01] via-transparent to-indigo-500/[0.01] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-radial-gradient from-purple-500/[0.01] to-transparent blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="section-label"
          >
            Trust & Compliance
          </motion.div>
          <motion.h2
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="section-title text-3xl md:text-5xl font-bold font-display text-white mt-4"
          >
            Accredited & Certified for Excellence
          </motion.h2>
          <motion.p
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="section-subtitle mx-auto text-base text-gray-400 mt-6"
          >
            We are committed to delivering the highest quality software and infrastructure services. Our operations adhere to strict international standards for security, quality, and government compliance.
          </motion.p>
        </div>

        {/* Certifications Grid — 3D Flip-In */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CERTIFICATIONS_DETAILS.map((cert, i) => (
            <motion.div
              key={cert.id}
              variants={cardVariants(i)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="relative overflow-hidden nebo-glass nebo-card rounded-2xl p-8 flex flex-col items-start gap-6 hover:shadow-glow group transition-all duration-500"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Card radial background highlight */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cert.bgLight} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              {/* Glowing tech top line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Logo Area */}
              <div className="relative flex items-center justify-center w-full h-32 bg-white/[0.01] border border-white/[0.04] rounded-xl overflow-hidden group-hover:bg-white/[0.03] group-hover:border-purple-500/20 transition-all duration-300">
                <img
                  src={cert.src}
                  alt={cert.alt}
                  className={`h-16 w-auto object-contain ${cert.logoClass}`}
                />
              </div>

              {/* Title & Badge */}
              <div className="flex flex-col gap-2 w-full mt-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h3 className="text-xl font-bold font-display text-white group-hover:text-purple-300 transition-colors duration-300">
                    {cert.title}
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-purple-500/10 text-purple-300 border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors duration-300">
                    {cert.badge}
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-medium">
                  {cert.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-400 leading-relaxed font-body">
                {cert.description}
              </p>

              {/* Tech corner decoration accents */}
              <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-white/5 rounded-tl group-hover:border-purple-500/30 transition-colors" />
              <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-white/5 rounded-tr group-hover:border-purple-500/30 transition-colors" />
              <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-white/5 rounded-bl group-hover:border-purple-500/30 transition-colors" />
              <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-white/5 rounded-br group-hover:border-purple-500/30 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;