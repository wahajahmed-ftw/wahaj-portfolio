import "server-only";

/**
 * The site's canonical origin. Canonical, OG, JSON-LD and the sitemap all
 * derive from it.
 *
 * Server-only, and enforced as such rather than merely intended. Only
 * NEXT_PUBLIC_-prefixed variables reach the client bundle; Next replaces every
 * other `process.env` reference with an empty string. So a Client Component
 * that pulled this module in would evaluate it in the browser, find nothing,
 * and throw during hydration — the server HTML would look perfect while every
 * visitor with JavaScript got Next's error page. That is not hypothetical: it
 * is how this shipped broken once. `server-only` turns the same mistake into a
 * build error instead of a production outage.
 *
 * Falling back to localhost in a production build would publish a live site
 * whose every SEO and social signal points at the developer's laptop, silently,
 * so that case fails the build instead.
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
      "No site origin available. Set NEXT_PUBLIC_SITE_URL, or deploy on " +
        "Vercel where VERCEL_PROJECT_PRODUCTION_URL is provided. A production " +
        "build would otherwise publish localhost canonical, OG and sitemap " +
        "URLs, e.g. NEXT_PUBLIC_SITE_URL=https://example.com pnpm build",
    );
  }
  return "http://localhost:3000";
}

export const siteUrl = resolveUrl();
