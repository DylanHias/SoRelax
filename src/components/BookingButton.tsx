import type { ReactNode } from "react";
import { getSettings } from "@/content/settings";

type Variant = "primary" | "secondary" | "warm" | "onDark";
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
  onDark:
    "bg-white text-[var(--color-accent-primary)] hover:bg-[var(--color-bg)]",
};

type Props = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /**
   * Optional Salonized widget URL for a specific service. Falls back to the
   * default widget URL from the CMS when empty.
   */
  href?: string;
};

export function BookingButton({
  variant = "primary",
  size = "md",
  className = "",
  children,
  href,
}: Props) {
  const candidate = href?.trim();
  const isAbsolute = candidate ? /^https?:\/\//.test(candidate) : false;
  const target = isAbsolute ? candidate! : getSettings().salonizedOpenWidgetUrl;
  return (
    <a
      href={target}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
