# Coloring gesture regressions

Run `bun run dev`, open `/tests/coloring-gestures.html`, and click **Run gesture
checks**. The checks use the real canvas renderer and compare pixels
before/after gesture cancellation. They cover a second touch, native
`pointercancel`, queued paint, quick taps, preserved prior washes, and resuming
one-finger drawing.

Pointer events are synthetic. Capture methods are stubbed because synthetic
pointer IDs cannot acquire native capture. The fixture verifies application
behavior, not the browser's physical pinch gesture. Confirm native page zoom on
a touch device.

The TSX fixture lives in `src/features/lost/__fixtures__` so it is checked by
the browser TypeScript configuration. It is not imported by the application
entry points and does not ship in the production build.
