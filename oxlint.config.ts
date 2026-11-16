import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";
import react from "ultracite/oxlint/react";
import tanstack from "ultracite/oxlint/tanstack";

export default defineConfig({
  env: core.env,
  extends: [core, react, tanstack],
  ignorePatterns: [...core.ignorePatterns, "output/**"],
  options: { typeAware: true },
  rules: {
    // React effects and Vite hooks deliberately return optional cleanup/results.
    "typescript/consistent-return": "off",
    "prefer-arrow-callback": ["error", { allowNamedFunctions: true }],
    // The type-aware rule recognizes async adapters that return a Promise.
    "require-await": "off",
    "typescript/require-await": "error",
    // Preserve hoisting and the existing React/component filename conventions.
    "func-style": "off",
    "no-use-before-define": ["error", { functions: false, variables: false }],
    "unicorn/filename-case": [
      "error",
      {
        cases: { kebabCase: true, camelCase: true, pascalCase: true },
      },
    ],
    // These forms are intentional idioms, not correctness constraints.
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
    "no-void": ["error", { allowAsStatement: true }],
    "prefer-named-capture-group": "off",
    "unicorn/no-array-for-each": "off",
    "unicorn/no-await-expression-member": "off",
    "unicorn/prefer-query-selector": "off",
    // Empty strings intentionally fall back to generated heading IDs/titles.
    "typescript/prefer-nullish-coalescing": [
      "error",
      { ignorePrimitives: { string: true } },
    ],
    // Assertions are needed at DOM, Vite SSR, and virtual-module boundaries.
    // Unsafe any assignments, calls, and returns are still checked.
    "typescript/no-unsafe-type-assertion": "off",
    "typescript/strict-boolean-expressions": [
      "error",
      {
        allowNullableBoolean: true,
        allowNullableString: true,
        allowNullableNumber: true,
      },
    ],
  },
  overrides: [
    {
      // Async API mocks can return Promise.resolve without an async wrapper.
      files: ["tests/**"],
      rules: { "typescript/promise-function-async": "off" },
    },
    {
      // Named canvas/button groups are not form fieldsets.
      files: ["src/features/404/NotFoundPage.tsx"],
      rules: { "jsx-a11y/prefer-tag-over-role": "off" },
    },
    {
      files: ["scripts/**", "tests/**", "*.config.ts"],
      env: { node: true },
    },
    {
      // Build output and table-driven tests run sequentially on purpose.
      files: ["scripts/prerender.ts", "tests/**", "**/__fixtures__/**"],
      rules: {
        "no-await-in-loop": "off",
      },
    },
    {
      // This test harness intentionally stubs capture and exercises try/finally.
      files: ["**/__fixtures__/**"],
      rules: { "react/todo": "off", "no-empty-function": "off" },
    },
    {
      // Canvas pixel arithmetic and PointerEvent.buttons use bit operations.
      files: [
        "src/features/404/**",
        "tests/coloring-watercolor.test.ts",
        "scripts/prerender.ts",
      ],
      rules: {
        "no-bitwise": "off",
      },
    },
  ],
});
