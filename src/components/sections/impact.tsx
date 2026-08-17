import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/reveal";

const metrics = [
  {
    value: <CountUp to={100} suffix="K+" className="tabular-nums" />,
    label: "students per district on one scheduling platform",
  },
  {
    value: <CountUp to={92} from={65} className="tabular-nums" />,
    label: "Lighthouse, up from 65. Page load 3.5s down to 1.8s",
  },
  {
    value: <CountUp to={40} suffix="%" className="tabular-nums" />,
    label: "fewer redundant API requests, server load down 20%",
  },
];

export function Impact() {
  return (
    <section className="bg-band text-paper">
      <div className="shell py-20 sm:py-24">
        <Reveal>
          <p className="font-mono text-small text-bluesoft">
            measured in production, not estimated
          </p>
        </Reveal>
        <div className="mt-10 grid gap-12 sm:grid-cols-3 sm:gap-8">
          {metrics.map((metric, i) => (
            <Reveal key={metric.label} index={i}>
              <p className="font-display text-metric">{metric.value}</p>
              <p className="mt-3 max-w-[26ch] text-small text-bandmuted">{metric.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
