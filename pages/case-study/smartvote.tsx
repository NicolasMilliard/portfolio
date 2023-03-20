import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import SocialLinks from '../../components/Social/SocialLinks';
import ToolsList from '../../components/Projects/ToolsList';
import Button from '../../components/Buttons/Button';
import ButtonLoader from '../../components/Buttons/ButtonLoader';

import smartVoteDapp from '../../public/images/case-study/smartvote/smart-vote-dapp.png';
import smartVoteBlockchains from '../../public/images/case-study/smartvote/smart-vote-blockchains.png';
import smartVoteWhy from '../../public/images/case-study/smartvote/why-smart-vote.png';
import smartVoteUXUI from '../../public/images/case-study/smartvote/ux-ui-smart-vote.png';
import smartVoteWallets from '../../public/images/case-study/smartvote/smart-vote-wallets.png';
import smartVoteNext from '../../public/images/case-study/smartvote/nextjs-logo.svg';
import smartVoteHardhat from '../../public/images/case-study/smartvote/hardhat-logo.svg';
import smartVoteSolidity from '../../public/images/case-study/smartvote/solidity-logo.svg';
import smartVoteEIP from '../../public/images/case-study/smartvote/smart-vote-eip-1167.png';

const SmartVote = () => {
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

      <SocialLinks />

      {/* Project presentation */}
      <section className="flex flex-col items-center py-28 px-8 mx-auto sm:px-0 sm:max-w-xl md:py-48 md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <h1 className="font-oswald-bold text-6xl leading-relaxed text-yellow">SmartVote</h1>
        <h2 className="font-oswald-semibold text-5xl leading-relaxed text-salmon mb-8">
          Créer, gérer et rejoindre des sessions de vote
        </h2>
        {/* Image and tools */}
        <div className="flex flex-col md:flex-row">
          <div className="mb-6 md:mb-0 md:mr-6">
            <Image
              src={smartVoteDapp}
              alt="SmartVote dApp - Nicolas Milliard"
              className="rounded-2xl"
            />
          </div>
          <ToolsList
            tools={[
              'Next.js',
              'Hardhat',
              'Ethers.js',
              'The Graph',
              'Wagmi',
              'Rainbow Kit',
              'TailwindCSS',
              'Toastify',
              'Multi-chains',
            ]}
            direction="col"
          />
        </div>
        {/* Links */}
        <div className="mt-8">
          <Button
            text="Voir le projet"
            theme=""
            link="https://my-smartvote.vercel.app/"
            target="_blank"
          />
          <Link
            href="https://github.com/NicolasMilliard/SmartVote"
            className="ml-4 text-yellow underline hover:font-semibold"
            target="_blank"
          >
            Github du projet
          </Link>
        </div>
      </section>

      {/* What is SmartVote */}
      <section className="mb-28 px-8 mx-auto sm:px-0 sm:max-w-xl md:mb-48 md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <h2 className="font-oswald-semibold text-5xl leading-relaxed text-yellow mb-8">
          Qu'est-ce que SmartVote&nbsp;?
        </h2>
        <div className="flex flex-col items-center md:flex-row">
          <div className="md:mr-6">
            <p className="text-yellow mt-8 mb-8 max-w-2xl">
              SmartVote permet aux utilisateurs d'organiser leurs propres instances de vote,
              d'ajouter des utilisateurs sur une liste blanche, de créer des propositions et de
              comptabiliser les votes. Fonctionne sur les blockchains Polygon et Avalanche.
            </p>
            <p className="text-yellow mt-8 mb-8 max-w-2xl">
              De manière générale, SmartVote est conçu pour fonctionner avec n'importe qu'elle
              blockchain, publique ou privée, de type EVM (Ethereum Virtual Machine).
            </p>
          </div>
          <Image
            src={smartVoteBlockchains}
            alt="SmartVote: Blockchains - Nicolas Milliard"
            className="rounded-2xl"
          />
        </div>
      </section>

      {/* Why SmartVote */}
      <section className="mb-28 px-8 mx-auto sm:px-0 sm:max-w-xl md:mb-48 md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <h2 className="font-oswald-semibold text-5xl leading-relaxed text-yellow mb-8">
          Pourquoi SmartVote&nbsp;?
        </h2>
        <p className="text-yellow mt-8 mb-8 max-w-2xl">
          SmartVote utilise la technologie de la Blockchain via des Smart Contracts rédigés en
          Solidity. L'utilisation de la Blockchain permet une parfaite traçabilité de la totalité
          d'une session de vote, de l'ajout des électeurs jusqu'aux résultats du vote en lui-même.
        </p>
        <p className="text-yellow mt-8 mb-8 max-w-2xl">
          SmartVote permet ainsi la création d'instances de vote totalement infalsifiables et
          incensurables.
        </p>
        <Image
          src={smartVoteWhy}
          alt="SmartVote Smart Contracts - Nicolas Milliard"
          className="rounded-2xl"
        />
      </section>

      {/* UX/UI */}
      <section className="mb-28 px-8 mx-auto sm:px-0 sm:max-w-xl md:mb-48 md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <h2 className="font-oswald-semibold text-5xl leading-relaxed text-yellow mb-8">
          UX / UI de SmartVote
        </h2>
        <Image src={smartVoteUXUI} alt="SmartVote UX / UI - Nicolas Milliard" />
        <p className="text-yellow mt-8 mb-8 max-w-2xl">
          Afin de proposer une expérience utilisateur optimale, SmartVote se devait de respecter
          deux contraintes&nbsp;:
        </p>
        <ul className="list-disc ml-8 max-w-2xl">
          <li className="text-yellow mb-4">
            un design épuré et facilement modifiable afin de s'adapter aux entreprises qui
            utiliseront cette dApp&nbsp;;
          </li>
          <li className="text-yellow">des parcours utilisateurs simples et intuitifs.</li>
        </ul>
        <div className="flex flex-col items-center md:flex-row">
          <p className="text-yellow mt-8 mb-8 max-w-2xl md:mr-6">
            De plus, une optimisation de l'interface a été mise en place afin de minimiser la
            contrainte liée à l'utilisation de la blockchain (connexion au portefeuille numérique,
            temps d'attente durant les transactions, utilisation sur téléphone portable...).
          </p>
          <Image
            src={smartVoteWallets}
            alt="SmartVote Wallets - Nicolas Milliard"
            className="rounded-2xl"
          />
        </div>
        <div className="flex flex-col items-center md:flex-row">
          <p className="text-yellow mt-8 mb-8 max-w-2xl md:mr-6">
            Ainsi, la dApp SmartVote simplifie au maximum la connexion à de nombreux portefeuilles
            en 1 clic seulement, aussi bien sur ordinateur que sur téléphone portable. De plus, un
            indicateur de chargement est affiché durant toute la durée de la transaction, de son
            initialisation jusqu'à son inscription sur la blockchain.
          </p>
          <ButtonLoader />
        </div>
      </section>

      {/* Code */}
      <section className="mb-28 px-8 mx-auto sm:px-0 sm:max-w-xl md:mb-48 md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <h2 className="font-oswald-semibold text-5xl leading-relaxed text-yellow mb-8">
          Réalisation de SmartVote
        </h2>
        {/* Web 2 */}
        <div className="mb-10">
          <h3 className="font-oswald-semibold text-3xl leading-relaxed text-salmon mb-8">
            Technologies Web 2
          </h3>
          <div className="flex flex-col items-center md:flex-row">
            <div className="md:mr-6">
              <p className="text-yellow mt-8 mb-8 max-w-2xl">
                Le framework Next.js a été retenu pour la conception de la dApp SmartVote pour de
                nombreuses raisons, notamment pour son système de routage puissant et facilement mis
                en place. SmartVote permet de créer de nombreuses sessions de vote et Next.js permet
                de simplifier leurs gestions et leurs affichages.
              </p>
              <p className="text-yellow mt-8 mb-8 max-w-2xl">
                Côté CSS, le framework TailwindCSS a été retenu pour sa compatibilité avec Next.js
                et pour sa simplicité d'utilisation. L'interface de SmartVote se doit d'être simple
                et familière avec l'utilisateur et TailwindCSS répond parfaitement à ce besoin.
              </p>
              <p className="text-yellow mt-8 mb-8 max-w-2xl">
                De plus, Toastify a été utilisé afin de fluidifier les interactions avec la
                Blockchain. La gestion des requêtes asynchrones grâce à Toastify permet des retours
                instantanés et précis de l'état d'une transaction.
              </p>
            </div>
            <Image src={smartVoteNext} alt="Next.js - Nicolas Milliard" />
          </div>
        </div>
        {/* Web 3 */}
        <div className="mb-10">
          <h3 className="font-oswald-semibold text-3xl leading-relaxed text-salmon mb-8">
            Technologies Web 3
          </h3>
          <div className="flex flex-col items-center md:flex-row">
            <div className="md:mr-6">
              <p className="text-yellow mt-8 mb-8 max-w-2xl">
                Hardhat a été utilisé, de pair avec Ethers.js, afin de déployer et tester les
                différents smart contracts de la dApp. Hardhat permet notamment une estimation des
                coûts de déploiement d'un smart contract et permet également d'obtenir un retour
                d'informations sur la couverture des tests des smart contracts.
              </p>
              <p className="text-yellow mt-8 mb-8 max-w-2xl">
                Concernant la connexion avec la Blockchain et le portefeuille numérique des
                utilisateurs, Rainbow Kit a été utilisé, de pair avec Wagmi.sh.
              </p>
              <p className="text-yellow mt-8 mb-8 max-w-2xl">
                Enfin, afin de fluidifier l'appel aux évènements enregistrés sur la Blockchain, The
                Graph a été ajouté au projet.
              </p>
            </div>
            <Image src={smartVoteHardhat} alt="Hardhat - Nicolas Milliard" />
          </div>
        </div>
        {/* Smart Contracts */}
        <div>
          <h3 className="font-oswald-semibold text-3xl leading-relaxed text-salmon mb-8">
            Structure des Smart Contracts
          </h3>
          <div className="flex flex-col items-center md:flex-row">
            <div className="md:mr-6">
              <p className="text-yellow mt-8 mb-8 max-w-2xl">
                La dApp SmartVote est divisée en 3 smart contracts&nbsp;:
              </p>
              <ul className="list-disc ml-8 mb-8 md:mb-0 max-w-2xl">
                <li className="text-yellow mb-4">
                  VotingFactory.sol&nbsp;: permet de créer des instances de votes en respectant
                  l'EIP-1167. Bien qu'ajoutant un coût supplémentaire de 700 gas par itération,
                  l'EIP-1167 permet une simplification du contrat VotingFactory ainsi qu'une très
                  grande réduction des coûts de déploiements&nbsp;;
                </li>
                <li className="text-yellow mb-4">
                  VotingHandler.sol&nbsp;: sert de référence aux Clones créés par VotingFactory. Ce
                  smart contract contient toute la logique des sessions de vote&nbsp;: ajout des
                  électeurs, ajout des propositions, comptage des voies, second tour... Ce smart
                  contract est Upgradeable pour permettre le clonage et l'enregistrement d'un
                  nouveau propriétaire de contrat. De plus, VotingHandler est Pausable afin de
                  proposer aux utilisateurs de la dApp une "suppression" d'une instance de vote
                  (suppression classique impossible sur la Blockchain)&nbsp;;
                </li>
                <li className="text-yellow">
                  InstancesList.sol&nbsp;: ce smart contract agit comme un marque-page et permet aux
                  "Non Voters" de suivre ou d'arrêter de suivre une instance de vote depuis leur
                  tableau de bord.
                </li>
              </ul>
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

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['logo', 'menu', 'footer'])),
    },
  };
}

export default SmartVote;
