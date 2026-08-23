# Minimalistic portfolio

## Writing an article

Add a Markdown or MDX file to `src/content/writings`. Its filename becomes the
URL slug, so use lowercase, hyphen-separated words.

```yaml
---
title: 'A clear article title'
description: 'A specific summary that helps readers understand the article.'
publishedAt: '2026-08-20'
updatedAt: '2026-08-24' # Optional; only add after a meaningful update.
seoTitle: 'A shorter search title' # Optional; the visible title stays unchanged.
image: # Optional; the site-wide image is the fallback.
  src: '/og/articles/a-clear-article-title-v1.png'
  alt: 'A concise description of what the preview image shows'
  width: 1200
  height: 630
draft: false # Optional; drafts are excluded from the site and sitemap.
---
```

Unique article images are recommended for useful, recognizable link previews.
Use an absolute-root path to a file in `public`, meaningful alt text, and a
versioned filename because social platforms cache previews. `1200 × 630` is a
practical default size; keep essential text and artwork away from the edges.

## SEO build

`bun run build` validates article frontmatter, prerenders the homepage and every
published article, creates a real `404.html`, and generates `sitemap.xml` from
the same article data. It also checks that local social images exist and match
their declared format and dimensions. The generated sitemap is written to both
`dist/sitemap.xml` and `public/sitemap.xml`; do not maintain its URL list
manually.
