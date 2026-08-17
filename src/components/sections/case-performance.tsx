import { Reveal } from "@/components/reveal";
import { ScrollSteps } from "@/components/scroll-steps";

const bars = [
  { label: "vendor bundle", before: 1, after: 0.42 },
  { label: "route code", before: 0.82, after: 0.34 },
  { label: "below-fold UI", before: 0.68, after: 0.18 },
  { label: "data refetches", before: 0.55, after: 0.3 },
];

function Figure() {
  return (
    <div className="relative">
      <figure className="desk-blue rounded-edge border-2 border-ink bg-paper p-5 text-ink sm:p-7">
        <div className="flex items-end gap-6">
          <div className="num-before relative">
            <span className="font-display text-[clamp(2.4rem,5vw,3.6rem)] leading-none font-800 tracking-tight">
              3.5s
            </span>
            <span className="strike absolute top-1/2 left-[-4%] h-[5px] w-[108%] rounded-full bg-red" />
          </div>
          <div className="num-after">
            <span className="num-after-value font-display text-metric">1.8s</span>
          </div>
        </div>
        <p className="mt-2 font-mono text-[11px] text-muted">
          initial page load, landing routes
        </p>

        <div className="mt-7 grid gap-3.5 border-t border-line pt-6">
          {bars.map((bar) => (
            <div key={bar.label} className="grid grid-cols-[7.5rem_1fr] items-center gap-3">
              <span className="font-mono text-[11px] text-muted">{bar.label}</span>
              <div
                className="bar h-3.5 rounded-[3px] bg-ink"
                style={{ "--before": bar.before, "--after": bar.after } as React.CSSProperties}
              />
            </div>
          ))}
        </div>
        <p className="mt-5 font-mono text-[11px] text-muted">
          fig. 2: what the bundle shipped, before and after the split
        </p>
      </figure>
      <span className="stamp scene-stamp absolute -bottom-4 right-6">
        lighthouse 65 to 92
      </span>
    </div>
  );
}

export function CasePerformance() {
  return (
    <section className="bg-band py-section text-paper">
      <div className="shell">
        <Reveal>
          <p className="font-mono text-small text-bluesoft">case file 02</p>
          <h2 className="mt-2 max-w-[18ch] text-title text-paper">
            Cutting first render in half
          </h2>
          <p className="mt-4 font-mono text-small text-bandmuted">
            React, TanStack Query, code splitting
          </p>
        </Reveal>

        <div className="mt-14">
          <ScrollSteps
            tone="band"
            sceneClass="scene-perf"
            figure={<Figure />}
            steps={[
              {
                title: "What was measured.",
                body: (
                  <p>
                    Initial page load and Lighthouse, on the routes users
                    actually landed on rather than a synthetic best case. The
                    numbers came back at 3.5 seconds and 65. The bundle was
                    shipping effectively the whole app on every route, so
                    components that only ever rendered below the fold were
                    parsed and evaluated before anything painted.
                  </p>
                ),
              },
              {
                title: "What changed.",
                body: (
                  <p>
                    Route-level code splitting, lazy loading for below-fold
                    components, and rendering optimization in the hot paths.
                    Load dropped to 1.8 seconds and Lighthouse rose to 92. Not
                    magic: the browser simply stopped paying for code the
                    first paint never needed.
                  </p>
                ),
              },
              {
                title: "What it cost, and the second pass.",
                body: (
                  <>
                    <p>
                      The honest ledger: more suspense boundaries and more care
                      about where every lazy import lands. That is a real
                      maintenance tax, and it is why the splitting is
                      route-level instead of scattered per component.
                    </p>
                    <p>
                      A separate pass moved data fetching to TanStack Query
                      with a deliberate cache and invalidation strategy.
                      Redundant API requests fell 40% and server load 20%.
                    </p>
                  </>
                ),
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
