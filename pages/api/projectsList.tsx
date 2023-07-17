import { StaticImageData } from 'next/image';
import insertdentaire from '../../public/images/projects/insertdentaire.png';
import smartvote from '../../public/images/projects/smartvote.png';
import kopo from '../../public/images/projects/kopo.png';

interface Project {
  title: string;
  link: string;
  image: StaticImageData;
  description: string;
  tools: string[];
  active: boolean;
}

export const projectsList: Project[] = [
  {
    title: 'SmartVote',
    link: '/case-study/smartvote',
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
    active: true,
  },
  {
    title: 'Kopo',
    link: '/case-study/kopo',
    image: kopo,
    description:
      'Kopo simplifies the process of applying for Energy Savings Certificates (ESC) and ensures their traceability in full transparency thanks to the Polygon Blockchain.',
    tools: ['Next.js', 'Hardhat', 'Ethers', 'Wagmi', 'Rainbow Kit', 'TailwindCSS', 'Toastify'],
    active: true,
  },
  {
    title: 'Insert Dentaire',
    link: '/case-study/insert-dentaire',
    image: insertdentaire,
    description:
      'Insert Dentaire is a mobile merchant application that enables dentists to order handpieces and dental tips easily.',
    tools: [
      'React Native',
      'React Navigation',
      'Redux',
      'Expo Secure Store',
      'External APIs',
      'Jest',
    ],
    active: false,
  },
];
