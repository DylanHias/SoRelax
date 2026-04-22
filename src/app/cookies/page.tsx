import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CookiePreferencesButton } from "@/components/CookiePreferencesButton";

export const metadata: Metadata = {
  title: "Cookiebeleid",
  description: "Cookiebeleid van So'Relax massagetherapie.",
  alternates: { canonical: "/cookies" },
};

const LAST_UPDATED = "april 2026";

export default function CookiesPage() {
  return (
    <Section>
      <Container width="prose">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent-primary)] font-medium">
          Juridisch
        </p>
        <h1 className="mt-3">Cookiebeleid</h1>
        <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
          Laatst bijgewerkt: {LAST_UPDATED}
        </p>

        <div className="mt-10 space-y-6 text-[var(--color-text-primary)]">
          <section>
            <h2>Wat zijn cookies?</h2>
            <p>
              Cookies zijn kleine tekstbestanden die door een website op je
              toestel worden geplaatst. Daarnaast kunnen sites ook gebruik
              maken van vergelijkbare technieken zoals <em>localStorage</em>.
              Samen noemen we dit hier &ldquo;cookies&rdquo;.
            </p>
          </section>

          <section>
            <h2>Welke cookies gebruiken wij?</h2>
            <p>Op deze website gebruiken wij enkel de volgende categorieën:</p>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-border)] text-left">
                    <th className="py-2 pr-4 font-medium">Naam</th>
                    <th className="py-2 pr-4 font-medium">Categorie</th>
                    <th className="py-2 pr-4 font-medium">Doel</th>
                    <th className="py-2 font-medium">Bewaartermijn</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--color-text-secondary)]">
                  <tr className="border-b border-[var(--color-border)] align-top">
                    <td className="py-3 pr-4 font-mono text-[13px] text-[var(--color-text-primary)]">
                      sorelax-consent
                    </td>
                    <td className="py-3 pr-4">Noodzakelijk</td>
                    <td className="py-3 pr-4">
                      Onthoudt jouw keuze in de cookiebanner.
                    </td>
                    <td className="py-3">
                      localStorage, blijft tot je het wist
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-6">
              Wij gebruiken <strong>Cloudflare Web Analytics</strong> om
              algemene bezoekersstatistieken te verzamelen. Deze dienst werkt{" "}
              <em>zonder cookies</em> en zonder persoonlijke gegevens te
              bewaren, en valt daarom buiten de toestemmingsplicht.
            </p>

            <p className="mt-4">
              Wij plaatsen geen marketing- of advertentiecookies. De
              categorieën &ldquo;Analyse&rdquo; en &ldquo;Marketing&rdquo; in
              de cookiebanner zijn voorzien voor eventuele toekomstige
              toepassingen en staan standaard uit.
            </p>
          </section>

          <section>
            <h2>Externe diensten</h2>
            <p>
              Wanneer je op een knop klikt om online te reserveren of een
              cadeaubon te kopen, word je doorgestuurd naar{" "}
              <strong>Salonized</strong> (een aparte website). Salonized heeft
              zijn eigen cookie- en privacybeleid. Wij laden geen
              Salonized-scripts op deze site zelf.
            </p>
            <p className="mt-3">
              Op de contactpagina kan je ervoor kiezen om een interactieve
              Google Maps-kaart te laden. Die laadt pas nadat je daar
              uitdrukkelijk op klikt, en Google kan dan cookies plaatsen
              volgens zijn eigen beleid.
            </p>
          </section>

          <section>
            <h2>Jouw voorkeuren beheren</h2>
            <p>
              Je kan je cookievoorkeuren op elk moment aanpassen via de knop
              hieronder. Je kan cookies ook weigeren of verwijderen via de
              instellingen van je browser.
            </p>
            <div className="mt-4">
              <CookiePreferencesButton />
            </div>
          </section>

          <section>
            <h2>Meer informatie</h2>
            <p>
              Zie ook ons{" "}
              <Link href="/privacy">privacybeleid</Link> voor hoe wij omgaan
              met persoonsgegevens.
            </p>
          </section>
        </div>
      </Container>
    </Section>
  );
}
