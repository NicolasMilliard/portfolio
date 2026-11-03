import type { Ref } from 'react';

import './phone.css';

export function IslandPhone({
  triggerRef,
  onConnect,
  hasSequence,
}: {
  triggerRef: Ref<HTMLButtonElement>;
  onConnect: (trigger: HTMLButtonElement) => void;
  hasSequence: boolean;
}) {
  return (
    <button
      ref={triggerRef}
      type="button"
      className="island-phone"
      aria-label="Use the satellite phone to enter the sequence"
      aria-haspopup="dialog"
      data-awake={hasSequence}
      onClick={(event) => onConnect(event.currentTarget)}
    >
      <img
        src="/images/lost/satellite-phone-v1.png"
        width={400}
        height={600}
        alt=""
        decoding="async"
        draggable={false}
      />
      <span className="island-phone-hint" aria-hidden="true">
        <svg viewBox="0 0 20 20" fill="none">
          <path d="m4 5 5 5-5 5m7 0h5" />
        </svg>
        <span>Enter sequence</span>
      </span>
    </button>
  );
}
