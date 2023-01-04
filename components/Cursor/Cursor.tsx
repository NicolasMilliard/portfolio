import React, { FC, useRef, useEffect } from 'react';

interface CursorProps {
  top: number;
  left: number;
}

const Cursor: FC<CursorProps> = ({ top, left }) => {
  let cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    cursorRef.current?.setAttribute('style', `top: ${top - 16}px; left: ${left - 16}px`);
  }, [top, left]);

  return <div ref={cursorRef} className="custom-cursor"></div>;
};

export default Cursor;
