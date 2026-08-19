import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

// Deliberately open to every crawler, AI crawlers included.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
