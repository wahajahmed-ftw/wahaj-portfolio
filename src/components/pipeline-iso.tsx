import { isoBox, isoPath, px, route } from "@/lib/iso";

/**
 * The production pipeline from the scheduling platform, drawn isometrically.
 * Server-rendered SVG: crisp at any size, themeable, zero runtime cost. The
 * request dots ride SMIL motion paths, hidden under prefers-reduced-motion.
 *
 * The same drawing serves the hero (mode="hero", everything alive) and the
 * scheduling case study (mode="sched", where CSS state classes stage the
 * timeout story step by step).
 */

type NodeDef = {
  id: string;
  u: number;
  v: number;
  w: number;
  d: number;
  h: number;
  label: string;
};

const NODES: NodeDef[] = [
  { id: "client", u: 0.0, v: 3.2, w: 1.5, d: 1.5, h: 0.7, label: "Client" },
  { id: "gateway", u: 2.7, v: 2.2, w: 1.5, d: 1.5, h: 1.15, label: "API Gateway" },
  { id: "cron", u: 3.3, v: -0.4, w: 1.3, d: 1.3, h: 0.55, label: "Cron, every 2h" },
  { id: "lambda", u: 5.4, v: 1.2, w: 1.5, d: 1.5, h: 0.9, label: "Lambda" },
  { id: "dynamo", u: 5.4, v: 4.0, w: 1.5, d: 1.5, h: 1.35, label: "DynamoDB" },
  { id: "sqs", u: 8.1, v: 0.4, w: 1.5, d: 1.5, h: 0.8, label: "SQS" },
  { id: "s3", u: 10.6, v: 1.6, w: 1.7, d: 1.7, h: 1.5, label: "S3" },
];

const N = Object.fromEntries(NODES.map((n) => [n.id, n]));
const center = (n: NodeDef): [number, number] => [n.u + n.w / 2, n.v + n.d / 2];

// Read path: client -> gateway -> lambda -> dynamo. Always alive.
const READ_EDGES: [string, string][] = [
  ["client", "gateway"],
  ["gateway", "lambda"],
  ["lambda", "dynamo"],
];
// Export path: the cron kicks off the report build on a schedule, never a
// request. cron -> lambda -> sqs -> s3, then the pre-signed return.
const EXPORT_EDGES: [string, string][] = [
  ["cron", "lambda"],
  ["lambda", "sqs"],
  ["sqs", "s3"],
];

const RETURN_POINTS: [number, number][] = [
  center(N.s3),
  [center(N.s3)[0], 6.3],
  [center(N.client)[0], 6.3],
  center(N.client),
];

const readMotion = isoPath([
  center(N.client),
  ...route(center(N.client), center(N.gateway)).slice(1),
  ...route(center(N.gateway), center(N.lambda)).slice(1),
]);
const exportMotion = isoPath([
  center(N.cron),
  ...route(center(N.cron), center(N.lambda)).slice(1),
  ...route(center(N.lambda), center(N.sqs)).slice(1),
  ...route(center(N.sqs), center(N.s3)).slice(1),
]);
const returnMotion = isoPath(RETURN_POINTS);

// ViewBox from projected extents of everything drawn.
const allPts = [
  ...NODES.flatMap((n) => isoBox(n.u, n.v, n.w, n.d, n.h).corners),
  ...RETURN_POINTS.map((p) => px(p[0], p[1])),
];
const PAD = { l: 34, r: 34, t: 26, b: 44 };
const minX = Math.min(...allPts.map((p) => p.x)) - PAD.l;
const maxX = Math.max(...allPts.map((p) => p.x)) + PAD.r;
const minY = Math.min(...allPts.map((p) => p.y)) - PAD.t;
const maxY = Math.max(...allPts.map((p) => p.y)) + PAD.b;

const FACE = {
  top: "#ffffff",
  left: "#e3e9fc",
  right: "#c7d2f5",
};

function Box({ n }: { n: NodeDef }) {
  const b = isoBox(n.u, n.v, n.w, n.d, n.h);
  return (
    <g className={`n-${n.id}`}>
      <polygon points={b.left} fill={FACE.left} stroke="var(--color-ink)" strokeWidth="1.3" strokeLinejoin="round" />
      <polygon points={b.right} fill={FACE.right} stroke="var(--color-ink)" strokeWidth="1.3" strokeLinejoin="round" />
      <polygon points={b.top} fill={FACE.top} stroke="var(--color-ink)" strokeWidth="1.3" strokeLinejoin="round" />
    </g>
  );
}

/** Drawn last so no box ever covers a name. Paper halo keeps them legible. */
function Labels() {
  return (
    <g
      fontFamily="var(--font-geist-mono)"
      fontSize="11"
      fontWeight="600"
      fill="var(--color-ink)"
      stroke="#ffffff"
      strokeWidth="3.5"
      strokeLinejoin="round"
      paintOrder="stroke"
    >
      {NODES.map((n) => {
        const at = px(n.u + n.w / 2, n.v + n.d, 0);
        return (
          <text key={n.id} className={`lbl-${n.id}`} x={at.x} y={at.y + 18} textAnchor="middle">
            {n.label}
          </text>
        );
      })}
    </g>
  );
}

function Dots({
  path,
  count,
  dur,
  color,
  className,
}: {
  path: string;
  count: number;
  dur: number;
  color: string;
  className?: string;
}) {
  return (
    <g className={`iso-flow ${className ?? ""}`}>
      {Array.from({ length: count }, (_, i) => (
        <circle key={i} r="3.4" fill={color}>
          <animateMotion
            dur={`${dur}s`}
            begin={`${(i * dur) / count}s`}
            repeatCount="indefinite"
            path={path}
          />
        </circle>
      ))}
    </g>
  );
}

export function PipelineIso({ mode }: { mode: "hero" | "sched" }) {
  const gatewayTop = px(N.gateway.u + N.gateway.w / 2, N.gateway.v, N.gateway.h);
  const returnMid = px(center(N.client)[0] + 2.4, 6.3);

  return (
    <svg
      viewBox={`${minX.toFixed(0)} ${minY.toFixed(0)} ${(maxX - minX).toFixed(0)} ${(maxY - minY).toFixed(0)}`}
      role="img"
      aria-label="Isometric diagram of the export pipeline: the client calls API Gateway and Lambda for reads, while a cron job builds the report every two hours through Lambda and SQS into S3, and the client receives a pre-signed URL straight from S3."
      className="h-auto w-full"
    >
      {/* Drafting grid on the floor plane */}
      <g opacity="0.55">
        {Array.from({ length: 14 }, (_, i) => (
          <path key={`u${i}`} d={isoPath([[i, -0.6], [i, 7]])} stroke="var(--color-bluesoft)" strokeWidth="1" fill="none" />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <path key={`v${i}`} d={isoPath([[-0.4, i - 0.6], [13.2, i - 0.6]])} stroke="var(--color-bluesoft)" strokeWidth="1" fill="none" />
        ))}
      </g>

      {/* Read routes */}
      {READ_EDGES.map(([a, b]) => (
        <path
          key={`${a}${b}`}
          d={isoPath(route(center(N[a]), center(N[b])))}
          fill="none"
          stroke="var(--color-blue)"
          strokeWidth="1.7"
          strokeDasharray="6 5"
          className="p-read"
        />
      ))}

      {/* Export routes + pre-signed return */}
      {EXPORT_EDGES.map(([a, b]) => (
        <path
          key={`${a}${b}`}
          d={isoPath(route(center(N[a]), center(N[b])))}
          fill="none"
          stroke="var(--color-blue)"
          strokeWidth="1.7"
          strokeDasharray="6 5"
          className="p-detour"
          pathLength={1}
        />
      ))}
      <path
        d={returnMotion}
        fill="none"
        stroke="var(--color-red)"
        strokeWidth="1.7"
        strokeDasharray="7 5"
        className="p-detour p-return"
        pathLength={1}
      />

      {/* Nodes, back to front */}
      <Box n={N.cron} />
      <Box n={N.sqs} />
      <Box n={N.lambda} />
      <Box n={N.s3} />
      <Box n={N.gateway} />
      <Box n={N.dynamo} />
      <Box n={N.client} />

      {/* Traffic */}
      <Dots path={readMotion} count={3} dur={5.4} color="var(--color-blue)" />
      <Dots
        path={exportMotion}
        count={2}
        dur={4.8}
        color="var(--color-blue)"
        className="dots-detour"
      />
      <Dots
        path={returnMotion}
        count={1}
        dur={4.2}
        color="var(--color-red)"
        className="dots-detour"
      />

      <Labels />

      {/* Annotations */}
      {mode === "hero" && (
        <g fontFamily="var(--font-geist-mono)" fontSize="10.5" fill="var(--color-muted)" stroke="#ffffff" strokeWidth="3.5" strokeLinejoin="round" paintOrder="stroke">
          <text x={px(0.7, 3.2).x} y={px(0.7, 3.2).y - 46}>
            100K+ students/district
          </text>
          <text x={returnMid.x + 30} y={returnMid.y + 26} fill="var(--color-red)">
            pre-signed URL, straight to the client
          </text>
        </g>
      )}
      {mode === "sched" && (
        <g fontFamily="var(--font-geist-mono)" fontSize="10.5" stroke="#ffffff" strokeWidth="3.5" strokeLinejoin="round" paintOrder="stroke">
          <text
            className="scene-note t-timeout"
            x={gatewayTop.x - 34}
            y={gatewayTop.y - 14}
            fill="var(--color-red)"
            fontWeight="700"
          >
            504: timeout
          </text>
          <text
            className="scene-note t-detour"
            x={returnMid.x + 30}
            y={returnMid.y + 26}
            fill="var(--color-blue)"
          >
            report built every 2h -&gt; S3 -&gt; pre-signed URL
          </text>
        </g>
      )}
    </svg>
  );
}
