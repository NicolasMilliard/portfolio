import Head from 'next/head';
import {
  Introduction,
  AboutMe,
  Experiences,
  LatestProjects,
  Testimonials,
} from '../components/Homepage';

const Home = () => {
  return (
    <>
      <Head>
        <title>Front-End & Web 3 Developer - Nicolas Milliard</title>
        <meta
          name="description"
          content="Portfolio of Nicolas Milliard, Front-End & Web 3 Developer."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Introduction />
        <AboutMe />
        <Experiences />
        <LatestProjects />
        <Testimonials />
      </>
    </>
  );
};

export default Home;
