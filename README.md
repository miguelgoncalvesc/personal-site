# Miguel Côrte — Personal Site

A personal website built with [Hugo](https://gohugo.io/) and the [Blowfish](https://blowfish.page/) theme.

## Local Development

### Prerequisites

- [Hugo](https://gohugo.io/installation/) (extended edition recommended)
- [Git](https://git-scm.com/)

### Repository layout

Only source is tracked: content, config, layouts, assets, `static/`, and the `themes/blowfish` theme. Hugo output directories `public/` and `resources/` are ignored (regenerate with `hugo` after cloning). If you previously staged `public/`, remove it from the index once: `git rm -r --cached public` (then commit).

### Setup

```bash
# Start the development server
hugo server -D
```

The site will be available at `http://localhost:1313/`.

### Creating New Blog Posts

Simply create a markdown file and push — Hugo + GitHub Actions will auto-convert it to a styled HTML page.

**Option 1 — Local:**
```bash
hugo new posts/my-new-post/index.md
# Edit the file, commit, push → auto-deploys
```

**Option 2 — Directly on GitHub:**
1. Go to your repo on GitHub
2. Navigate to `content/posts/`
3. Create a new folder (e.g. `my-new-post`)
4. Inside it, create `index.md` with this template:

```markdown
---
title: "Your Post Title"
date: 2026-03-22
draft: false
description: "A short summary for previews and SEO."
tags: ["AI", "Automation"]
categories: ["AI & Automation"]
showTableOfContents: true
---

Your markdown content here. Use **bold**, *italic*, `code`, lists, images — anything.
```

5. Commit → GitHub Actions auto-builds and deploys the HTML page

## Deployment

The site auto-deploys to GitHub Pages via GitHub Actions on every push to `main`.

### First-time GitHub Setup

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Under **Source**, select `gh-pages` branch
4. The site will be live at `https://<username>.github.io/<repo-name>/`

### Update `baseURL`

Before deploying, update the `baseURL` in `config/_default/hugo.toml` to match your GitHub Pages URL:

```toml
baseURL = "https://<username>.github.io/<repo-name>/"
```

## License

Content © Miguel Côrte. Theme by [Blowfish](https://blowfish.page/).
