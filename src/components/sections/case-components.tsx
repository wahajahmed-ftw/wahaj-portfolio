import { px, isoBox } from "@/lib/iso";
import { Reveal } from "@/components/reveal";
import { ScrollSteps } from "@/components/scroll-steps";

/**
 * Six scattered duplicates converge into one neat two-by-three stack. Blocks
 * are drawn at their final (stacked) position; CSS vars offset them to the
 * scattered position at step 0 and release them at step 1.
 */
const BLOCK = { w: 1.15, d: 1.15, h: 0.52 };

// Final: two columns, three layers each.
const STACKED: [number, number, number][] = [
  [1.7, 2.2, 0],
  [1.7, 2.2, 0.52],
  [1.7, 2.2, 1.04],
  [3.05, 2.2, 0],
  [3.05, 2.2, 0.52],
  [3.05, 2.2, 1.04],
];
// Initial: strewn across the floor.
const SCATTERED: [number, number, number][] = [
  [0.1, 0.4, 0],
  [4.6, 0.2, 0],
  [0.4, 4.1, 0],
  [5.0, 3.6, 0],
  [2.4, -0.4, 0],
  [2.6, 4.6, 0],
];

function LibraryFigure() {
  return (
    <div className="relative">
      <figure className="desk-blue rounded-edge border-2 border-ink bg-white p-4 sm:p-5">
        <svg viewBox="-150 -40 340 260" className="h-auto w-full" role="img"
          aria-label="Six scattered duplicate blocks converging into one tidy stacked component library.">
          <g opacity="0.55">
            {Array.from({ length: 8 }, (_, i) => (
              <path key={`u${i}`} d={`M${px(i - 0.5, -0.8).x} ${px(i - 0.5, -0.8).y} L${px(i - 0.5, 5.4).x} ${px(i - 0.5, 5.4).y}`} stroke="var(--color-bluesoft)" strokeWidth="1" fill="none" />
            ))}
            {Array.from({ length: 8 }, (_, i) => (
              <path key={`v${i}`} d={`M${px(-0.9, i - 0.8).x} ${px(-0.9, i - 0.8).y} L${px(6.3, i - 0.8).x} ${px(6.3, i - 0.8).y}`} stroke="var(--color-bluesoft)" strokeWidth="1" fill="none" />
            ))}
          </g>
          {STACKED.map((target, i) => {
            const scatter = SCATTERED[i];
            const from = px(scatter[0], scatter[1], scatter[2]);
            const to = px(target[0], target[1], target[2]);
            const b = isoBox(target[0], target[1], BLOCK.w, BLOCK.d, BLOCK.h);
            // Draw the box lifted to its layer, offset back to the floor scatter.
            const lift = target[2];
            const bLift = {
              top: b.top,
              left: b.left,
              right: b.right,
            };
            return (
              <g
                key={i}
                className="blk"
                style={
                  {
                    "--sx": `${(from.x - to.x).toFixed(1)}px`,
                    "--sy": `${(from.y - to.y + lift * 36).toFixed(1)}px`,
                    "--tx": "0px",
                    "--ty": "0px",
                  } as React.CSSProperties
                }
              >
                <g transform={`translate(0 ${(-lift * 36).toFixed(1)})`}>
                  <polygon points={bLift.left} fill="#e3e9fc" stroke="var(--color-ink)" strokeWidth="1.3" strokeLinejoin="round" />
                  <polygon points={bLift.right} fill="#c7d2f5" stroke="var(--color-ink)" strokeWidth="1.3" strokeLinejoin="round" />
                  <polygon points={bLift.top} fill="#ffffff" stroke="var(--color-ink)" strokeWidth="1.3" strokeLinejoin="round" />
                </g>
              </g>
            );
          })}
          <g fontFamily="var(--font-geist-mono)" fontSize="10.5">
            <text className="t-dup" x="-140" y="-16" fill="var(--color-red)">six copies of the same modal</text>
            <text className="t-one" x="-140" y="-16" fill="var(--color-blue)">one library, imported everywhere</text>
          </g>
        </svg>
      </figure>
      <span className="stamp scene-stamp absolute -bottom-4 right-6">cycles down 30%</span>
    </div>
  );
}

export function CaseComponents() {
  return (
    <section className="py-section">
      <div className="shell">
        <Reveal>
          <p className="font-mono text-small text-blue">case file 03</p>
          <h2 className="mt-2 max-w-[18ch] text-title">
            The component library that ended copy-paste
          </h2>
          <p className="mt-4 font-mono text-small text-muted">
            React, Tailwind, Chakra UI, shadcn/ui, Storybook
          </p>
        </Reveal>

        <div className="mt-14">
          <ScrollSteps
            sceneClass="scene-lib"
            figure={<LibraryFigure />}
            steps={[
              {
                title: "Every team was rebuilding the same parts.",
                body: (
                  <p>
                    The same modal, the same form field, the same table,
                    written six times in six corners of the codebase. The cost
                    was not the duplicated code. It was that fixing one
                    accessibility bug meant finding six copies of it first.
                  </p>
                ),
              },
              {
                title: "One library, documented, imported.",
                body: (
                  <p>
                    Those primitives became a single thing: composed on Chakra
                    UI and shadcn/ui, styled with Tailwind, documented in
                    Storybook so a new feature starts by importing instead of
                    copying. Feature cycles sped up 30% and frontend
                    duplication fell 20%.
                  </p>
                ),
              },
              {
                title: "The contract is the point.",
                body: (
                  <p>
                    A component API is a contract, so changing one became a
                    versioned decision instead of a search and replace. That
                    constraint is what keeps a library worth using rather than
                    worth forking.
                  </p>
                ),
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
