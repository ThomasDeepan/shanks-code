import React, { useEffect, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';
import Button from '@/components/ui/Button';

/**
 * ConfirmDialog
 * Explicit confirmation gate for destructive admin actions.
 *
 * Nothing is deleted from the interface without passing through this dialog,
 * which names the record being removed and requires a deliberate click on
 * "Confirm". Escape and backdrop clicks cancel, and focus moves to the dialog
 * on open.
 */

export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  /** Name of the record being removed, echoed back to the user. */
  subject?: string;
  confirmLabel?: string;
  isWorking?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  message,
  subject,
  confirmLabel = 'Confirm delete',
  isWorking = false,
  onConfirm,
  onCancel,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    panelRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isWorking) {
        onCancel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, isWorking, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#0F1930]/55"
        onClick={() => !isWorking && onCancel()}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-message"
        tabIndex={-1}
        className="relative w-full max-w-md rounded-xl border border-[#D3DAE6] bg-white p-6 shadow-elevated"
      >
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#D9A62B]/50 bg-[#FDF3D9]">
            <AlertTriangle className="h-5 w-5 text-[#6E4F06]" aria-hidden="true" />
          </span>

          <div className="min-w-0">
            <h2 id="confirm-dialog-title" className="text-base font-bold tracking-tight text-[#1B2A4A]">
              {title}
            </h2>
            <p id="confirm-dialog-message" className="mt-1.5 text-sm leading-relaxed text-[#5F5A50]">
              {message}
            </p>

            {subject && (
              <p className="mt-2 break-words rounded-md border border-[#D3DAE6] bg-[#EEF1F6] px-2.5 py-1.5 font-mono text-xs text-[#1B2A4A]">
                {subject}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
          <Button variant="outline" size="md" onClick={onCancel} disabled={isWorking}>
            Cancel
          </Button>
          <Button variant="danger" size="md" onClick={onConfirm} isLoading={isWorking}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
