import { useId, type CSSProperties } from 'react';

import { helloLettering } from './helloLettering';

export function HelloWriting() {
  const id = useId();

  return (
    <span className="hello-word">
      <span className="visually-hidden">Hello</span>
      <svg
        viewBox="4 4 168 90"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          {helloLettering.map((letter, index) => (
            <mask
              id={`${id}-hello-${index}`}
              key={index}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="180"
              height="100"
            >
              {letter.strokes.map((stroke, strokeIndex) => (
                <path
                  key={strokeIndex}
                  className="hello-stroke"
                  d={stroke.path}
                  fill="none"
                  stroke="white"
                  strokeWidth="13"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength="1"
                  style={
                    {
                      '--stroke-delay': `${stroke.delay}ms`,
                      '--stroke-duration': `${stroke.duration}ms`,
                    } as CSSProperties
                  }
                />
              ))}
            </mask>
          ))}
        </defs>
        {helloLettering.map((letter, index) => (
          <path
            key={index}
            d={letter.outline}
            mask={`url(#${id}-hello-${index})`}
          />
        ))}
      </svg>
    </span>
  );
}
