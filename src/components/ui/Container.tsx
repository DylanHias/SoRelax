import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  width?: "default" | "prose";
};

export function Container({ width = "default", className = "", ...rest }: Props) {
  const max = width === "prose" ? "max-w-[var(--prose-max)]" : "max-w-[var(--container-max)]";
  return (
    <div className={`mx-auto w-full px-6 sm:px-8 ${max} ${className}`} {...rest} />
  );
}
