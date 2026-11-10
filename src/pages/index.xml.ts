import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getPosts } from "../lib/posts";
import { SITE } from "../site";

// RSS feed, at the same URL the previous site used.
export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/posts/${post.id}/`,
      categories: post.data.tags,
    })),
  });
}
