import { StaticImageData } from 'next/image';
import screenplanner from '../../public/images/projects/screenplanner.png';
import smartvote from '../../public/images/projects/smartvote.png';
import koppo from '../../public/images/projects/koppo.png';

interface Project {
  title: string;
  link: string;
  image: StaticImageData;
  description: string;
  tools: string[];
}

export const projectsList: Project[] = [
  {
    title: 'ScreenPlanner',
    link: '',
    image: screenplanner,
    description:
      'ScreenPlanner allows users to add TV series to their watchlist and discover new TV series and actors.',
    tools: ['Next.js', 'Redux', 'TailwindCSS', 'Toastify', 'External API', 'TypeScript'],
  },
  {
    title: 'SmartVote',
    link: '',
    image: smartvote,
    description:
      'SmartVote allows users to organize their owns voting instance, whitelist users, add proposals and tally votes. Working on Polygon and Avalanche.',
    tools: [
      'Next.js',
      'Hardhat',
      'Ethers',
      'The Graph',
      'Wagmi',
      'Rainbow Kit',
      'TailwindCSS',
      'Toastify',
      'Multi-chains',
    ],
  },
  {
    title: 'Koppo',
    link: '',
    image: koppo,
    description:
      'Koppo simplifies the process of applying for Energy Savings Certificates (ESC) and ensures their traceability in full transparency thanks to the Polygon Blockchain.',
    tools: ['Next.js', 'Hardhat', 'Ethers', 'Wagmi', 'Rainbow Kit', 'TailwindCSS', 'Toastify'],
  },
];
