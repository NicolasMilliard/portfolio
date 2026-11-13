import { useEffect, useRef, type RefObject, type SyntheticEvent } from 'react';

type IslandDialogOptions = {
  onClose: () => void;
  // Nested inspections step back before dismissing the modal itself.
  onDismiss?: () => void;
  initialFocusRef?: RefObject<HTMLElement | null>;
};

export function useIslandDialog({
  onClose,
  onDismiss,
  initialFocusRef,
}: IslandDialogOptions) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    initialFocusRef?.current?.focus({ preventScroll: true });
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [initialFocusRef]);

  const close = () => dialogRef.current?.close();
  const dismiss = () => {
    if (onDismiss) onDismiss();
    else close();
  };

  return {
    close,
    dismiss,
    props: {
      ref: dialogRef,
      'aria-modal': true,
      onClose: (event: SyntheticEvent<HTMLDialogElement>) => {
        // StrictMode's cleanup can queue a close event before reopening.
        if (!event.currentTarget.open) onClose();
      },
      onCancel: (event: SyntheticEvent<HTMLDialogElement>) => {
        event.preventDefault();
        dismiss();
      },
    },
  };
}

export type IslandDialog = ReturnType<typeof useIslandDialog>;
