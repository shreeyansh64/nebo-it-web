import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'About', path: '/about' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="relative border-t border-white/5 pt-20 pb-10 bg-[#04040c]">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg overflow-hidden ring-1 ring-white/10">
                <img src="/img/nebo_logo.png" alt="Nebo Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-white">NEBO</span>
                <span className="text-[10px] font-semibold tracking-[0.2em] text-purple-400 block -mt-1 uppercase">IT Solutions</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              We orchestrate high-performance digital experiences that blend artistic finesse with surgical engineering precision.
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-5">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-500 text-sm hover:text-purple-400 transition-colors flex items-center gap-1 group">
                    {link.label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-5">Offices</h4>
            <div className="space-y-4 text-gray-500 text-sm leading-relaxed">
              <p>R-18 1st Floor, Vikas Marg, Shakarpur, Delhi-110092</p>
              <p>K-422, SITE 5 KASNA IND AREA, Greater Noida, Gautam Budh Nagar - 201310</p>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-5">Get in Touch</h4>
            <div className="text-gray-500 text-sm space-y-2 mb-6">
              <p>+91 8802239746</p>
              <p>+91 8700449133</p>
              <p className="mt-3">contact@neboengineering.in</p>
              <p>hr@neboengineering.in</p>
              <p>neboitsolutions@gmail.com</p>
            </div>

            {/* Social */}
            <div className="flex items-center gap-2">
              <a href="https://x.com/NeboEng" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-white/5 flex items-center justify-center text-gray-500 hover:text-purple-400 hover:border-purple-500/30 transition-all">
                <Twitter size={14} />
              </a>
              <a href="https://www.linkedin.com/company/neboitsolutions" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-white/5 flex items-center justify-center text-gray-500 hover:text-purple-400 hover:border-purple-500/30 transition-all">
                <Linkedin size={14} />
              </a>
              <a href="https://www.instagram.com/nebo.it/?hl=en" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-white/5 flex items-center justify-center text-gray-500 hover:text-purple-400 hover:border-purple-500/30 transition-all">
                <Instagram size={14} />
              </a>
              <a href="https://www.reddit.com/user/Nebo-IT-Solutions/" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-white/5 flex items-center justify-center text-gray-500 hover:text-purple-400 hover:border-purple-500/30 transition-all">
                <img src="/img/reddit.png" alt="Reddit" className="w-3.5 h-3.5 object-contain opacity-50" style={{ filter: 'brightness(0) invert(1)' }} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61573308520182" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-white/5 flex items-center justify-center text-gray-500 hover:text-purple-400 hover:border-purple-500/30 transition-all">
                <img src="/img/meta.jpeg" alt="Facebook" className="w-3.5 h-3.5 object-contain opacity-50 rounded-sm" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">© 2019 Nebo Engineering India Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs text-gray-600">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;