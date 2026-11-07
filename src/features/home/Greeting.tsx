import { useId, type CSSProperties } from 'react';

import {
  greetingComma,
  helloStrokes,
  nameUnderlineStrokes,
} from './greetingMotion';

const strokeStyle = ({
  delay,
  duration,
}: {
  delay: number;
  duration: number;
}) =>
  ({
    '--stroke-delay': `${delay}ms`,
    '--stroke-duration': `${duration}ms`,
  }) as CSSProperties;

function HelloWriting() {
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
          {helloStrokes.map((stroke, index) => (
            <mask
              id={`${id}-hello-${index}`}
              key={index}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="180"
              height="100"
            >
              <path
                className="hello-stroke"
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
        {helloStrokes.map((stroke, index) => (
          <path
            key={index}
            d={stroke.outline}
            mask={`url(#${id}-hello-${index})`}
          />
        ))}
      </svg>
    </span>
  );
}

export function Greeting() {
  return (
    <h1>
      <span className="greeting">
        <HelloWriting />
        <span
          className="handwritten hello-comma"
          style={strokeStyle(greetingComma)}
        >
          ,
        </span>{' '}
        I’m
      </span>{' '}
      <span className="name-underline">
        Nicolas
        <svg
          viewBox="0 0 260 16"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          {nameUnderlineStrokes.map((stroke, index) => (
            <path
              key={index}
              className="name-underline-stroke"
              d={stroke.path}
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              pathLength="1"
              style={strokeStyle(stroke)}
            />
          ))}
        </svg>
      </span>
      .
    </h1>
  );
}
