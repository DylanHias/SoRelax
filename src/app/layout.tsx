import type { Metadata, Viewport } from "next";
import { fraunces, inter } from "@/lib/fonts";
import { siteConfig } from "@/lib/site";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import "./globals.css";

const siteDescription =
  "Massagetherapie en pijncoaching in Aarschot (Vlaams-Brabant). Erkend therapeut bij BMF — rug- en nekmassage, deep tissue, fibromyalgie, voetreflexologie.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Massagetherapie Aarschot`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteDescription,
  keywords: [
    "massage Aarschot",
    "massagetherapie Aarschot",
    "pijncoach Vlaams-Brabant",
    "fibromyalgie massage",
    "deep tissue massage Aarschot",
    "rug- en nekmassage",
    "voetreflexologie Aarschot",
    "lymfedrainage",
    "hotstone massage",
    "erkend massagetherapeut",
  ],
  applicationName: siteConfig.name,
  authors: [{ name: "Tanja" }],
  openGraph: {
    type: "website",
    locale: "nl_BE",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Massagetherapie & pijncoach in Aarschot`,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Massage Aarschot`,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF7F2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl-BE" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-[var(--color-accent-primary)] focus:text-white"
        >
          Ga naar inhoud
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
