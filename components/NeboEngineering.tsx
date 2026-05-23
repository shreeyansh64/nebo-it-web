import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Twitter, Github, Linkedin, Instagram } from 'lucide-react';

interface NeboEngineeringProps {
  onSwitchToIT?: () => void;
}

// 2. Pass the prop into the component
const NeboEngineering: React.FC<NeboEngineeringProps> = ({ onSwitchToIT }) => {
  const [activeTab, setActiveTab] = useState<'services' | 'products'>('services');
  const [expandedBio, setExpandedBio] = useState<number | null>(null);

  const toggleBio = (index: number) => {
    setExpandedBio(expandedBio === index ? null : index);
  };

  // Animation variants for the staggered text reveal in the Hero
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="font-sans text-[var(--text-main)] bg-[var(--bg-primary)] selection:bg-cyan-500/30 transition-colors duration-300 flex flex-col min-h-screen">

      {/* 1. Hero Section - Professional Two-Column Layout */}
      <section className="relative bg-[var(--bg-secondary)] text-[var(--text-main)] min-h-[90vh] flex items-center overflow-hidden pt-24 pb-16">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute right-0 top-0 w-1/3 h-full bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none transform translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left Column: Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start text-left"
          >
            {/* Logo / Badge */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg p-2">
                <img src="/img/nebo_logo.png" alt="Nebo Logo" className="w-full h-full object-contain" />
              </div>
              <div className="px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-400 text-xs sm:text-sm font-bold tracking-widest uppercase shadow-sm">
                Committed to Quality
              </div>
            </motion.div>

            {/* FIXED HEADING */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight mb-6 text-white leading-[1.2] sm:leading-[1.1] md:leading-none break-words"
            >
              <span className="block">NEBO</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 block sm:inline">
                ENGINEERING
              </span>
            </motion.h1>

            <motion.h2 variants={itemVariants} className="text-lg sm:text-xl md:text-2xl font-medium mb-8 leading-relaxed text-[var(--text-muted)] max-w-xl">    DELIVERING ALL-IN-ONE SOLAR SOLUTIONS TAILORED TO YOUR NEEDS
            </motion.h2>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => { setActiveTab('services'); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="w-full sm:w-auto px-6 py-4 bg-cyan-500 hover:bg-white text-slate-900 font-bold rounded-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:-translate-y-1 text-center"
              >
                Explore Our Services
              </button>
              <button
                onClick={() => { window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); }}
                className="w-full sm:w-auto px-6 py-4 bg-cyan-500 hover:bg-white text-slate-900 font-bold rounded-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:-translate-y-1 text-center"
              >
                Contact Us
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column: Visual Presentation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            {/* Main Image */}
            <div className="relative z-10 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
              <img
                src="/img/solar.avif"
                alt="Solar Panel Installation"
                className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80"></div>
            </div>

            {/* Floating Experience Card */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 z-20 bg-cyan-50 p-6 rounded-xl shadow-2xl border border-slate-100 max-w-[250px]"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-2xl">
                  ☀️
                </div>
                <div>
                  <h4 className="font-black text-[#0f172a] text-xl">100%</h4>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Sustainable</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 mt-2 font-medium">Harnessing the power of the sun.</p>
            </motion.div>

            {/* Background Decorative Accent */}
            <div className="absolute -top-6 -right-6 w-full h-full border-2 border-cyan-500/20 rounded-2xl z-0 pointer-events-none"></div>
          </motion.div>

        </div>
      </section>

      {/* 2. About Us Section */}
      <section className="bg-[var(--bg-primary)] py-24 px-6 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-center">

            {/* Left Side: About Text */}
            <div className="lg:w-1/2">
              <h2 className="text-sm font-bold text-cyan-500 tracking-widest uppercase mb-2">About Us</h2>
              {/* Added text-2xl on mobile to prevent overflow */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 uppercase leading-tight break-words">
                Empowering Your Future Through Engineering Excellence
              </h3>

              <div className="space-y-4">
                <p className="text-lg text-slate-300 leading-relaxed">
                  At Nebo Engineering, we are dedicated to harnessing the power of the sun to create sustainable energy solutions that propel your business forward. As a dynamic startup specializing in solar technologies, we offer a comprehensive range of services tailored to meet your energy needs.
                </p>
                <div className="h-px w-full bg-slate-200 my-4"></div>
                <p className="text-lg text-slate-300 leading-relaxed font-medium">
                  Operating under <strong className="text-cyan-300">Nebo Industries</strong>, we possess the comprehensive capacity and capability to undertake all works related to Civil, Electrical, Mechanical, IT sector, and Non-Conventional Energy.
                </p>
              </div>
            </div>

            {/* Right Side: Core Activities Grid */}
            <div className="lg:w-1/2 w-full">
              <div className="bg-[var(--bg-subtle)] p-6 md:p-10 rounded-2xl border border-slate-200 shadow-xl relative overflow-hidden">
                {/* Decorative background accent */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl"></div>

                <h4 className="text-xl font-bold text-cyan-500 mb-6 uppercase border-b border-slate-200 pb-4">Our Core Activities</h4>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                      <span className="text-amber-600 text-sm font-bold">✓</span>
                    </div>
                    <span className="text-slate-400 font-medium">Manufacturing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                      <span className="text-amber-600 text-sm font-bold">✓</span>
                    </div>
                    <span className="text-slate-400 font-medium">Fabrication of components & assemblies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                      <span className="text-amber-600 text-sm font-bold">✓</span>
                    </div>
                    <span className="text-slate-400 font-medium">Construction</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                      <span className="text-amber-600 text-sm font-bold">✓</span>
                    </div>
                    <span className="text-slate-400 font-medium">Project monitoring & management</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                      <span className="text-amber-600 text-sm font-bold">✓</span>
                    </div>
                    <span className="text-slate-400 font-medium">Destructive & non-destructive testing of metals</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                      <span className="text-amber-600 text-sm font-bold">✓</span>
                    </div>
                    <span className="text-slate-400 font-medium">Quality assurance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                      <span className="text-amber-600 text-sm font-bold">✓</span>
                    </div>
                    <span className="text-slate-400 font-medium">Third-party inspection</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                      <span className="text-amber-600 text-sm font-bold">✓</span>
                    </div>
                    <span className="text-slate-400 font-medium">Turnkey Projects</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                      <span className="text-amber-600 text-sm font-bold">✓</span>
                    </div>
                    <span className="text-slate-400 font-medium">Solar power systems</span>
                  </li>
                  {/* VIEWPORT FIX: Converted to flex-col on mobile so the long text doesn't force container wide */}
                  <li
                    className="flex items-start gap-3 cursor-pointer hover:bg-white p-2 -ml-2 rounded-lg transition-colors group w-full"
                    onClick={() => {
                      if (onSwitchToIT) onSwitchToIT();
                      window.scrollTo(0, 0);
                    }}
                  >
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                      <span className="text-amber-600 text-sm font-bold">✓</span>
                    </div>
                    <div className="text-slate-200 font-medium underline group-hover:text-black transition-colors flex flex-col sm:block gap-1 flex-1">
                      <span>IT services </span>
                      <span className="text-sm text-slate-500 font-normal no-underline block sm:inline-block sm:ml-1">(click here to visit Nebo IT Solutions)</span>
                      <span className="text-xs text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:inline-block sm:ml-2">→ View</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Interactive Tabs */}
      <section id="services" className="bg-[var(--bg-secondary)] py-20 px-6 border-y border-slate-200 border-b border-[var(--border-subtle)]">        <div className="max-w-7xl mx-auto">

        {/* VIEWPORT FIX: Added flex-wrap and reduced base font size to text-lg on mobile */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-8 mb-12 border-b border-gray-300 pb-4">
          <button
            onClick={() => setActiveTab('services')}
            className={`text-lg sm:text-2xl font-bold transition-all whitespace-nowrap ${activeTab === 'services' ? 'text-[var(--text-main)] border-b-4 border-cyan-400' : 'text-[var(--text-muted)]'}`}
          >
            OUR SERVICES
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`text-lg sm:text-2xl font-bold transition-all whitespace-nowrap ${activeTab === 'products' ? 'text-[var(--text-main)] border-b-4 border-cyan-400' : 'text-[var(--text-muted)]'}`}
          >
            SOLAR ILLUMINATION
          </button>
        </div>

        {/* Tab Content: Services */}
        {activeTab === 'services' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-in fade-in duration-500">
            <div className="group rounded-2xl overflow-hidden shadow-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] transition-all duration-300 flex flex-col">                <div className="h-64 overflow-hidden bg-slate-100 flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=1000" alt="Solar Rooftops" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
              <div className="p-8 flex-grow bg-[var(--bg-subtle)]">
                <h3 className="text-2xl font-bold text-cyan-300 mb-4">Solar Rooftops</h3>
                <p className="text-white mb-2">Efficiently utilize your rooftop space with our expertly designed solar rooftop solutions.</p>
                <p className="text-white">From initial assessment to installation and maintenance, we ensure seamless integration and optimal performance.</p>
              </div>
            </div>

            <div className="group rounded-2xl overflow-hidden shadow-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] transition-all duration-300 flex flex-col">                <div className="h-64 overflow-hidden bg-slate-100 flex items-center justify-center">
              <img src="/img/solarground.webp" alt="Solar Ground Mounted" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
              <div className="p-8 flex-grow bg-[var(--bg-subtle)]">
                <h3 className="text-2xl font-bold text-cyan-300 mb-4">Solar Ground Mounted Systems</h3>
                <p className="text-white mb-2">Maximize land utility with our robust solar ground mounted systems.</p>
                <p className="text-white">Whether for commercial, industrial, or utility-scale projects, we deliver scalable solutions that enhance energy efficiency and reduce operational costs.</p>
              </div>
            </div>

            <div className="group rounded-2xl overflow-hidden shadow-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] transition-all duration-300 flex flex-col">                <div className="h-64 overflow-hidden bg-slate-100 flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1592833159155-c62df1b65634?q=80&w=1000" alt="Opex and Capex" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
              <div className="p-8 flex-grow bg-[var(--bg-subtle)]">
                <h3 className="text-2xl font-bold text-cyan-300 mb-4">Opex and CAPEX Projects</h3>
                <p className="text-white mb-2">Navigate the complexities of solar investment with our Opex and CAPEX project expertise.</p>
                <p className="text-white">We provide comprehensive financial analysis, project planning, and execution to maximize returns on your solar investments.</p>
              </div>
            </div>

            <div className="group rounded-2xl overflow-hidden shadow-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] transition-all duration-300 flex flex-col">                <div className="h-64 overflow-hidden bg-slate-100 flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=1000" alt="EPC Consultancy Multimeter" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
              <div className="p-8 flex-grow bg-[var(--bg-subtle)]">
                <h3 className="text-2xl font-bold text-cyan-300 mb-4">EPC CONSULTANCY</h3>
                <p className="text-white mb-2">Benefit from our extensive EPC (Engineering, Procurement, and Construction) consultancy services.</p>
                <p className="text-white">Our seasoned professionals offer strategic guidance and technical support throughout the project lifecycle, ensuring cost-effective and timely project delivery.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Products */}
        {activeTab === 'products' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-16">

            {/* Product Intro */}
            <div className="text-center max-w-5xl mx-auto">
              {/* Reduced font size slightly for narrow screens to prevent overlap */}
              <h3 className="text-2xl sm:text-3xl font-bold text-cyan-300 mb-6 uppercase">NEBO ENGINEERING SOLAR ENERGY SOLUTIONS</h3>
              <p className="text-white text-lg leading-relaxed">
                Welcome to Nebo Engineering Solar Street Lights page, where we illuminate the future with cutting-edge solar lighting solutions designed for urban and rural environments. As a leader in renewable energy technologies, Nebo Engineering combines advanced engineering with sustainable practices to deliver efficient and eco-friendly lighting solutions that enhance safety, visibility, and energy efficiency.
              </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product 1 */}
              <div className="bg-cyan-50 p-8 rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-2xl mb-6">💡</div>
                <h4 className="text-2xl font-bold text-[#0f172a] mb-4">Solar Wall Lights</h4>
                <p className="text-slate-600 leading-relaxed">
                  Nebo Engineering solar fancy lights are crafted with a focus on both style and functionality. From decorative garden lights to pathway illumination and accent lighting, our designs complement outdoor spaces while harnessing the power of the sun for energy efficiency.
                </p>
              </div>

              {/* Product 2 */}
              <div className="bg-cyan-50 p-8 rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-2xl mb-6">✨</div>
                <h4 className="text-2xl font-bold text-[#0f172a] mb-4">Exclusive Solar Lights Collections</h4>
                <p className="text-slate-600 leading-relaxed">
                  Transform your outdoor spaces with Nebo Engineering solar fancy lights, which create inviting atmospheres for residential, commercial, and public areas alike. Whether enhancing landscapes, illuminating walkways, or adding ambience to patios, our lights enhance outdoor environments with sustainable elegance.
                </p>
              </div>

              {/* Product 3 */}
              <div className="bg-cyan-50 p-8 rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-2xl mb-6">🏮</div>
                <h4 className="text-2xl font-bold text-[#0f172a] mb-4">Solar Post Lights</h4>
                <p className="text-slate-600 leading-relaxed">
                  By utilizing solar energy, Nebo Engineering fancy lights offer significant energy savings and reduce reliance on traditional grid-powered lighting. Our commitment to sustainability extends to promoting eco-friendly practices that contribute to a greener future.
                </p>
              </div>

              {/* Product 4 */}
              <div className="bg-cyan-50 p-8 rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-2xl mb-6">🛡️</div>
                <h4 className="text-2xl font-bold text-[#0f172a] mb-4">Durable Solar Wall Lights</h4>
                <p className="text-slate-600 leading-relaxed">
                  Built to withstand varying weather conditions, Nebo Engineering solar fancy lights are durable and reliable. Each light undergoes rigorous testing to ensure performance and longevity, backed by comprehensive warranty and support services for peace of mind.
                </p>
              </div>
            </div>

            {/* Why Choose Nebo Engineering Solar */}
            <div className="bg-[var(--bg-subtle)] text-white rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden">
              <h3 className="text-2xl sm:text-3xl font-bold text-center text-cyan-300 mb-12 uppercase tracking-wide">WHY CHOOSE NEBO ENGINEERING SOLAR</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center md:text-left">
                  <div className="text-amber-400 text-4xl mb-4">⭐</div>
                  <h4 className="text-xl font-bold mb-3 text-white">Quality Assurance</h4>
                  <p className="text-slate-300 leading-relaxed">
                    We use only top-tier solar components and adhere to rigorous quality standards to guarantee long-term performance and reliability.
                  </p>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-amber-400 text-4xl mb-4">🌱</div>
                  <h4 className="text-xl font-bold mb-3 text-white">Sustainability</h4>
                  <p className="text-slate-300 leading-relaxed">
                    By choosing solar energy, you contribute to a greener future and reduce your carbon footprint significantly.
                  </p>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-amber-400 text-4xl mb-4">🤝</div>
                  <h4 className="text-xl font-bold mb-3 text-white">Customer Focus</h4>
                  <p className="text-slate-300 leading-relaxed">
                    Your satisfaction is our priority. We offer personalized solutions and dedicated support throughout the project lifecycle.
                  </p>
                </div>
              </div>

              <div className="mt-12 text-center border-t border-slate-700 pt-8">
                <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                  Join the renewable energy revolution with Nebo Engineering Solar. Contact us today to discuss how we can transform your energy consumption with innovative solar solutions tailored to your needs.
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
      </section>

      {/* 4. Why Choose Us */}
      <section className="bg-[var(--bg-primary)] py-20">
        <div className="max-w-7xl mx-auto px-6 overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 w-full rounded-2xl overflow-hidden shadow-2xl">
              <img src="/img/whyus.jpg" alt="Worker on Solar Roof" className="w-full h-full object-cover" />
            </div>
            <div className="lg:w-1/2 w-full">
              {/* VIEWPORT FIX: Reduced heading size on mobile to prevent overflow */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 uppercase text-center lg:text-left">WHY CHOOSE US?</h2>
              <div className="space-y-6">
                <div className="bg-cyan-100 p-6 rounded-xl shadow-sm border-l-4 border-cyan-500">
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Innovative Solutions:</h4>
                  <p className="text-slate-600">We leverage cutting-edge technology and industry best practices to deliver innovative solar solutions tailored to your specific requirements..</p>
                </div>
                <div className="bg-cyan-100 p-6 rounded-xl shadow-sm border-l-4 border-cyan-500">
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Expertise and Experience:</h4>
                  <p className="text-slate-600">With a team of skilled engineers and industry experts, we bring years of experience in solar project development and execution.</p>
                </div>
                <div className="bg-cyan-100 p-6 rounded-xl shadow-sm border-l-4 border-cyan-500">
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Commitment to Sustainability:</h4>
                  <p className="text-slate-600">We are committed to environmental stewardship and helping businesses achieve their sustainability goals through renewable energy solutions.</p>
                </div>
                <div className="bg-cyan-100 p-6 rounded-xl shadow-sm border-l-4 border-cyan-500">
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Quality:</h4>
                  <p className="text-slate-600">Each product undergoes rigorous quality testing to ensure reliability and longevity, backed by comprehensive warranty and support services.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Board of Directors & Leadership */}
      <section id="leadership" className="bg-[var(--bg-secondary)] py-20 px-6 border-y border-slate-200">
        <div className="max-w-7xl mx-auto overflow-hidden">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-cyan-300 mb-12 uppercase tracking-wide">LEADERSHIP</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {/* 1. VIR BHAN SOOD */}
            <div onClick={() => toggleBio(5)} className="cursor-pointer bg-[var(--bg-secondary)] rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all group flex flex-col">
              <div className="h-56 w-full bg-[var(--bg-subtle)] flex items-center justify-center overflow-hidden">
                <img src="/img/Sood.jpg" alt="Vir Bhan Sood" className="w-full h-full object-contain object-top group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 flex-grow">
                <h3 className="text-lg font-bold text-white mb-1 uppercase">Vir Bhan Sood</h3>
                <p className="text-slate-400 font-medium mb-3 text-xs">Patron</p>
                <div className={`text-slate-400 text-sm overflow-hidden transition-all duration-500 ${expandedBio === 5 ? 'max-h-[800px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                  <p className="mb-2">25 years’ experience in Quality Assurance and inspection with RITES Limited, a premier Third Party Inspection & Consultancy Organization.</p>
                  <p className="mb-2">Organized and supervised Quality Assurance and inspection of machinery, Plant, and equipment procured against World Bank funded projects of Health System Corporation of different State Governments on behalf of Oil Sector Clients.</p>
                  <p className="mb-2">Trained Lead Assessor in ISO 9001 and ISO 14001. Prepared the Manual for ISO 17020 for RITES QA Division for its certification as an Inspection agency.</p>
                  <p>Freelance Empanelled Assessor for National Accreditation Board for certifying Bodies. Member of NABCB Accreditation Committee From August 2021 to July 2023.</p>
                </div>
                <p className="text-xs text-cyan-500 font-bold mt-3 uppercase tracking-wider">{expandedBio === 5 ? '- Show Less' : '+ Read Full Bio'}</p>
              </div>
            </div>

            {/* 2. RAJESH KHARE */}
            <div onClick={() => toggleBio(6)} className="cursor-pointer bg-[var(--bg-secondary)] rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all group flex flex-col">
              <div className="h-56 w-full bg-[var(--bg-subtle)] flex items-center justify-center overflow-hidden">
                <img src="/img/rajesh.png" alt="Rajesh Khare" className="w-full h-full object-contain object-top group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 flex-grow">
                <h3 className="text-lg font-bold text-white mb-1 uppercase">Rajesh Khare</h3>
                <p className="text-slate-400 font-medium mb-3 text-xs">Country Head</p>
                <div className={`text-slate-400 text-sm overflow-hidden transition-all duration-500 ${expandedBio === 6 ? 'max-h-[800px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                  <p className="mb-2">Mr. Khare is a seasoned Chartered Civil Engineering Professional with 45+ years of experience in the planning, design, and execution of infrastructure projects.</p>
                  <p className="mb-2">His core expertise includes roads, water supply, sewerage, wastewater systems, and smart city developments.</p>
                  <p>He has proven expertise in project management, structural design, and quality compliance with strong leadership in large-scale public infrastructure projects, gained while working in different capacities in Govt. departments.</p>
                </div>
                <p className="text-xs text-cyan-500 font-bold mt-3 uppercase tracking-wider">{expandedBio === 6 ? '- Show Less' : '+ Read Full Bio'}</p>
              </div>
            </div>

            {/* 3. INDU KUMAR SRIVASTAVA */}
            {/* <div onClick={() => toggleBio(7)} className="cursor-pointer bg-[var(--bg-secondary)] rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all group flex flex-col">
              <div className="h-56 w-full bg-[var(--bg-subtle)] flex items-center justify-center overflow-hidden">
                <img src="/img/indu.png" alt="Indu Kumar Srivastava" className="w-full h-full object-contain object-top group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 flex-grow">
                <h3 className="text-lg font-bold text-white mb-1 uppercase">Indu Kumar Srivastava</h3>
                <p className="text-slate-400 font-medium mb-3 text-xs">Patron</p>
                <div className={`text-slate-400 text-sm overflow-hidden transition-all duration-500 ${expandedBio === 7 ? 'max-h-[800px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                  <p className="mb-2">Mr. Indu Kant Srivastava is a distinguished Civil Engineering graduate with an illustrious career spanning 39 years of dedicated service at U.P. Jal Nigam.</p>
                  <p className="mb-2">A veteran in the field of public infrastructure, he has developed an unparalleled mastery over the entire lifecycle of Water Supply Projects, ranging from initial conceptualization and design to ground-level execution and large-scale supervision.</p>
                  <p>His nearly four decades at the forefront of state-level infrastructure development have equipped him with deep expertise in navigating regulatory frameworks, ensuring quality compliance, and leading multi-disciplinary teams through high-stakes engineering challenges.</p>
                </div>
                <p className="text-xs text-cyan-500 font-bold mt-3 uppercase tracking-wider">{expandedBio === 7 ? '- Show Less' : '+ Read Full Bio'}</p>
              </div>
            </div> */}

            {/* 4. ARUN KUMAR TYAGI */}
            <div onClick={() => toggleBio(8)} className="cursor-pointer bg-[var(--bg-secondary)] rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all group flex flex-col">
              <div className="h-56 w-full bg-[var(--bg-subtle)] flex items-center justify-center overflow-hidden">
                <img src="/img/Arun.jpeg" alt="Arun Kumar Tyagi" className="w-full h-full object-contain object-top group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 flex-grow">
                <h3 className="text-lg font-bold text-white mb-1 uppercase">Arun Kumar Tyagi</h3>
                <p className="text-slate-400 font-medium mb-3 text-xs">Patron</p>
                <div className={`text-slate-400 text-sm overflow-hidden transition-all duration-500 ${expandedBio === 8 ? 'max-h-[800px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                  <p className="mb-2">Mr. Arun Kumar Tyagi is a distinguished professional with a robust background in engineering and management (BE, MBA, FIE).</p>
                  <p className="mb-2">He has a proven track record of leadership in the public sector, having served as the Chief Project Officer for UREDA (Uttarakhand Renewable Energy Development Agency) and as an Advisor to the Planning Department for the Government of Uttarakhand.</p>
                  <p>With deep expertise in large-scale project implementation and strategic planning, Mr. Tyagi specializes in steering complex initiatives from conception to execution within government frameworks. As a Fellow of the Institution of Engineers (FIE), he brings a high level of technical authority.</p>
                </div>
                <p className="text-xs text-cyan-500 font-bold mt-3 uppercase tracking-wider">{expandedBio === 8 ? '- Show Less' : '+ Read Full Bio'}</p>
              </div>
            </div>

            {/* 5. JITENDRA PRAKASH SRIVASTAVA */}
            <div onClick={() => toggleBio(0)} className="cursor-pointer bg-[var(--bg-secondary)] rounded-xl shadow-md border border-slate-200 overflow-hidden hover:shadow-md transition-all group flex flex-col">
              <div className="h-56 w-full bg-[var(--bg-subtle)] flex items-center justify-center overflow-hidden">
                <img src="/img/chairperson.png" alt="Jitendra Prakash Srivastava" className="w-full h-full object-contain object-top group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 flex-grow">
                <h3 className="text-lg font-bold text-white mb-1 uppercase">Jitendra Prakash Srivastava</h3>
                <p className="text-slate-400 font-medium mb-3 text-xs">Chairperson</p>
                <div className={`text-slate-400 text-sm overflow-hidden transition-all duration-500 ${expandedBio === 0 ? 'max-h-[800px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                  <p className="mb-2">J. P. Srivastava having a multifaceted personality is a graduate with post graduate qualification in Management.</p>
                  <p className="mb-2">He brings with him a rich experience of more than thirty years in the fields of management, planning, maintenance of Railway Rolling Stock, Third Party Inspection and Quality Assurance of General Engineering Items, Machinery Plant & Equipment and critical as well as safety components.</p>
                  <p className="mb-2">He has gained this experience while working in different capacities in various Govt. departments and Public Sector Undertakings such as Ministry of Railways, RDSO and RITES where he performed the management functions as well as formulation and finalisation of Tenders for various works.</p>
                </div>
                <p className="text-xs text-cyan-500 font-bold mt-3 uppercase tracking-wider">{expandedBio === 0 ? '- Show Less' : '+ Read Full Bio'}</p>
              </div>
            </div>

            {/* 6. REKHA SRIVASTAVA */}
            <div onClick={() => toggleBio(1)} className="cursor-pointer bg-[var(--bg-secondary)] rounded-xl shadow-md border border-slate-200 overflow-hidden hover:shadow-md transition-all group flex flex-col">
              <div className="h-56 w-full bg-[var(--bg-subtle)] flex items-center justify-center overflow-hidden">
                <img src="/img/managing_dir.png" alt="Rekha Srivastava" className="w-full h-full object-contain object-top group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 flex-grow">
                <h3 className="text-lg font-bold text-white mb-1 uppercase">Rekha Srivastava</h3>
                <p className="text-slate-400 font-medium mb-3 text-xs">Managing Director</p>
                <div className={`text-slate-400 text-sm overflow-hidden transition-all duration-500 ${expandedBio === 1 ? 'max-h-[800px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                  <p className="mb-2">Directs overall daily business operations and executes the company's strategic vision. Acts as the primary bridge between the board of directors and executive leadership to drive organizational growth, operational excellence, and market expansion.</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>15+ years of experience in the trading, manufacturing, and service sectors.</li>
                    <li>Directs daily business operations and executes long-term organizational strategy.</li>
                    <li>Fosters a strong corporate culture and team development, backed by a PG in Psychology.</li>
                    <li>Oversees financial health, business growth, and administrative excellence.</li>
                  </ul>
                </div>
                <p className="text-xs text-cyan-500 font-bold mt-3 uppercase tracking-wider">{expandedBio === 1 ? '- Show Less' : '+ Read Full Bio'}</p>
              </div>
            </div>

            {/* 7. RITA RAI */}
            <div onClick={() => toggleBio(2)} className="cursor-pointer bg-[var(--bg-secondary)] rounded-xl shadow-md border border-slate-200 overflow-hidden hover:shadow-md transition-all group flex flex-col">
              <div className="h-56 w-full bg-[var(--bg-subtle)] flex items-center justify-center overflow-hidden">
                <img src="/img/dir_project.jpeg" alt="Rita Rai" className="w-full h-full object-contain object-top group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 flex-grow">
                <h3 className="text-lg font-bold text-white mb-1 uppercase">Rita Kumari</h3>
                <p className="text-slate-400 font-medium mb-3 text-xs">Joint Managing Director</p>
                <div className={`text-slate-400 text-sm overflow-hidden transition-all duration-500 ${expandedBio === 2 ? 'max-h-[800px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                  <p className="mb-2">Rita holds a mechanical engineering degree from Darbhanga College of Engineering, Darbhanga.</p>
                  <p className="mb-2">She has 10 years of experience in the service industry and served at Eli Technical Economic Services India Pvt. Ltd. Ensures the flawless execution and delivery of all client projects.</p>
                  <p className="mb-2">She conducted inspections of Various Engineering Products, faced external & internal audits as Management Representative (ISO:9000, ISO:17020), and carried out Internal Quality audits for ISO 9001:2015.</p>
                  <p>She is a part of the management decision making body, responsible for tender participation and successful execution of works.</p>
                </div>
                <p className="text-xs text-cyan-500 font-bold mt-3 uppercase tracking-wider">{expandedBio === 2 ? '- Show Less' : '+ Read Full Bio'}</p>
              </div>
            </div>

            {/* 8. AAKASH SRIVASTAVA */}
            <div onClick={() => toggleBio(3)} className="cursor-pointer bg-[var(--bg-secondary)] rounded-xl shadow-md border border-slate-200 overflow-hidden hover:shadow-md transition-all group flex flex-col">
              <div className="h-56 w-full bg-[var(--bg-subtle)] flex items-center justify-center overflow-hidden">
                <img src="/img/dir_finance.jpeg" alt="Aakash Srivastava" className="w-full h-full object-contain object-top group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 flex-grow">
                <h3 className="text-lg font-bold text-white mb-1 uppercase">Aakash Srivastava</h3>
                <p className="text-slate-400 font-medium mb-3 text-xs">Director Finance</p>
                <div className={`text-slate-400 text-sm overflow-hidden transition-all duration-500 ${expandedBio === 3 ? 'max-h-[800px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                  <p className="mb-2">Aakash Srivastava holds a Civil Engineering degree from the Institute of Engineering Technology, UP Technical University, Lucknow.</p>
                  <p className="mb-2">He has over five years of professional experience managing financial planning, budgeting, forecasting, and capital optimization.</p>
                  <p>During this period he has worked in consultancy, construction supervision, Quality Assurance, and Third Party Inspection of Engineering Stores for EliTes India.</p>
                </div>
                <p className="text-xs text-cyan-500 font-bold mt-3 uppercase tracking-wider">{expandedBio === 3 ? '- Show Less' : '+ Read Full Bio'}</p>
              </div>
            </div>

            {/* 9. ANANT SRIVASTAVA */}
            <div onClick={() => toggleBio(4)} className="cursor-pointer bg-[var(--bg-secondary)] rounded-xl shadow-md border border-slate-200 overflow-hidden hover:shadow-md transition-all group flex flex-col">
              <div className="h-56 w-full bg-[var(--bg-subtle)] flex items-center justify-center overflow-hidden">
                <img src="/img/dir_sales.png" alt="Anant Srivastava" className="w-full h-full object-contain object-top group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 flex-grow">
                <h3 className="text-lg font-bold text-white mb-1 uppercase">Anant Srivastava</h3>
                <p className="text-slate-400 font-medium mb-3 text-xs">Director Marketing</p>
                <div className={`text-slate-400 text-sm overflow-hidden transition-all duration-500 ${expandedBio === 4 ? 'max-h-[800px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                  <p className="mb-2">Drives revenue growth by leading business development initiatives and client acquisition strategies. Cultivates key enterprise partnerships, expands market reach, and manages the end-to-end sales pipeline.</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Driving revenue growth and B2B tech sales.</li>
                    <li>Establishing global client networks.</li>
                    <li>Over 12 years of executive sales leadership.</li>
                    <li>Conducts in-situ testing, risk analysis, and material assessments.</li>
                    <li>Leads structural design deliverables and concept development.</li>
                  </ul>
                </div>
                <p className="text-xs text-cyan-500 font-bold mt-3 uppercase tracking-wider">{expandedBio === 4 ? '- Show Less' : '+ Read Full Bio'}</p>
              </div>
            </div>



            {/* 11. PRANAV SRIVASTAVA */}
            <div onClick={() => toggleBio(10)} className="cursor-pointer bg-[var(--bg-secondary)] rounded-xl shadow-md border border-slate-200 overflow-hidden hover:shadow-md transition-all group flex flex-col">
              <div className="h-56 w-full bg-[var(--bg-subtle)] flex items-center justify-center overflow-hidden">
                <img src="/img/dir_IT.png" alt="Pranav Srivastava" className="w-full h-full object-contain object-top group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 flex-grow">
                <h3 className="text-lg font-bold text-white mb-1 uppercase">Pranav Srivastava</h3>
                <p className="text-slate-400 font-medium mb-3 text-xs">Director IT</p>
                <div className={`text-slate-400 text-sm overflow-hidden transition-all duration-500 ${expandedBio === 10 ? 'max-h-[800px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                  <p className="mb-2">Leads technology strategy, engineering practices, and product development with a focus on scalable, high-performance systems.</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Cloud architecture and scalable system design.</li>
                    <li>Full-stack development leadership.</li>
                    <li>5+ years in software engineering.</li>
                    <li>Leads frontend architecture, UI/UX execution, and sprint planning.</li>
                  </ul>
                </div>
                <p className="text-xs text-cyan-500 font-bold mt-3 uppercase tracking-wider">{expandedBio === 10 ? '- Show Less' : '+ Read Full Bio'}</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Commitment Section */}
      <section className="bg-[var(--bg-primary)] py-20 px-6 border-y border-slate-200 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-cyan-300 mb-6 uppercase">OUR COMMITMENT TO YOU</h2>
          <p className="text-lg text-slate-200 mb-6 italic font-serif">
            "At Nebo Engineering, we believe in forging lasting partnerships built on trust, reliability, and innovation."
          </p>
          <p className="text-slate-200">
            Whether you're looking to illuminate streets, enhance public spaces, or incorporate sustainable lighting solutions into your projects, Nebo Engineering is your trusted partner every step of the way.
          </p>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="bg-[#0f172a] pt-16 pb-16 mt-auto">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-16">

            {/* Brand Section */}
            <div className="col-span-1 lg:col-span-2">
              <h2 className="text-3xl font-black mb-1 tracking-tighter text-white">NEBO</h2>
              <span className="text-cyan-300 font-bold tracking-widest text-sm uppercase">Engineering</span>
              <span className="block mt-4 text-sm text-[var(--text-muted)]">Delivering all-in-one solar solutions tailored to your needs.</span>
            </div>

            {/* Navigation */}
            <div className="col-span-1 lg:col-span-2">
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest var(--text-main)">Navigation</h4>
              <ul className="space-y-3 text-[var(--text-muted)] text-sm">
                <li><button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-cyan-300 transition-colors">Home</button></li>
                <li><button onClick={() => { document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-cyan-300 transition-colors">Services & Products</button></li>
                <li><button onClick={() => { document.getElementById('leadership')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-cyan-300 transition-colors">Leadership</button></li>
              </ul>
            </div>

            {/* Offices */}
            <div className="col-span-1 lg:col-span-4">
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest var(--text-main)">Offices</h4>
              <address className="not-italic text-[var(--text-muted)] space-y-3 text-xs leading-relaxed">
                <p>1. R-18 1St Floor, Vikas Marg, Shakarpur, Delhi-110092.</p>
                <p>2. K-422, SITE 5 KASNA IND AREA Greater Noida, Gautam Budh Nagar -201310.</p>
              </address>
            </div>

            {/* GROUPED: Connect and Contact Side-by-Side (Nested Grid) */}
            <div className="col-span-1 lg:col-span-4 grid grid-cols-2 gap-4">

              {/* Connect */}
              <div>
                <h4 className="font-bold mb-6 text-sm uppercase tracking-widest var(--text-main)">Connect</h4>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <a href="https://x.com/NeboEng" target='_blank' className="w-8 h-8 sm:w-9 sm:h-9 border border-[var(--border-subtle)] rounded-full flex items-center justify-center text-[var(--text-muted)] hover:text-cyan-400 hover:border-cyan-400 transition-all"><Twitter size={14} /></a>
                  <a
                    href="https://www.reddit.com/user/Nebo-IT-Solutions/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 sm:w-9 sm:h-9 border border-[var(--border-subtle)] rounded-full flex items-center justify-center text-[var(--text-muted)] hover:text-cyan-400 hover:border-cyan-400 transition-all"
                  >
                    {/* Using a standard Reddit SVG icon */}
                    <img
                      src="/img/reddit.png"
                      alt="Reddit"
                      className="w-3.5 h-3.5 object-contain nebo-logo opacity-70 group-hover:opacity-100"
                      style={{ filter: 'brightness(0) invert(1)' }}
                    />
                  </a>                <a href="https://www.linkedin.com/company/neboitsolutions" target='_blank' className="w-8 h-8 sm:w-9 sm:h-9 border border-[var(--border-subtle)] rounded-full flex items-center justify-center text-[var(--text-muted)] hover:text-cyan-400 hover:border-cyan-400 transition-all"><Linkedin size={14} /></a>
                  <a href="https://www.instagram.com/nebo.it/?hl=en" target='_blank' className="w-8 h-8 sm:w-9 sm:h-9 border border-[var(--border-subtle)] rounded-full flex items-center justify-center text-[var(--text-muted)] hover:text-cyan-400 hover:border-cyan-400 transition-all"><Instagram size={14} /></a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61573308520182"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 sm:w-9 sm:h-9 border border-[var(--border-subtle)] rounded-full flex items-center justify-center text-[var(--text-muted)] hover:text-cyan-400 hover:border-cyan-400 transition-all"
                  >
                    {/* Using a standard Reddit SVG icon */}
                    <img
                      src="/img/meta.jpeg"
                      alt="Meta"
                      className="w-3.5 h-3.5 object-contain nebo-logo opacity-70 group-hover:opacity-100"
                      style={{ filter: 'currentColor' }}
                    />
                  </a>
                </div>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-bold mb-6 text-sm uppercase tracking-widest var(--text-main)">Contact Us</h4>
                <div className="text-[var(--text-muted)] text-sm space-y-3">
                  <p>
                    {/* +91 7275629690<br/> */}
                    +91 8802239746<br />
                    +91 8700449133    <br></br>
                    <br></br>

                    Email: contact@neboengineering.in<br></br>
                    hr@neboengineering.in
                  </p>
                </div>
              </div>

            </div>

          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>© 2019 Nebo Engineering. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default NeboEngineering;