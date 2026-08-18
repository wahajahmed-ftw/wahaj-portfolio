import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/reveal";

/**
 * Summary of findings: the document's table of contents. Each measured
 * outcome is a row wired to the case file that proves it, leader dots
 * running to the file number, so the band works as navigation rather than
 * a stats strip. "see: case file NN" phrasing is reserved for How I Work.
 */
const findings = [
  {
    value: <CountUp to={100} suffix="K+" className="tabular-nums" />,
    label: "students per district on one platform. Scheduling errors down 90%",
    file: "file 01",
    href: "#work",
  },
  {
    value: <CountUp to={92} from={65} className="tabular-nums" />,
    label: "Lighthouse, up from 65. Page load 3.5s down to 1.8s",
    file: "file 04",
    href: "#lib",
  },
  {
    value: <CountUp to={40} suffix="%" className="tabular-nums" />,
    label: "fewer redundant API requests. Server load down 20%",
    file: "file 04",
    href: "#lib",
  },
  {
    value: <CountUp to={30} suffix="%" className="tabular-nums" />,
    label: "faster feature cycles. Frontend duplication down 20%",
    file: "file 05",
    href: "#lib",
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
              <a
                href={f.href}
                className="group grid border-b border-bandline py-6 transition-colors duration-200 hover:bg-paper/5 lg:grid-cols-[13rem_minmax(0,28rem)_1fr_auto] lg:items-baseline lg:gap-x-6 lg:py-5"
              >
                <p className="font-display text-metric">{f.value}</p>
                <p className="mt-2 max-w-[38ch] text-small text-bandmuted lg:mt-0 lg:max-w-none">
                  {f.label}
                </p>
                <span
                  aria-hidden
                  className="hidden min-w-8 border-b-2 border-dotted border-bandmuted/40 lg:block"
                />
                <p className="mt-3 font-mono text-small text-bluesoft underline-offset-4 group-hover:underline lg:mt-0">
                  {f.file}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
