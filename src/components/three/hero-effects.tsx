"use client";

import {
  DepthOfField,
  EffectComposer,
  N8AO,
  SelectiveBloom,
  ToneMapping,
} from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import type { DirectionalLight, Mesh } from "three";

/**
 * Post-processing lives in its own chunk, loaded after the base scene is
 * already drawing. N8AO and the composer are the most expensive things to
 * compile in the whole 3D payload, and the instrument reads perfectly well for
 * the moment before they land.
 */
export function HeroEffects({
  bezel,
  lights,
}: {
  bezel: Mesh;
  lights: DirectionalLight[];
}) {
  return (
    <EffectComposer enableNormalPass={false} multisampling={0}>
      <N8AO
        aoRadius={0.65}
        distanceFalloff={0.8}
        intensity={2.4}
        quality="medium"
        halfRes
      />
      {/* Scoped to the polished bezel. Never a global bloom on the frame.
          SelectiveBloom needs the lights that illuminate the selection. */}
      <SelectiveBloom
        selection={[bezel]}
        lights={lights}
        luminanceThreshold={0.55}
        luminanceSmoothing={0.3}
        intensity={0.8}
        radius={0.7}
        mipmapBlur
      />
      {/* The instrument sits on the z=0 plane, so focusing the origin focuses
          the bezel. Shallow range, gentle bokeh. */}
      <DepthOfField
        target={[0, 0, 0]}
        focalLength={0.02}
        bokehScale={1.8}
        height={480}
      />
      {/* The composer forces NoToneMapping on the renderer, so ACES is applied
          here rather than through gl.toneMapping. */}
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}
