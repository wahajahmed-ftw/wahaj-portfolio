"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { lenisStore } from "@/lib/lenis-store";
import { scroll } from "@/lib/scroll-progress";

/**
 * Lenis eases native scroll rather than replacing it, so the scrollbar,
 * keyboard, and find-in-page keep working. `anchors` intercepts #-links, so
 * Work / Stack / About glide instead of jumping; the offset clears the fixed
 * nav. Disabled outright under prefers-reduced-motion, where the browser's
 * own instant behavior is the correct one.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => 1 - Math.pow(1 - t, 3.2),
      touchMultiplier: 1.6,
      anchors: { offset: -76 },
    });
    lenisStore.lenis = lenis;

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
      lenisStore.lenis = null;
    };
  }, []);

  return null;
}
