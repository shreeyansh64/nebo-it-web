import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SERVICES } from '../constants';
import { ArrowRight, Sparkles } from 'lucide-react';
import * as Icons from 'lucide-react';

/* ─── pick 6 services for the orbit ─── */
const ORBIT_SERVICES = SERVICES.slice(0, 6);

/* ─── short labels for the orbit icons ─── */
const SHORT_LABELS = [
  'AI Software',
  'Gen AI & LLM',
  'Machine Learning',
  'UI/UX Design',
  'Motion & Viz',
  'AI Strategy',
];

/* ─── angular positions (degrees, 0 = right, goes clockwise) ─── */
const ORBIT_ANGLES = [270, 330, 30, 90, 150, 210];

/* ─── card placement relative to icon ─── */
type CardPlacement = { side: 'top' | 'bottom'; align: 'center' | 'left' | 'right' };
const CARD_PLACEMENTS: CardPlacement[] = [
  { side: 'top', align: 'center' },   // top icon
  { side: 'top', align: 'left' },     // top-right
  { side: 'top', align: 'left' },     // bottom-right-upper
  { side: 'bottom', align: 'center' },// bottom icon
  { side: 'bottom', align: 'right' }, // bottom-left
  { side: 'top', align: 'right' },    // top-left
];

/* ─── Desktop Orbit ─── */
const DesktopOrbit: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });

  const [orbitRadius, setOrbitRadius] = useState(260);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1440) setOrbitRadius(300);
      else if (w >= 1280) setOrbitRadius(270);
      else if (w >= 1024) setOrbitRadius(230);
      else setOrbitRadius(200);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const hubSize = 140;
  const iconSize = 80;

  return (
    <div
      ref={containerRef}
      className="relative hidden md:flex items-center justify-center"
      style={{ width: '100%', height: 750 }}
    >
      {/* ─── Faint orbit ring (visible circle) ─── */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: orbitRadius * 2 + iconSize,
          height: orbitRadius * 2 + iconSize,
          left: '50%',
          top: '50%',
          marginLeft: -(orbitRadius + iconSize / 2),
          marginTop: -(orbitRadius + iconSize / 2),
          border: '1px dashed rgba(124, 58, 237, 0.15)',
          boxShadow: '0 0 40px rgba(124, 58, 237, 0.03) inset',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 1.2, delay: 0.1, ease: 'easeOut' }}
      />

      {/* ─── Second faint inner ring ─── */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: orbitRadius * 1.2,
          height: orbitRadius * 1.2,
          left: '50%',
          top: '50%',
          marginLeft: -(orbitRadius * 0.6),
          marginTop: -(orbitRadius * 0.6),
          border: '1px solid rgba(124, 58, 237, 0.06)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 0.5 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      />

      {/* ─── SVG connection lines ─── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="orbit-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(124,58,237,0.7)" />
            <stop offset="100%" stopColor="rgba(129,140,248,0.5)" />
          </linearGradient>
          <linearGradient id="orbit-line-dim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(124,58,237,0.2)" />
            <stop offset="100%" stopColor="rgba(129,140,248,0.15)" />
          </linearGradient>
        </defs>
        {ORBIT_SERVICES.map((_, i) => {
          const angle = (ORBIT_ANGLES[i] * Math.PI) / 180;
          const containerW = containerRef.current?.offsetWidth || 800;
          const containerH = 750;
          const cx = containerW / 2;
          const cy = containerH / 2;
          const x2 = cx + Math.cos(angle) * orbitRadius;
          const y2 = cy + Math.sin(angle) * orbitRadius;
          return (
            <motion.line
              key={i}
              x1={cx}
              y1={cy}
              x2={x2}
              y2={y2}
              stroke={hovered === i ? "url(#orbit-line-grad)" : "url(#orbit-line-dim)"}
              strokeWidth={hovered === i ? 2 : 1.5}
              strokeDasharray="8 5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                isInView
                  ? { pathLength: 1, opacity: 1 }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={{
                pathLength: { duration: 1.2, delay: 0.5 + i * 0.12, ease: 'easeOut' },
                opacity: { duration: 0.4, delay: 0.5 + i * 0.12 },
                stroke: { duration: 0.3 },
                strokeWidth: { duration: 0.3 },
              }}
            />
          );
        })}
      </svg>

      {/* ─── Central hub ─── */}
      <motion.div
        className="absolute z-20"
        style={{
          width: hubSize,
          height: hubSize,
          left: '50%',
          top: '50%',
          marginLeft: -hubSize / 2,
          marginTop: -hubSize / 2,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 18, delay: 0.3 }}
      >
        <div className="orbit-hub-inner">
          <Sparkles size={28} className="text-purple-300 mb-1.5" />
          <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-purple-200 text-center leading-tight">
            Our
            <br />
            Services
          </span>
        </div>
        <div className="orbit-hub-pulse" />
        <div className="orbit-hub-pulse orbit-hub-pulse--delayed" />
      </motion.div>

      {/* ─── Orbiting service nodes ─── */}
      {ORBIT_SERVICES.map((service, i) => {
        const angle = (ORBIT_ANGLES[i] * Math.PI) / 180;
        const x = Math.cos(angle) * orbitRadius;
        const y = Math.sin(angle) * orbitRadius;
        const Icon = (Icons as any)[service.icon];
        const isHovered = hovered === i;
        const placement = CARD_PLACEMENTS[i];

        /* card offset calculation */
        let cardMarginLeft = x - 150;
        let cardMarginTop =
          placement.side === 'top'
            ? y - iconSize / 2 - 195
            : y + iconSize / 2 + 25;
        if (placement.align === 'left') cardMarginLeft = x - 40;
        if (placement.align === 'right') cardMarginLeft = x - 260;

        return (
          <React.Fragment key={service.id}>
            {/* icon + label group */}
            <motion.div
              className="absolute z-30 flex flex-col items-center"
              style={{
                left: '50%',
                top: '50%',
                marginLeft: -iconSize / 2,
                marginTop: -iconSize / 2,
              }}
              initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
              animate={
                isInView
                  ? { x, y, scale: 1, opacity: 1 }
                  : { x: 0, y: 0, scale: 0, opacity: 0 }
              }
              transition={{
                type: 'spring',
                stiffness: 160,
                damping: 16,
                delay: 0.6 + i * 0.12,
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* floating animation wrapper */}
              <motion.div
                className="flex flex-col items-center cursor-pointer"
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 3.5 + i * 0.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.6,
                }}
              >
                {/* the circle icon */}
                <div
                  className={`orbit-icon-node ${isHovered ? 'orbit-icon-node--active' : ''}`}
                  style={{ width: iconSize, height: iconSize }}
                >
                  {/* glow ring on hover */}
                  {isHovered && (
                    <motion.div
                      className="absolute inset-[-4px] rounded-full border-2 border-purple-400/50"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      style={{ boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)' }}
                    />
                  )}
                  {Icon && <Icon size={28} strokeWidth={1.8} />}
                </div>
                {/* label underneath */}
                <span
                  className={`mt-2.5 text-[11px] font-semibold tracking-wide uppercase text-center leading-tight transition-colors duration-300 whitespace-nowrap ${
                    isHovered ? 'text-purple-300' : 'text-gray-500'
                  }`}
                >
                  {SHORT_LABELS[i]}
                </span>
              </motion.div>
            </motion.div>

            {/* ─── Hover detail card ─── */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute z-50 pointer-events-none"
                  style={{
                    left: '50%',
                    top: '50%',
                    marginLeft: cardMarginLeft,
                    marginTop: cardMarginTop,
                  }}
                  initial={{ opacity: 0, y: placement.side === 'top' ? 15 : -15, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: placement.side === 'top' ? 15 : -15, scale: 0.92 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                >
                  <div className="orbit-detail-card">
                    {/* connector line */}
                    <div
                      className={`orbit-connector ${
                        placement.side === 'top' ? 'orbit-connector--bottom' : 'orbit-connector--top'
                      }`}
                      style={{
                        left: placement.align === 'left' ? '15%' : placement.align === 'right' ? '85%' : '50%',
                      }}
                    />
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500/25 to-indigo-500/25 border border-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0">
                        {Icon && <Icon size={18} />}
                      </div>
                      <h4 className="text-[15px] font-bold text-white leading-tight">{service.title}</h4>
                    </div>
                    <p className="text-gray-400 text-[13px] leading-relaxed mb-3 line-clamp-3">
                      {service.description}
                    </p>
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-1.5 text-purple-400 text-[13px] font-semibold pointer-events-auto hover:text-purple-300 transition-colors"
                    >
                      Read More <ArrowRight size={13} />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </React.Fragment>
        );
      })}
    </div>
  );
};

/* ─── Mobile Cards ─── */
const MobileCards: React.FC = () => {
  return (
    <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
      {ORBIT_SERVICES.map((service, i) => {
        const Icon = (Icons as any)[service.icon];
        return (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="orbit-mobile-card group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/15 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-300">
              {Icon && <Icon size={22} />}
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
              {service.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
              {service.description}
            </p>
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-purple-400 text-sm font-semibold hover:text-purple-300 transition-colors"
            >
              Read More <ArrowRight size={13} />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};

/* ─── Main Component ─── */
const ServiceOrbit: React.FC = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden" id="services-orbit">
      {/* background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, rgba(99,102,241,0.04) 40%, transparent 70%)' }} />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label justify-center">What We Do</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-title text-center mx-auto"
          >
            AI-Powered Services
            <br />
            That Redefine What's Possible
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-subtitle mx-auto text-center mt-4"
          >
            Hover over each node to explore our core capabilities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex justify-center mt-6"
          >
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 text-purple-400 font-semibold text-sm hover:text-purple-300 transition-colors"
            >
              View All Services
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <DesktopOrbit />
        <MobileCards />
      </div>
    </section>
  );
};

export default ServiceOrbit;
