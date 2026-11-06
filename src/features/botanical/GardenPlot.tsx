import {
  createLeafDrawing,
  flowerSeeds,
  strawberryGrooves,
  strawberrySeeds,
  type BlossomSpec,
  type GardenDefinition,
  type LeafSpec,
} from './botany';

const petalAngles = [0, 72, 144, 216, 288];
const petalHatching = [-10, -5, 0, 5, 10];
const engraving = Array.from({ length: 17 }, (_, index) =>
  `M ${(index % 3) * 4} ${95 + index * 61} l 0 ${16 + (index % 5) * 3}`,
);

function GardenLeaf({ leaf }: { leaf: LeafSpec }) {
  const [x, y, length, width, angle] = leaf;
  const drawing = createLeafDrawing(length, width);

  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <path className="botanical-leaf-outline" d={drawing.outline} />
      <path className="botanical-leaf-vein" strokeWidth="1.15" d={drawing.midrib} />
      {drawing.veins.map((path) => (
        <path className="botanical-leaf-vein" strokeWidth="0.7" d={path} key={path} />
      ))}
      {drawing.hatching.map((path) => (
        <path className="botanical-leaf-hatch" d={path} key={path} />
      ))}
    </g>
  );
}

function GardenFlower({ blossom }: { blossom: BlossomSpec }) {
  const [x, y, scale, , angle] = blossom;

  return (
    <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}>
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
  );
}

function GardenStrawberry({ fruit }: { fruit: BlossomSpec }) {
  const [x, y, scale, , angle] = fruit;

  return (
    <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}>
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
  );
}

type GardenPlotProps = {
  garden: GardenDefinition;
  label: string;
};

export function GardenPlot({ garden, label }: GardenPlotProps) {
  return (
    <div className="botanical-illustration">
      <svg
        viewBox="0 0 270 1100"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label={label}
      >
        {engraving.map((path) => (
          <path className="botanical-engraving" d={path} key={path} />
        ))}
        {garden.stems.map(([path, , width]) => (
          <path className="botanical-stem" d={path} strokeWidth={width} key={path} />
        ))}
        {garden.leaves.map((leaf) => (
          <GardenLeaf leaf={leaf} key={`${leaf[0]}-${leaf[1]}`} />
        ))}
        {garden.fruits.map((fruit) => (
          <GardenStrawberry fruit={fruit} key={`${fruit[0]}-${fruit[1]}`} />
        ))}
        {garden.blossoms.map((blossom) => (
          <GardenFlower blossom={blossom} key={`${blossom[0]}-${blossom[1]}`} />
        ))}
      </svg>
    </div>
  );
}
