import fs from "node:fs";
import path from "node:path";
import type { APIRoute, GetStaticPaths } from "astro";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { category, getPosts, readingTime } from "../../lib/posts";
import { SITE } from "../../site";

// Social preview cards (1200×630), drawn at build time.
// Layout follows brand kit 04-Redes-y-blog/blog-og-dark: title in Fraunces,
// last word in blue italic, tagline and URL along the bottom.
const dir = path.join(process.cwd(), "src/assets/og");
const file = (name: string) => fs.readFileSync(path.join(dir, name));
const dataUri = (name: string) => `data:image/png;base64,${file(name).toString("base64")}`;

interface Card { title: string; url: string; meta?: string }

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts();
  const pages: Record<string, Card> = {
    home: { title: "Getting AI into production, and keeping it alive there.", url: "mcorte.com" },
    posts: { title: "Notes from production", url: "mcorte.com/posts" },
    about: { title: "About Miguel Côrte", url: "mcorte.com/about" },
    focus: { title: "Into production, and alive there.", url: "mcorte.com/focus" },
    contact: { title: "Tell me what you’re building.", url: "mcorte.com/contact" },
    links: { title: SITE.name, url: "mcorte.com/links" },
    privacy: { title: "Privacy Policy", url: "mcorte.com" },
    "404": { title: "Page not found", url: "mcorte.com" },
  };
  return [
    ...Object.entries(pages).map(([slug, card]) => ({ params: { slug }, props: card })),
    ...posts.map((post) => ({
      params: { slug: `posts-${post.id}` },
      props: {
        title: post.data.title,
        url: "mcorte.com/posts",
        meta: `${category(post).toUpperCase()} · ${readingTime(post)} MIN READ`,
      },
    })),
  ];
};

const el = (type: string, style: Record<string, unknown>, children?: unknown, extra: Record<string, unknown> = {}) => ({
  type,
  props: { style, children, ...extra },
});

export const GET: APIRoute = async ({ props }) => {
  const { title, url, meta } = props as Card;
  const words = title.split(" ");
  const size = title.length > 62 ? 54 : 66;

  const tree = el("div", { width: 1200, height: 630, display: "flex", position: "relative", fontFamily: "Inter" }, [
    el("img", { position: "absolute", left: 0, top: 0, width: 1200, height: 630 }, undefined, { src: dataUri("base-dark.png"), width: 1200, height: 630 }),
    el("img", { position: "absolute", left: 72, top: 66, width: 206, height: 41 }, undefined, { src: dataUri("logo-white.png"), width: 206, height: 41 }),
    meta && el("div", { position: "absolute", right: 72, top: 76, fontFamily: "JetBrains Mono", fontSize: 15, color: "#94A3B8" }, meta),
    el(
      "div",
      { position: "absolute", left: 72, top: 130, width: 1010, height: 380, display: "flex", flexWrap: "wrap", alignContent: "center", columnGap: size * 0.24, fontFamily: "Fraunces", fontSize: size, lineHeight: 1.18, color: "#FFFFFF", letterSpacing: -1 },
      words.map((word, i) =>
        i === words.length - 1 && words.length > 1
          ? el("span", { fontStyle: "italic", color: "#60A5FA" }, word)
          : el("span", {}, word),
      ),
    ),
    el("div", { position: "absolute", left: 72, top: 536, fontSize: 18, color: "#94A3B8" }, SITE.tagline),
    el("div", { position: "absolute", right: 72, top: 536, fontFamily: "JetBrains Mono", fontSize: 18, color: "#F8FAFC" }, url),
  ]);

  const svg = await satori(tree as never, {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Fraunces", data: file("Fraunces-Medium.ttf"), weight: 500, style: "normal" },
      { name: "Fraunces", data: file("Fraunces-Italic.ttf"), weight: 500, style: "italic" },
      { name: "Inter", data: file("Inter-Regular.ttf"), weight: 400, style: "normal" },
      { name: "JetBrains Mono", data: file("JetBrainsMono-Regular.ttf"), weight: 400, style: "normal" },
    ],
  });
  const png = new Resvg(svg).render().asPng();
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
