import { siteConfig } from "@/lib/site";
import type { OpeningHour, SiteSettings } from "@/content/settings";
import type { Treatment } from "@/content/treatments";

const DAY_MAP: Record<string, string> = {
  maandag: "Monday",
  dinsdag: "Tuesday",
  woensdag: "Wednesday",
  donderdag: "Thursday",
  vrijdag: "Friday",
  zaterdag: "Saturday",
  zondag: "Sunday",
};

// Parses "09:00 – 18:00" (en-dash or hyphen) into {opens, closes}. Returns null
// for free-text like "Op afspraak" or "Gesloten" — those rows are omitted from
// the schema since the hours aren't machine-readable.
function parseHourRange(raw: string): { opens: string; closes: string } | null {
  const match = raw.match(/(\d{1,2}:\d{2})\s*[–-]\s*(\d{1,2}:\d{2})/);
  if (!match) return null;
  const [, opens, closes] = match;
  if (!opens || !closes) return null;
  return { opens, closes };
}

function openingHoursSpecification(hours: OpeningHour[]) {
  return hours.flatMap((h) => {
    const day = DAY_MAP[h.day.trim().toLowerCase()];
    const parsed = parseHourRange(h.hours);
    if (!day || !parsed) return [];
    return [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: day,
        opens: parsed.opens,
        closes: parsed.closes,
      },
    ];
  });
}

const LOCAL_BUSINESS_ID = `${siteConfig.url}/#business`;

export function localBusinessSchema(settings: SiteSettings) {
  const { contact } = siteConfig;
  const sameAs = [settings.socialLinks.instagram, settings.socialLinks.facebook].filter(
    Boolean,
  ) as string[];

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HealthAndBeautyBusiness"],
    "@id": LOCAL_BUSINESS_ID,
    name: siteConfig.name,
    description: `${siteConfig.tagline}. Erkend massagetherapeut en gecertificeerd pijncoach.`,
    url: siteConfig.url,
    telephone: contact.phoneTel,
    email: contact.email,
    image: `${siteConfig.url}/portrait.jpg`,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.street,
      postalCode: contact.postalCode,
      addressLocality: contact.city,
      addressCountry: "BE",
    },
    areaServed: [
      { "@type": "City", name: "Aarschot" },
      { "@type": "AdministrativeArea", name: "Vlaams-Brabant" },
    ],
    openingHoursSpecification: openingHoursSpecification(settings.openingHours),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function personSchema() {
  const { contact } = siteConfig;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tanja",
    jobTitle: "Massagetherapeut & pijncoach",
    image: `${siteConfig.url}/portrait.jpg`,
    worksFor: { "@id": LOCAL_BUSINESS_ID },
    address: {
      "@type": "PostalAddress",
      addressLocality: contact.city,
      addressCountry: "BE",
    },
    url: `${siteConfig.url}/over-mij`,
  };
}

export function serviceSchema(treatment: Treatment) {
  const priceSpec =
    treatment.priceType === "from"
      ? {
          "@type": "PriceSpecification",
          minPrice: treatment.priceAmount,
          priceCurrency: "EUR",
        }
      : {
          "@type": "PriceSpecification",
          price: treatment.priceAmount,
          priceCurrency: "EUR",
        };

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: treatment.name,
    serviceType: treatment.category === "therapeutic" ? "Therapeutische massage" : "Ontspanningsmassage",
    description: treatment.shortDescription,
    provider: { "@id": LOCAL_BUSINESS_ID },
    areaServed: { "@type": "City", name: "Aarschot" },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: treatment.priceAmount,
      priceSpecification: priceSpec,
      availability: "https://schema.org/InStock",
    },
  };
}
