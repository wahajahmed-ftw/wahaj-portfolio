// Single source for strings that appear in more than one place:
// metadata, JSON-LD, the OG image, and llms.txt.

/**
 * Canonical, OG, JSON-LD and the sitemap all derive from this. Falling back
 * to localhost in a production build ships a live site whose every SEO and
 * social signal points at the developer's laptop, silently, so that case
 * fails the build instead.
 */
function resolveUrl(): string {
  const explicit =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined);
  if (explicit) return explicit;
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL is not set. A production build would publish " +
        "localhost canonical, OG and sitemap URLs. Set it to the live origin, " +
        "e.g. NEXT_PUBLIC_SITE_URL=https://example.com pnpm build",
    );
  }
  return "http://localhost:3000";
}

export const site = {
  name: "Wahaj Ahmed",
  role: "Full-stack engineer",
  location: "Islamabad, Pakistan",
  email: "wahajahmed55@live.com",
  // Unlinked for now: the profile does not corroborate the case files.
  // Restore the nav/hero/footer links and the JSON-LD sameAs entry together.
  github: "https://github.com/wahajahmed-ftw",
  linkedin: "https://www.linkedin.com/in/wahajahmed-ftw/",
  title: "Wahaj Ahmed. Systems that hold up.",
  description:
    "Full-stack engineer in Islamabad. I build React and Node systems that hold up past 100,000 users.",
  url: resolveUrl(),
} as const;

export const CTA = "Get in touch";
