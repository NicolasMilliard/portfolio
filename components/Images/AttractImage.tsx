import React, { useState } from 'react';

const AttractImage = () => {
  const [imgTop, setImgTop] = useState(0);
  const [imgLeft, setImgLeft] = useState(0);

  const attractImage = (e: React.MouseEvent) => {
    let xPos = e.clientX;
    let yPos = e.clientY;

    setImgTop(yPos / 10);
    setImgLeft(xPos / 75);
  };

  const resetImagePos = () => {
    setImgTop(0);
    setImgLeft(0);
  };

  return (
    <div
      id="image-container"
      className="hidden lg:block relative"
      onMouseMove={attractImage}
      onMouseLeave={resetImagePos}
    >
      <div
        id="image-wrapper"
        className="absolute"
        style={{ top: `${imgTop}px`, left: `${imgLeft}px` }}
      ></div>
      <div
        id="image-border"
        className="absolute"
        style={{ top: `${imgTop + 32}px`, left: `${imgLeft + 32}px` }}
      ></div>
    </div>
  );
};

export default AttractImage;
