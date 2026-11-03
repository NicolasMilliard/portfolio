import { BoardingPass } from './BoardingPass';
import './clues.css';

export type ClueKind = 'ticket' | 'suitcase';

export function IslandClues({
  onInspect,
}: {
  onInspect: (kind: ClueKind, trigger: HTMLButtonElement) => void;
}) {
  return (
    <div className="island-clues">
      <button
        type="button"
        className="island-clue island-clue-ticket"
        aria-label="Inspect the washed-up boarding pass"
        aria-haspopup="dialog"
        onClick={(event) => onInspect('ticket', event.currentTarget)}
      >
        <span aria-hidden="true">
          <BoardingPass compact />
        </span>
      </button>
      <button
        type="button"
        className="island-clue island-clue-suitcase"
        aria-label="Inspect the abandoned suitcase"
        aria-haspopup="dialog"
        onClick={(event) => onInspect('suitcase', event.currentTarget)}
      >
        <img
          src="/images/lost/suitcase-preview-v2.png"
          width={480}
          height={320}
          alt=""
          decoding="async"
        />
      </button>
    </div>
  );
}
