import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  greetingComma,
  nameUnderlineStrokes,
} from '../src/features/home/greetingMotion.ts';
import { helloLettering } from '../src/features/home/helloLettering.ts';

const end = (stroke) => stroke.delay + stroke.duration;

test('the H finishes its separate strokes before the e starts', () => {
  const h = helloLettering.filter((stroke) => stroke.letter === 'H');
  const e = helloLettering.find((stroke) => stroke.letter === 'e');

  for (let index = 1; index < h.length; index++) {
    assert.ok(h[index].delay >= end(h[index - 1]));
  }
  assert.ok(e.delay >= Math.max(...h.map(end)) + 100);
});

test('the comma and name underline wait for the entire greeting', () => {
  const helloEnd = Math.max(...helloLettering.map(end));

  assert.ok(greetingComma.delay > helloEnd);
  assert.ok(nameUnderlineStrokes[0].delay > end(greetingComma));
});

test('each name underline finishes before the next one starts', () => {
  for (let index = 1; index < nameUnderlineStrokes.length; index++) {
    assert.ok(
      nameUnderlineStrokes[index].delay > end(nameUnderlineStrokes[index - 1]),
    );
  }
});
