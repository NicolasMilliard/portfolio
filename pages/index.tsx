import Head from 'next/head';

import {
  Introduction,
  AboutMe,
  Experiences,
  LatestProjects,
  Testimonials,
  Blog,
} from '../components/Homepage';

const Home = () => {
  return (
    <>
      <Head>
        <title>Full-Stack & Web 3 Developer - Nicolas Milliard</title>
        <meta
          name="description"
          content="Portfolio of Nicolas Milliard, Full-Stack & Web 3 Developer."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Introduction />
        <AboutMe />
        <Experiences />
        <LatestProjects />
        <Testimonials />
        <Blog />
      </>
    </>
  );
};

export default Home;
