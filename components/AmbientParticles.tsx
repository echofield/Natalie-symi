"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type Particle = {
  x: number;
  y: number;
  r: number;
  alpha: number;
  vx: number;
  vy: number;
};

export function AmbientParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles = Array.from({ length: 25 }, () => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        r: 1 + Math.random() * 1.6,
        alpha: 0.04 + Math.random() * 0.04,
        vx: -0.035 + Math.random() * 0.07,
        vy: -0.025 + Math.random() * 0.05,
      }));
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.fillStyle = "#B8956A";

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -8) p.x = rect.width + 8;
        if (p.x > rect.width + 8) p.x = -8;
        if (p.y < -8) p.y = rect.height + 8;
        if (p.y > rect.height + 8) p.y = -8;

        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
    };

    resize();
    const ticker = () => draw();
    gsap.ticker.add(ticker);
    window.addEventListener("resize", resize);

    return () => {
      gsap.ticker.remove(ticker);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="ambient-canvas" aria-hidden="true" />;
}
