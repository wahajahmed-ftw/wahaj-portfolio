"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Pointer-following tilt, a few degrees at most. Direct manipulation feel:
 * tracks while the pointer moves, settles home when it leaves. Transform
 * only, rAF-throttled, skipped for touch and reduced motion.
 *
 * Also stamps data-off on the wrapper while it is outside the viewport;
 * globals.css pauses every animation loop inside the figure off that
 * attribute, so a scrolled-past hero costs a weak machine nothing.
 */
export function Tilt({ children, className, max = 4 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.removeAttribute("data-off");
      else el.setAttribute("data-off", "");
    });
    io.observe(el);

    let unbind: (() => void) | undefined;
    if (window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) {
      let frame = 0;
      let nx = 0;
      let ny = 0;

      const apply = () => {
        frame = 0;
        el.style.transform = `perspective(1100px) rotateX(${(-ny * max).toFixed(2)}deg) rotateY(${(nx * max).toFixed(2)}deg)`;
      };
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        nx = ((e.clientX - r.left) / r.width) * 2 - 1;
        ny = ((e.clientY - r.top) / r.height) * 2 - 1;
        if (!frame) frame = requestAnimationFrame(apply);
      };
      const leave = () => {
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
        el.style.transform = "";
      };

      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      unbind = () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
        if (frame) cancelAnimationFrame(frame);
      };
    }

    return () => {
      io.disconnect();
      unbind?.();
    };
  }, [max]);

  return (
    <div ref={ref} className={className} style={{ transition: "transform 0.25s cubic-bezier(0.19, 1, 0.22, 1)" }}>
      {children}
    </div>
  );
}
