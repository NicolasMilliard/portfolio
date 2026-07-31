import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

export type Writing = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
};

type WritingMetadata = Omit<Writing, 'slug'>;

type WritingModule = {
  default: ComponentType;
  metadata: WritingMetadata;
};

type WritingWithContent = Writing & {
  Content: LazyExoticComponent<ComponentType>;
};

const writingModules = import.meta.glob<WritingModule>('./writings/*.mdx');
const writingMetadata = import.meta.glob<WritingMetadata>('./writings/*.mdx', {
  eager: true,
  import: 'metadata',
});

const getSlugFromPath = (path: string) =>
  path
    .split('/')
    .at(-1)
    ?.replace(/\.mdx$/, '') ?? '';

const writingsWithContent = Object.entries(writingMetadata)
  .map(([path, metadata]) => {
    const loadWriting = writingModules[path];

    if (!loadWriting) {
      throw new Error(`No MDX module found for ${path}`);
    }

    return {
      ...metadata,
      slug: getSlugFromPath(path),
      Content: lazy(loadWriting),
    } satisfies WritingWithContent;
  })
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

const writingsBySlug = new Map(
  writingsWithContent.map((writing) => [writing.slug, writing]),
);

export const writings = writingsWithContent.map(
  ({ slug, title, description, publishedAt }) => ({
    slug,
    title,
    description,
    publishedAt,
  }),
);

export const getWriting = (slug: string) => writingsBySlug.get(slug);

const publishedDateFormatter = new Intl.DateTimeFormat('en', {
  dateStyle: 'long',
  timeZone: 'UTC',
});

export const formatPublishedDate = (publishedAt: string) =>
  publishedDateFormatter.format(new Date(`${publishedAt}T00:00:00Z`));
