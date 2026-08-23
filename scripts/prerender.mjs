import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { createServer } from 'vite';

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);
const distDirectory = path.join(projectRoot, 'dist');
const publicDirectory = path.join(projectRoot, 'public');
const templatePath = path.join(distDirectory, 'index.html');
const seoBlockPattern = /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/;
const emptyRoot = '<div id="root"></div>';

const assertUnique = (values, label) => {
  const duplicates = values.filter(
    (value, index) => values.indexOf(value) !== index,
  );

  if (duplicates.length > 0) {
    throw new Error(`Duplicate ${label}: ${[...new Set(duplicates)].join(', ')}`);
  }
};

const readThreeByteInteger = (buffer, offset) =>
  buffer[offset] | (buffer[offset + 1] << 8) | (buffer[offset + 2] << 16);

const readJpegMetadata = (buffer) => {
  const startOfFrameMarkers = new Set([
    0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce,
    0xcf,
  ]);
  let offset = 2;

  while (offset < buffer.length) {
    while (buffer[offset] === 0xff) {
      offset += 1;
    }

    const marker = buffer[offset];
    offset += 1;

    if (marker === 0xd9 || marker === 0xda) {
      break;
    }

    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd8)) {
      continue;
    }

    if (offset + 2 > buffer.length) {
      break;
    }

    const segmentLength = buffer.readUInt16BE(offset);

    if (segmentLength < 2 || offset + segmentLength > buffer.length) {
      break;
    }

    if (startOfFrameMarkers.has(marker) && segmentLength >= 7) {
      return {
        type: 'image/jpeg',
        width: buffer.readUInt16BE(offset + 5),
        height: buffer.readUInt16BE(offset + 3),
      };
    }

    offset += segmentLength;
  }

  throw new Error('Could not read JPEG dimensions');
};

const readWebpMetadata = (buffer) => {
  let offset = 12;

  while (offset + 8 <= buffer.length) {
    const chunkType = buffer.toString('ascii', offset, offset + 4);
    const chunkSize = buffer.readUInt32LE(offset + 4);
    const dataOffset = offset + 8;

    if (dataOffset + chunkSize > buffer.length) {
      break;
    }

    if (chunkType === 'VP8X' && chunkSize >= 10) {
      return {
        type: 'image/webp',
        width: readThreeByteInteger(buffer, dataOffset + 4) + 1,
        height: readThreeByteInteger(buffer, dataOffset + 7) + 1,
      };
    }

    if (
      chunkType === 'VP8L' &&
      chunkSize >= 5 &&
      buffer[dataOffset] === 0x2f
    ) {
      const byte1 = buffer[dataOffset + 1];
      const byte2 = buffer[dataOffset + 2];
      const byte3 = buffer[dataOffset + 3];
      const byte4 = buffer[dataOffset + 4];

      return {
        type: 'image/webp',
        width: 1 + byte1 + ((byte2 & 0x3f) << 8),
        height:
          1 + (byte2 >> 6) + (byte3 << 2) + ((byte4 & 0x0f) << 10),
      };
    }

    if (
      chunkType === 'VP8 ' &&
      chunkSize >= 10 &&
      buffer[dataOffset + 3] === 0x9d &&
      buffer[dataOffset + 4] === 0x01 &&
      buffer[dataOffset + 5] === 0x2a
    ) {
      return {
        type: 'image/webp',
        width: buffer.readUInt16LE(dataOffset + 6) & 0x3fff,
        height: buffer.readUInt16LE(dataOffset + 8) & 0x3fff,
      };
    }

    offset = dataOffset + chunkSize + (chunkSize % 2);
  }

  throw new Error('Could not read WebP dimensions');
};

const readImageMetadata = (buffer) => {
  if (
    buffer.length >= 24 &&
    buffer.subarray(0, 8).equals(
      Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    )
  ) {
    return {
      type: 'image/png',
      width: buffer.readUInt32BE(16),
      height: buffer.readUInt32BE(20),
    };
  }

  if (buffer.length >= 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    return readJpegMetadata(buffer);
  }

  if (
    buffer.length >= 30 &&
    buffer.toString('ascii', 0, 4) === 'RIFF' &&
    buffer.toString('ascii', 8, 12) === 'WEBP'
  ) {
    return readWebpMetadata(buffer);
  }

  throw new Error('Unsupported or invalid social image file');
};

const assertLocalImageExists = async (page) => {
  if (!page.seo.image) {
    return;
  }

  const imageUrl = new URL(page.seo.image.url);

  if (imageUrl.origin !== 'https://milliard.dev') {
    return;
  }

  const relativeImagePath = decodeURIComponent(imageUrl.pathname).replace(
    /^\/+/,
    '',
  );
  const imagePath = path.join(publicDirectory, relativeImagePath);
  const relativePath = path.relative(publicDirectory, imagePath);

  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    throw new Error(`Unsafe social image path: ${imageUrl.pathname}`);
  }

  await access(imagePath);

  const imageMetadata = readImageMetadata(await readFile(imagePath));

  if (
    imageMetadata.type !== page.seo.image.type ||
    imageMetadata.width !== page.seo.image.width ||
    imageMetadata.height !== page.seo.image.height
  ) {
    throw new Error(
      `${imageUrl.pathname}: declared ${page.seo.image.type} ${page.seo.image.width}x${page.seo.image.height}, actual ${imageMetadata.type} ${imageMetadata.width}x${imageMetadata.height}`,
    );
  }
};

const buildDocument = ({ template, appHtml, seoHead }) => {
  if (!seoBlockPattern.test(template)) {
    throw new Error('SEO marker block was not found in dist/index.html');
  }

  if (!template.includes(emptyRoot)) {
    throw new Error('Empty root element was not found in dist/index.html');
  }

  return template
    .replace(
      seoBlockPattern,
      `<!-- seo:start -->\n    ${seoHead}\n    <!-- seo:end -->`,
    )
    .replace(emptyRoot, `<div id="root">${appHtml}</div>`);
};

const assertRenderedDocument = (document, page) => {
  const requirements = [
    ['a title', '<title data-seo-static>'],
    ['a description', 'name="description"'],
    ['robots metadata', 'name="robots"'],
    ['a primary heading', '<h1'],
  ];

  if (page.seo.canonicalUrl) {
    requirements.push(
      ['a canonical URL', 'rel="canonical"'],
      ['an Open Graph URL', 'property="og:url"'],
      ['an absolute social image', 'content="https://'],
      ['structured data', 'type="application/ld+json"'],
    );
  }

  for (const [label, value] of requirements) {
    if (!document.includes(value)) {
      throw new Error(`${page.path} was rendered without ${label}`);
    }
  }
};

const template = await readFile(templatePath, 'utf8');
const vite = await createServer({
  root: projectRoot,
  appType: 'custom',
  logLevel: 'error',
  server: { middlewareMode: true, hmr: false, ws: false },
});

try {
  const [{ getPrerenderPages, renderPage }, { renderSeoHead, renderSitemap }] =
    await Promise.all([
      vite.ssrLoadModule('/src/entry-server.tsx'),
      vite.ssrLoadModule('/src/seo.ts'),
    ]);
  const pages = getPrerenderPages();

  assertUnique(
    pages.map(({ path: pagePath }) => pagePath),
    'prerender paths',
  );
  assertUnique(
    pages.map(({ outputFile }) => outputFile),
    'prerender output files',
  );

  for (const page of pages) {
    await assertLocalImageExists(page);

    const outputPath = path.resolve(distDirectory, page.outputFile);
    const relativeOutputPath = path.relative(distDirectory, outputPath);

    if (
      relativeOutputPath.startsWith('..') ||
      path.isAbsolute(relativeOutputPath)
    ) {
      throw new Error(`Unsafe prerender output path: ${page.outputFile}`);
    }

    const appHtml = await renderPage(page.path);
    const document = buildDocument({
      template,
      appHtml,
      seoHead: renderSeoHead(page.seo),
    });

    assertRenderedDocument(document, page);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, document);
  }

  const sitemap = renderSitemap(pages);

  await Promise.all([
    writeFile(path.join(distDirectory, 'sitemap.xml'), sitemap),
    writeFile(path.join(publicDirectory, 'sitemap.xml'), sitemap),
  ]);
} finally {
  await vite.close();
}
