"use client";

import { useEffect, useRef, useState } from "react";
import { CloseIcon } from "@/components/ui/Icons";

export const OPEN_BOOKING_EVENT = "sorelax:open-booking";

export function openBooking() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_BOOKING_EVENT));
}

type Props = {
  src: string;
};

export function BookingDialog({ src }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;

    function handleOpen() {
      setHasMounted(true);
      if (!el!.open) el!.showModal();
    }

    function handleClose() {
      // Reset body overflow that some browsers leave locked
      document.body.style.removeProperty("overflow");
    }

    function handleBackdropClick(event: MouseEvent) {
      if (event.target === el) el!.close();
    }

    window.addEventListener(OPEN_BOOKING_EVENT, handleOpen);
    el.addEventListener("close", handleClose);
    el.addEventListener("click", handleBackdropClick);
    return () => {
      window.removeEventListener(OPEN_BOOKING_EVENT, handleOpen);
      el.removeEventListener("close", handleClose);
      el.removeEventListener("click", handleBackdropClick);
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="booking-dialog-title"
      className="booking-dialog m-0 h-full max-h-full w-full max-w-full border-0 bg-transparent p-0 sm:h-auto sm:max-h-[92vh] sm:w-[min(960px,94vw)] sm:max-w-none sm:mt-[4vh] sm:mx-auto sm:rounded-[var(--radius-md)]"
    >
      <div className="flex h-full flex-col overflow-hidden bg-[var(--color-surface)] sm:h-[min(820px,92vh)] sm:rounded-[var(--radius-md)] sm:border sm:border-[var(--color-border)]">
        <header className="flex items-center justify-between gap-4 border-b border-[var(--color-border)] px-5 py-4">
          <h2
            id="booking-dialog-title"
            className="font-serif text-lg text-[var(--color-text-primary)]"
          >
            Afspraak maken
          </h2>
          <form method="dialog" className="m-0">
            <button
              type="submit"
              aria-label="Sluiten"
              className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)]"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </form>
        </header>
        <div className="flex-1 bg-[var(--color-bg)]">
          {hasMounted ? (
            <iframe
              title="So'Relax online agenda"
              src={src}
              className="block h-full w-full border-0"
              allow="payment *; clipboard-write"
            />
          ) : null}
        </div>
      </div>
    </dialog>
  );
}
