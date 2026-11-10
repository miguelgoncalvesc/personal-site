import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import { remarkAdmonitions } from "./src/lib/remark-admonitions.mjs";

// Static site; only /api/contact runs on the server (it opts out of prerendering).
export default defineConfig({
  site: "https://mcorte.com",
  output: "static",
  adapter: vercel(),
  integrations: [sitemap({ filter: (page) => !page.includes("/links/") })],
  markdown: {
    processor: unified({ remarkPlugins: [remarkAdmonitions] }),
    // Mermaid blocks are left alone here and drawn in the browser (see posts/[slug].astro).
    syntaxHighlight: { type: "shiki", excludeLangs: ["mermaid", "math"] },
    shikiConfig: { theme: "github-dark-dimmed" },
  },
});
