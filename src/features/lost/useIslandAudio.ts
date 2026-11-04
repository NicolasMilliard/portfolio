import { useCallback, useEffect, useRef, useState } from 'react';

import { createSoundEffects, type PlaySound, type SoundEffect } from './soundEffects';
import { createAmbienceFader } from './ambienceFader';

type Playback = 'paused' | 'loading' | 'playing' | 'error';
const preferenceKey = 'lost-island-ambience';

export function useIslandAudio(suspended: boolean) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const clipsRef = useRef<Partial<Record<SoundEffect, HTMLAudioElement>>>({});
  const effectsRef = useRef<ReturnType<typeof createSoundEffects> | null>(null);
  const wantedRef = useRef(true);
  const requestRef = useRef(0);
  const synchronizeRef = useRef<(() => void) | null>(null);
  const suspendedRef = useRef(suspended);
  const [playback, setPlayback] = useState<Playback>('paused');

  useEffect(() => {
    try {
      wantedRef.current = localStorage.getItem(preferenceKey) !== 'off';
    } catch {
      // Sound still works when storage is unavailable.
    }
    const clips = clipsRef.current;
    const effects = createSoundEffects({
      getClip: (effect) => clips[effect],
      isEnabled: () => wantedRef.current && !document.hidden,
    });
    effectsRef.current = effects;
    return () => {
      effects.dispose();
      effectsRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const fader = createAmbienceFader({ clip: audio });
    let disposed = false;
    const synchronize = () => {
      const request = ++requestRef.current;
      if (document.hidden) effectsRef.current?.stop();
      if (!wantedRef.current || document.hidden) {
        fader.stop();
        return;
      }
      if (suspendedRef.current) {
        fader.suspend();
        return;
      }
      void fader.resume().catch((error: unknown) => {
        if (disposed || request !== requestRef.current) return;
        const name = error instanceof DOMException ? error.name : '';
        if (name === 'AbortError') return;
        setPlayback(name === 'NotAllowedError' ? 'paused' : 'error');
      });
    };
    synchronizeRef.current = synchronize;
    document.addEventListener('visibilitychange', synchronize);
    return () => {
      disposed = true;
      synchronizeRef.current = null;
      document.removeEventListener('visibilitychange', synchronize);
      fader.dispose();
    };
  }, []);

  useEffect(() => {
    suspendedRef.current = suspended;
    synchronizeRef.current?.();
  }, [suspended]);

  const registerEffect = useCallback((effect: SoundEffect, clip: HTMLAudioElement | null) => {
    if (clip) clipsRef.current[effect] = clip;
    else delete clipsRef.current[effect];
  }, []);

  const playSound: PlaySound = useCallback((effect: SoundEffect) => {
    if (!wantedRef.current || document.hidden) return;
    effectsRef.current?.play(effect);
    effectsRef.current?.warm();
    // An explicit scene interaction can unlock the requested default ambience.
    // Inspections suspend only the loop, leaving their own foley audible.
    synchronizeRef.current?.();
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.error) audio.load();
    const enable = audio.paused;
    if (enable) wantedRef.current = true;
    // This replaces any playing cue. When muting, only this tiny confirmation
    // click finishes; later interactions remain silent until sound is enabled.
    effectsRef.current?.play('ui');
    effectsRef.current?.warm();
    wantedRef.current = enable;
    try {
      localStorage.setItem(preferenceKey, enable ? 'on' : 'off');
    } catch {
      // Keep the preference for this visit even when it cannot be persisted.
    }
    synchronizeRef.current?.();
  };

  return {
    audioRef,
    playback,
    registerEffect,
    playSound,
    toggle,
    onPlay: () => setPlayback('loading'),
    onPlaying: () => {
      effectsRef.current?.warm();
      setPlayback('playing');
    },
    onPause: () => setPlayback('paused'),
    onError: () => setPlayback('error'),
  };
}

export type IslandAudio = ReturnType<typeof useIslandAudio>;
