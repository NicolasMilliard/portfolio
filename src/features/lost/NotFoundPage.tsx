import { Link } from '@tanstack/react-router';
import { useEffect, useId, useRef, useState, type PointerEvent } from 'react';

import { doodles } from './doodle-layout';

import './styles/coloring.css';

const doodleSprite = '/images/coloring/doodles.svg';

const palette = [
  { name: 'Terracotta', color: '#d96539' },
  { name: 'Ochre', color: '#e0aa24' },
  { name: 'Sage', color: '#5f9b51' },
  { name: 'Ink blue', color: '#357fc0' },
  { name: 'Dusty rose', color: '#d65f7c' },
  { name: 'Lavender', color: '#8d62bf' },
];

type BrushStroke = { color: string; path: string; width: number };

const getBrushPoint = (event: PointerEvent<SVGSVGElement>) => {
  const matrix = event.currentTarget.getScreenCTM();
  if (!matrix) return null;

  const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(
    matrix.inverse(),
  );

  return { x: point.x, y: point.y, scale: Math.hypot(matrix.a, matrix.b) };
};

export function NotFoundPage() {
  const id = useId();
  const [selectedColor, setSelectedColor] = useState(palette[0]);
  const [brushSize, setBrushSize] = useState(16);
  const [strokes, setStrokes] = useState<BrushStroke[]>([]);
  const activePointer = useRef<number | null>(null);
  const canvas = useRef<SVGSVGElement>(null);
  const [frame, setFrame] = useState({
    x: -220,
    y: -165,
    width: 1440,
    height: 840,
  });

  useEffect(() => {
    if (!canvas.current) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (!width || !height) return;
      // Extend the surrounding drawing on wide/tall screens; keep 404 readable.
      const scale = Math.min(width / 1150, height / 720, 1.2);
      setFrame({
        x: 500 - width / scale / 2,
        y: 255 - height / scale / 2,
        width: width / scale,
        height: height / scale,
      });
    });
    observer.observe(canvas.current);
    return () => observer.disconnect();
  }, []);

  const visibleDoodles = doodles.filter(
    ([, x, y, size]) =>
      x + size > frame.x &&
      x - size < frame.x + frame.width &&
      y + size > frame.y &&
      y - size < frame.y + frame.height,
  );

  // Cursor dimensions are CSS pixels; convert to SVG units when a stroke starts.
  const cursorCenter = brushSize / 2 + 2;
  const cursorImage = `
    <svg xmlns="http://www.w3.org/2000/svg"
      width="${brushSize + 4}" height="${brushSize + 4}">
      <circle cx="${cursorCenter}" cy="${cursorCenter}" r="${brushSize / 2}"
        fill="${selectedColor.color}" fill-opacity="0.12"
        stroke="white" stroke-width="3"/>
      <circle cx="${cursorCenter}" cy="${cursorCenter}" r="${brushSize / 2}"
        fill="none" stroke="#303c48" stroke-width="1"/>
    </svg>
  `;
  const brushCursor = `url("data:image/svg+xml,${encodeURIComponent(cursorImage)}") ${cursorCenter} ${cursorCenter}, crosshair`;

  const startStroke = (event: PointerEvent<SVGSVGElement>) => {
    if (!event.isPrimary || event.button !== 0 || activePointer.current !== null) {
      return;
    }
    const point = getBrushPoint(event);
    if (!point) return;

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    activePointer.current = event.pointerId;
    setStrokes((previous) => [
      ...previous,
      {
        color: selectedColor.color,
        path: `M${point.x} ${point.y}l0.01 0`,
        width: brushSize / point.scale,
      },
    ]);
  };

  const continueStroke = (event: PointerEvent<SVGSVGElement>) => {
    if (activePointer.current !== event.pointerId) return;
    const point = getBrushPoint(event);
    if (!point) return;

    setStrokes((previous) => {
      const last = previous[previous.length - 1];
      return [
        ...previous.slice(0, -1),
        { ...last, path: `${last.path}L${point.x} ${point.y}` },
      ];
    });
  };

  const finishStroke = (event: PointerEvent<SVGSVGElement>) => {
    if (activePointer.current !== event.pointerId) return;
    activePointer.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <main className="coloring-page" aria-labelledby="coloring-heading">
      <h1 id="coloring-heading" className="visually-hidden">
        404 — Page not found
      </h1>
      <div className="coloring-note coloring-home-note">
        <Link to="/" className="coloring-home">
          Back to home
        </Link>
      </div>

      <svg
        ref={canvas}
        className="coloring-composition"
        viewBox={`${frame.x} ${frame.y} ${frame.width} ${frame.height}`}
        role="img"
        aria-label="404 coloring canvas"
        aria-describedby="coloring-instructions"
        style={{ cursor: brushCursor }}
        onPointerDown={startStroke}
        onPointerMove={continueStroke}
        onPointerUp={finishStroke}
        onPointerCancel={finishStroke}
        onLostPointerCapture={finishStroke}
      >
        <desc>
          Skateboards, cats, food, and everyday objects surround an empty 404.
          Paint inside the doodles with the selected color.
        </desc>
        <defs>
          <g id={`${id}-areas`}>
            {visibleDoodles.map(([name, x, y, size, angle]) => (
              <use
                key={`${x}-${y}`}
                href={`${doodleSprite}#${name}-area`}
                x={-size / 2}
                y={-size / 2}
                width={size}
                height={size}
                transform={`translate(${x} ${y}) rotate(${angle})`}
              />
            ))}
          </g>
          <mask
            id={`${id}-paint-area`}
            maskUnits="userSpaceOnUse"
            x={frame.x}
            y={frame.y}
            width={frame.width}
            height={frame.height}
          >
            <use href={`#${id}-areas`} color="white" />
          </mask>
          <filter
            id={`${id}-watercolor`}
            filterUnits="userSpaceOnUse"
            x={frame.x}
            y={frame.y}
            width={frame.width}
            height={frame.height}
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.08"
              numOctaves="3"
              seed="7"
              stitchTiles="stitch"
              result="grain"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="grain"
              scale="2"
              xChannelSelector="R"
              yChannelSelector="G"
              result="pigment"
            />
            <feColorMatrix
              in="grain"
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
        <use
          href={`#${id}-areas`}
          className="coloring-base"
          aria-hidden="true"
        />
        {/* The silhouettes contain the paint; the original ink stays above it. */}
        <g mask={`url(#${id}-paint-area)`}>
          <g
            filter={`url(#${id}-watercolor)`}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0.6"
          >
            {strokes.map(({ color, path, width }, index) => (
              <path
                key={index}
                d={path}
                stroke={color}
                strokeWidth={width}
              />
            ))}
          </g>
        </g>
        <g aria-hidden="true">
          {visibleDoodles.map(([name, x, y, size, angle]) => (
            <use
              key={`${x}-${y}`}
              href={`${doodleSprite}#${name}`}
              x={-size / 2}
              y={-size / 2}
              width={size}
              height={size}
              transform={`translate(${x} ${y}) rotate(${angle})`}
            />
          ))}
        </g>
      </svg>

      <div className="coloring-note coloring-tools">
        <p id="coloring-instructions" className="visually-hidden">
          Pick a color, then brush over the doodles.{' '}
          Layer your strokes for a deeper wash.
        </p>
        <div className="coloring-palette" role="group" aria-label="Paint colors">
          {palette.map((color) => (
            <button
              key={color.name}
              type="button"
              className="coloring-swatch"
              aria-label={color.name}
              aria-pressed={selectedColor.name === color.name}
              onClick={() => setSelectedColor(color)}
            >
              <span style={{ backgroundColor: color.color }} aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className="coloring-brush-size">
          <label htmlFor={`${id}-brush-size`}>Brush size</label>
          <output htmlFor={`${id}-brush-size`}>{brushSize} px</output>
          <input
            id={`${id}-brush-size`}
            type="range"
            min="4"
            max="48"
            step="2"
            value={brushSize}
            aria-valuetext={`${brushSize} pixels`}
            onChange={(event) => setBrushSize(Number(event.currentTarget.value))}
          />
        </div>
        <p className="visually-hidden" role="status">
          {selectedColor.name} selected
        </p>
      </div>
    </main>
  );
}
