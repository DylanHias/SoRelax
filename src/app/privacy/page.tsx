import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacybeleid",
  description: "Privacybeleid van So'Relax massagetherapie.",
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "april 2026";

export default function PrivacyPage() {
  const { contact } = siteConfig;
  return (
    <Section>
      <Container width="prose">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent-primary)] font-medium">
          Juridisch
        </p>
        <h1 className="mt-3">Privacybeleid</h1>
        <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
          Laatst bijgewerkt: {LAST_UPDATED}
        </p>

        <div className="mt-10 space-y-6 text-[var(--color-text-primary)]">
          <section>
            <h2>1. Verantwoordelijke</h2>
            <p>
              So&rsquo;Relax, uitgebaat door Tanja, is verantwoordelijk voor de
              verwerking van je persoonsgegevens zoals beschreven in dit beleid.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-[var(--color-text-secondary)]">
              <li>
                Adres: {contact.street}, {contact.postalCode} {contact.city},{" "}
                {contact.country}
              </li>
              <li>
                E-mail:{" "}
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
              <li>
                Telefoon:{" "}
                <a href={`tel:${contact.phoneTel}`}>{contact.phone}</a>
              </li>
              <li>BTW: {contact.btw}</li>
            </ul>
          </section>

          <section>
            <h2>2. Welke gegevens verzamelen wij?</h2>
            <p>Afhankelijk van hoe je met ons in contact komt verwerken wij:</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>
                <strong>Contactformulier:</strong> naam, e-mailadres, eventueel
                telefoonnummer en de inhoud van je bericht.
              </li>
              <li>
                <strong>Reservering via Salonized:</strong> gegevens die je
                rechtstreeks aan Salonized bezorgt. Deze reservering verloopt
                op de Salonized-omgeving en niet op deze website. Raadpleeg
                daarvoor ook het privacybeleid van Salonized.
              </li>
              <li>
                <strong>Behandelingen in het kabinet:</strong> contactgegevens,
                gezondheidsinformatie die relevant is voor de massage of
                pijncoaching, en eventueel betalingsgegevens. Deze worden enkel
                bewaard voor zover noodzakelijk voor een veilige behandeling en
                de wettelijke bewaarplicht.
              </li>
              <li>
                <strong>Websitegebruik:</strong> geaggregeerde, cookieless
                statistieken via Cloudflare Web Analytics (geen persoonlijke
                identificatie, geen cookies).
              </li>
            </ul>
          </section>

          <section>
            <h2>3. Waarom verwerken wij deze gegevens?</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Om je vraag of aanvraag te beantwoorden.</li>
              <li>
                Om afspraken correct in te plannen, te bevestigen en op te
                volgen.
              </li>
              <li>
                Om een veilige en passende behandeling te kunnen geven (enkel
                voor daadwerkelijke cliënten).
              </li>
              <li>Om te voldoen aan wettelijke verplichtingen (bv. fiscale).</li>
              <li>Om de werking van de website te verbeteren.</li>
            </ul>
          </section>

          <section>
            <h2>4. Op welke basis?</h2>
            <p>
              Wij verwerken gegevens op basis van je toestemming (contact,
              nieuwsbrief indien van toepassing), de uitvoering van een
              overeenkomst (afspraak), een wettelijke verplichting (boekhouding)
              of ons gerechtvaardigd belang (beveiliging en verbetering van de
              site).
            </p>
          </section>

          <section>
            <h2>5. Met wie delen wij gegevens?</h2>
            <p>
              Wij verkopen je gegevens niet. Wij doen enkel beroep op zorgvuldig
              gekozen verwerkers:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>
                <strong>Salonized</strong> — online boekingssysteem en, indien
                van toepassing, cadeaubonnen.
              </li>
              <li>
                <strong>Cloudflare</strong> — hosting en cookieless
                bezoekersstatistieken.
              </li>
              <li>
                <strong>Resend</strong> — verzending van het contactformulier
                naar ons e-mailadres.
              </li>
              <li>
                <strong>TinaCMS</strong> — beheer van de inhoud van de website.
              </li>
            </ul>
          </section>

          <section>
            <h2>6. Hoe lang bewaren wij gegevens?</h2>
            <p>
              We bewaren gegevens niet langer dan nodig voor het doel waarvoor
              ze werden verzameld. Berichten via het contactformulier worden
              doorgaans binnen 12 maanden gewist, tenzij er een lopende
              behandelovereenkomst is. Medische en fiscale gegevens worden
              bewaard volgens de wettelijke bewaartermijnen.
            </p>
          </section>

          <section>
            <h2>7. Jouw rechten</h2>
            <p>
              Je hebt het recht om je gegevens in te kijken, te laten corrigeren
              of verwijderen, de verwerking te beperken of bezwaar te maken, en
              om je toestemming op elk moment in te trekken. Stuur je vraag
              naar{" "}
              <a href={`mailto:${contact.email}`}>{contact.email}</a>. Je kan
              ook een klacht indienen bij de{" "}
              <a
                href="https://www.gegevensbeschermingsautoriteit.be/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Gegevensbeschermingsautoriteit
              </a>
              .
            </p>
          </section>

          <section>
            <h2>8. Cookies</h2>
            <p>
              Zie ons{" "}
              <Link href="/cookies">cookiebeleid</Link> voor details over
              welke cookies en lokale opslag we gebruiken en hoe je je
              voorkeuren kan aanpassen.
            </p>
          </section>

          <section>
            <h2>9. Wijzigingen</h2>
            <p>
              Wij kunnen dit privacybeleid aanpassen. De datum bovenaan geeft
              weer wanneer het laatst werd bijgewerkt.
            </p>
          </section>
        </div>
      </Container>
    </Section>
  );
}
