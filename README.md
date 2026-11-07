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

## Code organization

- `src/routes` owns URLs, route metadata, and article loading.
- `src/features/home` contains the homepage sections, drawing components,
  motion, and styles.
- `src/features/lost` contains the interactive 404 page.
- `src/components` holds the article and information-page components.
- `src/content` owns articles and page content; `src/data/portfolio.ts` provides
  profile, project, and social data shared with SEO.
- `scripts` contains build tooling: prerendering pages and generating Markdown
  and `llms.txt`.
- `tests` contains automated checks run by `bun run test` using Node's built-in
  test runner.

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
