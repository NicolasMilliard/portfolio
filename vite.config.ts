import mdx from '@mdx-js/rollup';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import rehypePrettyCode, { type Options } from 'rehype-pretty-code';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { defineConfig, type Plugin } from 'vite';
import { parse } from 'yaml';

const writingsDirectory = fileURLToPath(
  new URL('./src/content/writings', import.meta.url),
);
const writingsMetadataModule = 'virtual:writings-metadata';
const resolvedWritingsMetadataModule = `\0${writingsMetadataModule}`;

const writingMetadataPlugin = (): Plugin => ({
  name: 'writing-metadata',
  resolveId(id) {
    return id === writingsMetadataModule
      ? resolvedWritingsMetadataModule
      : undefined;
  },
  load(id) {
    if (id !== resolvedWritingsMetadataModule) {
      return undefined;
    }

    const entries = readdirSync(writingsDirectory)
      .filter((filename) => /\.mdx?$/.test(filename))
      .sort()
      .map((filename) => {
        const filePath = path.join(writingsDirectory, filename);
        const source = readFileSync(filePath, 'utf8');
        const frontmatter = source.match(
          /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/,
        );

        if (!frontmatter?.[1]) {
          throw new Error(`${filePath}: missing YAML frontmatter`);
        }

        this.addWatchFile(filePath);

        return {
          filename,
          metadataPath: `./writings/${filename}`,
          metadata: parse(frontmatter[1]),
        };
      });
    const metadataByPath = Object.fromEntries(
      entries.map(({ metadataPath, metadata }) => [metadataPath, metadata]),
    );
    const publishedLoaders = entries
      .filter(({ metadata }) => metadata?.draft !== true)
      .map(
        ({ filename, metadataPath }) =>
          `${JSON.stringify(metadataPath)}: () => import(${JSON.stringify(`/src/content/writings/${filename}`)})`,
      )
      .join(',');

    return `export const writingModuleLoaders = {${publishedLoaders}};\nexport default ${JSON.stringify(metadataByPath)};`;
  },
  handleHotUpdate({ file, modules, server }) {
    if (
      path.dirname(file) !== writingsDirectory ||
      !/\.mdx?$/.test(file)
    ) {
      return;
    }

    const metadataModule = server.moduleGraph.getModuleById(
      resolvedWritingsMetadataModule,
    );

    if (metadataModule) {
      server.moduleGraph.invalidateModule(metadataModule);
      return [...new Set([...modules, metadataModule])];
    }

    return modules;
  },
});

const prettyCodeOptions = {
  theme: 'github-light',
  keepBackground: false,
  bypassInlineCode: true,
  defaultLang: {
    block: 'plaintext',
  },
} satisfies Options;

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    writingMetadataPlugin(),
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [
          remarkFrontmatter,
          [remarkMdxFrontmatter, { name: 'metadata' }],
        ],
        rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
      }),
    },
    react({ include: /\.(js|jsx|md|mdx|ts|tsx)$/ }),
  ],
});
