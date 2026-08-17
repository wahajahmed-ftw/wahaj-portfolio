import { HeroCanvas } from "@/components/three/hero-canvas";
import { CTA, site } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100dvh] flex-col justify-end overflow-hidden pt-24 pb-[14vh]"
    >
      <HeroCanvas />

      <div className="shell pointer-events-none relative z-20">
        <h1 className="text-display max-w-[9ch]">{site.name}</h1>
        <p className="mt-6 max-w-[44ch] text-lead text-muted">
          Full-stack engineer. I build React and Node systems that hold up past
          100,000 users.
        </p>
        <div className="pointer-events-auto mt-10 flex flex-wrap gap-3">
          <a
            href="#work"
            className="rounded-edge bg-fg px-5 py-2.5 text-small font-medium text-bg transition-opacity duration-200 hover:opacity-85 active:scale-[0.98]"
          >
            Selected work
          </a>
          <a
            href={`mailto:${site.email}`}
            className="rounded-edge border border-line px-5 py-2.5 text-small font-medium text-fg transition-colors duration-200 hover:border-muted active:scale-[0.98]"
          >
            {CTA}
          </a>
        </div>
      </div>
    </section>
  );
}
