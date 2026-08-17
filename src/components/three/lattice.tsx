"use client";

import { forwardRef, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Quaternion, Vector3 } from "three";
import type { Group, Mesh } from "three";
import { scroll } from "@/lib/scroll-progress";

/**
 * A layered system, in 3D. Four tiers from client down to storage, connected
 * tier to tier, rendered in glass and steel.
 *
 * This is the hero object because it is the subject: it is a system diagram
 * you can look around rather than an ornament. Fully procedural, no models.
 */

const UP = new Vector3(0, 1, 0);

type Tier = { y: number; count: number; radius: number; scale: number };

const TIERS: Tier[] = [
  { y: 1.5, count: 1, radius: 0, scale: 1.15 },
  { y: 0.5, count: 3, radius: 0.95, scale: 0.9 },
  { y: -0.5, count: 5, radius: 1.35, scale: 0.78 },
  { y: -1.5, count: 3, radius: 0.95, scale: 0.86 },
];

type Node = { pos: Vector3; scale: number; tier: number };

const NODES: Node[] = TIERS.flatMap((tier, t) =>
  Array.from({ length: tier.count }, (_, i) => {
    // Offset each tier so struts never stack into a straight column.
    const theta = (i / tier.count) * Math.PI * 2 + t * 0.55;
    return {
      pos: new Vector3(
        Math.cos(theta) * tier.radius,
        tier.y,
        Math.sin(theta) * tier.radius,
      ),
      scale: tier.scale,
      tier: t,
    };
  }),
);

/** Connect every node to the two nearest nodes on the tier below. */
const EDGES: [Node, Node][] = NODES.flatMap((node) => {
  const below = NODES.filter((n) => n.tier === node.tier + 1);
  return below
    .map((target) => ({ target, d: node.pos.distanceTo(target.pos) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, 2)
    .map(({ target }) => [node, target] as [Node, Node]);
});

const NODE_RADIUS = 0.17;

function Strut({ from, to }: { from: Vector3; to: Vector3 }) {
  const { position, quaternion, length } = useMemo(() => {
    const dir = new Vector3().subVectors(to, from);
    const span = dir.length();
    return {
      position: new Vector3().addVectors(from, to).multiplyScalar(0.5),
      quaternion: new Quaternion().setFromUnitVectors(UP, dir.normalize()),
      length: Math.max(span - NODE_RADIUS * 2.1, 0.05),
    };
  }, [from, to]);

  return (
    <mesh position={position} quaternion={quaternion}>
      <cylinderGeometry args={[0.009, 0.009, length, 8]} />
      <meshPhysicalMaterial color={0x8f9299} metalness={1} roughness={0.26} />
    </mesh>
  );
}

/**
 * A pulse travelling a strut. This is the only moving part, so it reads as
 * traffic rather than as decoration.
 */
function Pulse({ from, to, offset }: { from: Vector3; to: Vector3; offset: number }) {
  const ref = useRef<Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = (state.clock.elapsedTime * 0.32 + offset) % 1;
    ref.current.position.lerpVectors(from, to, t);
    const fade = Math.sin(t * Math.PI);
    ref.current.scale.setScalar(fade * 0.85);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.035, 12, 12]} />
      <meshBasicMaterial color={0xffffff} />
    </mesh>
  );
}

export const Lattice = forwardRef<Mesh, { idleSpeed?: number }>(
  function Lattice({ idleSpeed = 0.12 }, coreRef) {
    const spin = useRef<Group>(null);

    useFrame((_, delta) => {
      // Idle drift, biased by scroll so the structure leans into the movement.
      if (spin.current) {
        spin.current.rotation.y += delta * idleSpeed + scroll.velocity * 0.002;
      }
    });

    // Every third strut carries traffic. All of them would read as noise.
    const pulses = useMemo(() => EDGES.filter((_, i) => i % 3 === 0), []);

    return (
      <group ref={spin}>
        {EDGES.map(([a, b], i) => (
          <Strut key={i} from={a.pos} to={b.pos} />
        ))}

        {NODES.map((node, i) => (
          <mesh
            key={i}
            position={node.pos}
            scale={node.scale}
            ref={i === 0 ? coreRef : undefined}
          >
            <icosahedronGeometry args={[NODE_RADIUS, 1]} />
            <meshPhysicalMaterial
              transmission={1}
              thickness={0.4}
              ior={1.5}
              roughness={0.06}
              metalness={0}
              clearcoat={1}
            />
          </mesh>
        ))}

        {pulses.map(([a, b], i) => (
          <Pulse key={i} from={a.pos} to={b.pos} offset={i / pulses.length} />
        ))}
      </group>
    );
  },
);
