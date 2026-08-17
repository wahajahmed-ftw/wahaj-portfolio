"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { scroll } from "@/lib/scroll-progress";

/**
 * Lenis eases native scroll rather than replacing it, so the scrollbar,
 * keyboard, anchor links and find-in-page all keep working. Disabled outright
 * under prefers-reduced-motion, where the browser's own scrolling is correct.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      // Long tail ease-out. No bounce.
      easing: (t: number) => 1 - Math.pow(1 - t, 3.2),
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ({ progress, velocity }: { progress: number; velocity: number }) => {
      scroll.progress = progress;
      scroll.velocity = velocity;
    });

    let frame = requestAnimationFrame(function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
