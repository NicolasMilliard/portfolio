import React from 'react';
import Image from 'next/image';
import Atropos from 'atropos/react';

import boki from '../../public/images/homepage/full-stack-developer-nicolas-milliard.png';

const AttractImage = () => {
  return (
    <>
      <Atropos shadow={false}>
        <div className="hidden relative bg-brown-100 lg:w-96 lg:h-96 lg:block lg:relative">
          <div className="bg-salmon rounded-2xl">
            <Image
              src={boki}
              alt="Blockchain Developer - Nicolas Milliard"
              className="rounded-2xl"
              priority={true}
              data-atropos-offset="3"
            />
          </div>
        </div>
      </Atropos>
    </>
  );
};

export default AttractImage;
