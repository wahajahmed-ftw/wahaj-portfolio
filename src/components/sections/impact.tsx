import { Reveal } from "@/components/reveal";

const metrics = [
  {
    value: "100K+",
    note: "students per district served by the scheduling platform.",
  },
  {
    value: "1.8s",
    note: "initial page load, down from 3.5s. Lighthouse 65 to 92.",
  },
  {
    value: "40%",
    note: "fewer redundant API requests, with server load down 20%.",
  },
];

export function Impact() {
  return (
    <section className="shell py-section">
      {/* One hairline for the whole group rather than one per row. */}
      <div className="grid gap-y-12 border-t border-line pt-12 sm:grid-cols-3 sm:gap-x-10">
        {metrics.map((metric, i) => (
          <Reveal key={metric.value} index={i}>
            <p className="font-mono text-metric text-fg">{metric.value}</p>
            <p className="mt-4 max-w-[26ch] text-small text-muted">{metric.note}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
