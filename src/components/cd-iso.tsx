import { isoBox, isoPath, px, route } from "@/lib/iso";

/**
 * Case file 03: AI in both directions for a market-intelligence platform.
 * Lane A (push): a weekly cron feeds Trigger.dev, which fans out into
 * parallel tasks that converge on the digest email. Lane B (pull): the
 * customer's Claude reaches the published research only through the MCP
 * server's entitlement checks. CSS state classes light the lanes up in
 * story order.
 */

type NodeDef = { id: string; u: number; v: number; w: number; d: number; h: number; label: string };

const NODES: NodeDef[] = [
  { id: "cron", u: 0.2, v: 0.6, w: 1.2, d: 1.2, h: 0.55, label: "cron, weekly" },
  { id: "queue", u: 2.6, v: 0.2, w: 1.6, d: 1.6, h: 0.9, label: "Trigger.dev" },
  { id: "w1", u: 5.4, v: -1.0, w: 0.95, d: 0.95, h: 0.55, label: "" },
  { id: "w2", u: 5.4, v: 0.55, w: 0.95, d: 0.95, h: 0.55, label: "" },
  { id: "w3", u: 5.4, v: 2.1, w: 0.95, d: 0.95, h: 0.55, label: "" },
  { id: "email", u: 8.0, v: 0.55, w: 1.4, d: 1.4, h: 0.7, label: "digest email" },
  { id: "claude", u: 0.5, v: 4.6, w: 1.5, d: 1.5, h: 0.8, label: "their Claude" },
  { id: "mcp", u: 3.9, v: 4.2, w: 0.9, d: 1.9, h: 1.35, label: "MCP server" },
  { id: "reports", u: 7.4, v: 4.5, w: 1.5, d: 1.1, h: 0.35, label: "published research" },
];
const N = Object.fromEntries(NODES.map((n) => [n.id, n]));
const center = (n: NodeDef): [number, number] => [n.u + n.w / 2, n.v + n.d / 2];

const LANE_A: [string, string][] = [
  ["cron", "queue"],
  ["queue", "w1"],
  ["queue", "w2"],
  ["queue", "w3"],
  ["w1", "email"],
  ["w2", "email"],
  ["w3", "email"],
];
const LANE_B: [string, string][] = [
  ["claude", "mcp"],
  ["mcp", "reports"],
];

const pushMotion = isoPath([
  center(N.cron),
  ...route(center(N.cron), center(N.queue)).slice(1),
  ...route(center(N.queue), center(N.w2)).slice(1),
  ...route(center(N.w2), center(N.email)).slice(1),
]);
const pullMotion = isoPath([
  center(N.claude),
  ...route(center(N.claude), center(N.mcp)).slice(1),
  ...route(center(N.mcp), center(N.reports)).slice(1),
]);
const pullReturn = isoPath([
  center(N.reports),
  ...route(center(N.reports), center(N.mcp)).slice(1),
  ...route(center(N.mcp), center(N.claude)).slice(1),
]);

const allPts = NODES.flatMap((n) => isoBox(n.u, n.v, n.w, n.d, n.h).corners);
const PAD = { l: 34, r: 48, t: 32, b: 46 };
const minX = Math.min(...allPts.map((p) => p.x)) - PAD.l;
const maxX = Math.max(...allPts.map((p) => p.x)) + PAD.r;
const minY = Math.min(...allPts.map((p) => p.y)) - PAD.t;
const maxY = Math.max(...allPts.map((p) => p.y)) + PAD.b;

const FACE = { top: "#ffffff", left: "#e3e9fc", right: "#c7d2f5" };
const INK = "var(--color-ink)";

function Box({ n }: { n: NodeDef }) {
  const b = isoBox(n.u, n.v, n.w, n.d, n.h);
  return (
    <g className={`n-${n.id}`}>
      <polygon points={b.left} fill={FACE.left} stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
      <polygon points={b.right} fill={FACE.right} stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
      <polygon points={b.top} fill={FACE.top} stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
    </g>
  );
}

function Dots({ path, count, dur, className, begin = 0 }: { path: string; count: number; dur: number; className: string; begin?: number }) {
  return (
    <g className={`iso-flow ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <circle key={i} r="3.2" fill="var(--color-blue)">
          <animateMotion dur={`${dur}s`} begin={`${begin + (i * dur) / count}s`} repeatCount="indefinite" path={path} />
        </circle>
      ))}
    </g>
  );
}

export function CdIso() {
  const emailTop = px(N.email.u + N.email.w / 2, N.email.v + N.email.d / 2);
  const mcpTop = px(N.mcp.u + N.mcp.w / 2, N.mcp.v, N.mcp.h);
  const queueTop = px(N.queue.u + N.queue.w / 2, N.queue.v, N.queue.h);

  return (
    <svg
      viewBox={`${minX.toFixed(0)} ${minY.toFixed(0)} ${(maxX - minX).toFixed(0)} ${(maxY - minY).toFixed(0)}`}
      role="img"
      aria-label="Isometric diagram with two lanes: a weekly cron feeds Trigger.dev, which fans out into three parallel tasks converging on a digest email; below, the customer's Claude reaches the published research only through the MCP server's entitlement checks."
      className="h-auto w-full"
    >
      {/* Drafting grid */}
      <g opacity="0.5">
        {Array.from({ length: 13 }, (_, i) => (
          <path key={`u${i}`} d={isoPath([[i - 0.6, -1.4], [i - 0.6, 6.6]])} stroke="var(--color-bluesoft)" strokeWidth="1" fill="none" />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <path key={`v${i}`} d={isoPath([[-0.8, i - 1.6], [10.4, i - 1.6]])} stroke="var(--color-bluesoft)" strokeWidth="1" fill="none" />
        ))}
      </g>

      {/* Lane edges, drawn in by the scene */}
      {LANE_A.map(([a, b]) => (
        <path key={`${a}${b}`} d={isoPath(route(center(N[a]), center(N[b])))} className="cd-e cd-ea" fill="none" stroke="var(--color-blue)" strokeWidth="1.7" strokeDasharray="6 5" pathLength={1} />
      ))}
      {LANE_B.map(([a, b]) => (
        <path key={`${a}${b}`} d={isoPath(route(center(N[a]), center(N[b])))} className="cd-e cd-eb" fill="none" stroke="var(--color-blue)" strokeWidth="1.7" strokeDasharray="6 5" pathLength={1} />
      ))}

      {/* Nodes, back to front */}
      <Box n={N.w1} />
      <Box n={N.cron} />
      <Box n={N.queue} />
      <Box n={N.w2} />
      <Box n={N.email} />
      <Box n={N.w3} />
      <Box n={N.mcp} />
      <Box n={N.claude} />
      <Box n={N.reports} />

      {/* Entitlement bars on the MCP face: company, sector, user */}
      <g className="cd-bars">
        {[0.28, 0.62, 0.96].map((k) => {
          const a = px(N.mcp.u, N.mcp.v + 0.25 + k);
          const b = px(N.mcp.u + N.mcp.w, N.mcp.v + 0.25 + k);
          const y = -(N.mcp.h * 0.62) * 36;
          return (
            <line
              key={k}
              x1={a.x.toFixed(1)}
              y1={(a.y + y).toFixed(1)}
              x2={b.x.toFixed(1)}
              y2={(b.y + y).toFixed(1)}
              stroke="var(--color-blue)"
              strokeWidth="2.2"
              opacity="0.75"
            />
          );
        })}
      </g>

      {/* Traffic */}
      <Dots path={pushMotion} count={2} dur={5.2} className="cd-dots-a" />
      <Dots path={pullMotion} count={1} dur={4.6} className="cd-dots-b" />
      <Dots path={pullReturn} count={1} dur={4.6} begin={2.3} className="cd-dots-b" />

      {/* Labels */}
      <g
        fontFamily="var(--font-geist-mono)"
        fontSize="13"
        fontWeight="600"
        fill="var(--color-ink)"
        stroke="#ffffff"
        strokeWidth="3.5"
        strokeLinejoin="round"
        paintOrder="stroke"
      >
        {NODES.filter((n) => n.label).map((n) => {
          const at = px(n.u + n.w / 2, n.v + n.d, 0);
          return (
            <text key={n.id} x={at.x} y={at.y + 18} textAnchor="middle">
              {n.label}
            </text>
          );
        })}
        <text x={px(N.w1.u + 0.5, N.w1.v).x + 10} y={px(N.w1.u + 0.5, N.w1.v).y - 34} textAnchor="middle">
          parallel tasks
        </text>
      </g>

      {/* Annotations, staged */}
      <g fontFamily="var(--font-geist-mono)" fontSize="11.9" stroke="#ffffff" strokeWidth="3.5" strokeLinejoin="round" paintOrder="stroke">
        <text className="scene-note t-fan" x={queueTop.x - 40} y={queueTop.y - 26} fill="var(--color-blue)">
          fan out -&gt; haiku one-liners
        </text>
        <text className="scene-note t-ent" x={mcpTop.x - 52} y={mcpTop.y - 30} fill="var(--color-blue)" fontWeight="700">
          company / sector / user / oauth
        </text>
        <text className="scene-note t-inbox" x={emailTop.x - 24} y={emailTop.y - 52} fill="var(--color-muted)">
          12 inboxes, weekly
        </text>
      </g>
    </svg>
  );
}
