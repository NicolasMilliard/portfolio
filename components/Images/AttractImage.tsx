import React from 'react';
import Image from 'next/image';
import Atropos from 'atropos/react';

import nicolas from '../../public/images/homepage/full-stack-developer.png';

const AttractImage = () => {
  return (
    <>
      <Atropos shadow={false}>
        <div className="hidden relative bg-brown-100 lg:w-96 lg:h-96 lg:block lg:relative">
          <div className="bg-salmon rounded-2xl">
            <Image
              src={nicolas}
              alt="Full-Stack Developer & Web3 - Nicolas Milliard"
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
