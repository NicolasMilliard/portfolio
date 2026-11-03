// Offline foley preparation. Source credits: public/audio/lost/effects/README.md.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const [inputDirectory, outputDirectory, previewFile] = process.argv.slice(2);
if (!inputDirectory || !outputDirectory) throw new Error('Usage: node scripts/prepare-island-effects.mjs INPUT_DIR OUTPUT_DIR [PREVIEW.wav]');
const rate = 22050;
mkdirSync(outputDirectory, { recursive: true });

function readMono(name) {
  const bytes = readFileSync(join(inputDirectory, `${name}.wav`));
  let format;
  let data;
  for (let at = 12; at + 8 <= bytes.length;) {
    const length = bytes.readUInt32LE(at + 4);
    const id = bytes.toString('ascii', at, at + 4);
    if (id === 'fmt ') format = bytes.subarray(at + 8, at + 8 + length);
    if (id === 'data') data = bytes.subarray(at + 8, at + 8 + length);
    at += 8 + length + (length % 2);
  }
  if (!format || !data || format.readUInt16LE(0) !== 1 || format.readUInt16LE(2) !== 1 || format.readUInt32LE(4) !== rate || format.readUInt16LE(14) !== 16) throw new Error(`${name}: expected mono 22.05 kHz PCM16`);
  return Float32Array.from({ length: data.length / 2 }, (_, i) => data.readInt16LE(i * 2) / 32768);
}

function excerpt(source, seconds, highCut) {
  const size = Math.min(source.length, Math.round(seconds * rate));
  let bestAt = 0;
  let bestEnergy = -Infinity;
  for (let start = 0; start + size <= source.length; start += Math.round(rate * 0.025)) {
    let energy = 0;
    for (let i = start; i < start + size; i += 8) energy += source[i] ** 2;
    if (energy > bestEnergy) { bestAt = start; bestEnergy = energy; }
  }
  const result = new Float32Array(size);
  const hp = Math.exp(-2 * Math.PI * 100 / rate);
  const lp = 1 - Math.exp(-2 * Math.PI * highCut / rate);
  let previous = 0;
  let high = 0;
  let low = 0;
  for (let i = 0; i < size; i++) {
    const sample = source[bestAt + i];
    high = hp * (high + sample - previous);
    previous = sample;
    low += lp * (high - low);
    result[i] = low;
  }
  console.log(`Excerpt: ${(bestAt / rate).toFixed(3)}s, ${(size / rate).toFixed(3)}s long`);
  return result;
}

function finish(samples, rms, peakLimit, fadeOut = 0.06) {
  const attack = Math.round(rate * 0.004);
  const release = Math.round(rate * fadeOut);
  let energy = 0;
  let peak = 0;
  for (let i = 0; i < samples.length; i++) {
    const envelope = Math.min(1, i / attack, (samples.length - 1 - i) / release);
    samples[i] *= Math.max(0, envelope);
    peak = Math.max(peak, Math.abs(samples[i]));
    energy += samples[i] ** 2;
  }
  const gain = Math.min(rms / Math.sqrt(energy / samples.length), peakLimit / peak);
  for (let i = 0; i < samples.length; i++) samples[i] *= gain;
  return samples;
}

function wav(samples, path) {
  const bytes = Buffer.alloc(44 + samples.length * 2);
  bytes.write('RIFF', 0); bytes.writeUInt32LE(bytes.length - 8, 4);
  bytes.write('WAVEfmt ', 8); bytes.writeUInt32LE(16, 16);
  bytes.writeUInt16LE(1, 20); bytes.writeUInt16LE(1, 22);
  bytes.writeUInt32LE(rate, 24); bytes.writeUInt32LE(rate * 2, 28);
  bytes.writeUInt16LE(2, 32); bytes.writeUInt16LE(16, 34);
  bytes.write('data', 36); bytes.writeUInt32LE(samples.length * 2, 40);
  for (let i = 0; i < samples.length; i++) {
    if (!Number.isFinite(samples[i]) || Math.abs(samples[i]) > 0.4) throw new Error('Invalid or unexpectedly loud effect');
    bytes.writeInt16LE(Math.round(samples[i] * 32767), 44 + i * 2);
  }
  writeFileSync(path, bytes);
  console.log(`${path}: ${(samples.length / rate).toFixed(3)}s, ${bytes.length} bytes`);
}

const bag = readMono('bag');
const baggage = finish(excerpt(bag, 0.85, 2600), 0.055, 0.25);
const latch = excerpt(readMono('latch'), 0.58, 4800);
const lid = excerpt(bag, 0.75, 1400);
const opening = new Float32Array(Math.round(rate * 1.05));
for (let i = 0; i < opening.length; i++) {
  const second = i - Math.round(rate * 0.14);
  const lining = i - Math.round(rate * 0.25);
  opening[i] = (latch[i] ?? 0) * 0.7 + (latch[second] ?? 0) * 0.5 + (lid[lining] ?? 0) * 0.12;
}
const ui = new Float32Array(Math.round(rate * 0.075));
let seed = 815;
let filtered = 0;
for (let i = 0; i < ui.length; i++) {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  filtered += 0.55 * ((seed / 2147483648 - 1) - filtered);
  const t = i / rate;
  ui[i] = filtered * Math.exp(-t * 180) * 0.4 + Math.sin(2 * Math.PI * 240 * t) * Math.exp(-t * 110) * 0.5;
}
// A restrained old-computer startup: power relay, motor/CRT hum, then two
// short monophonic beeps.
const terminal = new Float32Array(Math.round(rate * 1.45));
let hiss = 0;
for (let i = 0; i < terminal.length; i++) {
  const t = i / rate;
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  hiss += 0.18 * ((seed / 2147483648 - 1) - hiss);
  const power = Math.min(1, t / 0.06) * Math.exp(-t * 2.8);
  const motorPhase = 2 * Math.PI * (155 * t - 22 * t * t);
  let sample = power * (Math.sin(motorPhase) * 0.035 + Math.sin(motorPhase * 2) * 0.014 + hiss * 0.06);
  sample += Math.sin(2 * Math.PI * 60 * t) * 0.012 * power;
  sample += (ui[i] ?? 0) * 0.18;
  for (const [start, frequency] of [[0.28, 880], [0.56, 660]]) {
    const age = t - start;
    if (age >= 0 && age < 0.09) {
      const envelope = Math.min(1, age / 0.005, (0.09 - age) / 0.015);
      const phase = 2 * Math.PI * frequency * age;
      sample += (Math.sin(phase) + 0.15 * Math.sin(phase * 3)) * 0.1 * envelope;
    }
  }
  terminal[i] = sample;
}
const effects = [
  ['ui-click-v1.wav', finish(ui, 0.025, 0.1, 0.015)],
  ['baggage-handle-v1.wav', baggage],
  ['baggage-open-v1.wav', finish(opening, 0.06, 0.3)],
  ['paper-rustle-v1.wav', finish(excerpt(readMono('paper'), 0.9, 5800), 0.065, 0.28)],
  ['terminal-boot-v1.wav', finish(terminal, 0.055, 0.26, 0.18)],
];
for (const [name, samples] of effects) wav(samples, join(outputDirectory, name));
if (previewFile) {
  const gap = Math.round(rate * 0.5);
  const preview = new Float32Array(effects.reduce((size, [, samples]) => size + samples.length + gap, gap));
  let at = gap;
  for (const [, samples] of effects) {
    for (let i = 0; i < samples.length; i++) preview[at + i] = samples[i] * 0.5;
    at += samples.length + gap;
  }
  wav(preview, previewFile);
}
