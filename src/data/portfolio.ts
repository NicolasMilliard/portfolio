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
    'Senior Frontend Engineer with 10 years of experience building scalable product interfaces and modern web applications.',
    'Focused on frontend architecture, design systems, performance, and reliable user experiences.',
    'I enjoy building products that are fast, maintainable, accessible, and easy for teams to evolve.',
  ],
} satisfies Profile;

export const projects = [
  {
    title: 'inBio',
    description: 'Decentralized link-in-bio platform.',
    link: '',
  },
] satisfies Project[];

export const links = [
  { label: 'GitHub', href: 'https://github.com/nicolasmilliard' },
  { label: 'X/Twitter', href: 'https://x.com/NicolasMilliard' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nicolas-milliard/' },
] satisfies SocialLink[];
