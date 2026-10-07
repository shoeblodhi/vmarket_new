"use client";

import { useEffect, useRef } from "react";

/**
 * Generative ink drawing for the hero.
 *
 * Particles trace a slowly-rotating flow field, leaving fine ink strokes —
 * closer to a pen-plotter contour drawing than to a glowing shader. Canvas 2D
 * rather than WebGL: the aesthetic wants hairlines and paper, and 2D keeps
 * the whole thing under a few KB with no GPU dependency.
 *
 * Fails soft: no canvas support, or reduced motion, leaves the paper blank
 * and the layout unchanged. Pauses off-screen and on hidden tabs.
 */
export function InkField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;

    type Particle = { x: number; y: number; life: number; span: number };
    let particles: Particle[] = [];

    // Cheap value-noise field. Two octaves is plenty — the drawing reads as
    // contours, and more octaves just costs frames.
    const hash = (x: number, y: number) => {
      const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
      return n - Math.floor(n);
    };
    const smooth = (t: number) => t * t * (3 - 2 * t);
    const noise = (x: number, y: number) => {
      const xi = Math.floor(x);
      const yi = Math.floor(y);
      const xf = smooth(x - xi);
      const yf = smooth(y - yi);
      const a = hash(xi, yi);
      const b = hash(xi + 1, yi);
      const c = hash(xi, yi + 1);
      const d = hash(xi + 1, yi + 1);
      return (a + (b - a) * xf) * (1 - yf) + (c + (d - c) * xf) * yf;
    };

    const angleAt = (x: number, y: number, t: number) => {
      const scale = 0.0016;
      const n =
        noise(x * scale, y * scale + t) * 0.7 +
        noise(x * scale * 2.4, y * scale * 2.4 - t * 0.6) * 0.3;
      return n * Math.PI * 3.2;
    };

    const seed = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      life: 0,
      span: 120 + Math.random() * 220,
    });

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      // Ignore degenerate reads. Layout can briefly report a zero dimension
      // (percentage-width host before its containing block resolves), and
      // committing that to the backing store leaves a canvas that can never
      // draw again — nothing would clear a 0-wide buffer afterwards.
      if (w < 1 || h < 1) return false;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = w;
      height = h;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Density scales with area so a phone doesn't draw a desktop's worth.
      const count = Math.round(Math.min(300, (width * height) / 3600));
      particles = Array.from({ length: count }, seed);
      return true;
    };

    let frame = 0;
    let running = false;
    let visible = true;
    let sized = false;
    let time = 0;

    const step = () => {
      time += 0.0009;

      // Gentle fade instead of a hard clear: strokes accumulate into
      // contours, then recede, so the drawing keeps redrawing itself.
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.020)";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";

      ctx.lineWidth = 0.55;
      ctx.strokeStyle = "rgba(26, 101, 143, 0.17)";
      ctx.beginPath();

      for (const p of particles) {
        const angle = angleAt(p.x, p.y, time);
        const nx = p.x + Math.cos(angle) * 1.25;
        const ny = p.y + Math.sin(angle) * 1.25;

        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nx, ny);

        p.x = nx;
        p.y = ny;
        p.life += 1;

        if (p.life > p.span || p.x < -20 || p.x > width + 20 || p.y < -20 || p.y > height + 20) {
          Object.assign(p, seed());
        }
      }

      ctx.stroke();
    };

    const loop = () => {
      step();
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      // A zero-size measure at mount would otherwise animate an empty buffer
      // forever; retry sizing until layout gives real numbers.
      if (!sized) sized = resize();
      if (!sized || running || reduceMotion || !visible) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    sized = resize();

    if (reduceMotion) {
      // Draw a settled composition once, with no animation.
      if (sized) for (let i = 0; i < 240; i++) step();
    } else {
      start();
    }

    const resizeObserver = new ResizeObserver(() => {
      const ok = resize();
      if (ok) {
        sized = true;
        if (reduceMotion) for (let i = 0; i < 240; i++) step();
        else start();
      }
    });
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="size-full" />;
}
