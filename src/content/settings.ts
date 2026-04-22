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

const settings: SiteSettings = {
  openingHours: [
    { day: "Maandag", hours: "09:00 – 18:00" },
    { day: "Dinsdag", hours: "09:00 – 18:00" },
    { day: "Woensdag", hours: "09:00 – 18:00" },
    { day: "Donderdag", hours: "09:00 – 18:00" },
    { day: "Vrijdag", hours: "09:00 – 18:00" },
    { day: "Zaterdag", hours: "Op afspraak" },
    { day: "Zondag", hours: "Gesloten" },
  ],
  salonizedOpenWidgetUrl:
    process.env.NEXT_PUBLIC_SALONIZED_WIDGET_URL ??
    "https://sorelax.salonized.com/widget_bookings/new",
  salonizedGiftcardUrl:
    process.env.NEXT_PUBLIC_SALONIZED_GIFTCARD_URL ??
    "https://sorelax.salonized.com/widget_giftcards/new",
  socialLinks: {
    instagram:
      process.env.NEXT_PUBLIC_INSTAGRAM_URL ??
      "https://www.instagram.com/so_relax_massagetherapeut/",
    facebook:
      process.env.NEXT_PUBLIC_FACEBOOK_URL ??
      "https://www.facebook.com/p/sorelax-61568681545331/",
  },
};

export function getSettings(): SiteSettings {
  return settings;
}
