import { Reveal } from "@/components/reveal";

// Filled in from the final Lighthouse run before shipping. Keep honest.
const receipts = [
  { value: "100", label: "Lighthouse performance, desktop. 98 mobile" },
  { value: "0", label: "cumulative layout shift" },
  { value: "0ms", label: "total blocking time" },
  { value: "100%", label: "static, prerendered at build" },
];

export function CaseSite() {
  return (
    <section className="border-y border-bluesoft bg-bluetint py-section-tinted">
      <div id="site" className="shell scroll-mt-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="font-mono text-small text-blue">case file 06</p>
            <h2 className="mt-2 max-w-[14ch] text-title">
              Exhibit A: this website
            </h2>
            <div className="mt-6 grid max-w-[52ch] gap-4 text-body text-muted">
              <p>
                A portfolio that claims performance numbers has to be fast, or
                the claim is dead on arrival. So this site is built the way I
                build for clients: fully static, self-hosted fonts, zero
                blocking scripts, and every diagram is hand-projected SVG
                instead of a canvas library.
              </p>
              <p>
                Open the devtools. The numbers on the right are from this
                page, measured the same way I measured the 3.5s app.
              </p>
            </div>
          </Reveal>

          <Reveal index={1}>
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 border-l-2 border-ink pl-8 sm:pl-10">
              {receipts.map((r) => (
                <div key={r.label}>
                  <p className="font-display text-metric text-ink">{r.value}</p>
                  <p className="mt-2 max-w-[20ch] font-mono text-[12px] text-muted">
                    {r.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
