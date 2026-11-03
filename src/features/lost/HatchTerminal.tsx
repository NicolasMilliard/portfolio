import { useEffect, useRef, useState, type SubmitEvent } from 'react';

import {
  CYCLE_SECONDS,
  formatCountdown,
  isValidSequence,
  TRANSMISSION_URL,
} from './protocol';
import type { PlaySound } from './soundEffects';
import './terminal.css';

type Phase = 'awaiting' | 'error' | 'accepted';

function Countdown({ restored }: { restored: boolean }) {
  const [remaining, setRemaining] = useState(CYCLE_SECONDS);
  useEffect(() => {
    if (restored) return;
    const deadline = Date.now() + CYCLE_SECONDS * 1000;
    const timer = window.setInterval(() => {
      // Wall time keeps the clock accurate when a background tab is throttled.
      setRemaining(Math.max(0, Math.ceil((deadline - Date.now()) / 1000)));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [restored]);

  return (
    <span
      className="hatch-clock"
      role="timer"
      aria-label="Time until containment reset"
      aria-live="off"
    >
      {formatCountdown(restored ? CYCLE_SECONDS : remaining)}
    </span>
  );
}

export default function HatchTerminal({
  prefill,
  onClose,
  onSound,
}: {
  prefill: string;
  onClose: () => void;
  onSound: PlaySound;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const acceptedRef = useRef(false);
  const [phase, setPhase] = useState<Phase>('awaiting');
  const accepted = phase === 'accepted';

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    inputRef.current?.focus({ preventScroll: true });
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const submit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (acceptedRef.current) return;
    onSound('ui');
    if (isValidSequence(inputRef.current?.value ?? '')) {
      acceptedRef.current = true;
      setPhase('accepted');
      // Keep this inside the submit gesture so browsers allow the new tab.
      window.open(TRANSMISSION_URL, '_blank', 'noopener,noreferrer');
      inputRef.current?.focus();
    } else {
      setPhase('error');
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="hatch-dialog"
      data-phase={phase}
      aria-labelledby="hatch-terminal-heading"
      aria-modal="true"
      aria-describedby="hatch-terminal-description"
      onClose={(event) => {
        // StrictMode replays effects; ignore the cleanup's queued close event
        // if the second setup has already reopened the native dialog.
        if (!event.currentTarget.open) onClose();
      }}
      onCancel={(event) => {
        event.preventDefault();
        dialogRef.current?.close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
    >
      <div className="hatch-terminal-shell">
        <div className="hatch-terminal-toolbar">
          <span>STATION 03 / THE SWAN</span>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close terminal"
          >
            CLOSE
          </button>
        </div>
        <div className="hatch-screen">
          <div className="hatch-terminal-top">
            <span>
              DHARMA INITIATIVE
              <br />
              ELECTROMAGNETIC RESEARCH DIVISION
            </span>
            <Countdown restored={accepted} />
          </div>
          <div className="hatch-boot" aria-hidden="true">
            <span>LINK ESTABLISHED........................OK</span>
            <span>CONTAINMENT PROTOCOL...................ACTIVE</span>
          </div>
          <h2 id="hatch-terminal-heading">
            SYSTEM INITIALIZED
            <span className="hatch-cursor" aria-hidden="true">
              _
            </span>
          </h2>
          <p id="hatch-terminal-description">
            Every 108 minutes, the sequence must be entered.
            <br />
            Do not attempt to use the computer for anything else.
          </p>
          <form onSubmit={submit} autoComplete="off">
            <label htmlFor="hatch-sequence">&gt; ENTER THE SEQUENCE:</label>
            <div className="hatch-terminal-form">
              <div className="hatch-input-wrap">
                <span aria-hidden="true">&gt;:</span>
                <input
                  ref={inputRef}
                  id="hatch-sequence"
                  name="sequence"
                  type="text"
                  inputMode="numeric"
                  spellCheck={false}
                  autoCapitalize="off"
                  maxLength={64}
                  defaultValue={prefill}
                  placeholder="_ _ _ _ _ _"
                  readOnly={accepted}
                  aria-invalid={phase === 'error'}
                  aria-describedby="hatch-response"
                />
              </div>
              <button type="submit" disabled={accepted}>
                [ EXECUTE ]
              </button>
            </div>
          </form>
          <p
            className="hatch-response"
            id="hatch-response"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {accepted
              ? '> CODE ACCEPTED. TRANSMISSION UNLOCKED.'
              : phase === 'error'
                ? '> INVALID SEQUENCE. TRY AGAIN. THE CLOCK IS STILL RUNNING.'
                : '> AWAITING INPUT_'}
          </p>
          {accepted && (
            <a
              className="hatch-transmission-link"
              href={TRANSMISSION_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              [ OPEN TRANSMISSION ↗ ]
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          )}
          <div className="hatch-terminal-bottom">
            <span>OS: DHARMA-1977 // SECURE LINK</span>
            <span>PROJECT 108</span>
          </div>
        </div>
        <div className="hatch-terminal-label">
          <span>
            <i aria-hidden="true" /> SWAN / MAINFRAME
          </span>
          <span>DESIGNED FOR CONTINUOUS OPERATION</span>
        </div>
      </div>
    </dialog>
  );
}
