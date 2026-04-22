"use client";

import type { MouseEvent, ReactNode } from "react";
import { openBooking } from "@/components/BookingDialog";

type Variant = "primary" | "secondary" | "warm" | "floating" | "onDark";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-[var(--radius-sm)] no-underline transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer";

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-[15px]",
  lg: "px-6 py-3.5 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-accent-primary)] text-white hover:bg-[var(--color-accent-primary-hover)]",
  secondary:
    "bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border)] hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)]",
  warm:
    "bg-[var(--color-accent-warm)] text-white hover:bg-[var(--color-accent-warm-hover)]",
  floating:
    "bg-[var(--color-accent-primary)] text-white hover:bg-[var(--color-accent-primary-hover)] shadow-[0_6px_20px_rgba(219,124,38,0.28)] px-5 py-3 text-sm",
  onDark:
    "bg-white text-[var(--color-accent-primary)] hover:bg-[var(--color-bg)]",
};

type Props = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  tabIndex?: number;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export function BookingButton({
  variant = "primary",
  size = "md",
  className = "",
  children,
  tabIndex,
  onClick,
}: Props) {
  const sizeClass = variant === "floating" ? "" : sizes[size];
  return (
    <button
      type="button"
      tabIndex={tabIndex}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) openBooking();
      }}
      className={`${base} ${sizeClass} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
