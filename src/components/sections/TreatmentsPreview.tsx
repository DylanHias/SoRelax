import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { getTreatmentsByCategory } from "@/content/treatments";
import { formatPrice } from "@/lib/format";

export function TreatmentsPreview() {
  const therapeutic = getTreatmentsByCategory("therapeutic");
  const relaxation = getTreatmentsByCategory("relaxation");

  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent-primary)] font-medium">
              Aanbod
            </p>
            <h2 className="mt-3">Behandelingen</h2>
            <p className="mt-5 text-[var(--color-text-secondary)]">
              Therapeutisch waar nodig, ontspannend waar gewenst. Elke sessie wordt
              afgestemd op jouw klachten en doel.
            </p>
          </div>
          <Link
            href="/behandelingen"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent-primary)] no-underline"
          >
            Bekijk alle behandelingen
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <TreatmentColumn
            label="Therapeutisch"
            description="Voor klachten die om een gerichte aanpak vragen."
            items={therapeutic}
          />
          <TreatmentColumn
            label="Ontspanning"
            description="Voor wie écht tot rust wil komen."
            items={relaxation}
          />
        </div>
      </Container>
    </Section>
  );
}

type ColumnProps = {
  label: string;
  description: string;
  items: ReturnType<typeof getTreatmentsByCategory>;
};

function TreatmentColumn({ label, description, items }: ColumnProps) {
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-7 sm:p-8">
      <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent-primary)] font-medium">
        {label}
      </p>
      <p className="mt-2 text-[var(--color-text-secondary)]">{description}</p>
      <ul className="mt-6 divide-y divide-[var(--color-border)]">
        {items.map((t) => (
          <li
            key={t.id}
            className="flex items-baseline justify-between gap-4 py-3.5 first:pt-0 last:pb-0"
          >
            <Link
              href={`/behandelingen#${t.id}`}
              className="text-[15px] font-medium text-[var(--color-text-primary)] no-underline hover:text-[var(--color-accent-primary)]"
            >
              {t.name}
            </Link>
            <span className="text-sm text-[var(--color-text-secondary)] whitespace-nowrap">
              {formatPrice(t.priceAmount, t.priceType)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
