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

## Image and font assets

The watercolor WebP assets in `public/images/brand` use quality 82, compression
method 6, and lossless alpha (`alpha_quality=100`), encoded with Pillow 13.0.0.
Generate responsive variants from the original artwork with Lanczos resampling:
companions at 480/768/960px, the portrait at 320/480/640px, and the skating
character at 256/480px. Start from the original artwork when updating images to
avoid repeated lossy compression.

The companions image is requested after clicking “Meet the studio assistants.”
Keep its stage dimensions reserved while it loads so the page does not shift.

See [`src/fonts/README.md`](src/fonts/README.md) for font coverage and subsetting.

## Code organization

- `src/routes` owns URLs, route metadata, and article loading.
- `src/components` contains the homepage sections, drawing components, motion,
  and the information-page component.
- `src/hooks` holds shared React hooks; `src/styles` contains global, homepage,
  and shared article styles.
- `src/features/404` contains the interactive 404 page.
- `src/features/writing` contains the article page, section navigation, heading
  links, image viewer, and writing-specific styles.
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
