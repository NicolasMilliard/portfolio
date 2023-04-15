interface Review {
  id: number;
  name: string;
  date: string;
  text: string;
}

export const testimonialsList: Review[] = [
  {
    id: 0,
    name: 'Caroline M.',
    date: '13/03/2023',
    text: 'Nicolas has a thorough knowledge of blockchain and web 3 technologies which allows him to approach the design and development of projects in a very professional and efficient way. He is innovative, reactive and knows how to adapt to the evolution of the projects he works on.',
  },
  {
    id: 1,
    name: 'Roxanne Berthelot',
    date: '01/03/2023',
    text: 'Nicolas is very diligent in his work and does not count his hours. He is very rigorous in his projects and is also a good teacher. I highly recommend him.',
  },
  {
    id: 2,
    name: 'John Belmonte',
    date: '24/02/2023',
    text: 'I called upon the services of Mr. MILLIARD for the creation of my commercial website with a custom design. He succeeded in perfecting my expectations within the time limit that was given to him and was a force of proposal throughout the development process.',
  },
];
