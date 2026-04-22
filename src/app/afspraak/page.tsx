import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { ExternalLinkIcon, MailIcon, PhoneIcon } from "@/components/ui/Icons";
import { getSettings } from "@/content/settings";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Afspraak maken — massage Aarschot",
  description:
    "Boek online een afspraak bij So'Relax massagetherapie in Aarschot. Kies je behandeling en tijdstip via de online agenda. Openingsuren, adres en annuleringsvoorwaarden.",
  alternates: { canonical: "/afspraak" },
};

export default function AfspraakPage() {
  const { openingHours, salonizedOpenWidgetUrl } = getSettings();
  const hasWidget = Boolean(salonizedOpenWidgetUrl);

  return (
    <>
      <Section>
        <Container width="prose">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent-primary)] font-medium">
            Reserveren
          </p>
          <h1 className="mt-3">Plan jouw afspraak</h1>
          <p className="mt-6 text-[var(--color-text-secondary)]">
            Boekingen lopen via onze online agenda. Je kiest daar zelf een
            behandeling en een tijdstip dat past. Twijfel je welke behandeling
            het beste bij je klachten past? Bel of mail gerust — ik help je
            graag verder.
          </p>

          {hasWidget ? (
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ButtonLink
                href={salonizedOpenWidgetUrl}
                variant="primary"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open online agenda
                <ExternalLinkIcon className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href={`tel:${siteConfig.contact.phoneTel}`}
                variant="secondary"
                size="lg"
              >
                <PhoneIcon className="h-4 w-4" />
                {siteConfig.contact.phone}
              </ButtonLink>
            </div>
          ) : (
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ButtonLink
                href={`tel:${siteConfig.contact.phoneTel}`}
                variant="primary"
                size="lg"
              >
                <PhoneIcon className="h-4 w-4" />
                {siteConfig.contact.phone}
              </ButtonLink>
              <ButtonLink
                href={`mailto:${siteConfig.contact.email}`}
                variant="secondary"
                size="lg"
              >
                <MailIcon className="h-4 w-4" />
                Mail mij
              </ButtonLink>
            </div>
          )}

          {hasWidget && (
            <p className="mt-4 text-xs text-[var(--color-text-secondary)]">
              De agenda opent in een nieuw venster. Lukt het boeken niet? Bel{" "}
              <a href={`tel:${siteConfig.contact.phoneTel}`} className="text-[var(--color-accent-primary)]">
                {siteConfig.contact.phone}
              </a>{" "}
              of mail{" "}
              <a href={`mailto:${siteConfig.contact.email}`} className="text-[var(--color-accent-primary)]">
                {siteConfig.contact.email}
              </a>
              .
            </p>
          )}
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent-primary)] font-medium">
                Praktisch
              </p>
              <h2 className="mt-3 text-[1.5rem]">Waar vind je me</h2>
              <p className="mt-4 text-[var(--color-text-primary)]">
                {siteConfig.contact.street}
                <br />
                {siteConfig.contact.postalCode} {siteConfig.contact.city}
              </p>
              <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
                Gratis parking voor de deur.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent-primary)] font-medium">
                Openingsuren
              </p>
              <h2 className="mt-3 text-[1.5rem]">Wanneer je terecht kan</h2>
              <ul className="mt-4 space-y-1.5 text-[15px]">
                {openingHours.map((row) => (
                  <li key={row.day} className="flex items-baseline justify-between gap-4 text-[var(--color-text-primary)]">
                    <span>{row.day}</span>
                    <span className="text-[var(--color-text-secondary)] text-[13px]">{row.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent-primary)] font-medium">
                Belangrijk
              </p>
              <h2 className="mt-3 text-[1.5rem]">Annuleringsbeleid</h2>
              <p className="mt-4 text-[var(--color-text-primary)]">
                Verhinderd? Annuleer je afspraak minstens <strong>24 uur op voorhand</strong>.
                Bij een latere annulering wordt 50% van het bedrag aangerekend, bij
                niet-opdagen het volledige bedrag.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
