export const isKeyboardInput = () =>
  typeof document !== "undefined" &&
  document.documentElement.dataset.input === "keyboard";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Capture input before React handles an activation or starts a navigation.
export function trackInputModality() {
  const root = document.documentElement;
  const keyboard = (event: KeyboardEvent) => {
    if (["Alt", "Control", "Meta", "Shift"].includes(event.key)) {
      return;
    }
    root.dataset.input = "keyboard";
  };
  const pointer = () => {
    root.dataset.input = "pointer";
  };
  const pointerMove = (event: PointerEvent) => {
    if (event.pointerType === "mouse" && (event.movementX || event.movementY)) {
      pointer();
    }
  };
  const activation = (event: MouseEvent) => {
    // Assistive technology can activate controls without a keydown event.
    if (event.detail === 0) {
      root.dataset.input = "keyboard";
    }
  };

  const options = { capture: true };
  document.addEventListener("keydown", keyboard, options);
  document.addEventListener("pointerdown", pointer, options);
  document.addEventListener("pointermove", pointerMove, options);
  document.addEventListener("click", activation, options);

  return () => {
    document.removeEventListener("keydown", keyboard, options);
    document.removeEventListener("pointerdown", pointer, options);
    document.removeEventListener("pointermove", pointerMove, options);
    document.removeEventListener("click", activation, options);
  };
}
