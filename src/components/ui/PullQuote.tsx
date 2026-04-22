import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  cite?: string;
  align?: "left" | "center";
};

export function PullQuote({ children, cite, align = "left" }: Props) {
  return (
    <figure
      className={`my-16 max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <blockquote className="font-serif italic text-[var(--color-accent-primary)] text-[clamp(1.5rem,3vw,2.125rem)] leading-[1.35]">
        <span aria-hidden="true" className="mr-1">“</span>
        {children}
        <span aria-hidden="true" className="ml-1">”</span>
      </blockquote>
      {cite ? (
        <figcaption className="mt-4 text-sm text-[var(--color-text-secondary)] not-italic">
          — {cite}
        </figcaption>
      ) : null}
    </figure>
  );
}
