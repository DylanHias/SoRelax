import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { BookingButton } from "@/components/BookingButton";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-[var(--color-bg)]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 75% 20%, #F4D9BE 0%, transparent 55%), radial-gradient(ellipse at 10% 80%, #E5DFD4 0%, transparent 50%), linear-gradient(180deg, #FAF7F2 0%, #F1ECE2 100%)",
        }}
      />
      <Container>
        <div className="grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:py-32 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <p className="font-serif italic text-[clamp(1.125rem,2vw,1.375rem)] text-[var(--color-accent-warm)]">
              {siteConfig.accentTagline}
            </p>
            <h1
              id="hero-heading"
              className="mt-6 text-[var(--color-text-primary)]"
            >
              Massagetherapie voor wie echt verlichting zoekt.
            </h1>
            <p className="mt-6 text-lg text-[var(--color-text-secondary)] max-w-xl">
              {siteConfig.tagline}. Erkend therapeut bij BMF en gecertificeerd
              pijncoach. Afspraken op maat voor rug-, nek- en schouderklachten,
              fibromyalgie en pure ontspanning.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <BookingButton variant="primary" size="lg">
                Afspraak maken
                <ArrowRightIcon className="h-4 w-4" />
              </BookingButton>
              <ButtonLink href="/behandelingen" variant="secondary" size="lg">
                Ontdek behandelingen
              </ButtonLink>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="aspect-[4/5] rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden bg-[var(--color-surface)]">
              <Image
                src="/massage.jpg"
                alt="Massagetherapie bij So'Relax"
                width={720}
                height={900}
                priority
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] px-5 py-4 shadow-[var(--shadow-subtle)] max-w-[220px]">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">Specialisatie</p>
              <p className="mt-1 text-sm font-medium text-[var(--color-text-primary)]">
                Chronische pijn · Fibromyalgie · Sportherstel
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
