"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { CheckIcon, CopyIcon } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";

/**
 * The CTA, with the mailto failure mode designed out.
 *
 * A bare `mailto:` is a silent dead end: if the OS has no handler registered
 * the click does nothing at all, and the browser reports no error because the
 * shell claims the handoff succeeded. That is not a rare edge case. Webmail-only
 * users, locked-down corporate images, most Linux desktops and any debloated
 * Windows build all land there, and a portfolio's primary CTA cannot be a coin
 * flip.
 *
 * Detecting the failure is not reliable, so this does not try. The click lets
 * the mailto fire *and* opens the alternatives at the same time. Anyone with a
 * mail client is already in it and never sees this; anyone without one has the
 * address and two webmail links exactly where they clicked. No detection, no
 * timers, no dead end.
 *
 * Regaining window focus closes the panel: that means the mail client did open
 * and the visitor has come back, so the alternatives have served their purpose.
 */

const GMAIL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}`;
const OUTLOOK = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(site.email)}`;

export function ContactButton({
  className,
  children,
  align = "left",
  "aria-label": ariaLabel,
}: {
  className: string;
  children: ReactNode;
  /** Which edge the panel hangs from. Use "right" in the nav so it stays on screen. */
  align?: "left" | "right";
  "aria-label"?: string;
}) {
  const [open, setOpen] = useState(false);
  /** idle -> nothing yet; copied -> clipboard took it; manual -> clipboard refused, text is selected. */
  const [status, setStatus] = useState<"idle" | "copied" | "manual">("idle");
  const wrapRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const firstRef = useRef<HTMLButtonElement>(null);
  const addrRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;

    // Back from the mail client: it worked, so retire the fallback.
    const onFocus = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };

    firstRef.current?.focus();
    window.addEventListener("focus", onFocus);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 2000);
    } catch {
      // The clipboard API can refuse: denied permission, no transient
      // activation, an insecure context. Failing quietly here would repeat the
      // exact sin this component exists to fix, so select the address instead
      // and say which keys to press.
      const node = addrRef.current;
      if (node) {
        const range = document.createRange();
        range.selectNodeContents(node);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
      setStatus("manual");
    }
  };

  return (
    <span ref={wrapRef} className="relative inline-flex">
      <a
        ref={triggerRef}
        href={`mailto:${site.email}`}
        aria-label={ariaLabel}
        className={className}
        // Deliberately not preventDefault: the mailto must still fire for
        // everyone who has a handler.
        onClick={() => setOpen(true)}
      >
        {children}
      </a>

      {open && (
        <div
          role="dialog"
          aria-label={`Ways to email ${site.name}`}
          className={`absolute top-full z-50 mt-2.5 w-[17.5rem] rounded-edge border-2 border-ink bg-paper p-3.5 text-left shadow-[6px_6px_0_var(--color-bluesoft)] ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          <p className="text-small leading-snug text-muted">
            {status === "manual"
              ? "Selected the address, press Ctrl+C (Cmd+C) to copy."
              : "No mail app? Copy the address or use webmail."}
          </p>

          <div className="mt-2.5 flex items-center gap-2">
            <span ref={addrRef} className="min-w-0 flex-1 truncate font-mono text-small text-ink" title={site.email}>
              {site.email}
            </span>
            <button
              ref={firstRef}
              type="button"
              onClick={copy}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-edge border-2 border-ink bg-paper px-2 py-1 font-mono text-[0.75rem] font-semibold text-ink transition-colors hover:bg-bluetint"
            >
              {status === "copied" ? <CheckIcon size={13} weight="bold" /> : <CopyIcon size={13} weight="bold" />}
              {status === "copied" ? "Copied" : status === "manual" ? "Ctrl+C" : "Copy"}
            </button>
          </div>

          <div className="mt-3 flex items-center gap-2 border-t border-line pt-3">
            {[
              { href: GMAIL, label: "Gmail" },
              { href: OUTLOOK, label: "Outlook" },
            ].map((w) => (
              <a
                key={w.label}
                href={w.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-edge border-2 border-ink bg-paper px-2.5 py-1 text-[0.75rem] font-semibold text-ink transition-colors hover:bg-bluetint"
              >
                {w.label}
              </a>
            ))}
          </div>

          {/* Announced without stealing focus from the copy button. */}
          <span aria-live="polite" className="sr-only">
            {status === "copied"
              ? "Email address copied to clipboard"
              : status === "manual"
                ? "Clipboard unavailable. The address is selected, press Control or Command C to copy."
                : ""}
          </span>
        </div>
      )}
    </span>
  );
}
