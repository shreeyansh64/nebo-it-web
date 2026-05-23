import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lightbulb, Users, Award, Target, Cpu } from 'lucide-react';
import OrganizationalChart from '../components/OrganizationalChart';

const whyChooseUs = [
  { icon: Lightbulb, title: 'Innovative Solutions', description: 'Cutting-edge technology and best practices for solutions tailored to your requirements.' },
  { icon: Shield, title: 'Enterprise Security', description: 'Comprehensive security audits, encryption, and proactive vulnerability management.' },
  { icon: Target, title: 'Results-Driven', description: 'Every project starts with your goals. We deliver measurable ROI and sustainable growth.' },
  { icon: Users, title: 'Dedicated Team', description: 'Skilled engineers with years of experience in development and project execution.' },
  { icon: Cpu, title: 'Modern Tech Stack', description: 'React, Next.js, Node.js, Python, AWS, Azure — the best tools for each challenge.' },
  { icon: Award, title: 'Certified Quality', description: 'ISO 9001 & ISO 27001 certified with rigorous quality standards.' },
];

const AboutPage: React.FC = () => {
  return (
    <main className="pt-28 pb-20">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-24">
          <span className="section-label">Who We Are</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8" style={{ fontFamily: 'var(--font-display)' }}>
            Building the Future of <span className="gradient-text">Digital India</span>
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
            <div className="space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed">
                NEBO IT Solutions delivers state-of-the-art IT solutions for industrial entities. As an IT Division of
                <strong className="text-purple-300"> Nebo Engineering India Pvt. Ltd.</strong>, we combine engineering rigor with digital innovation.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Our experts conduct in-depth business analysis and determine the most effective solutions. From government platforms to airport kiosks, we deliver enterprise-grade solutions across India.
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-gray-400 leading-relaxed">
                Operating under Nebo Industries, we undertake projects across Civil, Electrical, Mechanical, IT, and Non-Conventional Energy — giving us unique real-world engineering insight.
              </p>
              <div className="flex flex-wrap gap-3">
                {['ISO 9001', 'ISO 27001', 'Startup India'].map((b) => (
                  <span key={b} className="px-4 py-2 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/10">{b}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <section className="mb-32">
          <div className="text-center mb-16">
            <span className="section-label justify-center">Our Advantages</span>
            <h2 className="section-title text-center mx-auto">Why Choose Nebo IT?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="nebo-card p-8 group">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/10 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-110 transition-transform">
                  <item.icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <OrganizationalChart />
      </div>
    </main>
  );
};

export default AboutPage;
