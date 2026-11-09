import { useState } from 'react';

import { DrawnUnderline } from './ui/DrawUnderline';
import { PawPrint } from './ui/PawPrint';

export function Companions() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const isVisible = hasEntered && isReady;

  return (
    <div className="companions" data-open={isVisible}>
      <div className="companions-invitation">
        {!hasEntered && (
          <button
            type="button"
            className="text-link companions-trigger"
            aria-controls="studio-assistants"
            aria-expanded={isVisible}
            onClick={() => setHasEntered(true)}
          >
            <PawPrint />
            Meet the studio assistants
            <DrawnUnderline />
          </button>
        )}
      </div>
      <div
        className="companions-stage"
        id="studio-assistants"
        aria-hidden={!isVisible}
      >
        <div className="paw-trail" aria-hidden="true">
          <PawPrint />
          <PawPrint />
          <PawPrint />
        </div>
        {hasEntered && (
          <img
            className="companions-art"
            src="/images/brand/companions-cutout.webp"
            srcSet="/images/brand/companions-small-cutout.webp 480w, /images/brand/companions-medium-cutout.webp 768w, /images/brand/companions-cutout.webp 960w"
            sizes="(max-width: 33.333rem) 90vw, 480px"
            width="960"
            height="720"
            alt="A watercolor puppy and two cats: one cat curled up on a scratching post, the other sitting beside the puppy."
            loading="eager"
            decoding="async"
            onLoad={() => setIsReady(true)}
            onError={() => {
              setHasEntered(false);
              setIsReady(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
