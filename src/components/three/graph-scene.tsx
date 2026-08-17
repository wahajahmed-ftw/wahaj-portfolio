"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  AdaptiveDpr,
  Html,
  Line,
  PerformanceMonitor,
  PresentationControls,
} from "@react-three/drei";
import {
  EffectComposer,
  N8AO,
  Outline,
  Select,
  Selection,
  ToneMapping,
} from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import { Quaternion, Vector3 } from "three";
import type { Line2 } from "three/addons/lines/Line2.js";
import {
  GRAPH_EDGES,
  GRAPH_NODES,
  NODE_RADIUS,
  nodeById,
  type GraphNode,
} from "@/lib/graph";
import { RoomEnv } from "./room-env";

const UP = new Vector3(0, 1, 0);

/** Thin metallic strut between two nodes, trimmed so it never enters a node. */
function Edge({ from, to }: { from: GraphNode; to: GraphNode }) {
  const { position, quaternion, length } = useMemo(() => {
    const a = new Vector3(from.x, from.y, 0);
    const b = new Vector3(to.x, to.y, 0);
    const dir = new Vector3().subVectors(b, a);
    const span = dir.length();
    return {
      position: new Vector3().addVectors(a, b).multiplyScalar(0.5),
      quaternion: new Quaternion().setFromUnitVectors(UP, dir.normalize()),
      length: Math.max(span - (NODE_RADIUS + 0.03) * 2, 0.05),
    };
  }, [from, to]);

  return (
    <mesh position={position} quaternion={quaternion}>
      <cylinderGeometry args={[0.011, 0.011, length, 10]} />
      <meshPhysicalMaterial color={0x8f9196} metalness={1} roughness={0.26} />
    </mesh>
  );
}

/**
 * The pre-signed URL handoff. Dashed and moving so it reads as data in flight
 * rather than as another structural link.
 */
function FlowEdge({ from, to }: { from: GraphNode; to: GraphNode }) {
  const line = useRef<Line2>(null);

  const points = useMemo(() => {
    const a = new Vector3(from.x, from.y, 0);
    const b = new Vector3(to.x, to.y, 0);
    const dir = new Vector3().subVectors(b, a).normalize();
    const trim = NODE_RADIUS + 0.03;
    return [
      a.clone().addScaledVector(dir, trim),
      b.clone().addScaledVector(dir, -trim),
    ];
  }, [from, to]);

  useFrame((_, delta) => {
    const material = line.current?.material;
    if (material) material.dashOffset -= delta * 0.4;
  });

  return (
    <Line
      ref={line}
      points={points}
      color="#dedede"
      lineWidth={1.6}
      dashed
      dashSize={0.16}
      gapSize={0.11}
      transparent
      opacity={0.9}
    />
  );
}

function Node({
  node,
  hovered,
  onHover,
}: {
  node: GraphNode;
  hovered: boolean;
  onHover: (id: string | null) => void;
}) {
  return (
    <group position={[node.x, node.y, 0]}>
      <Select enabled={hovered}>
        <mesh
          onPointerOver={(e) => {
            e.stopPropagation();
            onHover(node.id);
          }}
          onPointerOut={() => onHover(null)}
        >
          <icosahedronGeometry args={[NODE_RADIUS, 1]} />
          <meshPhysicalMaterial
            transmission={1}
            thickness={0.45}
            ior={1.5}
            roughness={0.08}
            metalness={0}
            clearcoat={1}
          />
        </mesh>
      </Select>

      <Html
        center
        position={[0, -0.52, 0]}
        zIndexRange={[10, 0]}
        pointerEvents="none"
      >
        <span
          className={`font-mono text-[11px] whitespace-nowrap transition-colors duration-200 ${
            hovered ? "text-fg" : "text-muted"
          }`}
        >
          {node.label}
        </span>
      </Html>
    </group>
  );
}

export function GraphScene({ active }: { active: boolean }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [effects, setEffects] = useState(true);

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 30, position: [0, 0, 8], near: 0.1, far: 40 }}
    >
      <PerformanceMonitor
        onDecline={() => setEffects(false)}
        onIncline={() => setEffects(true)}
      />
      <AdaptiveDpr />

      <RoomEnv intensity={1.15} />
      <directionalLight position={[-4.5, 1.6, -3.2]} intensity={3.2} />
      <directionalLight position={[3.2, 4, 5]} intensity={1} />

      <Selection>
        {effects && (
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
        )}

        <PresentationControls
          cursor
          snap
          speed={1}
          damping={0.2}
          polar={[-0.3, 0.3]}
          azimuth={[-0.5, 0.5]}
        >
          <group>
            {GRAPH_EDGES.map((edge) =>
              edge.flow ? (
                <FlowEdge
                  key={`${edge.from}-${edge.to}`}
                  from={nodeById(edge.from)}
                  to={nodeById(edge.to)}
                />
              ) : (
                <Edge
                  key={`${edge.from}-${edge.to}`}
                  from={nodeById(edge.from)}
                  to={nodeById(edge.to)}
                />
              ),
            )}
            {GRAPH_NODES.map((node) => (
              <Node
                key={node.id}
                node={node}
                hovered={hovered === node.id}
                onHover={setHovered}
              />
            ))}
          </group>
        </PresentationControls>
      </Selection>
    </Canvas>
  );
}
