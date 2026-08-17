"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Step = { title: string; body: ReactNode };

/**
 * Sticky figure on the left, story steps on the right. The only job of this
 * client component is to observe which step is centered and stamp its index
 * on the wrapper; every visual change is CSS reacting to [data-step].
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

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setStep(Number((entry.target as HTMLElement).dataset.i));
          }
        }
      },
      // A band around the viewport's vertical centre decides the active step.
      { rootMargin: "-42% 0px -42% 0px" },
    );
    for (const el of refs.current) if (el) io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className={sceneClass} data-step={step}>
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
              className="flex min-h-[46vh] flex-col justify-center py-6 lg:min-h-[54vh]"
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
