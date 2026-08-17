"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  AdaptiveDpr,
  ContactShadows,
  PerformanceMonitor,
  PresentationControls,
} from "@react-three/drei";
import {
  DepthOfField,
  EffectComposer,
  N8AO,
  SelectiveBloom,
  ToneMapping,
} from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import type { Mesh } from "three";
import { Instrument } from "./instrument";
import { RoomEnv } from "./room-env";

// Offset right of centre so the object never sits behind the lower-left type.
const ANCHOR: [number, number, number] = [1.15, 0.28, 0];

export function HeroScene({
  active,
  onFirstDrag,
}: {
  active: boolean;
  onFirstDrag: () => void;
}) {
  // Callback ref rather than useRef: the composer only mounts once the bezel
  // mesh actually exists, so the bloom selection is never handed a null.
  const [bezel, setBezel] = useState<Mesh | null>(null);
  const [effects, setEffects] = useState(true);

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 30, position: [0, 0, 5.2], near: 0.1, far: 40 }}
      onPointerDown={onFirstDrag}
    >
      <PerformanceMonitor
        onDecline={() => setEffects(false)}
        onIncline={() => setEffects(true)}
      />
      <AdaptiveDpr />

      <RoomEnv intensity={1.15} />
      {/* Rim carries the edge highlight, key is deliberately weaker. */}
      <directionalLight position={[-4.5, 1.6, -3.2]} intensity={3.4} />
      <directionalLight position={[3.2, 4, 5]} intensity={1.1} />

      <PresentationControls
        cursor
        snap
        speed={1.1}
        damping={0.18}
        polar={[-0.45, 0.45]}
        azimuth={[-0.7, 0.7]}
      >
        <group position={ANCHOR}>
          <Instrument ref={setBezel} />
        </group>
      </PresentationControls>

      <ContactShadows
        position={[ANCHOR[0], -1.28, 0]}
        scale={5.5}
        blur={2.8}
        far={2.4}
        opacity={0.6}
        resolution={512}
        color="#000000"
        frames={Infinity}
      />

      {bezel && effects && (
        <EffectComposer enableNormalPass={false} multisampling={0}>
          <N8AO
            aoRadius={0.65}
            distanceFalloff={0.8}
            intensity={2.4}
            quality="medium"
            halfRes
          />
          <SelectiveBloom
            selection={[bezel]}
            luminanceThreshold={0.5}
            luminanceSmoothing={0.3}
            intensity={0.85}
            radius={0.7}
            mipmapBlur
          />
          <DepthOfField
            target={ANCHOR}
            focalLength={0.012}
            bokehScale={2.4}
            height={480}
          />
          <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
