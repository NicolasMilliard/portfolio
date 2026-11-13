import { Link } from '@tanstack/react-router';
import { memo, useEffect, useRef, useState } from 'react';

import { ColoringCanvas } from './ColoringCanvas';
import type { ColoringFrame } from './coloring-painter';
import { doodles } from './doodle-layout';

import './styles/coloring.css';

const palette = [
  { name: 'Terracotta', color: '#d96539' },
  { name: 'Ochre', color: '#e0aa24' },
  { name: 'Sage', color: '#5f9b51' },
  { name: 'Ink blue', color: '#357fc0' },
  { name: 'Dusty rose', color: '#d65f7c' },
  { name: 'Lavender', color: '#8d62bf' },
];

// Palette/brush changes and pointer events never reconcile the static artwork.
const DoodleArtwork = memo(function DoodleArtwork({
  frame,
  layer,
}: {
  frame: ColoringFrame;
  layer: 'base' | 'ink';
}) {
  return (
    <svg
      className={`coloring-artwork${layer === 'base' ? ' coloring-base' : ''}`}
      viewBox={`${frame.x} ${frame.y} ${frame.width} ${frame.height}`}
      aria-hidden="true"
    >
      {doodles
        .filter(
          ([, x, y, size]) =>
            x + size > frame.x &&
            x - size < frame.x + frame.width &&
            y + size > frame.y &&
            y - size < frame.y + frame.height,
        )
        .map(([name, x, y, size, angle]) => (
          <use
            key={`${x}-${y}`}
            href={`/images/coloring/doodles.svg#${name}${layer === 'base' ? '-area' : ''}`}
            x={-size / 2}
            y={-size / 2}
            width={size}
            height={size}
            transform={`translate(${x} ${y}) rotate(${angle})`}
          />
        ))}
    </svg>
  );
});

export function NotFoundPage() {
  const [selectedColor, setSelectedColor] = useState(palette[0]);
  const [brushSize, setBrushSize] = useState(16);
  const scene = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState<ColoringFrame>({
    x: -220,
    y: -165,
    width: 1440,
    height: 840,
  });

  useEffect(() => {
    if (!scene.current) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (!width || !height) return;
      const scale = Math.min(width / 1150, height / 720, 1.2);
      const next = {
        x: 500 - width / scale / 2,
        y: 255 - height / scale / 2,
        width: width / scale,
        height: height / scale,
      };
      setFrame((current) =>
        current.width === next.width && current.height === next.height
          ? current
          : next,
      );
    });
    observer.observe(scene.current);
    return () => observer.disconnect();
  }, []);

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

      <div
        ref={scene}
        className="coloring-composition"
        role="group"
        aria-label="404 coloring canvas"
        aria-describedby="coloring-instructions"
      >
        <DoodleArtwork frame={frame} layer="base" />
        <ColoringCanvas
          frame={frame}
          color={selectedColor.color}
          brushSize={brushSize}
          cursor={brushCursor}
        />
        <DoodleArtwork frame={frame} layer="ink" />
      </div>

      <div className="coloring-note coloring-tools">
        <p id="coloring-instructions" className="visually-hidden">
          Pick a color, then brush over the doodles. Layer your strokes for a
          deeper wash.
        </p>
        <div
          className="coloring-palette"
          role="group"
          aria-label="Paint colors"
        >
          {palette.map((color) => (
            <button
              key={color.name}
              type="button"
              className="coloring-swatch"
              aria-label={color.name}
              aria-pressed={selectedColor.name === color.name}
              onClick={() => setSelectedColor(color)}
            >
              <span
                style={{ backgroundColor: color.color }}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
        <div className="coloring-brush-size">
          <label htmlFor="coloring-brush-size">Brush size</label>
          <output htmlFor="coloring-brush-size">{brushSize} px</output>
          <input
            id="coloring-brush-size"
            type="range"
            min="4"
            max="48"
            step="2"
            value={brushSize}
            aria-valuetext={`${brushSize} pixels`}
            onChange={(event) =>
              setBrushSize(Number(event.currentTarget.value))
            }
          />
        </div>
        <p className="visually-hidden" role="status">
          {selectedColor.name} selected
        </p>
      </div>
    </main>
  );
}
