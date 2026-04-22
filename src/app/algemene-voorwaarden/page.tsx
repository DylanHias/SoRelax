import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Algemene voorwaarden",
  description:
    "Algemene voorwaarden van So'Relax massagetherapie: reservaties, betaling, cadeaubonnen, hygiëne en gezondheid.",
  alternates: { canonical: "/algemene-voorwaarden" },
};

export default function AlgemeneVoorwaardenPage() {
  return (
    <Section>
      <Container width="prose">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent-primary)] font-medium">
          Juridisch
        </p>
        <h1 className="mt-3">Algemene voorwaarden</h1>
        <p className="mt-6 text-[var(--color-text-secondary)]">
          Deze voorwaarden zijn van toepassing op elke behandeling bij So&rsquo;Relax.
          Door een afspraak te maken verklaar je je akkoord met de onderstaande
          bepalingen.
        </p>

        <div className="mt-12 space-y-12 text-[var(--color-text-primary)]">
          <Clause title="Reservaties">
            <p>
              Indien je verhinderd bent om naar je afspraak te komen, gelieve deze dan
              minstens <strong>24 uur op voorhand</strong> te annuleren. Bij een
              latere annulering zijn wij genoodzaakt om 50% van het bedrag in rekening
              te brengen. Indien je niet komt opdagen, dient het volledige bedrag
              betaald te worden.
            </p>
          </Clause>

          <Clause title="Betaalmethoden">
            <p>
              Wij beschikken niet over een betaalterminal. Je kan uiteraard contant
              betalen of met Payconiq. Indien gewenst kunnen wij ook een factuur
              opmaken.
            </p>
          </Clause>

          <Clause title="Cadeaubonnen">
            <p>
              De cadeaubonnen van So&rsquo;Relax zijn niet inwisselbaar tegen geld.
              Zij zijn twee jaar geldig na datum van afgifte. Gelieve bij betaling de
              cadeaubon voor te leggen.
            </p>
          </Clause>

          <Clause title="Hygiëne">
            <p>
              Wij verwachten dat je hygiënisch bent voor aanvang van de massage. Een
              douche of verfrissing vooraf zorgt voor een comfortabele behandeling —
              voor jou én voor mij.
            </p>
          </Clause>

          <Clause title="Gezondheid">
            <p>
              Vooraleer een behandeling van start gaat, verzoeken wij je vriendelijk
              om samen een korte vragenlijst in te vullen. Het is van groot belang dat
              ik weet of je bijvoorbeeld al dan niet zwanger bent, of bepaalde
              aandoeningen hebt. Wij kunnen niet aansprakelijk worden gesteld voor
              schade en/of letsel ten gevolge van een uitgevoerde
              massage­behandeling.
            </p>
          </Clause>

          <Clause title="Eten & drinken">
            <p>
              Wij raden je aan om enkele uren voor de massage slechts licht te eten
              en geen zware maaltijden te verorberen. Drink voldoende water voor en
              na een massage: dit bevordert de afvoer van afvalstoffen uit je
              lichaam.
            </p>
          </Clause>

          <Clause title="Respect">
            <p>
              Bij mij kan je niet terecht voor erotische massages. Bij elke poging tot
              seksuele handelingen of oneerbare voorstellen zal ik de behandeling
              onmiddellijk stopzetten.
            </p>
          </Clause>
        </div>
      </Container>
    </Section>
  );
}

function Clause({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-[1.375rem]">{title}</h2>
      <div className="mt-4 space-y-4 text-[var(--color-text-primary)]">{children}</div>
    </section>
  );
}
