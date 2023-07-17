import React, { useState, MouseEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  link: string;
  imageSource: string;
  imageText: string;
}

const SocialLinks: React.FC<Props> = ({ link, imageSource, imageText }) => {
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const [opacity, setOpacity] = useState(0.75);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const h = rect.width / 2;

    const x = e.clientX - rect.left - h;
    const y = e.clientY - rect.top - h;

    const r1 = Math.sqrt(x * x + y * y);
    const r2 = (1 - r1 / h) * r1;

    const angle = Math.atan2(y, x);
    const newTx = Math.round(Math.cos(angle) * r2 * 100) / 100;
    const newTy = Math.round(Math.sin(angle) * r2 * 100) / 100;

    const newOpacity = r2 / r1 + 0.75;

    setTx(newTx);
    setTy(newTy);
    setOpacity(newOpacity);
  };

  const handleMouseLeave = () => {
    setTx(0);
    setTy(0);
    setOpacity(0.75);
  };

  return (
    <button
      className="gravity-button-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={link}
        target="_blank"
        className="gravity-button"
        style={{
          left: `${tx}px`,
          top: `${ty}px`,
          opacity: `${opacity}`,
        }}
      >
        <Image src={imageSource} alt={imageText} />
      </Link>
    </button>
  );
};

export default SocialLinks;
