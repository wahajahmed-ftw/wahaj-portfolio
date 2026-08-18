import type { CSSProperties } from "react";
import { isoBox, px, S } from "@/lib/iso";

/**
 * The full stack, exploded: three floating isometric planes with requests
 * dropping through them. Each plane is drawn in its own diagram language so
 * it reads without the caption: the UI plane is a browser wireframe whose
 * cursor periodically clicks the one red button (window dots tick like a
 * loader, content rows refresh), the services plane is three idling nodes
 * carrying code glyphs, the data plane holds two database cylinders, a
 * storage bucket and a stack of report sheets.
 *
 * The figure performs its own caption: it arrives assembled and explodes
 * apart on load, folds back up as the hero scrolls away (--fold), and each
 * layer lifts on hover. All server-rendered; motion is pure CSS + SMIL.
 */

const Z_UI = 4.0;
const Z_SVC = 2.0;
const Z_DATA = 0;

const PLANE = { w: 6.4, d: 4.6, h: 0.14 };
const TOP_UI = Z_UI + PLANE.h + 0.16; // top surface of UI furniture

type Slab = { u: number; v: number; w: number; d: number; h: number; z: number };

const PLANES: Slab[] = [
  { u: 0, v: 0, w: PLANE.w, d: PLANE.d, h: PLANE.h, z: Z_UI },
  { u: 0, v: 0, w: PLANE.w, d: PLANE.d, h: PLANE.h, z: Z_SVC },
  { u: 0, v: 0, w: PLANE.w, d: PLANE.d, h: PLANE.h, z: Z_DATA },
];

// UI blocks: browser bar, sidebar, two cards, content row.
const UI_BLOCKS: Slab[] = [
  { u: 0.4, v: 0.4, w: 5.6, d: 0.75, h: 0.16, z: Z_UI + PLANE.h },
  { u: 0.4, v: 1.45, w: 1.25, d: 2.7, h: 0.16, z: Z_UI + PLANE.h },
  { u: 2.0, v: 1.45, w: 1.95, d: 1.3, h: 0.16, z: Z_UI + PLANE.h },
  { u: 4.25, v: 1.45, w: 1.75, d: 1.3, h: 0.16, z: Z_UI + PLANE.h },
  { u: 2.0, v: 3.05, w: 4.0, d: 1.05, h: 0.16, z: Z_UI + PLANE.h },
];

// Service nodes, kept toward the front edge so the UI plane cannot hide them.
const SVC_CUBES: Slab[] = [
  { u: 1.15, v: 2.5, w: 1.0, d: 1.0, h: 0.6, z: Z_SVC + PLANE.h },
  { u: 2.8, v: 3.2, w: 1.0, d: 1.0, h: 0.6, z: Z_SVC + PLANE.h },
  { u: 4.45, v: 2.3, w: 1.0, d: 1.0, h: 0.6, z: Z_SVC + PLANE.h },
];
const GLYPHS = ["{ }", "</>", "fn"];

const SLABS: Slab[] = [...PLANES, ...UI_BLOCKS, ...SVC_CUBES];

// Requests drop through the stack at two columns.
const COLUMNS: [number, number][] = [
  [1.7, 1.7],
  [4.1, 3.3],
];

const FACE = { top: "#ffffff", left: "#e3e9fc", right: "#c7d2f5" };
const INK = "var(--color-ink)";

// A circle on a horizontal plane projects to an ellipse with these radii.
const ERX = Math.SQRT2 * Math.cos(Math.PI / 6) * S;
const ERY = Math.SQRT2 * 0.5 * S;

function slabCorners(s: Slab) {
  return isoBox(s.u, s.v, s.w, s.d, s.h).corners.map((p) => ({
    x: p.x,
    y: p.y - s.z * S,
  }));
}

const allPts = SLABS.flatMap(slabCorners);
const PAD = { l: 20, r: 150, t: 24, b: 30 };
const minX = Math.min(...allPts.map((p) => p.x)) - PAD.l;
const maxX = Math.max(...allPts.map((p) => p.x)) + PAD.r;
const minY = Math.min(...allPts.map((p) => p.y)) - PAD.t;
const maxY = Math.max(...allPts.map((p) => p.y)) + PAD.b;

function Box({ s, faces = FACE }: { s: Slab; faces?: typeof FACE }) {
  const b = isoBox(s.u, s.v, s.w, s.d, s.h);
  return (
    <g transform={`translate(0 ${(-s.z * S).toFixed(1)})`}>
      <polygon points={b.left} fill={faces.left} stroke={INK} strokeWidth="1.25" strokeLinejoin="round" />
      <polygon points={b.right} fill={faces.right} stroke={INK} strokeWidth="1.25" strokeLinejoin="round" />
      <polygon points={b.top} fill={faces.top} stroke={INK} strokeWidth="1.25" strokeLinejoin="round" />
    </g>
  );
}

// A flat quad lying on a horizontal surface at height z.
function Flat({ pts, z, fill, stroke }: { pts: [number, number][]; z: number; fill: string; stroke?: string }) {
  const d =
    pts
      .map(([u, v], i) => {
        const p = px(u, v);
        return `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${(p.y - z * S).toFixed(1)}`;
      })
      .join(" ") + " Z";
  return <path d={d} fill={fill} stroke={stroke} strokeWidth={stroke ? 0.9 : undefined} strokeLinejoin="round" />;
}

const rect = (u: number, v: number, w: number, d: number): [number, number][] => [
  [u, v],
  [u + w, v],
  [u + w, v + d],
  [u, v + d],
];

// Database cylinder: the one shape everyone reads as "database".
function Cylinder({ u, v, r, h, z }: { u: number; v: number; r: number; h: number; z: number }) {
  const c = px(u, v);
  const rx = r * ERX;
  const ry = r * ERY;
  const yT = c.y - (z + h) * S;
  const yB = c.y - z * S;
  const seam = (k: number) => {
    const y = yB - h * k * S;
    return `M${(c.x - rx).toFixed(1)} ${y.toFixed(1)} A${rx.toFixed(1)} ${ry.toFixed(1)} 0 0 0 ${(c.x + rx).toFixed(1)} ${y.toFixed(1)}`;
  };
  return (
    <g>
      <path
        d={`M${(c.x - rx).toFixed(1)} ${yT.toFixed(1)} L${(c.x - rx).toFixed(1)} ${yB.toFixed(1)} A${rx.toFixed(1)} ${ry.toFixed(1)} 0 0 0 ${(c.x + rx).toFixed(1)} ${yB.toFixed(1)} L${(c.x + rx).toFixed(1)} ${yT.toFixed(1)}`}
        fill={FACE.left}
        stroke={INK}
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path d={seam(0.38)} fill="none" stroke={INK} strokeWidth="1" opacity="0.4" />
      <path d={seam(0.72)} fill="none" stroke={INK} strokeWidth="1" opacity="0.4" />
      <ellipse cx={c.x.toFixed(1)} cy={yT.toFixed(1)} rx={rx.toFixed(1)} ry={ry.toFixed(1)} fill={FACE.top} stroke={INK} strokeWidth="1.25" />
    </g>
  );
}

// Storage bucket: a truncated cone, S3's native shape.
function Bucket({ u, v, rT, rB, h, z }: { u: number; v: number; rT: number; rB: number; h: number; z: number }) {
  const c = px(u, v);
  const rxT = rT * ERX;
  const ryT = rT * ERY;
  const rxB = rB * ERX;
  const ryB = rB * ERY;
  const yT = c.y - (z + h) * S;
  const yB = c.y - z * S;
  return (
    <g>
      <path
        d={`M${(c.x - rxT).toFixed(1)} ${yT.toFixed(1)} L${(c.x - rxB).toFixed(1)} ${yB.toFixed(1)} A${rxB.toFixed(1)} ${ryB.toFixed(1)} 0 0 0 ${(c.x + rxB).toFixed(1)} ${yB.toFixed(1)} L${(c.x + rxT).toFixed(1)} ${yT.toFixed(1)}`}
        fill={FACE.right}
        stroke={INK}
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <ellipse cx={c.x.toFixed(1)} cy={yT.toFixed(1)} rx={rxT.toFixed(1)} ry={ryT.toFixed(1)} fill={FACE.top} stroke={INK} strokeWidth="1.25" />
    </g>
  );
}

// A short stack of report sheets: the exports from case file 01.
function Sheets() {
  const base = { u: 0.55, v: 3.55, w: 0.9, d: 0.62 };
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <Flat
          key={i}
          pts={rect(base.u + i * 0.05, base.v - i * 0.03, base.w, base.d)}
          z={Z_DATA + PLANE.h + i * 0.09}
          fill="#ffffff"
          stroke={INK}
        />
      ))}
    </g>
  );
}

// Code glyph lying on the left face of a service cube: the matrix maps text
// x onto the iso u axis and keeps verticals vertical.
function FaceGlyph({ s, text }: { s: Slab; text: string }) {
  const c = px(s.u + s.w / 2, s.v + s.d);
  const y = c.y - (s.z + s.h / 2) * S;
  return (
    <text
      transform={`matrix(0.866 0.5 0 1 ${c.x.toFixed(1)} ${y.toFixed(1)})`}
      textAnchor="middle"
      dominantBaseline="central"
      fontFamily="var(--font-geist-mono)"
      fontSize="12.5"
      fontWeight="700"
      fill={INK}
      opacity="0.8"
    >
      {text}
    </text>
  );
}

// Browser chrome and greeked layout on the UI plane. The cursor clicks the
// red button on a loop; the content rows refresh in response (CSS drives
// both off the same clock).
function UiChrome() {
  const dotY = 0.775;
  const btn: Slab = { u: 4.85, v: 3.25, w: 0.9, d: 0.47, h: 0.16, z: TOP_UI };
  const bp = px(btn.u + btn.w * 0.72, btn.v + btn.d * 0.75);
  const by = bp.y - (btn.z + btn.h) * S;
  return (
    <g>
      {/* window dots double as a loader */}
      {[0.66, 0.98, 1.3].map((u, i) => {
        const p = px(u, dotY);
        return (
          <ellipse
            key={u}
            className="iso-dot"
            style={{ "--dot-i": i } as CSSProperties}
            cx={p.x.toFixed(1)}
            cy={(p.y - TOP_UI * S).toFixed(1)}
            rx={(0.085 * ERX).toFixed(1)}
            ry={(0.085 * ERY).toFixed(1)}
            fill="var(--color-muted)"
          />
        );
      })}
      <Flat pts={rect(1.75, 0.58, 3.95, 0.4)} z={TOP_UI} fill="var(--color-bluetint)" stroke="#9aa4bd" />
      {/* greeked text: sidebar items, card lines, content row */}
      {[1.75, 2.45, 3.15].map((v) => (
        <Flat key={v} pts={rect(0.62, v, 0.82, 0.3)} z={TOP_UI} fill="var(--color-bluesoft)" />
      ))}
      <Flat pts={rect(2.2, 1.72, 1.55, 0.24)} z={TOP_UI} fill="var(--color-bluesoft)" />
      <Flat pts={rect(2.2, 2.18, 1.1, 0.24)} z={TOP_UI} fill="var(--color-bluesoft)" />
      <Flat pts={rect(4.45, 1.72, 1.35, 0.24)} z={TOP_UI} fill="var(--color-bluesoft)" />
      <Flat pts={rect(4.45, 2.18, 0.95, 0.24)} z={TOP_UI} fill="var(--color-bluesoft)" />
      <g className="iso-refresh">
        <Flat pts={rect(2.2, 3.3, 2.2, 0.24)} z={TOP_UI} fill="var(--color-bluesoft)" />
        <Flat pts={rect(2.2, 3.74, 1.6, 0.24)} z={TOP_UI} fill="var(--color-bluesoft)" />
      </g>
      {/* the one action on the page: a red button the cursor keeps clicking */}
      <g className="iso-btn">
        <Box s={btn} faces={{ top: "var(--color-red)", left: "#c33a1c", right: "#a93117" }} />
      </g>
      <path
        className="iso-cursor"
        d="M0 0 L0 11.2 L3 8.7 L5 13.2 L6.9 12.3 L4.9 7.9 L8.2 7.6 Z"
        transform={`translate(${(bp.x + 1).toFixed(1)} ${(by + 1).toFixed(1)})`}
        fill={INK}
        stroke="#ffffff"
        strokeWidth="1.4"
        paintOrder="stroke"
        strokeLinejoin="round"
      />
    </g>
  );
}

// Paint order data -> services -> UI matches z order, so overlap stays
// correct with the furniture grouped per layer. `from` is where each layer
// sits while collapsed, in z units relative to its exploded position.
const LAYERS = [
  { key: "data", z: Z_DATA, from: -1.1, name: "data", tech: "Postgres, DynamoDB, S3" },
  { key: "svc", z: Z_SVC, from: 0, name: "services", tech: "Node, GraphQL, REST" },
  { key: "ui", z: Z_UI, from: 1.1, name: "UI", tech: "React, Next.js, Tailwind" },
] as const;

export function StackIso() {
  return (
    <svg
      viewBox={`${minX.toFixed(0)} ${minY.toFixed(0)} ${(maxX - minX).toFixed(0)} ${(maxY - minY).toFixed(0)}`}
      role="img"
      aria-label="Exploded isometric view of a full stack: a browser wireframe above three service nodes above databases and a storage bucket, with requests flowing down through all three planes."
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
          on arrival, exploded after load, folded again on scroll, lifted on
          hover. Labels live inside their layer so ticks never detach. */}
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
            <Box s={PLANES.find((p) => p.z === layer.z)!} />
            {layer.key === "ui" && (
              <>
                {UI_BLOCKS.map((s, i) => (
                  <Box key={i} s={s} />
                ))}
                <UiChrome />
              </>
            )}
            {layer.key === "svc" &&
              SVC_CUBES.map((s, i) => (
                <g key={i} className="iso-bob" style={{ "--bob-i": i } as CSSProperties}>
                  <Box s={s} />
                  <FaceGlyph s={s} text={GLYPHS[i]} />
                </g>
              ))}
            {layer.key === "data" && (
              <>
                <Sheets />
                <Cylinder u={2.1} v={3.55} r={0.62} h={0.7} z={Z_DATA + PLANE.h} />
                <Cylinder u={3.35} v={2.35} r={0.4} h={0.5} z={Z_DATA + PLANE.h} />
                <Bucket u={4.7} v={3.45} rT={0.6} rB={0.42} h={0.6} z={Z_DATA + PLANE.h} />
              </>
            )}
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
