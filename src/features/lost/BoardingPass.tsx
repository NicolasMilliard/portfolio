import { CLUE_NUMBERS, OCEANIC_FLIGHT } from './protocol';

export function BoardingPass({ compact = false }: { compact?: boolean }) {
  return (
    <img
      className={`oceanic-ticket${compact ? ' oceanic-ticket-compact' : ''}`}
      src={
        compact
          ? '/images/lost/boarding-pass-weathered-v1-320.webp'
          : '/images/lost/boarding-pass-weathered-v1-1440.webp'
      }
      srcSet={
        compact
          ? '/images/lost/boarding-pass-weathered-v1-160.webp 160w, /images/lost/boarding-pass-weathered-v1-320.webp 320w'
          : '/images/lost/boarding-pass-weathered-v1-720.webp 720w, /images/lost/boarding-pass-weathered-v1-1440.webp 1440w'
      }
      sizes={
        compact
          ? '(max-width: 640px) 20vw, 8vw'
          : '(max-width: 640px) calc(100vw - 32px), 680px'
      }
      width={1900}
      height={828}
      alt={
        compact
          ? ''
          : `A torn, water-stained Oceanic Airlines boarding pass for Jack Shephard. Sydney (SYD) to Los Angeles (LAX), flight ${OCEANIC_FLIGHT}. Gate ${CLUE_NUMBERS.ticket[0]}, seat ${CLUE_NUMBERS.ticket[1]}. One way, no return.`
      }
      decoding="async"
    />
  );
}
