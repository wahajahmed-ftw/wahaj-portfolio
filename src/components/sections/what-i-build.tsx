import { Reveal } from "@/components/reveal";

/**
 * The offer, stated before any evidence: what someone can actually hire this
 * for, in specifics rather than adjectives. Drawn from the CV, minus anything
 * that identifies an employer. Ruled quadrants rather than floating cards, so
 * it stays in the same document language as the case files.
 */
const areas = [
  {
    title: "Full-stack product engineering",
    focus: true,
    body: "React and Next.js in front, Node.js and GraphQL behind it. Production applications where one person owns the interface, the service, and the deploy.",
    items: [
      "React and Next.js frontends, Node.js and Express services",
      "Client-facing dashboards and admin panels",
      "Shared component libraries, documented in Storybook",
      "End to end delivery, from design through deployment",
      "TypeScript, JavaScript, Python, Java, SQL",
    ],
  },
  {
    title: "APIs and service architecture",
    body: "Services that deploy and scale on their own, behind contracts explicit enough that neither side breaks quietly.",
    items: [
      "GraphQL and REST APIs in microservice architectures",
      "Standardized response shapes and reusable middleware",
      "Scalable schemas and consistent data contracts",
      "Pagination, filtering and sorting over large datasets",
      "Role-based authorization with JWT and Clerk",
    ],
  },
  {
    title: "Performance and reliability",
    body: "Slow things made fast and silent failures made loud, measured in production before and after rather than estimated.",
    items: [
      "Code splitting, lazy loading and render optimization",
      "TanStack Query caching and state management",
      "Lighthouse and Core Web Vitals measurement",
      "Structured logging with request correlation",
      "Incident investigation down to root cause",
    ],
  },
  {
    title: "Cloud and AI in production",
    body: "Serverless backends that stay up and say something useful when they fail, and AI features built with the same care as the rest of the system.",
    items: [
      "AWS Lambda, SQS and S3, with DynamoDB and PostgreSQL",
      "Scheduled pipelines and pre-signed URL delivery",
      "MCP servers putting internal data inside the customer's Claude",
      "OAuth with company, sector and per-user entitlement checks",
      "CI with Jenkins and SonarQube, deploys on Vercel",
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
