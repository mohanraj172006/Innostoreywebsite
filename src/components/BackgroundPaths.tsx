"use client";

import { motion } from "framer-motion";
import { memo, useMemo, useState, useEffect } from "react";

interface Point {
  x: number;
  y: number;
}

interface PathData {
  id: string;
  d: string;
  opacity: number;
  width: number;
}

// Coordinate rounding helper to prevent SSR floating-point precision mismatches
const r = (n: number) => Math.round(n * 10) / 10;

function generateAestheticPath(
  index: number,
  position: number,
  type: "primary" | "secondary" | "accent"
): string {
  const baseAmplitude =
    type === "primary" ? 150 : type === "secondary" ? 100 : 60;
  const phase = index * 0.2;
  const points: Point[] = [];
  const segments = type === "primary" ? 10 : type === "secondary" ? 8 : 6;

  const startX = 2400;
  const startY = 800;
  const endX = -2400;
  const endY = -800 + index * 25;

  for (let i = 0; i <= segments; i++) {
    const progress = i / segments;
    const eased = 1 - (1 - progress) ** 2;

    const baseX = startX + (endX - startX) * eased;
    const baseY = startY + (endY - startY) * eased;

    const amplitudeFactor = 1 - eased * 0.3;
    const wave1 =
      Math.sin(progress * Math.PI * 3 + phase) *
      (baseAmplitude * 0.7 * amplitudeFactor);
    const wave2 =
      Math.cos(progress * Math.PI * 4 + phase) *
      (baseAmplitude * 0.3 * amplitudeFactor);
    const wave3 =
      Math.sin(progress * Math.PI * 2 + phase) *
      (baseAmplitude * 0.2 * amplitudeFactor);

    points.push({
      x: r(baseX * position),
      y: r(baseY + wave1 + wave2 + wave3),
    });
  }

  const pathCommands = points.map((point: Point, i: number) => {
    if (i === 0) return `M ${point.x} ${point.y}`;
    const prevPoint = points[i - 1];
    const tension = 0.4;
    const cp1x = r(prevPoint.x + (point.x - prevPoint.x) * tension);
    const cp1y = r(prevPoint.y);
    const cp2x = r(prevPoint.x + (point.x - prevPoint.x) * (1 - tension));
    const cp2y = r(point.y);
    return `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${point.x} ${point.y}`;
  });

  return pathCommands.join(" ");
}

export const FloatingPaths = memo(function FloatingPaths({
  position,
  gradientId = "neonGoldPathsGradient",
}: {
  position: number;
  gradientId?: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const primaryPaths: PathData[] = useMemo(() => {
    if (!mounted) return [];
    return Array.from({ length: 12 }, (_, i) => ({
      id: `primary-${position}-${i}`,
      d: generateAestheticPath(i, position, "primary"),
      opacity: 0.18 + i * 0.025,
      width: 3.5 + i * 0.35,
    }));
  }, [position, mounted]);

  const secondaryPaths: PathData[] = useMemo(() => {
    if (!mounted) return [];
    return Array.from({ length: 15 }, (_, i) => ({
      id: `secondary-${position}-${i}`,
      d: generateAestheticPath(i, position, "secondary"),
      opacity: 0.14 + i * 0.02,
      width: 2.5 + i * 0.25,
    }));
  }, [position, mounted]);

  const accentPaths: PathData[] = useMemo(() => {
    if (!mounted) return [];
    return Array.from({ length: 10 }, (_, i) => ({
      id: `accent-${position}-${i}`,
      d: generateAestheticPath(i, position, "accent"),
      opacity: 0.1 + i * 0.04,
      width: 1.8 + i * 0.2,
    }));
  }, [position, mounted]);

  // Avoid SSR hydration mismatch by only rendering paths once mounted on client
  if (!mounted) {
    return <div className="pointer-events-none absolute inset-0 overflow-hidden" />;
  }

  const sharedAnimationProps = {
    opacity: 1,
    scale: 1,
  };

  const sharedTransition = {
    opacity: { duration: 1 },
    scale: { duration: 1 },
  };

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="h-full w-full"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        viewBox="-2400 -800 4800 1600"
      >
        <title>Neon Gold Background Paths</title>
        <defs>
          <linearGradient id={gradientId} x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
            <stop offset="25%" stopColor="#FFF000" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#F5D76E" stopOpacity="0.75" />
            <stop offset="80%" stopColor="#D4AF37" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FFD700" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        <g className="primary-waves">
          {primaryPaths.map((path) => (
            <motion.path
              key={path.id}
              d={path.d}
              stroke={`url(#${gradientId})`}
              strokeLinecap="round"
              strokeWidth={path.width}
              style={{ opacity: path.opacity }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{
                ...sharedAnimationProps,
                y: [0, -18, 0],
              }}
              transition={{
                ...sharedTransition,
                y: {
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  repeatType: "reverse",
                },
              }}
            />
          ))}
        </g>

        <g className="secondary-waves" style={{ opacity: 0.85 }}>
          {secondaryPaths.map((path) => (
            <motion.path
              key={path.id}
              d={path.d}
              stroke={`url(#${gradientId})`}
              strokeLinecap="round"
              strokeWidth={path.width}
              style={{ opacity: path.opacity }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                ...sharedAnimationProps,
                y: [0, -12, 0],
              }}
              transition={{
                ...sharedTransition,
                y: {
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  repeatType: "reverse",
                },
              }}
            />
          ))}
        </g>

        <g className="accent-waves" style={{ opacity: 0.7 }}>
          {accentPaths.map((path) => (
            <motion.path
              key={path.id}
              d={path.d}
              stroke={`url(#${gradientId})`}
              strokeLinecap="round"
              strokeWidth={path.width}
              style={{ opacity: path.opacity }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                ...sharedAnimationProps,
                y: [0, -7, 0],
              }}
              transition={{
                ...sharedTransition,
                y: {
                  duration: 4.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  repeatType: "reverse",
                },
              }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
});

interface BackgroundPathsProps {
  children?: React.ReactNode;
  className?: string;
}

export default memo(function BackgroundPaths({
  children,
  className = "",
}: BackgroundPathsProps) {
  const isAbsolute = className.includes("absolute");
  return (
    <div
      className={`overflow-hidden ${isAbsolute ? "" : "relative w-full"} ${className}`}
    >
      {/* Background Flowing Paths from both directions with smooth continuous animation */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <FloatingPaths position={1} gradientId="neonGoldPathsGradient1" />
        <FloatingPaths position={-1} gradientId="neonGoldPathsGradient2" />
        {/* Subtle dark gradient fade out so foreground text is crystal clear */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.75)_85%,#000000_100%)] pointer-events-none" />
      </div>

      {/* Foreground Content */}
      {children && <div className="relative z-10 w-full">{children}</div>}
    </div>
  );
});
