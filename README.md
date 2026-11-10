# Miguel Côrte — Personal Site

[mcorte.com](https://mcorte.com), built with [Astro](https://astro.build/) and deployed on [Vercel](https://vercel.com/).
The contact form sends email through [Resend](https://resend.com/).

## Local development

Requires Node 22 or newer.

```bash
npm install
```

```bash
npm run dev
```

The site runs at `http://localhost:4321/`. Drafts and future-dated posts show up in `dev` only.

```bash
npm run build
```

## Where things live

| Path | What it is |
|---|---|
| `src/content/posts/<slug>/index.md` | One folder per post, images next to it |
| `src/pages/` | One file per page: home, posts, about, focus, contact, links, privacy |
| `src/data/about.ts` | Experience, education, skills and the three Focus areas |
| `src/site.ts` | Name, tagline, social links, analytics ID, comments settings |
| `src/styles/global.css` | Brand kit tokens (colours, fonts) and all styles |
| `src/pages/api/contact.ts` | Contact form endpoint (the only server code) |
| `src/pages/og/[slug].png.ts` | Social preview cards, generated at build time |
| `public/` | Fonts, favicons, company logos |
| `drafts/` | Unpublished posts, not built |

## Writing a post

Create `src/content/posts/my-new-post/index.md`:

```markdown
---
title: "Your Post Title"
date: 2026-03-22
draft: false
description: "A short summary for previews and SEO."
tags: ["AI", "Automation"]
categories: ["AI & Automation"]
---

Your markdown content here.
```

Optional front matter:

- `cover: "./figure.png"`: image for the post card. Defaults to the first image in the post.
- `coverPhrase: "a few words"`: text for the card when the post has no image.
- `icon: "layers"`: icon in the home page dock. Names are in `src/components/Icons.astro`.
- `images: ["figure.png"]`: use this image as the social preview instead of the generated card.
- `showTableOfContents: false`: hide the "On this page" list.

A post dated in the future is published by the daily rebuild on that date (see "Scheduled posts").
Mermaid code blocks and `> [!Note] Title` callouts are supported.

## Deployment

Vercel builds and deploys every push: `main` goes to production, other branches get a preview URL.

### One-time setup

**1. Vercel**

1. Import this repository in Vercel. It detects Astro; keep the defaults.
2. In Settings → Environment Variables, add `RESEND_API_KEY` (from step 4).
3. In Settings → Domains, add `mcorte.com` and `www.mcorte.com`. Vercel shows the DNS records to create.

**2. Cloudflare (DNS)**

The domain stays registered at GoDaddy; only its DNS moves to Cloudflare.

1. Add `mcorte.com` as a site in Cloudflare (free plan). Review the records it imports from GoDaddy.
2. In GoDaddy, replace the nameservers with the two Cloudflare gives you.
3. In Cloudflare DNS, create the records Vercel asked for in step 1, set to "DNS only" (grey cloud).
   Delete the old GitHub Pages records (`185.199.x.x` A records, any CNAME to `github.io`).

**3. Cloudflare Email Routing (receive mail at hello@mcorte.com)**

1. In Cloudflare → Email → Email Routing, enable it and let it add its MX and TXT records.
2. Add your personal inbox as a destination address and confirm the verification email.
3. Create the rule `hello@mcorte.com` → that destination.

Email Routing only receives. Replying *as* hello@mcorte.com from your inbox needs a separate "send mail as" setup.

**4. Resend (send the contact form)**

1. Add the domain `mcorte.com` in Resend and create the DNS records it lists in Cloudflare.
   They sit on `resend._domainkey` and the `send` subdomain, so they don't clash with Email Routing.
2. Wait for Resend to show the domain as verified.
3. Create an API key with sending access, save it in Vercel as `RESEND_API_KEY`, and redeploy.

The form posts to `/api/contact`, which emails `hello@mcorte.com` with the visitor's address as reply-to.
`CONTACT_TO` and `CONTACT_FROM` override the defaults (see `.env.example`).

**5. Scheduled posts**

1. In Vercel → Settings → Git → Deploy Hooks, create a hook for `main`.
2. Save its URL as the GitHub repository secret `VERCEL_DEPLOY_HOOK`.

`.github/workflows/scheduled-rebuild.yml` calls it once a day.

**6. After the switch**

Turn off GitHub Pages in the repository settings. Comments (giscus) keep working: they are tied to this repository, not to the host.

## License

Content is © Miguel Côrte. Fonts in `public/fonts` are under the SIL Open Font License.
