// Offline asset preparation only. See public/audio/lost/README.md for sources.
// Input: surf.wav, jungle.wav, leaves.wav, stereo 44.1 kHz / 16-bit PCM.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const [inputDirectory, outputFile] = process.argv.slice(2);
if (!inputDirectory || !outputFile) {
  throw new Error('Usage: node scripts/mix-island-ambience.mjs INPUT_DIR OUTPUT.wav');
}

const rate = 44100;
const channels = 2;

function readPcm(name, highCut, targetRms, offsetSeconds = 0) {
  const bytes = readFileSync(join(inputDirectory, `${name}.wav`));
  if (bytes.toString('ascii', 0, 4) !== 'RIFF') throw new Error(`${name}: expected WAV`);
  let data;
  let format;
  for (let offset = 12; offset + 8 <= bytes.length;) {
    const size = bytes.readUInt32LE(offset + 4);
    const id = bytes.toString('ascii', offset, offset + 4);
    if (id === 'fmt ') format = bytes.subarray(offset + 8, offset + 8 + size);
    if (id === 'data') data = bytes.subarray(offset + 8, offset + 8 + size);
    offset += 8 + size + (size % 2);
  }
  if (!format || !data || format.readUInt16LE(0) !== 1 ||
      format.readUInt16LE(2) !== channels || format.readUInt32LE(4) !== rate ||
      format.readUInt16LE(14) !== 16) throw new Error(`${name}: expected stereo 44.1 kHz PCM16`);

  const start = Math.round(offsetSeconds * rate) * channels;
  const samples = new Float32Array(data.length / 2 - start);
  const previous = [0, 0];
  const highPass = [0, 0];
  const lowPass = [0, 0];
  const hp = Math.exp(-2 * Math.PI * 60 / rate);
  const lp = 1 - Math.exp(-2 * Math.PI * highCut / rate);
  let energy = 0;
  for (let i = 0; i < samples.length; i++) {
    const channel = i % channels;
    const input = data.readInt16LE((i + start) * 2) / 32768;
    highPass[channel] = hp * (highPass[channel] + input - previous[channel]);
    previous[channel] = input;
    lowPass[channel] += lp * (highPass[channel] - lowPass[channel]);
    samples[i] = lowPass[channel];
    energy += samples[i] ** 2;
  }
  const gain = targetRms / Math.sqrt(energy / samples.length);
  for (let i = 0; i < samples.length; i++) samples[i] *= gain;
  return samples;
}

// Rotate past the overlap, blending the tail into the head. The resulting
// loop crosses between adjacent source samples rather than fading to silence.
function crossfadeLoop(source, seconds) {
  const overlap = Math.round(seconds * rate);
  const frames = source.length / channels;
  if (frames <= overlap * 2) throw new Error('Source is too short for the crossfade');
  const result = new Float32Array((frames - overlap) * channels);
  for (let frame = 0; frame < frames - overlap; frame++) {
    const position = frame + overlap;
    const blending = position >= frames - overlap;
    const phase = (position - (frames - overlap)) / overlap * Math.PI / 2;
    for (let channel = 0; channel < channels; channel++) {
      result[frame * channels + channel] = blending
        ? source[position * channels + channel] * Math.cos(phase) +
          source[(position - (frames - overlap)) * channels + channel] * Math.sin(phase)
        : source[position * channels + channel];
    }
  }
  return result;
}

const layers = [
  { samples: crossfadeLoop(readPcm('surf', 6500, 0.08, 5), 3), width: 1, phase: 0 },
  { samples: crossfadeLoop(readPcm('leaves', 4500, 0.032), 2), width: 0.85, phase: 2 },
  { samples: crossfadeLoop(readPcm('jungle', 5200, 0.023), 3), width: 0.6, phase: 4 },
];
const mix = new Float32Array(64 * rate * channels);
for (let frame = 0; frame < mix.length / channels; frame++) {
  for (const layer of layers) {
    const position = frame % (layer.samples.length / channels) * channels;
    const left = layer.samples[position];
    const right = layer.samples[position + 1];
    const mid = (left + right) / 2;
    const side = (left - right) / 2 * layer.width;
    const breath = 1 + 0.06 * Math.sin(2 * Math.PI * frame / (60 * rate) + layer.phase);
    mix[frame * channels] += (mid + side) * breath;
    mix[frame * channels + 1] += (mid - side) * breath;
  }
}
const loop = crossfadeLoop(mix, 4);
let peak = 0;
let energy = 0;
for (const sample of loop) peak = Math.max(peak, Math.abs(sample));
const master = Math.min(1, 0.65 / peak);
const output = Buffer.alloc(44 + loop.length * 2);
output.write('RIFF', 0);
output.writeUInt32LE(output.length - 8, 4);
output.write('WAVEfmt ', 8);
output.writeUInt32LE(16, 16);
output.writeUInt16LE(1, 20);
output.writeUInt16LE(channels, 22);
output.writeUInt32LE(rate, 24);
output.writeUInt32LE(rate * channels * 2, 28);
output.writeUInt16LE(channels * 2, 32);
output.writeUInt16LE(16, 34);
output.write('data', 36);
output.writeUInt32LE(loop.length * 2, 40);
for (let i = 0; i < loop.length; i++) {
  const value = loop[i] * master;
  if (!Number.isFinite(value) || Math.abs(value) > 1) throw new Error('Invalid audio sample');
  energy += value ** 2;
  output.writeInt16LE(Math.round(value * 32767), 44 + i * 2);
}
writeFileSync(outputFile, output);
console.log(JSON.stringify({
  durationSeconds: loop.length / (rate * channels),
  peakDbfs: 20 * Math.log10(peak * master),
  rmsDbfs: 20 * Math.log10(Math.sqrt(energy / loop.length)),
  outputFile,
}, null, 2));
