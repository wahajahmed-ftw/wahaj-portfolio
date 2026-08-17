import { Reveal } from "@/components/reveal";

const layers = [
  {
    layer: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "Java", "SQL"],
  },
  {
    layer: "Frontend",
    items: [
      "Next.js",
      "React",
      "React Native",
      "TanStack Query",
      "Tailwind",
      "shadcn/ui",
      "Storybook",
    ],
  },
  {
    layer: "Backend",
    items: [
      "Node.js",
      "Express",
      "GraphQL",
      "Spring Boot",
      "Flask",
      "Django",
      "REST",
      "Microservices",
    ],
  },
  {
    layer: "Data",
    items: [
      "PostgreSQL",
      "Supabase",
      "MongoDB",
      "MySQL",
      "DynamoDB",
      "Prisma",
      "Mongoose",
    ],
  },
  {
    layer: "Infra",
    items: ["AWS Lambda", "AWS SQS", "AWS S3", "Jenkins", "SonarQube", "Vercel", "Render"],
  },
  {
    layer: "Auth",
    items: ["JWT", "Clerk"],
  },
];

export function Stack() {
  return (
    <section id="stack" className="shell scroll-mt-24 py-section">
      <h2 className="text-title">Stack</h2>

      <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {layers.map((group, i) => (
          <Reveal key={group.layer} index={i}>
            <div className="border-t border-line pt-5">
              <h3 className="font-mono text-small text-fg">{group.layer}</h3>
              <ul className="mt-4 grid gap-2">
                {group.items.map((item) => (
                  <li key={item} className="text-small text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
