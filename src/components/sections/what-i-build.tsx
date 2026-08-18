import { Reveal } from "@/components/reveal";

/**
 * The offer, stated before any evidence: what someone can actually hire this
 * for, in specifics rather than adjectives. Ruled quadrants rather than
 * floating cards, so it reads as a capability schedule in the same document
 * language as the case files.
 */
const areas = [
  {
    title: "Full-stack product engineering",
    body: "Product systems across the whole stack, from the interface down through the services to the schema underneath.",
    items: [
      "React, Next.js, Node.js, Express, TypeScript",
      "GraphQL and REST APIs behind explicit contracts",
      "Admin dashboards and internal tooling",
      "Shared component libraries, documented in Storybook",
      "PostgreSQL, Supabase, DynamoDB, Prisma",
    ],
  },
  {
    title: "AI that reaches production",
    focus: true,
    body: "Not demos. The queueing, the access control, and the model sizing that decide whether an AI feature survives real customers.",
    items: [
      "MCP servers putting internal data inside the customer's Claude",
      "OAuth with company, sector and per-user entitlement checks",
      "Long-running work moved off the request path onto queues",
      "Scheduled LLM pipelines that fan out and converge",
      "Models sized to the job, not to the headline",
    ],
  },
  {
    title: "Cloud and infrastructure",
    body: "Serverless backends that stay up, deploy themselves, and say something useful at the moment they fail.",
    items: [
      "AWS Lambda, SQS, S3, DynamoDB",
      "Scheduled pipelines and pre-signed URL delivery",
      "Structured logging with request correlation",
      "Observability wiring with New Relic and Dash0",
      "CI with Jenkins and SonarQube, deploys on Vercel",
    ],
  },
  {
    title: "Performance and reliability",
    body: "Slow things made fast and silent failures made loud, measured before and after instead of estimated.",
    items: [
      "Route-level code splitting and lazy loading",
      "Cache and invalidation strategy with TanStack Query",
      "Core Web Vitals and Lighthouse work",
      "Incident investigation down to root cause",
      "Throughput and capacity tuning",
    ],
  },
];

export function WhatIBuild() {
  return (
    <section className="bg-band py-section-tinted text-paper">
      <div id="build" className="shell scroll-mt-24">
        <Reveal>
          <p className="font-mono text-small text-bluesoft">capabilities</p>
          <h2 className="mt-2 max-w-[14ch] text-title text-paper">What I build</h2>
          <p className="mt-5 max-w-[58ch] text-body text-bandmuted">
            Four areas of work. The common thread is production: real users,
            real data, and the failure modes that only ever show up there.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-14 lg:grid-cols-2">
          {areas.map((area, i) => (
            <Reveal key={area.title} index={i}>
              <div className="border-t border-bandline py-8 lg:py-9">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <h3 className="text-sub text-paper">{area.title}</h3>
                  {area.focus && (
                    <span className="rounded-full border border-bluesoft/45 px-2.5 py-1 font-mono text-[11px] tracking-[0.08em] text-bluesoft uppercase">
                      core focus
                    </span>
                  )}
                </div>
                <p className="mt-3 max-w-[48ch] text-body text-bandmuted">
                  {area.body}
                </p>
                <ul className="mt-5 grid gap-2.5">
                  {area.items.map((item) => (
                    <li
                      key={item}
                      className="grid grid-cols-[0.55rem_1fr] items-baseline gap-3 text-small text-bandmuted"
                    >
                      <span aria-hidden className="h-[3px] w-[7px] translate-y-[-0.35em] bg-bluesoft" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
