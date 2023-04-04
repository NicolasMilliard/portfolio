import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import Introduction from '../components/Homepage/Introduction';
import AboutMe from '../components/Homepage/AboutMe';
import Experiences from '../components/Homepage/Experiences';
import Button from '../components/Buttons/Button';

const Home = () => {
  const { t: tHead } = useTranslation('head');
  const { t: tHomepage } = useTranslation('homepage');

  return (
    <div>
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

        {/* Get in touch */}
        <section className="p-8 bg-yellow text-brown-100 md:rounded-xl md:max-w-screen-md md:mx-auto md:mb-48">
          <h2 className="font-oswald-semibold text-5xl leading-relaxed mb-8">
            {tHomepage('Get in touch!')}
          </h2>
          <p className="mb-4">{tHomepage('contact-me-desc-1')}</p>
          <p className="mb-8">{tHomepage('contact-me-desc-2')}</p>
          <Button
            text={tHomepage('Contact me')}
            link="mailto:contact@nicolasmilliard.fr"
            target="_self"
          />
        </section>
      </>
    </div>
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
