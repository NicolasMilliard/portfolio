import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  gardenReducer,
  initialGardenState,
  MAX_PLANTED_FLOWERS,
} from '../src/features/botanical/garden-state.ts';

test('toolbar planting alternates gardens without changing earlier flowers', () => {
  const first = gardenReducer(initialGardenState, { type: 'plant' });
  const second = gardenReducer(first, { type: 'plant' });
  assert.deepEqual(second.plants.map(({ side }) => side), ['wildflowers', 'strawberries']);
  assert.equal(second.plants[0], first.plants[0]);
  assert.deepEqual(initialGardenState.plants, []);
  assert.equal(first.plants.length, 1);
});

test('blossom planting stays in its garden and preserves the toolbar alternation', () => {
  const source = { side: 'strawberries', blossom: [200, 500, 0.7, 0, 0] };
  const first = gardenReducer(initialGardenState, { type: 'plant', source });
  const plant = first.plants[0];
  assert.equal(plant.side, 'strawberries');
  assert.ok(Math.abs(plant.blossom[0] - 200) <= 10);
  assert.ok(plant.blossom[1] < 500);
  const second = gardenReducer(first, { type: 'plant' });
  assert.equal(second.plants[1].side, 'wildflowers');
});

test('the same input produces the same placement when React replays an update', () => {
  const action = { type: 'plant' };
  assert.deepEqual(
    gardenReducer(initialGardenState, action),
    gardenReducer(initialGardenState, action),
  );
});

test('repeated planting near the edge stays visible and stops at a bounded size', () => {
  let state = initialGardenState;
  let blossom = [238, 103, 0.54, 0, 12];
  for (let index = 0; index < MAX_PLANTED_FLOWERS; index++) {
    state = gardenReducer(state, {
      type: 'plant', source: { side: 'strawberries', blossom },
    });
    blossom = state.plants.at(-1).blossom;
    const [x, y, scale] = blossom;
    assert.ok(x >= 48 && x <= 222);
    assert.ok(y >= 80 && y <= 1000);
    assert.ok(scale >= 0.38 && scale <= 0.72);
  }
  assert.equal(state.plants.length, MAX_PLANTED_FLOWERS);
  assert.equal(gardenReducer(state, { type: 'plant' }), state);
});

test('regrow clears added flowers, restarts the sequence and restores planting', () => {
  const first = gardenReducer(initialGardenState, { type: 'plant' });
  const second = gardenReducer(first, { type: 'plant' });
  const reset = gardenReducer(second, { type: 'regrow' });
  assert.equal(reset.cycle, 1);
  assert.equal(reset.nextSide, 'wildflowers');
  assert.deepEqual(reset.plants, []);
  assert.deepEqual(gardenReducer(reset, { type: 'plant' }).plants, first.plants);
  assert.equal(gardenReducer(reset, { type: 'regrow' }).cycle, 2);
});
