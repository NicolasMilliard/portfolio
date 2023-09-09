interface Experience {
  label: string;
  title: string;
  date: string;
  descriptions: Description[];
}

interface Description {
  id: number;
  text: string;
}

export const experiencesList: Experience[] = [
  {
    label: 'Yper',
    title: 'Front-End Developer',
    date: 'Aug. 2023 - Today',
    descriptions: [
      {
        id: 1,
        text: 'Implement rich user experiences by creating new features utilizing HTML, CSS, JavaScript and TypeScript',
      },
      {
        id: 3,
        text: 'Development and maintenance of new products',
      },
    ],
  },
  {
    label: 'Freelance',
    title: 'Front-End Developer',
    date: 'Nov. 2017 - Aug. 2023',
    descriptions: [
      {
        id: 0,
        text: 'Develop websites and dApps for many companies (Education, Health, Food, New Technologies...)',
      },
      {
        id: 1,
        text: 'Implement rich user experiences by creating new features utilizing HTML, CSS, JavaScript and TypeScript',
      },
      {
        id: 2,
        text: 'Integrate and test new features based on users feedback',
      },
      {
        id: 3,
        text: 'Development and maintenance of new products, technical documentation and workflows',
      },
    ],
  },
  {
    label: 'DMD France',
    title: 'Front-End Developer',
    date: 'July 2016 - Nov. 2021',
    descriptions: [
      {
        id: 0,
        text: 'Lead architecture, design and development of 15+ websites and applications',
      },
      {
        id: 1,
        text: 'Develop websites for 4 international business partners',
      },
      {
        id: 2,
        text: 'Integrate external APIs into web pages and applications',
      },
      {
        id: 3,
        text: 'Build automated data flows to replace repetitive tasks',
      },
      {
        id: 4,
        text: 'Integrate and test new features based on users feedback',
      },
      {
        id: 5,
        text: 'Development and maintenance of new products, technical documentation and workflows',
      },
      {
        id: 6,
        text: 'Followed industry best practices and learned 3 new technologies',
      },
    ],
  },
];
