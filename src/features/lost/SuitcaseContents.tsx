import type { Ref } from 'react';

import type { SuitcaseItem } from './protocol';

const openSuitcaseImage = '/images/lost/suitcase-open-v2.webp';

export function OpenSuitcase({
  shirtRef,
  paperRef,
  onInspect,
}: {
  shirtRef: Ref<HTMLButtonElement>;
  paperRef: Ref<HTMLButtonElement>;
  onInspect: (item: SuitcaseItem) => void;
}) {
  return (
    <div className="clue-suitcase-stage" data-open="true" data-inspection-content="">
      <img
        src={openSuitcaseImage}
        width={1000}
        height={665}
        alt="The open suitcase holds a folded linen shirt and a folded paper."
        decoding="async"
        draggable={false}
      />
      <button
        type="button"
        className="clue-case-item-hotspot clue-case-shirt"
        ref={shirtRef}
        aria-label="Inspect the folded shirt"
        onClick={() => onInspect('shirt')}
      />
      <button
        type="button"
        className="clue-case-item-hotspot clue-case-paper"
        ref={paperRef}
        aria-label="Inspect the folded paper"
        onClick={() => onInspect('paper')}
      />
    </div>
  );
}

export function ShirtInspection() {
  return (
    <div className="clue-shirt-stage">
      <img
        data-inspection-content=""
        src="/images/lost/folded-shirt-v1-1000.webp"
        srcSet="/images/lost/folded-shirt-v1-600.webp 600w, /images/lost/folded-shirt-v1-1000.webp 1000w"
        sizes="(max-width: 640px) calc(100vw - 32px), 620px"
        width={1000}
        height={666}
        alt="A worn folded linen shirt with an open collar and ivory buttons."
        decoding="async"
        draggable={false}
      />
    </div>
  );
}
