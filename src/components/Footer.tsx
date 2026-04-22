import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FacebookIcon, InstagramIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/ui/Icons";
import { legalNav, primaryNav, siteConfig } from "@/lib/site";
import { getSettings } from "@/content/settings";

export function Footer() {
  const { openingHours, socialLinks } = getSettings();
  return (
    <footer className="mt-24 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <Container>
        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-4 md:gap-10">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/Logo.svg" alt="" width={56} height={56} className="h-14 w-14" />
              <div className="font-serif text-2xl text-[var(--color-text-primary)]">So&rsquo;Relax</div>
            </div>
            <p className="mt-3 text-sm text-[var(--color-text-secondary)] max-w-xs">
              {siteConfig.tagline}. Erkend therapeut bij BMF.
            </p>
            {(socialLinks.instagram || socialLinks.facebook) && (
              <div className="mt-5 flex items-center gap-3">
                {socialLinks.instagram && (
                  <a
                    href={socialLinks.instagram}
                    aria-label="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border)] text-[var(--color-text-primary)] no-underline hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)]"
                  >
                    <InstagramIcon className="h-4 w-4" />
                  </a>
                )}
                {socialLinks.facebook && (
                  <a
                    href={socialLinks.facebook}
                    aria-label="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border)] text-[var(--color-text-primary)] no-underline hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)]"
                  >
                    <FacebookIcon className="h-4 w-4" />
                  </a>
                )}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xs font-sans font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
              Navigatie
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[var(--color-text-primary)] no-underline hover:text-[var(--color-accent-primary)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-sans font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
              Contact
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-[var(--color-text-primary)]">
              <li className="flex items-start gap-2.5">
                <MapPinIcon className="mt-0.5 h-4 w-4 flex-none text-[var(--color-accent-primary)]" />
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.contact.mapsQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline hover:text-[var(--color-accent-primary)]"
                >
                  {siteConfig.contact.street}
                  <br />
                  {siteConfig.contact.postalCode} {siteConfig.contact.city}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneIcon className="h-4 w-4 flex-none text-[var(--color-accent-primary)]" />
                <a href={`tel:${siteConfig.contact.phoneTel}`} className="no-underline hover:text-[var(--color-accent-primary)]">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MailIcon className="h-4 w-4 flex-none text-[var(--color-accent-primary)]" />
                <a href={`mailto:${siteConfig.contact.email}`} className="no-underline hover:text-[var(--color-accent-primary)]">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="text-xs text-[var(--color-text-secondary)] pt-1">
                BTW {siteConfig.contact.btw}
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-sans font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
              Openingsuren
            </h2>
            <ul className="mt-4 space-y-1.5 text-sm">
              {openingHours.map((row) => (
                <li key={row.day} className="flex items-baseline justify-between gap-4 text-[var(--color-text-primary)]">
                  <span>{row.day}</span>
                  <span className="text-[var(--color-text-secondary)] text-[13px]">{row.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-[var(--color-border)] py-6 text-xs text-[var(--color-text-secondary)] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} So&rsquo;Relax. Alle rechten voorbehouden.</p>
          <nav aria-label="Juridisch" className="flex flex-wrap gap-x-5 gap-y-2">
            {legalNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[var(--color-text-secondary)] no-underline hover:text-[var(--color-accent-primary)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
