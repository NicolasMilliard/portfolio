import { roundCoordinate, type BlossomSpec, type LeafSpec, type StemSpec } from './botany.ts';

export type GardenSide = 'wildflowers' | 'strawberries';

export type PlantedFlower = {
  id: number;
  side: GardenSide;
  stem: StemSpec;
  leaf: LeafSpec;
  blossom: BlossomSpec;
};

export type PlantSource = { side: GardenSide; blossom: BlossomSpec };

export type GardenState = {
  cycle: number;
  nextSide: GardenSide;
  plants: readonly PlantedFlower[];
};

export type GardenAction =
  | { type: 'plant'; source?: PlantSource }
  | { type: 'regrow' };

// Added flowers contain many engraved paths; keep a long visit bounded.
export const MAX_PLANTED_FLOWERS = 24;

export const initialGardenState: GardenState = {
  cycle: 0,
  nextSide: 'wildflowers',
  plants: [],
};

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(maximum, Math.max(minimum, value));

const createPlantedFlower = (
  id: number,
  side: GardenSide,
  origin?: BlossomSpec,
): PlantedFlower => {
  // A local seed keeps reducers pure, including React Strict Mode replays.
  let seed = (123 + Math.imul(id, 2654435761)) >>> 0;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const x = roundCoordinate(clamp(
    origin ? origin[0] + 20 * (random() - 0.5) : 35 + random() * 195,
    48,
    222,
  ));
  const y = roundCoordinate(clamp(
    origin ? origin[1] - 58 - random() * 35 : 210 + random() * 570,
    80,
    1000,
  ));
  const scale = origin
    ? clamp(origin[2] * 0.72, 0.38, 0.72)
    : 0.45 + random() * 0.3;
  const bottom = Math.min(1099, y + 170);
  const startX = roundCoordinate(x + 40 * (random() - 0.5));

  return {
    id,
    side,
    stem: [`M ${startX} ${bottom} Q ${roundCoordinate(x + 25)} ${roundCoordinate(y + 90)} ${x} ${roundCoordinate(y + 15)}`, 0, 0.9],
    leaf: [x, y + 86, 48, 16, -42 + 40 * random(), 0.15],
    blossom: [x, y, scale, 0.35, -10 + 20 * random()],
  };
};

export function gardenReducer(state: GardenState, action: GardenAction): GardenState {
  if (action.type === 'regrow') {
    return { ...initialGardenState, cycle: state.cycle + 1 };
  }

  if (state.plants.length >= MAX_PLANTED_FLOWERS) return state;

  const side = action.source?.side ?? state.nextSide;
  const plant = createPlantedFlower(state.plants.length, side, action.source?.blossom);

  return {
    ...state,
    nextSide: action.source
      ? state.nextSide
      : side === 'wildflowers' ? 'strawberries' : 'wildflowers',
    plants: [...state.plants, plant],
  };
}
