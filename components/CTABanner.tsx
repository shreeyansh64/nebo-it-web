import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';

const CTABanner: React.FC = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(99, 102, 241, 0.1) 50%, rgba(124, 58, 237, 0.08) 100%)',
          }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

          {/* Border */}
          <div className="absolute inset-0 rounded-3xl border border-purple-500/10 pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8"
            >
              <Zap size={14} className="text-purple-400" />
              <span className="text-xs font-semibold tracking-wider uppercase text-purple-300">Ready to start?</span>
            </motion.div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-3xl mx-auto leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Ready to Transform Your <span className="gradient-text">Digital Presence?</span>
            </h2>

            <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Let's discuss how Nebo IT Solutions can engineer the perfect digital solution for your enterprise.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/contact" className="btn-primary text-base">
                <span>Start Your Project</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/portfolio" className="btn-secondary text-base">
                View Our Work
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;
