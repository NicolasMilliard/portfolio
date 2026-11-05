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
