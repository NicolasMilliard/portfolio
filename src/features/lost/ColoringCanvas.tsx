import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent,
} from 'react';

import {
  ColoringPainter,
  loadPaintingAssets,
  type ColoringFrame,
} from './coloring-painter';
import type { PaintPoint } from './watercolor';

type Props = {
  frame: ColoringFrame;
  color: string;
  brushSize: number;
  cursor: string;
};

export function ColoringCanvas({ frame, color, brushSize, cursor }: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const painter = useRef<ColoringPainter | null>(null);
  const latestFrame = useRef(frame);
  const gesture = useRef<{
    pointerId: number;
    left: number;
    top: number;
    scale: number;
    frame: ColoringFrame;
  } | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(
    'loading',
  );

  useLayoutEffect(() => {
    latestFrame.current = frame;
    // A resize ends the gesture before coordinates change; cached paint remains.
    if (gesture.current && canvas.current) {
      const pointerId = gesture.current.pointerId;
      gesture.current = null;
      if (canvas.current.hasPointerCapture(pointerId))
        canvas.current.releasePointerCapture(pointerId);
    }
    painter.current?.resize(frame);
  }, [frame]);

  useEffect(() => {
    const controller = new AbortController();
    let instance: ColoringPainter | null = null;
    const resize = () => instance?.resize(latestFrame.current);
    void loadPaintingAssets(controller.signal)
      .then((assets) => {
        if (controller.signal.aborted || !canvas.current) return;
        instance = new ColoringPainter(canvas.current, assets);
        painter.current = instance;
        resize();
        window.addEventListener('resize', resize);
        setStatus('ready');
      })
      .catch(() => {
        if (!controller.signal.aborted) setStatus('error');
      });
    return () => {
      controller.abort();
      window.removeEventListener('resize', resize);
      instance?.dispose();
      painter.current = null;
      gesture.current = null;
    };
  }, []);

  const pointAt = (event: globalThis.PointerEvent): PaintPoint => {
    const current = gesture.current!;
    return {
      x: current.frame.x + (event.clientX - current.left) / current.scale,
      y: current.frame.y + (event.clientY - current.top) / current.scale,
    };
  };

  const cancelStroke = () => {
    const current = gesture.current;
    if (!current) return;
    gesture.current = null;
    painter.current?.cancelStroke();
    if (canvas.current?.hasPointerCapture(current.pointerId))
      canvas.current.releasePointerCapture(current.pointerId);
  };

  const startStroke = (event: PointerEvent<HTMLCanvasElement>) => {
    if (event.pointerType === 'touch' && !event.isPrimary) {
      cancelStroke();
      return;
    }
    if (
      !painter.current ||
      !event.isPrimary ||
      event.button !== 0 ||
      gesture.current
    )
      return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width) return;
    if (event.pointerType !== 'touch') event.preventDefault();
    const scale = bounds.width / frame.width;
    gesture.current = {
      pointerId: event.pointerId,
      left: bounds.left,
      top: bounds.top,
      scale,
      frame,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    painter.current.startStroke(
      pointAt(event.nativeEvent),
      brushSize / scale,
      color,
    );
  };

  const finishStroke = (event: PointerEvent<HTMLCanvasElement>) => {
    if (gesture.current?.pointerId !== event.pointerId) return;
    if (event.type === 'pointerup')
      painter.current?.addPoints([pointAt(event.nativeEvent)]);
    painter.current?.finishStroke();
    gesture.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const continueStroke = (event: PointerEvent<HTMLCanvasElement>) => {
    if (gesture.current?.pointerId !== event.pointerId) return;
    if (!(event.buttons & 1)) {
      finishStroke(event);
      return;
    }
    // Some browsers expose additional pen/mouse samples; retain their geometry
    // without forcing a React render (or a separate raster pass) for each sample.
    const coalesced = event.nativeEvent.getCoalescedEvents?.();
    painter.current?.addPoints(
      (coalesced?.length ? coalesced : [event.nativeEvent]).map(pointAt),
    );
  };

  return (
    <>
      <canvas
        ref={canvas}
        className="coloring-paint"
        aria-hidden="true"
        style={{
          cursor:
            status === 'ready'
              ? cursor
              : status === 'loading'
                ? 'progress'
                : 'default',
        }}
        onPointerDown={startStroke}
        onPointerMove={continueStroke}
        onPointerUp={finishStroke}
        onPointerCancel={(event) => {
          if (gesture.current?.pointerId === event.pointerId) cancelStroke();
        }}
        onLostPointerCapture={finishStroke}
      />
      {status === 'error' && (
        <p className="coloring-paint-error" role="status">
          Painting couldn’t load. Please reload the page to try again.
        </p>
      )}
    </>
  );
}
