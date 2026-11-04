import { useEffect, useRef } from 'react';

import { advanceSequence, LOST_SEQUENCE } from './protocol';

export function useIslandInteractions(
  onDiscover: () => void,
  enabled: boolean,
  motionPaused: boolean,
) {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const synchronize = () => {
      scene.dataset.visibility = document.hidden ? 'hidden' : 'visible';
    };
    synchronize();
    document.addEventListener('visibilitychange', synchronize);
    return () => document.removeEventListener('visibilitychange', synchronize);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let buffer = '';
    let lastKeyAt = 0;
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.repeat ||
        event.isComposing ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        (event.target instanceof Element &&
          event.target.closest(
            'input, textarea, select, button, a, [contenteditable]:not([contenteditable="false"]), [role="textbox"], [role="combobox"], dialog',
          ))
      ) {
        buffer = '';
        return;
      }
      if (event.timeStamp - lastKeyAt > 8000) buffer = '';
      lastKeyAt = event.timeStamp;
      buffer = advanceSequence(buffer, event.key);
      if (buffer === LOST_SEQUENCE) {
        // The final key must not also type into the newly focused terminal.
        event.preventDefault();
        buffer = '';
        onDiscover();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onDiscover, enabled]);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || !enabled || motionPaused) return;
    const motion = window.matchMedia(
      '(prefers-reduced-motion: no-preference) and (pointer: fine) and (min-width: 641px)',
    );
    let frame = 0;
    let x = 0;
    let y = 0;
    const paint = () => {
      frame = 0;
      scene.style.setProperty('--island-x', x.toFixed(3));
      scene.style.setProperty('--island-y', y.toFixed(3));
    };
    const update = (event: PointerEvent) => {
      if (
        !motion.matches ||
        document.hidden ||
        event.pointerType !== 'mouse' ||
        scene.dataset.motion === 'paused'
      )
        return;
      x = Math.max(-0.5, Math.min(0.5, event.clientX / window.innerWidth - 0.5));
      y = Math.max(-0.5, Math.min(0.5, event.clientY / window.innerHeight - 0.5));
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const reset = () => {
      cancelAnimationFrame(frame);
      x = 0;
      y = 0;
      paint();
    };
    window.addEventListener('pointermove', update, { passive: true });
    document.documentElement.addEventListener('pointerleave', reset);
    window.addEventListener('blur', reset);
    motion.addEventListener('change', reset);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', update);
      document.documentElement.removeEventListener('pointerleave', reset);
      window.removeEventListener('blur', reset);
      motion.removeEventListener('change', reset);
    };
  }, [enabled, motionPaused]);

  return sceneRef;
}
