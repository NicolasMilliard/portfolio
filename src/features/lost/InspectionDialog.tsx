import type { ReactNode } from 'react';

import './styles/clues.css';
import type { IslandDialog } from './useIslandDialog';

export function InspectionDialog({
  dialog,
  labelledBy,
  describedBy,
  children,
}: {
  dialog: IslandDialog;
  labelledBy: string;
  describedBy?: string;
  children: ReactNode;
}) {
  return (
    <dialog
      {...dialog.props}
      className="island-clue-dialog"
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      onClick={(event) => {
        if (
          event.target instanceof Element &&
          event.target.closest('[data-inspection-content], button, a')
        ) {
          return;
        }
        dialog.dismiss();
      }}
    >
      {children}
    </dialog>
  );
}
