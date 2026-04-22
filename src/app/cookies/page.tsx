import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Cookiebeleid",
  description: "Cookiebeleid van So'Relax massagetherapie.",
  alternates: { canonical: "/cookies" },
};

const cookiePolicyId = process.env.NEXT_PUBLIC_IUBENDA_COOKIE_POLICY_ID;
const siteId = process.env.NEXT_PUBLIC_IUBENDA_SITE_ID;

export default function CookiesPage() {
  return (
    <Section>
      <Container width="prose">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent-primary)] font-medium">
          Juridisch
        </p>
        <h1 className="mt-3">Cookiebeleid</h1>

        {cookiePolicyId && siteId ? (
          <div className="mt-10">
            <a
              href={`https://www.iubenda.com/privacy-policy/${siteId}/cookie-policy`}
              className="iubenda-white no-brand iubenda-noiframe iubenda-embed iub-body-embed text-[var(--color-accent-primary)]"
              title="Cookiebeleid"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bekijk het volledige cookiebeleid op iubenda
            </a>
          </div>
        ) : (
          <div className="mt-10 rounded-[var(--radius-md)] border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-8">
            <p className="text-[var(--color-text-primary)]">
              Het volledige cookiebeleid wordt binnenkort via iubenda toegevoegd.
            </p>
            <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
              Deze site gebruikt momenteel enkel cookieless analytics (Cloudflare
              Web Analytics) en laadt externe scripts zoals de online boekings­widget
              pas na jouw expliciete toestemming.
            </p>
          </div>
        )}
      </Container>
    </Section>
  );
}
