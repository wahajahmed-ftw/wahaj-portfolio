import type { SimpleIcon } from "simple-icons";
import {
  siChakraui,
  siClerk,
  siDjango,
  siExpress,
  siFlask,
  siGraphql,
  siJavascript,
  siJenkins,
  siJsonwebtokens,
  siMongodb,
  siMongoose,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siOpenjdk,
  siPostgresql,
  siPrisma,
  siPython,
  siReact,
  siReactquery,
  siRender,
  siShadcnui,
  siSonarqubeserver,
  siSpringboot,
  siStorybook,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
} from "simple-icons";
import { Reveal } from "@/components/reveal";

type Item = { name: string; icon?: SimpleIcon };

const layers: { layer: string; items: Item[] }[] = [
  {
    layer: "Languages",
    items: [
      { name: "TypeScript", icon: siTypescript },
      { name: "JavaScript", icon: siJavascript },
      { name: "Python", icon: siPython },
      { name: "Java", icon: siOpenjdk },
      { name: "SQL" },
    ],
  },
  {
    layer: "Frontend",
    items: [
      { name: "Next.js", icon: siNextdotjs },
      { name: "React", icon: siReact },
      { name: "TanStack Query", icon: siReactquery },
      { name: "Tailwind", icon: siTailwindcss },
      { name: "Chakra UI", icon: siChakraui },
      { name: "shadcn/ui", icon: siShadcnui },
      { name: "Storybook", icon: siStorybook },
    ],
  },
  {
    layer: "Backend",
    items: [
      { name: "Node.js", icon: siNodedotjs },
      { name: "Express", icon: siExpress },
      { name: "GraphQL", icon: siGraphql },
      { name: "Spring Boot", icon: siSpringboot },
      { name: "Flask", icon: siFlask },
      { name: "Django", icon: siDjango },
      { name: "REST" },
      { name: "Microservices" },
    ],
  },
  {
    layer: "Data",
    items: [
      { name: "PostgreSQL", icon: siPostgresql },
      { name: "Supabase", icon: siSupabase },
      { name: "MongoDB", icon: siMongodb },
      { name: "MySQL", icon: siMysql },
      { name: "DynamoDB" },
      { name: "Prisma", icon: siPrisma },
      { name: "Mongoose", icon: siMongoose },
    ],
  },
  {
    layer: "Infra",
    items: [
      { name: "AWS Lambda" },
      { name: "SQS" },
      { name: "S3" },
      { name: "Jenkins", icon: siJenkins },
      { name: "SonarQube", icon: siSonarqubeserver },
      { name: "Vercel", icon: siVercel },
      { name: "Render", icon: siRender },
    ],
  },
  {
    layer: "Auth",
    items: [
      { name: "JWT", icon: siJsonwebtokens },
      { name: "Clerk", icon: siClerk },
    ],
  },
];

function Chip({ item }: { item: Item }) {
  return (
    <li className="chip">
      {item.icon && (
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 fill-ink" aria-hidden="true">
          <path d={item.icon.path} />
        </svg>
      )}
      {item.name}
    </li>
  );
}

export function Stack() {
  return (
    <section className="py-section">
      <div id="stack" className="shell scroll-mt-24">
        <Reveal>
          <h2 className="text-title">The stack</h2>
          <p className="mt-4 max-w-[52ch] text-body text-muted">
            Grouped by layer, because that is how systems are built. Depth
            lives in the TypeScript and React and Node column; the rest is
            working fluency.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10">
          {layers.map((group, i) => (
            <Reveal key={group.layer} index={Math.min(i, 3)}>
              <div className="grid gap-4 border-t-2 border-ink pt-5 sm:grid-cols-[10rem_1fr]">
                <h3 className="font-display text-[1.1rem] font-bold">{group.layer}</h3>
                <ul className="flex flex-wrap gap-2.5">
                  {group.items.map((item) => (
                    <Chip key={item.name} item={item} />
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
