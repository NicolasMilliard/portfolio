import { useEffect, useRef, useState } from 'react';

import { BoardingPass } from './BoardingPass';
import './clues.css';
import type { ClueKind } from './IslandClues';
import { LotteryTicket } from './LotteryTicket';
import type { Evidence } from './protocol';
import type { PlaySound } from './soundEffects';
import {
  OpenSuitcase,
  ShirtInspection,
  type SuitcaseItem,
} from './SuitcaseContents';
import { useIslandDialog } from './useIslandDialog';

type ClueDialogProps = {
  kind: ClueKind;
  onClose: () => void;
  onFind: (evidence: Evidence) => void;
  onSound: PlaySound;
};
type SuitcaseView = 'closed' | 'open' | 'shirt' | 'lottery';
const suitcaseTitles: Record<SuitcaseView, string> = {
  closed: 'Someone else’s baggage.',
  open: 'Someone left in a hurry.',
  shirt: 'A folded linen shirt.',
  lottery: 'A damaged lottery ticket.',
};

export default function ClueDialog({
  kind,
  onClose,
  onFind,
  onSound,
}: ClueDialogProps) {
  const dialogRef = useIslandDialog();
  const [view, setView] = useState<SuitcaseView>('closed');
  const shirtRef = useRef<HTMLButtonElement>(null);
  const paperRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnItemRef = useRef<SuitcaseItem>('shirt');
  const ticket = kind === 'ticket';
  const inspectingItem = view === 'shirt' || view === 'lottery';
  const caption = ticket
    ? 'Maybe these numbers are useful.'
    : view === 'lottery'
      ? 'Only two numbers survived.'
      : view === 'closed'
        ? 'Sand in the hinges. The latches still move.'
        : null;

  useEffect(() => {
    if (view === 'open') {
      const target = returnItemRef.current === 'shirt' ? shirtRef : paperRef;
      target.current?.focus({ preventScroll: true });
    } else if (view === 'shirt' || view === 'lottery') {
      closeRef.current?.focus({ preventScroll: true });
    }
  }, [view]);

  const inspectItem = (item: SuitcaseItem) => {
    returnItemRef.current = item;
    onSound(item === 'paper' ? 'paper' : 'baggage');
    if (item === 'paper') onFind('lottery');
    setView(item === 'paper' ? 'lottery' : 'shirt');
  };
  const returnToSuitcase = () => {
    onSound(view === 'lottery' ? 'paper' : 'baggage');
    setView('open');
  };
  const dismissInspection = () => {
    if (inspectingItem) returnToSuitcase();
    else dialogRef.current?.close();
  };

  return (
    <dialog
      ref={dialogRef}
      className="island-clue-dialog"
      aria-modal="true"
      aria-labelledby="island-clue-title"
      aria-describedby={caption ? 'island-clue-caption' : undefined}
      onClose={(event) => {
        if (!event.currentTarget.open) onClose();
      }}
      onCancel={(event) => {
        event.preventDefault();
        dismissInspection();
      }}
      onClick={(event) => {
        if (
          event.target instanceof Element &&
          event.target.closest('[data-inspection-content], button, a')
        ) {
          return;
        }
        dismissInspection();
      }}
    >
      <article className="clue-inspection">
        <div className="clue-toolbar">
          <button
            ref={closeRef}
            type="button"
            onClick={dismissInspection}
            aria-label="Close inspection"
          >
            CLOSE
          </button>
        </div>
        <h2
          id="island-clue-title"
          className={view === 'shirt' ? 'visually-hidden' : undefined}
        >
          {ticket ? 'A one-way ticket.' : suitcaseTitles[view]}
        </h2>
        {ticket ? (
          <div className="clue-ticket-stage" data-inspection-content="">
            <BoardingPass />
          </div>
        ) : (
          <>
            {view === 'closed' && (
              <div className="clue-suitcase-stage">
                <button
                  type="button"
                  className="clue-suitcase-action"
                  aria-label="Open the suitcase"
                  aria-expanded={false}
                  onClick={() => {
                    onSound('latch');
                    setView('open');
                  }}
                >
                  <img
                    src="/images/lost/suitcase-closed-v2.png"
                    alt="A weathered leather suitcase with two tarnished brass latches."
                    decoding="async"
                  />
                  <span className="clue-case-hover-hint" aria-hidden="true">
                    Click to open
                  </span>
                </button>
              </div>
            )}
            {view === 'open' && (
              <OpenSuitcase
                shirtRef={shirtRef}
                paperRef={paperRef}
                onInspect={inspectItem}
              />
            )}
            {view === 'shirt' && <ShirtInspection />}
            {view === 'lottery' && (
              <div
                className="clue-case-contents"
                key="contents"
                data-revealed="true"
              >
                <LotteryTicket />
              </div>
            )}
          </>
        )}
        {caption && (
          <p id="island-clue-caption" className="clue-caption" role="status">
            {caption}
          </p>
        )}
      </article>
    </dialog>
  );
}
