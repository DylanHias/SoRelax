import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { BookingButton } from "@/components/BookingButton";
import { Section } from "@/components/ui/Section";

type Props = {
  heading?: string;
  body?: string;
  ctaLabel?: string;
  /** Optional override. Omit to open the booking dialog instead of navigating. */
  ctaHref?: string;
};

export function CtaBand({
  heading = "Klaar om verlichting te vinden?",
  body = "Boek een afspraak of stuur een berichtje — samen bekijken we welke behandeling bij jouw klachten past.",
  ctaLabel = "Afspraak maken",
  ctaHref,
}: Props) {
  return (
    <Section tone="dark">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-white">{heading}</h2>
            <p className="mt-4 text-white/80">{body}</p>
          </div>
          {ctaHref ? (
            <ButtonLink href={ctaHref} variant="onDark" size="lg" className="self-start md:self-auto">
              {ctaLabel}
            </ButtonLink>
          ) : (
            <BookingButton variant="onDark" size="lg" className="self-start md:self-auto">
              {ctaLabel}
            </BookingButton>
          )}
        </div>
      </Container>
    </Section>
  );
}
