import { Reveal } from "@/components/reveal";

const outcomes = [
  { value: "30%", note: "faster feature development cycles across the team." },
  { value: "20%", note: "less duplicated frontend code to keep in sync." },
];

export function CaseComponents() {
  return (
    <section className="py-section">
      {/* Vertical stack, deliberately not a split. This is the section that
          breaks the zigzag. */}
      <div className="shell">
        <Reveal>
          <h2 className="max-w-[18ch] text-title">Shared component library</h2>
          <p className="mt-4 font-mono text-small text-muted">
            React, Tailwind, Chakra UI, shadcn/ui, Storybook
          </p>

          <div className="mt-8 grid max-w-[64ch] gap-5 text-body text-muted">
            <p>
              Every team was rebuilding the same modal, the same form field, the
              same table. The cost was not the duplicated code. It was that
              fixing one accessibility bug meant finding six copies of it first.
            </p>
            <p>
              The library made those primitives a single thing: composed on
              Chakra UI and shadcn/ui, styled with Tailwind, documented in
              Storybook so a new feature starts by importing rather than by
              copying.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-16" index={1}>
        <div className="border-y border-line bg-raise">
          <div className="shell grid gap-10 py-14 sm:grid-cols-3 sm:gap-8">
            {outcomes.map((outcome) => (
              <div key={outcome.value}>
                <p className="font-mono text-metric text-fg">{outcome.value}</p>
                <p className="mt-4 max-w-[24ch] text-small text-muted">
                  {outcome.note}
                </p>
              </div>
            ))}
            <p className="max-w-[34ch] self-end text-body text-muted">
              Both numbers come from the same change: the second team to need a
              component stopped writing one.
            </p>
          </div>
        </div>
      </Reveal>

      <div className="shell">
        <Reveal className="mt-14" index={1}>
          <p className="max-w-[64ch] text-body text-muted">
            The part that mattered for the team was ownership. A component API
            is a contract, so changing one became a versioned decision instead
            of a search and replace. That constraint is what keeps the library
            worth using rather than worth forking.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
