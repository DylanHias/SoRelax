import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Privacybeleid",
  description: "Privacybeleid van So'Relax massagetherapie.",
  alternates: { canonical: "/privacy" },
};

const iubendaSiteId = process.env.NEXT_PUBLIC_IUBENDA_SITE_ID;

export default function PrivacyPage() {
  return (
    <Section>
      <Container width="prose">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent-primary)] font-medium">
          Juridisch
        </p>
        <h1 className="mt-3">Privacybeleid</h1>

        {iubendaSiteId ? (
          <div className="mt-10">
            <a
              href={`https://www.iubenda.com/privacy-policy/${iubendaSiteId}`}
              className="iubenda-white no-brand iubenda-noiframe iubenda-embed iub-body-embed text-[var(--color-accent-primary)]"
              title="Privacybeleid"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bekijk het volledige privacybeleid op iubenda
            </a>
            {/* iubenda embed script is loaded once credentials are configured (brief §9, §13). */}
          </div>
        ) : (
          <div className="mt-10 rounded-[var(--radius-md)] border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-8">
            <p className="text-[var(--color-text-primary)]">
              Het volledige privacybeleid wordt binnenkort via iubenda toegevoegd.
            </p>
            <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
              Voor vragen over de verwerking van je persoonsgegevens kan je
              rechtstreeks contact opnemen via{" "}
              <a href="mailto:info@sorelaxmassage.be" className="text-[var(--color-accent-primary)]">
                info@sorelaxmassage.be
              </a>
              .
            </p>
          </div>
        )}
      </Container>
    </Section>
  );
}
