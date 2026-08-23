import type { Writing, WritingImage } from './content/writings';
import { links, profile } from './data/portfolio';

const SITE_ORIGIN = 'https://milliard.dev';
const SITE_LOCALE = 'en_US';
const SITE_LANGUAGE = 'en';
const TWITTER_HANDLE = '@NicolasMilliard';

const defaultImage = {
  src: '/og-image.png',
  alt: 'Nicolas Milliard portfolio',
  width: 1200,
  height: 630,
} satisfies WritingImage;

type ResolvedImage = Omit<WritingImage, 'src'> & {
  url: string;
  type: 'image/jpeg' | 'image/png' | 'image/webp';
};

type StructuredData = Record<string, unknown>;

export type SeoPage = {
  title: string;
  description: string;
  robots: string;
  canonicalUrl?: string;
  type?: 'website' | 'article';
  image?: ResolvedImage;
  publishedAt?: string;
  modifiedAt?: string;
  structuredData?: StructuredData;
};

export type PrerenderPage = {
  path: string;
  outputFile: string;
  seo: SeoPage;
  includeInSitemap: boolean;
  lastModified?: string;
};

type SeoMetaTag =
  { name: string; content: string } | { property: string; content: string };

export const siteConfig = {
  origin: SITE_ORIGIN,
  name: profile.name,
  locale: SITE_LOCALE,
  language: SITE_LANGUAGE,
};

const absoluteUrl = (path: string) => new URL(path, `${SITE_ORIGIN}/`).href;

const isoDate = (date: string) => `${date}T00:00:00.000Z`;

const getImageType = (src: string): ResolvedImage['type'] => {
  const pathname = new URL(src, `${SITE_ORIGIN}/`).pathname.toLowerCase();

  if (pathname.endsWith('.jpg') || pathname.endsWith('.jpeg')) {
    return 'image/jpeg';
  }

  if (pathname.endsWith('.webp')) {
    return 'image/webp';
  }

  if (pathname.endsWith('.png')) {
    return 'image/png';
  }

  throw new Error(`Unsupported social image format: ${src}`);
};

const resolveImage = (image: WritingImage = defaultImage): ResolvedImage => ({
  url: absoluteUrl(image.src),
  alt: image.alt,
  width: image.width,
  height: image.height,
  type: getImageType(image.src),
});

const author = {
  '@type': 'Person',
  '@id': `${absoluteUrl('/')}#person`,
  name: profile.name,
  url: absoluteUrl('/'),
  jobTitle: profile.title,
  sameAs: links.map(({ href }) => href),
};

const homeDescription =
  'Portfolio of Nicolas Milliard, a Senior Frontend Engineer focused on frontend architecture, design systems, performance, and reliable user experiences.';

export const homeSeo: SeoPage = {
  title: `${profile.name} — ${profile.title}`,
  description: homeDescription,
  robots: 'index, follow, max-image-preview:large',
  canonicalUrl: absoluteUrl('/'),
  type: 'website',
  image: resolveImage(),
  structuredData: {
    '@context': 'https://schema.org',
    '@graph': [
      author,
      {
        '@type': 'WebSite',
        '@id': `${absoluteUrl('/')}#website`,
        name: profile.name,
        url: absoluteUrl('/'),
        inLanguage: SITE_LANGUAGE,
        publisher: { '@id': author['@id'] },
      },
    ],
  },
};

export const notFoundSeo: SeoPage = {
  title: `Page not found | ${profile.name}`,
  description: 'The requested page could not be found.',
  robots: 'noindex, nofollow',
};

export const getWritingSeo = (writing: Writing): SeoPage => {
  const canonicalUrl = absoluteUrl(`/writing/${writing.slug}`);
  const image = resolveImage(writing.image);
  const publishedAt = isoDate(writing.publishedAt);
  const modifiedAt = isoDate(writing.updatedAt ?? writing.publishedAt);

  return {
    title: `${writing.seoTitle ?? writing.title} | ${profile.name}`,
    description: writing.description,
    robots: 'index, follow, max-image-preview:large',
    canonicalUrl,
    type: 'article',
    image,
    publishedAt,
    modifiedAt,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${canonicalUrl}#article`,
      headline: writing.title,
      description: writing.description,
      url: canonicalUrl,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl,
      },
      image: {
        '@type': 'ImageObject',
        url: image.url,
        width: image.width,
        height: image.height,
      },
      datePublished: publishedAt,
      dateModified: modifiedAt,
      author,
      publisher: { '@id': author['@id'] },
      inLanguage: SITE_LANGUAGE,
    },
  };
};

const getSeoMetaTags = (seo: SeoPage): SeoMetaTag[] => {
  const tags: SeoMetaTag[] = [
    { name: 'description', content: seo.description },
    { name: 'robots', content: seo.robots },
  ];

  if (!seo.canonicalUrl || !seo.type || !seo.image) {
    return tags;
  }

  tags.push(
    { property: 'og:type', content: seo.type },
    { property: 'og:title', content: seo.title },
    { property: 'og:description', content: seo.description },
    { property: 'og:url', content: seo.canonicalUrl },
    { property: 'og:site_name', content: profile.name },
    { property: 'og:locale', content: SITE_LOCALE },
    { property: 'og:image', content: seo.image.url },
    { property: 'og:image:secure_url', content: seo.image.url },
    { property: 'og:image:type', content: seo.image.type },
    { property: 'og:image:width', content: String(seo.image.width) },
    { property: 'og:image:height', content: String(seo.image.height) },
    { property: 'og:image:alt', content: seo.image.alt },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:creator', content: TWITTER_HANDLE },
    { name: 'twitter:title', content: seo.title },
    { name: 'twitter:description', content: seo.description },
    { name: 'twitter:image', content: seo.image.url },
    { name: 'twitter:image:alt', content: seo.image.alt },
  );

  if (seo.type === 'article' && seo.publishedAt && seo.modifiedAt) {
    tags.push(
      { property: 'article:published_time', content: seo.publishedAt },
      { property: 'article:modified_time', content: seo.modifiedAt },
      { property: 'article:author', content: absoluteUrl('/') },
    );
  }

  return tags;
};

export const seoToRouteHead = (seo: SeoPage) => {
  return {
    meta: [{ title: seo.title }, ...getSeoMetaTags(seo)],
    links: seo.canonicalUrl
      ? [{ rel: 'canonical', href: seo.canonicalUrl }]
      : [],
    scripts: seo.structuredData
      ? [
          {
            type: 'application/ld+json',
            children: serializeStructuredData(seo.structuredData),
          },
        ]
      : [],
  };
};

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const serializeStructuredData = (data: StructuredData) =>
  JSON.stringify(data).replaceAll('<', '\\u003c');

export const renderSeoHead = (seo: SeoPage) => {
  const tags = getSeoMetaTags(seo).map((tag) => {
    if ('name' in tag) {
      return `<meta data-seo-static name="${escapeHtml(tag.name)}" content="${escapeHtml(tag.content)}" />`;
    }

    return `<meta data-seo-static property="${escapeHtml(tag.property)}" content="${escapeHtml(tag.content)}" />`;
  });

  tags.unshift(`<title data-seo-static>${escapeHtml(seo.title)}</title>`);

  if (seo.canonicalUrl) {
    tags.push(
      `<link data-seo-static rel="canonical" href="${escapeHtml(seo.canonicalUrl)}" />`,
    );
  }

  if (seo.structuredData) {
    tags.push(
      `<script data-seo-static type="application/ld+json">${serializeStructuredData(seo.structuredData)}</script>`,
    );
  }

  return tags.join('\n    ');
};

const escapeXml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

export const renderSitemap = (pages: PrerenderPage[]) => {
  const urls = pages
    .filter(({ includeInSitemap, seo }) => includeInSitemap && seo.canonicalUrl)
    .map(({ seo, lastModified }) => {
      const lastModifiedElement = lastModified
        ? `\n    <lastmod>${escapeXml(lastModified)}</lastmod>`
        : '';

      return `  <url>\n    <loc>${escapeXml(seo.canonicalUrl!)}</loc>${lastModifiedElement}\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
};
