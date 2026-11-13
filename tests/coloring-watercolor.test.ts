import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  createWatercolorWorkspace,
  filterPaintPatch,
  FILTER_PADDING,
  PAINT_TILE_SIZE,
  type PixelBuffer,
} from '../src/features/404/watercolor.ts';

const pixels = (width: number, height: number, rgba: number[]): PixelBuffer => {
  const data = new Uint8ClampedArray(width * height * 4);
  for (let i = 0; i < data.length; i += 4) data.set(rgba, i);
  return { width, height, data };
};

function setup(alpha = 153) {
  const source = pixels(9, 9, [53, 127, 192, alpha]);
  const grain = pixels(
    PAINT_TILE_SIZE,
    PAINT_TILE_SIZE,
    [128, 128, 128, 255],
  ).data;
  const mask = new Uint8ClampedArray(PAINT_TILE_SIZE ** 2).fill(255);
  const output = pixels(3, 3, [0, 0, 0, 0]);
  const dirty = { x: 0, y: 0, width: 3, height: 3 };
  const origin = { x: -FILTER_PADDING, y: -FILTER_PADDING };
  const workspace = createWatercolorWorkspace();
  const render = () =>
    filterPaintPatch(source, grain, origin, mask, dirty, output, workspace);
  return { source, grain, mask, output, dirty, origin, render };
}

test('a watercolor wash preserves hue and applies pigment density to its alpha', () => {
  const { output, render } = setup();
  render();
  assert.deepEqual([...output.data.slice(0, 3)], [53, 127, 192]);
  const density = 0.35 + 0.65 * 0.333 * (384 / 255);
  assert.equal(output.data[3], Math.round(153 * density));
});

test('layered washes are filtered after their raw pigments are combined', () => {
  const { output, render } = setup(Math.round((1 - (1 - 0.6) ** 2) * 255));
  render();
  const density = 0.35 + 0.65 * 0.333 * (384 / 255);
  assert.equal(output.data[3], Math.round(214 * density));
});

test('the final silhouette mask protects empty 404 pixels, including soft edges', () => {
  const { mask, output, render } = setup();
  mask[0] = 0;
  mask[1] = 128;
  render();
  assert.deepEqual([...output.data.slice(0, 4)], [0, 0, 0, 0]);
  assert.equal(output.data[7], Math.round((output.data[11] * 128) / 255));
});

test('the blur uses premultiplied colors and does not introduce dark fringes', () => {
  const { source, output, render } = setup(0);
  source.data.set([240, 100, 40, 255], (4 * source.width + 4) * 4);
  render();
  const center = (1 * output.width + 1) * 4;
  assert.deepEqual([...output.data.slice(center, center + 3)], [240, 100, 40]);
  assert.ok(output.data[center + 3] > 0);
  assert.ok(output.data[center + 3] < 255);
});

test('grain stays anchored to world coordinates on either side of a tile boundary', () => {
  const first = setup();
  const second = setup();
  for (let y = 0; y < PAINT_TILE_SIZE; y++) {
    for (let x = 0; x < PAINT_TILE_SIZE; x++) {
      const i = (y * PAINT_TILE_SIZE + x) * 4;
      first.grain[i] = second.grain[i] = 64 + (x % 128);
    }
  }
  first.origin.x = -3;
  second.origin.x = PAINT_TILE_SIZE - 3;
  first.render();
  second.render();
  assert.deepEqual(first.output.data, second.output.data);
});

test('updating one dirty patch leaves cached neighboring pixels unchanged', () => {
  const { output, dirty, render } = setup();
  output.data.fill(17);
  dirty.width = dirty.height = 1;
  render();
  assert.notEqual(output.data[3], 17);
  assert.ok(output.data.slice(4).every((value) => value === 17));
});
