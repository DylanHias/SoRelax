import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLElement> & {
  as?: "div" | "article" | "li";
};

export function Card({ as: Tag = "div", className = "", ...rest }: Props) {
  const Component = Tag as "div";
  return (
    <Component
      className={`bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] p-6 sm:p-8 ${className}`}
      {...rest}
    />
  );
}
