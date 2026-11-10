import type { APIRoute } from "astro";
import { getPosts } from "../../lib/posts";

// Plain text of every post, keyed by slug, for the search box on /posts.
export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const index = Object.fromEntries(
    posts.map((post) => [
      post.id,
      (post.body ?? "")
        .replace(/```[\s\S]*?```/g, " ")
        .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
        .replace(/\]\([^)]*\)/g, "]")
        .replace(/[#*_`>\[\]|]/g, " ")
        .replace(/\s+/g, " ")
        .toLowerCase(),
    ]),
  );
  return new Response(JSON.stringify(index), { headers: { "Content-Type": "application/json" } });
};
