export const siteConfig = {
  name: "So'Relax",
  tagline: "Massagetherapie & pijncoaching in Aarschot",
  accentTagline: "Your me-time starts with... me",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sorelaxmassage.be",
  locale: "nl-BE",
  contact: {
    phone: "0488 09 75 09",
    phoneTel: "+32488097509",
    email: "info@sorelaxmassage.be",
    btw: "BE 1001 031 585",
    street: "Rillaarse Baan 398",
    postalCode: "3200",
    city: "Aarschot",
    country: "België",
    mapsQuery: "Rillaarse Baan 398, 3200 Aarschot",
  },
} as const;

export const primaryNav = [
  { href: "/", label: "Home" },
  { href: "/over-mij", label: "Over mij" },
  { href: "/behandelingen", label: "Behandelingen" },
  { href: "/afspraak", label: "Afspraak" },
  { href: "/cadeaubon", label: "Cadeaubon" },
  { href: "/contact", label: "Contact" },
] as const;

export const legalNav = [
  { href: "/algemene-voorwaarden", label: "Algemene voorwaarden" },
  { href: "/privacy", label: "Privacybeleid" },
  { href: "/cookies", label: "Cookiebeleid" },
] as const;
