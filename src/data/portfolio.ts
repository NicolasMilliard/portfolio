export type Profile = {
  name: string;
  title: string;
  about: string[];
};

export type Project = {
  title: string;
  description: string;
  link: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export const profile = {
  name: 'Nicolas Milliard',
  title: 'Senior Frontend Engineer',
  about: [
    'Senior Frontend Engineer with 10 years of experience designing high-performance interfaces and scalable frontend architectures that evolve with product needs. Specializing in React, TypeScript, and design systems, I combine technical excellence, user experience, and maintainability to build robust, long-lasting products.',
  ],
} satisfies Profile;

export const projects = [
  {
    title: 'Gestik',
    description: 'Visual component library for representing user interactions.',
    link: 'https://nicolasmilliard.github.io/gestik/',
  },
  {
    title: 'YouTube Essentials',
    description: 'Browser extension for customizing the YouTube interface.',
    link: 'https://github.com/NicolasMilliard/youtube-essentials',
  },
  {
    title: '3bio',
    description:
      'Decentralized alternative to link-in-bio platforms, built on Web3 technologies.',
    link: 'https://3bio.social/',
  },
] satisfies Project[];

export const links = [
  { label: 'GitHub', href: 'https://github.com/nicolasmilliard' },
  { label: 'X/Twitter', href: 'https://x.com/NicolasMilliard' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nicolas-milliard/' },
] satisfies SocialLink[];
