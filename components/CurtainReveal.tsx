import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────
   Neural Boot Sequence — AI System Initialization Intro
   Replaces the old curtain-reveal with a brand-aligned
   "AI coming online" experience.
   ───────────────────────────────────────────────────────────── */

// ── Helpers ──────────────────────────────────────────────────
/** Generate neural network paths (lines from center to outer nodes) */
function generateNeuralPaths(count: number, cx: number, cy: number, radius: number) {
  const paths: { id: number; x2: number; y2: number; angle: number; length: number; delay: number }[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
    const r = radius * (0.55 + Math.random() * 0.45);
    paths.push({
      id: i,
      x2: cx + Math.cos(angle) * r,
      y2: cy + Math.sin(angle) * r,
      angle,
      length: r,
      delay: 0.08 * i + Math.random() * 0.15,
    });
  }
  return paths;
}

/** Generate secondary branch paths from primary endpoints */
function generateBranches(
  primaries: ReturnType<typeof generateNeuralPaths>,
  cx: number,
  cy: number,
) {
  const branches: { id: number; x1: number; y1: number; x2: number; y2: number; delay: number; length: number }[] = [];
  let id = 0;
  primaries.forEach((p) => {
    const branchCount = Math.floor(Math.random() * 3) + 1;
    for (let j = 0; j < branchCount; j++) {
      const spreadAngle = p.angle + (Math.random() - 0.5) * 1.2;
      const branchLen = 30 + Math.random() * 60;
      branches.push({
        id: id++,
        x1: p.x2,
        y1: p.y2,
        x2: p.x2 + Math.cos(spreadAngle) * branchLen,
        y2: p.y2 + Math.sin(spreadAngle) * branchLen,
        delay: p.delay + 0.3 + Math.random() * 0.2,
        length: branchLen,
      });
    }
  });
  return branches;
}

// ── Component ────────────────────────────────────────────────
const CurtainReveal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [phase, setPhase] = useState<'boot' | 'neural' | 'identity' | 'golive' | 'done'>('boot');

  // Play animation once per session
  useEffect(() => {
    if (sessionStorage.getItem('nebo-curtain-played')) {
      setPhase('done');
      return;
    }

    const t1 = setTimeout(() => setPhase('neural'), 800);
    const t2 = setTimeout(() => setPhase('identity'), 2500);
    const t3 = setTimeout(() => setPhase('golive'), 4200);
    const t4 = setTimeout(() => {
      setPhase('done');
      sessionStorage.setItem('nebo-curtain-played', 'true');
    }, 5500);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  // Lock body scroll during animation
  useEffect(() => {
    if (phase !== 'done') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [phase]);

  const handleSkip = useCallback(() => {
    setPhase('done');
    sessionStorage.setItem('nebo-curtain-played', 'true');
  }, []);

  // Neural network geometry (memoized — doesn't regenerate on re-render)
  const cx = 500;
  const cy = 400;
  const primaryPaths = useMemo(() => generateNeuralPaths(16, cx, cy, 300), []);
  const branchPaths = useMemo(() => generateBranches(primaryPaths, cx, cy), [primaryPaths]);

  // Particles for the boot phase
  const particles = useMemo(() =>
    Array.from({ length: 40 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 80 + Math.random() * 300;
      return {
        id: i,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
        size: 1 + Math.random() * 2.5,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 3,
      };
    }),
  []);

  if (phase === 'done') {
    return <>{children}</>;
  }

  const showNeural = phase === 'neural' || phase === 'identity' || phase === 'golive';
  const showIdentity = phase === 'identity' || phase === 'golive';

  return (
    <>
      {/* Children underneath — visible during golive dissolve */}
      <div style={{ visibility: phase === 'golive' ? 'visible' : 'hidden' }}>
        {children}
      </div>

      <AnimatePresence>
        {phase !== 'done' && (
          <motion.div
            key="neural-boot-overlay"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              overflow: 'hidden',
              pointerEvents: phase === 'golive' ? 'none' : 'auto',
              background: '#06060e',
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* ═══════════════════════════════════════════════
                LAYER 1 — Subtle grid (matches animated-bg)
                ═══════════════════════════════════════════════ */}
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage:
                  'linear-gradient(rgba(124, 58, 237, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124, 58, 237, 0.04) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
                maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 1.5 }}
            />

            {/* ═══════════════════════════════════════════════
                LAYER 2 — Boot particles (drift outward from center)
                ═══════════════════════════════════════════════ */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              {particles.map((p) => (
                <motion.div
                  key={p.id}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: p.size,
                    height: p.size,
                    borderRadius: '50%',
                    background: `rgba(${124 + Math.random() * 30}, ${58 + Math.random() * 50}, ${237}, 0.7)`,
                  }}
                  animate={{
                    x: [0, p.dx],
                    y: [0, p.dy],
                    opacity: [0, 0.8, 0],
                    scale: [1, 0.3],
                  }}
                  transition={{
                    duration: p.duration,
                    repeat: Infinity,
                    delay: p.delay,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </div>

            {/* ═══════════════════════════════════════════════
                LAYER 3 — Central pulsing node
                ═══════════════════════════════════════════════ */}
            <motion.div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
              }}
            >
              {/* Outer pulse ring */}
              <motion.div
                style={{
                  position: 'absolute',
                  inset: -20,
                  borderRadius: '50%',
                  border: '1.5px solid rgba(124, 58, 237, 0.4)',
                }}
                animate={{
                  scale: [1, 2.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
              />
              {/* Second pulse ring (offset) */}
              <motion.div
                style={{
                  position: 'absolute',
                  inset: -20,
                  borderRadius: '50%',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                }}
                animate={{
                  scale: [1, 3, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: 1.25 }}
              />
              {/* Core node */}
              <motion.div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #a78bfa, #7c3aed)',
                  boxShadow: '0 0 30px rgba(124, 58, 237, 0.6), 0 0 60px rgba(124, 58, 237, 0.3)',
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  boxShadow: [
                    '0 0 30px rgba(124, 58, 237, 0.6), 0 0 60px rgba(124, 58, 237, 0.3)',
                    '0 0 50px rgba(124, 58, 237, 0.9), 0 0 100px rgba(124, 58, 237, 0.5)',
                    '0 0 30px rgba(124, 58, 237, 0.6), 0 0 60px rgba(124, 58, 237, 0.3)',
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>

            {/* ═══════════════════════════════════════════════
                LAYER 4 — SVG Neural Network
                ═══════════════════════════════════════════════ */}
            <AnimatePresence>
              {showNeural && (
                <motion.div
                  key="neural-svg"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none',
                  }}
                  initial={{ opacity: 0 }}
                  animate={phase === 'golive'
                    ? { opacity: 0, scale: 1.5 }
                    : { opacity: 1, scale: 1 }
                  }
                  exit={{ opacity: 0, scale: 1.8 }}
                  transition={phase === 'golive'
                    ? { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
                    : { duration: 0.8 }
                  }
                >
                  <svg
                    viewBox="0 0 1000 800"
                    style={{
                      width: '100%',
                      maxWidth: '900px',
                      height: 'auto',
                      overflow: 'visible',
                    }}
                  >
                    <defs>
                      <linearGradient id="neural-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#7c3aed" />
                        <stop offset="50%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#818cf8" />
                      </linearGradient>
                      <linearGradient id="neural-grad-warm" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#a78bfa" />
                        <stop offset="100%" stopColor="#c4b5fd" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Primary connection lines */}
                    {primaryPaths.map((p) => {
                      const pathLen = Math.sqrt((p.x2 - cx) ** 2 + (p.y2 - cy) ** 2);
                      return (
                        <motion.line
                          key={`p-${p.id}`}
                          x1={cx}
                          y1={cy}
                          x2={p.x2}
                          y2={p.y2}
                          stroke="url(#neural-grad)"
                          strokeWidth={1.2}
                          strokeLinecap="round"
                          filter="url(#glow)"
                          initial={{
                            strokeDasharray: pathLen,
                            strokeDashoffset: pathLen,
                            opacity: 0,
                          }}
                          animate={{
                            strokeDashoffset: 0,
                            opacity: [0, 1, 0.6],
                          }}
                          transition={{
                            duration: 1.0,
                            delay: p.delay,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        />
                      );
                    })}

                    {/* Branch lines */}
                    {branchPaths.map((b) => (
                      <motion.line
                        key={`b-${b.id}`}
                        x1={b.x1}
                        y1={b.y1}
                        x2={b.x2}
                        y2={b.y2}
                        stroke="url(#neural-grad-warm)"
                        strokeWidth={0.7}
                        strokeLinecap="round"
                        opacity={0.5}
                        initial={{
                          strokeDasharray: b.length,
                          strokeDashoffset: b.length,
                          opacity: 0,
                        }}
                        animate={{
                          strokeDashoffset: 0,
                          opacity: [0, 0.5, 0.3],
                        }}
                        transition={{
                          duration: 0.8,
                          delay: b.delay,
                          ease: 'easeOut',
                        }}
                      />
                    ))}

                    {/* Primary endpoint nodes */}
                    {primaryPaths.map((p) => (
                      <motion.circle
                        key={`n-${p.id}`}
                        cx={p.x2}
                        cy={p.y2}
                        r={3}
                        fill="#a78bfa"
                        filter="url(#glow)"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: 1,
                          opacity: [0, 1, 0.7],
                        }}
                        transition={{
                          duration: 0.5,
                          delay: p.delay + 0.5,
                          ease: [0.34, 1.56, 0.64, 1],
                        }}
                      />
                    ))}

                    {/* Branch endpoint nodes (smaller) */}
                    {branchPaths.map((b) => (
                      <motion.circle
                        key={`bn-${b.id}`}
                        cx={b.x2}
                        cy={b.y2}
                        r={1.5}
                        fill="#c4b5fd"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: 1,
                          opacity: [0, 0.6, 0.4],
                        }}
                        transition={{
                          duration: 0.4,
                          delay: b.delay + 0.3,
                          ease: 'easeOut',
                        }}
                      />
                    ))}

                    {/* Energy pulses traveling along primary paths */}
                    {primaryPaths.map((p) => {
                      const pathLen = Math.sqrt((p.x2 - cx) ** 2 + (p.y2 - cy) ** 2);
                      return (
                        <motion.circle
                          key={`pulse-${p.id}`}
                          r={2}
                          fill="#818cf8"
                          filter="url(#glow)"
                          initial={{ opacity: 0 }}
                          animate={{
                            cx: [cx, p.x2],
                            cy: [cy, p.y2],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            delay: p.delay + 1.0 + Math.random() * 0.5,
                            repeat: Infinity,
                            repeatDelay: 2 + Math.random() * 3,
                            ease: 'linear',
                          }}
                        />
                      );
                    })}
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ═══════════════════════════════════════════════
                LAYER 5 — Identity text (typed effect)
                ═══════════════════════════════════════════════ */}
            <AnimatePresence>
              {showIdentity && (
                <motion.div
                  key="identity-content"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 20,
                    textAlign: 'center',
                    padding: '0 24px',
                  }}
                  initial={{ opacity: 0 }}
                  animate={phase === 'golive'
                    ? { opacity: 0, scale: 1.1 }
                    : { opacity: 1 }
                  }
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Glow behind text */}
                  <div style={{
                    position: 'absolute',
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(124, 58, 237, 0.2), transparent 65%)',
                    filter: 'blur(80px)',
                    pointerEvents: 'none',
                  }} />

                  {/* System initializing label */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    style={{
                      fontFamily: "'Inter', monospace",
                      fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)',
                      fontWeight: 500,
                      letterSpacing: '0.35em',
                      textTransform: 'uppercase',
                      color: 'rgba(129, 140, 248, 0.7)',
                      marginBottom: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <motion.span
                      style={{
                        display: 'inline-block',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#22c55e',
                      }}
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    System Online
                  </motion.div>

                  {/* NEBO IT SOLUTIONS — typed text */}
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 'clamp(2rem, 6vw, 4.5rem)',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      background: 'linear-gradient(135deg, #f0f0ff 0%, #a78bfa 40%, #7c3aed 60%, #818cf8 100%)',
                      backgroundSize: '200% 200%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 0 40px rgba(124, 58, 237, 0.4))',
                      lineHeight: 1.1,
                      marginBottom: '16px',
                      position: 'relative',
                    }}
                  >
                    NEBO IT Solutions
                    {/* Blinking cursor */}
                    <motion.span
                      style={{
                        display: 'inline-block',
                        width: '3px',
                        height: '0.8em',
                        background: '#818cf8',
                        marginLeft: '4px',
                        verticalAlign: 'baseline',
                        borderRadius: '2px',
                      }}
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  </motion.div>

                  {/* Divider line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      width: '120px',
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, #7c3aed, #818cf8, transparent)',
                      marginBottom: '16px',
                      borderRadius: '2px',
                    }}
                  />

                  {/* Subtitle */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.7 }}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 'clamp(0.65rem, 1.5vw, 0.9rem)',
                      fontWeight: 300,
                      letterSpacing: '0.2em',
                      color: 'rgba(165, 165, 192, 0.7)',
                      textTransform: 'uppercase',
                      maxWidth: '500px',
                      lineHeight: 1.6,
                    }}
                  >
                    An IT Division of Nebo Engineering India Pvt. Ltd.
                  </motion.div>

                  {/* Progress bar */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    style={{
                      marginTop: '40px',
                      width: 'min(300px, 80vw)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <div style={{
                      fontFamily: "'Inter', monospace",
                      fontSize: '0.65rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'rgba(129, 140, 248, 0.5)',
                    }}>
                      Initializing AI Systems...
                    </div>
                    <div style={{
                      width: '100%',
                      height: '2px',
                      background: 'rgba(124, 58, 237, 0.15)',
                      borderRadius: '2px',
                      overflow: 'hidden',
                    }}>
                      <motion.div
                        style={{
                          height: '100%',
                          background: 'linear-gradient(90deg, #7c3aed, #818cf8)',
                          borderRadius: '2px',
                        }}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1.5, delay: 0.9, ease: 'easeInOut' }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ═══════════════════════════════════════════════
                LAYER 6 — Radial burst (go-live flash)
                ═══════════════════════════════════════════════ */}
            <AnimatePresence>
              {phase === 'golive' && (
                <motion.div
                  key="radial-burst"
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(124, 58, 237, 0.5), rgba(99, 102, 241, 0.3), transparent 70%)',
                    zIndex: 25,
                    pointerEvents: 'none',
                  }}
                  initial={{ scale: 0.5, opacity: 0.8 }}
                  animate={{ scale: 6, opacity: 0 }}
                  transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </AnimatePresence>

            {/* ═══════════════════════════════════════════════
                LAYER 7 — Background fade-out during golive
                ═══════════════════════════════════════════════ */}
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                background: '#06060e',
                zIndex: -1,
              }}
              animate={phase === 'golive' ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            />

            {/* ═══════════════════════════════════════════════
                SKIP BUTTON
                ═══════════════════════════════════════════════ */}
            {phase !== 'golive' && (
              <motion.button
                onClick={handleSkip}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                style={{
                  position: 'absolute',
                  bottom: '40px',
                  right: '40px',
                  zIndex: 30,
                  padding: '10px 24px',
                  background: 'rgba(124, 58, 237, 0.05)',
                  border: '1px solid rgba(124, 58, 237, 0.2)',
                  borderRadius: '999px',
                  color: 'rgba(129, 140, 248, 0.6)',
                  fontSize: '0.75rem',
                  fontFamily: "var(--font-body)",
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase' as const,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                whileHover={{
                  background: 'rgba(124, 58, 237, 0.15)',
                  borderColor: 'rgba(124, 58, 237, 0.5)',
                  color: 'rgba(167, 139, 250, 1)',
                }}
              >
                Skip Intro
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CurtainReveal;
