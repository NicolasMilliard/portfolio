import { useEffect, useRef, useState } from 'react';

import { DrawnUnderline, PawPrint } from './SketchMarks';

export function Companions() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLImageElement>(null);
  const isVisible = hasEntered && isReady;

  useEffect(() => {
    if (artRef.current?.complete && artRef.current.naturalWidth > 0)
      setIsReady(true);
    const scene = sceneRef.current;
    if (!scene || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setHasEntered(true);
        observer.disconnect();
      },
      { threshold: 0.25 },
    );
    observer.observe(scene);
    return () => observer.disconnect();
  }, []);

  const arrive = () => {
    setHasEntered(true);
    if (
      !isVisible ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    for (const animation of stageRef.current?.getAnimations({
      subtree: true,
    }) ?? []) {
      animation.currentTime = 0;
      animation.play();
    }
  };

  return (
    <div className="companions" ref={sceneRef} data-open={isVisible}>
      <div className="companions-invitation">
        <button
          type="button"
          className="text-link companions-trigger"
          aria-controls="studio-assistants"
          onClick={arrive}
        >
          <PawPrint />
          Meet the studio assistants
          <DrawnUnderline />
        </button>
      </div>
      <div
        className="companions-stage"
        ref={stageRef}
        id="studio-assistants"
        aria-hidden={!isVisible}
      >
        <div className="paw-trail" aria-hidden="true">
          <PawPrint />
          <PawPrint />
          <PawPrint />
        </div>
        <img
          className="companions-art"
          ref={artRef}
          src="/images/brand/companions-cutout.webp"
          srcSet="/images/brand/companions-small-cutout.webp 480w, /images/brand/companions-cutout.webp 960w"
          sizes="(max-width: 40rem) 90vw, 480px"
          width="960"
          height="720"
          alt="A watercolor puppy and two cats: one cat curled up on a scratching post, the other sitting beside the puppy."
          loading="lazy"
          decoding="async"
          onLoad={() => setIsReady(true)}
        />
      </div>
    </div>
  );
}
