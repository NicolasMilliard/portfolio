import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import mdx from "@mdx-js/rollup";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { rehypePrettyCode } from "rehype-pretty-code";
import type { Options } from "rehype-pretty-code";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import githubLight from "shiki/themes/github-light.mjs";
import { defineConfig } from "vite";
import type { Plugin } from "vite";
import { parse } from "yaml";

const writingsDirectory = fileURLToPath(
  new URL("src/content/writings", import.meta.url)
);
const writingsMetadataModule = "virtual:writings-metadata";
const resolvedWritingsMetadataModule = `\0${writingsMetadataModule}`;

const writingMetadataPlugin = (): Plugin => ({
  name: "writing-metadata",
  resolveId(id) {
    return id === writingsMetadataModule
      ? resolvedWritingsMetadataModule
      : undefined;
  },
  load(id) {
    if (id !== resolvedWritingsMetadataModule) {
      return;
    }

    const entries = readdirSync(writingsDirectory)
      .filter((filename) => /\.mdx?$/u.test(filename))
      .toSorted()
      .map((filename) => {
        const filePath = path.join(writingsDirectory, filename);
        const source = readFileSync(filePath, "utf-8");
        const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/u.exec(
          source
        );

        if (!frontmatter?.[1]) {
          throw new Error(`${filePath}: missing YAML frontmatter`);
        }

        this.addWatchFile(filePath);

        return {
          filename,
          metadataPath: `./writings/${filename}`,
          metadata: parse(frontmatter[1]) as { draft?: unknown } | null,
        };
      });
    const metadataByPath = Object.fromEntries(
      entries.map(({ metadataPath, metadata }) => [metadataPath, metadata])
    );
    const publishedLoaders = entries
      .filter(({ metadata }) => metadata?.draft !== true)
      .map(
        ({ filename, metadataPath }) =>
          `${JSON.stringify(metadataPath)}: () => import(${JSON.stringify(`/src/content/writings/${filename}`)})`
      )
      .join(",");

    return `export const writingModuleLoaders = {${publishedLoaders}};\nexport default ${JSON.stringify(metadataByPath)};`;
  },
  handleHotUpdate({ file, modules, server }) {
    if (path.dirname(file) !== writingsDirectory || !/\.mdx?$/u.test(file)) {
      return;
    }

    const metadataModule = server.moduleGraph.getModuleById(
      resolvedWritingsMetadataModule
    );

    if (metadataModule) {
      server.moduleGraph.invalidateModule(metadataModule);
      return [...new Set([...modules, metadataModule])];
    }

    return modules;
  },
});

const prettyCodeOptions = {
  theme: {
    ...githubLight,
    name: "portfolio-light",
    colorReplacements: {
      "#24292e": "var(--foreground)",
      "#6a737d": "var(--muted)",
      "#586069": "var(--muted)",
      "#005cc5": "var(--code-constant)",
      "#6f42c1": "var(--code-function)",
      "#032f62": "var(--code-string)",
      "#22863a": "var(--code-inserted)",
      "#b31d28": "var(--code-deleted)",
      "#d73a49": "var(--accent)",
      "#e36209": "var(--ink-ochre)",
      "#fafbfc": "var(--paper-light)",
      "#f6f8fa": "var(--paper-light)",
      "#ffeef0": "var(--paper-shade)",
      "#f0fff4": "var(--paper-shade)",
      "#ffebda": "var(--paper-shade)",
    },
  },
  keepBackground: false,
  bypassInlineCode: true,
  defaultLang: {
    block: "plaintext",
  },
} satisfies Options;

// https://vite.dev/config/
export default defineConfig({
  build: { manifest: true },
  plugins: [
    writingMetadataPlugin(),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    {
      enforce: "pre",
      ...mdx({
        remarkPlugins: [
          remarkFrontmatter,
          [remarkMdxFrontmatter, { name: "metadata" }],
        ],
        rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
      }),
    },
    react({ include: /\.(js|jsx|md|mdx|ts|tsx)$/u }),
  ],
});
