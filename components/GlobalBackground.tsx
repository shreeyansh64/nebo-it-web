import React, { useRef, useMemo, Suspense, useEffect } from 'react';
import { Canvas, useFrame, events } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

// 1. Particle field with memoized positions
const ParticleField = ({ mouse }: { mouse: React.MutableRefObject<THREE.Vector2> }) => {
  const points = useMemo(() => {
    const count = 3000;
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 15;
      p[i * 3 + 1] = (Math.random() - 0.5) * 15;
      p[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return p;
  }, []);

  const ref = useRef<THREE.Points>(null!);

  useFrame((state, delta) => {
    ref.current.rotation.x += delta * 0.05;
    ref.current.rotation.y += delta * 0.075;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#06b6d4"
          size={0.02}
          opacity={0.3}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

// 2. Structural Cage with stabilized rotation
const StructuralCage = ({ mouse }: { mouse: React.MutableRefObject<THREE.Vector2> }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const baseRotation = useRef(0);

  useFrame((state, delta) => {
    baseRotation.current += delta * 0.15;
    const targetX = mouse.current.x * 0.3;
    const targetY = mouse.current.y * 0.3;
    
    // Smooth interpolation
    groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += delta * 0.1;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[2, 2.8, 2]} />
        <meshStandardMaterial color="#22d3ee" wireframe transparent opacity={0.15} />
      </mesh>
    </group>
  );
};

// 3. Main Memoized Component
const GlobalBackground = React.memo(() => {
  const mouse = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] bg-[#06060e] pointer-events-none">
      {/* FIX: events={{ enabled: false }} stops the Canvas from 
         stealing focus/events from the rest of your app.
      */}
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 60 }} 
        dpr={[1, 2]} 
        events={(store) => ({ ...events(store), enabled: false })}
      >
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <ParticleField mouse={mouse} />
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <StructuralCage mouse={mouse} />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
});

export default GlobalBackground;