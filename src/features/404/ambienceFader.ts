type AmbientClip = Pick<HTMLAudioElement, 'paused' | 'volume' | 'pause' | 'play'>;

// Keep the existing media element and loop; only ease its volume at inspections.
export function createAmbienceFader({
  clip,
  level = 0.45,
  now = () => performance.now(),
  requestFrame = (callback: FrameRequestCallback) => requestAnimationFrame(callback),
  cancelFrame = (frame: number) => cancelAnimationFrame(frame),
}: {
  clip: AmbientClip;
  level?: number;
  now?: () => number;
  requestFrame?: (callback: FrameRequestCallback) => number;
  cancelFrame?: (frame: number) => void;
}) {
  let frame = 0;
  let generation = 0;
  let wanted = false;
  let disposed = false;

  const cancel = () => {
    generation++;
    cancelFrame(frame);
    frame = 0;
  };
  const ramp = (target: number, duration: number, done?: () => void) => {
    const request = generation;
    const start = now();
    const from = clip.volume;
    if (from === target) {
      done?.();
      return;
    }
    const tick = () => {
      if (disposed || request !== generation) return;
      const progress = Math.min(1, Math.max(0, (now() - start) / duration));
      const eased = progress * progress * (3 - 2 * progress);
      clip.volume = from + (target - from) * eased;
      if (progress < 1) frame = requestFrame(tick);
      else {
        frame = 0;
        done?.();
      }
    };
    frame = requestFrame(tick);
  };
  const stop = () => {
    wanted = false;
    cancel();
    clip.pause();
    clip.volume = 0;
  };

  return {
    resume: async () => {
      if (disposed) return;
      wanted = true;
      cancel();
      const request = generation;
      if (!clip.paused) {
        ramp(level, 700);
        return;
      }
      clip.volume = 0;
      // Call play synchronously within the user's gesture; fade after decoding.
      await clip.play();
      if (disposed || !wanted) {
        clip.pause();
        return;
      }
      if (request === generation) ramp(level, 700);
    },
    suspend: () => {
      if (disposed) return;
      wanted = false;
      cancel();
      if (clip.paused) return;
      ramp(0, 180, () => clip.pause());
    },
    stop,
    dispose: () => {
      disposed = true;
      stop();
    },
  };
}
