import React, { FC, useRef, useEffect } from 'react';

interface CursorProps {
  top: number;
  left: number;
}

const Cursor: FC<CursorProps> = ({ top, left }) => {
  let cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    cursorRef.current?.setAttribute('style', `top: ${top}px; left: ${left}px`);
  }, [top, left]);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor hidden md:block absolute before:absolute pointer-events-none mix-blend-difference"
    ></div>
  );
};

export default Cursor;
