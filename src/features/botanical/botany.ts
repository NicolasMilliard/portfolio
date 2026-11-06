export type StemSpec = readonly [path: string, delay: number, width: number];

export type LeafSpec = readonly [
  x: number,
  y: number,
  length: number,
  width: number,
  angle: number,
  delay: number,
];

export type BlossomSpec = readonly [
  x: number,
  y: number,
  scale: number,
  delay: number,
  angle: number,
];

export type GardenDefinition = {
  stems: readonly StemSpec[];
  leaves: readonly LeafSpec[];
  blossoms: readonly BlossomSpec[];
  fruits: readonly BlossomSpec[];
};

export const roundCoordinate = (value: number) => Math.round(value * 10) / 10;

// Keep the POC's engraved geometry independent of React and the DOM.
export const createLeafDrawing = (length: number, width: number) => {
  const points: string[] = [];
  const veins: string[] = [];
  const hatching: string[] = [];
  const segments = 11;

  for (const direction of [-1, 1]) {
    for (let step = 0; step <= segments; step++) {
      const index = direction === -1 ? step : segments - step;
      const progress = index / segments;
      const halfWidth =
        width * Math.sin(Math.PI * progress) ** 0.78 *
        (index % 2 === 0 ? 1 : 0.84);
      points.push(
        `${roundCoordinate(direction * halfWidth)} ${roundCoordinate(-length * progress)}`,
      );
    }
  }

  for (let index = 2; index <= 9; index++) {
    const progress = index / segments;
    const y = -length * progress;
    const halfWidth = width * Math.sin(Math.PI * progress) ** 0.78 * 0.76;

    veins.push(
      `M -1 ${roundCoordinate(y)} Q ${roundCoordinate(-halfWidth * 0.55)} ${roundCoordinate(y - 7)} ${roundCoordinate(-halfWidth)} ${roundCoordinate(y - 9)}`,
      `M 1 ${roundCoordinate(y - 2)} Q ${roundCoordinate(halfWidth * 0.4)} ${roundCoordinate(y - 5)} ${roundCoordinate(halfWidth)} ${roundCoordinate(y - 12)}`,
    );

    for (let index = 0; index < 3; index++) {
      const offset = (index - 1) * 3;
      hatching.push(
        `M ${roundCoordinate(-halfWidth * 0.2)} ${roundCoordinate(y + offset)} l ${roundCoordinate(-halfWidth * 0.28)} ${roundCoordinate(-4 - offset * 0.12)}`,
      );
    }
  }

  return {
    outline: `M ${points.join(' L ')} Z`,
    midrib: `M 0 -1 Q ${-width * 0.16} ${-length * 0.55} 0 ${-length + 1}`,
    veins,
    hatching,
  };
};

export const flowerSeeds = Array.from({ length: 20 }, (_, index) => {
  const angle = (index * Math.PI * 2) / 20;
  const radius = 3 + (6 * (index % 3)) / 2;

  return {
    x: roundCoordinate(Math.cos(angle) * radius),
    y: roundCoordinate(Math.sin(angle) * radius),
  };
});

export const strawberryGrooves = Array.from({ length: 7 }, (_, index) => {
  const x = -21 + index * 7;
  return `M ${x} -24 Q ${x + 3} -10 ${x + 5} 8`;
});

export const strawberrySeeds = Array.from({ length: 5 }, (_, row) =>
  Array.from({ length: 5 - (row % 2) }, (_, column) => {
    const x = -21 + column * 11 + (row % 2) * 5.5;
    const y = -16 + row * 12;
    return Math.abs(x) < 29 - y * 0.16
      ? `M ${roundCoordinate(x)} ${roundCoordinate(y)} q -1.7 3.2 0 6`
      : null;
  }).filter((path): path is string => path !== null),
).flat();
