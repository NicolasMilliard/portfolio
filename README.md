# Minimalistic portfolio

Personal portfolio and technical writing, built with React, TypeScript, and
Vite.

## Development

```bash
bun install
bun run dev
bun run check
```

`check` runs lint, tests, TypeScript checks, and the production build. To test
Cloudflare Pages middleware locally, build first, then run
`npx wrangler pages dev dist`.

## Writing an article

Add a `.md` or `.mdx` file to `src/content/writings`. Its lowercase,
hyphen-separated filename becomes the article's URL slug.

```yaml
---
title: 'Article title'
description: 'A short summary of the article.'
publishedAt: 'YYYY-MM-DD'
---
```

Optional metadata includes `updatedAt`, `seoTitle`, `image`, and `draft`. See
existing articles for examples. Set `draft: true` to exclude an article from the
site. The build generates published pages and the sitemap automatically.

## Standalone projects

The botanical garden lives at `/botanical`, with its components, styles, and
fonts in `src/features/botanical`. Its homepage entry is defined in
`src/data/portfolio.ts`; internal project links use the router. Metadata lives
in `src/seo.ts`, and `src/entry-server.tsx` registers its HTML, route stylesheet,
Markdown representation, and sitemap entry for the production build.

## Botanical social image

To prepare the 1200 × 630 share card using the current SVG drawings and fonts:

```bash
node scripts/prepare-botanical-social-card.mjs
```

With the dev server running, open
`/node_modules/.tmp/botanical-social-card.html` at a 1200 × 630 CSS-pixel
viewport and capture it as `public/og/botanical.jpg`. The temporary HTML stays
outside the production build. The build checks the image format and dimensions
against the page metadata.
