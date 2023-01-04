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

  return <div ref={cursorRef} className="custom-cursor"></div>;
};

export default Cursor;
