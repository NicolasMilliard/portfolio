import { SOUND_EFFECTS, SOUND_EFFECT_NAMES } from './soundEffects';
import type { IslandAudio } from './useIslandAudio';

import './ambience.css';

export function IslandAmbience({
  audio: {
    audioRef,
    playback,
    registerEffect,
    toggle,
    onPlay,
    onPlaying,
    onPause,
    onError,
  },
}: { audio: IslandAudio }) {
  const active = playback === 'playing' || playback === 'loading';
  const label = playback === 'error'
    ? 'Retry island sound'
    : active ? 'Pause island sound' : 'Play island sound';

  return (
    <>
      <audio
        ref={audioRef}
        data-island-ambience=""
        src="/audio/lost/island-ambience-v1.m4a"
        loop
        preload="none"
        aria-hidden="true"
        onPlay={onPlay}
        onPlaying={onPlaying}
        onPause={onPause}
        onError={onError}
      />
      {SOUND_EFFECT_NAMES.map((effect) => (
        <audio
          key={effect}
          ref={(clip) => registerEffect(effect, clip)}
          data-island-effect={effect}
          src={`/audio/lost/effects/${SOUND_EFFECTS[effect].file}`}
          preload="none"
          aria-hidden="true"
        />
      ))}
      <button
        type="button"
        className="lost-ambience-toggle"
        onClick={toggle}
        aria-label={label}
        title="Island ambience and interaction sounds"
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M11 5 6 9H3v6h3l5 4Z" />
          {active ? (
            <path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" />
          ) : (
            <path d="m16 9 5 6m0-6-5 6" />
          )}
        </svg>
        <span>{playback === 'error' ? 'Retry sound' : active ? 'Pause sound' : 'Play sound'}</span>
      </button>
      <span className="visually-hidden" role="status">
        {playback === 'error' ? 'Island ambience could not be loaded. You can try again.' : ''}
      </span>
    </>
  );
}
