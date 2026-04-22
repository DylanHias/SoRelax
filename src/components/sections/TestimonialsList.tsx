import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { Testimonial } from "@/content/testimonials";

type Props = {
  items: Testimonial[];
  eyebrow?: string;
  heading?: string;
};

export function TestimonialsList({
  items,
  eyebrow = "Ervaringen",
  heading = "Onze tevreden klanten",
}: Props) {
  return (
    <Section tone="surface">
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent-primary)] font-medium">
            {eyebrow}
          </p>
          <h2 className="mt-3">{heading}</h2>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <li
              key={t.id}
              className="flex flex-col rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-7"
            >
              <span aria-hidden="true" className="font-serif text-4xl leading-none text-[var(--color-accent-warm)]">
                &ldquo;
              </span>
              <blockquote className="mt-2 text-[var(--color-text-primary)]">
                {t.body}
              </blockquote>
              <p className="mt-6 text-sm font-medium text-[var(--color-text-secondary)]">
                — {t.clientName}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
