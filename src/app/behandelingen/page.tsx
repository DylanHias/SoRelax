import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { BookingButton } from "@/components/BookingButton";
import { ArrowRightIcon, ExternalLinkIcon } from "@/components/ui/Icons";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { getTreatments, getTreatmentsByCategory, type Treatment } from "@/content/treatments";
import { serviceSchema } from "@/lib/schema";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = {
  title: "Behandelingen",
  description:
    "Therapeutische en ontspanningsmassages in Aarschot: rug- en nekmassage, voetreflexologie, deep tissue, cupping, lymfedrainage, hotstone, Zweeds, Balinees.",
  alternates: { canonical: "/behandelingen" },
};

export default function BehandelingenPage() {
  const therapeutic = getTreatmentsByCategory("therapeutic");
  const relaxation = getTreatmentsByCategory("relaxation");
  const serviceSchemas = getTreatments().map(serviceSchema);

  return (
    <>
      <JsonLd data={serviceSchemas} />
      <Section>
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent-primary)] font-medium">
              Aanbod
            </p>
            <h1 className="mt-3">Behandelingen</h1>
            <p className="mt-6 text-[var(--color-text-secondary)]">
              Therapeutisch waar nodig, ontspannend waar gewenst. Twijfel je welke
              behandeling het beste bij jouw klachten past? Bel of mail me gerust —
              samen bekijken we wat het meest kan helpen.
            </p>
          </div>

          <TreatmentGroup
            eyebrow="Therapeutisch"
            heading="Therapeutische massages"
            description="Gerichte behandelingen voor specifieke klachten — vaak in combinatie met pijncoaching."
            items={therapeutic}
          />

          <TreatmentGroup
            eyebrow="Ontspanning"
            heading="Ontspannings­massages"
            description="Voor wie écht tot rust wil komen en opnieuw in balans wil raken."
            items={relaxation}
            className="mt-20"
          />

          <div className="mt-16 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent-primary)] font-medium">
                  Extra
                </p>
                <h2 className="mt-3 text-[1.5rem]">Pijnklachten? Zoek op pijngids.nl</h2>
                <p className="mt-4 text-[var(--color-text-secondary)]">
                  Een gratis symptoomchecker met informatie over meer dan honderd
                  spieren. Handig om samen met je therapeut in kaart te brengen welke
                  spieren mogelijk aan je klachten bijdragen.
                </p>
              </div>
              <a
                href="https://www.pijngids.nl/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] px-5 py-3 text-sm font-medium text-[var(--color-accent-primary)] no-underline hover:border-[var(--color-accent-primary)]"
              >
                Open pijngids.nl
                <ExternalLinkIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}

type GroupProps = {
  eyebrow: string;
  heading: string;
  description: string;
  items: Treatment[];
  className?: string;
};

function TreatmentGroup({ eyebrow, heading, description, items, className = "" }: GroupProps) {
  return (
    <div className={`mt-14 ${className}`}>
      <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent-primary)] font-medium">
        {eyebrow}
      </p>
      <h2 className="mt-3">{heading}</h2>
      <p className="mt-4 max-w-2xl text-[var(--color-text-secondary)]">{description}</p>

      <ul className="mt-8 space-y-4">
        {items.map((t) => (
          <li key={t.id} id={t.id} className="scroll-mt-24">
            <Accordion
              summary={
                <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="text-[var(--color-text-primary)]">{t.name}</span>
                  <span className="text-sm font-normal text-[var(--color-text-secondary)]">
                    {formatPrice(t.priceAmount, t.priceType)} · {t.duration}
                  </span>
                </span>
              }
            >
              <p className="pt-4 text-[var(--color-text-primary)]">{t.shortDescription}</p>
              {t.longDescription && (
                <p className="text-[var(--color-text-secondary)]">{t.longDescription}</p>
              )}
              {t.indications.length > 0 && (
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent-primary)] font-medium">
                    Goed voor
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {t.indications.map((ind) => (
                      <li
                        key={ind}
                        className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-1 text-xs text-[var(--color-text-primary)]"
                      >
                        {ind}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="pt-2">
                <BookingButton variant="primary" href={t.salonizedLink || undefined}>
                  Boek nu
                  <ArrowRightIcon className="h-4 w-4" />
                </BookingButton>
              </div>
            </Accordion>
          </li>
        ))}
      </ul>
    </div>
  );
}
