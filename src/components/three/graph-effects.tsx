"use client";

import {
  EffectComposer,
  N8AO,
  Outline,
  ToneMapping,
} from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";

/**
 * Same deferral as the hero. The outline pass is what makes a hovered node
 * highlight, so it matters, but not before the graph is on screen.
 */
export function GraphEffects() {
  return (
    <EffectComposer enableNormalPass={false} multisampling={0} autoClear={false}>
      <N8AO
        aoRadius={0.5}
        distanceFalloff={0.8}
        intensity={1.8}
        quality="performance"
        halfRes
      />
      <Outline
        visibleEdgeColor={0xededee}
        hiddenEdgeColor={0x4a4a4c}
        edgeStrength={7}
        blur
        width={1000}
      />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}
