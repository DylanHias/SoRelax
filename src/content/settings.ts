import settingsData from "../../content/settings/settings.json";

export type OpeningHour = {
  day: string;
  hours: string;
};

export type SiteSettings = {
  openingHours: OpeningHour[];
  salonizedOpenWidgetUrl: string;
  salonizedGiftcardUrl: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
  };
};

const SALONIZED_FALLBACK = "https://sorelax.salonized.com/widget_bookings/new";
const GIFTCARD_FALLBACK = "https://sorelax.salonized.com/widget_giftcards/new";

function pick(...values: (string | undefined | null)[]): string {
  for (const v of values) {
    if (v && v.trim().length > 0) return v;
  }
  return "";
}

export function getSettings(): SiteSettings {
  const cms = settingsData;
  return {
    openingHours: cms.openingHours.map((h) => ({ day: h.day, hours: h.hours })),
    salonizedOpenWidgetUrl: pick(
      cms.salonizedOpenWidgetUrl,
      process.env.NEXT_PUBLIC_SALONIZED_WIDGET_URL,
      SALONIZED_FALLBACK,
    ),
    salonizedGiftcardUrl: pick(
      cms.salonizedGiftcardUrl,
      process.env.NEXT_PUBLIC_SALONIZED_GIFTCARD_URL,
      GIFTCARD_FALLBACK,
    ),
    socialLinks: {
      instagram:
        pick(cms.socialLinks?.instagram, process.env.NEXT_PUBLIC_INSTAGRAM_URL) ||
        undefined,
      facebook:
        pick(cms.socialLinks?.facebook, process.env.NEXT_PUBLIC_FACEBOOK_URL) ||
        undefined,
    },
  };
}
