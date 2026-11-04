export const LOST_SEQUENCE = '4815162342';
export const CYCLE_SECONDS = 108 * 60;
export const TRANSMISSION_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
export const CLUE_NUMBERS = {
  ticket: [4, 23],
  lottery: [16, 42],
  wheelchair: [8],
  can: [15],
} as const;
// A familiar reference, rather than the only source of two required numbers.
export const OCEANIC_FLIGHT = '815';
export type Evidence = keyof typeof CLUE_NUMBERS;

// Accept spaced or continuous digits, but never silently discard other input.
export const isValidSequence = (value: string): boolean =>
  /^\d[\d\s]*$/.test(value.trim()) &&
  value.replace(/\s/g, '') === LOST_SEQUENCE;

export const formatCountdown = (seconds: number): string => {
  const remaining = Math.max(0, Math.floor(seconds));
  return `${String(Math.floor(remaining / 60)).padStart(3, '0')}:${String(remaining % 60).padStart(2, '0')}`;
};

export const advanceSequence = (buffer: string, key: string): string => {
  if (/^\d$/.test(key)) return (buffer + key).slice(-LOST_SEQUENCE.length);
  return key.length === 1 && !/\s/.test(key) ? '' : buffer;
};
