/**
 * Flat reading of the hero lattice, used wherever WebGL is skipped and as the
 * first paint before the scene arrives. Projected from the same tier maths so
 * the two never drift apart.
 */
const TIERS = [
  { y: 1.5, count: 1, radius: 0, r: 13 },
  { y: 0.5, count: 3, radius: 0.95, r: 10 },
  { y: -0.5, count: 5, radius: 1.35, r: 9 },
  { y: -1.5, count: 3, radius: 0.95, r: 10 },
];

const px = (x: number) => 200 + x * 62;
const py = (y: number) => 175 - y * 62;

const nodes = TIERS.flatMap((tier, t) =>
  Array.from({ length: tier.count }, (_, i) => {
    const theta = (i / tier.count) * Math.PI * 2 + t * 0.55;
    return {
      x: px(Math.cos(theta) * tier.radius),
      y: py(tier.y) + Math.sin(theta) * tier.radius * 14,
      r: tier.r,
      tier: t,
    };
  }),
);

const edges = nodes.flatMap((n) =>
  nodes
    .filter((m) => m.tier === n.tier + 1)
    .map((m) => ({ m, d: Math.hypot(m.x - n.x, m.y - n.y) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, 2)
    .map(({ m }) => [n, m] as const),
);

export function LatticeSvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 350"
      className={className}
      role="img"
      aria-label="A layered system diagram: a client tier connected down through an edge tier, a service tier, and a storage tier."
    >
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={a.x}
          y1={a.y}
          x2={b.x}
          y2={b.y}
          stroke="var(--color-faint)"
          strokeWidth={1.1}
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill="var(--color-raise)"
          stroke="var(--color-muted)"
          strokeWidth={1.1}
        />
      ))}
    </svg>
  );
}
