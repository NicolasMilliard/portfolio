import React from 'react';
import { useTranslation } from 'next-i18next';

const Footer = () => {
  const { t } = useTranslation('footer');
  return (
    <footer className="py-8 bg-brown-900 text-yellow flex items-center justify-center">
      <p>{t('footer-copyright')} - 2023</p>
    </footer>
  );
};

export default Footer;
