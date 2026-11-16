import { defineConfig } from "oxfmt";
import ultracite from "ultracite/oxfmt";

export default defineConfig({
  ...ultracite,
  ignorePatterns: [
    ...ultracite.ignorePatterns,
    "output/**",
    "public/**",
    "src/content/**/*.md",
    "src/content/**/*.mdx",
  ],
});
