import type { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  label: string;
};

export function CredentialBadge({ icon, label }: Props) {
  return (
    <div className="flex items-center gap-3 text-[var(--color-text-primary)]">
      <span
        aria-hidden="true"
        className="flex h-10 w-10 flex-none items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border)] text-[var(--color-accent-primary)]"
      >
        {icon}
      </span>
      <span className="text-sm font-medium leading-tight">{label}</span>
    </div>
  );
}
