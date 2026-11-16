import { useLayoutEffect } from "react";
import type { RefObject } from "react";

import { isKeyboardInput } from "../interactionMotion";

// Keep discoveries across client-side route changes, including interrupted draws.
const revealedSketches = new Set<string>();

export function useSketchbook(rootRef: RefObject<HTMLDivElement | null>) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!root || !("IntersectionObserver" in window)) {
      return;
    }

    root.dataset.sketchbook = "ready";
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }
          const element = entry.target as HTMLElement | SVGElement;
          element.dataset.inked =
            motion.matches || isKeyboardInput() ? "seen" : "true";
          const key = element.dataset.sketchKey;
          if (key) {
            revealedSketches.add(key);
          }
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -24px 0px" }
    );

    root
      .querySelectorAll<HTMLElement | SVGElement>("[data-sketch-key]")
      .forEach((element) => {
        if (revealedSketches.has(element.dataset.sketchKey ?? "")) {
          element.dataset.inked = "seen";
        } else {
          observer.observe(element);
        }
      });

    const finishActiveDrawings = () => {
      if (!isKeyboardInput() && !motion.matches) {
        return;
      }
      root
        .querySelectorAll<HTMLElement | SVGElement>('[data-inked="true"]')
        .forEach((element) => {
          element.dataset.inked = "seen";
        });
    };
    document.addEventListener("keydown", finishActiveDrawings);
    motion.addEventListener("change", finishActiveDrawings);
    return () => {
      observer.disconnect();
      document.removeEventListener("keydown", finishActiveDrawings);
      motion.removeEventListener("change", finishActiveDrawings);
      delete root.dataset.sketchbook;
    };
  }, [rootRef]);
}
