import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lightbulb, Users, Award, Target, Cpu } from 'lucide-react';
import OrganizationalChart from '../components/OrganizationalChart';

const whyChooseUs = [
  { icon: Lightbulb, title: 'AI-Native Innovation', description: 'Every solution we build has machine intelligence baked in from day one — LLMs, neural networks, and autonomous workflows are our default, not an afterthought.' },
  { icon: Shield, title: 'Enterprise-Grade Security', description: 'AI-powered threat detection, end-to-end encryption, and proactive vulnerability management harden your digital perimeter against evolving adversarial attacks.' },
  { icon: Target, title: 'Outcome-Driven AI', description: 'We don\'t deliver models — we deliver measurable business outcomes. Every AI system is benchmarked against real KPIs: uptime, accuracy, ROI, and cost reduction.' },
  { icon: Users, title: 'Multidisciplinary AI Team', description: 'ML engineers, data scientists, cloud architects, and UX specialists — all AI-trained and working in lockstep to deliver production-grade intelligent systems.' },
  { icon: Cpu, title: 'Full-Stack AI Capability', description: 'From on-device edge inference to GPU-accelerated cloud training, from RAG pipelines to real-time computer vision — we operate the entire modern AI stack.' },
  { icon: Award, title: 'Certified & Trusted', description: 'ISO 9001 & ISO 27001 certified, Startup India recognized. Our processes and models meet the strictest standards for quality, security, and regulatory compliance.' },
];

const AboutPage: React.FC = () => {
  return (
    <main className="pt-28 pb-20">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-24">
          <span className="section-label">Who We Are</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8" style={{ fontFamily: 'var(--font-display)' }}>
            Building the AI-Powered <span className="gradient-text">Infrastructure of Tomorrow</span>
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
            <div className="space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed">
                NEBO IT Solutions is an <strong className="text-purple-300">AI-first technology company</strong> and the IT Division of
                <strong className="text-purple-300"> Nebo Engineering India Pvt. Ltd.</strong> We don't just digitize — we
                intelligentize. Every system we build is powered by machine learning, neural inference, and autonomous reasoning.
              </p>
              <p className="text-gray-400 leading-relaxed">
                From LLM-powered government platforms to computer vision quality systems and predictive maintenance AI —
                we deploy intelligence that delivers measurable outcomes at enterprise scale across India.
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-gray-400 leading-relaxed">
                As part of Nebo Industries — spanning Civil, Electrical, Mechanical, IT, and Renewable Energy — we bring
                a unique engineering-meets-AI perspective. Our models are trained on real operational data from
                physical-world infrastructure, not just synthetic benchmarks.
              </p>
              <div className="flex flex-wrap gap-3">
                {['ISO 9001', 'ISO 27001', 'Startup India', 'AI-First', 'Edge ML', 'LLM Integration'].map((b) => (
                  <span key={b} className="px-4 py-2 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/10">{b}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <section className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="section-label justify-center">Our Advantages</span>
            <h2 className="section-title text-center mx-auto">Why Choose Nebo IT?</h2>
            <p className="section-subtitle text-center mx-auto mt-4">
              We're not just technology providers — we're AI engineering partners who co-own your outcomes.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="nebo-card p-8 group hover:border-purple-500/30"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/10 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-300">
                  <item.icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">{item.title}</h3>
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
