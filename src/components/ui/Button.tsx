import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "warm" | "onDark";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-[var(--radius-sm)] no-underline transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2";

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

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

type LinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href"> & {
    href: string;
  };

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  href,
  children,
  ...rest
}: LinkProps) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  const isExternal = /^https?:/.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
  if (isExternal) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
