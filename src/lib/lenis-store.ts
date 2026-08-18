import type Lenis from "lenis";

// Mutable handle so leaf components (back-to-top) can drive the same Lenis
// instance SmoothScroll owns, without a context re-render on scroll.
export const lenisStore: { lenis: Lenis | null } = { lenis: null };
