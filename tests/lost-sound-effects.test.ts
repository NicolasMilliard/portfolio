import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  createSoundEffects,
  SOUND_EFFECT_NAMES,
  type SoundEffect,
} from '../src/features/404/soundEffects.ts';

const createClip = () => ({
  currentTime: 0,
  volume: 1,
  preload: 'none' as HTMLAudioElement['preload'],
  paused: true,
  plays: 0,
  loads: 0,
  pause() {
    this.paused = true;
  },
  play() {
    this.paused = false;
    this.plays++;
    return Promise.resolve();
  },
  load() {
    this.loads++;
    this.currentTime = 0;
    this.paused = true;
  },
});

function setup() {
  let enabled = true;
  let time = 0;
  const clips = Object.fromEntries(
    SOUND_EFFECT_NAMES.map((name) => [name, createClip()]),
  ) as Record<SoundEffect, ReturnType<typeof createClip>>;
  const effects = createSoundEffects({
    getClip: (name) => clips[name],
    isEnabled: () => enabled,
    now: () => time,
  });
  return {
    effects,
    clips,
    enable: (value: boolean) => {
      enabled = value;
    },
    tick: (value: number) => {
      time = value;
    },
  };
}

test('muted interactions neither play nor preload effects', () => {
  const { effects, clips, enable } = setup();
  enable(false);
  for (const name of SOUND_EFFECT_NAMES) effects.play(name);
  effects.warm();
  assert.equal(
    Object.values(clips).every((clip) => clip.plays === 0 && clip.loads === 0),
    true,
  );
});

test('a new discovery replaces the old cue and fast repeated clicks do not stack', () => {
  const { effects, clips, tick } = setup();
  effects.play('terminal');
  effects.play('paper');
  assert.equal(clips.terminal.paused, true);
  assert.equal(clips.paper.paused, false);
  tick(30);
  effects.play('paper');
  assert.equal(clips.paper.plays, 1);
  tick(100);
  clips.paper.currentTime = 0.5;
  effects.play('paper');
  assert.equal(clips.paper.plays, 2);
  assert.equal(clips.paper.currentTime, 0);
});

test('warming caches each cue once without resetting the currently playing sound', () => {
  const { effects, clips } = setup();
  effects.play('baggage');
  clips.baggage.currentTime = 0.2;
  effects.warm();
  effects.warm();
  assert.equal(clips.baggage.paused, false);
  assert.equal(clips.baggage.currentTime, 0.2);
  assert.equal(clips.baggage.loads, 0);
  assert.equal(
    SOUND_EFFECT_NAMES.filter((name) => name !== 'baggage').every(
      (name) => clips[name].loads === 1,
    ),
    true,
  );
});

test('late playback completions cannot resurrect an old cue or sound after leaving', async () => {
  const { effects, clips } = setup();
  let finishTerminal: (() => void) | undefined;
  let finishPaper: (() => void) | undefined;
  clips.terminal.play = () =>
    new Promise<void>((resolve) => {
      finishTerminal = resolve;
    });
  clips.paper.play = () =>
    new Promise<void>((resolve) => {
      finishPaper = resolve;
    });
  effects.play('terminal');
  effects.play('paper');
  clips.terminal.paused = false;
  assert.ok(finishTerminal);
  finishTerminal();
  await Promise.resolve();
  assert.equal(clips.terminal.paused, true);
  effects.dispose();
  clips.paper.paused = false;
  assert.ok(finishPaper);
  finishPaper();
  await Promise.resolve();
  assert.equal(clips.paper.paused, true);
  effects.play('ui');
  assert.equal(clips.ui.plays, 0);
});

test('denied playback is nonfatal and does not prevent a later interaction', async () => {
  const { effects, clips } = setup();
  clips.terminal.play = () => Promise.reject(new Error('Autoplay denied'));
  effects.play('terminal');
  await Promise.resolve();
  await Promise.resolve();
  effects.play('paper');
  assert.equal(clips.paper.plays, 1);
});
