import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLElement> & {
  tone?: "default" | "surface" | "warm" | "dark";
};

const toneClass: Record<NonNullable<Props["tone"]>, string> = {
  default: "bg-[var(--color-bg)]",
  surface: "bg-[var(--color-surface)]",
  warm: "bg-[#F1ECE2]",
  dark: "bg-[var(--color-accent-primary)] text-white",
};

export function Section({ tone = "default", className = "", children, ...rest }: Props) {
  return (
    <section
      className={`py-[var(--section-y)] ${toneClass[tone]} ${className}`}
      {...rest}
    >
      {children}
    </section>
  );
}
