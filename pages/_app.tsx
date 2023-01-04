import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import Script from 'next/script';

import Layout from '../components/Layout/Layout';

import '../styles/global.css';

export default appWithTranslation(function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_TAG_MANAGER}`}
      />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-KD65XFQRL2');`,
        }}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
});
