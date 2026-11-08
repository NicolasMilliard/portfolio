import {
  greetingComma,
  helloStrokes,
  nameUnderlineStrokes,
} from './greetingMotion';

import { Handwriting } from './ui/Handwriting';
import { strokeStyle } from './ui/strokeStyle';

export function Greeting() {
  return (
    <h1>
      <span className="greeting">
        <span className="hello-word">
          <span className="visually-hidden">Hello</span>
          <Handwriting strokes={helloStrokes} viewBox={[4, 4, 168, 90]} />
        </span>
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
