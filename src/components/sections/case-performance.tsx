import { Reveal } from "@/components/reveal";

const measurements = [
  { label: "Initial page load", before: "3.5s", after: "1.8s" },
  { label: "Lighthouse", before: "65", after: "92" },
  { label: "Redundant API requests", before: "baseline", after: "down 40%" },
];

export function CasePerformance() {
  return (
    <section className="shell py-section">
      <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Mirrored split: the measurement leads, the write-up follows. */}
        <Reveal className="lg:order-1 lg:col-span-5">
          <div className="border-t border-line">
            <div className="grid grid-cols-[1fr_auto_auto] items-baseline gap-x-6 py-4 font-mono text-small text-muted">
              <span />
              <span className="text-right">Before</span>
              <span className="w-24 text-right">After</span>
            </div>
            {measurements.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[1fr_auto_auto] items-baseline gap-x-6 border-t border-line py-5"
              >
                <span className="text-small text-muted">{row.label}</span>
                <span className="text-right font-mono text-small text-muted">
                  {row.before}
                </span>
                <span className="w-24 text-right font-mono text-sub text-fg">
                  {row.after}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7" index={1}>
          <h2 className="text-title">Performance work at Volmatica</h2>
          <p className="mt-4 font-mono text-small text-muted">
            Software Engineer, February 2025 to present
          </p>

          <div className="mt-8 grid max-w-[62ch] gap-5 text-body text-muted">
            <p>
              What was measured: initial page load and Lighthouse, on the routes
              users actually landed on rather than a synthetic best case.
            </p>
            <p>
              What it showed: 3.5 seconds to first usable render and a
              Lighthouse score of 65. The bundle shipped effectively the whole
              app on every route, so components that only ever rendered below
              the fold were still parsed and evaluated before anything painted.
            </p>
            <p>
              What changed: route level code splitting, lazy loading for
              below-the-fold components, and rendering optimization to cut
              wasted re-render work in the hot paths. Load dropped to 1.8
              seconds and Lighthouse to 92.
            </p>
            <p>
              What it cost: more suspense boundaries and more care about where a
              lazy import lands. That is a real maintenance tax the team pays on
              every new route, and it is the reason the splitting is route level
              rather than scattered per component.
            </p>
            <p>
              A separate pass covered data fetching. The same queries were being
              refetched by components that mounted independently of each other.
              Moving to TanStack Query with a deliberate cache and invalidation
              strategy cut redundant API requests by 40% and server load by 20%.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
