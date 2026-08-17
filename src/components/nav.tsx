import { CTA, site } from "@/lib/site";

const links = [
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#about", label: "About" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="shell flex h-16 items-center justify-between">
        <a
          href="#top"
          className="text-small font-medium tracking-[-0.01em] text-fg"
        >
          {site.name}
        </a>

        <nav className="flex items-center gap-7">
          <ul className="hidden items-center gap-7 sm:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-small text-muted transition-colors duration-200 hover:text-fg"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${site.email}`}
            className="rounded-edge border border-line px-3.5 py-1.5 text-small text-fg transition-colors duration-200 hover:border-muted"
          >
            {CTA}
          </a>
        </nav>
      </div>
      {/* Scrim rather than a solid bar, so the hero canvas stays full bleed. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-bg via-bg/70 to-transparent" />
    </header>
  );
}
