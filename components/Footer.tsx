import React from 'react';
import { Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[var(--border-subtle)] pt-16 pb-16">
      <div className="container mx-auto px-6">
        
        {/* Main 12-column grid for large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-16">
          
          {/* NEBO Logo */}
          <div className="col-span-1 lg:col-span-2">
             <h2 className="text-3xl font-black mb-1 tracking-tighter text-white">NEBO</h2>
             <span className="text-cyan-300 font-bold tracking-widest text-sm uppercase">IT Solutions</span>
                           <span className="block mt-4 text-sm text-[var(--text-muted)]">We orchestrate high-performance digital experiences that blend artistic finesse with surgical engineering precision.</span>

          </div>
          
          {/* Navigation */}
          <div className="col-span-1 lg:col-span-2">
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest var(--text-main)">Navigation</h4>
            <ul className="space-y-3 text-[var(--text-muted)] text-sm">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Services</a></li>
              <li><a href="#work" className="hover:text-cyan-400 transition-colors">Work</a></li>
              <li><a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a></li>
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
   style={{ filter: 'brightness(0) invert(1)'}}
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
                  +91 8802239746<br/>
                  +91 8700449133    <br></br>
                  <br></br>

                  Email: contact@neboengineering.in
                  hr@neboengineering.in
                  neboitsolutions@gmail.com
                </p>
              </div>
            </div>

          </div>
        </div>

        <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-600">
          <p>© 2019 Nebo Engineering. All rights reserved.</p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;