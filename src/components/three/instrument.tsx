"use client";

import { forwardRef, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group, Mesh } from "three";

/**
 * Stacked primitives that read as a machined precision instrument. All
 * procedural: no GLTF, no textures, no models, zero asset payload.
 */

// The dial faces +Z after a quarter turn. TILT then drops the top away from
// the camera for a product-photography three-quarter view.
const TILT = 0.62;

// 12 index marks on a radius-0.74 circle, every third one longer.
const MARKS = Array.from({ length: 12 }, (_, i) => {
  const theta = (i / 12) * Math.PI * 2;
  const major = i % 3 === 0;
  return {
    theta,
    length: major ? 0.14 : 0.075,
    width: major ? 0.019 : 0.012,
  };
});

const FACE_TOP = 0.115;

type InstrumentProps = {
  /** Radians per second of idle drift around the dial axis. */
  idleSpeed?: number;
};

/**
 * Ref resolves to the polished bezel, which is the only object handed to the
 * selective bloom pass. Bloom belongs on the chrome, not on the frame.
 */
export const Instrument = forwardRef<Mesh, InstrumentProps>(function Instrument(
  { idleSpeed = 0.13 },
  bezelRef,
) {
  const spin = useRef<Group>(null);

  useFrame((_, delta) => {
    if (spin.current) spin.current.rotation.y += delta * idleSpeed;
  });

  const marks = useMemo(() => MARKS, []);

  return (
    <group rotation={[Math.PI / 2 - TILT, 0, 0]}>
      <group ref={spin}>
        {/* Case body */}
        <mesh castShadow>
          <cylinderGeometry args={[1, 1, 0.17, 160]} />
          <meshPhysicalMaterial
            color={0x2a2c30}
            metalness={1}
            roughness={0.34}
            clearcoat={0.5}
            clearcoatRoughness={0.2}
          />
        </mesh>

        {/* Polished bezel. The one chrome surface. */}
        <mesh ref={bezelRef} position={[0, 0.06, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1, 0.055, 24, 220]} />
          <meshPhysicalMaterial color={0xdedede} metalness={1} roughness={0.06} />
        </mesh>

        {/* Matte dial face */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.87, 0.87, 0.03, 160]} />
          <meshPhysicalMaterial color={0x0b0c0e} metalness={0.4} roughness={0.72} />
        </mesh>

        {marks.map((mark, i) => (
          <mesh
            key={i}
            position={[
              Math.cos(mark.theta) * 0.74,
              FACE_TOP + 0.003,
              Math.sin(mark.theta) * 0.74,
            ]}
            rotation={[0, -mark.theta, 0]}
          >
            <boxGeometry args={[mark.length, 0.006, mark.width]} />
            <meshPhysicalMaterial
              color={0xc9cacd}
              metalness={1}
              roughness={0.18}
            />
          </mesh>
        ))}

        {/* Crystal */}
        <mesh position={[0, 0.145, 0]}>
          <cylinderGeometry args={[0.93, 0.93, 0.02, 128]} />
          <meshPhysicalMaterial
            transmission={1}
            thickness={0.35}
            ior={1.5}
            roughness={0.04}
            metalness={0}
            clearcoat={1}
          />
        </mesh>
      </group>
    </group>
  );
});
