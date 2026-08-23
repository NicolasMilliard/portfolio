declare module 'virtual:writings-metadata' {
  const metadata: Record<string, unknown>;
  export const writingModuleLoaders: Record<
    string,
    () => Promise<unknown>
  >;
  export default metadata;
}

declare module '*.mdx' {
  export const metadata: {
    title: string;
    description: string;
    publishedAt: string;
    updatedAt?: string;
    seoTitle?: string;
    image?: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
    draft?: boolean;
  };
}

declare module '*.md' {
  export const metadata: {
    title: string;
    description: string;
    publishedAt: string;
    updatedAt?: string;
    seoTitle?: string;
    image?: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
    draft?: boolean;
  };
}
