import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { STATS } from '../constants';
import * as Icons from 'lucide-react';

const CountingNumber: React.FC<{ target: number; suffix: string; isVisible: boolean }> = ({ target, suffix, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const stepTime = duration / target;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <span className="text-4xl md:text-5xl font-bold gradient-text tabular-nums">
      {count}{suffix}
    </span>
  );
};

const StatsCounter: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  /* parallax background */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  /* alternating 3D slide from left/right */
  const cardVariants = (index: number) => ({
    hidden: {
      opacity: 0,
      x: index % 2 === 0 ? -80 : 80,
      rotateY: index % 2 === 0 ? 25 : -25,
      scale: 0.8,
      filter: 'blur(6px)',
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.9,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  });

  return (
    <section ref={ref} className="py-20 md:py-28 relative overflow-hidden" style={{ perspective: '1200px' }}>
      {/* Parallax Background accent */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          y: bgY,
          background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, index) => {
            const Icon = (Icons as any)[stat.icon];
            return (
              <motion.div
                key={stat.id}
                variants={cardVariants(index)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="text-center group"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/10 text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                  {Icon && <Icon size={22} />}
                </div>
                <CountingNumber target={stat.value} suffix={stat.suffix} isVisible={isVisible} />
                <p className="text-sm text-gray-400 mt-2 font-medium">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
