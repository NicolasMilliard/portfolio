import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const Logo = () => {
  const { t } = useTranslation('logo');
  return (
    <Link href="/" title={t('logo-title')} className="hidden nm-link sm:block">
      <span id="logo-firstname" className="text-lg sm:text-xl md:text-2xl lg:text-4xl">
        nicolas
      </span>
      <span id="logo-lastname" className="text-lg sm:text-xl md:text-2xl lg:text-4xl">
        milliard
      </span>
    </Link>
  );
};

export default Logo;
