"use client";

import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import { Sparkles } from "lucide-react";
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";

import { useRouter } from "next/navigation";

export interface LiquidMetalButtonProps {
  label?: string;
  onClick?: (e?: React.MouseEvent) => void;
  href?: string;
  type?: "button" | "submit" | "reset";
  viewMode?: "text" | "icon";
  icon?: React.ReactNode;
  glowColor?: string;
  className?: string;
  disabled?: boolean;
}

export function LiquidMetalButton({
  label = "Get Started",
  onClick,
  href,
  type = "button",
  viewMode = "text",
  icon,
  glowColor = "#FFD700",
  className = "",
  disabled = false,
}: LiquidMetalButtonProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<
    Array<{ x: number; y: number; id: number }>
  >([]);
  const shaderRef = useRef<HTMLDivElement>(null);
  // biome-ignore lint/suspicious/noExplicitAny: External library without types
  const shaderMount = useRef<any>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleId = useRef(0);

  // Dynamic dimensions based on viewMode and label length
  const dimensions = useMemo(() => {
    if (viewMode === "icon") {
      return {
        width: 48,
        height: 48,
        innerWidth: 44,
        innerHeight: 44,
        shaderWidth: 48,
        shaderHeight: 48,
      };
    } else {
      // Calculate width based on label length to prevent text overflow
      const calculatedWidth = Math.max(150, label.length * 9 + 54);
      return {
        width: calculatedWidth,
        height: 48,
        innerWidth: calculatedWidth - 4,
        innerHeight: 44,
        shaderWidth: calculatedWidth,
        shaderHeight: 48,
      };
    }
  }, [viewMode, label]);

  useEffect(() => {
    const styleId = "shader-canvas-style-exploded-gold";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .shader-container-exploded canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          border-radius: 100px !important;
        }
        @keyframes ripple-animation-gold {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.7;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    const loadShader = async () => {
      try {
        if (shaderRef.current) {
          if (shaderMount.current?.destroy) {
            shaderMount.current.destroy();
          }

          // Shaders configured with golden-amber shift parameters matching the neon gold theme
          shaderMount.current = new ShaderMount(
            shaderRef.current,
            liquidMetalFragmentShader,
            {
              u_repetition: 4,
              u_softness: 0.55,
              u_shiftRed: 0.52, // Warmer metallic golden hue
              u_shiftBlue: 0.08, // Low blue to emphasize golden liquid reflections
              u_distortion: 0.02,
              u_contour: 0,
              u_angle: 45,
              u_scale: 8,
              u_shape: 1,
              u_offsetX: 0.1,
              u_offsetY: -0.1,
            },
            undefined,
            0.6,
          );
        }
      } catch (error) {
        console.error("[LiquidMetalButton] Failed to load shader:", error);
      }
    };

    loadShader();

    return () => {
      if (shaderMount.current?.destroy) {
        shaderMount.current.destroy();
        shaderMount.current = null;
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (disabled) return;
    setIsHovered(true);
    shaderMount.current?.setSpeed?.(1.1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    shaderMount.current?.setSpeed?.(0.6);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    if (shaderMount.current?.setSpeed) {
      shaderMount.current.setSpeed(2.4);
      setTimeout(() => {
        if (isHovered) {
          shaderMount.current?.setSpeed?.(1.1);
        } else {
          shaderMount.current?.setSpeed?.(0.6);
        }
      }, 350);
    }

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = { x, y, id: rippleId.current++ };

      setRipples((prev) => [...prev, ripple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
      }, 650);
    }

    onClick?.(e);
    if (href) {
      router.push(href);
    }
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        style={{
          perspective: "1000px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        <div
          style={{
            position: "relative",
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`,
            transformStyle: "preserve-3d",
            transition:
              "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease",
            transform: "none",
          }}
        >
          {/* Label & Icon Layer */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transformStyle: "preserve-3d",
              transition:
                "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease, gap 0.4s ease",
              transform: "translateZ(22px)",
              zIndex: 30,
              pointerEvents: "none",
            }}
          >
            {viewMode === "icon" ? (
              icon || (
                <Sparkles
                  size={18}
                  style={{
                    color: isHovered ? "#FFF000" : glowColor,
                    filter: isHovered
                      ? "drop-shadow(0px 0px 8px rgba(255, 215, 0, 0.9))"
                      : "drop-shadow(0px 0px 4px rgba(255, 215, 0, 0.5))",
                    transition: "all 0.4s ease",
                    transform: isHovered ? "scale(1.15) rotate(5deg)" : "scale(1)",
                  }}
                />
              )
            ) : (
              <>
                {icon ? (
                  icon
                ) : (
                  <Sparkles
                    size={15}
                    style={{
                      color: isHovered ? "#FFF000" : glowColor,
                      filter: isHovered
                        ? "drop-shadow(0px 0px 6px rgba(255, 215, 0, 0.8))"
                        : "drop-shadow(0px 0px 3px rgba(255, 215, 0, 0.4))",
                      transition: "all 0.4s ease",
                    }}
                  />
                )}
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    letterSpacing: "0.03em",
                    color: isHovered ? "#FFF000" : "#FFD700",
                    textShadow: isHovered
                      ? "0px 0px 14px rgba(255, 215, 0, 0.85), 0px 1px 2px rgba(0, 0, 0, 0.9)"
                      : "0px 0px 8px rgba(255, 215, 0, 0.4), 0px 1px 2px rgba(0, 0, 0, 0.8)",
                    transition: "all 0.4s ease",
                    transform: isHovered ? "scale(1.02)" : "scale(1)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {label}
                </span>
              </>
            )}
          </div>

          {/* Inner Core Plate Layer */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
              transformStyle: "preserve-3d",
              transition:
                "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease",
              transform: `translateZ(10px) ${isPressed ? "translateY(1px) scale(0.98)" : "translateY(0) scale(1)"}`,
              zIndex: 20,
            }}
          >
            <div
              style={{
                width: `${dimensions.innerWidth}px`,
                height: `${dimensions.innerHeight}px`,
                margin: "2px",
                borderRadius: "100px",
                background: isHovered
                  ? "linear-gradient(180deg, #1f1b0a 0%, #0a0802 100%)"
                  : "linear-gradient(180deg, #141208 0%, #050401 100%)",
                border: isHovered
                  ? "1px solid rgba(255, 215, 0, 0.45)"
                  : "1px solid rgba(255, 215, 0, 0.2)",
                boxShadow: isPressed
                  ? "inset 0px 2px 6px rgba(0, 0, 0, 0.9), inset 0px 0px 8px rgba(255, 215, 0, 0.2)"
                  : isHovered
                    ? "inset 0px 1px 2px rgba(255, 215, 0, 0.35), inset 0px -2px 6px rgba(0, 0, 0, 0.7)"
                    : "inset 0px 1px 1px rgba(255, 215, 0, 0.15), inset 0px -2px 4px rgba(0, 0, 0, 0.8)",
                transition:
                  "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease, box-shadow 0.2s ease, border-color 0.3s ease",
              }}
            />
          </div>

          {/* Liquid Metal Shader Canvas Layer */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
              transformStyle: "preserve-3d",
              transition:
                "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease",
              transform: `translateZ(0px) ${isPressed ? "translateY(1px) scale(0.98)" : "translateY(0) scale(1)"}`,
              zIndex: 10,
            }}
          >
            <div
              style={{
                height: `${dimensions.height}px`,
                width: `${dimensions.width}px`,
                borderRadius: "100px",
                position: "relative",
                boxShadow: isPressed
                  ? "0px 0px 0px 1px rgba(255, 215, 0, 0.9), 0px 0px 16px rgba(255, 215, 0, 0.6), 0px 2px 4px rgba(0, 0, 0, 0.8)"
                  : isHovered
                    ? "0px 0px 0px 1.5px rgba(255, 215, 0, 0.85), 0px 0px 24px rgba(255, 215, 0, 0.45), 0px 0px 48px rgba(255, 215, 0, 0.2), 0px 8px 24px rgba(0, 0, 0, 0.9)"
                    : "0px 0px 0px 1px rgba(255, 215, 0, 0.35), 0px 0px 12px rgba(255, 215, 0, 0.15), 0px 4px 16px rgba(0, 0, 0, 0.7)",
                transition:
                  "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease, box-shadow 0.3s ease",
                background: "rgb(0 0 0 / 0)",
              }}
            >
              <div
                ref={shaderRef}
                className="shader-container-exploded"
                style={{
                  borderRadius: "100px",
                  overflow: "hidden",
                  position: "relative",
                  width: `${dimensions.shaderWidth}px`,
                  maxWidth: `${dimensions.shaderWidth}px`,
                  height: `${dimensions.shaderHeight}px`,
                  transition: "width 0.4s ease, height 0.4s ease",
                }}
              />
              {/* Molten Gold Color Filter Overlay to tint shader canvas into glowing neon gold liquid */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "100px",
                  pointerEvents: "none",
                  background: isHovered
                    ? "linear-gradient(135deg, rgba(255, 215, 0, 0.32) 0%, rgba(255, 170, 0, 0.15) 50%, rgba(255, 240, 50, 0.25) 100%)"
                    : "linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 160, 0, 0.1) 50%, rgba(255, 230, 80, 0.15) 100%)",
                  mixBlendMode: "color-dodge",
                  transition: "background 0.4s ease",
                }}
              />
            </div>
          </div>

          {/* Interactive Button / Ripple Catching Layer */}
          <button
            ref={buttonRef}
            type={type}
            disabled={disabled}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
              background: "transparent",
              border: "none",
              cursor: disabled ? "not-allowed" : "pointer",
              outline: "none",
              zIndex: 40,
              transformStyle: "preserve-3d",
              transform: "translateZ(25px)",
              transition:
                "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease",
              overflow: "hidden",
              borderRadius: "100px",
            }}
            aria-label={label}
          >
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                style={{
                  position: "absolute",
                  left: `${ripple.x}px`,
                  top: `${ripple.y}px`,
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(255, 215, 0, 0.75) 0%, rgba(255, 200, 0, 0.35) 45%, rgba(255, 215, 0, 0) 70%)",
                  pointerEvents: "none",
                  animation: "ripple-animation-gold 0.65s ease-out",
                }}
              />
            ))}
          </button>
        </div>
      </div>
    </div>
  );
}
