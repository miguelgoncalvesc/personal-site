import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// One folder per post: src/content/posts/<slug>/index.md, images next to it.
const posts = defineCollection({
  loader: glob({
    pattern: "*/index.md",
    base: "./src/content/posts",
    generateId: ({ entry }) => entry.split("/")[0],
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      draft: z.boolean().default(false),
      description: z.string().default(""),
      tags: z.array(z.string()).default([]),
      categories: z.array(z.string()).default([]),
      showTableOfContents: z.boolean().default(true),
      // Card cover. Defaults to the first image in the post.
      cover: image().optional(),
      // Shown on the card when the post has no image at all.
      coverPhrase: z.string().optional(),
      // Icon for the home page dock: see src/components/Icons.astro for names.
      icon: z.string().optional(),
      // Social preview image file (in the post folder). Defaults to a generated card.
      images: z.array(z.string()).optional(),
    }),
});

export const collections = { posts };
