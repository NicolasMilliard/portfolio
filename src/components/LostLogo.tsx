import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from 'react';

type Capsule = 'left' | 'right';
type Position = { x: number; y: number };
type Positions = Record<Capsule, Position>;
type Placed = Record<Capsule, boolean>;

type DragSession = {
  capsule: Capsule;
  pointerId: number;
  startX: number;
  startY: number;
  origin: Position;
};

const initialPositions: Positions = {
  left: { x: -5, y: 1.5 },
  right: { x: 5, y: -1.5 },
};
const initialPlaced: Placed = { left: false, right: false };

const formatTime = (milliseconds: number) => {
  const tenths = Math.floor(milliseconds / 100);
  const minutes = Math.floor(tenths / 600);
  const seconds = Math.floor((tenths % 600) / 10);

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${tenths % 10}`;
};

const CapsuleShape = ({ capsule }: { capsule: Capsule }) => {
  const isLeft = capsule === 'left';

  return (
    <rect
      x={isLeft ? '15.817' : '29.817'}
      y={isLeft ? '2.31699' : '-0.683013'}
      width="17"
      height="33"
      rx="8.5"
      transform={`rotate(30 ${isLeft ? '15.817 2.31699' : '29.817 -0.683013'})`}
      fill="currentColor"
      fillOpacity="0.4"
      stroke="currentColor"
    />
  );
};

export const LostLogo = () => {
  const [positions, setPositions] = useState<Positions>(initialPositions);
  const [placed, setPlaced] = useState<Placed>(initialPlaced);
  const [dragging, setDragging] = useState<Capsule | null>(null);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const positionsRef = useRef(initialPositions);
  const placedRef = useRef(initialPlaced);
  const dragRef = useRef<DragSession | null>(null);
  const startedAtRef = useRef<number | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLButtonElement>(null);
  const rightRef = useRef<HTMLButtonElement>(null);
  const complete = placed.left && placed.right;

  useEffect(() => {
    if (startedAt === null || complete) return;

    const timer = window.setInterval(() => {
      setElapsed(performance.now() - startedAt);
    }, 100);

    return () => window.clearInterval(timer);
  }, [startedAt, complete]);

  const startClock = (now: number) => {
    if (startedAtRef.current !== null) return;

    startedAtRef.current = now;
    setStartedAt(now);
  };

  const pieceFor = (capsule: Capsule) =>
    capsule === 'left' ? leftRef.current : rightRef.current;

  const clampPosition = (capsule: Capsule, position: Position, rem: number) => {
    const board = boardRef.current?.getBoundingClientRect();
    const piece = pieceFor(capsule)?.getBoundingClientRect();
    if (!board || !piece) return position;

    const maxX = Math.max(0, (board.width - piece.width) / (2 * rem));
    const maxY = Math.max(0, (board.height - piece.height) / (2 * rem));

    return {
      x: Math.max(-maxX, Math.min(maxX, position.x)),
      y: Math.max(-maxY, Math.min(maxY, position.y)),
    };
  };

  const updatePosition = (capsule: Capsule, position: Position) => {
    const next = { ...positionsRef.current, [capsule]: position };
    positionsRef.current = next;
    setPositions(next);
  };

  const placeIfClose = (capsule: Capsule, rem: number, now: number) => {
    const position = positionsRef.current[capsule];
    const pieceWidth = pieceFor(capsule)?.getBoundingClientRect().width ?? 0;
    const snapDistance = Math.max(18, pieceWidth * 0.16);
    if (Math.hypot(position.x * rem, position.y * rem) > snapDistance) return;

    updatePosition(capsule, { x: 0, y: 0 });
    const next = { ...placedRef.current, [capsule]: true };
    placedRef.current = next;
    setPlaced(next);

    if (next.left && next.right && startedAtRef.current !== null) {
      setElapsed(now - startedAtRef.current);
    }
  };

  const handlePointerDown = (
    capsule: Capsule,
    event: PointerEvent<HTMLButtonElement>,
  ) => {
    if (event.button !== 0 || placedRef.current[capsule] || dragRef.current) return;

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      capsule,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      origin: positionsRef.current[capsule],
    };
    setDragging(capsule);
    startClock(event.timeStamp);
  };

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    updatePosition(
      drag.capsule,
      clampPosition(
        drag.capsule,
        {
          x: drag.origin.x + (event.clientX - drag.startX) / rem,
          y: drag.origin.y + (event.clientY - drag.startY) / rem,
        },
        rem,
      ),
    );
  };

  const handlePointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    dragRef.current = null;
    setDragging(null);
    placeIfClose(
      drag.capsule,
      parseFloat(getComputedStyle(document.documentElement).fontSize),
      event.timeStamp,
    );
  };

  const handleKeyDown = (
    capsule: Capsule,
    event: KeyboardEvent<HTMLButtonElement>,
  ) => {
    const directions: Record<string, Position> = {
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 },
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
    };
    const direction = directions[event.key];
    if (!direction || placedRef.current[capsule]) return;

    event.preventDefault();
    startClock(event.timeStamp);
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const step = event.shiftKey ? 1 : 0.5;
    const current = positionsRef.current[capsule];
    updatePosition(
      capsule,
      clampPosition(
        capsule,
        { x: current.x + direction.x * step, y: current.y + direction.y * step },
        rem,
      ),
    );
    placeIfClose(capsule, rem, event.timeStamp);
  };

  const reset = () => {
    positionsRef.current = initialPositions;
    placedRef.current = initialPlaced;
    dragRef.current = null;
    startedAtRef.current = null;
    setPositions(initialPositions);
    setPlaced(initialPlaced);
    setDragging(null);
    setStartedAt(null);
    setElapsed(0);
  };

  const renderCapsule = (capsule: Capsule) => {
    const position = positions[capsule];
    const isLeft = capsule === 'left';

    return (
      <button
        ref={isLeft ? leftRef : rightRef}
        className="lost-mark-piece"
        type="button"
        aria-label={`${isLeft ? 'Left' : 'Right'} capsule`}
        disabled={placed[capsule]}
        data-dragging={dragging === capsule}
        key={capsule}
        style={{
          transform: `translate(calc(-50% + ${position.x}rem), calc(-50% + ${position.y}rem))`,
        }}
        onPointerDown={(event) => handlePointerDown(capsule, event)}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={(event) => {
          if (dragRef.current?.pointerId !== event.pointerId) return;
          dragRef.current = null;
          setDragging(null);
        }}
        onLostPointerCapture={(event) => {
          if (dragRef.current?.pointerId !== event.pointerId) return;
          dragRef.current = null;
          setDragging(null);
        }}
        onKeyDown={(event) => handleKeyDown(capsule, event)}
      >
        <svg width="44" height="39" viewBox="0 0 44 39" fill="none" aria-hidden="true">
          <CapsuleShape capsule={capsule} />
        </svg>
      </button>
    );
  };

  return (
    <div className="lost-mark">
      <div
        ref={boardRef}
        className="lost-mark-board"
        role="group"
        aria-label="Reassemble the logo"
        aria-describedby="lost-mark-help"
      >
        <svg
          className="lost-mark-target"
          width="44"
          height="39"
          viewBox="0 0 44 39"
          fill="none"
          aria-hidden="true"
          data-complete={complete}
        >
          <CapsuleShape capsule="left" />
          <CapsuleShape capsule="right" />
        </svg>
        {renderCapsule('left')}
        {renderCapsule('right')}
      </div>
      <div className="lost-mark-caption">
        <p id="lost-mark-help" aria-live="polite">
          {complete
            ? `Logo restored in ${formatTime(elapsed)}.`
            : 'Drag the capsules onto the outline.'}
          {!complete && (
            <span className="visually-hidden">
              {' '}Use arrow keys to move a focused capsule into place.
            </span>
          )}
        </p>
        {startedAt !== null && !complete && (
          <span className="lost-mark-clock" aria-hidden="true">
            {formatTime(elapsed)}
          </span>
        )}
        {complete && (
          <button className="lost-mark-reset" type="button" onClick={reset}>
            Play again
          </button>
        )}
      </div>
    </div>
  );
};
