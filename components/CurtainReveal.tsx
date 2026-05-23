import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CurtainReveal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [phase, setPhase] = useState<'curtain' | 'welcome' | 'opening' | 'done'>('curtain');

  // Play curtain animation once per session
  useEffect(() => {
    if (sessionStorage.getItem('nebo-curtain-played')) {
      setPhase('done');
      return;
    }

    const t1 = setTimeout(() => setPhase('welcome'), 800);
    const t2 = setTimeout(() => setPhase('opening'), 3800);
    const t3 = setTimeout(() => {
      setPhase('done');
      sessionStorage.setItem('nebo-curtain-played', 'true');
    }, 5600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Lock body scroll during curtain
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

  if (phase === 'done') {
    return <>{children}</>;
  }

  return (
    <>
      {/* Render children underneath (hidden by curtain overlay) */}
      <div style={{ visibility: phase === 'opening' ? 'visible' : 'hidden' }}>
        {children}
      </div>

      <AnimatePresence>
        {phase !== 'done' && (
          <motion.div
            key="curtain-overlay"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              overflow: 'hidden',
              pointerEvents: phase === 'opening' ? 'none' : 'auto',
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Background dark layer */}
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                background: '#030308',
                zIndex: 0,
              }}
              animate={phase === 'opening' ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            />

            {/* Atmospheric particles */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none' }}>
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: Math.random() * 3 + 1,
                    height: Math.random() * 3 + 1,
                    borderRadius: '50%',
                    background: `rgba(${180 + Math.random() * 75}, ${150 + Math.random() * 60}, ${50 + Math.random() * 80}, ${0.3 + Math.random() * 0.5})`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    filter: 'blur(0.5px)',
                  }}
                  animate={{
                    y: [0, -30 - Math.random() * 40, 0],
                    x: [0, (Math.random() - 0.5) * 20, 0],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>

            {/* ============ LEFT CURTAIN ============ */}
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '50%',
                height: '100%',
                zIndex: 10,
                overflow: 'hidden',
              }}
              animate={phase === 'opening' ? { x: '-105%' } : { x: 0 }}
              transition={
                phase === 'opening'
                  ? { duration: 1.4, ease: [0.76, 0, 0.24, 1] }
                  : undefined
              }
            >
              {/* Main curtain fabric */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `
                    linear-gradient(
                      180deg,
                      #1a0a2e 0%,
                      #12082a 15%,
                      #0d0620 40%,
                      #150b30 60%,
                      #0d0620 80%,
                      #08041a 100%
                    )
                  `,
                }}
              />

              {/* Velvet fold pattern - vertical lines with varying opacity */}
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={`lfold-${i}`}
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: `${(i / 12) * 100}%`,
                    width: '8.33%',
                    background: `linear-gradient(
                      90deg,
                      transparent 0%,
                      rgba(124, 58, 237, ${0.03 + (i % 3) * 0.02}) 30%,
                      rgba(90, 30, 190, ${0.06 + (i % 2) * 0.03}) 50%,
                      rgba(124, 58, 237, ${0.03 + (i % 3) * 0.02}) 70%,
                      transparent 100%
                    )`,
                  }}
                />
              ))}

              {/* Shimmer highlight on fabric */}
              <motion.div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(105deg, transparent 40%, rgba(167, 139, 250, 0.06) 50%, transparent 60%)',
                }}
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: 1 }}
              />

              {/* Golden border edge (right side) */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '3px',
                  height: '100%',
                  background: 'linear-gradient(180deg, #c9a84c, #f0d68a, #c9a84c, #a07830, #f0d68a, #c9a84c)',
                  boxShadow: '0 0 20px rgba(201, 168, 76, 0.4), -2px 0 15px rgba(201, 168, 76, 0.2)',
                }}
              />

              {/* Ornamental pattern top */}
              <div style={{
                position: 'absolute',
                top: '10%',
                right: '8%',
                width: '60px',
                height: '60px',
                border: '1px solid rgba(201, 168, 76, 0.3)',
                borderRadius: '50%',
                transform: 'rotate(45deg)',
              }}>
                <div style={{
                  position: 'absolute',
                  inset: '8px',
                  border: '1px solid rgba(201, 168, 76, 0.2)',
                  borderRadius: '50%',
                }} />
              </div>

              {/* Decorative diamond near edge */}
              <div style={{
                position: 'absolute',
                top: '50%',
                right: '10%',
                transform: 'translateY(-50%) rotate(45deg)',
                width: '16px',
                height: '16px',
                border: '1px solid rgba(201, 168, 76, 0.35)',
                boxShadow: '0 0 10px rgba(201, 168, 76, 0.15)',
              }} />

              {/* Top drape shadow */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '120px',
                background: 'linear-gradient(180deg, rgba(0,0,0,0.5), transparent)',
                zIndex: 2,
              }} />
            </motion.div>

            {/* ============ RIGHT CURTAIN ============ */}
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '50%',
                height: '100%',
                zIndex: 10,
                overflow: 'hidden',
              }}
              animate={phase === 'opening' ? { x: '105%' } : { x: 0 }}
              transition={
                phase === 'opening'
                  ? { duration: 1.4, ease: [0.76, 0, 0.24, 1] }
                  : undefined
              }
            >
              {/* Main curtain fabric */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `
                    linear-gradient(
                      180deg,
                      #1a0a2e 0%,
                      #12082a 15%,
                      #0d0620 40%,
                      #150b30 60%,
                      #0d0620 80%,
                      #08041a 100%
                    )
                  `,
                }}
              />

              {/* Velvet fold pattern */}
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={`rfold-${i}`}
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: `${(i / 12) * 100}%`,
                    width: '8.33%',
                    background: `linear-gradient(
                      90deg,
                      transparent 0%,
                      rgba(124, 58, 237, ${0.03 + (i % 3) * 0.02}) 30%,
                      rgba(90, 30, 190, ${0.06 + (i % 2) * 0.03}) 50%,
                      rgba(124, 58, 237, ${0.03 + (i % 3) * 0.02}) 70%,
                      transparent 100%
                    )`,
                  }}
                />
              ))}

              {/* Shimmer highlight */}
              <motion.div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(75deg, transparent 40%, rgba(167, 139, 250, 0.06) 50%, transparent 60%)',
                }}
                animate={{ x: ['100%', '-100%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: 2.5 }}
              />

              {/* Golden border edge (left side) */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '3px',
                  height: '100%',
                  background: 'linear-gradient(180deg, #c9a84c, #f0d68a, #c9a84c, #a07830, #f0d68a, #c9a84c)',
                  boxShadow: '0 0 20px rgba(201, 168, 76, 0.4), 2px 0 15px rgba(201, 168, 76, 0.2)',
                }}
              />

              {/* Ornamental pattern top */}
              <div style={{
                position: 'absolute',
                top: '10%',
                left: '8%',
                width: '60px',
                height: '60px',
                border: '1px solid rgba(201, 168, 76, 0.3)',
                borderRadius: '50%',
                transform: 'rotate(45deg)',
              }}>
                <div style={{
                  position: 'absolute',
                  inset: '8px',
                  border: '1px solid rgba(201, 168, 76, 0.2)',
                  borderRadius: '50%',
                }} />
              </div>

              {/* Decorative diamond near edge */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '10%',
                transform: 'translateY(-50%) rotate(45deg)',
                width: '16px',
                height: '16px',
                border: '1px solid rgba(201, 168, 76, 0.35)',
                boxShadow: '0 0 10px rgba(201, 168, 76, 0.15)',
              }} />

              {/* Top drape shadow */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '120px',
                background: 'linear-gradient(180deg, rgba(0,0,0,0.5), transparent)',
                zIndex: 2,
              }} />
            </motion.div>

            {/* ============ TOP VALANCE (curtain rod & drape) ============ */}
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: '-5%',
                right: '-5%',
                height: '50px',
                zIndex: 20,
                background: 'linear-gradient(180deg, #0d0620, #1a0a2e, rgba(13, 6, 32, 0.8))',
                borderBottom: '2px solid rgba(201, 168, 76, 0.4)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.6), 0 2px 10px rgba(201, 168, 76, 0.1)',
              }}
              animate={phase === 'opening' ? { y: '-100%', opacity: 0 } : { y: 0, opacity: 1 }}
              transition={phase === 'opening' ? { duration: 0.8, ease: 'easeIn' } : undefined}
            >
              {/* Rod */}
              <div style={{
                position: 'absolute',
                top: '6px',
                left: '3%',
                right: '3%',
                height: '4px',
                background: 'linear-gradient(90deg, #a07830, #f0d68a, #c9a84c, #f0d68a, #a07830)',
                borderRadius: '2px',
                boxShadow: '0 2px 8px rgba(201, 168, 76, 0.3)',
              }} />
              {/* Rings */}
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={`ring-${i}`}
                  style={{
                    position: 'absolute',
                    top: '2px',
                    left: `${5 + (i / 19) * 90}%`,
                    width: '10px',
                    height: '14px',
                    borderRadius: '50%',
                    border: '1.5px solid rgba(201, 168, 76, 0.5)',
                    background: 'transparent',
                  }}
                />
              ))}
            </motion.div>

            {/* ============ CENTER CONTENT (Welcome text) ============ */}
            <AnimatePresence>
              {(phase === 'welcome') && (
                <motion.div
                  key="welcome-content"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 15,
                    textAlign: 'center',
                    padding: '0 24px',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Glow behind text */}
                  <div style={{
                    position: 'absolute',
                    width: '400px',
                    height: '400px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15), transparent 70%)',
                    filter: 'blur(60px)',
                    pointerEvents: 'none',
                  }} />

                  {/* Decorative top line */}
                  <motion.div
                    style={{
                      width: '80px',
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)',
                      marginBottom: '32px',
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: '80px' }}
                    transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                  />

                  {/* "Welcome to" */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
                      fontWeight: 400,
                      letterSpacing: '0.35em',
                      textTransform: 'uppercase',
                      color: 'rgba(201, 168, 76, 0.85)',
                      marginBottom: '12px',
                    }}
                  >
                    Welcome to
                  </motion.div>

                  {/* "NEBO IT SOLUTIONS" */}
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 'clamp(2rem, 6vw, 4.5rem)',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      background: 'linear-gradient(135deg, #f0d68a 0%, #c9a84c 30%, #f5e6b8 50%, #c9a84c 70%, #a07830 100%)',
                      backgroundSize: '200% 200%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 0 30px rgba(201, 168, 76, 0.3))',
                      lineHeight: 1.1,
                      marginBottom: '20px',
                    }}
                  >
                    NEBO IT Solutions
                  </motion.div>

                  {/* Divider ornament */}
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '20px',
                    }}
                  >
                    <div style={{
                      width: '40px',
                      height: '1px',
                      background: 'linear-gradient(90deg, transparent, rgba(201, 168, 76, 0.5))',
                    }} />
                    <div style={{
                      width: '6px',
                      height: '6px',
                      border: '1px solid rgba(201, 168, 76, 0.5)',
                      transform: 'rotate(45deg)',
                    }} />
                    <div style={{
                      width: '40px',
                      height: '1px',
                      background: 'linear-gradient(90deg, rgba(201, 168, 76, 0.5), transparent)',
                    }} />
                  </motion.div>

                  {/* Subtitle */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 'clamp(0.7rem, 1.6vw, 0.95rem)',
                      fontWeight: 300,
                      letterSpacing: '0.2em',
                      color: 'rgba(200, 200, 230, 0.6)',
                      textTransform: 'uppercase',
                      maxWidth: '500px',
                      lineHeight: 1.6,
                    }}
                  >
                    An IT Division of Nebo Engineering India Pvt. Ltd.
                  </motion.div>

                  {/* Decorative bottom line */}
                  <motion.div
                    style={{
                      width: '80px',
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)',
                      marginTop: '32px',
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: '80px' }}
                    transition={{ duration: 1, delay: 1.2, ease: 'easeOut' }}
                  />

                  {/* Pulsing light rays */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      width: '600px',
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.2), transparent)',
                      top: '50%',
                    }}
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scaleX: [0.8, 1.2, 0.8],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* ============ SKIP BUTTON ============ */}
            {phase !== 'opening' && (
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
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(201, 168, 76, 0.25)',
                  borderRadius: '999px',
                  color: 'rgba(201, 168, 76, 0.7)',
                  fontSize: '0.75rem',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                whileHover={{
                  background: 'rgba(201, 168, 76, 0.1)',
                  borderColor: 'rgba(201, 168, 76, 0.5)',
                  color: 'rgba(201, 168, 76, 1)',
                }}
              >
                Skip Intro
              </motion.button>
            )}

            {/* Center seam glow — the "light through the crack" effect */}
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '4px',
                height: '100%',
                zIndex: 11,
              }}
              animate={phase === 'opening'
                ? {
                    width: '100vw',
                    opacity: [1, 0.8, 0],
                    background: [
                      'linear-gradient(180deg, transparent, rgba(201, 168, 76, 0.6), rgba(124, 58, 237, 0.4), rgba(201, 168, 76, 0.6), transparent)',
                      'linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.3), transparent)',
                      'linear-gradient(180deg, transparent, transparent, transparent)',
                    ],
                  }
                : {
                    background: 'linear-gradient(180deg, transparent, rgba(201, 168, 76, 0.15), rgba(124, 58, 237, 0.1), rgba(201, 168, 76, 0.15), transparent)',
                  }
              }
              transition={phase === 'opening'
                ? { duration: 1.4, ease: [0.76, 0, 0.24, 1] }
                : undefined
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CurtainReveal;
