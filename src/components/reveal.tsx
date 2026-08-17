import type { CSSProperties, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Position within a group. Staggers the entry without a delay chain. */
  index?: number;
};

/**
 * Scroll reveal driven entirely by CSS `animation-timeline: view()`.
 *
 * Deliberately a server component with no client boundary: the animation costs
 * zero JavaScript, the content is visible by default in browsers without
 * scroll-driven animations, and `prefers-reduced-motion` is handled in the
 * stylesheet. Never wraps the hero, whose H1 is the LCP element.
 */
export function Reveal({ children, className, index = 0 }: RevealProps) {
  return (
    <div
      className={className ? `reveal ${className}` : "reveal"}
      style={index ? ({ "--reveal-i": index } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
