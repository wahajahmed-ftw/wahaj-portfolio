/**
 * Scroll progress as a plain mutable cell, deliberately not React state.
 *
 * Lenis writes to it on every frame and the R3F scene reads it inside
 * useFrame. Nothing re-renders, and the smooth-scroll layer never enters the
 * Three.js component tree, so the two never compete for the same frames.
 */
export const scroll = {
  /** 0 at the top of the document, 1 at the bottom. */
  progress: 0,
  /** Pixels per frame, signed. Used to bias the instrument into the scroll. */
  velocity: 0,
};
