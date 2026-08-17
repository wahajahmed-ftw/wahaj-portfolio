import { Reveal } from "@/components/reveal";

const practices = [
  {
    lead: "Services behind explicit contracts.",
    body: "Microservices only earn their operational cost if the boundaries are real. I settle the contract first and the implementation second, so a change on one side cannot quietly break the other.",
  },
  {
    lead: "One response shape, one middleware path.",
    body: "Standardized API responses and reusable middleware for auth, validation, and errors. Consumers stop writing a special case for every route.",
  },
  {
    lead: "Logs you can query, not grep.",
    body: "Structured logging with request correlation, so an incident starts from a query instead of a guess. Cheapest item on this list, biggest cut to resolution time.",
  },
  {
    lead: "Own it to production.",
    body: "Design through deployment, including the deploy. Running the thing in production changes the decisions you make while building it.",
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
              <Spark />
              <h3 className="mt-4 max-w-[24ch] text-sub">{practice.lead}</h3>
              <p className="mt-3 max-w-[46ch] text-body text-muted">{practice.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
