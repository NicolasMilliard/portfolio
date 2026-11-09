import { useId } from 'react';

import { strokeStyle, type StrokeTiming } from './strokeStyle';

export function WatercolorWash({
  firstPass,
  secondPass,
}: {
  firstPass: StrokeTiming;
  secondPass: StrokeTiming;
}) {
  const id = useId();

  return (
    <svg
      className="name-wash-pigment"
      viewBox="0 0 300 90"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Starting outside the pigment keeps round caps hidden during the delay. */}
        <mask
          id={`${id}-first-pass`}
          maskUnits="userSpaceOnUse"
          x="-30"
          y="-20"
          width="360"
          height="140"
        >
          <path
            className="name-wash-stroke"
            d="M-45 49C54 36 160 53 246 44Q290 40 345 50"
            pathLength="1"
            fill="none"
            stroke="white"
            strokeWidth="68"
            strokeLinecap="round"
            style={strokeStyle(firstPass)}
          />
        </mask>
        <mask
          id={`${id}-second-pass`}
          maskUnits="userSpaceOnUse"
          x="-30"
          y="-20"
          width="360"
          height="140"
        >
          <path
            className="name-wash-stroke"
            d="M345 51C249 67 140 44 53 55Q4 61-45 51"
            pathLength="1"
            fill="none"
            stroke="white"
            strokeWidth="62"
            strokeLinecap="round"
            style={strokeStyle(secondPass)}
          />
        </mask>
        <filter
          id={`${id}-pigment`}
          x="-10%"
          y="-20%"
          width="120%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.075 0.25"
            numOctaves="3"
            seed="7"
            stitchTiles="stitch"
            result="paper"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="paper"
            scale="4"
            xChannelSelector="R"
            yChannelSelector="G"
            result="pigment"
          />
          <feColorMatrix
            in="paper"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.333 0.333 0.333 0 0"
          />
          <feComponentTransfer result="density">
            <feFuncA type="linear" slope="0.65" intercept="0.35" />
          </feComponentTransfer>
          <feComposite in="pigment" in2="density" operator="in" />
          <feGaussianBlur stdDeviation="0.4" />
        </filter>
      </defs>
      <g fill="currentColor" filter={`url(#${id}-pigment)`}>
        <path
          opacity="0.24"
          mask={`url(#${id}-first-pass)`}
          d="M9 49Q7 35 29 30Q49 25 71 27Q95 20 117 24Q145 17 165 23Q192 19 214 25Q242 21 261 29Q286 28 290 43Q299 54 284 65Q271 77 249 72Q224 81 204 75Q177 82 152 77Q126 83 106 77Q79 80 59 73Q34 77 22 67Q7 65 9 49Z"
        />
        <g mask={`url(#${id}-second-pass)`}>
          <path
            opacity="0.2"
            d="M16 47Q32 31 62 35Q89 27 110 32Q136 26 159 31Q185 26 212 33Q236 29 263 36Q286 34 284 48Q293 60 270 65Q245 70 223 65Q198 73 176 68Q147 73 124 68Q98 75 75 67Q48 72 28 63Q10 61 16 47Z"
          />
          <path
            opacity="0.13"
            d="M25 51Q48 36 78 41Q104 33 129 38Q159 31 186 38Q211 33 238 40Q266 36 276 48Q285 61 259 61Q234 68 207 63Q178 69 151 64Q124 71 97 64Q67 70 44 63Q20 64 25 51Z"
          />
        </g>
      </g>
    </svg>
  );
}
