import { FC } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import {
  PageTitle,
  SectionTitle,
  SectionSubTitle,
  TextContent,
  ListContent,
} from '../../components/CaseStudy';
import Button from '../../components/Buttons/Button';

const InsertDentaire: FC = () => {
  return (
    <>
      <Head>
        <title>Insert Dentaire - Nicolas Milliard</title>
        <meta
          name="description"
          content="Case Study of Insert Dentaire, a React Native application."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Project presentation */}
      <section className="py-32 md:py-48 sm:px-0 md:px-16 mx-6 md:mx-auto sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        {/* Title */}
        <div className="mb-8">
          <PageTitle>Insert Dentaire</PageTitle>
          <SectionTitle color="green" center={true}>
            Buy your dental equipment with ease
          </SectionTitle>
          <p className="italic text-center">This page is under construction.</p>
        </div>
        {/* Image */}
        <div className="flex justify-center mb-8"></div>
        {/* Links */}
        <div className="flex justify-center items-center">
          <Button
            text="View project"
            link="https://www.figma.com/proto/9gbFxs4olILJCRpsZT4FaD"
            target="_blank"
          />
        </div>
      </section>
      {/* Introduction */}
      <section className="mx-6 md:mx-auto mb-32 md:mb-48 sm:px-0 md:px-16 sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <SectionTitle color="black" center={false}>
          Introduction
        </SectionTitle>
        {/* Project */}
        <SectionSubTitle>Presentation of the Insert Dentaire application</SectionSubTitle>
        <div className="flex flex-col mb-10">
          <TextContent>
            Insert Dentaire is a merchant mobile application that enables dentists to purchase
            handpieces and dental tips for a wide range of brands. The application offers a
            personalized user experience based on each user's habits. The application is
            synchronized with the website in many aspects: customer accounts, orders, addresses...
          </TextContent>
        </div>
        {/* Context */}
        <SectionSubTitle>Project context: be the first application of its kind</SectionSubTitle>
        <div className="flex flex-col mb-10">
          <TextContent>
            There are 45,000 active dentists in France. Insert Dentaire is one of the sector's
            benchmarks, offering a unique e-commerce site for the purchase of consumables from a
            wide range of brands. The application will offer a more personalized user experience,
            closer to the consumer.
          </TextContent>
        </div>
        {/* Objective */}
        <SectionSubTitle>Objective of the case study</SectionSubTitle>
        <div className="flex flex-col">
          <TextContent>
            The aim of this case study is to present the realization of this application, from its
            first drafts to its publication on the stores.
          </TextContent>
        </div>
      </section>

      {/* UX / UI */}
      <section className="mx-6 md:mx-auto mb-32 md:mb-48 sm:px-0 md:px-16 sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <SectionTitle color="black" center={false}>
          UX / UI of Insert Dentaire
        </SectionTitle>
        {/* Wireframes */}
        <SectionSubTitle>Wireframes</SectionSubTitle>
        {/* Text */}
        <div className="flex flex-col mb-10">
          <TextContent>
            First, I made wireframes of the application to have a first look of this new project.
            Wireframes were made thanks to a deep analysis of the habits of our customers on the
            website and a respect of the good practices of the mobile app industry.
          </TextContent>
          <div className="flex justify-center items-center">
            <Button
              text="View wireframes"
              link="https://www.figma.com/proto/r71yUJu8M5OBhufjqxDPPN"
              target="_blank"
            />
          </div>
        </div>
      </section>

      {/* Project architecture */}
      <section className="mx-6 md:mx-auto mb-32 md:mb-48 sm:px-0 md:px-16 sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        {/* Title */}
        <SectionTitle color="black" center={false}>
          Project architecture
        </SectionTitle>
        <div className="mb-10">
          <TextContent>
            Classic architecture, tools used and exports of the assets (images, fonts, products
            versionning). Visual Studio, Miro.
          </TextContent>
        </div>
      </section>

      {/* Code */}
      <section className="mx-6 md:mx-auto mb-32 md:mb-48 sm:px-0 md:px-16 sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <SectionTitle color="black" center={false}>
          Code of Insert Dentaire
        </SectionTitle>
        {/* Text */}
        <div className="flex flex-col mb-10">
          <TextContent>
            Process: Main components (button, input, title, productCard) then Screens. Navigation,
            Redux and Redux Persist. Expo Secure Storage.
          </TextContent>
        </div>
      </section>

      {/* Publication */}
      <section className="mx-6 md:mx-auto mb-32 md:mb-48 sm:px-0 md:px-16 sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <SectionTitle color="black" center={false}>
          Publication of Insert Dentaire
        </SectionTitle>
        {/* Text */}
        <div className="flex flex-col mb-10">
          <TextContent>
            Splahscreens, icons, publications on the App Store and Google Play Store. Tools used are
            Photoshop, Xcode and Android Studio.
          </TextContent>
        </div>
      </section>

      {/* Conclusion */}
      <section className="mx-6 md:mx-auto mb-32 md:mb-48 sm:px-0 md:px-16 sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        {/* Title */}
        <SectionTitle color="black" center={false}>
          Conclusion
        </SectionTitle>
        <div>
          <TextContent>
            Freat feedback from users, several orders and some user habits started.
          </TextContent>
        </div>
      </section>
    </>
  );
};

export default InsertDentaire;
