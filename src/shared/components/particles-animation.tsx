"use client";
import React from "react";
import { themeMode, useTheme } from "../theme/provider";

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
}

interface ParticleAnimationProps {
  lineCount?: number;
  color?: string;
}

const ParticleAnimation = ({
  lineCount = 30,
  color
}: ParticleAnimationProps) => {
  const { theme } = useTheme();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const ctxRef: any = React.useRef<CanvasRenderingContext2D | null>(null);
  const particles: Particle[] = [];
  const FPS = process?.env?.NEXT_PUBLIC_PARTICLE_ANIMATION_FRAMES
    ? process?.env?.NEXT_PUBLIC_PARTICLE_ANIMATION_FRAMES
    : 10;
  const numParticles = lineCount;
  const mouse = { x: 0, y: 0 };

  React.useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    ctxRef.current = ctx;

    if (!canvas || !ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Push particles to array
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1 + 1,
        vx: Math.floor(Math.random() * 50) - 25,
        vy: Math.floor(Math.random() * 50) - 25
      });
    }

    const draw = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        ctx.fillStyle = color || theme === themeMode.Dark ? "white" : "black";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = color || theme === themeMode.Dark ? "white" : "black";
        ctx.stroke();
      }

      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        const particleI = particles[i];
        ctx.moveTo(particleI.x, particleI.y);
        if (distance(mouse, particleI) < 150) ctx.lineTo(mouse.x, mouse.y);
        for (let j = 0; j < particles.length; j++) {
          const particleII = particles[j];
          if (distance(particleI, particleII) < 150) {
            ctx.lineTo(particleII.x, particleII.y);
          }
        }
      }
      ctx.lineWidth = 0.05;
      ctx.strokeStyle = color || theme === themeMode.Dark ? "white" : "black";
      ctx.stroke();
    };

    const update = () => {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx / +FPS;
        p.y += p.vy / +FPS;

        if (p.x < 0 || p.x > canvas.width) p.vx = -p.vx;
        if (p.y < 0 || p.y > canvas.height) p.vy = -p.vy;
      }
    };

    const distance = (
      point1: { x: number; y: number },
      point2: { x: number; y: number }
    ) => {
      const xs = Math.pow(point2.x - point1.x, 2);
      const ys = Math.pow(point2.y - point1.y, 2);
      return Math.sqrt(xs + ys);
    };

    canvas.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    const tick = () => {
      draw();
      update();
      requestAnimationFrame(tick);
    };

    tick();

    return () => {
      canvas.removeEventListener("mousemove", () => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineCount, theme]);
  return (
    <canvas
      ref={canvasRef}
      style={{ overflow: "hidden", width: "100%", height: "100%" }}
    ></canvas>
  );
};

export default ParticleAnimation;
