import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon, ExternalLinkIcon, MailIcon } from "@/components/ui/Icons";
import { getSettings } from "@/content/settings";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cadeaubon",
  description:
    "Verras iemand met een cadeaubon van So'Relax. Twee jaar geldig, inwisselbaar voor elke behandeling naar keuze.",
  alternates: { canonical: "/cadeaubon" },
};

export default function CadeaubonPage() {
  const { salonizedGiftcardUrl } = getSettings();
  const hasGiftcardUrl = Boolean(salonizedGiftcardUrl);

  return (
    <>
      <Section>
        <Container width="prose">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent-primary)] font-medium">
            Geschenk
          </p>
          <h1 className="mt-3">Cadeaubon</h1>
          <p className="mt-6 text-lg text-[var(--color-text-secondary)]">
            Op zoek naar een persoonlijk cadeau? Schenk een moment van rust,
            verlichting of oprechte aandacht met een cadeaubon van So&rsquo;Relax.
          </p>

          <div className="mt-10 space-y-5 text-[var(--color-text-primary)]">
            <p>
              Een cadeaubon kan worden ingewisseld voor elke behandeling uit het
              aanbod. De ontvanger kiest zelf welke massage of behandeling hij of zij
              wenst en boekt een afspraak op een moment dat uitkomt.
            </p>
            <p>
              <strong>Geldigheid:</strong> twee jaar na datum van afgifte. De
              cadeaubon is niet inwisselbaar tegen geld. Gelieve bij betaling de
              cadeaubon voor te leggen.
            </p>
          </div>

          <div className="mt-10 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
            {hasGiftcardUrl ? (
              <>
                <h2 className="text-[1.5rem]">Bestel online</h2>
                <p className="mt-3 text-[var(--color-text-secondary)]">
                  Je ontvangt de cadeaubon direct per e-mail en kan deze meteen
                  printen of doorsturen.
                </p>
                <div className="mt-6">
                  <ButtonLink
                    href={salonizedGiftcardUrl}
                    variant="primary"
                    size="lg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Bestel een cadeaubon
                    <ExternalLinkIcon className="h-4 w-4" />
                  </ButtonLink>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-[1.5rem]">Cadeaubon bestellen</h2>
                <p className="mt-3 text-[var(--color-text-secondary)]">
                  Stuur mij een berichtje met het gewenste bedrag en de naam van de
                  ontvanger — je krijgt snel een antwoord met de verdere details.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <ButtonLink href={`mailto:${siteConfig.contact.email}?subject=Cadeaubon%20bestellen`} variant="primary" size="lg">
                    <MailIcon className="h-4 w-4" />
                    Stuur een bericht
                  </ButtonLink>
                  <ButtonLink href="/contact" variant="secondary" size="lg">
                    Naar contact
                    <ArrowRightIcon className="h-4 w-4" />
                  </ButtonLink>
                </div>
              </>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}
