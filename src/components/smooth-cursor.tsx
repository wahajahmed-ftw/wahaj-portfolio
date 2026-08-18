"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Spring-driven cursor: the arrow chases the pointer and rotates to face its
 * direction of travel. Same physics as the framer-motion smooth-cursor
 * components (stiffness 400 / damping 45), integrated by hand so the site
 * keeps shipping zero animation libraries. Renders nothing for touch, coarse
 * pointers, or reduced motion. Over anything interactive the arrow bows out
 * and the native cursor returns.
 */
export function SmoothCursor() {
  const [enabled, setEnabled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (hover: hover)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduced.matches);
    update();
    fine.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;

    // Position, rotation and scale each run their own spring, integrated in
    // one rAF loop that sleeps whenever everything has settled.
    let x = 0, y = 0, vx = 0, vy = 0, tx = 0, ty = 0;
    let rot = 0, rotV = 0, rotT = 0, lastAngle = 0;
    let sc = 1, scV = 0, scT = 1;
    let px = 0, py = 0, pt = 0;
    let raf = 0, lastT = 0, idle = 0, seen = false, over = false;

    const paint = () => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${rot}deg) scale(${sc})`;
    };

    const step = (k: number, c: number, p: number, v: number, t: number, dt: number): [number, number] => {
      v += (-k * (p - t) - c * v) * dt;
      return [p + v * dt, v];
    };

    const tick = (t: number) => {
      const dt = Math.min((t - lastT) / 1000, 1 / 30) || 1 / 60;
      lastT = t;
      [x, vx] = step(400, 45, x, vx, tx, dt);
      [y, vy] = step(400, 45, y, vy, ty, dt);
      [rot, rotV] = step(300, 60, rot, rotV, rotT, dt);
      [sc, scV] = step(500, 35, sc, scV, scT, dt);
      paint();
      const settled =
        Math.abs(x - tx) < 0.05 && Math.abs(y - ty) < 0.05 &&
        Math.abs(rot - rotT) < 0.05 && Math.abs(sc - scT) < 0.001 &&
        Math.abs(vx) + Math.abs(vy) + Math.abs(rotV) < 0.1;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!raf) {
        lastT = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      tx = e.clientX;
      ty = e.clientY;
      if (!seen) {
        // First sighting: appear in place instead of flying in from a corner.
        seen = true;
        x = tx; y = ty; px = tx; py = ty; pt = now;
        if (!over) el.style.opacity = "1";
        paint();
        return;
      }
      const dtms = now - pt;
      if (dtms > 0) {
        const mvx = (tx - px) / dtms;
        const mvy = (ty - py) / dtms;
        if (Math.hypot(mvx, mvy) > 0.1) {
          const angle = (Math.atan2(mvy, mvx) * 180) / Math.PI + 90;
          let d = angle - lastAngle;
          if (d > 180) d -= 360;
          if (d < -180) d += 360;
          rotT += d;
          lastAngle = angle;
          scT = 0.95;
          window.clearTimeout(idle);
          idle = window.setTimeout(() => {
            scT = 1;
            wake();
          }, 150);
        }
        px = tx; py = ty; pt = now;
      }
      if (!over) el.style.opacity = "1";
      wake();
    };

    const INTERACTIVE = "a, button, input, textarea, select, [role='button']";
    const onOver = (e: Event) => {
      const hit = e.target instanceof Element && Boolean(e.target.closest(INTERACTIVE));
      if (hit !== over) {
        over = hit;
        document.documentElement.style.cursor = over ? "" : "none";
        el.style.opacity = over ? "0" : "1";
      }
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    document.documentElement.style.cursor = "none";
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, true);
    window.addEventListener("focusin", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver, true);
      window.removeEventListener("focusin", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.style.cursor = "";
      window.clearTimeout(idle);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      data-smooth-cursor
      className="pointer-events-none fixed top-0 left-0 z-[90] opacity-0 transition-opacity duration-200 will-change-transform"
    >
      <svg
        width="25"
        height="27"
        viewBox="0 0 50 54"
        fill="none"
        style={{ filter: "drop-shadow(0 2px 2px rgba(10, 12, 16, 0.18))" }}
      >
        <path
          d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
          fill="var(--color-ink)"
        />
        <path
          d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
          stroke="var(--color-paper)"
          strokeWidth="2.25825"
        />
      </svg>
    </div>
  );
}
