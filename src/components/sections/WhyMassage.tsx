import { Container } from "@/components/ui/Container";
import { PullQuote } from "@/components/ui/PullQuote";
import { Section } from "@/components/ui/Section";

export function WhyMassage() {
  return (
    <Section tone="warm">
      <Container width="prose">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent-primary)] font-medium">
          Waarom massage?
        </p>
        <h2 className="mt-3">Meer dan ontspanning alleen.</h2>
        <div className="mt-8 space-y-5 text-[var(--color-text-primary)]">
          <p>
            Massagetherapie helpt niet alleen om pijn en stijfheid te verlichten, maar
            ook om stress te verminderen en je algehele welzijn te verbeteren. Het wordt
            steeds vaker gezien als een waardevolle aanvulling op een gezonde
            levensstijl — geen luxe, maar een doeltreffend middel om klachten zoals
            hoofdpijn, nekpijn of chronische rugpijn te verlichten.
          </p>
          <p>
            Of je nu je bewegingsvrijheid wil vergroten, je sportprestaties wil
            ondersteunen, of gewoon een moment zoekt om spanning los te laten: massage
            kan je helpen om beter in balans te komen.
          </p>
          <p>
            Massage is een krachtig hulpmiddel om zelf de regie te nemen over je
            gezondheid en welzijn. Het is er voor iedereen — zowel bij specifieke
            klachten als wanneer je simpelweg behoefte hebt aan pure ontspanning.
          </p>
        </div>

        <PullQuote>
          Als we onze adem vrijlaten, ontspannen we onze emoties en laten we spanningen in ons lichaam los.
        </PullQuote>
      </Container>
    </Section>
  );
}
