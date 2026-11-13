import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ColoringCanvas } from '../ColoringCanvas';
import '../../../styles/index.css';
import '../styles/coloring.css';

const frame = { x: -140, y: -105, width: 1280, height: 720 };
const tick = () =>
  new Promise<void>((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
  );

export function GestureChecks() {
  const [result, setResult] = useState('Ready to run gesture checks');
  const [version, setVersion] = useState(0);
  const [running, setRunning] = useState(false);
  const run = async () => {
    if (running) return;
    setRunning(true);
    setVersion((current) => current + 1);
    setResult('Checking gesture cancellation…');
    try {
      await tick();
      const canvas = document.querySelector('canvas')!;
      const started = performance.now();
      while (getComputedStyle(canvas).cursor === 'progress') {
        if (performance.now() - started > 10000)
          throw new Error('Paint loading timed out');
        await tick();
      }
      // Synthetic pointer IDs cannot acquire browser-native capture. Stub only
      // capture bookkeeping; drawing, masking, compositing and React handlers run normally.
      canvas.setPointerCapture = () => {};
      canvas.hasPointerCapture = () => false;
      canvas.releasePointerCapture = () => {};
      const bounds = canvas.getBoundingClientRect();
      const send = (
        type: string,
        pointerId: number,
        primary: boolean,
        x = 336,
        y = 234,
      ) =>
        canvas.dispatchEvent(
          new PointerEvent(type, {
            pointerId,
            pointerType: 'touch',
            isPrimary: primary,
            button: 0,
            buttons: type === 'pointerup' || type === 'pointercancel' ? 0 : 1,
            clientX: bounds.left + ((x - frame.x) * bounds.width) / frame.width,
            clientY:
              bounds.top + ((y - frame.y) * bounds.height) / frame.height,
            bubbles: true,
          }),
        );
      const assert = (condition: boolean, description: string) => {
        if (!condition) throw new Error(description);
      };
      const snapshot = () => canvas.toDataURL();
      const blank = snapshot();
      assert(
        getComputedStyle(canvas.parentElement!).touchAction === 'pinch-zoom',
        'Native pinch is not enabled',
      );

      send('pointerdown', 101, true);
      await tick();
      assert(
        snapshot() !== blank,
        'The first finger must paint a visible preview',
      );
      send('pointerdown', 102, false);
      await tick();
      assert(
        snapshot() === blank,
        'A second finger must remove the initial dab',
      );
      send('pointermove', 101, true, 348, 244);
      send('pointerup', 101, true);
      send('pointerup', 102, false);
      await tick();
      assert(
        snapshot() === blank,
        'Remaining pinch contacts must not resume painting',
      );

      send('pointerdown', 201, true);
      send('pointerup', 201, true);
      await tick();
      const committed = snapshot();
      assert(committed !== blank, 'A completed one-finger stroke must remain');
      send('pointerdown', 301, true, 343, 240);
      send('pointermove', 301, true, 360, 255);
      await tick();
      assert(
        snapshot() !== committed,
        'The active wash must be visible over prior paint',
      );
      send('pointerdown', 302, false);
      await tick();
      assert(
        snapshot() === committed,
        'Pinching must restore earlier pigments pixel for pixel',
      );
      send('pointerup', 301, true);
      send('pointerup', 302, false);

      send('pointerdown', 401, true, 350, 246);
      send('pointercancel', 401, true);
      await tick();
      assert(
        snapshot() === committed,
        'Cancellation before RAF must not leave queued paint',
      );
      send('pointerdown', 501, true, 350, 246);
      await tick();
      assert(
        snapshot() !== committed,
        'A new finger gesture must work after a pinch',
      );
      send('pointercancel', 501, true);
      await tick();
      assert(
        snapshot() === committed,
        'Native cancellation must roll back the visible preview',
      );
      setResult('PASS — 10 touch policy and pixel restoration assertions');
    } catch (error) {
      setResult('FAIL — ' + String(error));
    } finally {
      setRunning(false);
    }
  };
  return (
    <main>
      <button type="button" onClick={run} disabled={running}>
        Run gesture checks
      </button>
      <p role="status">{result}</p>
      <div className="coloring-composition" style={{ width: 640, height: 360 }}>
        <ColoringCanvas
          key={version}
          frame={frame}
          color="#357fc0"
          brushSize={48}
          cursor="crosshair"
        />
      </div>
    </main>
  );
}

createRoot(document.getElementById('test-root')!).render(
  <StrictMode>
    <GestureChecks />
  </StrictMode>,
);
