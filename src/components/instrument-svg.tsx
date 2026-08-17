/**
 * Flat schematic of the hero instrument, used wherever WebGL is skipped:
 * below 768px and under prefers-reduced-motion. Same geometry as the 3D
 * object (case, bezel, dial, 12 index marks with every third longer), drawn
 * from the same numbers rather than hand-traced.
 */
const MARKS = Array.from({ length: 12 }, (_, i) => ({
  theta: (i / 12) * Math.PI * 2 - Math.PI / 2,
  length: i % 3 === 0 ? 14 : 7.5,
  width: i % 3 === 0 ? 1.9 : 1.2,
}));

export function InstrumentSvg({ className }: { className?: string }) {
  const c = 160;

  return (
    <svg
      viewBox="0 0 320 320"
      className={className}
      role="img"
      aria-label="Schematic of a machined instrument dial with a polished bezel and twelve index marks."
    >
      <circle cx={c} cy={c} r={148} fill="none" stroke="var(--color-line)" strokeWidth={11} />
      <circle cx={c} cy={c} r={148} fill="none" stroke="var(--color-muted)" strokeWidth={1.25} />
      <circle cx={c} cy={c} r={129} fill="var(--color-raise)" stroke="var(--color-line)" strokeWidth={1} />

      {MARKS.map((mark, i) => {
        const inner = 110 - mark.length / 2;
        const outer = 110 + mark.length / 2;
        return (
          <line
            key={i}
            x1={c + Math.cos(mark.theta) * inner}
            y1={c + Math.sin(mark.theta) * inner}
            x2={c + Math.cos(mark.theta) * outer}
            y2={c + Math.sin(mark.theta) * outer}
            stroke="var(--color-muted)"
            strokeWidth={mark.width}
            strokeLinecap="butt"
          />
        );
      })}
    </svg>
  );
}
