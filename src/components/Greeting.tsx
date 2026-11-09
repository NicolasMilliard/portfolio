import { greetingComma, helloStrokes, nameWash } from './greetingMotion';

import { Handwriting } from './ui/Handwriting';
import { strokeStyle } from './ui/strokeStyle';
import { WatercolorWash } from './ui/WatercolorWash';

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
        I'm
      </span>{' '}
      <span className="name-wash">
        <WatercolorWash {...nameWash} />
        Nicolas
      </span>
      .
    </h1>
  );
}
