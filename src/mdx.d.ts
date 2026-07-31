declare module '*.mdx' {
  export const metadata: {
    title: string;
    description: string;
    publishedAt: string;
  };
}

declare module '*.md' {
  export const metadata: {
    title: string;
    description: string;
    publishedAt: string;
  };
}
