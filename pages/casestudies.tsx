import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import Button from '../components/Buttons/Button';
import SocialLinks from '../components/Social/SocialLinks';
import ProjectsList from '../components/Projects/ProjectsList';

const casestudies = () => {
  const { t: tHead } = useTranslation('head');
  const { t: tHomepage } = useTranslation('homepage');
  const { t: tCaseStudies } = useTranslation('casestudies');
  const { locale } = useRouter();

  return (
    <div>
      <Head>
        <title>{tHead('project-title')}</title>
        <meta
          name="description"
          content="Portfolio of Nicolas Milliard, Full-Stack Developer & Web3."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SocialLinks />

      {/* Case studies */}
      <section className="py-28 px-8 mx-auto sm:px-0 sm:max-w-xl md:mb-48 md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        {/* Title */}
        <div className="flex items-center mb-8">
          <h2 className="font-oswald-semibold text-5xl leading-relaxed text-yellow mr-4">
            {tCaseStudies('case-studies')}
          </h2>
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
        <Button
          text={tHomepage('Contact me')}
          theme="salmon"
          link="mailto:contact@nicolasmilliard.fr"
          target="_self"
        />
      </section>
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
        'casestudies',
        'homepage',
        'projects',
        'footer',
      ])),
    },
  };
}

export default casestudies;
