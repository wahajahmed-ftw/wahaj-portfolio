"use client";

import { useEffect } from "react";
import { useStore } from "@react-three/fiber";
import { PMREMGenerator } from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

/**
 * Image-based lighting with zero asset payload. RoomEnvironment is procedural
 * geometry, so the chrome gets something real to reflect without shipping an
 * HDRI file.
 *
 * `intensity` stands in for renderer exposure: the post-processing composer
 * forces NoToneMapping on the renderer and applies ACES itself, so
 * `toneMappingExposure` is no longer read.
 */
export function RoomEnv({ intensity = 1.15 }: { intensity?: number }) {
  // Reading through the store rather than a selector keeps the mutation of
  // scene.environment out of React's render path entirely.
  const store = useStore();

  useEffect(() => {
    const { gl, scene } = store.getState();
    const pmrem = new PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const target = pmrem.fromScene(room, 0.04);

    scene.environment = target.texture;
    scene.environmentIntensity = intensity;

    return () => {
      scene.environment = null;
      target.dispose();
      pmrem.dispose();
      room.dispose();
    };
  }, [store, intensity]);

  return null;
}
