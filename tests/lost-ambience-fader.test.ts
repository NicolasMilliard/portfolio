import assert from 'node:assert/strict';
import { test } from 'node:test';

import { createAmbienceFader } from '../src/features/404/ambienceFader.ts';

function setup() {
  let time = 0;
  let next = 0;
  const frames = new Map<number, FrameRequestCallback>();
  const clip = {
    paused: true,
    volume: 0.45,
    pause() {
      this.paused = true;
    },
    play() {
      this.paused = false;
      return Promise.resolve();
    },
  };
  const fader = createAmbienceFader({
    clip,
    now: () => time,
    requestFrame: (callback) => {
      frames.set(++next, callback);
      return next;
    },
    cancelFrame: (id) => frames.delete(id),
  });
  const advance = (milliseconds: number) => {
    time += milliseconds;
    const callbacks = [...frames.values()];
    frames.clear();
    for (const callback of callbacks) callback(time);
  };
  return { clip, fader, advance, frames };
}

test('the existing loop eases in, then suspends after a short fade', async () => {
  const { clip, fader, advance, frames } = setup();
  await fader.resume();
  assert.equal(clip.volume, 0);
  advance(350);
  assert.equal(clip.volume, 0.225);
  advance(350);
  assert.equal(clip.volume, 0.45);
  fader.suspend();
  advance(90);
  assert.equal(clip.paused, false);
  assert.equal(clip.volume, 0.225);
  advance(90);
  assert.equal(clip.paused, true);
  assert.equal(clip.volume, 0);
  assert.equal(frames.size, 0);
});

test('quickly closing an inspection reverses the fade without a stale pause', async () => {
  const { clip, fader, advance, frames } = setup();
  await fader.resume();
  advance(700);
  fader.suspend();
  advance(90);
  await fader.resume();
  assert.equal(clip.volume, 0.225);
  advance(700);
  assert.equal(clip.paused, false);
  assert.equal(clip.volume, 0.45);
  assert.equal(frames.size, 0);
});

test('an interaction on a playing loop cannot cut the inspection fade short', async () => {
  const { clip, fader, advance } = setup();
  await fader.resume();
  advance(700);
  const pending = fader.resume();
  fader.suspend();
  await pending;
  advance(90);
  assert.equal(clip.paused, false);
  assert.equal(clip.volume, 0.225);
  advance(90);
  assert.equal(clip.paused, true);
});

test('mute, hidden-tab stop and disposal silence immediately and cancel ramps', async () => {
  const { clip, fader, advance, frames } = setup();
  await fader.resume();
  advance(350);
  fader.stop();
  assert.equal(clip.paused, true);
  assert.equal(clip.volume, 0);
  assert.equal(frames.size, 0);
  await fader.resume();
  advance(100);
  fader.dispose();
  advance(700);
  await fader.resume();
  assert.equal(clip.paused, true);
  assert.equal(clip.volume, 0);
  assert.equal(frames.size, 0);
});

test('a late play completion cannot restore sound after stopping', async () => {
  const { clip, fader, frames } = setup();
  let finish: (() => void) | undefined;
  clip.play = () =>
    new Promise<void>((resolve) => {
      finish = () => {
        clip.paused = false;
        resolve();
      };
    });
  const pending = fader.resume();
  fader.stop();
  assert.ok(finish);
  finish();
  await pending;
  assert.equal(clip.paused, true);
  assert.equal(clip.volume, 0);
  assert.equal(frames.size, 0);
});

test('denied playback remains recoverable on the next user gesture', async () => {
  const { clip, fader, advance } = setup();
  clip.play = () => Promise.reject(new Error('Autoplay denied'));
  await assert.rejects(fader.resume());
  clip.play = () => {
    clip.paused = false;
    return Promise.resolve();
  };
  await fader.resume();
  advance(700);
  assert.equal(clip.paused, false);
  assert.equal(clip.volume, 0.45);
});
