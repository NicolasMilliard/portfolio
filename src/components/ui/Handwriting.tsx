import { useId } from 'react';

import { strokeStyle, type StrokeTiming } from './strokeStyle';

type HandwritingStroke = StrokeTiming & {
  outline: string;
  path: string;
};

export function Handwriting({
  strokes,
  viewBox,
}: {
  strokes: readonly HandwritingStroke[];
  viewBox: readonly [number, number, number, number];
}) {
  const id = useId();
  const [x, y, width, height] = viewBox;

  return (
    <svg
      viewBox={viewBox.join(' ')}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {strokes.map((stroke, index) => (
          <mask
            id={`${id}-stroke-${index}`}
            key={index}
            maskUnits="userSpaceOnUse"
            x={x - 13}
            y={y - 13}
            width={width + 26}
            height={height + 26}
          >
            <path
              className="handwriting-stroke"
              d={stroke.path}
              fill="none"
              stroke="white"
              strokeWidth="13"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="1"
              style={strokeStyle(stroke)}
            />
          </mask>
        ))}
      </defs>
      {strokes.map((stroke, index) => (
        <path
          key={index}
          d={stroke.outline}
          mask={`url(#${id}-stroke-${index})`}
        />
      ))}
    </svg>
  );
}
