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
  smartVoteDapp,
  smartVoteBlockchains,
  smartVoteWhy,
  smartVoteUXUI,
  smartVoteWallets,
  smartVoteSolidity,
  smartVoteEIP,
} from '../../public/images/case-study/smartvote';
import { nextJS, hardhat } from '../../public/images/case-study/general';

const SmartVote: FC = () => {
  return (
    <div>
      <Head>
        <title>SmartVote - Nicolas Milliard</title>
        <meta
          name="description"
          content="Portfolio of Nicolas Milliard, Full-Stack Developer & Web3."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Project presentation */}
      <section className="py-32 md:py-48 sm:px-0 md:px-16 mx-6 md:mx-auto sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        {/* Title */}
        <PageTitle>SmartVote</PageTitle>
        <SectionTitle color="green" center={true}>
          Create, manage and join voting sessions
        </SectionTitle>
        {/* Image */}
        <div className="flex justify-center mb-8">
          <Image
            src={smartVoteDapp}
            alt="SmartVote dApp - Nicolas Milliard"
            className="rounded-2xl"
          />
        </div>
        {/* Links */}
        <div className="flex justify-center items-center">
          <Button text="Visit project" link="https://my-smartvote.vercel.app/" target="_blank" />
          <Link
            href="https://github.com/NicolasMilliard/SmartVote"
            className="underline text-green-500 hover:text-green-900 ml-8"
            target="_blank"
          >
            Github repository
          </Link>
        </div>
      </section>

      {/* What is SmartVote */}
      <section className="mx-6 md:mx-auto mb-32 md:mb-48 sm:px-0 md:px-16 sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <SectionTitle color="black" center={false}>
          What is SmartVote&nbsp;?
        </SectionTitle>
        <div className="flex flex-col items-center md:flex-row">
          <div className="max-w-xl md:mr-6">
            <TextContent>
              SmartVote allows users to organize their own voting instances, add users to whitelist,
              create proposals and tally votes. Works on the Polygon and Avalanche blockchains.
            </TextContent>
            <TextContent>
              In general, SmartVote is designed to work with any EVM (Ethereum Virtual Machine)
              blockchains, public or private.
            </TextContent>
          </div>
          <Image
            src={smartVoteBlockchains}
            alt="SmartVote: Blockchains - Nicolas Milliard"
            className="rounded-2xl"
          />
        </div>
      </section>

      {/* Why SmartVote */}
      <section className="mx-6 md:mx-auto mb-32 md:mb-48 sm:px-0 md:px-16 sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <SectionTitle color="black" center={false}>
          Why SmartVote&nbsp;?
        </SectionTitle>

        {/* Text */}
        <div>
          <TextContent>
            SmartVote uses Blockchain technology via Smart Contracts written in Solidity. The use of
            the Blockchain allows a perfect traceability of the entire voting session, from the
            addition of voters to the results of the vote itself.
          </TextContent>
          <TextContent>
            SmartVote thus allows the creation of totally unforgeable and incensurable voting
            instances.
          </TextContent>
        </div>
        <div>
          <Image
            src={smartVoteWhy}
            alt="SmartVote Smart Contracts - Nicolas Milliard"
            className="rounded-2xl"
          />
        </div>
      </section>

      {/* UX/UI */}
      <section className="mx-6 md:mx-auto mb-32 md:mb-48 sm:px-0 md:px-16 sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        {/* Title */}
        <SectionTitle color="black" center={false}>
          SmartVote UX / UI
        </SectionTitle>
        <Image src={smartVoteUXUI} alt="SmartVote UX / UI - Nicolas Milliard" className="mb-6" />
        <div className="max-w-xl">
          <TextContent>
            In order to offer an optimal user experience, SmartVote had to respect two constraints:
          </TextContent>
          <ListContent>
            <li className="leading-relaxed">
              a clean and easily modifiable design to fit the companies that will use this dApp;
            </li>
            <li className="leading-relaxed">des parcours utilisateurs simples et intuitifs.</li>
          </ListContent>
        </div>
        <div className="flex flex-col items-center md:flex-row mb-6">
          <div className="max-w-xl">
            <TextContent>
              Moreover, an interface optimization has been implemented in order to minimize the
              constraint related to the use of the blockchain: connection to the digital wallet,
              waiting time during transactions, use on smartphone...
            </TextContent>
          </div>
          <Image
            src={smartVoteWallets}
            alt="SmartVote Wallets - Nicolas Milliard"
            className="rounded-2xl mt-6 md:mt-0 md:ml-6"
          />
        </div>
        <TextContent>
          Thus, the SmartVote dApp makes it as easy as possible to connect to numerous wallets in
          just one click, both on a computer and a smartphone. In addition, a loading indicator is
          displayed throughout the duration of the transaction, from its initialization to its
          registration on the blockchain.
        </TextContent>
      </section>

      {/* Code */}
      <section className="mx-6 md:mx-auto mb-32 md:mb-48 sm:px-0 md:px-16 sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        {/* Title */}
        <SectionTitle color="black" center={false}>
          Realization of SmartVote
        </SectionTitle>
        {/* Web 2 */}
        <div className="mb-8">
          <SectionSubTitle>Web 2 technologies</SectionSubTitle>
          <div className="flex flex-col items-center md:flex-row">
            <div className="md:mr-6 max-w-xl">
              <TextContent>
                The Next.js framework was chosen for the design of the SmartVote dApp for many
                reasons, including its powerful and easily implemented routing system. SmartVote
                allows to create many voting sessions and Next.js allows to simplify their
                management and display.
              </TextContent>
              <TextContent>
                On the CSS side, the TailwindCSS framework was chosen for its compatibility with
                Next.js and for its ease of use. SmartVote interface must be simple and familiar to
                the user and TailwindCSS perfectly meets this need.
              </TextContent>
              <TextContent>
                In addition, Toastify was used to make interactions with the Blockchain more fluid.
                The management of asynchronous requests thanks to Toastify allows instant and
                precise feedback on the status of a transaction.
              </TextContent>
            </div>
            <Image src={nextJS} alt="Next.js - Nicolas Milliard" />
          </div>
        </div>
        {/* Web 3 */}
        <div className="mb-8">
          <SectionSubTitle>Web 3 technologies</SectionSubTitle>
          <div className="flex flex-col items-center md:flex-row">
            <div className="md:mr-6 max-w-xl">
              <TextContent>
                Hardhat has been used, together with Ethers.js, to deploy and test the different
                smart contracts of the dApp. Hardhat allows to estimate the cost of deploying a
                smart contract and to get a feedback on the coverage of the smart contracts tests.
              </TextContent>
              <TextContent>
                Concerning the connection with the Blockchain and the users' digital wallet, Rainbow
                Kit was used, together with Wagmi.sh.
              </TextContent>
              <TextContent>
                Finally, in order to fluidify the call to events recorded on the Blockchain, The
                Graph has been added to the project.
              </TextContent>
            </div>
            <Image src={hardhat} alt="Hardhat - Nicolas Milliard" />
          </div>
        </div>
        {/* Smart Contracts */}
        <div>
          <SectionSubTitle>Structure of Smart Contracts</SectionSubTitle>
          <div className="flex flex-col items-center md:flex-row">
            <div className="md:mr-6 max-w-3xl">
              <TextContent>The SmartVote dApp is divided into 3 smart contracts:</TextContent>
              <ListContent>
                <li className="leading-relaxed">
                  VotingFactory.sol: allows to create voting instances respecting the EIP-1167.
                  Although adding an additional cost of 700 gas per iteration, EIP-1167 allows a
                  simplification of the VotingFactory contract and a very large reduction of the
                  deployment costs;
                </li>
                <li className="leading-relaxed">
                  VotingHandler.sol: serves as a reference to the Clons created by VotingFactory.
                  This smart contract contains all the logic of the voting sessions: adding voters,
                  adding proposals, couting votes, second round... This smart contract is
                  Upgradeable to allow cloning and registration of a new contract owner. Moreover,
                  VotingHandler is Pausable in order to propose to the users of the dApp a
                  "deletion" of a voting instance (classic deletion impossible on the Blockchain);
                </li>
                <li className="leading-relaxed">
                  InstancesList.sol: this smart contract acts as a bookmark and allows "Non Voters"
                  to follow or stop following a voting instance from their dashboard.
                </li>
              </ListContent>
            </div>
            <Image src={smartVoteSolidity} alt="SmartVote Solidity - Nicolas Milliard" />
          </div>
          <Image
            src={smartVoteEIP}
            alt="SmartVote EIP-1167 - Nicolas Milliard"
            className="mt-10 rounded-2xl"
          />
        </div>
      </section>
    </div>
  );
};

export default SmartVote;
