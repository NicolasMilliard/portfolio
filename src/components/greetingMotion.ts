import { helloLettering } from './helloLettering';

const helloEnd = Math.max(
  ...helloLettering.flatMap((letter) =>
    letter.strokes.map((stroke) => stroke.delay + stroke.duration),
  ),
);

export const greetingComma = { delay: helloEnd + 40, duration: 120 };

const firstUnderline = {
  path: 'M4 11C65 2 164 2 255 8',
  delay: greetingComma.delay + greetingComma.duration + 220,
  duration: 460,
};

export const nameUnderlineStrokes = [
  firstUnderline,
  {
    path: 'M24 15C98 7 184 7 231 11',
    delay: firstUnderline.delay + firstUnderline.duration + 100,
    duration: 320,
  },
];
