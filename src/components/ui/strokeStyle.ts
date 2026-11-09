import type { CSSProperties } from 'react';

export type StrokeTiming = { delay: number; duration: number };

export const strokeStyle = ({ delay, duration }: StrokeTiming) =>
  ({
    '--stroke-delay': `${delay}ms`,
    '--stroke-duration': `${duration}ms`,
  }) as CSSProperties;
