"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { InstrumentSvg } from "@/components/instrument-svg";
import { useCanvasGate } from "./use-canvas-gate";

// Three.js is roughly 170KB gzipped. ssr:false plus a gate on
// IntersectionObserver keeps every byte of it out of the initial bundle and
// out of the LCP path.
const HeroScene = dynamic(() => import("./hero-scene").then((m) => m.HeroScene), {
  ssr: false,
});

export function HeroCanvas() {
  const { ref, mounted, active } = useCanvasGate<HTMLDivElement>();
  const [dragged, setDragged] = useState(false);

  return (
    <div ref={ref} className="absolute inset-0" aria-hidden="true">
      {/* Flat fallback. Also what stands in for the first frame while the
          scene chunk is still arriving. */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 md:justify-end md:pr-[8vw] ${
          mounted ? "opacity-0" : "opacity-100"
        }`}
      >
        <InstrumentSvg className="h-[min(58vh,26rem)] w-auto opacity-70" />
      </div>

      {mounted && <HeroScene active={active} onFirstDrag={() => setDragged(true)} />}

      <div className="vignette pointer-events-none absolute inset-0" />

      {/* Real affordance, not decoration: dragging a 3D object is not
          discoverable. Fades permanently on the first pointerdown. */}
      {mounted && (
        <span
          className={`pointer-events-none absolute right-[8vw] bottom-[12vh] font-mono text-small text-muted transition-opacity duration-500 ${
            dragged ? "opacity-0" : "opacity-100"
          }`}
        >
          drag to rotate
        </span>
      )}
    </div>
  );
}
