import { useEffect, useRef, useState } from 'react';

import { InspectionDialog } from './InspectionDialog';
import { CLUE_NUMBERS, type ArtifactKind, type Evidence } from './protocol';
import type { PlaySound } from './soundEffects';
import './styles/artifacts.css';
import { useIslandDialog } from './useIslandDialog';

export default function ArtifactDialog({
  kind,
  onClose,
  onFind,
  onSound,
}: {
  kind: ArtifactKind;
  onClose: () => void;
  onFind: (evidence: Evidence) => void;
  onSound: PlaySound;
}) {
  const [detail, setDetail] = useState(false);
  const actionRef = useRef<HTMLButtonElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const returningRef = useRef(false);
  const chair = kind === 'wheelchair';
  const number = CLUE_NUMBERS[kind][0];
  const title = chair
    ? detail
      ? 'Beneath the seat.'
      : 'Someone walked away.'
    : detail
      ? 'The other side.'
      : 'Supplies from another time.';
  const caption = chair
    ? detail
      ? 'A worn stencil on the cross-brace.'
      : 'Dust in the upholstery. No tracks leading away.'
    : detail
      ? 'A mark pressed into the metal.'
      : 'The label has outlasted whoever left it here.';

  useEffect(() => {
    if (detail) backRef.current?.focus({ preventScroll: true });
    else if (returningRef.current)
      actionRef.current?.focus({ preventScroll: true });
  }, [detail]);

  const returnToObject = () => {
    onSound(chair ? 'frame' : 'metal');
    returningRef.current = true;
    setDetail(false);
  };
  const dialog = useIslandDialog({
    onClose,
    onDismiss: detail ? returnToObject : undefined,
  });

  return (
    <InspectionDialog
      dialog={dialog}
      labelledBy="artifact-title"
      describedBy="artifact-caption"
    >
      <article className="clue-inspection artifact-inspection">
        <div className="clue-toolbar">
          {detail && (
            <button
              ref={backRef}
              type="button"
              onClick={returnToObject}
              aria-label={chair ? 'Back to the wheelchair' : 'Back to the can'}
            >
              <span aria-hidden="true">←</span> BACK
            </button>
          )}
          <button
            type="button"
            onClick={dialog.close}
            aria-label="Close inspection"
          >
            CLOSE
          </button>
        </div>
        <h2 id="artifact-title">{title}</h2>
        <div
          key={detail ? 'detail' : 'object'}
          className="artifact-stage"
          data-inspection-content=""
        >
          {chair ? (
            detail ? (
              <figure
                className="artifact-frame-detail"
                role="img"
                aria-label={`The wheelchair's weathered metal cross-brace, stencilled with ${number}.`}
              >
                <img
                  src="/images/lost/wheelchair-v1-960.webp"
                  width={1199}
                  height={1312}
                  alt=""
                  draggable={false}
                />
                <span className="artifact-frame-number" aria-hidden="true">
                  {number}
                </span>
              </figure>
            ) : (
              <img
                className="artifact-chair"
                src="/images/lost/wheelchair-v1-960.webp"
                width={1199}
                height={1312}
                alt="An empty folding wheelchair with worn blue vinyl upholstery, dusty tyres and a tarnished tubular frame."
                decoding="async"
                draggable={false}
              />
            )
          ) : detail ? (
            <figure
              className="artifact-can-base"
              role="img"
              aria-label={`The underside of the Dharma can, stamped with ${number}.`}
            >
              <img
                src="/images/lost/dharma-can-base-v1-720.webp"
                width={1254}
                height={1254}
                alt=""
                decoding="async"
                draggable={false}
              />
              <span className="artifact-can-number" aria-hidden="true">
                {number}
              </span>
            </figure>
          ) : (
            <img
              className="artifact-can"
              src="/images/lost/dharma-can-v1-640.webp"
              width={1086}
              height={1448}
              alt="An old ribbed tin can with a stained Dharma Initiative label reading Chili with Beans."
              decoding="async"
              draggable={false}
            />
          )}
        </div>
        <p id="artifact-caption" className="clue-caption">
          {caption}
        </p>
        {!detail && (
          <button
            ref={actionRef}
            className="artifact-action"
            type="button"
            onClick={() => {
              onSound(chair ? 'frame' : 'metal');
              onFind(kind);
              setDetail(true);
            }}
          >
            {chair ? 'Examine the frame' : 'Turn the can over'}
            <span aria-hidden="true">↻</span>
          </button>
        )}
        <p className="visually-hidden" role="status" aria-atomic="true">
          {detail
            ? `${chair ? 'The cross-brace is marked' : 'The can base is stamped'} ${number}.`
            : ''}
        </p>
      </article>
    </InspectionDialog>
  );
}
