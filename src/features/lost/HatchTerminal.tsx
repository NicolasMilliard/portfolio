import { useEffect, useRef, useState, type SubmitEvent } from 'react';

import { HatchSequenceInput } from './HatchSequenceInput';
import {
  countdownRemaining,
  formatCountdown,
  isValidSequence,
  TRANSMISSION_URL,
} from './protocol';
import type { PlaySound } from './soundEffects';
import './styles/terminal.css';

type Phase = 'awaiting' | 'error' | 'accepted';

function Countdown({ deadline }: { deadline: number | null }) {
  const [remaining, setRemaining] = useState(() =>
    countdownRemaining(deadline, Date.now()),
  );
  useEffect(() => {
    if (deadline === null) return;
    const tick = () => {
      // Wall time keeps the clock accurate when a background tab is throttled.
      setRemaining(countdownRemaining(deadline, Date.now()));
    };
    const timer = window.setInterval(tick, 1000);
    document.addEventListener('visibilitychange', tick);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', tick);
    };
  }, [deadline]);

  return (
    <span
      className="hatch-clock"
      role="timer"
      aria-label="Time until containment reset"
      aria-live="off"
    >
      {formatCountdown(remaining)}
    </span>
  );
}

export default function HatchTerminal({
  prefill,
  deadline,
  onClose,
  onSound,
}: {
  prefill: string;
  deadline: number | null;
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
            <Countdown deadline={deadline} />
          </div>
          <div className="hatch-boot" aria-hidden="true">
            <span>LINK ESTABLISHED........................OK</span>
            <span>CONTAINMENT PROTOCOL...................ACTIVE</span>
          </div>
          <h2 id="hatch-terminal-heading">SYSTEM INITIALIZED</h2>
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
                <HatchSequenceInput
                  inputRef={inputRef}
                  prefill={prefill}
                  readOnly={accepted}
                  invalid={phase === 'error'}
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
                : '> AWAITING INPUT'}
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
        </div>
      </div>
    </dialog>
  );
}
