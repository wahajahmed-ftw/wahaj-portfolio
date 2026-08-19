import {
  ArrowUpRightIcon,
  EnvelopeSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { ContactButton } from "@/components/contact-button";
import { Reveal } from "@/components/reveal";
import { CTA, site } from "@/lib/site";

export function Contact() {
  return (
    <>
      <section id="contact" className="bg-blue text-paper">
        {/* Top padding stays shallow so the heading rides near the band's
            top edge: when the band peeks into the #about landing, it shows
            words instead of empty blue. */}
        <div className="shell pt-14 pb-24 sm:pt-20 sm:pb-32">
          <Reveal>
            <h2 className="max-w-[22ch] text-display text-paper">
              Let&apos;s build something that holds up.
            </h2>
            <p className="mt-7 max-w-[44ch] text-lead text-bluesoft">
              Open to engineering roles and freelance work. Email is the
              fastest way to reach me, and I answer.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <ContactButton className="btn btn-invert">
                <EnvelopeSimpleIcon size={16} weight="bold" />
                {CTA}
              </ContactButton>
              <span className="font-mono text-small text-bluesoft">{site.email}</span>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="shell flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-small text-muted">
          Wahaj Ahmed, 2026. Drawn and built by hand.
        </p>
        <div className="flex items-center gap-5">
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-small text-muted transition-colors hover:text-ink"
          >
            LinkedIn <ArrowUpRightIcon size={12} />
          </a>
        </div>
      </footer>
    </>
  );
}
