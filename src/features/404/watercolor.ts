export const PAINT_TILE_SIZE = 256;
export const PAINT_GUTTER = 4;
export const FILTER_PADDING = 3;

export type PaintPoint = { x: number; y: number };
export type PaintRect = PaintPoint & { width: number; height: number };
export type PixelBuffer = {
  width: number;
  height: number;
  data: Uint8ClampedArray;
};

const sampleCount = (PAINT_TILE_SIZE + 2 * PAINT_GUTTER) ** 2 * 4;
const blurNeighbor = Math.exp(-1 / (2 * 0.4 ** 2));
const blurEdge = blurNeighbor / (1 + 2 * blurNeighbor);
const blurCenter = 1 - 2 * blurEdge;

export const createWatercolorWorkspace = () => ({
  displaced: new Float32Array(sampleCount),
  horizontal: new Float32Array(sampleCount),
});

/** Apply the original displacement, pigment density and 0.4px blur locally.
 * Inputs and outputs use world pixels, so texture and paint survive resizing.
 * Work is bounded by one dirty tile, independent of the number of past strokes.
 */
export function filterPaintPatch(
  source: PixelBuffer,
  grain: Uint8ClampedArray,
  origin: PaintPoint,
  mask: Uint8ClampedArray,
  dirty: PaintRect,
  output: PixelBuffer,
  workspace: ReturnType<typeof createWatercolorWorkspace>,
) {
  const { width, height, data } = source;
  const { displaced, horizontal } = workspace;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const grainIndex =
        (((origin.y + y) & 255) * PAINT_TILE_SIZE + ((origin.x + x) & 255)) * 4;
      const sampleX = Math.max(
        0,
        Math.min(width - 1, x + (grain[grainIndex] / 255 - 0.5) * 2),
      );
      const sampleY = Math.max(
        0,
        Math.min(height - 1, y + (grain[grainIndex + 1] / 255 - 0.5) * 2),
      );
      const left = Math.floor(sampleX);
      const top = Math.floor(sampleY);
      const right = Math.min(left + 1, width - 1);
      const bottom = Math.min(top + 1, height - 1);
      const dx = sampleX - left;
      const dy = sampleY - top;
      const a = (top * width + left) * 4;
      const b = (top * width + right) * 4;
      const c = (bottom * width + left) * 4;
      const d = (bottom * width + right) * 4;
      const wa = ((1 - dx) * (1 - dy) * data[a + 3]) / 255;
      const wb = (dx * (1 - dy) * data[b + 3]) / 255;
      const wc = ((1 - dx) * dy * data[c + 3]) / 255;
      const wd = (dx * dy * data[d + 3]) / 255;
      const density =
        0.35 +
        (0.65 *
          0.333 *
          (grain[grainIndex] + grain[grainIndex + 1] + grain[grainIndex + 2])) /
          255;
      const i = (y * width + x) * 4;
      // Work in premultiplied RGBA to avoid dark fringes around transparent ink.
      for (let channel = 0; channel < 3; channel++) {
        displaced[i + channel] =
          (data[a + channel] * wa +
            data[b + channel] * wb +
            data[c + channel] * wc +
            data[d + channel] * wd) *
          density;
      }
      displaced[i + 3] = (wa + wb + wc + wd) * density;
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = (y * width + x) * 4;
      for (let channel = 0; channel < 4; channel++) {
        horizontal[i + channel] =
          displaced[i - 4 + channel] * blurEdge +
          displaced[i + channel] * blurCenter +
          displaced[i + 4 + channel] * blurEdge;
      }
    }
  }

  const row = width * 4;
  for (let y = 0; y < dirty.height; y++) {
    for (let x = 0; x < dirty.width; x++) {
      const i = ((y + FILTER_PADDING) * width + x + FILTER_PADDING) * 4;
      const target = (y * output.width + x) * 4;
      const alpha =
        horizontal[i - row + 3] * blurEdge +
        horizontal[i + 3] * blurCenter +
        horizontal[i + row + 3] * blurEdge;
      const maskAlpha = mask[(y + dirty.y) * PAINT_TILE_SIZE + x + dirty.x];
      for (let channel = 0; channel < 3; channel++) {
        output.data[target + channel] =
          alpha > 0 && maskAlpha > 0
            ? (horizontal[i - row + channel] * blurEdge +
                horizontal[i + channel] * blurCenter +
                horizontal[i + row + channel] * blurEdge) /
              alpha
            : 0;
      }
      output.data[target + 3] = alpha * maskAlpha;
    }
  }
}
