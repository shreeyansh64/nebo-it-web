import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SERVICES } from '../constants';
import { ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';

const ServiceHighlights: React.FC = () => {
  const highlightedServices = SERVICES.slice(0, 4);

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="section-label">What We Do</span>
            <h2 className="section-title">Services That Drive<br />Digital Excellence</h2>
          </div>
          <Link
            to="/services"
            className="group flex items-center gap-2 text-purple-400 font-semibold text-sm hover:text-purple-300 transition-colors self-start md:self-auto"
          >
            View All Services
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {highlightedServices.map((service, index) => {
            const Icon = (Icons as any)[service.icon];
            const isLarge = index === 0 || index === 3;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`nebo-card p-8 md:p-10 group relative overflow-hidden cursor-pointer ${
                  isLarge ? 'md:col-span-2' : ''
                }`}
              >
                {/* Hover glow */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/15 transition-colors duration-500" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-300">
                    {Icon && <Icon size={26} />}
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed mb-6 max-w-2xl">
                    {service.description}
                  </p>

                  <div className="flex items-center gap-2 text-purple-400 text-sm font-semibold group-hover:gap-3 transition-all">
                    Learn More
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlights;
