export const LOST_SEQUENCE = '4815162342';
export const CYCLE_SECONDS = 108 * 60;
export const TRANSMISSION_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
export const CLUE_NUMBERS = {
  ticket: [4, 23],
  flight: [8, 15],
  lottery: [16, 42],
} as const;
export const OCEANIC_FLIGHT = CLUE_NUMBERS.flight.join('');
export type Evidence = 'ticket' | 'lottery';

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
