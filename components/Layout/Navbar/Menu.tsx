import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Link } from 'react-scroll';
import { useTranslation } from 'next-i18next';

import france from '../../../public/images/icons/flags/france.svg';
import usa from '../../../public/images/icons/flags/usa.svg';
import ButtonLink from '../../Buttons/ContactLink';

const Menu = () => {
  const { locale, push } = useRouter();

  const { t } = useTranslation('menu');

  const handleClick = (l: string) => () => {
    push('/', undefined, { locale: l });
  };
  return (
    <ul className="flex items-center">
      <div className='hidden sm:flex'>
        {locale == 'en' ? (
          <button className="mr-4 sm:mr-8" onClick={handleClick('fr')}>
            <Image src={france} alt="France" className="w-8 h-auto" priority={false} />
          </button>
        ) : (
          <button className="mr-4 sm:mr-8" onClick={handleClick('en')}>
            <Image src={usa} alt="USA" className="w-8 h-auto" priority={false} />
          </button>
        )}
      </div>
      <Link
        activeClass="font-bold menu-link-active"
        to="about-me"
        smooth={true}
        spy={true}
        offset={-84}
        duration={300}
        className="mr-4 cursor-pointer text-salmon hover:underline sm:mr-8"
      >
        <li>{t('about me')}</li>
      </Link>
      <Link
        activeClass="font-bold menu-link-active"
        to="projects"
        smooth={true}
        spy={true}
        offset={-84}
        duration={300}
        className="mr-4 cursor-pointer text-salmon hover:underline sm:mr-8"
      >
        <li>{t('projects')}</li>
      </Link>
      <a
        href={
          locale == 'en'
            ? 'images/resume/resume-nicolas-milliard.pdf'
            : 'images/resume/cv-nicolas-milliard.pdf'
        }
        target="_blank"
        rel="noreferrer"
        className="mr-4 sm:mr-8 text-salmon hover:text-yellow hover:underline"
      >
        <li>{t('resume')}</li>
      </a>
      <ButtonLink text={t('contact me')} theme="" />
    </ul>
  );
};

export default Menu;
