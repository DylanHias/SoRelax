import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { ArrowRightIcon } from "@/components/ui/Icons";

export function AboutTeaser() {
  return (
    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="order-2 lg:order-1 aspect-[4/5] rounded-[var(--radius-md)] border border-[var(--color-border)] overflow-hidden bg-[var(--color-surface)]">
            <Image
              src="/portrait.jpg"
              alt="Tanja, eigenaresse van So'Relax"
              width={720}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent-primary)] font-medium">
              Over Tanja
            </p>
            <h2 className="mt-3">Welkom bij So&rsquo;Relax</h2>
            <div className="mt-6 space-y-4 text-[var(--color-text-secondary)]">
              <p>
                Mijn naam is Tanja, trotse eigenaresse van So&rsquo;Relax. In mijn salon
                draait alles om jouw welzijn. Je bent hier van harte welkom voor diverse
                ontspannende en helende massages.
              </p>
              <p>
                Mijn specialisatie ligt in het verlichten van rug-, nek- en schouder­klachten.
                Door jarenlange ervaring en opleidingen stem ik elke behandeling volledig af
                op jouw persoonlijke noden en wensen.
              </p>
            </div>
            <div className="mt-8">
              <ButtonLink href="/over-mij" variant="secondary">
                Lees meer over mij
                <ArrowRightIcon className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
