import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Instagram, ArrowUpRight, Send, Mail, MapPin, Phone } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const MagneticWrapper: React.FC<{ children: React.ReactNode; href?: string; className?: string }> = ({ children, href, className }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.a>
  );
};

const Footer: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile(); // Check on mount
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Extraordinary entrance animations (Desktop Only)
  const y = useTransform(scrollYProgress, [0, 1], [200, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 1, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["100px", "0px"]);

  // Massive background text parallax
  const bgTextX1 = useTransform(scrollYProgress, [0, 1], ["-10%", "5%"]);
  const bgTextX2 = useTransform(scrollYProgress, [0, 1], ["10%", "-5%"]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'About', path: '/about' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <footer ref={containerRef} className="relative bg-transparent pt-10 pb-0 overflow-hidden" style={{ perspective: "1200px" }}>
      <motion.div 
        style={isMobile ? {} : { 
          y, 
          scale, 
          rotateX, 
          opacity, 
          borderRadius,
          transformOrigin: "top center"
        }} 
        initial={isMobile ? { opacity: 0, y: 50, borderRadius: "20px" } : undefined}
        whileInView={isMobile ? { opacity: 1, y: 0, borderRadius: "0px" } : undefined}
        viewport={{ once: true, margin: "0px" }}
        transition={isMobile ? { duration: 0.8, ease: "easeOut" } : undefined}
        className="relative bg-[#020205] pt-32 pb-10 overflow-hidden border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
      >
        {/* Massive Background Scrolling Text */}
        <div className="absolute top-1/4 left-0 w-full -translate-y-1/2 overflow-hidden pointer-events-none flex flex-col gap-4 opacity-[0.02] z-0 select-none">
          <motion.h1 style={{ x: bgTextX1 }} className="text-[15vw] font-black whitespace-nowrap text-white leading-none">
            NEBO ENGINEERING INDIA
          </motion.h1>
          <motion.h1 style={{ x: bgTextX2 }} className="text-[15vw] font-black whitespace-nowrap text-white leading-none">
            IT SOLUTIONS DIVISION
          </motion.h1>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-purple-600/10 rounded-[100%] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-[100%] blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-pink-600/10 rounded-[100%] blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          
          {/* Massive CTA Section */}
          <div className="mb-32 text-center relative z-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="inline-block mb-6 px-6 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md text-purple-300 font-medium tracking-widest text-sm uppercase"
            >
              Ready to scale?
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 50, rotateX: -20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ perspective: "1000px" }}
              className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/30 mb-8"
            >
              LET'S BUILD <br className="hidden md:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">THE FUTURE.</span>
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-500 group-hover:scale-105"></div>
                <Link to="/contact" className="relative flex items-center gap-3 bg-black border border-white/20 px-10 py-5 rounded-full text-white font-bold text-lg hover:bg-black/80 transition-all group-hover:scale-105">
                  Start a Project
                  <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </Link>
              </div>
            </motion.div>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-20">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl overflow-hidden ring-1 ring-white/10 bg-white/5 flex items-center justify-center p-2 backdrop-blur-sm">
                <img src="/img/nebo_logo.png" alt="Nebo Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="text-2xl font-bold tracking-tight text-white">NEBO</span>
                <span className="text-xs font-semibold tracking-[0.25em] text-purple-400 block mt-0.5 uppercase">IT Solutions</span>
              </div>
            </div>
            
            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              Orchestrating high-performance digital experiences that blend artistic finesse with surgical engineering precision.
            </p>

            <div className="pt-4 max-w-md">
              <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-400" /> Subscribe to our newsletter
              </h4>
              <div className="relative flex items-center group">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all backdrop-blur-sm"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center text-white transition-colors">
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="text-sm font-semibold tracking-[0.1em] text-white mb-6 uppercase">Explore</h4>
            <ul className="space-y-4">
              {navLinks.map((link, i) => (
                <motion.li 
                  key={link.path}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to={link.path} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group w-fit">
                    <span className="relative overflow-hidden">
                      <span className="block group-hover:-translate-y-full transition-transform duration-300 ease-in-out">{link.label}</span>
                      <span className="block absolute top-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out text-purple-400">{link.label}</span>
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-semibold tracking-[0.1em] text-white mb-6 uppercase">Connect</h4>
            
            <div className="space-y-6">
              <div className="flex items-start gap-3 group">
                <div className="mt-1 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors border border-white/5">
                  <MapPin className="w-4 h-4 text-gray-400 group-hover:text-purple-400" />
                </div>
                <div className="text-gray-400 text-sm leading-relaxed space-y-2">
                  <p className="hover:text-white transition-colors cursor-default">R-18 1st Floor, Vikas Marg,<br/>Shakarpur, Delhi-110092</p>
                  <p className="hover:text-white transition-colors cursor-default">K-422, SITE 5 KASNA IND AREA,<br/>Greater Noida, Gautam Budh Nagar - 201310</p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="mt-1 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors border border-white/5">
                  <Phone className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
                </div>
                <div className="text-gray-400 text-sm leading-relaxed flex flex-col gap-1">
                  <a href="tel:+918802239746" className="hover:text-white transition-colors">+91 8802239746</a>
                  <a href="tel:+918700449133" className="hover:text-white transition-colors">+91 8700449133</a>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="mt-1 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-pink-500/20 transition-colors border border-white/5">
                  <Mail className="w-4 h-4 text-gray-400 group-hover:text-pink-400" />
                </div>
                <div className="text-gray-400 text-sm leading-relaxed flex flex-col gap-1">
                  <a href="mailto:contact@neboengineering.in" className="hover:text-white transition-colors">contact@neboengineering.in</a>
                  <a href="mailto:hr@neboengineering.in" className="hover:text-white transition-colors">hr@neboengineering.in</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <MagneticWrapper href="https://x.com/NeboEng" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors backdrop-blur-sm">
              <Twitter className="w-4 h-4" />
            </MagneticWrapper>
            <MagneticWrapper href="https://www.linkedin.com/company/neboitsolutions" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors backdrop-blur-sm">
              <Linkedin className="w-4 h-4" />
            </MagneticWrapper>
            <MagneticWrapper href="https://www.instagram.com/nebo.it/?hl=en" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors backdrop-blur-sm">
              <Instagram className="w-4 h-4" />
            </MagneticWrapper>
            <MagneticWrapper href="https://www.reddit.com/user/Nebo-IT-Solutions/" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white/10 transition-colors backdrop-blur-sm">
              <img src="/img/reddit.png" alt="Reddit" className="w-4 h-4 object-contain opacity-70" style={{ filter: 'brightness(0) invert(1)' }} />
            </MagneticWrapper>
            <MagneticWrapper href="https://www.facebook.com/profile.php?id=61573308520182" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white/10 transition-colors backdrop-blur-sm overflow-hidden">
              <img src="/img/meta.jpeg" alt="Facebook" className="w-full h-full object-cover opacity-70" />
            </MagneticWrapper>
          </div>

          <p className="text-sm text-gray-500 font-medium">
            © {new Date().getFullYear()} Nebo Engineering India Pvt. Ltd. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500 font-medium">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
        
        </div>
        
      </motion.div>
    </footer>
  );
};

export default Footer;