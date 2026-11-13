export const SOUND_EFFECTS = {
  ui: { file: 'ui-click-v1.wav', volume: 0.55 },
  baggage: { file: 'baggage-handle-v1.wav', volume: 0.5 },
  latch: { file: 'baggage-open-v1.wav', volume: 0.5 },
  paper: { file: 'paper-rustle-v1.wav', volume: 0.55 },
  terminal: { file: 'terminal-boot-v1.wav', volume: 0.4 },
  frame: { file: 'wheelchair-frame-v1.wav', volume: 0.35 },
  metal: { file: 'can-handle-v1.wav', volume: 0.4 },
} as const;

export type SoundEffect = keyof typeof SOUND_EFFECTS;
export type PlaySound = (effect: SoundEffect) => void;
export const SOUND_EFFECT_NAMES = Object.keys(SOUND_EFFECTS) as SoundEffect[];
type Clip = Pick<HTMLAudioElement, 'pause' | 'play' | 'load' | 'currentTime' | 'volume' | 'preload'>;

// A single foreground voice keeps repeated clicks and successive discoveries
// from piling up. Native media elements supply decoding and caching.
export function createSoundEffects({
  getClip,
  isEnabled,
  now = () => performance.now(),
}: {
  getClip: (effect: SoundEffect) => Clip | undefined;
  isEnabled: () => boolean;
  now?: () => number;
}) {
  let active: Clip | undefined;
  let lastEffect: SoundEffect | undefined;
  let lastTime = -Infinity;
  let generation = 0;
  let disposed = false;
  const warmed = new Set<SoundEffect>();

  const stop = () => {
    generation++;
    active?.pause();
    active = undefined;
  };

  const play = (effect: SoundEffect) => {
    if (disposed || !isEnabled()) return;
    const time = now();
    if (effect === lastEffect && time - lastTime < 75) return;
    const settings = SOUND_EFFECTS[effect];
    if (!settings) return;
    const clip = getClip(effect);
    if (!clip) return;
    stop();
    active = clip;
    lastEffect = effect;
    lastTime = time;
    const request = generation;
    try {
      clip.volume = settings.volume;
      clip.currentTime = 0;
      void clip.play().then(() => {
        // A slow load must not start a stale cue after another action or teardown.
        // Reusing this same clip is safe: an older completion must not stop it.
        if (disposed || (request !== generation && active !== clip)) clip.pause();
      }).catch(() => {
        // A denied or unavailable effect never interrupts the interaction.
      });
    } catch {
      active = undefined;
    }
  };

  return {
    play,
    stop,
    warm: () => {
      if (disposed || !isEnabled()) return;
      for (const effect of SOUND_EFFECT_NAMES) {
        const clip = getClip(effect);
        if (!clip || warmed.has(effect)) continue;
        warmed.add(effect);
        clip.preload = 'auto';
        if (clip !== active) clip.load();
      }
    },
    dispose: () => {
      disposed = true;
      stop();
      warmed.clear();
    },
  };
}
