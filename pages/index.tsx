import Head from 'next/head';

import Introduction from '../components/Homepage/Introduction';
import AboutMe from '../components/Homepage/AboutMe';
import Experiences from '../components/Homepage/Experiences';
import LatestProjects from '../components/Homepage/LatestProjects';

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
      </>
    </>
  );
};

export default Home;
