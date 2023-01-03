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
        <title>{tHead('Blockchain Developer - Nicolas Milliard')}</title>
        <meta name="description" content="Portfolio of Nicolas Milliard, Blockchain Developer." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SocialLinks />

      <>
        {/* About me */}
        <section
          id="about-me"
          className="my-28 px-8 mx-auto sm:px-0 sm:max-w-xl md:my-48 md:max-w-3xl lg:max-w-5xl lg:flex lg:items-center lg:justify-between xl:max-w-6xl"
        >
          {/* Text */}
          <div className="mb-20 lg:mb-0 lg:mr-20 xl:mr-40">
            <h1>{tHomepage('Hello 👋')}</h1>
            <h2>{tHomepage("I'm Nicolas Milliard")}</h2>
            <div className="flex items-center mb-8">
              <h3 className="text-4xl mr-4 nm-gray-color">{tHomepage('Blockchain Developer')}</h3>
              <Separator additionalClasses="w-80 nm-separator-gray" />
            </div>
            <p className="mb-8">
              {tHomepage('about-me-desc-1')}
              <br />
              <Link
                href="https://certificate.bcdiploma.com/check/B0B491E86C4DD3E9F0065313B4851457AD99C52B28E17896176D6A4E882101BDRlFnSWNWUmJQYVZMZWMvRVZpbTRDdWU1eE9hazdTa0VpMll0ZlVDZVhrSWZjM2pL"
                target="_blank"
              >
                {tHomepage("I'm graduated from Alyra")}
              </Link>
              {tHomepage('about-me-desc-2')}
            </p>
            <div>
              <ContactLink text={tHomepage('Contact me')} additionalClasses="mr-8" />
              <Link
                locale="en"
                href={
                  locale == 'en'
                    ? 'images/resume/resume-nicolas-milliard.pdf'
                    : 'images/resume/cv-nicolas-milliard.pdf'
                }
                target="_blank"
                title="Check my resume"
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
            <h2 className="mr-4">{tHomepage('Case studies')}</h2>
            <Separator additionalClasses="nm-separator-width nm-separator-black" />
          </div>
          {/* Projects */}
          <ProjectsList />
        </section>
        {/* Get in touch */}
        <section className="p-8 nm-green-bg-color md:rounded-xl md:max-w-screen-md md:mx-auto md:mb-48">
          <h2 className="mb-8">{tHomepage('Get in touch!')}</h2>
          <p className="mb-4">{tHomepage('contact-me-desc-1')}</p>
          <p className="mb-8">{tHomepage('contact-me-desc-2')}</p>
          <ContactLink text={tHomepage('Contact me')} additionalClasses={'nm-btn-alt'} />
        </section>
      </>
    </div>
  );
};

// getServerSideProps
export async function getStaticProps({ locale }: any) {
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
