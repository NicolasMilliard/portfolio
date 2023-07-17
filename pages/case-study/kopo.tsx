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

import {
  kopoDapp,
  kopoEscWorkflow,
  kopoUx,
  kopoDappCode,
} from '../../public/images/case-study/kopo';
import { nextJS, hardhat } from '../../public/images/case-study/general';

const Kopo: FC = () => {
  return (
    <>
      <Head>
        <title>Kopo - Nicolas Milliard</title>
        <meta name="description" content="Case Study of Kopo, a Next.js Web 3 dApp." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Project presentation */}
      <section className="py-32 md:py-48 sm:px-0 md:px-16 mx-6 md:mx-auto sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        {/* Title */}
        <div className="mb-8">
          <PageTitle>Kopo</PageTitle>
          <SectionTitle color="green" center={true}>
            Your energy renovation made easy
          </SectionTitle>
        </div>
        {/* Image */}
        <div className="flex justify-center mb-8">
          <Image src={kopoDapp} alt="Kopo dApp - Nicolas Milliard" className="rounded-2xl" />
        </div>
        {/* Links */}
        <div className="flex justify-center items-center">
          <Button text="Visit project" link="https://kopo.vercel.app/" target="_blank" />
          <Link
            href="https://github.com/NicolasMilliard/kopo"
            className="underline text-green-500 hover:text-green-900 ml-8"
            target="_blank"
          >
            Github repository
          </Link>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-6 md:mx-auto mb-32 md:mb-48 sm:px-0 md:px-16 sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <SectionTitle color="black" center={false}>
          Introduction
        </SectionTitle>
        {/* Project */}
        <SectionSubTitle>Presentation of the Kopo project</SectionSubTitle>
        <div className="flex flex-col items-center mb-10">
          <TextContent>
            Kopo is an innovative dApp that allows individuals to simplify the process of applying
            for Energy Saving Certificates (ESC). With Kopo, beneficiaries can follow in real time
            the progress of their application from the platform. The particularity of Kopo is that
            all the files created are stored on the blockchain, thus offering transparency and total
            traceability.
          </TextContent>
          <TextContent>
            Moreover, since the blockchain is unforgeable and immutable, records cannot be altered
            or deleted. The dApp has been developed to be easy to use, secure and transparent to
            provide an optimal user experience.
          </TextContent>
        </div>
        {/* Context */}
        <SectionSubTitle>Project context: ESC in France</SectionSubTitle>
        <div className="flex flex-col items-center mb-10">
          <TextContent>
            In France, the Energy Saving Certificates (ESC) have been set up to help individuals
            finance their energy renovation work. However, the process to obtain these aids is often
            long and opaque, with many backs and forth between the different stakeholders, which can
            take more than 6 months.
          </TextContent>
          <Image
            src={kopoEscWorkflow}
            alt="Kopo ESC Workflow - Nicolas Milliard"
            className="mb-6"
          />
          <TextContent>
            In addition, there has been an increase in the number of cases of fraud, which has led
            to a strengthening of control and security measures, with an anti-fraud budget that has
            risen from 0.5 million euros to 7 million euros in just three years. Yet ESC are
            essential to achieving Europe's 2050 greenhouse gas emission reduction targets. It is
            important to note that the slightest error or irregularity can invalidate a folder,
            which can discourage individuals from undertaking energy renovation work.
          </TextContent>
          <TextContent>
            Kopo was developed in this context to simplify and secure the ESC application process
            and thus facilitate access to grands for individuals.
          </TextContent>
        </div>
        {/* Objective */}
        <SectionSubTitle>Objective of the case study</SectionSubTitle>
        <div className="flex flex-col items-center">
          <TextContent>
            In France, the Energy Saving Certificates (ESC) have been set up to help individuals
            finance their energy renovation work. However, the process to obtain these aids is often
            long and opaque, with many backs and forth between the different stakeholders, which can
            take more than 6 months.
          </TextContent>
          <TextContent>
            In addition, there has been an increase in the number of cases of fraud, which has led
            to a strengthening of control and security measures, with an anti-fraud budget that has
            risen from 0.5 million euros to 7 million euros in just three years. Yet ESC are
            essential to achieving Europe's 2050 greenhouse gas emission reduction targets. It is
            important to note that the slightest error or irregularity can invalidate a folder,
            which can discourage individuals from undertaking energy renovation work.
          </TextContent>
          <TextContent>
            Kopo was developed in this context to simplify and secure the ESC application process
            and thus facilitate access to grands for individuals.
          </TextContent>
        </div>
      </section>

      {/* Presentation */}
      <section className="mx-6 md:mx-auto mb-32 md:mb-48 sm:px-0 md:px-16 sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <SectionTitle color="black" center={false}>
          Presentation of Kopo
        </SectionTitle>
        {/* dApp */}
        <SectionSubTitle>Description of the dApp and how it works</SectionSubTitle>
        {/* Text */}
        <div className="flex flex-col mb-10">
          <TextContent>
            Kopo is a decentralized platform that allows users to simplify and secure their requests
            for Energy Saving Certificates (ESC). It uses blockchain technology to guarantee the
            transparency and immutability of data exchanged between beneficiaries and obligated
            parties.
          </TextContent>
          <TextContent>
            The process begins with the creation of a folder by the beneficiary on the platform,
            where he can quantify his work and estimate his remaining costs. He can then submit his
            request for financial aid and send the necessary documents to the corresponding
            obligated. The latter can then validate or reject the application based on the required
            compliance criteria.
          </TextContent>
          <TextContent>
            Throughout the process, the unique smart contract associated with the application allows
            the progress of the application to be tracked in a transparent and unchangeable manner.
            Kopo offers an innovative and efficient solution to simplify and accelerate the ESC
            application process, while guaranteeing its security and authenticity thanks to
            blockchain technology.
          </TextContent>
        </div>
        {/* Technologies */}
        <SectionSubTitle>Technologies used</SectionSubTitle>
        {/* Text */}
        <div className="flex flex-col mb-10">
          <TextContent>
            Kopo is a dApp that leverages several technologies to provide an innovative solution for
            managing ESC records.
          </TextContent>
          <div className="flex flex-col items-center lg:flex-row">
            <div className="md:mr-6 max-w-xl">
              <TextContent>
                On the front-end side, the team chose to use Next.js for web development, Rainbow
                Kit for connecting to the user's digital wallet, Ethers.js for communication with
                the blockchain, and NFT.storage for managing NFTs. For user notifications, the team
                integrated React Toastify. The solution also integrates Wagmi.sh which simplifies
                the connection to the blockchain and acts as a global state manager. Finally, the
                dApp uses the TailwindCSS library.
              </TextContent>
            </div>
            <Image
              src={nextJS}
              alt="NextJS Kopo dApp - Nicolas Milliard"
              className="mb-6 lg:mb-0"
            />
          </div>
          <div className="flex flex-col items-center lg:flex-row">
            <div className="md:mr-6 max-w-xl">
              <TextContent>
                On the backend side, the team chose Hardhat, a development platform that facilitates
                the development process of smart contracts. Some smart contracts are Upgradeable to
                allow future modifications of these smart contracts. OpenZeppelin is used to provide
                security features such as authentication and authorization. Chai is used to write
                unit tests and Eth-gas-reporter to track the gas costs on the blockchain. Finally,
                Solidity Coverage is used to measure code coverage during unit tests.
              </TextContent>
            </div>
            <Image src={hardhat} alt="Hardhat Kopo dApp - Nicolas Milliard" />
          </div>
        </div>
        {/* Team */}
        <SectionSubTitle>Team</SectionSubTitle>
        {/* Text */}
        <div className="flex flex-col">
          <TextContent>
            The Kopo project was carried out within the framework of the training courses offered by
            Alyra. The multidisciplinary team was composed of two developers, four blockchain
            consultants and an expert of decentralized finance (DeFi).
          </TextContent>
          <TextContent>
            The developers worked jointly on the development of the dApp. The blockchain consultants
            brought their expertise in the choice of the blockchain as well as in the management of
            the project in agile mode, while the expert in decentralized finance brought his
            expertise in the elaboration of decentralized financing mechanisms.
          </TextContent>
          <TextContent>
            The collaboration of these different skills has enabled the successful completion of
            this ambitious project and the creation of an innovative solution to simplify the
            process of ESC files.
          </TextContent>
        </div>
      </section>

      {/* Features */}
      <section className="mx-6 md:mx-auto mb-32 md:mb-48 sm:px-0 md:px-16 sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        {/* Title */}
        <SectionTitle color="black" center={false}>
          Features
        </SectionTitle>
        {/* Front-end */}
        <SectionSubTitle>Front-end features of Kopo</SectionSubTitle>
        <div className="mb-10">
          <TextContent>
            The Kopo dApp offers two distinct user paths: the beneficiary path and the obligated
            path.
          </TextContent>
          <Image src={kopoUx} alt="Kopo User Experience - Nicolas Milliard" className="mb-6" />
          <TextContent>
            The beneficiary path begins by connecting the user's digital wallet to the dApp. Once
            this connection is established, Kopo displays the user's existing ESC folders and allow
            the user to create new ones.
          </TextContent>
          <TextContent>
            The creation of a folder involves the deployment of a smart contract which represents
            the folder on the blockchain. Then, the user can add a document to the created file,
            such as a renovation estimate, which will be converted to a NFT and sent to the
            designated obligated for validation.
          </TextContent>
          <TextContent>
            The document will then appear as "pending" until the obligator validates or rejects it.
            The dApp uses the event of the smart contracts present on the blockchain to display the
            folders and the files.
          </TextContent>
          <TextContent>
            For the purposes of this POC, the obligated dashboard has been simplified. The documents
            to be validated appear directly and the obligated can view, validate, or reject them
            easily.
          </TextContent>
        </div>
        {/* Blockchain */}
        <SectionSubTitle>Operations performed on the blockchain</SectionSubTitle>
        <div>
          <TextContent>
            The Kopo dApp uses five different smart contracts to work properly:
          </TextContent>
          <ListContent>
            <li className="leading-relaxed">
              KopoAddressProvider: this is an Upgradeable smart contract that acts as a router for
              the dApp by bridging the gap between the Kopo interface and the various smart
              contracts used. It is modifiable and can be updated to integrate new smart contracts
              needed by Kopo or to update their Ethereum addresses;
            </li>
            <li className="leading-relaxed">
              KopoFolderFactory: this smart contract of type Factory makes it possible to duplicate
              the smart contract "KopoFolderHandler" which represents the ESC application folder on
              the blockchain;
            </li>
            <li className="leading-relaxed">
              KopoFolderHandler: this smart contract of type ERC721 and IERC721Receiver represents
              the ESC application file. It can receive NFTs that represents proofs of claim
              (documents). This contract can also mint a single NFT that will represent the folder.
              This NFT can then be used in the DeFi for transfer or collateralization operations;
            </li>
            <li className="leading-relaxed">
              KopoDocumentHandler: this smart contract of type ERC721 allows to generate NFTs
              according to the data entered by the user and to link them to the right folder. In
              order to improve the security during a possible file transfer, the NFTs cannot be
              transmitted without the agreement of the recipient.
            </li>
          </ListContent>
        </div>
        <div className="flex justify-center">
          <Image src={kopoDappCode} alt="Kopo dApp - Nicolas Milliard" className="mb-6" />
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
            The Kopo solution provides an innovative and relevant response to the complex issue of
            managing Energy Savings Certificate applications. Thanks to the blockchain, Kopo
            guarantees total decentralization, increased transparency, and security of exchanges
            between the different actors. In addition, the solution saves considerable time for
            beneficiaries and obligated parties thanks to a single platform for estimating the cost
            of the work, estimating the remaining costs, and submitting applications for financial
            aid.
          </TextContent>
          <TextContent>
            The technologies used for Kopo are state-of-the-art, combining a front-end framework
            such as Next.js, a UI library such as TailwindCSS and development tools such as Hardhat
            and OpenZeppelin libraries.
          </TextContent>
          <TextContent>
            Smart contracts, on the other hand, are designed to enable smooth and secure management
            of ESC folders and records while minimizing transaction costs.
          </TextContent>
          <TextContent>
            Overall, Kopo is a state-of-the-art solution for ESC management, offering innovative
            functionality, enhances security, and ease of use for beneficiaries and obligated
            parties.
          </TextContent>
        </div>
      </section>
    </>
  );
};

export default Kopo;
