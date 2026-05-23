import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 md:py-28 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.02] to-transparent pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, index) => {
            const Icon = (Icons as any)[stat.icon];
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="text-center group"
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
