import { doodles, type Doodle } from './doodle-layout';
import {
  createWatercolorWorkspace,
  filterPaintPatch,
  FILTER_PADDING,
  PAINT_GUTTER,
  PAINT_TILE_SIZE,
  type PaintPoint,
  type PaintRect,
} from './watercolor';

export type ColoringFrame = PaintRect;
type Surface = ReturnType<typeof createSurface>;
type PaintingAssets = Awaited<ReturnType<typeof loadPaintingAssets>>;
type PaintTile = PaintPoint & {
  raw: Surface;
  image: Surface;
  mask: Uint8ClampedArray;
  active: Surface | null;
};
const rawSize = PAINT_TILE_SIZE + PAINT_GUTTER * 2;
const maxDisplayPixels = 4_000_000;
const pigmentOpacity = 0.6;

function createSurface(size: number, readFrequently = false) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const context = canvas.getContext('2d', {
    willReadFrequently: readFrequently,
  });
  if (!context) throw new Error('Canvas painting is unavailable');
  return { canvas, context };
}

async function loadGrain(signal: AbortSignal) {
  // Rasterize the seamless, original SVG noise once, rather than per pointermove.
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><filter id="grain" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency=".08" numOctaves="3" seed="7" stitchTiles="stitch"/><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0 1"/></filter><rect width="256" height="256" filter="url(#grain)"/></svg>`;
  const image = new Image();
  await new Promise<void>((resolve, reject) => {
    const abort = () => {
      image.src = '';
      reject(
        new DOMException('Painting initialization cancelled', 'AbortError'),
      );
    };
    const cleanUp = () => signal.removeEventListener('abort', abort);
    image.onload = () => {
      cleanUp();
      resolve();
    };
    image.onerror = () => {
      cleanUp();
      reject(new Error('Could not load paint texture'));
    };
    signal.addEventListener('abort', abort, { once: true });
    if (signal.aborted) {
      cleanUp();
      abort();
      return;
    }
    image.src = `data:image/svg+xml,${encodeURIComponent(svg)}`;
  });
  const surface = createSurface(PAINT_TILE_SIZE, true);
  surface.context.drawImage(image, 0, 0);
  const grain = surface.context.getImageData(
    0,
    0,
    PAINT_TILE_SIZE,
    PAINT_TILE_SIZE,
  ).data;
  surface.canvas.width = 0;
  return grain;
}

export async function loadPaintingAssets(signal: AbortSignal) {
  const [response, grain] = await Promise.all([
    fetch('/images/coloring/doodles.svg', { signal }),
    loadGrain(signal),
  ]);
  if (!response.ok) throw new Error('Could not load coloring silhouettes');
  const document = new DOMParser().parseFromString(
    await response.text(),
    'image/svg+xml',
  );
  const areas = new Map<Doodle[0], Path2D>();
  for (const [name] of doodles) {
    if (areas.has(name)) continue;
    const path = document
      .getElementById(`${name}-area`)
      ?.querySelector('path')
      ?.getAttribute('d');
    if (!path) throw new Error(`Missing coloring silhouette: ${name}`);
    areas.set(name, new Path2D(path));
  }
  return { areas, grain };
}

/** Sparse world-space paint buffers. Old strokes are flattened, never replayed. */
export class ColoringPainter {
  private canvas: HTMLCanvasElement;
  private assets: PaintingAssets;
  private context: CanvasRenderingContext2D;
  private frame: ColoringFrame | null = null;
  private tiles = new Map<string, PaintTile | null>();
  private tileDoodles = new Map<string, Doodle[]>();
  private tileBounds = {
    left: Infinity,
    right: -Infinity,
    top: Infinity,
    bottom: -Infinity,
  };
  private scratch = createSurface(rawSize, true);
  private maskSurface = createSurface(PAINT_TILE_SIZE, true);
  private output = new ImageData(PAINT_TILE_SIZE, PAINT_TILE_SIZE);
  private workspace = createWatercolorWorkspace();
  private animationFrame = 0;
  private stroke: {
    color: string;
    width: number;
    last: PaintPoint | null;
    pending: PaintPoint[];
    tiles: Map<PaintTile, PaintRect | null>;
  } | null = null;

  constructor(canvas: HTMLCanvasElement, assets: PaintingAssets) {
    this.canvas = canvas;
    this.assets = assets;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas painting is unavailable');
    this.context = context;
    for (const doodle of doodles) {
      const [, x, y, size] = doodle;
      for (
        let ty = Math.floor((y - size) / PAINT_TILE_SIZE);
        ty <= Math.floor((y + size) / PAINT_TILE_SIZE);
        ty++
      ) {
        for (
          let tx = Math.floor((x - size) / PAINT_TILE_SIZE);
          tx <= Math.floor((x + size) / PAINT_TILE_SIZE);
          tx++
        ) {
          const key = `${tx},${ty}`;
          const entries = this.tileDoodles.get(key) ?? [];
          entries.push(doodle);
          this.tileDoodles.set(key, entries);
          this.tileBounds.left = Math.min(this.tileBounds.left, tx);
          this.tileBounds.right = Math.max(this.tileBounds.right, tx);
          this.tileBounds.top = Math.min(this.tileBounds.top, ty);
          this.tileBounds.bottom = Math.max(this.tileBounds.bottom, ty);
        }
      }
    }
  }

  resize(frame: ColoringFrame) {
    this.finishStroke();
    this.frame = frame;
    const { width, height } = this.canvas.getBoundingClientRect();
    if (!width || !height) return;
    const density = Math.min(
      window.devicePixelRatio || 1,
      2,
      Math.sqrt(maxDisplayPixels / (width * height)),
    );
    this.canvas.width = Math.max(1, Math.floor(width * density));
    this.canvas.height = Math.max(1, Math.floor(height * density));
    this.render();
  }

  startStroke(point: PaintPoint, width: number, color: string) {
    this.finishStroke();
    this.stroke = {
      color,
      width,
      last: null,
      pending: [point],
      tiles: new Map(),
    };
    this.schedule();
  }

  addPoints(points: PaintPoint[]) {
    if (!this.stroke) return;
    for (const point of points) this.stroke.pending.push(point);
    this.schedule();
  }

  finishStroke() {
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
    this.animationFrame = 0;
    if (!this.stroke) return;
    this.flush();
    for (const tile of this.stroke.tiles.keys()) {
      if (!tile.active) continue;
      tile.raw.context.globalAlpha = pigmentOpacity;
      tile.raw.context.drawImage(tile.active.canvas, 0, 0);
      tile.raw.context.globalAlpha = 1;
      tile.active.canvas.width = 0;
      tile.active = null;
    }
    this.stroke = null;
  }

  cancelStroke() {
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
    this.animationFrame = 0;
    const stroke = this.stroke;
    this.stroke = null;
    if (!stroke) return;
    for (const [tile, dirty] of stroke.tiles) {
      if (tile.active) tile.active.canvas.width = 0;
      tile.active = null;
      // Restore only the previewed region from the committed pigments. A pinch
      // must not leave the first finger's dab or erase an earlier wash.
      if (dirty) this.updateTile(tile, dirty);
    }
    this.render();
  }

  dispose() {
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
    this.animationFrame = 0;
    this.stroke = null;
    for (const tile of this.tiles.values()) {
      if (!tile) continue;
      tile.raw.canvas.width = tile.image.canvas.width = 0;
      if (tile.active) tile.active.canvas.width = 0;
    }
    this.tiles.clear();
    this.tileDoodles.clear();
    this.scratch.canvas.width = this.maskSurface.canvas.width = 0;
  }

  private schedule() {
    if (this.animationFrame) return;
    this.animationFrame = requestAnimationFrame(() => {
      this.animationFrame = 0;
      this.flush();
    });
  }

  private getTile(tx: number, ty: number) {
    const key = `${tx},${ty}`;
    if (this.tiles.has(key)) return this.tiles.get(key);
    const entries = this.tileDoodles.get(key);
    if (!entries) return null;
    const x = tx * PAINT_TILE_SIZE;
    const y = ty * PAINT_TILE_SIZE;
    const context = this.maskSurface.context;
    context.clearRect(0, 0, PAINT_TILE_SIZE, PAINT_TILE_SIZE);
    context.fillStyle = 'white';
    for (const [name, dx, dy, size, angle] of entries) {
      context.save();
      context.translate(dx - x, dy - y);
      context.rotate((angle * Math.PI) / 180);
      context.scale(size / 320, size / 320);
      context.translate(-160, -160);
      context.fill(this.assets.areas.get(name)!, 'evenodd');
      context.restore();
    }
    const rgba = context.getImageData(
      0,
      0,
      PAINT_TILE_SIZE,
      PAINT_TILE_SIZE,
    ).data;
    const mask = new Uint8ClampedArray(PAINT_TILE_SIZE ** 2);
    let containsDoodle = false;
    for (let i = 0; i < mask.length; i++) {
      mask[i] = rgba[i * 4 + 3];
      if (mask[i]) containsDoodle = true;
    }
    const tile: PaintTile | null = containsDoodle
      ? {
          x,
          y,
          mask,
          raw: createSurface(rawSize, true),
          image: createSurface(PAINT_TILE_SIZE),
          active: null,
        }
      : null;
    this.tiles.set(key, tile);
    return tile;
  }

  private flush() {
    const stroke = this.stroke;
    if (!stroke?.pending.length) return;
    const points = stroke.pending;
    stroke.pending = [];
    const first = stroke.last ?? points[0];
    let left = first.x,
      right = first.x,
      top = first.y,
      bottom = first.y;
    for (const point of points) {
      left = Math.min(left, point.x);
      right = Math.max(right, point.x);
      top = Math.min(top, point.y);
      bottom = Math.max(bottom, point.y);
    }
    const radius = stroke.width / 2 + FILTER_PADDING;
    left = Math.floor(left - radius);
    right = Math.ceil(right + radius);
    top = Math.floor(top - radius);
    bottom = Math.ceil(bottom + radius);

    for (
      let ty = Math.max(
        this.tileBounds.top,
        Math.floor((top - PAINT_GUTTER) / PAINT_TILE_SIZE),
      );
      ty <=
      Math.min(
        this.tileBounds.bottom,
        Math.floor((bottom + PAINT_GUTTER) / PAINT_TILE_SIZE),
      );
      ty++
    ) {
      for (
        let tx = Math.max(
          this.tileBounds.left,
          Math.floor((left - PAINT_GUTTER) / PAINT_TILE_SIZE),
        );
        tx <=
        Math.min(
          this.tileBounds.right,
          Math.floor((right + PAINT_GUTTER) / PAINT_TILE_SIZE),
        );
        tx++
      ) {
        const tile = this.getTile(tx, ty);
        if (!tile) continue;
        tile.active ??= createSurface(rawSize, true);
        if (!stroke.tiles.has(tile)) stroke.tiles.set(tile, null);
        const context = tile.active.context;
        context.setTransform(
          1,
          0,
          0,
          1,
          PAINT_GUTTER - tile.x,
          PAINT_GUTTER - tile.y,
        );
        context.strokeStyle = context.fillStyle = stroke.color;
        context.lineWidth = stroke.width;
        context.lineCap = context.lineJoin = 'round';
        context.beginPath();
        if (!stroke.last) {
          context.arc(first.x, first.y, stroke.width / 2, 0, Math.PI * 2);
          context.fill();
          context.beginPath();
        }
        context.moveTo(first.x, first.y);
        for (const point of points) context.lineTo(point.x, point.y);
        context.stroke();
        const x = Math.max(0, left - tile.x);
        const y = Math.max(0, top - tile.y);
        const width = Math.min(PAINT_TILE_SIZE, right - tile.x) - x;
        const height = Math.min(PAINT_TILE_SIZE, bottom - tile.y) - y;
        if (width > 0 && height > 0) {
          const previous = stroke.tiles.get(tile);
          const dirtyLeft = Math.min(previous?.x ?? x, x);
          const dirtyTop = Math.min(previous?.y ?? y, y);
          stroke.tiles.set(tile, {
            x: dirtyLeft,
            y: dirtyTop,
            width:
              Math.max(previous ? previous.x + previous.width : 0, x + width) -
              dirtyLeft,
            height:
              Math.max(
                previous ? previous.y + previous.height : 0,
                y + height,
              ) - dirtyTop,
          });
          this.updateTile(tile, { x, y, width, height });
        }
      }
    }
    stroke.last = points[points.length - 1];
    this.render();
  }

  private updateTile(tile: PaintTile, dirty: PaintRect) {
    const width = dirty.width + FILTER_PADDING * 2;
    const height = dirty.height + FILTER_PADDING * 2;
    const sourceX = dirty.x + PAINT_GUTTER - FILTER_PADDING;
    const sourceY = dirty.y + PAINT_GUTTER - FILTER_PADDING;
    const context = this.scratch.context;
    context.clearRect(0, 0, width, height);
    context.drawImage(
      tile.raw.canvas,
      sourceX,
      sourceY,
      width,
      height,
      0,
      0,
      width,
      height,
    );
    if (tile.active) {
      // Flatten this gesture at 60% once: passing over a point twice in the same
      // stroke must not darken it as if two separate watercolor washes were laid.
      context.globalAlpha = pigmentOpacity;
      context.drawImage(
        tile.active.canvas,
        sourceX,
        sourceY,
        width,
        height,
        0,
        0,
        width,
        height,
      );
      context.globalAlpha = 1;
    }
    filterPaintPatch(
      context.getImageData(0, 0, width, height),
      this.assets.grain,
      {
        x: tile.x + dirty.x - FILTER_PADDING,
        y: tile.y + dirty.y - FILTER_PADDING,
      },
      tile.mask,
      dirty,
      this.output,
      this.workspace,
    );
    tile.image.context.putImageData(
      this.output,
      dirty.x,
      dirty.y,
      0,
      0,
      dirty.width,
      dirty.height,
    );
  }

  private render() {
    if (!this.frame) return;
    const { x, y, width, height } = this.frame;
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const scaleX = this.canvas.width / width;
    const scaleY = this.canvas.height / height;
    for (const tile of this.tiles.values()) {
      if (
        !tile ||
        tile.x + PAINT_TILE_SIZE < x ||
        tile.x > x + width ||
        tile.y + PAINT_TILE_SIZE < y ||
        tile.y > y + height
      )
        continue;
      // Neighboring tiles share an exact device-pixel edge, even at fractional zoom.
      const left = Math.round((tile.x - x) * scaleX);
      const top = Math.round((tile.y - y) * scaleY);
      const right = Math.round((tile.x + PAINT_TILE_SIZE - x) * scaleX);
      const bottom = Math.round((tile.y + PAINT_TILE_SIZE - y) * scaleY);
      this.context.drawImage(
        tile.image.canvas,
        left,
        top,
        right - left,
        bottom - top,
      );
    }
  }
}
