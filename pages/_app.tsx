import type { FC } from 'react';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import Layout from '../components/Layout/Layout';

import '../styles/global.css';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_TAG_MANAGER}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
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
};

export default App;
