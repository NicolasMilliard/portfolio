import { links, profile, projects } from '../data/portfolio';

export type InformationPage = {
  path: '/about' | '/contact' | '/privacy';
  title: string;
  description: string;
  paragraphs: string[];
  links: { label: string; href: string }[];
};

export const informationPages: InformationPage[] = [
  {
    path: '/about',
    title: `About me`,
    description:
      'The frontend engineering experience, interests, writing, and projects of Nicolas Milliard.',
    paragraphs: [
      ...profile.about,
      'This portfolio brings together my projects and writing. My articles describe decisions from projects I have worked on.',
      `My projects include ${projects.map(({ title }) => title).join(', ')}. You can find their descriptions and links on the homepage, alongside my published articles.`,
    ],
    links: [{ label: 'Read my writing', href: '/#writing' }, ...links],
  },
  {
    path: '/contact',
    title: `Contact me`,
    description:
      'Find Nicolas Milliard on LinkedIn, GitHub, and X for professional conversations and project discussions.',
    paragraphs: [
      ...profile.about,
      'For professional conversations about React, TypeScript, design systems, or frontend architecture, find me on LinkedIn. For code and technical discussions about an open-source project, start with my GitHub profile and the relevant repository.',
      'I also link to my X profile. Each service provides its own ways to follow or contact people, and its own privacy settings. This website has no contact form: following a profile link takes you to that external service.',
      'If your question relates to an article or project, include its title or URL and the specific topic you would like to discuss. The homepage lists my projects and writing so you can find the relevant source.',
    ],
    links,
  },
  {
    path: '/privacy',
    title: 'Privacy on milliard.dev',
    description:
      'How this personal portfolio is delivered, its approach to analytics, and what happens when you follow external links.',
    paragraphs: [
      'This is the personal portfolio of Nicolas Milliard. It presents information about my frontend engineering work, projects, and published articles. It does not use visitor analytics and does not provide a contact form or ask you to create an account.',
      'The website is hosted on Cloudflare Pages. Delivering pages requires your browser to send requests to Cloudflare, including your IP address, the requested URL, and normal request headers. Cloudflare may process request information for delivery and security under its own policies.',
      "I have not added advertising trackers or analytics cookies to this portfolio. Cloudflare delivery and security features may use technical browser storage or cookies for their operation. You can read about the provider's handling of request information in its privacy policy, linked below.",
      'If you have a question about this portfolio or this notice, use one of the profiles linked from the homepage. ',
    ],
    links: [
      { label: "Nicolas Milliard's profiles", href: '/' },
      {
        label: 'Cloudflare privacy policy',
        href: 'https://www.cloudflare.com/privacypolicy/',
      },
    ],
  },
];

export const getInformationPage = (path: InformationPage['path']) =>
  informationPages.find((page) => page.path === path)!;
