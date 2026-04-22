import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { MailIcon, PhoneIcon } from "@/components/ui/Icons";
import { getSettings } from "@/content/settings";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Afspraak maken",
  description:
    "Boek online een afspraak bij So'Relax massagetherapie in Aarschot. Kies je behandeling en tijdstip via onze online agenda.",
  alternates: { canonical: "/afspraak" },
};

export default function AfspraakPage() {
  const { openingHours, salonizedOpenWidgetUrl } = getSettings();
  const hasWidget = Boolean(salonizedOpenWidgetUrl);

  return (
    <>
      <Section>
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent-primary)] font-medium">
              Reserveren
            </p>
            <h1 className="mt-3">Plan jouw afspraak</h1>
            <p className="mt-6 text-[var(--color-text-secondary)]">
              Kies een behandeling en een tijdstip dat je past via de online agenda
              hieronder. Twijfel je welke behandeling het beste past bij je klachten?
              Bel of mail gerust — ik help je graag verder.
            </p>
          </div>

          {hasWidget ? (
            <div className="mt-10 overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)]">
              <iframe
                title="So'Relax online agenda"
                src={salonizedOpenWidgetUrl}
                loading="lazy"
                allow="payment *; clipboard-write"
                className="block h-[760px] w-full border-0 sm:h-[820px]"
              />
            </div>
          ) : (
            <div className="mt-10 flex min-h-[500px] w-full items-center justify-center rounded-[var(--radius-md)] border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center">
              <div className="max-w-md">
                <p className="font-serif text-xl text-[var(--color-text-primary)]">
                  Online agenda wordt binnenkort geactiveerd
                </p>
                <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
                  Tot zolang kan je rechtstreeks contact opnemen om een afspraak in
                  te plannen.
                </p>
                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <ButtonLink href={`tel:${siteConfig.contact.phoneTel}`} variant="primary">
                    <PhoneIcon className="h-4 w-4" />
                    {siteConfig.contact.phone}
                  </ButtonLink>
                  <ButtonLink href={`mailto:${siteConfig.contact.email}`} variant="secondary">
                    <MailIcon className="h-4 w-4" />
                    Mail mij
                  </ButtonLink>
                </div>
              </div>
            </div>
          )}

          {hasWidget && (
            <p className="mt-4 text-xs text-[var(--color-text-secondary)]">
              Lukt het boeken niet? Bel gerust{" "}
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
