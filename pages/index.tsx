import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import Introduction from '../components/Homepage/Introduction';
import AboutMe from '../components/Homepage/AboutMe';
import Experiences from '../components/Homepage/Experiences';
import LatestProjects from '../components/Homepage/LatestProjects';

const Home = () => {
  const { t: tHead } = useTranslation('head');
  const { t: tHomepage } = useTranslation('homepage');

  return (
    <>
      <Head>
        <title>{tHead('index-title')}</title>
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

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'head',
        'logo',
        'menu',
        'homepage',
        'projects',
        'footer',
      ])),
    },
  };
}

export default Home;
