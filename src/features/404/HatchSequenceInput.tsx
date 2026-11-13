import { useLayoutEffect, useRef, type RefObject } from 'react';

type HatchSequenceInputProps = {
  inputRef: RefObject<HTMLInputElement | null>;
  prefill: string;
  readOnly: boolean;
  invalid: boolean;
};

export function HatchSequenceInput({
  inputRef,
  prefill,
  readOnly,
  invalid,
}: HatchSequenceInputProps) {
  const measureRef = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const input = inputRef.current;
    const measure = measureRef.current;
    const caret = caretRef.current;
    if (!input || !measure || !caret) return;
    let frame = 0;
    let composing = false;

    const sync = () => {
      const position = input.selectionStart ?? 0;
      measure.textContent = input.value.slice(0, position);
      const padding = Number.parseFloat(getComputedStyle(input).paddingLeft);
      const left = padding + measure.getBoundingClientRect().width - input.scrollLeft;
      caret.style.left = `${left}px`;
      caret.hidden =
        document.activeElement !== input ||
        input.readOnly ||
        composing ||
        position !== input.selectionEnd;
    };
    const update = () => {
      sync();
      // Like a native caret, stay visible immediately after an edit or movement.
      for (const animation of caret.getAnimations()) animation.currentTime = 0;
      window.cancelAnimationFrame(frame);
      // Native inputs can adjust horizontal scrolling after the input event.
      // oxlint-disable-next-line react/immutability -- This animation handle is local to the effect.
      frame = window.requestAnimationFrame(sync);
    };
    const startComposition = () => {
      composing = true;
      update();
    };
    const endComposition = () => {
      composing = false;
      update();
    };
    const events = ['input', 'select', 'scroll', 'focus', 'blur', 'click', 'keyup'] as const;
    for (const event of events) input.addEventListener(event, update);
    input.addEventListener('compositionstart', startComposition);
    input.addEventListener('compositionend', endComposition);
    document.addEventListener('selectionchange', update);
    const observer = new ResizeObserver(update);
    observer.observe(input);
    update();

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      for (const event of events) input.removeEventListener(event, update);
      input.removeEventListener('compositionstart', startComposition);
      input.removeEventListener('compositionend', endComposition);
      document.removeEventListener('selectionchange', update);
    };
  }, [inputRef, readOnly]);

  return (
    <div className="hatch-input-field">
      <input
        ref={inputRef}
        id="hatch-sequence"
        name="sequence"
        type="text"
        inputMode="numeric"
        spellCheck={false}
        autoCapitalize="off"
        maxLength={64}
        defaultValue={prefill}
        readOnly={readOnly}
        aria-invalid={invalid}
        aria-describedby="hatch-response"
      />
      <span ref={measureRef} className="hatch-input-measure" aria-hidden="true" />
      <span
        ref={caretRef}
        className="hatch-input-caret hatch-cursor"
        aria-hidden="true"
        hidden
      >
        _
      </span>
    </div>
  );
}
