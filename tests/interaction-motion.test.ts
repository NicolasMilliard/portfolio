import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  isKeyboardInput,
  prefersReducedMotion,
  trackInputModality,
} from '../src/interactionMotion.ts';

test('keyboard and assistive activations stay instant until the pointer is used', () => {
  const previousDocument = Object.getOwnPropertyDescriptor(globalThis, 'document');
  const document = Object.assign(new EventTarget(), {
    documentElement: { dataset: {} as Record<string, string> },
  });
  Object.defineProperty(globalThis, 'document', {
    configurable: true,
    value: document,
  });
  const stopTracking = trackInputModality();
  const input = (type: string, properties: Record<string, unknown>) =>
    document.dispatchEvent(Object.assign(new Event(type), properties));

  try {
    input('keydown', { key: 'Tab' });
    assert.equal(isKeyboardInput(), true);
    input('pointermove', { pointerType: 'mouse', movementX: 0, movementY: 0 });
    assert.equal(isKeyboardInput(), true);
    input('pointermove', { pointerType: 'touch', movementX: 1, movementY: 0 });
    assert.equal(isKeyboardInput(), true);
    input('pointermove', { pointerType: 'mouse', movementX: 1, movementY: 0 });
    assert.equal(isKeyboardInput(), false);
    input('keydown', { key: 'Shift' });
    assert.equal(isKeyboardInput(), false);
    input('click', { detail: 0 });
    assert.equal(isKeyboardInput(), true);
    input('pointerdown', { pointerType: 'touch' });
    assert.equal(isKeyboardInput(), false);
    input('keydown', { key: 'Enter' });
    assert.equal(isKeyboardInput(), true);
    stopTracking();
    input('pointerdown', { pointerType: 'mouse' });
    assert.equal(isKeyboardInput(), true);
  } finally {
    stopTracking();
    if (previousDocument) {
      Object.defineProperty(globalThis, 'document', previousDocument);
    } else {
      Reflect.deleteProperty(globalThis, 'document');
    }
  }
});

test('motion preferences are read live and are safe during server rendering', () => {
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
  let reduced = true;
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: {
      matchMedia: (query: string) => {
        assert.equal(query, '(prefers-reduced-motion: reduce)');
        return { matches: reduced };
      },
    },
  });
  try {
    assert.equal(prefersReducedMotion(), true);
    reduced = false;
    assert.equal(prefersReducedMotion(), false);
    Reflect.deleteProperty(globalThis, 'window');
    assert.equal(prefersReducedMotion(), false);
  } finally {
    if (previousWindow) Object.defineProperty(globalThis, 'window', previousWindow);
  }
});
