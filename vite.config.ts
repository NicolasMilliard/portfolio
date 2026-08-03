import mdx from '@mdx-js/rollup';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import rehypePrettyCode, { type Options } from 'rehype-pretty-code';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { defineConfig } from 'vite';

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
