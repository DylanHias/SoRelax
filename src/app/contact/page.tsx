import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import {
  ExternalLinkIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/ui/Icons";
import { getSettings } from "@/content/settings";
import { siteConfig } from "@/lib/site";
import { ContactForm } from "./ContactForm";
import { ContactMap } from "./ContactMap";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contacteer So'Relax massagetherapie in Aarschot. Adres, telefoon, e-mail, openingsuren en route.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const { openingHours, socialLinks } = getSettings();
  const hasSocial = Boolean(socialLinks.instagram || socialLinks.facebook);

  return (
    <>
      <Section>
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent-primary)] font-medium">
              Contact
            </p>
            <h1 className="mt-3">Een vraag? Bel, mail of schrijf me gerust.</h1>
            <p className="mt-6 text-[var(--color-text-secondary)]">
              Twijfel niet en wees tijdig bij spierproblemen. Bij dringende hulp kan je
              me ook rechtstreeks contacteren, dan zoeken we samen snel een oplossing.
            </p>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div className="space-y-6">
              <Card className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 flex-none items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border)] text-[var(--color-accent-primary)]"
                >
                  <MapPinIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-secondary)] font-medium">
                    Adres
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.contact.mapsQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-[var(--color-text-primary)] no-underline hover:text-[var(--color-accent-primary)]"
                  >
                    {siteConfig.contact.street}
                    <br />
                    {siteConfig.contact.postalCode} {siteConfig.contact.city}
                  </a>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(siteConfig.contact.mapsQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent-primary)] no-underline"
                  >
                    Route berekenen
                    <ExternalLinkIcon className="h-4 w-4" />
                  </a>
                </div>
              </Card>

              <Card className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 flex-none items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border)] text-[var(--color-accent-primary)]"
                >
                  <PhoneIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-secondary)] font-medium">
                    Telefoon
                  </p>
                  <a
                    href={`tel:${siteConfig.contact.phoneTel}`}
                    className="mt-1 block text-[var(--color-text-primary)] no-underline hover:text-[var(--color-accent-primary)]"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </Card>

              <Card className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 flex-none items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border)] text-[var(--color-accent-primary)]"
                >
                  <MailIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-secondary)] font-medium">
                    E-mail
                  </p>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="mt-1 block text-[var(--color-text-primary)] no-underline hover:text-[var(--color-accent-primary)]"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </Card>

              <Card>
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-secondary)] font-medium">
                  Openingsuren
                </p>
                <ul className="mt-4 space-y-1.5 text-[15px]">
                  {openingHours.map((row) => (
                    <li key={row.day} className="flex items-baseline justify-between gap-4 text-[var(--color-text-primary)]">
                      <span>{row.day}</span>
                      <span className="text-[var(--color-text-secondary)] text-[13px]">{row.hours}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 pt-5 border-t border-[var(--color-border)] text-xs text-[var(--color-text-secondary)]">
                  BTW {siteConfig.contact.btw}
                </p>
              </Card>

              {hasSocial && (
                <Card>
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-secondary)] font-medium">
                    Volg So&rsquo;Relax
                  </p>
                  <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
                    Blijf op de hoogte van nieuwe behandelingen en openingsuren.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {socialLinks.instagram && (
                      <a
                        href={socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer me"
                        className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] no-underline hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)]"
                      >
                        <InstagramIcon className="h-4 w-4" />
                        Instagram
                      </a>
                    )}
                    {socialLinks.facebook && (
                      <a
                        href={socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer me"
                        className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] no-underline hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)]"
                      >
                        <FacebookIcon className="h-4 w-4" />
                        Facebook
                      </a>
                    )}
                  </div>
                </Card>
              )}
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent-primary)] font-medium">
              Ligging
            </p>
            <h2 className="mt-3">Hoe geraak je bij So&rsquo;Relax</h2>
            <p className="mt-4 text-[var(--color-text-secondary)]">
              Vlot bereikbaar vanuit Aarschot centrum, Tielt-Winge, Rillaar en Scherpenheuvel.
              Gratis parkeer­gelegenheid voor de praktijk.
            </p>
          </div>
          <div className="mt-10">
            <ContactMap />
          </div>
        </Container>
      </Section>
    </>
  );
}
