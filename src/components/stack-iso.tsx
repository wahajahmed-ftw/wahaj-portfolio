import type { CSSProperties } from "react";
import { isoBox, px, S } from "@/lib/iso";

/**
 * The full stack, exploded: three floating isometric planes (UI, services,
 * data) with requests dropping through them. The hero visual says
 * "full-stack" without a word of copy. Abstract blocks only, no fake UI.
 *
 * The figure performs its own caption: it arrives assembled and explodes
 * apart on load (CSS keyframes on the layer groups), and each layer lifts
 * on hover while the others dim. All server-rendered; motion is pure CSS.
 */

const Z_UI = 4.0;
const Z_SVC = 2.0;
const Z_DATA = 0;

const PLANE = { w: 6.4, d: 4.6, h: 0.14 };

type Slab = { u: number; v: number; w: number; d: number; h: number; z: number };

// Furniture per plane. UI reads as an abstract layout, services as three
// nodes, data as two stores.
const SLABS: Slab[] = [
  // planes
  { u: 0, v: 0, w: PLANE.w, d: PLANE.d, h: PLANE.h, z: Z_UI },
  { u: 0, v: 0, w: PLANE.w, d: PLANE.d, h: PLANE.h, z: Z_SVC },
  { u: 0, v: 0, w: PLANE.w, d: PLANE.d, h: PLANE.h, z: Z_DATA },
  // UI blocks
  { u: 0.4, v: 0.4, w: 5.6, d: 0.75, h: 0.16, z: Z_UI + PLANE.h },
  { u: 0.4, v: 1.45, w: 1.25, d: 2.7, h: 0.16, z: Z_UI + PLANE.h },
  { u: 2.0, v: 1.45, w: 1.95, d: 1.3, h: 0.16, z: Z_UI + PLANE.h },
  { u: 4.25, v: 1.45, w: 1.75, d: 1.3, h: 0.16, z: Z_UI + PLANE.h },
  { u: 2.0, v: 3.05, w: 4.0, d: 1.05, h: 0.16, z: Z_UI + PLANE.h },
  // service nodes, kept toward the front edge so the UI plane cannot hide them
  { u: 1.15, v: 2.5, w: 1.0, d: 1.0, h: 0.6, z: Z_SVC + PLANE.h },
  { u: 2.8, v: 3.2, w: 1.0, d: 1.0, h: 0.6, z: Z_SVC + PLANE.h },
  { u: 4.45, v: 2.3, w: 1.0, d: 1.0, h: 0.6, z: Z_SVC + PLANE.h },
  // data stores: two stacked slabs read as a database
  { u: 1.45, v: 2.9, w: 1.35, d: 1.35, h: 0.3, z: Z_DATA + PLANE.h },
  { u: 1.45, v: 2.9, w: 1.35, d: 1.35, h: 0.3, z: Z_DATA + PLANE.h + 0.36 },
  { u: 3.75, v: 2.75, w: 1.95, d: 1.45, h: 0.5, z: Z_DATA + PLANE.h },
];

// Requests drop through the stack at two columns.
const COLUMNS: [number, number][] = [
  [1.7, 1.7],
  [4.1, 3.3],
];

const FACE = { top: "#ffffff", left: "#e3e9fc", right: "#c7d2f5" };

function slabCorners(s: Slab) {
  return isoBox(s.u, s.v, s.w, s.d, s.h).corners.map((p) => ({
    x: p.x,
    y: p.y - s.z * S,
  }));
}

const allPts = SLABS.flatMap(slabCorners);
const PAD = { l: 20, r: 128, t: 24, b: 30 };
const minX = Math.min(...allPts.map((p) => p.x)) - PAD.l;
const maxX = Math.max(...allPts.map((p) => p.x)) + PAD.r;
const minY = Math.min(...allPts.map((p) => p.y)) - PAD.t;
const maxY = Math.max(...allPts.map((p) => p.y)) + PAD.b;

function Box({ s }: { s: Slab }) {
  const b = isoBox(s.u, s.v, s.w, s.d, s.h);
  return (
    <g transform={`translate(0 ${(-s.z * S).toFixed(1)})`}>
      <polygon points={b.left} fill={FACE.left} stroke="var(--color-ink)" strokeWidth="1.25" strokeLinejoin="round" />
      <polygon points={b.right} fill={FACE.right} stroke="var(--color-ink)" strokeWidth="1.25" strokeLinejoin="round" />
      <polygon points={b.top} fill={FACE.top} stroke="var(--color-ink)" strokeWidth="1.25" strokeLinejoin="round" />
    </g>
  );
}

// Paint order data -> services -> UI matches z order, so overlap stays
// correct with the slabs grouped per layer. `from` is where each layer sits
// while collapsed, in z units relative to its exploded position.
const LAYERS = [
  { key: "data", z: Z_DATA, from: -1.1, name: "data", tech: "Postgres, S3" },
  { key: "svc", z: Z_SVC, from: 0, name: "services", tech: "Node, GraphQL" },
  { key: "ui", z: Z_UI, from: 1.1, name: "UI", tech: "React, Next.js" },
] as const;

const layerOf = (z: number) => (z < 1 ? "data" : z < 3 ? "svc" : "ui");

export function StackIso() {
  return (
    <svg
      viewBox={`${minX.toFixed(0)} ${minY.toFixed(0)} ${(maxX - minX).toFixed(0)} ${(maxY - minY).toFixed(0)}`}
      role="img"
      aria-label="Exploded isometric view of a full stack: a UI plane above a services plane above a data plane, with requests flowing down through all three."
      className="stack-iso h-auto w-full"
    >
      {/* Vertical request columns, drawn first so planes overlap them */}
      <g className="iso-cols">
        {COLUMNS.map(([u, v], i) => {
          const p = px(u, v);
          const yTop = p.y - (Z_UI + PLANE.h) * S;
          const yBottom = p.y - Z_DATA * S;
          return (
            <path
              key={i}
              d={`M${p.x.toFixed(1)} ${yTop.toFixed(1)} L${p.x.toFixed(1)} ${yBottom.toFixed(1)}`}
              stroke="var(--color-blue)"
              strokeWidth="1.6"
              strokeDasharray="5 5"
              fill="none"
            />
          );
        })}
      </g>

      {/* One group per layer so the whole plane moves as a unit: collapsed
          on arrival, exploded after load, lifted on hover. Labels live
          inside their layer so the leader tick never detaches. */}
      {LAYERS.map((layer) => {
        const edge = px(PLANE.w, PLANE.d * 0.42);
        const y = edge.y - layer.z * S;
        const lx = edge.x + 34;
        return (
          <g
            key={layer.key}
            className="iso-layer"
            style={{ "--iso-from": `${(layer.from * S).toFixed(1)}px` } as CSSProperties}
          >
            {SLABS.filter((s) => layerOf(s.z) === layer.key)
              .sort((a, b) => a.z - b.z || a.v + a.u - (b.v + b.u))
              .map((s, i) => (
                <Box key={i} s={s} />
              ))}
            <g
              fontFamily="var(--font-geist-mono)"
              stroke="#ffffff"
              strokeWidth="3.5"
              strokeLinejoin="round"
              paintOrder="stroke"
            >
              <path
                className="iso-tick"
                d={`M${(edge.x + 4).toFixed(1)} ${y.toFixed(1)} L${(lx - 8).toFixed(1)} ${y.toFixed(1)}`}
                stroke="var(--color-faint, #9aa0aa)"
                strokeWidth="1"
                strokeDasharray="2 3"
                fill="none"
              />
              <text x={lx} y={y - 2} fontSize="12" fontWeight="700" fill="var(--color-ink)">
                {layer.name}
              </text>
              <text x={lx} y={y + 14} fontSize="10.5" fill="var(--color-muted)">
                {layer.tech}
              </text>
            </g>
          </g>
        );
      })}

      {/* Requests in flight, held until the stack has opened */}
      <g className="iso-flow">
        {COLUMNS.map(([u, v], i) => {
          const p = px(u, v);
          const yTop = p.y - (Z_UI + PLANE.h) * S;
          const yBottom = p.y - Z_DATA * S;
          // The dot waits at the column top before its motion begins; a
          // relative path keeps it there instead of parking it at the SVG
          // origin, which is what an absolute path does pre-begin.
          return (
            <circle key={i} r="3.4" cx={p.x.toFixed(1)} cy={yTop.toFixed(1)} fill="var(--color-blue)">
              <animateMotion
                dur="3.4s"
                begin={`${(2.0 + i * 1.7).toFixed(1)}s`}
                repeatCount="indefinite"
                path={`M0 0 L0 ${(yBottom - yTop).toFixed(1)}`}
              />
            </circle>
          );
        })}
      </g>
    </svg>
  );
}
