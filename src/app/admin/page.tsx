import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <Section>
      <Container width="prose">
        <h1>Admin</h1>
        <p className="mt-6 text-[var(--color-text-secondary)]">
          De TinaCMS admin wordt op deze route geïnstalleerd in een volgende fase.
          Vandaag is er nog niets te beheren.
        </p>
      </Container>
    </Section>
  );
}
