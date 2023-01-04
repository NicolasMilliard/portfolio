import React from 'react';
import { useTranslation } from 'next-i18next';

const Footer = () => {
  const { t } = useTranslation('footer');
  return (
    <footer className="py-8 nm-black-bg-color flex items-center justify-center">
      <p className="nm-white-color">{t('footer-copyright')}</p>
    </footer>
  );
};

export default Footer;
