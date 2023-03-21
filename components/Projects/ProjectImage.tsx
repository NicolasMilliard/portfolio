import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface Props {
  casestudyURI: string | null;
  projectURI: string;
  imageURI: string;
  imageAlt: string;
}

const ProjectImage: FC<Props> = ({ casestudyURI, projectURI, imageURI, imageAlt }) => {
  // If a case study exists, link redirects to this page. If not, link redirects to the project website.
  return (
    <>
      {casestudyURI != '' ? (
        <Link href={`/case-study/${casestudyURI}`}>
          <Image
            src={imageURI}
            alt={imageAlt}
            width="510"
            height="340"
            className="rounded-2xl shadow"
          />
        </Link>
      ) : (
        <Link href={projectURI} target="_blank">
          <Image
            src={imageURI}
            alt={imageAlt}
            width="510"
            height="340"
            className="rounded-2xl shadow"
          />
        </Link>
      )}
    </>
  );
};

export default ProjectImage;
