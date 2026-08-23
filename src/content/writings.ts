import type { ComponentType } from 'react';
import rawWritingMetadata, {
  writingModuleLoaders as rawWritingModuleLoaders,
} from 'virtual:writings-metadata';

export type WritingImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type WritingMetadata = {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  seoTitle?: string;
  image?: WritingImage;
  draft?: boolean;
};

export type Writing = Omit<WritingMetadata, 'draft'> & {
  slug: string;
};

export type WritingWithContent = Writing & {
  Content: ComponentType;
};

type WritingModule = {
  default: ComponentType;
  metadata: WritingMetadata;
};

type WritingRecord = {
  writing: Writing;
  loadModule: () => Promise<WritingModule>;
};

const writingModuleLoaders = rawWritingModuleLoaders as Record<
  string,
  () => Promise<WritingModule>
>;

const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const metadataFields = new Set([
  'title',
  'description',
  'publishedAt',
  'updatedAt',
  'seoTitle',
  'image',
  'draft',
]);
const imageFields = new Set(['src', 'alt', 'width', 'height']);

const getSlugFromPath = (path: string) =>
  path
    .split('/')
    .at(-1)
    ?.replace(/\.mdx?$/, '') ?? '';

const assertString = (
  value: unknown,
  field: string,
  path: string,
): string => {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${path}: ${field} must be a non-empty string`);
  }

  return value;
};

const assertDate = (value: unknown, field: string, path: string): string => {
  const date = assertString(value, field, path);

  const parsedDate = new Date(`${date}T00:00:00Z`);

  if (
    !datePattern.test(date) ||
    Number.isNaN(parsedDate.valueOf()) ||
    parsedDate.toISOString().slice(0, 10) !== date
  ) {
    throw new Error(`${path}: ${field} must use a valid YYYY-MM-DD date`);
  }

  return date;
};

const validateImage = (value: unknown, path: string): WritingImage | undefined => {
  if (value === undefined) {
    return undefined;
  }

  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${path}: image must be an object`);
  }

  const image = value as Record<string, unknown>;
  const unknownFields = Object.keys(image).filter(
    (field) => !imageFields.has(field),
  );
  const width = image.width;
  const height = image.height;

  if (unknownFields.length > 0) {
    throw new Error(
      `${path}: unknown image field(s): ${unknownFields.join(', ')}`,
    );
  }

  if (!Number.isInteger(width) || (width as number) <= 0) {
    throw new Error(`${path}: image.width must be a positive integer`);
  }

  if (!Number.isInteger(height) || (height as number) <= 0) {
    throw new Error(`${path}: image.height must be a positive integer`);
  }

  return {
    src: assertString(image.src, 'image.src', path),
    alt: assertString(image.alt, 'image.alt', path),
    width: width as number,
    height: height as number,
  };
};

const validateMetadata = (value: unknown, path: string): WritingMetadata => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${path}: frontmatter must export a metadata object`);
  }

  const metadata = value as Record<string, unknown>;
  const unknownFields = Object.keys(metadata).filter(
    (field) => !metadataFields.has(field),
  );

  if (unknownFields.length > 0) {
    throw new Error(
      `${path}: unknown frontmatter field(s): ${unknownFields.join(', ')}`,
    );
  }

  const publishedAt = assertDate(metadata.publishedAt, 'publishedAt', path);
  const updatedAt =
    metadata.updatedAt === undefined
      ? undefined
      : assertDate(metadata.updatedAt, 'updatedAt', path);

  if (updatedAt && updatedAt < publishedAt) {
    throw new Error(`${path}: updatedAt cannot be earlier than publishedAt`);
  }

  if (metadata.draft !== undefined && typeof metadata.draft !== 'boolean') {
    throw new Error(`${path}: draft must be a boolean`);
  }

  return {
    title: assertString(metadata.title, 'title', path),
    description: assertString(metadata.description, 'description', path),
    publishedAt,
    updatedAt,
    seoTitle:
      metadata.seoTitle === undefined
        ? undefined
        : assertString(metadata.seoTitle, 'seoTitle', path),
    image: validateImage(metadata.image, path),
    draft: metadata.draft,
  };
};

const seenSlugs = new Set<string>();

const writingRecords = Object.entries(rawWritingMetadata)
  .map(([path, rawMetadata]) => {
    const slug = getSlugFromPath(path);
    const metadata = validateMetadata(rawMetadata, path);
    const loadModule = writingModuleLoaders[path];

    if (!slugPattern.test(slug)) {
      throw new Error(
        `${path}: filename must produce a lowercase, hyphen-separated slug`,
      );
    }

    if (seenSlugs.has(slug)) {
      throw new Error(`${path}: duplicate writing slug "${slug}"`);
    }

    seenSlugs.add(slug);

    if (metadata.draft) {
      return undefined;
    }

    if (!loadModule) {
      throw new Error(`No Markdown module found for ${path}`);
    }

    const publishedMetadata: Omit<WritingMetadata, 'draft'> = {
      title: metadata.title,
      description: metadata.description,
      publishedAt: metadata.publishedAt,
      updatedAt: metadata.updatedAt,
      seoTitle: metadata.seoTitle,
      image: metadata.image,
    };

    return {
      writing: {
        ...publishedMetadata,
        slug,
      },
      loadModule,
    } satisfies WritingRecord;
  })
  .filter((record): record is WritingRecord => record !== undefined)
  .sort((a, b) =>
    b.writing.publishedAt.localeCompare(a.writing.publishedAt),
  );

const writingRecordsBySlug = new Map(
  writingRecords.map((record) => [record.writing.slug, record]),
);

export const writings = writingRecords.map(({ writing }) => writing);

export const getWriting = (slug: string) =>
  writingRecordsBySlug.get(slug)?.writing;

export const loadWriting = async (
  slug: string,
): Promise<WritingWithContent | undefined> => {
  const record = writingRecordsBySlug.get(slug);

  if (!record) {
    return undefined;
  }

  const writingModule = await record.loadModule();

  return {
    ...record.writing,
    Content: writingModule.default,
  };
};

const publishedDateFormatter = new Intl.DateTimeFormat('en', {
  dateStyle: 'long',
  timeZone: 'UTC',
});

export const formatPublishedDate = (publishedAt: string) =>
  publishedDateFormatter.format(new Date(`${publishedAt}T00:00:00Z`));
