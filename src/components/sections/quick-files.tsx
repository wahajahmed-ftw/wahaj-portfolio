import { Reveal } from "@/components/reveal";

/**
 * Case files 04 and 05, kept deliberately short: their stories are two
 * beats each and their numbers read instantly. Same document grammar as
 * the big scenes, one screen instead of a scroll runway.
 */
export function QuickFiles() {
  return (
    <section className="py-section">
      <div id="lib" className="shell scroll-mt-24">
        <Reveal>
          <p className="font-mono text-small text-blue">case files 04 + 05</p>
          <h2 className="mt-2 max-w-[16ch] text-title">The quick files</h2>
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-8">
          <Reveal>
            <article className="desk-blue rounded-edge relative h-full border-2 border-ink bg-white p-6 pb-10 sm:p-7 sm:pb-11">
              <p className="font-mono text-small text-blue">case file 04</p>
              <h3 className="mt-2 max-w-[18ch] text-sub">First render, cut in half</h3>
              <div className="mt-5 flex items-end gap-5">
                <span className="relative font-display text-[clamp(2rem,4vw,2.9rem)] leading-none font-800 tracking-tight text-muted">
                  3.5s
                  <span className="absolute top-1/2 left-[-4%] h-[4px] w-[108%] rounded-full bg-red" />
                </span>
                <span className="font-display text-[clamp(2.6rem,5vw,3.6rem)] leading-none font-800 tracking-tight">
                  1.8s
                </span>
              </div>
              <p className="mt-1.5 font-mono text-[11px] text-muted">initial page load, landing routes</p>
              <p className="mt-5 max-w-[46ch] text-body text-muted">
                The bundle shipped the whole app on every route, so code the
                first paint never needed was parsed before anything drew.
                Route-level splitting and lazy loading fixed the paint; a
                second pass moved data fetching to TanStack Query with a
                deliberate cache, cutting redundant requests 40% and server
                load 20%.
              </p>
              <span className="stamp absolute -bottom-4 right-6">lighthouse 65 to 92</span>
            </article>
          </Reveal>

          <Reveal index={1}>
            <article className="desk-blue rounded-edge relative h-full border-2 border-ink bg-white p-6 pb-10 sm:p-7 sm:pb-11">
              <p className="font-mono text-small text-blue">case file 05</p>
              <h3 className="mt-2 max-w-[18ch] text-sub">The library that ended copy-paste</h3>
              <div className="mt-5 flex items-end gap-5">
                <span className="font-display text-[clamp(2rem,4vw,2.9rem)] leading-none font-800 tracking-tight text-muted">
                  6 copies
                </span>
                <span className="font-display text-[clamp(2.6rem,5vw,3.6rem)] leading-none font-800 tracking-tight">
                  1 source
                </span>
              </div>
              <p className="mt-1.5 font-mono text-[11px] text-muted">modal, form field, table: everywhere</p>
              <p className="mt-5 max-w-[46ch] text-body text-muted">
                Teams kept rebuilding the same primitives, and the real cost
                was not the duplicate code: fixing one accessibility bug meant
                finding six copies of it first. One documented shared library
                later, feature cycles run 30% faster and frontend duplication
                is down 20%.
              </p>
              <span className="stamp absolute -bottom-4 right-6">cycles down 30%</span>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
