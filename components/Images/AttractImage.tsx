import React from 'react';
import Image from 'next/image';
import Atropos from 'atropos/react';

import nico from '../../public/images/homepage/full-stack-developer-nicolas-milliard.png';

const AttractImage = () => {
  return (
    <>
      <Atropos shadow={false}>
        <div id="image-container" className="hidden lg:block lg:relative">
          <div id="image-wrapper">
            <Image
              src={nico}
              alt="Full-Stack Developer - Nicolas Milliard"
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
