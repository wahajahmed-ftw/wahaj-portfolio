"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpIcon } from "@phosphor-icons/react/dist/ssr";
import { lenisStore } from "@/lib/lenis-store";

/**
 * Appears once the first screenful is behind you. Visibility comes from an
 * IntersectionObserver on an invisible sentinel spanning the top of the
 * document, never from a scroll listener.
 */
export function BackToTop() {
  const sentinel = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setShown(!entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toTop = () => {
    const lenis = lenisStore.lenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <>
      <div
        ref={sentinel}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 h-[92vh] w-px"
      />
      <button
        type="button"
        onClick={toTop}
        aria-label="Back to top"
        aria-hidden={!shown}
        tabIndex={shown ? 0 : -1}
        className={`icon-btn fixed right-5 bottom-5 z-40 h-11 w-11 sm:right-7 sm:bottom-7 ${
          shown
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
        style={{
          transitionProperty: "transform, box-shadow, opacity, translate",
          transitionDuration: "220ms",
        }}
      >
        <ArrowUpIcon size={19} weight="bold" />
      </button>
    </>
  );
}
