import Head from 'next/head';
import Link from 'next/link';

import Navbar from '../components/Navbar/Navbar';
import Button from '../components/Buttons/Button';
import Separator from '../components/Titles/Separator';
import AttractImage from '../components/Images/AttractImage';
import SocialLinks from '../components/Social/SocialLinks';
import ProjectsList from '../components/Projects/ProjectsList';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Blockchain Developer - Nicolas Milliard</title>
        <meta name="description" content="Portfolio of Nicolas Milliard, Blockchain Developer." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <SocialLinks />

      <main className="px-8 sm:px-0 sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto">
        {/* About me */}
        <section className="lg:flex lg:items-center">
          {/* Text */}
          <div className="mb-20 lg:mb-0 lg:mr-20 xl:mr-40">
            <h1>Hello 👋</h1>
            <h2>I'm Nicolas Milliard</h2>
            <div className="flex items-center mb-8">
              <h3 className="text-4xl mr-4 nm-gray-color">Blockchain Developer</h3>
              <Separator additionalClasses="w-80 nm-separator-gray" />
            </div>
            <p className="mb-8">
              I'm currently searching a job as a Blockchain Developer. I'm a 5+ years experienced
              Full&nbsp;Stack Developer.
              <br />
              <Link
                href="https://certificate.bcdiploma.com/check/B0B491E86C4DD3E9F0065313B4851457AD99C52B28E17896176D6A4E882101BDRlFnSWNWUmJQYVZMZWMvRVZpbTRDdWU1eE9hazdTa0VpMll0ZlVDZVhrSWZjM2pL"
                target="_blank"
              >
                I'm graduated from Alyra
              </Link>
              , the french blockchain school. I've made several projects using Solidity Smart
              Contracts, Truffle, Hardhat, Web3.js, Ethers.js and others.
            </p>
            <div>
              <Button text="Contact me" additionalClasses="mr-8" />
              <Link href="#" title="Check my resume">
                Resume
              </Link>
            </div>
          </div>
          {/* Image */}
          <AttractImage />
        </section>
        {/* Case studies */}
        <section>
          {/* Title */}
          <div className="flex items-center mb-8">
            <h2 className="mr-4">Case studies</h2>
            <Separator additionalClasses="nm-separator-width nm-separator-black" />
          </div>
          {/* Projects */}
          <ProjectsList />
        </section>
      </main>
    </div>
  );
}
