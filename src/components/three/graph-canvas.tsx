"use client";

import dynamic from "next/dynamic";
import { ArchitectureSvg } from "@/components/architecture-svg";
import { useCanvasGate } from "./use-canvas-gate";

const GraphScene = dynamic(() => import("./graph-scene").then((m) => m.GraphScene), {
  ssr: false,
});

export function GraphCanvas() {
  const { ref, mounted, active } = useCanvasGate<HTMLDivElement>();

  return (
    <div ref={ref} className="relative aspect-[16/9] w-full">
      {/* The flat diagram is the baseline, not a degraded state. It carries
          the same information and is what renders in a link preview. */}
      <ArchitectureSvg
        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${
          mounted ? "opacity-0" : "opacity-100"
        }`}
      />
      {mounted && (
        <div className="absolute inset-0">
          <GraphScene active={active} />
        </div>
      )}
    </div>
  );
}
