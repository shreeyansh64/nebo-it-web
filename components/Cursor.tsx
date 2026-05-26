
// import React, { useEffect, useState } from 'react';
// import { motion, useSpring, useMotionValue } from 'framer-motion';

// const Cursor: React.FC = () => {
//   const [isHovering, setIsHovering] = useState(false);
//   const cursorX = useMotionValue(-100);
//   const cursorY = useMotionValue(-100);

// const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
//   const springX = useSpring(cursorX, springConfig);
//   const springY = useSpring(cursorY, springConfig);

//   useEffect(() => {
//     const moveCursor = (e: MouseEvent) => {
//       cursorX.set(e.clientX);
//       cursorY.set(e.clientY);
//     };

//     const handleHover = (e: MouseEvent) => {
//       const target = e.target as HTMLElement;
//       setIsHovering(!!target.closest('button, a, .clickable'));
//     };

//     window.addEventListener('mousemove', moveCursor);
//     window.addEventListener('mouseover', handleHover);

//     return () => {
//       window.removeEventListener('mousemove', moveCursor);
//       window.removeEventListener('mouseover', handleHover);
//     };
//   }, [cursorX, cursorY]);

//   return (
//     <>
//       <motion.div
//         className="fixed top-0 left-0 w-8 h-8 border border-cyan-400 rounded-full pointer-events-none z-[999999] hidden md:block"
//         // Fix: Cast style to any to allow custom motion properties like x and y
//         style={{
//           x: springX,
//           y: springY,
//           translateX: '-50%',
//           translateY: '-50%',
//         } as any}
//         animate={{
//   scale: isHovering ? 2.5 : 1,
//   rotate: isHovering ? 45 : 0, // Adds a premium geometric feel
//   backgroundColor: isHovering ? 'rgba(34, 211, 238, 0.1)' : 'transparent',
// }}
//       />
//       <motion.div
//         className="fixed top-0 left-0 w-1.5 h-1.5 bg-cyan-400 rounded-full pointer-events-none z-[9999] hidden md:block"
//         // Fix: Cast style to any to allow custom motion properties like x and y
//         style={{
//           x: cursorX,
//           y: cursorY,
//           translateX: '-50%',
//           translateY: '-50%',
//         } as any}
//       />
//     </>
//   );
// };

// export default Cursor;
