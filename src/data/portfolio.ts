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
    'I’ve spent the last ten years building interfaces and the frontend foundations behind them. I work with React, TypeScript, and design systems to make complex products easier to use and maintain.',
    'I care about how an interface feels to use, how well it performs, and how easy it is for the next person to work on.',
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
