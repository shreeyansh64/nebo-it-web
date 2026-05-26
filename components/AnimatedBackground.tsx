import React, { useEffect, useRef } from 'react';

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  color: string;
  depth: number;
  opacity: number;
  baseOpacity: number;
  isSpark: boolean;
  life: number;
  maxLife: number;

  constructor(x: number, y: number, isSpark = false, cursorVx = 0, cursorVy = 0) {
    this.x = x;
    this.y = y;
    this.isSpark = isSpark;
    this.depth = isSpark ? 0.3 + Math.random() * 0.4 : 0.2 + Math.random() * 0.8;

    if (isSpark) {
      const angle = Math.atan2(cursorVy, cursorVx) + Math.PI + (Math.random() - 0.5) * 1.5;
      const speed = (Math.sqrt(cursorVx * cursorVx + cursorVy * cursorVy) * 0.15) + Math.random() * 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      
      this.baseSize = 1.5 + Math.random() * 2.5;
      this.size = this.baseSize;
      this.maxLife = 25 + Math.random() * 25;
      this.life = this.maxLife;
      
      const sparkColors = ['#06b6d4', '#818cf8', '#a78bfa', '#22d3ee'];
      this.color = sparkColors[Math.floor(Math.random() * sparkColors.length)];
      this.baseOpacity = 0.9;
      this.opacity = this.baseOpacity;
    } else {
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      
      this.baseSize = 1.0 + Math.random() * 2.5;
      this.size = this.baseSize;
      this.maxLife = 0;
      this.life = 0;
      
      const brandColors = ['#7c3aed', '#6366f1', '#818cf8', '#06b6d4'];
      this.color = brandColors[Math.floor(Math.random() * brandColors.length)];
      this.baseOpacity = 0.25 + Math.random() * 0.45;
      this.opacity = this.baseOpacity;
    }
  }

  update(width: number, height: number, mouseX: number, mouseY: number, mouseActive: boolean, scrollY: number, delta: number) {
    if (this.isSpark) {
      this.x += this.vx * delta;
      this.y += this.vy * delta;
      this.vx *= Math.pow(0.96, delta);
      this.vy *= Math.pow(0.96, delta);

      this.life -= delta;
      // FIX: Clamp life and size to ensure they never go negative
      const lifeRatio = Math.max(0, this.life / this.maxLife);
      this.opacity = lifeRatio * this.baseOpacity;
      this.size = lifeRatio * this.baseSize;
    } else {
      this.x += this.vx * delta;
      this.y += this.vy * delta;

      if (mouseActive) {
        let renderY = (this.y - scrollY * this.depth * 0.15) % height;
        if (renderY < 0) renderY += height;

        const dx = mouseX - this.x;
        const dy = mouseY - renderY;
        const distSq = dx * dx + dy * dy;
        const forceRadius = 160;

        if (distSq < forceRadius * forceRadius) {
          const dist = Math.sqrt(distSq);
          if (dist > 2.0) {
            const force = (forceRadius - dist) / forceRadius;
            this.x += (dx / dist) * force * 0.45 * delta;
            this.y += (dy / dist) * force * 0.45 * delta;
          }
        }
      }

      if (this.x < -20) this.x = width + 20;
      if (this.x > width + 20) this.x = -20;
      if (this.y < -20) this.y = height + 20;
      if (this.y > height + 20) this.y = -20;
    }
  }

  draw(ctx: CanvasRenderingContext2D, height: number, scrollY: number) {
    let renderY = this.y;
    
    if (!this.isSpark) {
      renderY = (this.y - scrollY * this.depth * 0.15) % height;
      if (renderY < 0) renderY += height;
    }

    ctx.save();
    ctx.beginPath();
    // FIX: Ensure the radius passed to arc is never negative
    ctx.arc(this.x, renderY, Math.max(0, this.size), 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;

    if (this.isSpark || this.size > 2.5) {
      ctx.shadowBlur = 12;
      ctx.shadowColor = this.color;
    }

    ctx.fill();
    ctx.restore();
  }
}

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mouse = { x: 0, y: 0, prevX: 0, prevY: 0, vx: 0, vy: 0, active: false };
    let scrollY = window.scrollY;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    let particles: Particle[] = [];
    const baseParticleCount = width < 768 ? 35 : 110;

    const initParticles = () => {
      particles = [];
      const count = width < 768 ? 35 : 110;
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(Math.random() * width, Math.random() * height));
      }
    };

    initParticles();

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouse.active) {
        mouse.prevX = e.clientX;
        mouse.prevY = e.clientY;
        mouse.active = true;
      }
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.vx = mouse.x - mouse.prevX;
      mouse.vy = mouse.y - mouse.prevY;
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;

      // const cursorSpeed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);
      // if (cursorSpeed > 1 && particles.length < baseParticleCount * 2.5) {
      //   const sparksCount = Math.min(Math.floor(cursorSpeed / 3.5) + 1, 4);
      //   for (let i = 0; i < sparksCount; i++) {
      //     particles.push(new Particle(mouse.x + (Math.random()-0.5)*8, mouse.y + (Math.random()-0.5)*8, true, mouse.vx, mouse.vy));
      //   }
      // }
    };

    const handleMouseLeave = () => { mouse.active = false; mouse.vx = 0; mouse.vy = 0; };
    const handleScroll = () => { scrollY = window.scrollY; };
    const handleResize = () => {
      width = window.innerWidth; height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr; canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      initParticles();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    let lastTime = performance.now();
    let animationId: number;

    const tick = (time: number) => {
      const rawDelta = time - lastTime;
      lastTime = time;
      let delta = isNaN(rawDelta) || rawDelta <= 0 ? 1.0 : rawDelta / 16.67;
      delta = Math.min(delta, 3.0);

      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        if (p1.isSpark) continue;
        let renderY1 = (p1.y - scrollY * p1.depth * 0.15) % height;
        if (renderY1 < 0) renderY1 += height;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          if (p2.isSpark) continue;
          let renderY2 = (p2.y - scrollY * p2.depth * 0.15) % height;
          if (renderY2 < 0) renderY2 += height;

          const dx = p1.x - p2.x;
          const dy = renderY1 - renderY2;
          const distSq = dx * dx + dy * dy;
          const maxDistance = width < 768 ? 90 : 130;

          if (distSq < maxDistance * maxDistance) {
             const dist = Math.sqrt(distSq);
             const alpha = (1 - dist / maxDistance) * 0.16;
             if (isFinite(p1.x) && isFinite(renderY1) && isFinite(p2.x) && isFinite(renderY2)) {
                ctx.beginPath();
                ctx.moveTo(p1.x, renderY1);
                ctx.lineTo(p2.x, renderY2);
                const grad = ctx.createLinearGradient(p1.x, renderY1, p2.x, renderY2);
                grad.addColorStop(0, p1.color);
                grad.addColorStop(1, p2.color);
                ctx.strokeStyle = grad;
                ctx.globalAlpha = alpha;
                ctx.lineWidth = width < 768 ? 0.6 : 0.85;
                ctx.stroke();
             }
          }
        }
      }

      // Update & Render
      particles = particles.filter((p) => {
        p.update(width, height, mouse.x, mouse.y, mouse.active, scrollY, delta);
        p.draw(ctx, height, scrollY);
        return !p.isSpark || p.life > 0;
      });

      mouse.vx *= 0.5;
      mouse.vy *= 0.5;
      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="animated-bg">
      <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" /><div className="grid-pattern" />
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'block', pointerEvents: 'none' }} />
    </div>
  );
};

export default AnimatedBackground;