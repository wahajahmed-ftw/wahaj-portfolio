import { isoBox, isoPath, px, route, S } from "@/lib/iso";

/**
 * Case file 02: the payday incident, drawn as the investigation itself.
 * A report sheet, the logs, the function that failed silently, and the
 * DynamoDB index with a provisioning gauge. CSS state classes stage it:
 * the trail draws toward the function, an error drops into the void until
 * a capture tray appears, then the gauge confesses and gets raised.
 */

type NodeDef = { id: string; u: number; v: number; w: number; d: number; h: number; label: string };

const NODES: NodeDef[] = [
  { id: "logs", u: 2.5, v: 2.1, w: 1.6, d: 1.6, h: 0.8, label: "logs" },
  { id: "fn", u: 5.3, v: 1.3, w: 1.5, d: 1.5, h: 0.9, label: "updateEarnings()" },
];
const N = Object.fromEntries(NODES.map((n) => [n.id, n]));
const center = (n: NodeDef): [number, number] => [n.u + n.w / 2, n.v + n.d / 2];

const SHEETS = { u: 0.3, v: 3.1, w: 1.3, d: 0.95 };
const sheetsCenter: [number, number] = [SHEETS.u + SHEETS.w / 2, SHEETS.v + SHEETS.d / 2];
const DB = { u: 8.7, v: 2.7, r: 0.8, h: 1.0 };

const FACE = { top: "#ffffff", left: "#e3e9fc", right: "#c7d2f5" };
const INK = "var(--color-ink)";
// A circle on a horizontal plane projects to an ellipse with these radii.
const ERX = Math.SQRT2 * Math.cos(Math.PI / 6) * S;
const ERY = Math.SQRT2 * 0.5 * S;

const e1 = isoPath(route(sheetsCenter, center(N.logs)));
const e2 = isoPath(route(center(N.logs), center(N.fn)));
const e3 = isoPath(route(center(N.fn), [DB.u, DB.v]));

const allPts = [
  ...NODES.flatMap((n) => isoBox(n.u, n.v, n.w, n.d, n.h).corners),
  px(SHEETS.u, SHEETS.v),
  px(SHEETS.u + SHEETS.w, SHEETS.v + SHEETS.d),
  px(SHEETS.u, SHEETS.v + SHEETS.d),
  px(SHEETS.u + SHEETS.w, SHEETS.v),
  { x: px(DB.u, DB.v).x - DB.r * ERX, y: px(DB.u, DB.v).y - (DB.h + 0.2) * S },
  { x: px(DB.u, DB.v).x + DB.r * ERX + 46, y: px(DB.u, DB.v).y + 26 },
];
const PAD = { l: 34, r: 42, t: 38, b: 22 };
const minX = Math.min(...allPts.map((p) => p.x)) - PAD.l;
const maxX = Math.max(...allPts.map((p) => p.x)) + PAD.r;
const minY = Math.min(...allPts.map((p) => p.y)) - PAD.t;
const maxY = Math.max(...allPts.map((p) => p.y)) + PAD.b;

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

export function IncidentIso() {
  const fnFront = px(N.fn.u + N.fn.w * 0.7, N.fn.v + N.fn.d * 0.7);
  const dropX = fnFront.x;
  const dropY = fnFront.y + 6;
  const db = px(DB.u, DB.v);
  const gaugeX = db.x + DB.r * ERX + 16;
  const gaugeTop = db.y - DB.h * S - 8;

  return (
    <svg
      viewBox={`${minX.toFixed(0)} ${minY.toFixed(0)} ${(maxX - minX).toFixed(0)} ${(maxY - minY).toFixed(0)}`}
      role="img"
      aria-label="Isometric investigation diagram: a report sheet leads to the logs, then to the update function, then to a DynamoDB index with a provisioning gauge. An error falls uncaught until a capture tray appears, revealing the throttled index."
      className="h-auto w-full"
    >
      {/* Drafting grid */}
      <g opacity="0.5">
        {Array.from({ length: 12 }, (_, i) => (
          <path key={`u${i}`} d={isoPath([[i, -0.4], [i, 5.2]])} stroke="var(--color-bluesoft)" strokeWidth="1" fill="none" />
        ))}
        {Array.from({ length: 7 }, (_, i) => (
          <path key={`v${i}`} d={isoPath([[-0.2, i - 0.4], [11, i - 0.4]])} stroke="var(--color-bluesoft)" strokeWidth="1" fill="none" />
        ))}
      </g>

      {/* Investigation trail, drawn in as the story advances */}
      <path d={e1} className="inc-e inc-e1" fill="none" stroke="var(--color-blue)" strokeWidth="1.7" strokeDasharray="6 5" pathLength={1} />
      <path d={e2} className="inc-e inc-e2" fill="none" stroke="var(--color-blue)" strokeWidth="1.7" strokeDasharray="6 5" pathLength={1} />
      <path d={e3} className="inc-e inc-e3" fill="none" stroke="var(--color-blue)" strokeWidth="1.7" strokeDasharray="6 5" pathLength={1} />

      {/* The report: a short stack of sheets with ~30 names */}
      <g>
        {[0, 1, 2].map((i) => {
          const pts = [
            px(SHEETS.u + i * 0.06, SHEETS.v - i * 0.04),
            px(SHEETS.u + SHEETS.w + i * 0.06, SHEETS.v - i * 0.04),
            px(SHEETS.u + SHEETS.w + i * 0.06, SHEETS.v + SHEETS.d - i * 0.04),
            px(SHEETS.u + i * 0.06, SHEETS.v + SHEETS.d - i * 0.04),
          ];
          const y = -(0.1 + i * 0.09) * S;
          return (
            <path
              key={i}
              d={`M${pts.map((p) => `${p.x.toFixed(1)} ${(p.y + y).toFixed(1)}`).join(" L")} Z`}
              fill="#ffffff"
              stroke={INK}
              strokeWidth="1.1"
              strokeLinejoin="round"
            />
          );
        })}
      </g>

      <Box n={N.logs} />
      <Box n={N.fn} />

      {/* DynamoDB: cylinder, same construction as the hero's */}
      <g>
        <path
          d={`M${(db.x - DB.r * ERX).toFixed(1)} ${(db.y - DB.h * S).toFixed(1)} L${(db.x - DB.r * ERX).toFixed(1)} ${db.y.toFixed(1)} A${(DB.r * ERX).toFixed(1)} ${(DB.r * ERY).toFixed(1)} 0 0 0 ${(db.x + DB.r * ERX).toFixed(1)} ${db.y.toFixed(1)} L${(db.x + DB.r * ERX).toFixed(1)} ${(db.y - DB.h * S).toFixed(1)}`}
          fill={FACE.left}
          stroke={INK}
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <path
          d={`M${(db.x - DB.r * ERX).toFixed(1)} ${(db.y - DB.h * 0.45 * S).toFixed(1)} A${(DB.r * ERX).toFixed(1)} ${(DB.r * ERY).toFixed(1)} 0 0 0 ${(db.x + DB.r * ERX).toFixed(1)} ${(db.y - DB.h * 0.45 * S).toFixed(1)}`}
          fill="none"
          stroke={INK}
          strokeWidth="1"
          opacity="0.4"
        />
        <ellipse cx={db.x.toFixed(1)} cy={(db.y - DB.h * S).toFixed(1)} rx={(DB.r * ERX).toFixed(1)} ry={(DB.r * ERY).toFixed(1)} fill={FACE.top} stroke={INK} strokeWidth="1.3" />
      </g>

      {/* Provisioning gauge beside the index */}
      <g className="inc-gauge">
        <rect x={gaugeX} y={gaugeTop} width="10" height="46" rx="2" fill="#ffffff" stroke={INK} strokeWidth="1.2" />
        <rect className="inc-fill" x={gaugeX + 2} y={gaugeTop + 2} width="6" height="42" rx="1" fill="var(--color-red)" />
        <line x1={gaugeX - 4} y1={gaugeTop + 14} x2={gaugeX + 14} y2={gaugeTop + 14} stroke={INK} strokeWidth="1.2" strokeDasharray="2 2" />
      </g>

      {/* The silent failure: an error with nowhere to land */}
      <g className="inc-void">
        <ellipse cx={dropX} cy={dropY + 30} rx="13" ry="5" fill="none" stroke="#9aa0aa" strokeWidth="1.2" strokeDasharray="3 3" />
      </g>
      <circle className="inc-drop" cx={dropX} cy={dropY} r="3.6" fill="var(--color-red)" opacity="0" />
      {/* The capture tray that finally catches it */}
      <path
        className="inc-tray"
        d={`M${dropX - 14} ${dropY + 20} L${dropX - 14} ${dropY + 30} L${dropX + 14} ${dropY + 30} L${dropX + 14} ${dropY + 20}`}
        fill="none"
        stroke={INK}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      {/* Labels, halo keeps them legible over anything */}
      <g
        fontFamily="var(--font-geist-mono)"
        fontSize="11.2"
        fontWeight="600"
        fill="var(--color-ink)"
        stroke="#ffffff"
        strokeWidth="3.5"
        strokeLinejoin="round"
        paintOrder="stroke"
      >
        <text x={px(sheetsCenter[0], SHEETS.v + SHEETS.d).x} y={px(sheetsCenter[0], SHEETS.v + SHEETS.d).y + 20} textAnchor="middle">
          the report
        </text>
        {NODES.map((n) => {
          const at = px(n.u + n.w / 2, n.v + n.d, 0);
          return (
            <text key={n.id} x={at.x} y={at.y + 18} textAnchor="middle">
              {n.label}
            </text>
          );
        })}
        <text x={db.x} y={db.y + 20} textAnchor="middle">
          DynamoDB index
        </text>
      </g>

      {/* Annotations, staged by the scene */}
      <g fontFamily="var(--font-geist-mono)" fontSize="10.7" stroke="#ffffff" strokeWidth="3.5" strokeLinejoin="round" paintOrder="stroke">
        <text x={px(sheetsCenter[0], SHEETS.v).x - 30} y={px(sheetsCenter[0], SHEETS.v).y - 40} fill="var(--color-muted)">
          ~30 of 4,500 missing
        </text>
        <text className="scene-note t-silent" x={dropX - 118} y={dropY + 52} fill="var(--color-red)" fontWeight="700">
          no error capture: failures vanish
        </text>
        <text className="scene-note t-cause" x={gaugeX - 140} y={gaugeTop - 16} fill="var(--color-red)" fontWeight="700">
          throttled: provisioned capacity
        </text>
        <text className="scene-note t-fix" x={gaugeX - 96} y={gaugeTop + 62} fill="var(--color-blue)">
          provisioning raised
        </text>
      </g>
    </svg>
  );
}
