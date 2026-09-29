"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  opacity: number;
  maxOpacity: number;
  life: number;
  maxLife: number;
  hue: number; // subtle variation around gold
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];
    const PARTICLE_COUNT = 80;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawn = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.1,
      size: Math.random() * 1.8 + 0.4,
      opacity: 0,
      maxOpacity: Math.random() * 0.55 + 0.1,
      life: 0,
      maxLife: Math.random() * 300 + 150,
      hue: Math.random() * 30 - 10, // -10 to +20 offset for yellow variation
    });

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = spawn();
      p.life = Math.random() * p.maxLife; // stagger start
      particles.push(p);
    }

    // Drifting orb for ambient background
    let orbX = canvas.width / 2;
    let orbY = canvas.height / 2;
    let orbDx = 0.25;
    let orbDy = 0.15;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Drifting ambient orb
      orbX += orbDx;
      orbY += orbDy;
      if (orbX < 200 || orbX > canvas.width - 200) orbDx *= -1;
      if (orbY < 200 || orbY > canvas.height - 200) orbDy *= -1;

      const orbGrad = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, 380);
      orbGrad.addColorStop(0, "rgba(255,215,0,0.05)");
      orbGrad.addColorStop(1, "transparent");
      ctx.fillStyle = orbGrad;
      ctx.beginPath();
      ctx.arc(orbX, orbY, 380, 0, Math.PI * 2);
      ctx.fill();

      // Particles
      for (const p of particles) {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        // Fade in / fade out
        const progress = p.life / p.maxLife;
        if (progress < 0.2) {
          p.opacity = (progress / 0.2) * p.maxOpacity;
        } else if (progress > 0.75) {
          p.opacity = ((1 - progress) / 0.25) * p.maxOpacity;
        } else {
          p.opacity = p.maxOpacity;
        }

        if (p.life >= p.maxLife) {
          Object.assign(p, spawn());
          p.life = 0;
        }

        // Gold glow particle
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        grd.addColorStop(0, `hsla(${45 + p.hue}, 100%, 65%, ${p.opacity})`);
        grd.addColorStop(0.5, `hsla(${45 + p.hue}, 100%, 50%, ${p.opacity * 0.4})`);
        grd.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core bright dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${50 + p.hue}, 100%, 80%, ${p.opacity * 0.9})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.9 }}
    />
  );
}
