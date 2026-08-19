import { LinkedinLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { ContactButton } from "@/components/contact-button";
import { CTA, site } from "@/lib/site";

const links = [
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#about", label: "About" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line/80 bg-paper/80 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between">
        <a href="#top" aria-label="Wahaj Ahmed, back to top" className="flex items-center gap-2.5">
          {/* The favicon cube, at nav scale. The name itself lives in the hero. */}
          <svg viewBox="10 8 44 46" className="h-6 w-6" aria-hidden="true">
            <polygon points="32,12 50,22 32,32 14,22" fill="#ffffff" stroke="var(--color-ink)" strokeWidth="3" strokeLinejoin="round" />
            <polygon points="32,32 50,22 50,40 32,50" fill="#c7d2f5" stroke="var(--color-ink)" strokeWidth="3" strokeLinejoin="round" />
            <polygon points="14,22 32,32 32,50 14,40" fill="#e3e9fc" stroke="var(--color-ink)" strokeWidth="3" strokeLinejoin="round" />
          </svg>
          <span className="hidden font-display text-[1.1rem] font-bold tracking-[-0.01em] min-[380px]:inline">
            wa<span className="text-red">.</span>
          </span>
        </a>

        <nav className="flex items-center gap-3 sm:gap-5">
          <ul className="flex items-center gap-3.5 sm:gap-6">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[0.8125rem] font-medium text-muted transition-colors duration-150 hover:text-ink sm:text-small"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={site.linkedin}
            aria-label="LinkedIn"
            className="icon-btn hidden md:inline-flex"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinLogoIcon size={19} />
          </a>
          <ContactButton className="btn btn-primary" align="right">
            {CTA}
          </ContactButton>
        </nav>
      </div>
    </header>
  );
}
