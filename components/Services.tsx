import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants';
import * as Icons from 'lucide-react';

const ServiceCard: React.FC<{ service: typeof SERVICES[0]; index: number }> = ({ service, index }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  
  const Icon = (Icons as any)[service.icon];
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } 
  }
};
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    setRotateX((y - centerY) / 10);
    setRotateY(-(x - centerX) / 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.section variants={containerVariants} initial="hidden" whileInView="visible">
    <motion.div
    variants={itemVariants}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
        transition: 'rotate 0.1s ease-out'
      } as any}
      className={`relative p-8 rounded-3xl glass group overflow-hidden cursor-pointer ${
        index === 0 || index === 3 || index == 4 ||index==7 || index==8  ? 'md:col-span-2' : 'md:col-span-1'
      }`}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      
      <div className="relative z-10 h-full flex flex-col">
        <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
          <Icon size={24} />
        </div>
        
        <h3 className="text-2xl font-bold mb-4 group-hover:text-cyan-400 transition-colors">{service.title}</h3>
        <p className="text-slate-400 leading-relaxed mb-8 flex-grow">{service.description}</p>
        
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm group/link">
          Inquire Now
          <Icons.ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-colors" />
    </motion.div>
    </motion.section>
  );
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl min-[375px]:text-4xl md:text-6xl font-black mb-6 break-words">SERVICES</h2>
            <p className="text-slate-400 text-lg">We push the boundaries of what is possible online, providing a specialized suite of creative engineering solutions.</p>
          </div>
          <div className="h-px bg-slate-800 flex-grow hidden md:block mx-10 mb-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;