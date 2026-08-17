import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Deliberately open to every crawler, AI crawlers included.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
