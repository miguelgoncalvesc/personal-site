// Site-wide settings. Empty values switch the matching feature off.
export const SITE = {
  url: "https://mcorte.com",
  name: "Miguel Côrte",
  tagline: "Engineering leadership · Automation · Applied AI",
  description:
    "Getting AI and automation into production, and keeping them alive there. Notes on AI agents, automation and engineering leadership by Miguel Côrte.",
  email: "hello@mcorte.com",
  // Short line next to the name on the home page.
  pill: "Helping teams ship AI to production",
  social: {
    linkedin: "https://www.linkedin.com/in/miguelgoncalvesc",
    x: "https://x.com/mgoncalvesc",
    github: "https://github.com/miguelgoncalvesc",
    substack: "",
  },
  // Google Analytics 4. Only loads after the visitor accepts cookies.
  gaId: "G-JV6P3BRQNW",
  // Comments + reactions via giscus (GitHub Discussions).
  giscus: {
    repo: "miguelgoncalvesc/personal-site",
    repoId: "R_kgDOR4_9vQ",
    category: "Announcements",
    categoryId: "DIC_kwDOR4_9vc4DG07D",
    lightTheme: "light",
    darkTheme: "dark_dimmed",
    lang: "en",
  },
  // "Subscribe" block at the end of every post. Hidden until url is set.
  subscribe: {
    url: "",
    title: "Get new posts by email",
    text: "Engineering leadership, automation and applied AI. One email when a new post is out, nothing else.",
    button: "Subscribe on Substack",
  },
} as const;

export const NAV = [
  { href: "/posts/", label: "Posts" },
  { href: "/about/", label: "About" },
  { href: "/focus/", label: "Focus" },
] as const;
