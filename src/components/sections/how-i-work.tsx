import { Reveal } from "@/components/reveal";

const practices = [
  {
    lead: "Services behind explicit API contracts.",
    body: "Microservices only earn their operational cost if the boundaries are real. I settle the contract first and the implementation second, so a change on one side cannot quietly break the other.",
  },
  {
    lead: "Standardized responses and reusable middleware.",
    body: "One response shape across endpoints, one place for auth, validation, and error handling. Consumers stop writing a special case for every route.",
  },
  {
    lead: "Structured logging and monitoring.",
    body: "Consistent fields and request correlation, so an incident starts from a query instead of a guess. This is the cheapest thing on the list and it cuts resolution time the most.",
  },
  {
    lead: "End to end ownership.",
    body: "Design through deployment, including the deploy. Running the thing in production changes the decisions you make while building it.",
  },
];

export function HowIWork() {
  return (
    <section className="shell py-section">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <h2 className="text-title lg:sticky lg:top-28">How I work</h2>
        </div>

        <div className="grid gap-10 lg:col-span-8">
          {practices.map((practice, i) => (
            <Reveal key={practice.lead} index={i}>
              <p className="max-w-[52ch] text-sub text-fg">{practice.lead}</p>
              <p className="mt-3 max-w-[62ch] text-body text-muted">
                {practice.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
