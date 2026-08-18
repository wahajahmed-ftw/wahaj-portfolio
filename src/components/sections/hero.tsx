import type { CSSProperties } from "react";
import {
  ArrowDownIcon,
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import { StackIso } from "@/components/stack-iso";
import { Tilt } from "@/components/tilt";
import { CTA, site } from "@/lib/site";

const rise = (d: number) => ({ "--rise-d": `${d}s` }) as CSSProperties;

export function Hero() {
  return (
    // No overflow-hidden here: it would make this section a scroll
    // container, and the .hero-fig view() timeline must resolve against
    // the root scroller for the fold handoff to run.
    <section id="top" className="relative flex min-h-[100dvh] items-center pt-24 pb-14">
      <div className="shell grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
        <div>
          <p className="rise font-mono text-small text-blue" style={rise(0.05)}>
            hello, I am
          </p>

          {/* LCP element: paints immediately, no entrance animation. */}
          <h1 className="mt-3 text-display">
            Wahaj <span className="outline-text">Ahmed</span>
          </h1>

          <p className="rise mt-6 max-w-[42ch] text-lead text-muted" style={rise(0.14)}>
            Full-stack engineer. I build React and Node systems that{" "}
            <span className="relative inline-block whitespace-nowrap">
              hold up
              <svg
                viewBox="0 0 120 12"
                aria-hidden="true"
                className="absolute -bottom-1.5 left-0 w-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M3 8.5 C 25 4.5, 48 9.5, 66 6.5 S 105 5, 117 7.5"
                  fill="none"
                  stroke="var(--color-red)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  pathLength={1}
                  className="scribble"
                />
              </svg>
            </span>{" "}
            past 100,000 users.
          </p>

          <div className="rise mt-9 flex flex-wrap items-center gap-3" style={rise(0.22)}>
            <a href="#work" className="btn btn-primary">
              Selected work
              <ArrowDownIcon size={15} weight="bold" />
            </a>
            <a href={`mailto:${site.email}`} className="btn btn-secondary">
              {CTA}
            </a>
          </div>

          <div className="rise mt-9 flex items-center gap-3" style={rise(0.3)}>
            <a href={site.github} aria-label="GitHub" className="icon-btn" target="_blank" rel="noopener noreferrer">
              <GithubLogoIcon size={19} />
            </a>
            <a href={site.linkedin} aria-label="LinkedIn" className="icon-btn" target="_blank" rel="noopener noreferrer">
              <LinkedinLogoIcon size={19} />
            </a>
            <a href={`mailto:${site.email}`} aria-label="Email" className="icon-btn">
              <EnvelopeSimpleIcon size={19} />
            </a>
          </div>
        </div>

        <div className="rise" style={rise(0.18)}>
          <Tilt className="hero-fig">
            <figure className="desk-blue rounded-edge border-2 border-ink bg-white p-4 sm:p-6">
              <StackIso />
              <figcaption className="mt-3 border-t border-line pt-3 font-mono text-[11px] text-muted">
                fig. 1: the full stack, exploded view. the case files below
                are what happened inside it.
              </figcaption>
            </figure>
          </Tilt>
        </div>
      </div>
    </section>
  );
}
