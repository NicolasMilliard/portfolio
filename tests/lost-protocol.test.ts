import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  advanceSequence,
  CYCLE_SECONDS,
  CLUE_NUMBERS,
  countdownRemaining,
  formatCountdown,
  isValidSequence,
  LOST_SEQUENCE,
  OCEANIC_FLIGHT,
  startCountdown,
} from '../src/features/404/protocol.ts';

test('four discoveries supply all six numbers without relying on Flight 815', () => {
  const discovered = Object.values(CLUE_NUMBERS)
    .flat()
    .toSorted((a, b) => a - b)
    .join(' ');
  assert.equal(isValidSequence(discovered), true);
  assert.equal(new Set(Object.values(CLUE_NUMBERS).flat()).size, 6);
  assert.equal(OCEANIC_FLIGHT, '815');
  assert.deepEqual(CLUE_NUMBERS.ticket, [4, 23]);
  assert.deepEqual(CLUE_NUMBERS.lottery, [16, 42]);
  assert.deepEqual(CLUE_NUMBERS.wheelchair, [8]);
  assert.deepEqual(CLUE_NUMBERS.can, [15]);
});

test('accepts the sequence with ordinary spacing variations or continuous digits', () => {
  for (const value of [
    '4 8 15 16 23 42',
    '4815162342',
    '  4   8  15 16 23 42  ',
    '4\t8\n15 16 23 42',
    '4\u00a08 15 16 23 42',
  ])
    assert.equal(isValidSequence(value), true, value);
});

test('rejects wrong, reordered, partial, or contaminated sequences', () => {
  for (const value of [
    '',
    ' ',
    '4 8 15 16 23',
    '4 8 15 16 23 41',
    '8 4 15 16 23 42',
    '4 8 15 16 23 42 0',
    '4,8,15,16,23,42',
    '4a8b15c16d23e42',
    '+4815162342',
    '4.8.15.16.23.42',
  ])
    assert.equal(isValidSequence(value), false, value);
});

test('keyboard discovery uses a bounded buffer and can recover after wrong digits', () => {
  let buffer = '';
  for (const key of `999${LOST_SEQUENCE}`)
    buffer = advanceSequence(buffer, key);
  assert.equal(buffer, LOST_SEQUENCE);
  assert.equal(advanceSequence(buffer, 'x'), '');
  assert.equal(advanceSequence('4815', ' '), '4815');
  assert.equal(advanceSequence('4815', 'Shift'), '4815');
});

test('countdown formats the 108-minute cycle and clamps at zero', () => {
  assert.equal(formatCountdown(CYCLE_SECONDS), '108:00');
  assert.equal(formatCountdown(CYCLE_SECONDS - 1), '107:59');
  assert.equal(formatCountdown(60), '001:00');
  assert.equal(formatCountdown(1), '000:01');
  assert.equal(formatCountdown(-5), '000:00');
});

test('the cycle starts only on first use and cannot restart on reopening', () => {
  assert.equal(countdownRemaining(null, 900_000), CYCLE_SECONDS);
  const deadline = startCountdown(null, 900_000);
  assert.equal(deadline, 900_000 + CYCLE_SECONDS * 1000);
  assert.equal(startCountdown(deadline, 960_000), deadline);
  assert.equal(countdownRemaining(deadline, 960_000), CYCLE_SECONDS - 60);
  // A fresh page owns a fresh, initially unstarted cycle.
  assert.equal(startCountdown(null, 960_000), deadline + 60_000);
});

test('the countdown includes time spent closed or throttled and expires at zero', () => {
  const deadline = startCountdown(null, 1000);
  assert.equal(countdownRemaining(deadline, 1000), CYCLE_SECONDS);
  assert.equal(countdownRemaining(deadline, 1999), CYCLE_SECONDS);
  assert.equal(countdownRemaining(deadline, 2000), CYCLE_SECONDS - 1);
  assert.equal(countdownRemaining(deadline, 121_000), CYCLE_SECONDS - 120);
  assert.equal(countdownRemaining(deadline, deadline), 0);
  assert.equal(countdownRemaining(deadline, deadline + 500_000), 0);
  assert.equal(startCountdown(deadline, deadline + 500_000), deadline);
});
