import type { ReactNode } from "react";

type Props = {
  summary: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
};

export function Accordion({ summary, children, defaultOpen = false, className = "" }: Props) {
  return (
    <details
      open={defaultOpen}
      className={`group bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] overflow-hidden ${className}`}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 sm:p-7 font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-bg)] focus-visible:outline-2 focus-visible:outline-offset-[-2px]">
        <span className="flex-1">{summary}</span>
        <svg
          aria-hidden="true"
          className="h-5 w-5 flex-none text-[var(--color-text-secondary)] transition-transform duration-200 group-open:rotate-45"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </summary>
      <div className="px-6 pb-7 pt-1 sm:px-7 text-[var(--color-text-secondary)] space-y-4 border-t border-[var(--color-border)]">
        {children}
      </div>
    </details>
  );
}
