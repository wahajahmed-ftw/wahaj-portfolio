"use client";

import { useEffect, useRef } from "react";

/**
 * Counts a numeral in when it enters the viewport. Server-rendered text is
 * the final value, so no JavaScript means no missing number, and the count
 * only replaces textContent (no re-renders).
 */
export function CountUp({
  to,
  from = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.3,
  className,
}: {
  to: number;
  from?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (n: number) => `${prefix}${n.toFixed(decimals)}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / (duration * 1000));
          const eased = 1 - Math.pow(1 - p, 4);
          el.textContent = fmt(from + (to - from) * eased);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to, from, decimals, prefix, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {fmt(to)}
    </span>
  );
}
