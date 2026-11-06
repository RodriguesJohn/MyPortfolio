import { useEffect, type RefObject } from "react";
import Lenis from "lenis";

/** Same feel as omnagarkar.com: 0.85s settle on an expo-out curve. */
const LENIS_OPTIONS = {
  duration: 0.85,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
} as const;

/**
 * Smooth wheel scrolling for the v2 homepage.
 * Desktop (lg+): the feed column is its own scroller, so Lenis drives that element.
 * Below lg: the whole window scrolls, so Lenis drives the window.
 * Skipped entirely when the visitor prefers reduced motion.
 */
export const useSmoothScroll = (desktopScroller: RefObject<HTMLElement>) => {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1024px)");

    let lenis: Lenis | null = null;
    let frame = 0;

    const stop = () => {
      cancelAnimationFrame(frame);
      lenis?.destroy();
      lenis = null;
    };

    const start = () => {
      stop();
      if (reduceMotion.matches) return;

      const el = desktopScroller.current;
      lenis =
        desktop.matches && el
          ? new Lenis({ ...LENIS_OPTIONS, wrapper: el, content: el })
          : new Lenis({ ...LENIS_OPTIONS });

      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    };

    start();
    desktop.addEventListener("change", start);
    reduceMotion.addEventListener("change", start);

    return () => {
      desktop.removeEventListener("change", start);
      reduceMotion.removeEventListener("change", start);
      stop();
    };
  }, [desktopScroller]);
};
