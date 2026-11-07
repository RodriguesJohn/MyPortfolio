import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  vy: number;
  drift: number;
  phase: number;
  speed: number;
  // Displacement from the cursor, eased towards its target (no spring).
  ox: number;
  oy: number;
};

const REPEL_RADIUS = 80;
const MAX_PUSH = 26;
// How quickly particles ease out of the cursor's way, and back again.
const EASE_OUT = 5;
const EASE_BACK = 2.2;

/**
 * Fine dust motes drifting up through the side panel's gradient. They part
 * around the cursor and drift back. Plain 2D canvas, sized to its parent.
 * Respects reduced motion (one still frame) and pauses while the tab is hidden.
 */
const PanelParticles = ({ count = 160 }: { count?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frame = 0;
    let last = performance.now();
    // Cursor position in canvas space; null when it's away.
    let mouse: { x: number; y: number } | null = null;

    const spawn = (anywhere: boolean): Particle => ({
      x: Math.random() * width,
      y: anywhere ? Math.random() * height : height + 4,
      r: 0.6 + Math.random() * 1.0,
      vy: 6 + Math.random() * 14,
      drift: 4 + Math.random() * 10,
      phase: Math.random() * Math.PI * 2,
      speed: 0.6 + Math.random() * 1.2,
      ox: 0,
      oy: 0,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: count }, () => spawn(true));
    };

    const draw = (time: number) => {
      const dt = Math.min((time - last) / 1000, 0.05);
      last = time;
      ctx.clearRect(0, 0, width, height);
      ctx.shadowColor = "rgba(255, 255, 255, 1)";

      for (const p of particles) {
        if (!reduceMotion) {
          p.y -= p.vy * dt;
          p.phase += p.speed * dt;
          if (p.y < -4) Object.assign(p, spawn(false));

          // Ease away from the cursor and drift back, without overshoot.
          // Distance uses the un-pushed position so the target doesn't jitter.
          let tx = 0;
          let ty = 0;
          if (mouse) {
            const dx = p.x + Math.sin(p.phase) * p.drift - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < REPEL_RADIUS && dist > 0.01) {
              const t = 1 - dist / REPEL_RADIUS;
              const push = t * t * (3 - 2 * t) * MAX_PUSH; // smoothstep falloff
              tx = (dx / dist) * push;
              ty = (dy / dist) * push;
            }
          }
          const pushing = tx !== 0 || ty !== 0;
          const k = 1 - Math.exp(-dt * (pushing ? EASE_OUT : EASE_BACK));
          p.ox += (tx - p.ox) * k;
          p.oy += (ty - p.oy) * k;
        }

        const x = p.x + Math.sin(p.phase) * p.drift + p.ox;
        const y = p.y + p.oy;
        // Fade in from the bottom edge, out towards the top of the gradient.
        const life = Math.max(0, Math.min(1, p.y / height));
        const twinkle = 0.55 + 0.45 * Math.sin(p.phase * 2.3);
        const alpha = Math.min(1, life * 1.4) * Math.min(1, (1 - life) * 6) * twinkle;

        ctx.beginPath();
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.shadowBlur = 3 + p.r * 4;
        ctx.fill();
      }

      if (!reduceMotion) frame = requestAnimationFrame(draw);
    };

    // The canvas sits under pointer-events-none layers, so track the window.
    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const pad = REPEL_RADIUS;
      mouse =
        x > -pad && x < rect.width + pad && y > -pad && y < rect.height + pad
          ? { x, y }
          : null;
    };
    const onPointerLeave = () => {
      mouse = null;
    };

    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden && !reduceMotion) {
        last = performance.now();
        frame = requestAnimationFrame(draw);
      }
    };

    resize();
    frame = requestAnimationFrame(draw);
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    document.addEventListener("visibilitychange", onVisibility);
    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [count]);

  return <canvas ref={canvasRef} className="absolute inset-0 size-full" aria-hidden="true" />;
};

export default PanelParticles;
