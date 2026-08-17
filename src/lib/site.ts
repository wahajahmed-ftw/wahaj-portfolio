// Single source for the strings that appear in more than one place:
// page metadata, JSON-LD, the OG image, and llms.txt.

export const site = {
  name: "Wahaj Ahmed",
  role: "Full-stack engineer",
  location: "Islamabad, Pakistan",
  email: "wahmed@outsentia.com",
  title: "Wahaj Ahmed, full-stack engineer",
  description:
    "Full-stack engineer in Islamabad. I build React and Node systems that hold up past 100,000 users.",
  // Set NEXT_PUBLIC_SITE_URL once the domain is live. Vercel fills the
  // second branch automatically on production deploys.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
} as const;

export const CTA = "Get in touch";
