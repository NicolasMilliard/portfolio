import type { CSSProperties } from 'react';

import {
  createLeafDrawing,
  flowerSeeds,
  strawberryGrooves,
  strawberrySeeds,
  type BlossomSpec,
  type GardenDefinition,
  type LeafSpec,
  type StemSpec,
} from './botany';
import type { PlantedFlower } from './garden-state';

const petalAngles = [0, 72, 144, 216, 288];
const petalHatching = [-10, -5, 0, 5, 10];
const engraving = Array.from({ length: 17 }, (_, index) =>
  `M ${(index % 3) * 4} ${95 + index * 61} l 0 ${16 + (index % 5) * 3}`,
);

const growthDelay = (seconds: number): CSSProperties & { '--botanical-delay': string } => ({
  '--botanical-delay': `${seconds}s`,
});

function GardenStem({ stem: [path, delay, width] }: { stem: StemSpec }) {
  return (
    <path
      className="botanical-stem botanical-draw"
      d={path}
      pathLength="1"
      strokeWidth={width}
      style={growthDelay(delay)}
    />
  );
}

function GardenLeaf({ leaf }: { leaf: LeafSpec }) {
  const [x, y, length, width, angle, delay] = leaf;
  const drawing = createLeafDrawing(length, width);

  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <g className="botanical-sprout" style={growthDelay(delay)}>
        <path className="botanical-leaf-outline" d={drawing.outline} />
        <path className="botanical-leaf-vein" strokeWidth="1.15" d={drawing.midrib} />
        {drawing.veins.map((path) => (
          <path className="botanical-leaf-vein" strokeWidth="0.7" d={path} key={path} />
        ))}
        {drawing.hatching.map((path) => (
          <path className="botanical-leaf-hatch" d={path} key={path} />
        ))}
      </g>
    </g>
  );
}

type GardenFlowerProps = {
  blossom: BlossomSpec;
  label: string;
  isFull: boolean;
  onPlant: (blossom: BlossomSpec) => void;
};

function GardenFlower({ blossom, label, isFull, onPlant }: GardenFlowerProps) {
  const [x, y, scale, delay, angle] = blossom;

  return (
    <g
      className="botanical-blossom"
      transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}
      role="button"
      tabIndex={isFull ? -1 : 0}
      aria-label={label}
      aria-disabled={isFull}
      onClick={() => { if (!isFull) onPlant(blossom); }}
      onKeyDown={(event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        if (!isFull && !event.repeat) onPlant(blossom);
      }}
    >
      <circle className="botanical-flower-hitarea" r="72" />
      <circle className="botanical-focus-ring" r="68" vectorEffect="non-scaling-stroke" />
      <g className="botanical-bloom" style={growthDelay(delay)}>
        <g className="botanical-flower-content">
          {petalAngles.map((angle) => (
            <g transform={`rotate(${angle})`} key={angle}>
              <path
                className="botanical-petal"
                d="M -6 -9 C -22 -15 -26 -29 -22 -41 C -26 -54 -10 -62 0 -56 C 13 -63 27 -51 22 -39 C 26 -28 15 -13 6 -8 Z"
              />
              <path
                className="botanical-petal-inner"
                d="M 0 -12 Q -4 -28 0 -50 M -4 -21 Q -12 -30 -16 -41 M 3 -25 Q 12 -32 15 -42"
              />
              {petalHatching.map((x) => (
                <path
                  className="botanical-leaf-hatch"
                  d={`M ${x} -46 l ${x * 0.04} -5`}
                  key={x}
                />
              ))}
            </g>
          ))}
          <circle className="botanical-flower-core" r="12" />
          {flowerSeeds.map(({ x, y }, index) => (
            <circle className="botanical-seed" cx={x} cy={y} r="1.05" key={index} />
          ))}
        </g>
      </g>
    </g>
  );
}

function GardenStrawberry({ fruit }: { fruit: BlossomSpec }) {
  const [x, y, scale, delay, angle] = fruit;

  return (
    <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}>
      <g className="botanical-sprout" style={growthDelay(delay)}>
        <path
          className="botanical-fruit"
          d="M -30 -25 C -39 -2 -22 28 -1 47 C 17 31 37 -3 28 -25 Q 8 -40 -30 -25 Z"
        />
        {strawberryGrooves.map((path) => (
          <path className="botanical-fruit-groove" d={path} key={path} />
        ))}
        {strawberrySeeds.map((path) => (
          <path className="botanical-berry-seed" d={path} key={path} />
        ))}
        {petalAngles.map((angle) => (
          <path
            className="botanical-calyx"
            d="M 0 -20 Q -8 -31 0 -42 Q 8 -30 0 -20"
            transform={`rotate(${angle})`}
            key={angle}
          />
        ))}
      </g>
    </g>
  );
}

type GardenPlotProps = {
  garden: GardenDefinition;
  label: string;
  caption: string;
  flowerName: string;
  plants: readonly PlantedFlower[];
  isFull: boolean;
  onPlant: (blossom: BlossomSpec) => void;
};

export function GardenPlot({ garden, label, caption, flowerName, plants, isFull, onPlant }: GardenPlotProps) {
  return (
    <div className="botanical-illustration">
      <span className="botanical-plot-label" aria-hidden="true">{caption}</span>
      <svg
        viewBox="0 0 270 1100"
        preserveAspectRatio="xMidYMid slice"
        role="group"
        aria-label={label}
      >
        <g aria-hidden="true">
          {engraving.map((path) => (
            <path className="botanical-engraving" d={path} key={path} />
          ))}
          {garden.stems.map((stem) => (
            <GardenStem stem={stem} key={stem[0]} />
          ))}
          {garden.leaves.map((leaf) => (
            <GardenLeaf leaf={leaf} key={`${leaf[0]}-${leaf[1]}`} />
          ))}
          {garden.fruits.map((fruit) => (
            <GardenStrawberry fruit={fruit} key={`${fruit[0]}-${fruit[1]}`} />
          ))}
        </g>
        {garden.blossoms.map((blossom, index) => (
          <GardenFlower
            blossom={blossom}
            label={`Plant near ${flowerName} ${index + 1}`}
            isFull={isFull}
            onPlant={onPlant}
            key={`${blossom[0]}-${blossom[1]}`}
          />
        ))}
        {plants.map((plant) => (
          <g className="botanical-added-plant" key={plant.id}>
            <g aria-hidden="true">
              <GardenStem stem={plant.stem} />
              <GardenLeaf leaf={plant.leaf} />
            </g>
            <GardenFlower
              blossom={plant.blossom}
              label={`Plant near added flower ${plant.id + 1}`}
              isFull={isFull}
              onPlant={onPlant}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
