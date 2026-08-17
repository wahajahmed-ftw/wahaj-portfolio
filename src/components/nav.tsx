import { GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react/dist/ssr";
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
        <a href="#top" className="font-display text-[1.05rem] font-bold tracking-[-0.01em]">
          {site.name}
          <span className="text-red">.</span>
        </a>

        <nav className="flex items-center gap-3 sm:gap-5">
          <ul className="hidden items-center gap-6 sm:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-small font-medium text-muted transition-colors duration-150 hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={site.github}
            aria-label="GitHub"
            className="icon-btn hidden md:inline-flex"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubLogoIcon size={19} />
          </a>
          <a
            href={site.linkedin}
            aria-label="LinkedIn"
            className="icon-btn hidden md:inline-flex"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinLogoIcon size={19} />
          </a>
          <a href={`mailto:${site.email}`} className="btn btn-primary">
            {CTA}
          </a>
        </nav>
      </div>
    </header>
  );
}
