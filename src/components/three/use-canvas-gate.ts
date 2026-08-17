"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Decides whether a WebGL canvas may exist at all, and whether it should be
 * drawing right now.
 *
 * - `mounted` gates the dynamic import. Three.js never enters the initial
 *   bundle and never loads on narrow screens or under reduced motion.
 * - `active` drives the frameloop, so an offscreen or background-tab canvas
 *   costs nothing.
 *
 * Once mounted it stays mounted. Tearing down a WebGL context to rebuild it on
 * the next scroll is more expensive than parking the frameloop.
 */
export function useCanvasGate<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [eligible, setEligible] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  // One query covers both rules from the performance budget: skip WebGL below
  // 768px, and skip it whenever the user asked for less motion.
  useEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
    );
    const sync = () => setEligible(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !eligible) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        // Latch on the first intersection. The scene chunk is fetched once.
        if (entry.isIntersecting) setMounted(true);
      },
      { rootMargin: "250px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [eligible]);

  useEffect(() => {
    const sync = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  return {
    ref,
    mounted: mounted && eligible,
    active: eligible && inView && pageVisible,
  };
}
