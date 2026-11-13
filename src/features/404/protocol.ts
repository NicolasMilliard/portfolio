const sequenceNumbers = [4, 8, 15, 16, 23, 42] as const;
export const LOST_SEQUENCE = sequenceNumbers.join('');
export const FORMATTED_LOST_SEQUENCE = sequenceNumbers.join(' ');
export const CYCLE_SECONDS = 108 * 60;
export const TRANSMISSION_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
export const CLUE_NUMBERS = {
  ticket: [4, 23],
  lottery: [16, 42],
  wheelchair: [8],
  can: [15],
} as const;
export const OCEANIC_FLIGHT = '815';

export type Evidence = keyof typeof CLUE_NUMBERS;
export type ArtifactKind = 'wheelchair' | 'can';
export type ClueKind = 'ticket' | 'suitcase' | ArtifactKind;
export type SuitcaseItem = 'shirt' | 'paper';

// Accept spaced or continuous digits, but never silently discard other input.
export const isValidSequence = (value: string): boolean =>
  /^\d[\d\s]*$/.test(value.trim()) &&
  value.replace(/\s/g, '') === LOST_SEQUENCE;

export const formatCountdown = (seconds: number): string => {
  const remaining = Math.max(0, Math.floor(seconds));
  return `${String(Math.floor(remaining / 60)).padStart(3, '0')}:${String(remaining % 60).padStart(2, '0')}`;
};

// Keep one wall-clock deadline for this visit, including time spent exploring.
export const startCountdown = (deadline: number | null, now: number): number =>
  deadline ?? now + CYCLE_SECONDS * 1000;

export const countdownRemaining = (
  deadline: number | null,
  now: number,
): number =>
  deadline === null
    ? CYCLE_SECONDS
    : Math.max(0, Math.ceil((deadline - now) / 1000));

export const advanceSequence = (buffer: string, key: string): string => {
  if (/^\d$/.test(key)) return (buffer + key).slice(-LOST_SEQUENCE.length);
  return key.length === 1 && !/\s/.test(key) ? '' : buffer;
};
