import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Repeat } from 'lucide-react';

interface NavbarProps {
  onSwitchToEngineering?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSwitchToEngineering }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'About', path: '/about' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? 'py-3'
            : 'py-5'
        }`}
        style={{
          background: isScrolled ? 'rgba(6, 6, 14, 0.85)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(124, 58, 237, 0.1)' : '1px solid transparent',
        }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 ring-1 ring-white/10 group-hover:ring-purple-500/30 transition-all">
              <img src="/img/nebo_logo.png" alt="Nebo Logo" className="w-full h-full object-contain" />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold tracking-tight text-white">NEBO</span>
              <span className="text-[10px] font-semibold tracking-[0.2em] text-purple-400 block -mt-1 uppercase">IT Solutions</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, #7c3aed, #818cf8)',
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {onSwitchToEngineering && (
              <button
                onClick={onSwitchToEngineering}
                className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-400 hover:text-purple-400 rounded-lg border border-white/5 hover:border-purple-500/30 transition-all"
              >
                <Repeat size={14} />
                Engineering
              </button>
            )}
            <Link
              to="/contact"
              className="btn-primary text-sm !py-2.5 !px-5"
            >
              <span>Get Started</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-white rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] lg:hidden"
            style={{ background: 'rgba(6, 6, 14, 0.97)', backdropFilter: 'blur(24px)' }}
          >
            <div className="flex flex-col items-center justify-center min-h-screen gap-2 px-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Link
                    to={link.path}
                    className={`block text-3xl font-bold py-3 transition-colors ${
                      isActive(link.path) ? 'gradient-text' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-8 flex flex-col gap-4 w-full max-w-xs"
              >
                {onSwitchToEngineering && (
                  <button
                    onClick={() => { setIsMobileOpen(false); onSwitchToEngineering(); }}
                    className="btn-secondary w-full text-sm"
                  >
                    <Repeat size={16} />
                    Switch to Engineering
                  </button>
                )}
                <Link to="/contact" className="btn-primary w-full text-center text-sm" onClick={() => setIsMobileOpen(false)}>
                  <span>Get Started</span>
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;