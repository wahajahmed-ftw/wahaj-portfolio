"use client";

import { Suspense, lazy, useMemo, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei/core/AdaptiveDpr";
import { ContactShadows } from "@react-three/drei/core/ContactShadows";
import { PerformanceMonitor } from "@react-three/drei/core/PerformanceMonitor";
import { PresentationControls } from "@react-three/drei/web/PresentationControls";
import type { DirectionalLight, Mesh } from "three";
import { Lattice } from "./lattice";
import { RoomEnv } from "./room-env";

// Second deferral: the composer chunk loads only once the base scene is live.
const HeroEffects = lazy(() =>
  import("./hero-effects").then((m) => ({ default: m.HeroEffects })),
);

/** Half-extents of the lattice: it is taller than it is wide. */
const HALF_W = 1.55;
const HALF_H = 1.7;

/**
 * Right-aligns the lattice against the frame with a real margin and scales
 * it to fit, so it never crops at narrow aspect ratios and never crowds the
 * lower-left type. The offset lives outside PresentationControls so dragging
 * spins the object about its own centre rather than swinging it around the
 * world origin.
 */
function Framed({ bezelRef }: { bezelRef: (mesh: Mesh | null) => void }) {
  const viewport = useThree((s) => s.viewport);

  const { scale, position } = useMemo(() => {
    // Fit both axes: capped at 44% of the width so the headline keeps its
    // half, and at 64% of the height so it clears the nav and the CTAs.
    const s = Math.min(
      1,
      (viewport.width * 0.44) / (HALF_W * 2),
      (viewport.height * 0.64) / (HALF_H * 2),
    );
    return {
      scale: s,
      position: [
        viewport.width / 2 - HALF_W * s - 0.4,
        viewport.height * 0.02,
        0,
      ] as [number, number, number],
    };
  }, [viewport.width, viewport.height]);

  return (
    <group position={position} scale={scale}>
      <PresentationControls
        cursor
        snap
        speed={1.1}
        damping={0.18}
        polar={[-0.45, 0.45]}
        azimuth={[-0.7, 0.7]}
      >
        <Lattice ref={bezelRef} />
      </PresentationControls>

      <ContactShadows
        position={[0, -2.05, 0]}
        scale={5.5}
        blur={2.8}
        far={2.4}
        opacity={0.6}
        resolution={512}
        color="#000000"
        frames={Infinity}
      />
    </group>
  );
}

export function HeroScene({
  active,
  onFirstDrag,
}: {
  active: boolean;
  onFirstDrag: () => void;
}) {
  // Callback refs rather than useRef: the composer mounts only once the bezel
  // and both lights exist, so the bloom pass is never handed a null.
  const [bezel, setBezel] = useState<Mesh | null>(null);
  const [rim, setRim] = useState<DirectionalLight | null>(null);
  const [key, setKey] = useState<DirectionalLight | null>(null);
  const [effects, setEffects] = useState(true);

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 30, position: [0, 0, 5.2], near: 0.1, far: 40 }}
      onPointerDown={onFirstDrag}
    >
      {/* A weak GPU drops the effects stack rather than the frame rate. */}
      <PerformanceMonitor
        onDecline={() => setEffects(false)}
        onIncline={() => setEffects(true)}
      />
      <AdaptiveDpr />

      <RoomEnv intensity={0.85} />
      {/* Rim carries the edge highlight, key is deliberately weaker. */}
      <directionalLight ref={setRim} position={[-4.5, 1.6, -3.2]} intensity={3.4} />
      <directionalLight ref={setKey} position={[3.2, 4, 5]} intensity={1.1} />

      <Framed bezelRef={setBezel} />

      {bezel && rim && key && effects && (
        <Suspense fallback={null}>
          <HeroEffects bezel={bezel} lights={[rim, key]} />
        </Suspense>
      )}
    </Canvas>
  );
}
