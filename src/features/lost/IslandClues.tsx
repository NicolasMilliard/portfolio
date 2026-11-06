import { BoardingPass } from './BoardingPass';
import './styles/clues.css';

export type ClueKind = 'ticket' | 'suitcase' | 'wheelchair' | 'can';

export function IslandClues({
  onInspect,
}: {
  onInspect: (kind: ClueKind, trigger: HTMLButtonElement) => void;
}) {
  return (
    <div className="island-clues">
      <button
        type="button"
        tabIndex={-1}
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
        tabIndex={-1}
        className="island-clue island-clue-suitcase"
        aria-label="Inspect the abandoned suitcase"
        aria-haspopup="dialog"
        onClick={(event) => onInspect('suitcase', event.currentTarget)}
      >
        <img
          src="/images/lost/suitcase-preview-v2.webp"
          width={480}
          height={320}
          alt=""
          decoding="async"
        />
      </button>
      <span className="island-suitcase-cover" aria-hidden="true" />
      <span className="island-ticket-cover" aria-hidden="true" />
      <div className="island-prop island-wheelchair">
        <img
          className="island-cutout"
          src="/images/lost/wheelchair-v1-480.webp"
          srcSet="/images/lost/wheelchair-v1-240.webp 240w, /images/lost/wheelchair-v1-480.webp 480w"
          sizes="(max-width: 640px) 25vw, 13vw"
          width={1199}
          height={1312}
          alt=""
          decoding="async"
        />
        <button
          type="button"
          tabIndex={-1}
          className="island-prop-control"
          aria-label="Inspect the abandoned wheelchair"
          aria-haspopup="dialog"
          onClick={(event) => onInspect('wheelchair', event.currentTarget)}
        />
      </div>
      <div className="island-prop island-food-can">
        <img
          className="island-cutout"
          src="/images/lost/dharma-can-v1-160.webp"
          width={1086}
          height={1448}
          alt=""
          decoding="async"
        />
        <button
          type="button"
          tabIndex={-1}
          className="island-prop-control"
          aria-label="Inspect the Dharma food can"
          aria-haspopup="dialog"
          onClick={(event) => onInspect('can', event.currentTarget)}
        />
      </div>
    </div>
  );
}
