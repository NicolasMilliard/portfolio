import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  advanceSequence,
  CYCLE_SECONDS,
  CLUE_NUMBERS,
  formatCountdown,
  isValidSequence,
  LOST_SEQUENCE,
  OCEANIC_FLIGHT,
} from '../src/features/lost/protocol.ts';

test('the boarding pass, flight and lottery clues give the complete LOST sequence', () => {
  const discovered = Object.values(CLUE_NUMBERS)
    .flat()
    .toSorted((a, b) => a - b)
    .join(' ');
  assert.equal(isValidSequence(discovered), true);
  assert.equal(OCEANIC_FLIGHT, '815');
  assert.deepEqual(CLUE_NUMBERS.ticket, [4, 23]);
  assert.deepEqual(CLUE_NUMBERS.lottery, [16, 42]);
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
