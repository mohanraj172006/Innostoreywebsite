"use client";

import React, { useEffect, useRef } from "react";

export type PageVariant =
  | "about"
  | "services"
  | "academics"
  | "projects"
  | "contact"
  | "faq"
  | "careers"
  | "sales"
  | "leadership"
  | "terms";

interface Props {
  variant: PageVariant;
  className?: string;
}

export default function PageHeroBackground({ variant, className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;
    let w = 0;
    let h = 0;

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const GOLD = "rgba(255,215,0,";
    const GOLD2 = "rgba(212,175,55,";

    // -- ABOUT: Full-page flowing gold particle field + gentle wave streams
    const drawAbout = () => {
      ctx.clearRect(0, 0, w, h);

      // Layer 1: Soft horizontal drifting wave streams across full width
      const waveCount = 8;
      for (let wi = 0; wi < waveCount; wi++) {
        const yBase = (wi / (waveCount - 1)) * h;
        const speed = 0.003 + wi * 0.0005;
        const amplitude = 12 + wi * 4;
        const freq = 0.004 + wi * 0.001;
        const alpha = 0.12 + 0.08 * Math.sin(t * 0.008 + wi * 0.9);
        ctx.beginPath();
        for (let x = 0; x <= w; x += 3) {
          const y = yBase
            + Math.sin(x * freq + t * speed) * amplitude
            + Math.cos(x * freq * 0.6 - t * speed * 0.7 + wi) * (amplitude * 0.5);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = GOLD + alpha + ")";
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }

      // Layer 2: Scattered glowing gold particles across full canvas
      const seed = Math.floor(t * 0.005); // regenerate very slowly
      const particleCount = 60;
      for (let pi = 0; pi < particleCount; pi++) {
        // Use deterministic offsets so particles drift smoothly, not teleport
        const baseX = ((pi * 137.508) % 1) * w;
        const baseY = ((pi * 73.491) % 1) * h;
        const drift = Math.sin(t * 0.004 + pi * 0.7) * 30;
        const driftY = Math.cos(t * 0.003 + pi * 0.5) * 20;
        const px = (baseX + drift + w) % w;
        const py = (baseY + driftY + h) % h;
        const pulseAlpha = 0.18 + 0.14 * Math.sin(t * 0.015 + pi * 0.8);
        const r = 1.5 + 1.2 * Math.abs(Math.sin(t * 0.01 + pi));
        const glow = ctx.createRadialGradient(px, py, 0, px, py, r * 4);
        glow.addColorStop(0, GOLD + pulseAlpha + ")");
        glow.addColorStop(1, GOLD + "0)");
        ctx.beginPath(); ctx.arc(px, py, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = glow; ctx.fill();
        ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fillStyle = GOLD + pulseAlpha + ")"; ctx.fill();
      }

      // Layer 3: Thin diagonal faint connection lines between nearby particles
      // (sampled from a small subset for performance)
      const subset = 24;
      const pxs: number[] = [], pys: number[] = [];
      for (let pi = 0; pi < subset; pi++) {
        const baseX = ((pi * 137.508) % 1) * w;
        const baseY = ((pi * 73.491) % 1) * h;
        pxs.push((baseX + Math.sin(t * 0.004 + pi * 0.7) * 30 + w) % w);
        pys.push((baseY + Math.cos(t * 0.003 + pi * 0.5) * 20 + h) % h);
      }
      for (let i = 0; i < subset; i++) {
        for (let j = i + 1; j < subset; j++) {
          const dx = pxs[i] - pxs[j], dy = pys[i] - pys[j];
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const lineAlpha = (1 - dist / 140) * 0.12;
            ctx.beginPath();
            ctx.strokeStyle = GOLD + lineAlpha + ")";
            ctx.lineWidth = 0.6;
            ctx.moveTo(pxs[i], pys[i]); ctx.lineTo(pxs[j], pys[j]); ctx.stroke();
          }
        }
      }
    };

    // -- SERVICES: Floating holographic cubes -----------------------------
    interface Cube { x: number; y: number; size: number; vy: number; rotSpeed: number; rot: number; alpha: number; }
    let cubes: Cube[] = [];
    if (variant === "services") {
      cubes = Array.from({ length: 18 }, () => ({
        x: Math.random() * (canvas.offsetWidth || 1200),
        y: Math.random() * (canvas.offsetHeight || 500),
        size: Math.random() * 35 + 16,
        vy: -(Math.random() * 0.3 + 0.1),
        rotSpeed: (Math.random() - 0.5) * 0.02,
        rot: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.22 + 0.12,
      }));
    }
    const drawCube = (cx: number, cy: number, size: number, rot: number, alpha: number) => {
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot);
      const s = size / 2;
      ctx.strokeStyle = GOLD + alpha + ")"; ctx.lineWidth = 1.2;
      ctx.strokeRect(-s, -s, size, size);
      const d = s * 0.5;
      [[- s, -s], [s, -s], [s, s], [-s, s]].forEach(([fx, fy]) => {
        ctx.beginPath(); ctx.moveTo(fx, fy);
        ctx.lineTo(fx + d, fy - d); ctx.stroke();
      });
      ctx.strokeRect(-s + d, -s - d, size, size);
      ctx.restore();
    };
    const drawServices = () => {
      ctx.clearRect(0, 0, w, h);
      // Grid lines - brighter
      ctx.strokeStyle = GOLD + "0.08)"; ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 80) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += 80) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
      cubes.forEach(c => {
        c.y += c.vy; c.rot += c.rotSpeed;
        if (c.y + c.size < 0) { c.y = h + c.size; c.x = Math.random() * w; }
        drawCube(c.x, c.y, c.size, c.rot, c.alpha);
      });
    };

    // -- ACADEMICS: Constellation starfield -------------------------------
    interface Star { x: number; y: number; vx: number; vy: number; r: number; pulse: number; }
    let stars: Star[] = [];
    if (variant === "academics") {
      stars = Array.from({ length: 120 }, () => ({
        x: Math.random() * (canvas.offsetWidth || 1200),
        y: Math.random() * (canvas.offsetHeight || 500),
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 2 + 0.8,
        pulse: Math.random() * Math.PI * 2,
      }));
    }
    const drawAcademics = () => {
      ctx.clearRect(0, 0, w, h);
      stars.forEach(s => {
        s.x += s.vx; s.y += s.vy; s.pulse += 0.03;
        if (s.x < 0) s.x = w; if (s.x > w) s.x = 0;
        if (s.y < 0) s.y = h; if (s.y > h) s.y = 0;
        const a = 0.5 + 0.35 * Math.sin(s.pulse);
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = GOLD + a + ")"; ctx.fill();
      });
      // Constellation connections - brighter
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x, dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.strokeStyle = GOLD + (0.22 * (1 - dist / 90)) + ")";
            ctx.lineWidth = 0.7;
            ctx.moveTo(stars[i].x, stars[i].y); ctx.lineTo(stars[j].x, stars[j].y); ctx.stroke();
          }
        }
      }
    };

    // -- PROJECTS: Radar/sonar pulse waves --------------------------------
    const drawProjects = () => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2;
      const maxR = Math.max(w, h) * 0.55;
      // Ultra-slow ring expansion
      for (let ring = 0; ring < 5; ring++) {
        const r = (((t * 0.025 + ring * (maxR / 5)) % maxR));
        const alpha = (1 - r / maxR) * 0.36;
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = GOLD + alpha + ")"; ctx.lineWidth = 1.5; ctx.stroke();
      }
      // Ultra-slow radar sweep
      const sweepAngle = (t * 0.028) % (Math.PI * 2);
      ctx.save();
      ctx.translate(cx, cy);
      for (let a = 0; a < 80; a++) {
        const ang = sweepAngle - (a * Math.PI / 180);
        const fade = (80 - a) / 80;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, maxR, ang, ang + Math.PI / 180 * 2);
        ctx.closePath();
        ctx.fillStyle = GOLD + (0.09 * fade) + ")";
        ctx.fill();
      }
      ctx.restore();
      // Target blips — ultra-slow
      const blips = [0.2, 0.45, 0.7, 0.88].map((f, i) => ({ r: maxR * f, a: i * 1.3 + t * 0.002 }));
      blips.forEach(b => {
        const bx = cx + Math.cos(b.a) * b.r, by = cy + Math.sin(b.a) * b.r;
        const pulse = Math.abs(Math.sin(t * 0.012 + b.r));
        ctx.beginPath(); ctx.arc(bx, by, 4 + pulse * 3, 0, Math.PI * 2);
        ctx.fillStyle = GOLD + (0.7 * pulse) + ")"; ctx.fill();
      });
    };

    // -- CONTACT: Signal wave ripples -------------------------------------
    const drawContact = () => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2;
      // Concentric signal waves - brighter
      for (let i = 0; i < 8; i++) {
        const r = ((t * 40 + i * 80) % 600);
        const alpha = Math.max(0, 0.4 - r / 1500);
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = GOLD + alpha + ")"; ctx.lineWidth = 1.5; ctx.stroke();
      }
      // Horizontal signal lines - brighter
      for (let i = -3; i <= 3; i++) {
        const yOff = i * 35;
        const waveW = w * 0.9;
        ctx.beginPath();
        for (let x = 0; x <= waveW; x += 3) {
          const xp = cx - waveW / 2 + x;
          const y = cy + yOff + Math.sin((x / waveW) * Math.PI * 6 - t * 2) * 10 * (1 - Math.abs(i) / 4);
          x === 0 ? ctx.moveTo(xp, y) : ctx.lineTo(xp, y);
        }
        ctx.strokeStyle = GOLD + (0.18 - Math.abs(i) * 0.02) + ")"; ctx.lineWidth = 1.2; ctx.stroke();
      }
    };

    // -- FAQ: Hexagonal honeycomb pattern (slow, smooth & delicate light) ---
    const drawFAQ = () => {
      ctx.clearRect(0, 0, w, h);
      const hexR = 48;
      const hexW = hexR * 2;
      const hexH = Math.sqrt(3) * hexR;
      for (let row = -1; row < h / hexH + 2; row++) {
        for (let col = -1; col < w / hexW + 2; col++) {
          const cx = col * hexW * 0.75 + hexR;
          const cy = row * hexH + (col % 2 === 0 ? 0 : hexH / 2) + hexH / 2;
          // Ultra-smooth, slow rolling ambient wave
          const wave = Math.sin(t * 0.005 + row * 0.12 + col * 0.08) * 0.5 + 0.5;
          const alpha = 0.035 + wave * 0.045; // Soft, delicate gold opacity
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const px = cx + Math.cos(angle) * hexR;
            const py = cy + Math.sin(angle) * hexR;
            i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.strokeStyle = GOLD + alpha + ")";
          ctx.lineWidth = 0.75;
          ctx.stroke();

          // Very faint soft amber ambient wash on wave peaks
          if (wave > 0.9) {
            ctx.fillStyle = GOLD + "0.018)";
            ctx.fill();
          }
        }
      }
    };

    // -- CAREERS: Rising particles / rocket trail --------------------------
    interface Particle { x: number; y: number; vy: number; vx: number; life: number; maxLife: number; r: number; }
    let particles: Particle[] = [];
    const spawnParticle = () => {
      if (!canvas) return;
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: canvas.offsetHeight + 10,
        vy: -(Math.random() * 1.5 + 0.5),
        vx: (Math.random() - 0.5) * 0.6,
        life: 0,
        maxLife: Math.random() * 120 + 80,
        r: Math.random() * 3 + 1,
      });
    };
    const drawCareers = () => {
      ctx.clearRect(0, 0, w, h);
      if (t % 2 === 0) spawnParticle();
      particles = particles.filter(p => p.life < p.maxLife);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.life++;
        const progress = p.life / p.maxLife;
        const alpha = 0.7 * (1 - progress);
        const gr = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        gr.addColorStop(0, GOLD + alpha + ")");
        gr.addColorStop(1, GOLD + "0)");
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * (1 + progress), 0, Math.PI * 2);
        ctx.fillStyle = gr; ctx.fill();
      });
      // Rising trajectory arcs
      for (let i = 0; i < 5; i++) {
        const progress = ((t * 0.004 + i / 5) % 1);
        const startX = w * (0.1 + i * 0.2);
        const endX = w * (0.2 + i * 0.18);
        const x = startX + (endX - startX) * progress;
        const y = h - h * progress * 0.85;
        ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = GOLD + (0.75 * (1 - progress)) + ")"; ctx.fill();
      }
    };

    // -- SALES: Ascending bar chart / value waves --------------------------
    const drawSales = () => {
      ctx.clearRect(0, 0, w, h);
      const bars = 16;
      const barW = w / bars;
      for (let i = 0; i < bars; i++) {
        // Ultra-slow oscillation
        const barH = (0.15 + 0.65 * Math.abs(Math.sin(i * 0.55 + t * 0.002))) * h * 0.7;
        const x = i * barW + barW * 0.25;
        const y = h - barH;
        const grad = ctx.createLinearGradient(x, y, x, h);
        grad.addColorStop(0, GOLD2 + "0.22)");
        grad.addColorStop(0.6, GOLD2 + "0.10)");
        grad.addColorStop(1, GOLD2 + "0)");
        ctx.fillStyle = grad;
        ctx.fillRect(x, y, barW * 0.5, barH);
        ctx.fillStyle = GOLD + "0.42)";
        ctx.fillRect(x, y, barW * 0.5, 3);
      }
      // Ultra-slow trend line
      ctx.beginPath();
      for (let x = 0; x < w; x += 4) {
        const y = h * 0.5 - Math.sin(x / w * Math.PI * 4 - t * 0.003) * h * 0.22;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = GOLD + "0.32)"; ctx.lineWidth = 1.8; ctx.stroke();
    };

    // -- LEADERSHIP: Celestial astrolabe / compass rose (ultra-slow, bright & smooth) -
    const drawLeadership = () => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2;
      const maxR = Math.max(w, h) * 0.6;

      // Concentric celestial guidance rings - brighter gold glow
      for (let r = 45; r < maxR; r += 65) {
        const ringAlpha = 0.14 + 0.08 * Math.sin(t * 0.004 + r * 0.008);
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = GOLD + ringAlpha + ")";
        ctx.lineWidth = 1.0;
        ctx.stroke();
      }

      // Majestic slow astrolabe rotation (~70x slower)
      const rot = t * 0.0015;
      const spokeCount = 12;
      for (let i = 0; i < spokeCount; i++) {
        const angle = (i / spokeCount) * Math.PI * 2 + rot;
        const isCardinal = i % 3 === 0;
        const rInner = 28;
        const rOuter = Math.min(w, h) * (isCardinal ? 0.44 : 0.36);

        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * rInner, cy + Math.sin(angle) * rInner);
        ctx.lineTo(cx + Math.cos(angle) * rOuter, cy + Math.sin(angle) * rOuter);
        const alpha = isCardinal ? 0.32 : 0.14;
        ctx.strokeStyle = GOLD + alpha + ")";
        ctx.lineWidth = isCardinal ? 1.3 : 0.8;
        ctx.stroke();

        // Distinct glowing celestial nodes on spokes
        const tipX = cx + Math.cos(angle) * rOuter;
        const tipY = cy + Math.sin(angle) * rOuter;
        const nodePulse = isCardinal
          ? 0.35 + 0.25 * Math.sin(t * 0.006 + i * 0.7)
          : 0.16 + 0.10 * Math.sin(t * 0.006 + i * 0.7);
        const glowR = isCardinal ? 8 : 4;
        const glow = ctx.createRadialGradient(tipX, tipY, 0, tipX, tipY, glowR);
        glow.addColorStop(0, GOLD + nodePulse + ")");
        glow.addColorStop(1, GOLD + "0)");
        ctx.beginPath();
        ctx.arc(tipX, tipY, glowR, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(tipX, tipY, isCardinal ? 3 : 1.8, 0, Math.PI * 2);
        ctx.fillStyle = GOLD + Math.min(1, nodePulse * 1.6) + ")";
        ctx.fill();
      }
    };

    // -- TERMS: Flowing document lines (smooth drift, brighter gold script) -
    const drawTerms = () => {
      ctx.clearRect(0, 0, w, h);
      const lines = 14;
      for (let i = 0; i < lines; i++) {
        const y = (i / lines) * h + (h / lines) * 0.5;
        const lineW = w * (0.32 + 0.55 * Math.abs(Math.sin(i * 0.8)));
        // Ultra-slow graceful drift (~100x slower)
        const offset = Math.sin(t * 0.003 + i * 0.35) * 12;
        const x = (w - lineW) / 2 + offset;
        const alpha = 0.16 + 0.09 * Math.sin(t * 0.004 + i * 0.5);

        // Radiant gold gradient along the script line
        const grad = ctx.createLinearGradient(x, y, x + lineW, y);
        grad.addColorStop(0, GOLD + "0.04)");
        grad.addColorStop(0.12, GOLD + alpha + ")");
        grad.addColorStop(0.88, GOLD + alpha + ")");
        grad.addColorStop(1, GOLD + "0.04)");

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + lineW, y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // Bright, breathing gold cursor
        if (i % 3 === 0) {
          const cursorX = x + lineW + 6;
          const cursorAlpha = 0.25 + 0.35 * Math.sin(t * 0.015 + i * 0.9);
          ctx.fillStyle = GOLD + Math.max(0.1, cursorAlpha) + ")";
          ctx.fillRect(cursorX, y - 6, 2.5, 12);
        }
      }
    };

    const drawMap: Record<PageVariant, () => void> = {
      about: drawAbout,
      services: drawServices,
      academics: drawAcademics,
      projects: drawProjects,
      contact: drawContact,
      faq: drawFAQ,
      careers: drawCareers,
      sales: drawSales,
      leadership: drawLeadership,
      terms: drawTerms,
    };

    let isVisible = true;
    const loop = () => {
      if (!isVisible) return;
      t++;
      drawMap[variant]();
      animId = requestAnimationFrame(loop);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasVisible = isVisible;
          isVisible = entry.isIntersecting;
          if (isVisible && !wasVisible) {
            cancelAnimationFrame(animId);
            animId = requestAnimationFrame(loop);
          }
        });
      },
      { threshold: 0.02 }
    );
    observer.observe(canvas);

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ display: "block" }}
    />
  );
}
