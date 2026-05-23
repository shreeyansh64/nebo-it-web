import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { TESTIMONIALS } from '../constants';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const parallaxScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.98]);

  const goTo = useCallback((index: number) => { setDirection(index > activeIndex ? 1 : -1); setActiveIndex(index); }, [activeIndex]);
  const goNext = useCallback(() => { setDirection(1); setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length); }, []);
  const goPrev = useCallback(() => { setDirection(-1); setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length); }, []);

  useEffect(() => { const timer = setInterval(goNext, 6000); return () => clearInterval(timer); }, [goNext]);

  const testimonial = TESTIMONIALS[activeIndex];

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0, transition: { duration: 0.3 } }),
  };

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6">
        {/* Header — glass pane slide-in */}
        <motion.div
          initial={{ opacity: 0, x: -80, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="text-center mb-16"
        >
          <span className="section-label justify-center">Client Voices</span>
          <h2 className="section-title text-center mx-auto">What Our AI Partners Say</h2>
          <p className="section-subtitle text-center mx-auto mt-4">
            Real outcomes from real clients who trusted Nebo IT to transform their operations with intelligent technology.
          </p>
        </motion.div>

        {/* Testimonial Card — parallax depth */}
        <motion.div className="max-w-4xl mx-auto relative" style={{ y: parallaxY, scale: parallaxScale }}>
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="nebo-card p-8 md:p-14 relative overflow-hidden min-h-[320px] flex flex-col justify-center"
          >
            <Quote size={120} className="absolute top-4 right-4 text-purple-500/5" />
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div key={activeIndex} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" className="relative z-10">
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                  <span className="ml-3 text-xs font-semibold tracking-wider uppercase text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">{testimonial.projectType}</span>
                </div>
                <blockquote className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 font-light italic">"{testimonial.quote}"</blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">{testimonial.name.charAt(0)}</div>
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => goTo(i)} className={`h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8 bg-purple-500' : 'w-2 bg-gray-600 hover:bg-gray-500'}`} aria-label={`Go to testimonial ${i + 1}`} />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={goPrev} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/50 transition-all" aria-label="Previous testimonial"><ChevronLeft size={18} /></button>
              <button onClick={goNext} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/50 transition-all" aria-label="Next testimonial"><ChevronRight size={18} /></button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
