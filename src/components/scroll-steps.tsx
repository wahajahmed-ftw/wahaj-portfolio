"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Step = { title: string; body: ReactNode };

/**
 * Sticky figure on the left, story steps on the right. The only job of this
 * client component is to stamp the active step index on the wrapper; every
 * visual change is CSS reacting to [data-step].
 *
 * Desktop (lg+): scroll drives the step, via an IntersectionObserver band
 * around the viewport centre. Below lg the figure is not sticky and scroll
 * runway would just be empty space, so the scene plays itself: a timer
 * loops the steps while the scene is on screen. Reduced motion parks the
 * figure on the final, fully-revealed state instead of cycling.
 */
export function ScrollSteps({
  sceneClass,
  figure,
  steps,
  tone = "paper",
}: {
  sceneClass: string;
  figure: ReactNode;
  steps: Step[];
  tone?: "paper" | "band";
}) {
  const [step, setStep] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const count = steps.length;

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let io: IntersectionObserver | null = null;
    let vis: IntersectionObserver | null = null;
    let timer: number | null = null;

    const stop = () => {
      io?.disconnect();
      vis?.disconnect();
      if (timer !== null) clearInterval(timer);
      io = vis = null;
      timer = null;
    };

    const start = () => {
      stop();
      if (desktop.matches) {
        io = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) {
                setStep(Number((entry.target as HTMLElement).dataset.i));
              }
            }
          },
          // A band around the viewport's vertical centre decides the step.
          { rootMargin: "-42% 0px -42% 0px" },
        );
        for (const el of refs.current) if (el) io.observe(el);
      } else if (reduced.matches) {
        vis = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            setStep(count - 1);
            vis?.disconnect();
          }
        });
        if (rootRef.current) vis.observe(rootRef.current);
      } else {
        vis = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && timer === null) {
              timer = window.setInterval(() => setStep((s) => (s + 1) % count), 3000);
            } else if (!entry.isIntersecting && timer !== null) {
              clearInterval(timer);
              timer = null;
            }
          },
          { threshold: 0.15 },
        );
        if (rootRef.current) vis.observe(rootRef.current);
      }
    };

    start();
    desktop.addEventListener("change", start);
    return () => {
      stop();
      desktop.removeEventListener("change", start);
    };
  }, [count]);

  return (
    <div ref={rootRef} className={sceneClass} data-step={step}>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="lg:sticky lg:top-24 lg:self-start">{figure}</div>
        <div>
          {steps.map((s, i) => (
            <div
              key={i}
              data-i={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="flex flex-col justify-center py-5 lg:min-h-[54vh] lg:py-6"
            >
              <h3 className={`text-sub max-w-[24ch] ${tone === "band" ? "text-paper" : "text-ink"}`}>{s.title}</h3>
              <div className={`mt-3 grid max-w-[52ch] gap-4 text-body ${tone === "band" ? "text-bandmuted" : "text-muted"}`}>
                {s.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
