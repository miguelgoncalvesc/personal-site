import { getCollection, type CollectionEntry } from "astro:content";
import type { ImageMetadata } from "astro";

export type Post = CollectionEntry<"posts">;

const images = import.meta.glob<{ default: ImageMetadata }>(
  "/src/content/posts/**/*.{png,jpg,jpeg,webp,avif}",
  { eager: true },
);

/** Published posts, newest first. Drafts and future-dated posts only show in `astro dev`. */
export async function getPosts(): Promise<Post[]> {
  const now = new Date();
  const posts = await getCollection(
    "posts",
    ({ data }) => import.meta.env.DEV || (!data.draft && data.date <= now),
  );
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const category = (post: Post) => post.data.categories[0] ?? "Posts";

export function readingTime(post: Post): number {
  const words = (post.body ?? "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
export const formatDate = (date: Date) => dateFormat.format(date);

/** Resolve an image file that sits in the post's folder. */
export function postImage(post: Post, file: string): ImageMetadata | undefined {
  return images[`/src/content/posts/${post.id}/${file.replace(/^\.\//, "")}`]?.default;
}

/** Card cover: front matter `cover`, else the first image in the body. */
export function coverOf(post: Post): ImageMetadata | undefined {
  if (post.data.cover) return post.data.cover;
  const first = (post.body ?? "").match(/!\[[^\]]*\]\(([^)\s]+)/);
  return first ? postImage(post, first[1]) : undefined;
}
