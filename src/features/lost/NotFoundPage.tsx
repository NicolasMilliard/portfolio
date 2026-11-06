import { Link } from '@tanstack/react-router';
import { lazy, Suspense, useCallback, useRef, useState } from 'react';

import { IslandAmbience } from './IslandAmbience';
import { IslandClues } from './IslandClues';
import { IslandForeground } from './IslandForeground';
import { IslandPhone } from './IslandPhone';
import { IslandScene } from './IslandScene';
import {
  FORMATTED_LOST_SEQUENCE,
  OCEANIC_FLIGHT,
  startCountdown,
  type ClueKind,
  type Evidence,
} from './protocol';
import './styles/cursors.css';
import './styles/island.css';
import { useIslandAudio } from './useIslandAudio';
import { useIslandInteractions } from './useIslandInteractions';

const HatchTerminal = lazy(() => import('./HatchTerminal'));
const ClueDialog = lazy(() => import('./ClueDialog'));
const ArtifactDialog = lazy(() => import('./ArtifactDialog'));

type Overlay = { kind: 'terminal'; prefill: string } | { kind: ClueKind };
const overlaySound = {
  ticket: 'paper',
  suitcase: 'baggage',
  wheelchair: 'frame',
  can: 'metal',
  terminal: 'terminal',
} as const;

export function NotFoundPage() {
  const [overlay, setOverlay] = useState<Overlay | null>(null);
  const [terminalDeadline, setTerminalDeadline] = useState<number | null>(null);
  const audio = useIslandAudio(overlay !== null);
  const { playSound } = audio;
  const [found, setFound] = useState<Record<Evidence, boolean>>({
    ticket: false,
    lottery: false,
    wheelchair: false,
    can: false,
  });
  const [hint, setHint] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);
  const previousFocus = useRef<HTMLElement | null>(null);
  const terminalTriggerRef = useRef<HTMLButtonElement>(null);
  const openOverlay = useCallback(
    (next: Overlay, trigger?: HTMLElement) => {
      if (next.kind === 'terminal') {
        const now = Date.now();
        setTerminalDeadline((deadline) => startCountdown(deadline, now));
      }
      playSound(overlaySound[next.kind]);
      previousFocus.current =
        trigger ??
        (document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null);
      setOverlay(next);
    },
    [playSound],
  );
  const discover = useCallback(
    () => openOverlay({ kind: 'terminal', prefill: FORMATTED_LOST_SEQUENCE }),
    [openOverlay],
  );
  const connectPhone = useCallback(
    (trigger: HTMLButtonElement) =>
      openOverlay({ kind: 'terminal', prefill: '' }, trigger),
    [openOverlay],
  );
  const sceneRef = useIslandInteractions(
    discover,
    overlay === null,
    motionPaused,
  );
  const closeOverlay = useCallback(() => {
    playSound('ui');
    setOverlay(null);
    const target = previousFocus.current;
    (target && target !== document.body && target.isConnected
      ? target
      : terminalTriggerRef.current
    )?.focus({ preventScroll: true });
  }, [playSound]);
  const findEvidence = useCallback((evidence: Evidence) => {
    setFound((previous) =>
      previous[evidence] ? previous : { ...previous, [evidence]: true },
    );
  }, []);
  const inspectClue = useCallback(
    (kind: ClueKind, trigger: HTMLButtonElement) => {
      if (kind === 'ticket') findEvidence('ticket');
      openOverlay({ kind }, trigger);
    },
    [findEvidence, openOverlay],
  );
  const allFound = Object.values(found).every(Boolean);
  const explorationHint = allFound
    ? 'Six numbers. That handset might still work.'
    : found.ticket && found.lottery
      ? 'The island has a habit of keeping secrets.'
      : found.ticket
        ? 'There’s something folded inside that suitcase.'
        : found.lottery
          ? 'There’s a boarding pass caught in the leaves.'
          : 'The tide leaves things behind. Look around.';

  return (
    <div
      className="lost-page"
      ref={sceneRef}
      data-motion={motionPaused ? 'paused' : 'playing'}
      data-overlay-open={overlay !== null}
    >
      <header className="lost-header">
        <div className="lost-header-actions">
          <IslandAmbience audio={audio} />
          <button
            className="lost-motion-toggle"
            type="button"
            aria-label={
              motionPaused
                ? 'Resume environmental animation'
                : 'Pause environmental animation'
            }
            aria-pressed={motionPaused}
            onClick={() => {
              playSound('ui');
              setMotionPaused(!motionPaused);
            }}
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              {motionPaused ? (
                <path d="m7 5 7 5-7 5Z" fill="currentColor" />
              ) : (
                <path
                  d="M7 5v10m6-10v10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              )}
            </svg>
          </button>
        </div>
      </header>

      <main className="lost-main">
        <div className="lost-hero">
          <p className="lost-eyebrow">
            FLIGHT {OCEANIC_FLIGHT} <span aria-hidden="true">·</span> LOCATION
            UNKNOWN
          </p>
          <div className="lost-error-code" aria-hidden="true">
            404
          </div>
          <h1>
            <span className="visually-hidden">Page not found. </span>You are
            lost<span>.</span>
          </h1>
          <div className="lost-rule" aria-hidden="true">
            <i />
          </div>
          <p className="lost-description">
            This page has vanished without a trace.
            <br />
            The island has a habit of keeping secrets.
          </p>
          <div className="lost-actions">
            <Link to="/" className="lost-button lost-button-primary">
              We have to go back
              <svg
                className="lost-button-icon"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d="m4 16 12-12M4 4h12v12" />
              </svg>
            </Link>
            <button
              type="button"
              className="lost-button lost-button-ghost"
              onClick={() => {
                playSound('ui');
                setHint(!hint);
              }}
              aria-expanded={hint}
              aria-controls="island-hint"
            >
              Explore the island <span aria-hidden="true">⌁</span>
            </button>
          </div>
          <p id="island-hint" className="lost-hint" role="status">
            {hint ? explorationHint : '\u00a0'}
          </p>
        </div>
      </main>

      <IslandScene>
        <IslandClues onInspect={inspectClue} />
        <IslandPhone
          triggerRef={terminalTriggerRef}
          onConnect={connectPhone}
          hasSequence={allFound}
        />
      </IslandScene>
      <IslandForeground />
      {overlay && (
        <Suspense
          fallback={
            <div className="lost-loading" role="status">
              {overlay.kind === 'terminal'
                ? 'ESTABLISHING CONNECTION…'
                : 'TAKING A CLOSER LOOK…'}{' '}
              <button type="button" onClick={closeOverlay}>
                Cancel
              </button>
            </div>
          }
        >
          {overlay.kind === 'terminal' ? (
            <HatchTerminal
              prefill={overlay.prefill}
              deadline={terminalDeadline}
              onClose={closeOverlay}
              onSound={playSound}
            />
          ) : overlay.kind === 'wheelchair' || overlay.kind === 'can' ? (
            <ArtifactDialog
              key={overlay.kind}
              kind={overlay.kind}
              onClose={closeOverlay}
              onFind={findEvidence}
              onSound={playSound}
            />
          ) : (
            <ClueDialog
              key={overlay.kind}
              kind={overlay.kind}
              onClose={closeOverlay}
              onFind={findEvidence}
              onSound={playSound}
            />
          )}
        </Suspense>
      )}
    </div>
  );
}
