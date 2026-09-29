"use client";

import React, { useEffect, useRef } from "react";

const VERTEX_SHADER_SOURCE = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SOURCE = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

// Rotation matrix
mat2 rot(float a) {
  float s = sin(a);
  float c = cos(a);
  return mat2(c, -s, s, c);
}

// Flowing wave function for organic undulating ribbon spine
float ribbonWave(float x, float freq, float speed, float phase) {
  return sin(x * freq + u_time * speed + phase) * 0.45 +
         cos(x * freq * 0.72 - u_time * speed * 0.6 + phase * 1.3) * 0.3 +
         sin(x * freq * 1.45 + u_time * speed * 0.35 + phase * 0.7) * 0.15;
}

// Derivative of the wave function for accurate normal calculation
float ribbonWaveDeriv(float x, float freq, float speed, float phase) {
  return (cos(x * freq + u_time * speed + phase) * 0.45 * freq -
          sin(x * freq * 0.72 - u_time * speed * 0.6 + phase * 1.3) * 0.3 * (freq * 0.72) +
          cos(x * freq * 1.45 + u_time * speed * 0.35 + phase * 0.7) * 0.15 * (freq * 1.45));
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);
  
  // Subtle interactive parallax offset from mouse
  uv += (u_mouse - 0.5) * 0.08;

  // Diagonal orientation matching reference video (-35 degrees)
  vec2 p = rot(-0.58) * uv;

  // Deep black background (#000000)
  vec3 finalColor = vec3(0.0, 0.0, 0.0);
  float accumulatedAlpha = 0.0;

  // Palette definitions:
  // Dark metallic gold: #6B4E00 -> vec3(0.42, 0.31, 0.0)
  // Primary gold:       #D4AF37 -> vec3(0.83, 0.69, 0.22)
  // Neon gold:          #FFD700 -> vec3(1.00, 0.84, 0.00)
  // Bright reflection:  #FFF4B0 -> vec3(1.00, 0.96, 0.69)
  vec3 cDeepDarkGold = vec3(0.12, 0.08, 0.01);
  vec3 cDarkGold     = vec3(0.42, 0.31, 0.02);
  vec3 cPrimaryGold  = vec3(0.83, 0.69, 0.22);
  vec3 cNeonGold     = vec3(1.00, 0.84, 0.00);
  vec3 cBrightGold   = vec3(1.00, 0.96, 0.69);

  // Key directional light vector (above and in front)
  vec3 L1 = normalize(vec3(0.6, 0.8, 0.75));
  // Secondary fill light
  vec3 L2 = normalize(vec3(-0.5, -0.6, 0.5));
  // View direction straight down z
  vec3 V = vec3(0.0, 0.0, 1.0);

  // Render 6 flowing metallic ribbon sheets from back to front
  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    
    // Ribbon configuration
    float baseOffset = -0.55 + fi * 0.24;
    float freq       = 1.1 + fi * 0.16;
    float speed      = 0.42 + fi * 0.08;
    float phase      = fi * 1.57;
    float halfWidth  = 0.18 + fi * 0.035;

    // Amplitude increases gently for foreground layers
    float amp = 0.36 + fi * 0.05;

    // Center spine height and derivative
    float y0 = baseOffset + ribbonWave(p.x, freq, speed, phase) * amp;
    float dy = ribbonWaveDeriv(p.x, freq, speed, phase) * amp;

    // Distance from ribbon spine
    float dist = p.y - y0;
    float normDist = dist / halfWidth;

    if (abs(normDist) < 1.15) {
      // Smooth edge antialiasing mask
      float mask = 1.0 - smoothstep(0.92, 1.05, abs(normDist));

      // 3D curved surface profile: parabolic arch with rounded edges
      float h = max(0.0, 1.0 - normDist * normDist);
      float dh = -2.0 * normDist;

      // 3D Surface normal vector on the metallic sheet
      vec3 N = normalize(vec3(-dy * h, -dh, 1.25));

      // Diffuse lighting
      float diff1 = max(dot(N, L1), 0.0);
      float diff2 = max(dot(N, L2), 0.0);

      // Specular highlight: glossy polished metal sheen
      vec3 H1 = normalize(L1 + V);
      float specBroad = pow(max(dot(N, H1), 0.0), 18.0);
      float specSharp = pow(max(dot(N, H1), 0.0), 80.0);
      float specGlitter = pow(max(dot(N, H1), 0.0), 220.0);

      // Travelling light glint along the crest of the curve
      float waveCrest = sin(p.x * 2.5 - u_time * 1.2 + phase * 2.0) * 0.5 + 0.5;
      float crestGlint = pow(waveCrest, 8.0) * pow(max(dot(N, V), 0.0), 12.0) * 0.8;

      // Fresnel edge lighting: glowing neon gold rim
      float fresnel = pow(1.0 - max(dot(N, V), 0.0), 2.8);
      float edgeNeon = smoothstep(0.75, 1.0, abs(normDist)) * 1.4;

      // Metallic color composition
      vec3 ribbonColor = mix(cDeepDarkGold, cDarkGold, diff1 * 0.7 + diff2 * 0.3);
      ribbonColor = mix(ribbonColor, cPrimaryGold, smoothstep(0.2, 0.8, diff1));
      ribbonColor = mix(ribbonColor, cNeonGold, (fresnel * 0.8 + edgeNeon * 0.6));
      
      // Add specular reflections and bright specular hot spots
      ribbonColor += cBrightGold * (specBroad * 0.45 + specSharp * 0.75 + specGlitter * 1.1 + crestGlint);

      // Subtle metallic ambient occlusion towards ribbon edges
      float ao = smoothstep(0.0, 0.4, h);
      ribbonColor *= (0.35 + 0.65 * ao);

      // Layer alpha blending with soft drop shadow on underlying ribbons
      float layerAlpha = mask * (0.85 + 0.15 * h);
      
      // Shadow cast onto ribbons underneath
      finalColor = mix(finalColor, finalColor * 0.25, smoothstep(0.0, 0.2, mask));
      
      // Blend current ribbon over previous layers
      finalColor = mix(finalColor, ribbonColor, layerAlpha);
      accumulatedAlpha = max(accumulatedAlpha, layerAlpha);
    }
  }

  // Subtle ambient gold bloom
  float centerDist = length(uv);
  vec3 ambientBloom = cNeonGold * 0.04 * (1.0 - smoothstep(0.0, 1.2, centerDist));
  finalColor += ambientBloom;

  // Dark vignette in the center and edges to ensure absolute text contrast
  float vignette = smoothstep(1.3, 0.2, centerDist);
  finalColor *= mix(0.72, 1.0, vignette);

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

interface CinematicGoldBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export default function CinematicGoldBackground({
  className = "",
  children,
}: CinematicGoldBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use WebGL or experimental WebGL
    const gl =
      canvas.getContext("webgl", {
        alpha: false,
        antialias: true,
        powerPreference: "high-performance",
      }) || (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) {
      console.warn("[CinematicGoldBackground] WebGL not supported, falling back to CSS.");
      return;
    }

    // Compile helper
    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("[Shader error]", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    const fragShader = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);

    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("[Program error]", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Quad geometry: full screen coverage
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
      ]),
      gl.STATIC_DRAW
    );

    const aPosition = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uMouse = gl.getUniformLocation(program, "u_mouse");

    let mouseX = 0.5;
    let mouseY = 0.5;
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX / window.innerWidth;
      targetMouseY = 1.0 - e.clientY / window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Responsive Canvas Resize
    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.floor(rect.width * dpr);
      const height = Math.floor(rect.height * dpr);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    // Visibility Observer to pause rendering when scrolled out of view
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Animation Loop
    let animationFrameId: number;
    const startTime = performance.now();

    const render = (time: number) => {
      if (isVisible) {
        // Smooth mouse lerping
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;

        const elapsedTime = (time - startTime) * 0.001;

        gl.uniform2f(uResolution, canvas.width, canvas.height);
        gl.uniform1f(uTime, elapsedTime);
        gl.uniform2f(uMouse, mouseX, mouseY);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();

      if (program) {
        gl.deleteProgram(program);
      }
      if (vertShader) gl.deleteShader(vertShader);
      if (fragShader) gl.deleteShader(fragShader);
      if (positionBuffer) gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden pointer-events-none ${className ? className : "absolute inset-0 w-full h-full"}`}
    >
      {/* 3D WebGL Metallic Ribbons Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none block z-0"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />

      {/* Atmospheric dark gradient overlay for crystal-clear readability */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 70%, #000000 100%)",
        }}
      />

      {/* Foreground Content */}
      {children && <div className="relative z-10 w-full">{children}</div>}
    </div>
  );
}
