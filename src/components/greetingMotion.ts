import { helloLettering, type HelloStrokeId } from './helloLettering.ts';

// All values are milliseconds. The schedule below follows these settings.
export const greetingTiming = {
  startDelay: 80,
  pauseBetweenHStrokes: 20,
  pauseAfterH: 120,
  strokeDurations: {
    hLeft: 220,
    hRight: 200,
    hCrossbar: 100,
    e: 300,
    lFirst: 240,
    lSecond: 230,
    o: 350,
  } satisfies Record<HelloStrokeId, number>,
  // The next pen guide starts slightly early for a flowing lowercase rhythm.
  letterOverlaps: { eToL: 50, lToL: 10, lToO: 30 },
  comma: { pauseBefore: 40, duration: 120 },
  wash: {
    pauseBefore: 220,
    firstDuration: 800,
    pauseBetween: 90,
    secondDuration: 600,
  },
};

export function createGreetingMotion(timing = greetingTiming) {
  const pauses: Record<HelloStrokeId, number> = {
    hLeft: timing.startDelay,
    hRight: timing.pauseBetweenHStrokes,
    hCrossbar: timing.pauseBetweenHStrokes,
    e: timing.pauseAfterH,
    lFirst: -timing.letterOverlaps.eToL,
    lSecond: -timing.letterOverlaps.lToL,
    o: -timing.letterOverlaps.lToO,
  };
  let previousEnd = 0;
  const helloStrokes = helloLettering.map((artwork) => {
    const delay = previousEnd + pauses[artwork.id];
    const duration = timing.strokeDurations[artwork.id];
    previousEnd = delay + duration;
    return { ...artwork, delay, duration };
  });
  const helloEnd = Math.max(
    ...helloStrokes.map((stroke) => stroke.delay + stroke.duration),
  );
  const greetingComma = {
    delay: helloEnd + timing.comma.pauseBefore,
    duration: timing.comma.duration,
  };
  const firstPass = {
    delay:
      greetingComma.delay + greetingComma.duration + timing.wash.pauseBefore,
    duration: timing.wash.firstDuration,
  };
  const nameWash = {
    firstPass,
    secondPass: {
      delay: firstPass.delay + firstPass.duration + timing.wash.pauseBetween,
      duration: timing.wash.secondDuration,
    },
  };
  return { helloStrokes, greetingComma, nameWash };
}

export const { helloStrokes, greetingComma, nameWash } = createGreetingMotion();
