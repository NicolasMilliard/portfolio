import React, { useState } from 'react';
import Image from 'next/image';

import nico from '../../public/images/homepage/nico.png';

const AttractImage = () => {
  const [imgTop, setImgTop] = useState(0);
  const [imgLeft, setImgLeft] = useState(0);

  const attractImage = (e: React.MouseEvent) => {
    let xPos = e.clientX;
    let yPos = e.clientY;

    setImgTop(yPos);
    setImgLeft(xPos);
  };

  const resetImagePos = () => {
    setImgTop(0);
    setImgLeft(0);
  };

  return (
    <div
      id="image-container"
      className="hidden lg:block lg:relative lg:cursor-none"
      onMouseMove={attractImage}
      onMouseLeave={resetImagePos}
    >
      <div
        id="image-wrapper"
        className="absolute"
        style={{ top: `${imgTop / 15}px`, left: `${imgLeft / 65}px` }}
      >
        <Image src={nico} alt="Nico" className="rounded-2xl nm-shadow" priority={true} />
      </div>
      <div
        id="image-border"
        className="absolute"
        style={{ top: `${imgTop / 25 + 32}px`, left: `${imgLeft / 150 + 32}px` }}
      ></div>
    </div>
  );
};

export default AttractImage;
