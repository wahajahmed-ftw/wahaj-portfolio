// Single source for strings that appear in more than one place:
// metadata, JSON-LD, the OG image, and llms.txt.

export const site = {
  name: "Wahaj Ahmed",
  role: "Full-stack engineer",
  location: "Islamabad, Pakistan",
  email: "wahajahmed55@live.com",
  github: "https://github.com/wahajahmed-ftw",
  linkedin: "https://www.linkedin.com/in/wahajahmed-ftw/",
  title: "Wahaj Ahmed, full-stack engineer",
  description:
    "Full-stack engineer in Islamabad. I build React and Node systems that hold up past 100,000 users.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
} as const;

export const CTA = "Get in touch";
