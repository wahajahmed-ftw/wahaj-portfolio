import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/reveal";

/**
 * Summary of findings: measured outcomes as ledger rows, numbers and claims
 * only. Wiring claims to specific case files is How I Work's job; this band
 * stays free of references so the device is not used twice.
 */
const findings = [
  {
    value: <CountUp to={100} suffix="K+" className="tabular-nums" />,
    label: "students per district on one platform. Scheduling errors down 90%",
  },
  {
    value: <CountUp to={92} from={65} className="tabular-nums" />,
    label: "Lighthouse, up from 65. Page load 3.5s down to 1.8s",
  },
  {
    value: <CountUp to={40} suffix="%" className="tabular-nums" />,
    label: "fewer redundant API requests. Server load down 20%",
  },
  {
    value: <CountUp to={30} suffix="%" className="tabular-nums" />,
    label: "faster feature cycles. Frontend duplication down 20%",
  },
];

export function Impact() {
  return (
    <section className="bg-band text-paper">
      <div className="shell py-16 sm:py-20">
        <Reveal className="flex items-baseline justify-between gap-4">
          <p className="font-mono text-small text-bluesoft">
            measured in production, not estimated
          </p>
          <p className="hidden font-mono text-small text-bandmuted sm:block">
            summary of findings
          </p>
        </Reveal>
        <div className="mt-8 border-t border-bandline">
          {findings.map((f, i) => (
            <Reveal key={f.label} index={i}>
              <div className="grid border-b border-bandline py-6 lg:grid-cols-[13rem_minmax(0,1fr)] lg:items-baseline lg:gap-x-6 lg:py-5">
                <p className="font-display text-metric">{f.value}</p>
                <p className="mt-2 max-w-[52ch] text-small text-bandmuted lg:mt-0">
                  {f.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
