import { Reveal } from "@/components/reveal";

const practices = [
  {
    lead: "Services behind explicit contracts.",
    body: "Microservices only earn their operational cost if the boundaries are real. I settle the contract first and the implementation second, so a change on one side cannot quietly break the other.",
    proof: { href: "#work", label: "see: case file 01" },
  },
  {
    lead: "One response shape, one middleware path.",
    body: "Standardized API responses and reusable middleware for auth, validation, and errors. Consumers stop writing a special case for every route.",
    proof: { href: "#lib", label: "see: case file 05" },
  },
  {
    lead: "Logs you can query, not grep.",
    body: "Structured logging with request correlation, so an incident starts from a query instead of a guess. Cheapest item on this list, biggest cut to resolution time.",
    proof: { href: "#incident", label: "see: case file 02" },
  },
  {
    lead: "Own it to production.",
    body: "Design through deployment, including the deploy. Running the thing in production changes the decisions you make while building it.",
    proof: { href: "#site", label: "see: case file 06" },
  },
];

function Spark() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19"
        stroke="var(--color-blue)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HowIWork() {
  return (
    <section className="py-section">
      <div className="shell">
        <Reveal>
          <h2 className="max-w-[14ch] text-title">How I work</h2>
        </Reveal>
        <div className="mt-12 grid gap-x-14 gap-y-12 sm:grid-cols-2">
          {practices.map((practice, i) => (
            <Reveal key={practice.lead} index={i}>
              <div className="border-t border-line pt-6">
                <Spark />
                <h3 className="mt-4 max-w-[24ch] text-sub">{practice.lead}</h3>
                <p className="mt-3 max-w-[46ch] text-body text-muted">{practice.body}</p>
                {practice.proof && (
                  <a
                    href={practice.proof.href}
                    className="mt-4 inline-block font-mono text-small text-blue underline-offset-4 hover:underline"
                  >
                    {practice.proof.label}
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
