import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const wordVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { delay: 0.3 + i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    }),
  };


  const headline = ['Powering', 'The Future', 'With', 'Intelligent', 'AI'];

  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Dot grid */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(rgba(124, 58, 237, 0.15) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      <div className="relative z-10 container mx-auto px-6 text-center pt-24 pb-32">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/5 mb-10"
        >
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-widest uppercase text-purple-300">
            AI-First · ISO Certified · Startup India Recognized
          </span>
        </motion.div>

        {/* Headline */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-8">
          {headline.map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={wordVariants}
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight ${i === 1 || i === 4 ? 'gradient-text' : 'text-white'
                }`}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
        >
          We architect intelligent systems that learn, reason, and evolve — fusing
          neural AI with enterprise engineering to build the digital infrastructure of tomorrow.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button onClick={() => navigate('/services')} className="btn-primary text-base">
            <span>Our Services</span>
            <ArrowRight size={18} />
          </button>
          <button onClick={() => navigate('/portfolio')} className="btn-secondary text-base">
            View Portfolio
          </button>
        </motion.div>


      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} className="text-purple-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;