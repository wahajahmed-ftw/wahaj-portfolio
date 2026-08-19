// Single source for strings that appear in more than one place:
// metadata, JSON-LD, the OG image, and llms.txt.
//
// Deliberately free of environment access and of anything that can throw. The
// contact button is a Client Component and needs the address from here, so this
// module has to be safe to evaluate in the browser. The canonical origin lives
// in site-url.ts, which is server-only precisely because it reads env and
// throws.

export const site = {
  name: "Wahaj Ahmed",
  role: "Full-stack engineer",
  location: "Islamabad, Pakistan",
  email: "wahajahmed55@live.com",
  // Unlinked for now: the profile does not corroborate the case files.
  // Restore the nav/hero/footer links and the JSON-LD sameAs entry together.
  github: "https://github.com/wahajahmed-ftw",
  linkedin: "https://www.linkedin.com/in/wahajahmed-ftw/",
  title: "Wahaj Ahmed. Full Stack Engineer.",
  description:
    "Full-stack engineer in Islamabad. I build React and Node systems that hold up past 100,000 users.",
} as const;

export const CTA = "Get in touch";
