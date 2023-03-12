import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import ContactLink from '../components/Buttons/ContactLink';
import Separator from '../components/Titles/Separator';
import AttractImage from '../components/Images/AttractImage';
import SocialLinks from '../components/Social/SocialLinks';
import ProjectsList from '../components/Projects/ProjectsList';

const Home = () => {
  const { t: tHead } = useTranslation('head');
  const { t: tHomepage } = useTranslation('homepage');
  const { locale } = useRouter();

  return (
    <div>
      <Head>
        <title>{tHead('index-title')}</title>
        <meta name="description" content="Portfolio of Nicolas Milliard, Blockchain Developer." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SocialLinks />

      <>
        {/* About me */}
        <section
          id="about-me"
          className="py-28 px-8 mx-auto sm:px-0 sm:max-w-xl md:py-48 md:max-w-3xl lg:max-w-5xl lg:flex lg:items-center lg:justify-between xl:max-w-6xl"
        >
          {/* Text */}
          <div className="mb-20 lg:mb-0 lg:mr-20 xl:mr-40">
            <h1 className="font-oswald-bold text-6xl leading-relaxed text-yellow">
              {tHomepage('Hello 👋')}
            </h1>
            <h2 className="font-oswald-semibold text-5xl leading-relaxed text-yellow">
              {tHomepage("I'm Nicolas Milliard")}
            </h2>
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-oswald text-4xl leading-relaxed mr-4 text-salmon">
              {tHomepage('job')}
              </h3>
              <Separator additionalClasses="lg:w-40 bg-salmon" />
            </div>
            <p className="mb-8 text-yellow">
              {tHomepage('about-me-desc-1')}
              <br />
              <Link
                href="https://certificate.bcdiploma.com/check/B0B491E86C4DD3E9F0065313B4851457AD99C52B28E17896176D6A4E882101BDRlFnSWNWUmJQYVZMZWMvRVZpbTRDdWU1eE9hazdTa0VpMll0ZlVDZVhrSWZjM2pL"
                target="_blank"
                className="underline hover:text-salmon"
              >
                {tHomepage("I'm graduated from Alyra")}
              </Link>
              {tHomepage('about-me-desc-2')}
            </p>
            <div className="mt-12">
              <ContactLink text={tHomepage('Contact me')} theme="" />
              <Link
                locale="en"
                href={
                  locale == 'en'
                    ? 'images/resume/resume-nicolas-milliard.pdf'
                    : 'images/resume/cv-nicolas-milliard.pdf'
                }
                target="_blank"
                title="Check my resume"
                className="underline text-salmon hover:text-yellow ml-8"
              >
                {tHomepage('Resume')}
              </Link>
            </div>
          </div>
          {/* Image */}
          <AttractImage />
        </section>
        {/* Case studies */}
        <section
          id="projects"
          className="mb-28 px-8 mx-auto sm:px-0 sm:max-w-xl md:mb-48 md:max-w-3xl lg:max-w-5xl xl:max-w-6xl"
        >
          {/* Title */}
          <div className="flex items-center mb-8">
            <h2 className="font-oswald-semibold text-5xl leading-relaxed text-yellow mr-4">
              {tHomepage('Case studies')}
            </h2>
            <Separator additionalClasses="w-72 ml-4 bg-yellow" />
          </div>
          {/* Projects */}
          <ProjectsList />
        </section>
        {/* Get in touch */}
        <section className="p-8 bg-yellow text-brown-100 md:rounded-xl md:max-w-screen-md md:mx-auto md:mb-48">
          <h2 className="font-oswald-semibold text-5xl leading-relaxed mb-8">
            {tHomepage('Get in touch!')}
          </h2>
          <p className="mb-4">{tHomepage('contact-me-desc-1')}</p>
          <p className="mb-8">{tHomepage('contact-me-desc-2')}</p>
          <ContactLink text={tHomepage('Contact me')} theme="salmon" />
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
