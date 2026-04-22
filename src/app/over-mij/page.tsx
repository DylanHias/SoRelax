import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PullQuote } from "@/components/ui/PullQuote";
import { CredentialBadge } from "@/components/ui/CredentialBadge";
import { CertificateIcon, HandsIcon, LeafIcon, ShieldCheckIcon } from "@/components/ui/Icons";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { personSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Over mij",
  description:
    "Maak kennis met Tanja — erkend massagetherapeut bij BMF en gecertificeerd pijncoach in Aarschot. Haar aanpak, ervaring en specialisatie.",
  alternates: { canonical: "/over-mij" },
};

const credentials = [
  { icon: <ShieldCheckIcon className="h-5 w-5" />, label: "Erkend therapeut bij BMF" },
  { icon: <CertificateIcon className="h-5 w-5" />, label: "Gecertificeerd pijncoach" },
  { icon: <LeafIcon className="h-5 w-5" />, label: "Werkt enkel met natuurlijke CHI-producten" },
  { icon: <HandsIcon className="h-5 w-5" />, label: "Elke behandeling op maat" },
];

export default function OverMijPage() {
  return (
    <>
      <JsonLd data={personSchema()} />
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent-primary)] font-medium">
                Over mij
              </p>
              <h1 className="mt-3">Welkom bij So&rsquo;Relax</h1>

              <div className="mt-8 space-y-5 text-[var(--color-text-primary)]">
                <p>
                  Mijn naam is Tanja, trotse eigenaresse van So&rsquo;Relax. In mijn salon
                  draait alles om jouw welzijn. Je bent hier van harte welkom voor diverse
                  ontspannende en helende massages.
                </p>
                <p>
                  Mijn specialisatie ligt in het verlichten van rug-, nek- en schouder­klachten.
                  Door mijn jarenlange ervaring en opleidingen stem ik elke behandeling
                  volledig af op jouw persoonlijke noden en wensen.
                </p>
                <p>
                  Ik werk enkel met natuurlijke producten, zodat jouw lichaam en geest de
                  beste zorg krijgen. Tijdens de massage geef ik met veel passie positieve
                  energie door, terwijl spanning en negatieve energie zachtjes losgelaten
                  mogen worden.
                </p>
                <p>
                  Heb je last van aanhoudende pijnen of wil je gewoon even volledig
                  ontspannen? Bij mij kan je steeds vrijblijvend info vragen. Als
                  gecertificeerd pijncoach help ik je graag om klachten onder controle te
                  houden en meer balans te vinden.
                </p>
                <p>
                  Bij So&rsquo;Relax sta jij centraal. Kom langs en ervaar zelf hoeveel de
                  juiste aanraking kan betekenen.
                </p>
              </div>
            </div>
            <div className="aspect-[4/5] rounded-[var(--radius-md)] border border-[var(--color-border)] overflow-hidden bg-[var(--color-surface)]">
              <Image
                src="/portrait.jpg"
                alt="Tanja, erkend massagetherapeut en pijncoach"
                width={720}
                height={900}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent-primary)] font-medium">
                Kwalificaties
              </p>
              <h2 className="mt-3">Opleiding &amp; erkenning</h2>
              <ul className="mt-8 grid gap-5 sm:grid-cols-2">
                {credentials.map((c) => (
                  <li key={c.label}>
                    <CredentialBadge icon={c.icon} label={c.label} />
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-[var(--color-text-secondary)]">
                Als erkend therapeut bij BMF werk ik volgens de deontologische code van
                de federatie. De behandeling bij pijnklachten kan daardoor ook in
                aanmerking komen voor een terugbetaling via je aanvullende verzekering
                — vraag dit altijd vooraf na bij je mutualiteit.
              </p>
            </div>
            <PullQuote align="center">
              Als we onze adem vrijlaten, ontspannen we onze emoties en laten we spanningen
              in ons lichaam los.
            </PullQuote>
          </div>
        </Container>
      </Section>

      <CtaBand
        heading="Benieuwd of een behandeling iets voor jou is?"
        body="Bel gerust voor vrijblijvend advies, of boek meteen een afspraak online."
      />
    </>
  );
}
