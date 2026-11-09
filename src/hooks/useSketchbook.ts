import { useEffect, type RefObject } from 'react';

export function useSketchbook(rootRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!root || motion.matches || !('IntersectionObserver' in window)) return;

    root.dataset.sketchbook = 'ready';
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement | SVGElement).dataset.inked = 'true';
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -24px 0px' },
    );

    root
      .querySelectorAll('[data-sketch], [data-handwriting], [data-watercolor]')
      .forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      delete root.dataset.sketchbook;
    };
  }, [rootRef]);
}
