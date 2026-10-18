"use client";

import React, { useEffect, useRef } from "react";

interface NodeItem {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  pulse: number;
  pulseSpeed: number;
}

interface NeuralCircuitBackgroundProps {
  className?: string;
}

export default function NeuralCircuitBackground({ className = "" }: NeuralCircuitBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = 0;
    let h = 0;
    let nodes: NodeItem[] = [];
    const NODE_COUNT = 75;
    const MAX_DIST = 155;
    let t = 0;

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };

    const initNodes = () => {
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2.5 + 1,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      }));
    };

    resize();
    initNodes();

    const onResize = () => { resize(); initNodes(); };
    window.addEventListener("resize", onResize);

    const hexPositions: { x: number; y: number; size: number; opacity: number }[] = Array.from({ length: 12 }, () => ({
      x: Math.random() * (canvas.offsetWidth || 1200),
      y: Math.random() * (canvas.offsetHeight || 800),
      size: Math.random() * 40 + 20,
      opacity: Math.random() * 0.05 + 0.015,
    }));

    const drawHex = (x: number, y: number, size: number, alpha: number, time: number, idx: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(time * 0.003 * (idx % 2 === 0 ? 1 : -1));
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        i === 0 ? ctx.moveTo(Math.cos(angle) * size, Math.sin(angle) * size) : ctx.lineTo(Math.cos(angle) * size, Math.sin(angle) * size);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(255,215,0,${alpha})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.restore();
    };

    const draw = () => {
      t++;
      ctx.clearRect(0, 0, w, h);

      // Circuit grid
      ctx.strokeStyle = "rgba(255,215,0,0.025)";
      ctx.lineWidth = 1;
      for (let y = 0; y < h; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
      for (let x = 0; x < w; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }

      // Hexagons
      hexPositions.forEach((hp, i) => drawHex(hp.x, hp.y, hp.size, hp.opacity * (0.7 + 0.3 * Math.sin(t * 0.01 + i)), t, i));

      // Update nodes
      nodes.forEach((n) => {
        n.x += n.vx; n.y += n.vy; n.pulse += n.pulseSpeed;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        n.x = Math.max(0, Math.min(w, n.x));
        n.y = Math.max(0, Math.min(h, n.y));
      });

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dist = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.15;
            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            grad.addColorStop(0, `rgba(255,215,0,${alpha})`);
            grad.addColorStop(0.5, `rgba(212,175,55,${alpha * 1.5})`);
            grad.addColorStop(1, `rgba(255,215,0,${alpha})`);
            ctx.beginPath(); ctx.strokeStyle = grad; ctx.lineWidth = 0.7;
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }

      // Nodes
      nodes.forEach((n) => {
        const pulseR = n.r + Math.sin(n.pulse) * 0.8;
        const alpha = 0.5 + 0.4 * Math.sin(n.pulse);
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, pulseR * 4);
        glow.addColorStop(0, `rgba(255,215,0,${alpha * 0.45})`);
        glow.addColorStop(1, "rgba(255,215,0,0)");
        ctx.beginPath(); ctx.arc(n.x, n.y, pulseR * 4, 0, Math.PI * 2);
        ctx.fillStyle = glow; ctx.fill();
        ctx.beginPath(); ctx.arc(n.x, n.y, pulseR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,215,0,${alpha})`; ctx.fill();
      });

      // Scan line
      const scanY = ((t * 0.5) % (h + 100)) - 50;
      const scanGrad = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
      scanGrad.addColorStop(0, "rgba(255,215,0,0)");
      scanGrad.addColorStop(0.5, "rgba(255,215,0,0.025)");
      scanGrad.addColorStop(1, "rgba(255,215,0,0)");
      ctx.fillStyle = scanGrad; ctx.fillRect(0, scanY - 30, w, 60);

      if (!isVisible) return;
      animId = requestAnimationFrame(draw);
    };

    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasVisible = isVisible;
          isVisible = entry.isIntersecting;
          if (isVisible && !wasVisible) {
            cancelAnimationFrame(animId);
            animId = requestAnimationFrame(draw);
          }
        });
      },
      { threshold: 0.02 }
    );
    observer.observe(canvas);

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ display: "block" }}
    />
  );
}
