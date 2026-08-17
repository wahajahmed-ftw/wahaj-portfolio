import { Reveal } from "@/components/reveal";
import { CTA, site } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-line">
      <div className="shell py-section">
        <Reveal>
          <h2 className="max-w-[16ch] text-display">
            Available for engineering roles and freelance work.
          </h2>
          <p className="mt-8 max-w-[46ch] text-lead text-muted">
            Based in Islamabad, working remotely with teams anywhere. Email is
            the fastest way to reach me.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-10 inline-block rounded-edge bg-fg px-6 py-3 text-body font-medium text-bg transition-opacity duration-200 hover:opacity-85 active:scale-[0.98]"
          >
            {CTA}
          </a>
        </Reveal>
      </div>

      <footer className="shell flex flex-col gap-3 border-t border-line py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-small text-muted">{site.email}</p>
        <p className="font-mono text-small text-muted">
          {site.name}, 2026
        </p>
      </footer>
    </section>
  );
}
